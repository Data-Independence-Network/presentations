#!/usr/bin/env node

/**
 * Generates an executive A4 Notes PDF Handout for Sovereign Architecture Presentation
 * Uses shared core engine from scripts/core/handout_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildHandoutPdf } = require('../../../scripts/core/handout_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const narrationMdPath = path.join(presentationDir, 'docs', 'presentation_deck.md');
const slidesDir = path.join(presentationDir, 'slides_png');
const outputPdfPath = path.join(presentationDir, 'docs', 'turbase_presentation_notes.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildHandoutPdf({
  narrationMdPath,
  slidesDir,
  outputPdfPath,
  slideCount: 15,
  headerSubtitle: 'Суверенная трехуровневая архитектура',
  footerTitle: 'Платформа «Турбаза» — Суверенная трехуровневая архитектура данных',
  baseFontSize: '13.5pt'
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
