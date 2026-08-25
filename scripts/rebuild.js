#!/usr/bin/env node

/**
 * Universal Offline Presentation Rebuilder for Turbase Platform
 * Rebuilds Web Decks, Screenshots, Handout PDFs, and MP4 Videos
 * assuming pre-synthesized audio files are already available in generated/artifacts/audio/.
 * 
 * Usage:
 *   node scripts/rebuild.js <presentation_path|all> [--force]
 * 
 * Examples:
 *   node scripts/rebuild.js overall_presentations/01_sovereign_architecture_presentation
 *   node scripts/rebuild.js all
 *   node scripts/rebuild.js overall_presentations/02_stakeholders_benefits_presentation --force
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const globalNodePath = process.env.NODE_PATH || execSync('npm root -g', { encoding: 'utf8' }).trim();
if (!module.paths.includes(globalNodePath)) {
  module.paths.push(globalNodePath);
}

const { rebuildPresentation, rebuildAllPresentations } = require('./core/incremental_engine');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
Usage:
  node scripts/rebuild.js <presentation_path|all> [--force]

Options:
  <presentation_path>     Relative or absolute path to presentation directory
  all                    Detect and rebuild all presentations in workspace
  --force                Bypass cache and force re-render of HTML, PNG, PDF, and MP4

Examples:
  node scripts/rebuild.js overall_presentations/01_sovereign_architecture_presentation
  node scripts/rebuild.js all
  node scripts/rebuild.js all --force
`);
  process.exit(0);
}

const targetArg = args.find(a => !a.startsWith('--')) || 'all';
const force = args.includes('--force') || args.includes('--full-regeneration');

const rootDir = path.resolve(__dirname, '..');

(async () => {
  try {
    if (targetArg === 'all') {
      await rebuildAllPresentations(rootDir, { force });
    } else {
      const targetPath = path.isAbsolute(targetArg) ? targetArg : path.resolve(rootDir, targetArg);
      if (!fs.existsSync(targetPath)) {
        console.error(`[❌] Error: Directory not found: ${targetPath}`);
        process.exit(1);
      }
      await rebuildPresentation(targetPath, { force });
    }
  } catch (err) {
    console.error(`[❌] Rebuild failed:`, err.message);
    process.exit(1);
  }
})();
