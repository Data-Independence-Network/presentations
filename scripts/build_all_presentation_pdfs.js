#!/usr/bin/env node

/**
 * Universal Presentation PDF Generator for Turbase Platform
 * Generates fresh 16:9 Landscape Slide Deck PDFs and A4 Executive Notes Handout PDFs
 * for presentations by capturing 1920x1080 slide screenshots from compiled Web Decks.
 *
 * Usage:
 *   node scripts/build_all_presentation_pdfs.js [presentation_path|group|all]
 *
 * Groups:
 *   core9    - 9 active generated presentations with master audio
 *   apps     - 5 flagship applications presentations
 *   platform - 3 platform overview presentations
 *   overall  - 2 overall presentations + companions
 *   impact   - 10 detailed impact presentations
 *   arch     - 7 architecture engineering presentations
 *   all      - All 27 presentations in workspace
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const globalNodePath = process.env.NODE_PATH || execSync('npm root -g', { encoding: 'utf8' }).trim();
if (!module.paths.includes(globalNodePath)) {
  module.paths.push(globalNodePath);
}

const { compileDeckHtml, parseFrontmatter } = require('./core/deck_builder');
const { captureSlides } = require('./core/slide_capture');
const { buildSlidesPdf } = require('./core/slides_pdf_builder');
const { buildHandoutPdf } = require('./core/handout_pdf_builder');
const { buildWhitepaperPdf } = require('./core/whitepaper_pdf_builder');
const { discoverAllPresentations } = require('./core/incremental_engine');

const rootDir = path.resolve(__dirname, '..');

const CORE_9_PRESENTATIONS = [
  'applications_presentations/01_kubgolos_app_presentation',
  'applications_presentations/02_zabota_app_presentation',
  'applications_presentations/03_delovoy_app_presentation',
  'applications_presentations/04_uratur_app_presentation',
  'overall_presentations/01_sovereign_architecture_presentation',
  'overall_presentations/02_stakeholders_benefits_presentation',
  'platform_overview/01_paradigm_shift_presentation',
  'platform_overview/02_architecture_principles_presentation',
  'platform_overview/03_sovereign_economy_presentation'
];

async function generatePdfsForPresentation(presentationDir) {
  const pDir = path.resolve(presentationDir);
  const relPath = path.relative(rootDir, pDir);
  const baseFolder = path.basename(pDir);
  const cleanBase = baseFolder.replace(/_presentation$/, '');

  const mdPath = path.join(pDir, 'docs', 'presentation_deck.md');
  if (!fs.existsSync(mdPath)) {
    console.warn(`[⚠️] Skipping ${relPath}: docs/presentation_deck.md not found.`);
    return;
  }

  const rawMd = fs.readFileSync(mdPath, 'utf8');
  const { meta } = parseFrontmatter(rawMd);
  const slideCount = meta.total_slides || 15;
  const presentationTitle = meta.title || `Платформа «Турбаза» — ${cleanBase}`;

  const webDeckDir = path.join(pDir, 'generated', 'outputs', 'web_deck');
  const slidesPngDir = path.join(pDir, 'generated', 'artifacts', 'slides_png');
  const pdfDir = path.join(pDir, 'generated', 'outputs', 'pdf');

  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
  if (!fs.existsSync(slidesPngDir)) fs.mkdirSync(slidesPngDir, { recursive: true });

  console.log(`\n======================================================================`);
  console.log(` 📄 Генерация PDF для: ${cleanBase} (${relPath})`);
  console.log(`    Слайдов: ${slideCount}, Заголовок: ${presentationTitle}`);
  console.log(`======================================================================`);

  // 1. Компиляция HTML веб-колоды
  console.log(`[1/4] Компиляция актуальной веб-колоды HTML...`);
  compileDeckHtml(pDir, { outputDir: webDeckDir });

  // 2. Захват свежих скриншотов 1920x1080
  console.log(`[2/4] Захват 1920x1080 скриншотов страниц (Playwright Chromium)...`);
  await captureSlides({
    htmlPath: path.join(webDeckDir, 'index.html'),
    outputDir: slidesPngDir,
    slideCount,
    delayMs: 300
  });

  // 3. Сборка 16:9 Landscape Slide Deck PDF
  console.log(`[3/4] Сборка 16:9 Landscape Slide Deck PDF...`);
  const slidesPdfPrimary = path.join(pdfDir, `${cleanBase}_slides.pdf`);
  await buildSlidesPdf({
    slidesDir: slidesPngDir,
    outputPdfPath: slidesPdfPrimary,
    slideCount,
    presentationTitle
  });

  // Дополнительные алиасы имен для совместимости
  const extraSlidesAliases = [];
  if (cleanBase.endsWith('_app')) {
    extraSlidesAliases.push(cleanBase.replace(/_app$/, '') + '_slides.pdf');
  } else {
    extraSlidesAliases.push(cleanBase + '_app_slides.pdf');
  }
  if (cleanBase.includes('delovoy')) {
    extraSlidesAliases.push('turbase_delovoy_app_slides.pdf');
  }

  for (const alias of extraSlidesAliases) {
    const aliasPath = path.join(pdfDir, alias);
    try {
      fs.copyFileSync(slidesPdfPrimary, aliasPath);
    } catch (e) {}
  }

  // 4. Сборка A4 Executive Notes Handout PDF
  console.log(`[4/4] Сборка A4 буклета с дикторским текстом (Notes Handout PDF)...`);
  const notesPdfPrimary = path.join(pdfDir, `${cleanBase}_notes.pdf`);
  await buildHandoutPdf({
    narrationMdPath: mdPath,
    slidesDir: slidesPngDir,
    outputPdfPath: notesPdfPrimary,
    slideCount
  });

  const extraNotesAliases = [];
  if (cleanBase.endsWith('_app')) {
    extraNotesAliases.push(cleanBase.replace(/_app$/, '') + '_notes.pdf');
  } else {
    extraNotesAliases.push(cleanBase + '_app_notes.pdf');
  }

  for (const alias of extraNotesAliases) {
    const aliasPath = path.join(pdfDir, alias);
    try {
      fs.copyFileSync(notesPdfPrimary, aliasPath);
    } catch (e) {}
  }

  // 5. Специализированные сопровождающие документы (если применимо)
  if (cleanBase === '01_sovereign_architecture') {
    console.log(`[5/5] Сборка сопровождающего буклета turbase_presentation_visuals.pdf...`);
    const visualsPdfPath = path.join(pdfDir, 'turbase_presentation_visuals.pdf');
    try {
      await buildWhitepaperPdf({
        markdownPath: mdPath,
        outputPdfPath: visualsPdfPath
      });
      console.log(`[✓] Скомпилирован буклет: ${visualsPdfPath}`);
    } catch (e) {
      console.warn(`[⚠️] Ошибка компиляции visuals: ${e.message}`);
    }
  } else if (cleanBase === '02_stakeholders_benefits') {
    console.log(`[5/5] Сборка сопровождающего отчета turbase_stakeholders_value_matrix.pdf...`);
    const matrixMdPath = path.join(pDir, 'docs', 'turbase_stakeholders_value_matrix.md');
    const matrixPdfPath = path.join(pdfDir, 'turbase_stakeholders_value_matrix.pdf');
    if (fs.existsSync(matrixMdPath)) {
      try {
        await buildWhitepaperPdf({
          markdownPath: matrixMdPath,
          outputPdfPath: matrixPdfPath
        });
        console.log(`[✓] Скомпилирован отчет: ${matrixPdfPath}`);
      } catch (e) {
        console.warn(`[⚠️] Ошибка компиляции matrix: ${e.message}`);
      }
    }
  }

  console.log(`[🎉] Завершено для ${cleanBase}!`);
}

async function main() {
  const arg = process.argv[2] || 'core9';

  let targets = [];

  if (arg === 'core9') {
    targets = CORE_9_PRESENTATIONS.map(p => path.join(rootDir, p));
  } else if (arg === 'apps') {
    targets = [
      'applications_presentations/01_kubgolos_app_presentation',
      'applications_presentations/02_zabota_app_presentation',
      'applications_presentations/03_delovoy_app_presentation',
      'applications_presentations/04_uratur_app_presentation',
      'applications_presentations/05_local_services_presentation'
    ].map(p => path.join(rootDir, p));
  } else if (arg === 'platform') {
    targets = [
      'platform_overview/01_paradigm_shift_presentation',
      'platform_overview/02_architecture_principles_presentation',
      'platform_overview/03_sovereign_economy_presentation'
    ].map(p => path.join(rootDir, p));
  } else if (arg === 'overall') {
    targets = [
      'overall_presentations/01_sovereign_architecture_presentation',
      'overall_presentations/02_stakeholders_benefits_presentation'
    ].map(p => path.join(rootDir, p));
  } else if (arg === 'all') {
    targets = discoverAllPresentations(rootDir);
  } else {
    // Specific path or name
    const candidate = path.resolve(rootDir, arg);
    if (fs.existsSync(candidate)) {
      targets = [candidate];
    } else {
      const all = discoverAllPresentations(rootDir);
      const matched = all.filter(p => p.includes(arg));
      if (matched.length > 0) {
        targets = matched;
      } else {
        console.error(`[❌] Не найдено презентаций по запросу: ${arg}`);
        process.exit(1);
      }
    }
  }

  console.log(`\n🚀 Запуск сборки PDF для ${targets.length} презентаций (режим: ${arg})...\n`);

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    console.log(`[${i + 1}/${targets.length}] Старт презентации: ${path.basename(t)}`);
    await generatePdfsForPresentation(t);
  }

  console.log(`\n✨ Все PDF презентаций успешно собраны и актуализированы!\n`);
}

main().catch(err => {
  console.error('[❌] Фатальная ошибка сборки PDF:', err);
  process.exit(1);
});
