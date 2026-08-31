#!/usr/bin/env node

/**
 * Generates a 16:9 Landscape Slide Deck PDF for 01_paradigm_shift_presentation
 * Uses shared core engine from scripts/core/slides_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildSlidesPdf } = require('../../../scripts/core/slides_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const slidesDir = path.join(presentationDir, 'generated', 'artifacts', 'slides_png');
const outputPdfPath = path.join(presentationDir, 'generated', 'outputs', 'pdf', '01_paradigm_shift_slides.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildSlidesPdf({
  slidesDir,
  outputPdfPath,
  slideCount: 12,
  presentationTitle: 'Платформа «Турбаза» — Эксплейнер: Манифест и Смена парадигмы (Часть 1)'
}).catch(err => {
  console.error('[❌] Slide Deck PDF error:', err);
  process.exit(1);
});
