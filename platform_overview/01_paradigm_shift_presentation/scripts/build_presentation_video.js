#!/usr/bin/env node

/**
 * Multi-Profile Video Generator for 01_paradigm_shift_presentation
 * Uses shared core engine from scripts/core/video_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildMultiProfileVideo } = require('../../../scripts/core/video_builder');

const presentationDir = path.join(__dirname, '..');
const slidesDir = path.join(presentationDir, 'generated', 'artifacts', 'slides_png');
const audioDir = path.join(presentationDir, 'generated', 'artifacts', 'audio');
const tempDir = path.join(presentationDir, 'generated', 'artifacts', 'temp_video');
const videoExportsDir = path.join(presentationDir, 'generated', 'outputs', 'video');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(videoExportsDir)) fs.mkdirSync(videoExportsDir, { recursive: true });

buildMultiProfileVideo({
  slidesDir,
  audioDir,
  tempDir,
  videoExportsDir,
  slideCount: 12,
  baseName: 'turbase_platform_01_paradigm_shift',
  args: process.argv.slice(2)
});
