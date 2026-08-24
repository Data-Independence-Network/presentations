#!/usr/bin/env node

/**
 * Slide Audio Narration Generator for Sovereign Architecture Presentation
 * Uses shared core engine from scripts/core/tts_generator.js
 */

const fs = require('fs');
const path = require('path');
const { generateAudioForPresentation } = require('../../../scripts/core/tts_generator');

const presentationDir = path.join(__dirname, '..');
const narrationFile = path.join(presentationDir, 'docs', 'turbase_presentation_narration.md');
const outputDir = path.join(presentationDir, 'audio');
const tempDir = path.join(presentationDir, 'temp_audio_segments');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

generateAudioForPresentation({
  narrationFile,
  outputDir,
  tempDir,
  args: process.argv.slice(2)
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
