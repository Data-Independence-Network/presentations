#!/usr/bin/env node

/**
 * Generates an executive A4 Notes PDF Handout for Stakeholders Benefits Presentation
 * Uses shared core engine from scripts/core/handout_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildHandoutPdf } = require('../../../scripts/core/handout_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const narrationMdPath = path.join(presentationDir, 'docs', 'presentation_deck.md');
const slidesDir = path.join(presentationDir, 'slides_png');
const outputPdfPath = path.join(presentationDir, 'docs', 'turbase_stakeholders_presentation_notes.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildHandoutPdf({
  narrationMdPath,
  slidesDir,
  outputPdfPath,
  slideCount: 15,
  headerSubtitle: 'Выгоды платформы для стейкхолдеров',
  footerTitle: 'Платформа «Турбаза» — Суверенная трехуровневая архитектура и аналитическая матрица выгод',
  baseFontSize: '14pt'
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
