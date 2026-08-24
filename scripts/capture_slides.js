#!/usr/bin/env node

/**
 * Global CLI runner for capturing slide screenshots for any presentation directory.
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/capture_slides.js <presentation_dir_path> [slide_count]
 */

const fs = require('fs');
const path = require('path');
const { captureSlides } = require('./core/slide_capture');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/capture_slides.js <presentation_dir_path> [slide_count]');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const htmlPath = path.join(targetDir, 'web_deck', 'index.html');
const outputDir = path.join(targetDir, 'slides_png');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

if (!fs.existsSync(htmlPath)) {
  console.error(`Error: web_deck/index.html not found at ${htmlPath}`);
  process.exit(1);
}

// Determine slide count from arg, or auto-detect from audio/ or web_deck
let slideCount = parseInt(args[1], 10);
if (!slideCount || isNaN(slideCount)) {
  const audioDir = path.join(targetDir, 'audio');
  if (fs.existsSync(audioDir)) {
    const audioFiles = fs.readdirSync(audioDir).filter(f => f.startsWith('slide_') && f.endsWith('.mp3'));
    if (audioFiles.length > 0) slideCount = audioFiles.length;
  }
}
if (!slideCount) slideCount = 10; // Default to 10 for deep-dive series

captureSlides({
  htmlPath,
  outputDir,
  slideCount
}).catch(err => {
  console.error('[❌] Slide capture error:', err);
  process.exit(1);
});
