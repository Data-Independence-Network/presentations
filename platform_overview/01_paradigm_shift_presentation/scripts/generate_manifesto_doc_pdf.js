#!/usr/bin/env node

/**
 * Generates an executive Manifesto & Outline PDF from docs/presentation_outline.md
 * Uses shared core engine from scripts/core/whitepaper_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildWhitepaperPdf } = require('../../../scripts/core/whitepaper_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const markdownPath = path.join(presentationDir, 'docs', 'presentation_outline.md');
const outputPdfPath = path.join(presentationDir, 'generated', 'outputs', 'pdf', '01_paradigm_shift_manifesto.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildWhitepaperPdf({
  markdownPath,
  outputPdfPath,
  tag: 'Эксплейнер &middot; Часть 1 из 3',
  bannerTitle: 'Платформа «Турбаза» — Манифест и Смена парадигмы',
  bannerSubtitle: 'От цифрового феодализма и баз-мишеней к суверенным хранилищам данных и сотрудничающим приложениям',
  headerTitle: 'ТУРБАЗА',
  headerSubtitle: 'Манифест и Смена парадигмы данных',
  footerText: 'Суверенная трехуровневая архитектура данных и распределенных вычислений',
  accentColor: '#facc15'
}).catch(err => {
  console.error('[❌] Manifesto PDF generation error:', err);
  process.exit(1);
});
