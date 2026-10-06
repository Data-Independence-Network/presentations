#!/usr/bin/env node

/**
 * Проверка презентаций: текстовые правила репозитория и инвариант нулевого переполнения слайдов.
 *
 * Использование:
 *   node scripts/check_decks.js <каталог презентации> [<каталог> ...] [--all] [--no-browser] [--profile=applications|generic]
 *
 * Профиль applications (по умолчанию для applications_presentations/01…03): строгие пределы объёма дикторского текста,
 * обязательная атрибутика, запреты правил 9, 12–15 корневого AGENTS.md считаются ошибками.
 * Профиль generic (остальные серии): те же запреты выводятся предупреждениями, пределов объёма и атрибутики нет.
 *
 * Для проверки переполнения колода собирается во временный каталог и открывается в Chromium (1920×1080), как при съёмке слайдов.
 * Код возврата 1, если есть ошибки. Предупреждения код возврата не меняют.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const { parseFrontmatter, compileDeckHtml } = require('./core/deck_builder');

const ROOT = path.resolve(__dirname, '..');
const SLIDE_WIDTH = 1920;
const SLIDE_HEIGHT = 1080;

const LIMITS = {
  slides: 15,
  narrationPerSlide: { min: 62, max: 95, edgeMax: 105 },
  narrationTotal: { min: 990, max: 1350, hardMax: 1380 },
  visibleWords: { warn: 90, error: 110 },
  titleChars: { warn: 48, error: 60 },
  minBodyFontPx: 24,
  minTitleFontPx: 50
};

const FORBIDDEN_WORDS = /карател|антиутоп|дистоп|тоталитар|авторитарн|токсичн|кабал|паразит|деструктив|стигматиз|клейм|тупик|ловушк|порок|порочн|слежк/giu;
const ANGLICISMS = /(?<![а-яё])(кейс|дедлайн|фидб[эе]к|б[эе]кенд|фронтенд|стартап|комплаенс|онбординг|дашборд|апдейт|апрув|юзер|фич|тренд|менеджмент|челлендж|лайфхак|хайп|аутсорс)[а-яё]*/giu;
const PROGRAM_NAMES = /Target\w*Id|VoteCube|SQLite|Gravity\s*Balls?|Serendipity|Before\s*\/\s*After/giu;
const ABSOLUTES = /бесконечн|мгновенн|ни\s+один|ни\s+одн|молниеносн|(?<![\d,.])0\s?%|исключен[оа](?![а-яё])|иммунитет|колоссальн|согласован[оа]?\s+с\s+Банком\s+России/giu;
const COLLECTIVE_ALLOWED = /^наш[а-яё]*\s+(дет[а-яё]*|стран[а-яё]*|граждан[а-яё]*|сем[а-яё]*|Отечеств[а-яё]*)/iu;
const ALLOWED_LATIN = new Set(['Claude', 'Sonnet', 'Gemini', 'Flash', 'Antigravity', 'Google', 'DeepMind']);
const SOVEREIGN_STATE_CONTEXT = /(?:государств[\p{L}]*|росси[\p{L}]*|рф|отечеств[\p{L}]*|национальн[\p{L}]*|стран[\p{L}]*|брикс|еаэс|ведомств[\p{L}]*|юрисдикц[\p{L}]*|межгосударственн[\p{L}]*|силов[\p{L}]*|правопоряд[\p{L}]*)/iu;
const FORBIDDEN_SOVEREIGN_PHRASES = [
  /правил[а-яё]*\s+суверенитет[а-яё]*/iu,
  /суверенитет[а-яё]*\s+персональн[а-яё]*/iu,
  /суверенитет[а-яё]*\s+личн[а-яё]*/iu,
  /суверенитет[а-яё]*\s+хранилищ[а-яё]*/iu,
  /суверенн[а-яё]*\s+органайзер[а-яё]*/iu,
  /суверенн[а-яё]*\s+хранилищ[а-яё]*/iu,
  /суверенн[а-яё]*\s+устройств[а-яё]*/iu,
  /суверенн[а-яё]*\s+смартфон[а-яё]*/iu,
  /суверенн[а-яё]*\s+граждан[а-яё]*/iu,
  /разрушает\s+(?:их\s+)?суверенитет/iu,
  /суверенн[а-яё]*\s+призм[а-яё]*/iu,
  /суверенн[а-яё]*\s+приложен[а-яё]*/iu
];

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function countWords(text) {
  return text.split(/\s+/).filter(token => /[\p{L}\p{N}]/u.test(token)).length;
}

