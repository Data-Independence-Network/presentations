#!/usr/bin/env node

/**
 * Generates an executive A4 Notes PDF Handout for 01_paradigm_shift_presentation
 * Uses shared core engine from scripts/core/handout_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildHandoutPdf } = require('../../../scripts/core/handout_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const narrationMdPath = path.join(presentationDir, 'docs', 'presentation_deck.md');
const slidesDir = path.join(presentationDir, 'generated', 'artifacts', 'slides_png');
const outputPdfPath = path.join(presentationDir, 'generated', 'outputs', 'pdf', '01_paradigm_shift_notes.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildHandoutPdf({
  narrationMdPath,
  slidesDir,
  outputPdfPath
}).catch(err => {
  console.error('[❌] Notes Handout PDF error:', err);
  process.exit(1);
});
