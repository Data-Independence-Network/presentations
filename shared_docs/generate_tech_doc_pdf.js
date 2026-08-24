#!/usr/bin/env node

/**
 * Generates an executive technical whitepaper PDF from:
 * shared_docs/Технический документ платформы Турбаза.md
 * Uses shared core engine from scripts/core/whitepaper_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildWhitepaperPdf } = require('../scripts/core/whitepaper_pdf_builder');

const markdownPath = path.join(__dirname, 'Технический документ платформы Турбаза.md');
const outputPdfPath = path.join(__dirname, 'Технический документ платформы Турбаза.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildWhitepaperPdf({
  markdownPath,
  outputPdfPath,
  tag: 'Суверенная архитектура &middot; Техническая спецификация',
  bannerTitle: 'Платформа «Турбаза» — Полный технический документ',
  bannerSubtitle: 'Архитектурные принципы, трехуровневая топология, криптографический контур и экономика API',
  headerTitle: 'ТУРБАЗА',
  headerSubtitle: 'Технический документ платформы',
  footerText: 'Суверенная трехуровневая архитектура данных и распределенных вычислений',
  accentColor: '#0284c7'
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
