#!/usr/bin/env node

/**
 * Universal Smart Incremental Asset Regeneration Runner for Turbase Platform
 * Usage:
 *   node scripts/regenerate.js <presentation_path> [--full-regeneration]
 *   node scripts/regenerate.js all [--full-regeneration]
 * 
 * Examples:
 *   node scripts/regenerate.js overall_presentations/01_sovereign_architecture_presentation
 *   node scripts/regenerate.js all
 *   node scripts/regenerate.js overall_presentations/02_stakeholders_benefits_presentation --full-regeneration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const globalNodePath = process.env.NODE_PATH || execSync('npm root -g', { encoding: 'utf8' }).trim();
if (!module.paths.includes(globalNodePath)) {
  module.paths.push(globalNodePath);
}

const { regeneratePresentation, regenerateAllPresentations } = require('./core/incremental_engine');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
Usage:
  node scripts/regenerate.js <presentation_path|all> [--full-regeneration]

Options:
  <presentation_path>     Relative or absolute path to presentation directory
  all                    Detect and incrementally regenerate all presentations in workspace
  --full-regeneration    Bypass cache and force 100% rebuild of all assets (.mp3, .png, .pdf, .mp4)

Examples:
  node scripts/regenerate.js overall_presentations/01_sovereign_architecture_presentation
  node scripts/regenerate.js all
  node scripts/regenerate.js all --full-regeneration
`);
  process.exit(0);
}

const targetArg = args.find(a => !a.startsWith('--')) || 'all';
const fullRegeneration = args.includes('--full-regeneration') || args.includes('--force');

const rootDir = path.resolve(__dirname, '..');

(async () => {
  try {
    if (targetArg === 'all') {
      await regenerateAllPresentations(rootDir, { fullRegeneration });
    } else {
      const targetPath = path.isAbsolute(targetArg) ? targetArg : path.resolve(rootDir, targetArg);
      if (!fs.existsSync(targetPath)) {
        console.error(`[❌] Error: Directory not found: ${targetPath}`);
        process.exit(1);
      }
      await regeneratePresentation(targetPath, { fullRegeneration });
    }
  } catch (err) {
    console.error(`[❌] Regeneration failed:`, err.message);
    process.exit(1);
  }
})();
