#!/usr/bin/env node

/**
 * Targeted Incremental Asset Regenerator for 01_paradigm_shift_presentation
 * Detects changes to docs/presentation_deck.md and updates only dirty assets.
 * 
 * Usage:
 *   node regenerate.js [--full-regeneration]
 */

const path = require('path');
const { regeneratePresentation } = require('../../scripts/core/incremental_engine');

const fullRegeneration = process.argv.includes('--full-regeneration') || process.argv.includes('--force');

regeneratePresentation(__dirname, { fullRegeneration }).catch(err => {
  console.error('[❌] Regeneration error:', err);
  process.exit(1);
});
