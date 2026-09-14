#!/usr/bin/env node

/**
 * Global CLI runner for generating TTS audio for any presentation directory.
 * Usage:
 *   NODE_PATH=$(npm root -g) node scripts/generate_audio.js <presentation_dir_path> [slide_num|all] [--force]
 */

const fs = require('fs');
const path = require('path');
const { generateAudioForPresentation } = require('./core/tts_generator');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/generate_audio.js <presentation_dir_path> [slide_num|all] [--force]');
  process.exit(1);
}

let targetDir = path.resolve(args[0]);
const remainingArgs = args.slice(1);

if (!fs.existsSync(targetDir)) {
  const rootDir = path.resolve(__dirname, '..');
  const searchDirs = [
    'overall_presentations',
    'platform_overview',
    'applications_presentations',
    'architecture_presentations',
    'detailed_overall_impact_presentations'
  ];
  for (const sub of searchDirs) {
    const parent = path.join(rootDir, sub);
    if (!fs.existsSync(parent)) continue;
    const entries = fs.readdirSync(parent);
    const match = entries.find(e => e === args[0] || e.startsWith(args[0]));
    if (match) {
      targetDir = path.join(parent, match);
      break;
    }
  }
}

// Locate narration markdown file in docs/
const docsDir = path.join(targetDir, 'docs');
if (!fs.existsSync(docsDir)) {
  console.error(`Error: Docs directory not found at ${docsDir}`);
  process.exit(1);
}

let narrationFile = path.join(docsDir, 'presentation_deck.md');
if (!fs.existsSync(narrationFile)) {
  const mdFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('narration.md') || f.endsWith('deck.md'));
  if (mdFiles.length === 0) {
    console.error(`Error: No presentation_deck.md or *narration.md file found in ${docsDir}`);
    process.exit(1);
  }
  narrationFile = path.join(docsDir, mdFiles[0]);
}
const outputDir = path.join(targetDir, 'generated', 'artifacts', 'audio');
const tempDir = path.join(targetDir, 'generated', 'artifacts', 'temp_audio_segments');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

generateAudioForPresentation({
  narrationFile,
  outputDir,
  tempDir,
  presentationDir: targetDir,
  args: remainingArgs
}).catch(err => {
  console.error('[❌] Audio generation error:', err);
  process.exit(1);
});
