#!/usr/bin/env node

/**
 * Global CLI runner for compiling Markdown presentation sources into interactive Web Decks (index.html).
 * Usage:
 *   node scripts/build_deck_html.js <presentation_dir_path>
 */

const fs = require('fs');
const path = require('path');
const { compileDeckHtml } = require('./core/deck_builder');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build_deck_html.js <presentation_dir_path>');
  process.exit(1);
}

const targetDir = path.resolve(args[0]);
const docsDir = path.join(targetDir, 'docs');
const webDeckDir = path.join(targetDir, 'generated', 'outputs', 'web_deck');

if (!fs.existsSync(docsDir)) {
  console.error(`Error: docs directory not found at ${docsDir}`);
  process.exit(1);
}

if (!fs.existsSync(webDeckDir)) {
  fs.mkdirSync(webDeckDir, { recursive: true });
}

try {
  compileDeckHtml(targetDir, { outputDir: webDeckDir });
} catch (err) {
  console.error('[❌] Deck compilation error:', err.message);
  process.exit(1);
}
