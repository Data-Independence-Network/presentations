#!/usr/bin/env node

/**
 * End-to-End Orchestrator for Turbase Presentations
 * Runs: TTS Audio -> Slide Screenshot Capture -> Handout PDF -> Multi-Profile Video
 * 
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/build_all.js <presentation_dir_path> [--force-audio]
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_all.js <presentation_dir_path> [--force-audio]');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const forceAudio = args.includes('--force-audio');

console.log(`\n======================================================================`);
console.log(` 🚀 STARTING FULL BUILD PIPELINE FOR: ${path.basename(targetDir)}`);
console.log(`======================================================================\n`);

const scriptsDir = __dirname;
const globalNodePath = process.env.NODE_PATH || execSync('npm root -g', { encoding: 'utf8' }).trim();
const env = { ...process.env, NODE_PATH: globalNodePath };

try {
  // 1. Audio Generation
  console.log(`[Step 1/4] Generating TTS Audio...`);
  execSync(`node "${path.join(scriptsDir, 'generate_audio.js')}" "${targetDir}" all ${forceAudio ? '--force' : ''}`, {
    stdio: 'inherit',
    env
  });

  // 2. Slide Screenshots Capture
  console.log(`\n[Step 2/4] Capturing 1920x1080 Slide Screenshots...`);
  execSync(`node "${path.join(scriptsDir, 'capture_slides.js')}" "${targetDir}"`, {
    stdio: 'inherit',
    env
  });

  // 3. Handout Notes PDF Generation
  console.log(`\n[Step 3/4] Compiling Executive Notes PDF Handout...`);
  execSync(`node "${path.join(scriptsDir, 'build_handout_pdf.js')}" "${targetDir}"`, {
    stdio: 'inherit',
    env
  });

  // 4. Video Rendering (Multi-profile: 10mb, email, master)
  console.log(`\n[Step 4/4] Rendering Multi-Profile MP4 Videos...`);
  execSync(`node "${path.join(scriptsDir, 'build_video.js')}" "${targetDir}" all`, {
    stdio: 'inherit',
    env
  });

  console.log(`\n======================================================================`);
  console.log(` [🎉] FULL BUILD COMPLETED SUCCESSFULLY FOR: ${path.basename(targetDir)}`);
  console.log(`======================================================================\n`);
} catch (err) {
  console.error(`\n[❌] Build pipeline failed:`, err.message);
  process.exit(1);
}
