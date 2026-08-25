#!/usr/bin/env node

/**
 * Generates an executive Architectural Visuals Blueprint PDF from turbase_presentation_visuals.md
 * Uses shared core engine from scripts/core/whitepaper_pdf_builder.js
 */

const fs = require('fs');
const path = require('path');
const { buildWhitepaperPdf } = require('../../../scripts/core/whitepaper_pdf_builder');

const presentationDir = path.join(__dirname, '..');
const markdownPath = path.join(presentationDir, 'docs', 'presentation_deck.md');
const outputPdfPath = path.join(presentationDir, 'docs', 'turbase_presentation_visuals.pdf');

const outputDir = path.dirname(outputPdfPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

buildWhitepaperPdf({
  markdownPath,
  outputPdfPath,
  tag: 'Архитектурный отчет &middot; Спецификация визуальных схем',
  bannerTitle: 'Платформа «Турбаза» — Архитектурные визуальные материалы',
  bannerSubtitle: 'Спецификация 15 слайдов, векторные схемы Mermaid, топология дерева и ключевые опоры',
  headerTitle: 'ТУРБАЗА',
  headerSubtitle: 'Суверенная архитектура — Визуальные материалы',
  footerText: 'Платформа «Турбаза» — Суверенная трехуровневая архитектура данных',
  accentColor: '#0284c7'
}).catch(err => {
  console.error('[❌] Error:', err);
  process.exit(1);
});
