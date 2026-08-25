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
const slidesDir = path.join(targetDir, 'generated', 'artifacts', 'slides_png');
const pdfDir = path.join(targetDir, 'generated', 'outputs', 'pdf');

if (!fs.existsSync(docsDir)) {
  console.error(`Error: Docs directory not found at ${docsDir}`);
  process.exit(1);
}

let narrationMdPath = path.join(docsDir, 'presentation_deck.md');
if (!fs.existsSync(narrationMdPath)) {
  const mdFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('narration.md') || f.endsWith('deck.md'));
  if (mdFiles.length === 0) {
    console.error(`Error: No presentation_deck.md or *narration.md file found in ${docsDir}`);
    process.exit(1);
  }
  narrationMdPath = path.join(docsDir, mdFiles[0]);
}

const baseName = path.basename(targetDir).replace(/_presentation$/, '');
const outputPdfPath = path.join(pdfDir, `${baseName}_notes.pdf`);

if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

buildHandoutPdf({
  narrationMdPath,
  slidesDir,
  outputPdfPath
}).catch(err => {
  console.error('[❌] PDF build error:', err);
  process.exit(1);
});
