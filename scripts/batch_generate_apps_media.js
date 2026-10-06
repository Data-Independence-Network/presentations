#!/usr/bin/env node

/**
 * Batch Media Generator for Applications Presentations (01, 02, 03)
 * Synthesizes Edge Neural TTS audio, captures slide screenshots,
 * and generates 16:9 Slide Deck PDFs and A4 Handout Notes PDFs.
 */

const fs = require('fs');
const path = require('path');
const { compileDeckHtml, parseFrontmatter } = require('./core/deck_builder');
const { generateAudioForPresentation } = require('./core/tts_generator');
const { captureSlides } = require('./core/slide_capture');
const { buildSlidesPdf } = require('./core/slides_pdf_builder');
const { buildHandoutPdf } = require('./core/handout_pdf_builder');

const presentations = [
  {
    name: '«КубГолос»',
    dir: path.resolve(__dirname, '../applications_presentations/01_kubgolos_app_presentation'),
    primaryName: '01_kubgolos',
    altName: '01_kubgolos_app'
  },
  {
    name: '«Забота»',
    dir: path.resolve(__dirname, '../applications_presentations/02_zabota_app_presentation'),
    primaryName: '02_zabota',
    altName: '02_zabota_app'
  },
  {
    name: '«Деловой»',
    dir: path.resolve(__dirname, '../applications_presentations/03_delovoy_app_presentation'),
    primaryName: '03_delovoy',
    altName: '03_delovoy_app'
  }
];

async function processPresentation(item, index, total) {
  const pDir = item.dir;
  const docsDir = path.join(pDir, 'docs');
  const mdPath = path.join(docsDir, 'presentation_deck.md');
  const webDeckDir = path.join(pDir, 'generated', 'outputs', 'web_deck');
  const audioDir = path.join(pDir, 'generated', 'artifacts', 'audio');
  const slidesPngDir = path.join(pDir, 'generated', 'artifacts', 'slides_png');
  const pdfDir = path.join(pDir, 'generated', 'outputs', 'pdf');

  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
  if (!fs.existsSync(slidesPngDir)) fs.mkdirSync(slidesPngDir, { recursive: true });
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

  const rawMd = fs.readFileSync(mdPath, 'utf8');
  const { meta } = parseFrontmatter(rawMd);
  const slideCount = meta.total_slides || 15;

  console.log(`\n======================================================================`);
  console.log(` [${index + 1}/${total}] Обработка презентации: ${item.name} (${path.basename(pDir)})`);
  console.log(`     Слайдов: ${slideCount}, Голос: ${meta.voice || 'ru-RU-DmitryNeural'}`);
  console.log(`======================================================================\n`);

  // 1. Компиляция Web Deck HTML
  console.log(`[1/5] Сборка HTML веб-колоды...`);
  compileDeckHtml(pDir, { outputDir: webDeckDir });

  // 2. Синтез аудио (Neural TTS) для всех слайдов с флагом --force
  const skipAudio = process.argv.includes('--skip-audio');
  if (!skipAudio) {
    console.log(`\n[2/5] Синтез нейросетевого аудио для 15 слайдов (Microsoft Edge TTS: ru-RU-DmitryNeural)...`);
    await generateAudioForPresentation({
      narrationFile: mdPath,
      outputDir: audioDir,
      tempDir: path.join(pDir, 'generated', 'artifacts', 'temp_audio_segments'),
      presentationDir: pDir,
      voice: meta.voice || 'ru-RU-DmitryNeural',
      pitch: meta.pitch || '-5Hz',
      rate: meta.rate || '-9%',
      args: ['--force']
    });
  } else {
    console.log(`\n[2/5] Синтез аудио пропущен (--skip-audio): используются существующие мастер-дорожки .mp3`);
  }

  // 3. Захват скриншотов слайдов 1920x1080
  console.log(`\n[3/5] Захват 1920x1080 скриншотов страниц (Playwright Chromium)...`);
  await captureSlides({
    htmlPath: path.join(webDeckDir, 'index.html'),
    outputDir: slidesPngDir,
    slideCount: slideCount,
    delayMs: 300
  });

  // 4. Сборка 16:9 Landscape Slide Deck PDF
  console.log(`\n[4/5] Сборка 16:9 Landscape PDF альбома слайдов...`);
  const slidesPdfPrimary = path.join(pdfDir, `${item.primaryName}_slides.pdf`);
  const slidesPdfAlt = path.join(pdfDir, `${item.altName}_slides.pdf`);
  await buildSlidesPdf({
    slidesDir: slidesPngDir,
    outputPdfPath: slidesPdfPrimary,
    slideCount: slideCount,
    presentationTitle: `Платформа «Турбаза» — ${item.name}`
  });
  fs.copyFileSync(slidesPdfPrimary, slidesPdfAlt);

  // 5. Сборка A4 Executive Notes Handout PDF
  console.log(`\n[5/5] Сборка A4 буклета раздаточного материала с дикторскими заметками...`);
  const notesPdfPrimary = path.join(pdfDir, `${item.primaryName}_notes.pdf`);
  const notesPdfAlt = path.join(pdfDir, `${item.altName}_notes.pdf`);
  await buildHandoutPdf({
    narrationMdPath: mdPath,
    slidesDir: slidesPngDir,
    outputPdfPath: notesPdfPrimary,
    slideCount: slideCount,
    headerLogo: 'ТУРБАЗА',
    headerSubtitle: meta.subtitle || 'Распределенная инфраструктура данных',
    footerTitle: `${meta.title} — ${meta.subtitle}`,
    baseFontSize: '12pt'
  });
  fs.copyFileSync(notesPdfPrimary, notesPdfAlt);

  console.log(`\n[🎉] Успешно сформированы материалы для ${item.name}:`);
  console.log(`     - Аудио дорожки: 15 файлов .mp3 в ${audioDir}`);
  console.log(`     - Скриншоты: 15 файлов .png в ${slidesPngDir}`);
  console.log(`     - PDF слайдов: ${slidesPdfPrimary} (${(fs.statSync(slidesPdfPrimary).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`     - PDF заметок: ${notesPdfPrimary} (${(fs.statSync(notesPdfPrimary).size / (1024 * 1024)).toFixed(2)} MB)`);
}

(async () => {
  const startTime = Date.now();
  console.log(`\n🚀 ЗАПУСК ПАКЕТНОЙ ГЕНЕРАЦИИ АУДИО И PDF ДЛЯ ПРИКЛАДНЫХ ПРЕЗЕНТАЦИЙ`);
  console.log(`======================================================================`);

  for (let i = 0; i < presentations.length; i++) {
    await processPresentation(presentations[i], i, presentations.length);
  }

  const durationMin = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n======================================================================`);
  console.log(` [🌟] ВСЕ 3 ПРЕЗЕНТАЦИИ УСПЕШНО ОБНОВЛЕНЫ ЗА ${durationMin} мин!`);
  console.log(`======================================================================\n`);
})().catch(err => {
  console.error('[❌] Ошибка пакетной генерации:', err);
  process.exit(1);
});