function splitSlides(body) {
  const parts = body.split(/<!--\s*slide:\s*(\d+)\s*-->/);
  const slides = [];
  for (let i = 1; i < parts.length; i += 2) {
    const number = parseInt(parts[i], 10);
    const [markup, ...rest] = parts[i + 1].split('### Текст для диктора:');
    const narrationRaw = rest.join('### Текст для диктора:').split(/\n---\s*(?:\n|$)/)[0];
    const narration = narrationRaw
      .split('\n')
      .map(line => line.replace(/^>\s*/, '').trim())
      .filter(Boolean)
      .join(' ');
    const titleMatch = markup.match(/<h[12][^>]*class="[^"]*slide-title[^"]*"[^>]*>([\s\S]*?)<\/h[12]>/);
    slides.push({
      number,
      markup,
      visibleText: stripTags(markup),
      narration,
      title: titleMatch ? stripTags(titleMatch[1]).replace(/\s+/g, ' ').trim() : ''
    });
  }
  return slides;
}

function findMatches(text, pattern) {
  return Array.from(text.matchAll(pattern), match => match[0]);
}

function findCollective(text) {
  const found = [];
  const pattern = /(?<![\p{L}])(мы|наш[\p{L}]*)(?![\p{L}])/giu;
  for (const match of text.matchAll(pattern)) {
    const tail = text.slice(match.index, match.index + 40);
    if (!COLLECTIVE_ALLOWED.test(tail)) found.push(match[0]);
  }
  return found;
}

function findLatin(text) {
  return Array.from(new Set(findMatches(text, /[A-Za-z][A-Za-z-]{3,}/g))).filter(word => !ALLOWED_LATIN.has(word));
}

function findNonStateSovereignty(slideText) {
  const issues = [];
  for (const pattern of FORBIDDEN_SOVEREIGN_PHRASES) {
    const m = slideText.match(pattern);
    if (m) issues.push(m[0]);
  }
  const sovereignPattern = /(?<![\p{L}])суверен[\p{L}]*(?![\p{L}])/giu;
  const matches = Array.from(slideText.matchAll(sovereignPattern));
  if (matches.length > 0 && !SOVEREIGN_STATE_CONTEXT.test(slideText)) {
    matches.forEach(m => issues.push(m[0] + ' (без контекста государства на слайде)'));
  }
  return Array.from(new Set(issues));
}

function detectProfile(dir, override) {
  if (override) return override;
  return /applications_presentations[\\/]0[1-3]_/.test(dir) ? 'applications' : 'generic';
}

