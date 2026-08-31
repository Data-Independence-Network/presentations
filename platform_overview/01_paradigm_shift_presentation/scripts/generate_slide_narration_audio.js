#!/usr/bin/env node

/**
 * Slide Audio Narration Generator for 01_paradigm_shift_presentation
 * Uses Microsoft Edge Neural TTS ('ru-RU-DmitryNeural') via scripts/core/tts_generator.js
 */

const fs = require('fs');
const path = require('path');
const { generateAudioForPresentation } = require('../../../scripts/core/tts_generator');

const presentationDir = path.join(__dirname, '..');
const narrationFile = path.join(presentationDir, 'docs', 'presentation_deck.md');
const outputDir = path.join(presentationDir, 'generated', 'artifacts', 'audio');
const tempDir = path.join(presentationDir, 'generated', 'artifacts', 'temp_audio_segments');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

generateAudioForPresentation({
  narrationFile,
  outputDir,
  tempDir,
  voice: 'ru-RU-DmitryNeural',
  pitch: '-5Hz',
  rate: '-9%',
  args: process.argv.slice(2)
}).catch(err => {
  console.error('[❌] Audio generation error:', err);
  process.exit(1);
});
