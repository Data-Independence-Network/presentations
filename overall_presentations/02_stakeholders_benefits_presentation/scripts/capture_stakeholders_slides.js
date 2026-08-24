#!/usr/bin/env node

/**
 * Slide Screenshot Capture for Stakeholders Benefits Presentation
 * Uses shared core engine from scripts/core/slide_capture.js
 */

const fs = require('fs');
const path = require('path');
const { captureSlides } = require('../../../scripts/core/slide_capture');

const presentationDir = path.join(__dirname, '..');
const htmlPath = path.join(presentationDir, 'web_deck', 'index.html');
const outputDir = path.join(presentationDir, 'slides_png');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

captureSlides({
  htmlPath,
  outputDir,
  slideCount: 15
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