function textChecks(dir, profile) {
  const strict = profile === 'applications';
  const issues = [];
  const report = (level, slide, message) => issues.push({ level, slide, message });
  const rule = (slide, message) => report(strict ? 'error' : 'warn', slide, message);

  const deckPath = path.join(dir, 'docs', 'presentation_deck.md');
  if (!fs.existsSync(deckPath)) {
    report('error', null, `нет файла ${path.relative(ROOT, deckPath)}`);
    return { issues, slides: [], stats: null };
  }

  const { meta, body } = parseFrontmatter(fs.readFileSync(deckPath, 'utf8'));
  const slides = splitSlides(body);

  if (slides.length !== LIMITS.slides) report('error', null, `слайдов ${slides.length}, должно быть ${LIMITS.slides}`);
  if (Number(meta.total_slides) !== slides.length) report('error', null, `в служебных полях total_slides=${meta.total_slides}, фактически ${slides.length}`);
  slides.forEach((slide, index) => {
    if (slide.number !== index + 1) report('error', slide.number, `нарушена нумерация: ожидался слайд ${index + 1}`);
    if (!slide.narration) report('error', slide.number, 'нет дикторского текста');
  });

  let narrationTotal = 0;
  for (const slide of slides) {
    const narrationWords = countWords(slide.narration);
    const visibleWords = countWords(slide.visibleText);
    narrationTotal += narrationWords;
    slide.narrationWords = narrationWords;
    slide.visibleWords = visibleWords;

    if (strict) {
      const edge = slide.number === 1 || slide.number === slides.length;
      const max = edge ? LIMITS.narrationPerSlide.edgeMax : LIMITS.narrationPerSlide.max;
      if (narrationWords < LIMITS.narrationPerSlide.min || narrationWords > max) {
        report('warn', slide.number, `дикторский текст ${narrationWords} слов (норма ${LIMITS.narrationPerSlide.min}–${max})`);
      }
      if (visibleWords > LIMITS.visibleWords.error) report('error', slide.number, `на слайде ${visibleWords} слов (предел ${LIMITS.visibleWords.error})`);
      else if (visibleWords > LIMITS.visibleWords.warn) report('warn', slide.number, `на слайде ${visibleWords} слов (ориентир ${LIMITS.visibleWords.warn})`);
      if (slide.title.length > LIMITS.titleChars.error) report('error', slide.number, `заголовок ${slide.title.length} знаков (предел ${LIMITS.titleChars.error})`);
      else if (slide.title.length > LIMITS.titleChars.warn) report('warn', slide.number, `заголовок ${slide.title.length} знаков (норма до ${LIMITS.titleChars.warn})`);
    }

    const everything = `${slide.visibleText}\n${slide.narration}`;
    const collective = findCollective(everything);
    if (collective.length) rule(slide.number, `«мы/наш»: ${Array.from(new Set(collective)).join(', ')}`);
    const labels = findMatches(everything, /%[A-Z][A-Za-z]+/g);
    if (labels.length) rule(slide.number, `метки базы заметок: ${labels.join(', ')}`);
    const forbidden = findMatches(everything, FORBIDDEN_WORDS);
    if (forbidden.length) rule(slide.number, `запретные слова: ${Array.from(new Set(forbidden.map(w => w.toLowerCase()))).join(', ')}`);
    const anglicisms = findMatches(everything, ANGLICISMS);
    if (anglicisms.length) rule(slide.number, `англицизмы: ${Array.from(new Set(anglicisms.map(w => w.toLowerCase()))).join(', ')}`);
    const names = findMatches(everything, PROGRAM_NAMES);
    if (names.length) rule(slide.number, `программные и английские названия: ${Array.from(new Set(names)).join(', ')}`);
    if (everything.includes('$')) rule(slide.number, 'знак $ (формулы на слайдах не отрисовываются)');
    const nonStateSovereignty = findNonStateSovereignty(everything);
    if (nonStateSovereignty.length) rule(slide.number, `«суверенитет» вне контекста государства: ${nonStateSovereignty.join(', ')}`);
    const absolutes = findMatches(everything, ABSOLUTES);
    if (absolutes.length) report('warn', slide.number, `абсолютные или преувеличенные слова: ${Array.from(new Set(absolutes.map(w => w.toLowerCase()))).join(', ')}`);
    const latin = findLatin(everything);
    if (latin.length) report('warn', slide.number, `латиница: ${latin.join(', ')}`);
  }

  if (strict) {
    if (narrationTotal > LIMITS.narrationTotal.hardMax) report('error', null, `дикторский текст ${narrationTotal} слов, предел ${LIMITS.narrationTotal.hardMax} (до 15:20 при 90 слов в минуту)`);
    else if (narrationTotal > LIMITS.narrationTotal.max || narrationTotal < LIMITS.narrationTotal.min) {
      report('warn', null, `дикторский текст ${narrationTotal} слов (норма ${LIMITS.narrationTotal.min}–${LIMITS.narrationTotal.max})`);
    }

    for (const field of ['author', 'planning', 'elaboration', 'status', 'version', 'book']) {
      if (!meta[field] || meta[field] === 'undefined') report('error', null, `в служебных полях нет поля ${field}`);
    }
    if (meta.elaboration && !String(meta.elaboration).includes('Gemini 3.8 Flash')) report('error', null, 'в поле elaboration должна быть модель Gemini 3.8 Flash');
    if (meta.planning && !String(meta.planning).includes('Claude Sonnet 5.5')) report('error', null, 'в поле planning должна быть модель Claude Sonnet 5.5');

    const first = slides[0];
    const last = slides[slides.length - 1];
    if (first && !(first.visibleText.includes('Шамсутдинов') && first.visibleText.includes('Gemini 3.8 Flash'))) {
      report('error', first.number, 'на титульном слайде нет строки атрибутики (автор и Gemini 3.8 Flash)');
    }
    if (last) {
      for (const needle of ['Шамсутдинов', 'Claude Sonnet 5.5', 'Gemini 3.8 Flash', 'как есть']) {
        if (!last.visibleText.includes(needle)) report('error', last.number, `в панели «Об этой презентации» нет «${needle}»`);
      }
      if (String(meta.presentation_id || '').includes('zabota') && !last.visibleText.includes('Antigravity')) {
        report('error', last.number, 'в атрибутике «Заботы» нет строки про Antigravity (Google DeepMind)');
      }
    }

    const outlinePath = path.join(dir, 'docs', 'presentation_outline.md');
    if (!fs.existsSync(outlinePath)) report('error', null, 'нет docs/presentation_outline.md');
    else {
      const headings = fs.readFileSync(outlinePath, 'utf8').split('\n').filter(line => /^#{2,4}\s*Слайд\s*0?\d+/.test(line));
      if (headings.length !== slides.length) report('warn', null, `в структурном плане ${headings.length} заголовков слайдов, в колоде ${slides.length}`);
    }
  }

  return { issues, slides, stats: { narrationTotal } };
}

async function overflowChecks(dir, slideCount) {
  const { chromium } = require('playwright');
  const issues = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-check-'));
  try {
    compileDeckHtml(dir, { outputDir: tmp });
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: SLIDE_WIDTH, height: SLIDE_HEIGHT }, deviceScaleFactor: 1 });
    await page.goto(`file://${path.join(tmp, 'index.html')}`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready.catch(() => null));
    await page.waitForTimeout(500);
    await page.addStyleTag({
      content: `
        body { margin: 0 !important; overflow: hidden !important; width: ${SLIDE_WIDTH}px !important; height: ${SLIDE_HEIGHT}px !important; }
        .presentation-header, .presentation-footer, .notes-drawer, .modal-overlay { display: none !important; }
        .presentation-viewport { padding: 0 !important; margin: 0 !important; width: ${SLIDE_WIDTH}px !important; height: ${SLIDE_HEIGHT}px !important; display: block !important; }
        .deck-container { width: ${SLIDE_WIDTH}px !important; height: ${SLIDE_HEIGHT}px !important; max-width: ${SLIDE_WIDTH}px !important; aspect-ratio: auto !important; position: relative !important; border: none !important; border-radius: 0 !important; }
        .slide-card { position: absolute !important; top: 0 !important; left: 0 !important; width: ${SLIDE_WIDTH}px !important; height: ${SLIDE_HEIGHT}px !important; display: flex !important; visibility: hidden !important; opacity: 0 !important; transform: none !important; transition: none !important; }
        .slide-card.active { visibility: visible !important; opacity: 1 !important; }
      `
    });

    for (let number = 1; number <= slideCount; number++) {
      const result = await page.evaluate(({ slideNumber, minBody, minTitle }) => {
        const cards = Array.from(document.querySelectorAll('.slide-card'));
        cards.forEach((card, index) => card.classList.toggle('active', index + 1 === slideNumber));
        const card = cards[slideNumber - 1];
        if (!card) return null;
        const cardRect = card.getBoundingClientRect();
        const content = card.querySelector('.slide-content') || card;
        const body = card.querySelector('.slide-body');
        const clipped = [];
        for (const element of [card, content, body]) {
          if (element && element.scrollHeight > element.clientHeight + 1) {
            clipped.push(`${element.className.split(' ')[0] || element.tagName}: scrollHeight ${element.scrollHeight} > clientHeight ${element.clientHeight}`);
          }
        }
        let lowest = 0;
        let rightmost = 0;
        const smallFonts = [];
        const tooSmallTitles = [];
        for (const element of card.querySelectorAll('*')) {
          const rect = element.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) continue;
          lowest = Math.max(lowest, rect.bottom - cardRect.top);
          rightmost = Math.max(rightmost, rect.right - cardRect.left);
          const ownText = Array.from(element.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim())
            .join(' ')
            .trim();
          if (!/[\p{L}\p{N}]/u.test(ownText)) continue;
          const fontSize = parseFloat(getComputedStyle(element).fontSize);
          if (element.classList.contains('slide-title')) {
            if (fontSize < minTitle) tooSmallTitles.push(`${fontSize}px`);
          } else if (fontSize < minBody) {
            smallFonts.push(`${fontSize}px «${ownText.slice(0, 28)}»`);
          }
        }
        return { clipped, lowest: Math.round(lowest), rightmost: Math.round(rightmost), smallFonts, tooSmallTitles };
      }, { slideNumber: number, minBody: LIMITS.minBodyFontPx, minTitle: LIMITS.minTitleFontPx });

      if (!result) {
        issues.push({ level: 'error', slide: number, message: 'слайд не найден в собранной колоде' });
        continue;
      }
      if (result.clipped.length) issues.push({ level: 'error', slide: number, message: `переполнение: ${result.clipped.join('; ')}` });
      if (result.lowest > SLIDE_HEIGHT + 1) issues.push({ level: 'error', slide: number, message: `содержимое выходит за нижнюю границу: ${result.lowest} px при высоте ${SLIDE_HEIGHT}` });
      if (result.rightmost > SLIDE_WIDTH + 1) issues.push({ level: 'error', slide: number, message: `содержимое выходит за правую границу: ${result.rightmost} px при ширине ${SLIDE_WIDTH}` });
      if (result.tooSmallTitles.length) issues.push({ level: 'warn', slide: number, message: `заголовок мельче ${LIMITS.minTitleFontPx} px: ${result.tooSmallTitles.join(', ')}` });
      if (result.smallFonts.length) {
        const sample = result.smallFonts.slice(0, 3).join('; ');
        issues.push({ level: 'warn', slide: number, message: `текст мельче ${LIMITS.minBodyFontPx} px (${result.smallFonts.length} мест): ${sample}` });
      }
    }
    await browser.close();
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return issues;
}

