#!/usr/bin/env node
const path = require("path");
const { regeneratePresentation } = require("../../scripts/core/incremental_engine");

const fullRegeneration = process.argv.includes("--full-regeneration") || process.argv.includes("--force");

regeneratePresentation(__dirname, { fullRegeneration }).catch(err => {
  console.error("[❌] Regeneration error:", err);
  process.exit(1);
});
