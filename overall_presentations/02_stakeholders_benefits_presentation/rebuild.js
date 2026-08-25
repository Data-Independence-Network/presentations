#!/usr/bin/env node

/**
 * Offline Asset Rebuilder for 02_stakeholders_benefits_presentation
 * Rebuilds Web Deck, Screenshots, Handout PDF, and Videos using pre-generated audio.
 * 
 * Usage:
 *   node rebuild.js [--force]
 */

const path = require('path');
const { rebuildPresentation } = require('../../scripts/core/incremental_engine');

const force = process.argv.includes('--force') || process.argv.includes('--full-regeneration');

rebuildPresentation(__dirname, { force }).catch(err => {
  console.error('[❌] Rebuild error:', err);
  process.exit(1);
});