function findAllDecks() {
  const found = [];
  for (const group of fs.readdirSync(ROOT)) {
    const groupDir = path.join(ROOT, group);
    if (!fs.statSync(groupDir).isDirectory() || group === 'node_modules') continue;
    for (const name of fs.readdirSync(groupDir)) {
      const dir = path.join(groupDir, name);
      if (fs.existsSync(path.join(dir, 'docs', 'presentation_deck.md'))) found.push(dir);
    }
  }
  return found;
}

async function main() {
  const args = process.argv.slice(2);
  const flags = args.filter(arg => arg.startsWith('--'));
  const profileFlag = flags.find(flag => flag.startsWith('--profile='));
  const profileOverride = profileFlag ? profileFlag.split('=')[1] : null;
  const noBrowser = flags.includes('--no-browser');
  let dirs = args.filter(arg => !arg.startsWith('--')).map(arg => path.resolve(arg));
  if (flags.includes('--all')) dirs = findAllDecks();
  if (dirs.length === 0) {
    console.error('Использование: node scripts/check_decks.js <каталог презентации> [...] [--all] [--no-browser] [--profile=applications|generic]');
    process.exit(2);
  }

  let errors = 0;
  let warnings = 0;
  for (const dir of dirs) {
    const profile = detectProfile(dir, profileOverride);
    const { issues, slides, stats } = textChecks(dir, profile);
    if (!noBrowser && slides.length > 0) {
      try {
        issues.push(...await overflowChecks(dir, slides.length));
      } catch (error) {
        issues.push({ level: 'error', slide: null, message: `проверка в браузере не выполнена: ${error.message}` });
      }
    }

    const title = path.relative(ROOT, dir);
    const total = stats ? `, дикторский текст ${stats.narrationTotal} слов` : '';
    console.log(`\n${title} [профиль ${profile}] слайдов ${slides.length}${total}`);
    issues.sort((a, b) => (a.slide ?? 0) - (b.slide ?? 0));
    for (const issue of issues) {
      const where = issue.slide ? `слайд ${issue.slide}` : 'колода';
      console.log(`  ${issue.level === 'error' ? '✗' : '!'} ${where}: ${issue.message}`);
      if (issue.level === 'error') errors++;
      else warnings++;
    }
    if (issues.length === 0) console.log('  ✓ замечаний нет');
  }

  console.log(`\nОшибок: ${errors}; предупреждений: ${warnings}`);
  process.exit(errors > 0 ? 1 : 0);
}

main().catch(error => {
  console.error(error);
  process.exit(2);
});
