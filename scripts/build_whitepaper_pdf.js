#!/usr/bin/env node

/**
 * Global CLI runner for building Whitepaper / Value Matrix PDFs from markdown.
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/build_whitepaper_pdf.js <markdown_file_path> [output_pdf_path]
 */

const fs = require('fs');
const path = require('path');
const { buildWhitepaperPdf } = require('./core/whitepaper_pdf_builder');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_whitepaper_pdf.js <markdown_file_path> [output_pdf_path]');
  process.exit(1);
}

const markdownPath = path.resolve(args[0]);
let outputPdfPath = args[1] ? path.resolve(args[1]) : markdownPath.replace(/\.md$/, '.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildWhitepaperPdf({
  markdownPath,
  outputPdfPath
}).catch(err => {
  console.error('[❌] Whitepaper PDF build error:', err);
  process.exit(1);
});
