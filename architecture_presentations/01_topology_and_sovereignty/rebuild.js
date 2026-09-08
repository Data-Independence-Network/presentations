#!/usr/bin/env node
const path = require("path");
const { rebuildPresentation } = require("../../scripts/core/incremental_engine");

const force = process.argv.includes("--force") || process.argv.includes("--full-regeneration");

rebuildPresentation(__dirname, { force }).catch(err => {
  console.error("[❌] Rebuild error:", err);
  process.exit(1);
});
