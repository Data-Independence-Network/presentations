#!/usr/bin/env node

/**
 * Multi-Profile Video Generator for Sovereign Architecture Presentation
 * Uses shared core engine from scripts/core/video_builder.js
 */

const path = require('path');
const { buildMultiProfileVideo } = require('../../../scripts/core/video_builder');

const presentationDir = path.join(__dirname, '..');
const slidesDir = path.join(presentationDir, 'slides_png');
const audioDir = path.join(presentationDir, 'audio');
const tempDir = path.join(presentationDir, 'temp_video');
const videoExportsDir = path.join(presentationDir, 'video_exports');

const fs = require('fs');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(videoExportsDir)) fs.mkdirSync(videoExportsDir, { recursive: true });

buildMultiProfileVideo({
  slidesDir,
  audioDir,
  tempDir,
  videoExportsDir,
  slideCount: 15,
  baseName: 'turbase_presentation',
  args: process.argv.slice(2)
});
