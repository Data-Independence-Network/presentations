#!/usr/bin/env node

/**
 * Global CLI runner for building 16:9 Landscape Slide Deck PDFs for any presentation directory.
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/build_slides_pdf.js <presentation_dir_path> [slide_count]
 */

const fs = require('fs');
const path = require('path');
const { buildSlidesPdf } = require('./core/slides_pdf_builder');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_slides_pdf.js <presentation_dir_path> [slide_count]');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const slidesDir = path.join(targetDir, 'generated', 'artifacts', 'slides_png');
const pdfDir = path.join(targetDir, 'generated', 'outputs', 'pdf');

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

const baseName = path.basename(targetDir).replace(/^0\d+_/, '').replace(/_presentation$/, '');
const outputPdfPath = path.join(pdfDir, `turbase_${baseName}_slides.pdf`);

// Detect slide count from slides_png/ or default
let slideCount = parseInt(args[1], 10);
if (!slideCount || isNaN(slideCount)) {
  if (fs.existsSync(slidesDir)) {
    const pngs = fs.readdirSync(slidesDir).filter(f => f.startsWith('slide_') && f.endsWith('.png'));
    if (pngs.length > 0) slideCount = pngs.length;
  }
}
if (!slideCount) slideCount = 10;

buildSlidesPdf({
  slidesDir,
  outputPdfPath,
  slideCount,
  presentationTitle: `Платформа «Турбаза» — Слайды презентации (${baseName})`
}).catch(err => {
  console.error('[❌] Slide Deck PDF build error:', err);
  process.exit(1);
});
