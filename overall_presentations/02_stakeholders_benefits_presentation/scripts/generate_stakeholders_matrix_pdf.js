#!/usr/bin/env node

/**
 * Generates an executive Whitepaper PDF from turbase_stakeholders_value_matrix.md
 * Uses shared core engine from scripts/core/whitepaper_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildWhitepaperPdf } = require('../../../scripts/core/whitepaper_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const markdownPath = path.join(presentationDir, 'docs', 'turbase_stakeholders_value_matrix.md');
const outputPdfPath = path.join(presentationDir, 'docs', 'turbase_stakeholders_value_matrix.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildWhitepaperPdf({
  markdownPath,
  outputPdfPath,
  tag: 'Аналитический отчет &middot; Матрица выгод экосистемы',
  bannerTitle: 'Платформа «Турбаза» — Аналитический отчет для участников экосистемы',
  bannerSubtitle: 'Комплексный анализ выгод, рисков и компенсационных механизмов для стейкхолдеров',
  headerTitle: 'ТУРБАЗА',
  headerSubtitle: 'Выгоды платформы для участников экосистемы',
  footerText: 'Платформа «Турбаза» — Суверенная трехуровневая архитектура и аналитическая матрица выгод',
  accentColor: '#0284c7'
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
