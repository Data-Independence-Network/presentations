#!/usr/bin/env node

/**
 * Проверка схем Mermaid в Markdown-документах так, как их показывает viewer.html:
 * Mermaid 10, тёмная и светлая темы, колонка статьи шириной 920 px (внутренняя ширина схемы 760 px).
 *
 * Использование:
 *   node scripts/check_markdown_mermaid.js <файл.md> [<файл.md> ...] [--out каталог] [--shots] [--viewer]
 *
 * С ключом --viewer документ открывается в самом viewer.html (через локальный сервер), в обеих темах,
 * поэтому проверяются те же правила разбора и те же настройки Mermaid, что видит читатель.
 *
 * Для каждой схемы выводится: номер, тип, исходная ширина и высота, масштаб при вписывании в колонку,
 * эффективный размер шрифта и замечания. Код возврата 1, если есть синтаксические ошибки или схемы,
 * не проходящие порог читаемости. С ключом --shots рядом сохраняются снимки схем в обеих темах.
 *
 * Переменная MERMAID_JS: путь к локальной копии mermaid.min.js (по умолчанию загружается с jsdelivr, как в viewer.html).
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const COLUMN_WIDTH = 760;
const MIN_EFFECTIVE_FONT_PX = 11;
const MAX_HEIGHT_PX = 760;
const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';

const THEMES = {
  dark: {
    background: '#121c32',
    page: '#0e1626',
    config: {
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#121c32',
        primaryColor: '#0e1626',
        primaryTextColor: '#38bdf8',
        primaryBorderColor: '#38bdf8',
        lineColor: '#38bdf8'
      }
    }
  },
  light: {
    background: '#ffffff',
    page: '#ffffff',
    config: {
      startOnLoad: false,
      theme: 'default',
      themeVariables: {
        primaryColor: '#e0f2fe',
        primaryTextColor: '#0284c7',
        primaryBorderColor: '#0284c7',
        lineColor: '#0284c7'
      }
    }
  }
};

function parseArgs(argv) {
  const files = [];
  let outDir = null;
  let shots = false;
  let viewer = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--viewer') {
      viewer = true;
    } else if (arg === '--out') {
      outDir = path.resolve(argv[i + 1]);
      i += 1;
    } else if (arg === '--shots') {
      shots = true;
    } else {
      files.push(path.resolve(arg));
    }
  }
  return { files, outDir, shots, viewer };
}

function extractMermaidBlocks(markdown) {
  const blocks = [];
  const pattern = /```mermaid\s*([\s\S]*?)```/g;
  let match = pattern.exec(markdown);
  while (match) {
    const line = markdown.slice(0, match.index).split('\n').length;
    blocks.push({ code: match[1].trim(), line });
    match = pattern.exec(markdown);
  }
  return blocks;
}

function diagramType(code) {
  const body = code.replace(/%%\{[\s\S]*?\}%%/g, '').trim();
  return body.split(/\s|\n/)[0];
}

async function loadMermaid(page) {
  const local = process.env.MERMAID_JS;
  if (local) {
    await page.addScriptTag({ path: path.resolve(local) });
  } else {
    await page.addScriptTag({ url: MERMAID_CDN });
  }
}

async function renderOne(page, themeName, code) {
  const theme = THEMES[themeName];
  return page.evaluate(
    async ({ config, code: source, background, width }) => {
      window.mermaid.initialize(config);
      document.body.innerHTML = '';
      const container = document.createElement('div');
      container.id = 'shot';
      container.style.cssText = `background:${background};padding:24px;width:${width + 48}px;box-sizing:border-box;display:flex;justify-content:center;`;
      const holder = document.createElement('div');
      holder.style.cssText = `width:100%;text-align:center;`;
      container.appendChild(holder);
      document.body.appendChild(container);
      try {
        const { svg } = await window.mermaid.render(`m${Math.floor(Math.random() * 1e9)}`, source);
        holder.innerHTML = svg;
        const svgEl = holder.querySelector('svg');
        const viewBox = svgEl.viewBox && svgEl.viewBox.baseVal;
        const natural = viewBox && viewBox.width ? { w: viewBox.width, h: viewBox.height } : { w: svgEl.getBoundingClientRect().width, h: svgEl.getBoundingClientRect().height };
        svgEl.style.maxWidth = '100%';
        svgEl.style.height = 'auto';
        const shown = svgEl.getBoundingClientRect();
        return { ok: true, naturalWidth: natural.w, naturalHeight: natural.h, shownWidth: shown.width, shownHeight: shown.height };
      } catch (error) {
        return { ok: false, message: String(error && error.message ? error.message : error) };
      }
    },
    { config: theme.config, code, background: theme.background, width: COLUMN_WIDTH }
  );
}

function configuredFontSize(code) {
  const fromDirective = /'fontSize'\s*:\s*'(\d+)/.exec(code) || /"fontSize"\s*:\s*"?(\d+)/.exec(code);
  return fromDirective ? Number(fromDirective[1]) : 16;
}


function startStaticServer(rootDir) {
  const http = require('http');
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.json': 'application/json' };
  const server = http.createServer((request, response) => {
    const urlPath = decodeURIComponent(request.url.split('?')[0]);
    const target = path.join(rootDir, urlPath === '/' ? 'viewer.html' : urlPath);
    if (!target.startsWith(rootDir) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      response.writeHead(404);
      response.end('not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

const VIEWER_STAND_IN_DOC = 'shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md';

async function checkInViewer(browser, files, outDir, shots) {
  const root = path.resolve(__dirname, '..');
  const server = await startStaticServer(root);
  const base = `http://127.0.0.1:${server.address().port}`;
  let failures = 0;
  let total = 0;
  for (const file of files) {
    const markdown = fs.readFileSync(file, 'utf-8');
    for (const themeName of Object.keys(THEMES)) {
      const context = await browser.newContext({ viewport: { width: 1480, height: 1000 }, deviceScaleFactor: 2 });
      await context.addInitScript((value) => localStorage.setItem('turbase_theme', value), themeName);
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', (error) => pageErrors.push(String(error)));
      // viewer.html открывает только зарегистрированные документы; подменяем ответ для одного из них.
      await page.route(`**/${VIEWER_STAND_IN_DOC}`, (route) => route.fulfill({ status: 200, contentType: 'text/markdown; charset=utf-8', body: markdown }));
      await page.goto(`${base}/viewer.html?doc=${encodeURIComponent(VIEWER_STAND_IN_DOC)}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.mermaid-container', { timeout: 20000 }).catch(() => null);
      await page.waitForTimeout(2500);
      const found = await page.$$eval('.mermaid-container', (nodes) =>
        nodes.map((node) => {
          const svg = node.querySelector('svg');
          const rect = svg ? svg.getBoundingClientRect() : null;
          const viewBox = svg && svg.viewBox && svg.viewBox.baseVal;
          const text = node.textContent || '';
          return {
            hasSvg: Boolean(svg),
            broken: /Syntax error|Parse error|Lexical error/i.test(text),
            shownWidth: rect ? rect.width : 0,
            shownHeight: rect ? rect.height : 0,
            naturalWidth: viewBox && viewBox.width ? viewBox.width : rect ? rect.width : 0
          };
        })
      );
      const sources = extractMermaidBlocks(markdown);
      console.log(`\n${path.basename(file)} в viewer.html [${themeName}]: схем ${found.length} из ${sources.length}`);
      if (found.length !== sources.length) {
        failures += 1;
        console.log('  ✗ число отрисованных схем не совпало с числом блоков в файле');
      }
      const handles = await page.$$('.mermaid-container');
      for (let index = 0; index < found.length; index += 1) {
        total += 1;
        const item = found[index];
        const source = sources[index] ? sources[index].code : '';
        const scale = item.naturalWidth > 0 ? Math.min(1, item.shownWidth / item.naturalWidth) : 0;
        const effectiveFont = configuredFontSize(source) * scale;
        const notes = [];
        if (!item.hasSvg || item.broken) notes.push('схема не отрисована');
        if (item.hasSvg && effectiveFont < MIN_EFFECTIVE_FONT_PX) notes.push(`мелкий шрифт ${effectiveFont.toFixed(1)} px`);
        if (item.shownHeight > MAX_HEIGHT_PX) notes.push(`высота ${Math.round(item.shownHeight)} px`);
        if (notes.length > 0) failures += 1;
        console.log(`  ${notes.length > 0 ? '✗' : '✓'} #${index + 1} (${sources[index] ? diagramType(sources[index].code) : '?'}) ${Math.round(item.shownWidth)}×${Math.round(item.shownHeight)}, шрифт ${effectiveFont.toFixed(1)} px${notes.length > 0 ? ' — ' + notes.join('; ') : ''}`);
        if (shots && outDir && handles[index]) {
          await handles[index].screenshot({ path: path.join(outDir, `${path.basename(file, '.md')}_viewer_${String(index + 1).padStart(2, '0')}_${themeName}.png`) });
        }
      }
      if (pageErrors.length > 0) {
        failures += 1;
        console.log(`  ✗ ошибки страницы: ${pageErrors.slice(0, 2).join(' | ')}`);
      }
      await context.close();
    }
  }
  server.close();
  return { total, failures };
}

