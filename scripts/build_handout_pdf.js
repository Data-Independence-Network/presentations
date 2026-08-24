#!/usr/bin/env node

/**
 * Global CLI runner for building executive A4 Notes PDF Handouts for any presentation directory.
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/build_handout_pdf.js <presentation_dir_path> [header_subtitle] [slide_count]
 */

const fs = require('fs');
const path = require('path');
const { buildHandoutPdf } = require('./core/handout_pdf_builder');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_handout_pdf.js <presentation_dir_path> [header_subtitle] [slide_count]');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const docsDir = path.join(targetDir, 'docs');
const slidesDir = path.join(targetDir, 'slides_png');

if (!fs.existsSync(docsDir)) {
  console.error(`Error: Docs directory not found at ${docsDir}`);
  process.exit(1);
}

const mdFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('narration.md'));
if (mdFiles.length === 0) {
  console.error(`Error: No *narration.md file found in ${docsDir}`);
  process.exit(1);
}

const narrationMdPath = path.join(docsDir, mdFiles[0]);

// Check for existing notes PDF or generate canonical filename
const existingPdf = fs.readdirSync(docsDir).find(f => f.endsWith('notes.pdf'));
let outputPdfPath;
if (existingPdf) {
  outputPdfPath = path.join(docsDir, existingPdf);
} else {
  const baseName = path.basename(targetDir).replace(/^0\d+_/, '').replace(/_presentation$/, '');
  outputPdfPath = path.join(docsDir, `turbase_${baseName}_presentation_notes.pdf`);
}

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Detect slide count from slides_png/ or default
let slideCount = parseInt(args[2], 10);
if (!slideCount || isNaN(slideCount)) {
  if (fs.existsSync(slidesDir)) {
    const pngs = fs.readdirSync(slidesDir).filter(f => f.startsWith('slide_') && f.endsWith('.png'));
    if (pngs.length > 0) slideCount = pngs.length;
  }
}
if (!slideCount) slideCount = 10;

const headerSubtitle = args[1] || 'Суверенная трехуровневая архитектура данных';

buildHandoutPdf({
  narrationMdPath,
  slidesDir,
  outputPdfPath,
  slideCount,
  headerSubtitle
}).catch(err => {
  console.error('[❌] PDF build error:', err);
  process.exit(1);
});
