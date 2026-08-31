#!/usr/bin/env node

/**
 * Slide Screenshot Capture for 01_paradigm_shift_presentation
 * Captures 1920x1080 PNG slides using shared core engine from scripts/core/slide_capture.js
 */

const fs = require('fs');
const path = require('path');
const { captureSlides } = require('../../../scripts/core/slide_capture');

const presentationDir = path.join(__dirname, '..');
const htmlPath = path.join(presentationDir, 'generated', 'outputs', 'web_deck', 'index.html');
const outputDir = path.join(presentationDir, 'generated', 'artifacts', 'slides_png');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

captureSlides({
  htmlPath,
  outputDir,
  slideCount: 12
}).catch(err => {
  console.error('[❌] Error capturing slides:', err);
  process.exit(1);
});
