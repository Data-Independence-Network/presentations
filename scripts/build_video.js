#!/usr/bin/env node

/**
 * Global CLI runner for building MP4 videos for any presentation directory.
 * Usage:
 *   node scripts/build_video.js <presentation_dir_path> [profile: 10mb|email|master|all]
 */

const fs = require('fs');
const path = require('path');
const { buildMultiProfileVideo } = require('./core/video_builder');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_video.js <presentation_dir_path> [profile: 10mb|email|master|all]');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const profileArg = args[1] || 'all';

const slidesDir = path.join(targetDir, 'generated', 'artifacts', 'slides_png');
const audioDir = path.join(targetDir, 'generated', 'artifacts', 'audio');
const tempDir = path.join(targetDir, 'generated', 'artifacts', 'temp_video');
const videoExportsDir = path.join(targetDir, 'generated', 'outputs', 'video');

if (!fs.existsSync(slidesDir) || !fs.existsSync(audioDir)) {
  console.error(`Error: slides_png or audio directory not found in ${targetDir}/generated/artifacts/`);
  process.exit(1);
}

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(videoExportsDir)) fs.mkdirSync(videoExportsDir, { recursive: true });

// Auto-detect slide count
const pngs = fs.readdirSync(slidesDir).filter(f => f.startsWith('slide_') && f.endsWith('.png'));
const slideCount = pngs.length || 10;

const baseName = `turbase_${path.basename(targetDir).replace(/^0\d+_/, '').replace(/_presentation$/, '')}`;

buildMultiProfileVideo({
  slidesDir,
  audioDir,
  tempDir,
  videoExportsDir,
  slideCount,
  baseName,
  args: [profileArg]
});