async function main() {
  const { files, outDir, shots, viewer } = parseArgs(process.argv.slice(2));
  if (files.length === 0) {
    console.error('Usage: node scripts/check_markdown_mermaid.js <file.md> [...] [--out dir] [--shots]');
    process.exit(2);
  }
  if (shots && outDir) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  if (viewer) {
    const outcome = await checkInViewer(browser, files, outDir, shots);
    await browser.close();
    console.log(`\nПроверено отрисовок в viewer.html: ${outcome.total}; замечаний: ${outcome.failures}`);
    process.exit(outcome.failures > 0 ? 1 : 0);
  }
  const page = await browser.newPage({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 2 });
  await page.setContent('<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font-family:Inter,-apple-system,"Segoe UI",Roboto,sans-serif}</style></head><body></body></html>');
  await loadMermaid(page);

  let failures = 0;
  let total = 0;
  for (const file of files) {
    const blocks = extractMermaidBlocks(fs.readFileSync(file, 'utf-8'));
    console.log(`\n${path.basename(file)}: схем ${blocks.length}`);
    for (let index = 0; index < blocks.length; index += 1) {
      const { code, line } = blocks[index];
      const label = `#${index + 1} (строка ${line}, ${diagramType(code)})`;
      for (const themeName of Object.keys(THEMES)) {
        total += 1;
        const result = await renderOne(page, themeName, code);
        if (!result.ok) {
          failures += 1;
          console.log(`  ✗ ${label} [${themeName}] ошибка: ${result.message.split('\n')[0]}`);
          continue;
        }
        const scale = Math.min(1, COLUMN_WIDTH / result.naturalWidth);
        const effectiveFont = configuredFontSize(code) * scale;
        const shownHeight = result.naturalHeight * scale;
        const notes = [];
        if (effectiveFont < MIN_EFFECTIVE_FONT_PX) notes.push(`мелкий шрифт ${effectiveFont.toFixed(1)} px`);
        if (shownHeight > MAX_HEIGHT_PX) notes.push(`высота ${Math.round(shownHeight)} px`);
        if (notes.length > 0) failures += 1;
        const mark = notes.length > 0 ? '✗' : '✓';
        console.log(
          `  ${mark} ${label} [${themeName}] ${Math.round(result.naturalWidth)}×${Math.round(result.naturalHeight)} → масштаб ${scale.toFixed(2)}, шрифт ${effectiveFont.toFixed(1)} px${notes.length > 0 ? ' — ' + notes.join('; ') : ''}`
        );
        if (shots && outDir) {
          const base = path.basename(file, '.md');
          const target = path.join(outDir, `${base}_${String(index + 1).padStart(2, '0')}_${themeName}.png`);
          await page.locator('#shot').screenshot({ path: target });
        }
      }
    }
  }
  await browser.close();
  console.log(`\nПроверено отрисовок: ${total}; замечаний: ${failures}`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
