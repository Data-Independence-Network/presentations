/**
 * Core Executive Whitepaper & Value Matrix PDF Builder using Playwright & Mermaid.js
 * Compiles rich Markdown documents (with Mermaid vector diagrams, tables, ASCII art, and callouts)
 * into publication-grade executive A4 PDFs.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let chromium;
try {
  chromium = require('playwright').chromium;
} catch (e) {
  const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  module.paths.push(globalRoot);
  chromium = require('playwright').chromium;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function markdownToHtml(content) {
  const blocks = [];

  // 1. Stash mermaid blocks
  let text = content.replace(/```mermaid\s*([\s\S]*?)```/g, (match, code) => {
    const id = `___MERMAID_BLOCK_${blocks.length}___`;
    blocks.push(`<div class="mermaid-diagram"><div class="mermaid">\n${code.trim()}\n</div></div>`);
    return id;
  });

  // 2. Stash code blocks and ASCII art
  text = text.replace(/```([a-zA-Z0-9_-]*)\s*([\s\S]*?)```/g, (match, lang, code) => {
    const id = `___CODE_BLOCK_${blocks.length}___`;
    let formatted = escapeHtml(code.trim());
    formatted = formatted.replace(/(#\s*[^\n\r]*)/g, '<span class="code-comment">$1</span>');
    if (!lang || lang === 'text' || lang === 'ascii') {
      blocks.push(`<div class="ascii-diagram-card"><pre class="ascii-art">${formatted}</pre></div>`);
    } else {
      blocks.push(`<div class="code-card"><pre class="code-block"><code>${formatted}</code></pre></div>`);
    }
    return id;
  });

  // 2.5. Stash Math blocks ($$ and $)
  const mathBlocks = [];
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, code) => {
    const id = `@@@MATHDISPLAY${mathBlocks.length}@@@`;
    mathBlocks.push(`<div class="math-display">$$${code.trim()}$$</div>`);
    return id;
  });
  text = text.replace(/\$([^\$\n]+?)\$/g, (match, code) => {
    const id = `@@@MATHINLINE${mathBlocks.length}@@@`;
    mathBlocks.push(`<span class="math-inline">$${code.trim()}$</span>`);
    return id;
  });

  // 3. Math symbols & Arrows & Page breaks
  text = text.replace(/<!--\s*pagebreak\s*-->/gi, '<div class="pagebreak"></div>');
  text = text.replace(/\\(pagebreak|newpage)/gi, '<div class="pagebreak"></div>');
  text = text.replace(/\$\\to\$/g, '→');
  text = text.replace(/\\to/g, '→');
  text = text.replace(/\$O\(\\log N\)\$/g, 'O(log N)');

  // 4. Headers with semantic classes
  text = text.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (\d+\..*$)/gim, '<h2 class="section-title">$1</h2>');
  text = text.replace(/^## (.*$)/gim, '<h2 class="intro-title">$1</h2>');
  text = text.replace(/^# (Часть.*$|Раздел.*$|Заключение.*$)/gim, '<h1 class="part-title">$1</h1>');
  text = text.replace(/^# (.*$)/gim, '<h1 class="doc-main-title">$1</h1>');

  // 5. Blockquotes with semantic classification
  text = text.replace(/^\> (.*$)/gim, (match, content) => {
    let cls = '';
    const lower = content.toLowerCase();
    if (lower.includes('риск') || content.includes('EVM') || content.includes('WASM') || lower.includes('уязвимост')) {
      cls = ' class="callout-risk"';
    } else if (content.includes('Банк России') || content.includes('Концепци') || content.includes('161-ФЗ') || content.includes('259-ФЗ')) {
      cls = ' class="callout-cbr"';
    }
    return `<blockquote${cls}><p>${content}</p></blockquote>`;
  });

  // 6. Tables
  const lines = text.split('\n');
  let inTable = false;
  let tableHtml = [];
  let newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = ['<table class="report-table">'];
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableHtml.push('<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>');
      } else if (line.includes('---')) {
        // separator row, skip
      } else {
        const cells = line.split('|').slice(1, -1).map(c => {
          c = c.trim();
          if (c === 'O(1)') {
            return '<span class="badge-o1">O(1)</span>';
          }
          return c;
        });
        tableHtml.push('<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>');
      }
    } else {
      if (inTable) {
        inTable = false;
        tableHtml.push('</tbody></table>');
        newLines.push(tableHtml.join(''));
        tableHtml = [];
      }
      newLines.push(lines[i]);
    }
  }
  if (inTable) {
    tableHtml.push('</tbody></table>');
    newLines.push(tableHtml.join(''));
  }

  text = newLines.join('\n');

  // 7. Inline formatting
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="doc-link">$1</a>');

  // 8. Lists
  text = text.replace(/^\s*[\*\-]\s+(.*$)/gim, '<li>$1</li>');
  text = text.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  text = text.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
  text = text.replace(/<\/ul>\s*<ul>/g, '');

  // 9. Horizontal rules
  text = text.replace(/^---$/gim, '<hr class="divider">');

  // 10. Paragraphs
  text = text.split('\n\n').map(chunk => {
    chunk = chunk.trim();
    if (!chunk || chunk === '.') return '';
    if (chunk.startsWith('<h') || 
        chunk.startsWith('<table') || 
        chunk.startsWith('___MERMAID') || 
        chunk.startsWith('___CODE') || 
        chunk.startsWith('@@@MATH') ||
        chunk.startsWith('<blockquote') || 
        chunk.startsWith('<ul') || 
        chunk.startsWith('<hr') ||
        chunk.startsWith('<div')) {
      return chunk;
    }
    return `<p>${chunk.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  // 11. Re-inject stashed blocks
  for (let i = 0; i < blocks.length; i++) {
    text = text.replace(`___MERMAID_BLOCK_${i}___`, blocks[i]);
    text = text.replace(`___CODE_BLOCK_${i}___`, blocks[i]);
  }
  for (let i = 0; i < mathBlocks.length; i++) {
    text = text.replace(`@@@MATHDISPLAY${i}@@@`, mathBlocks[i]);
    text = text.replace(`@@@MATHINLINE${i}@@@`, mathBlocks[i]);
  }

  return text;
}

async function buildWhitepaperPdf(config = {}) {
  const markdownPath = config.markdownPath;
  if (!markdownPath || !fs.existsSync(markdownPath)) {
    throw new Error(`Markdown file not found at ${markdownPath}`);
  }

  const absMdPath = path.resolve(markdownPath);
  const docBaseName = path.basename(absMdPath, '.md');
  const presentationDir = path.dirname(path.dirname(absMdPath));
  const outputPdfPath = config.outputPdfPath || path.join(presentationDir, 'generated', 'outputs', 'pdf', `${docBaseName}.pdf`);

  const { parseFrontmatter } = require('./deck_builder');
  const rawContent = fs.readFileSync(markdownPath, 'utf8');
  const { meta, body } = parseFrontmatter(rawContent);

  const tag = config.tag || meta.whitepaper_tag || meta.tag || 'Аналитический отчет &middot; Спецификация';
  const bannerTitle = config.bannerTitle || meta.whitepaper_title || (meta.title && meta.subtitle ? `${meta.title} — ${meta.subtitle}` : (meta.title || 'Платформа «Турбаза»'));
  const bannerSubtitle = config.bannerSubtitle || meta.whitepaper_subtitle || meta.subtitle || 'Трехуровневая архитектура прямого владения данными';
  const headerTitle = config.headerTitle || meta.header_title || 'ТУРБАЗА';
  const headerSubtitle = config.headerSubtitle || meta.whitepaper_header_subtitle || meta.header_subtitle || meta.subtitle || 'Архитектура прямого владения данными';
  const footerText = config.footerText || meta.whitepaper_footer || (meta.title && meta.subtitle ? `${meta.title} — ${meta.subtitle}` : 'Платформа «Турбаза» — Трехуровневая архитектура прямого владения данными');
  const accentColor = config.accentColor || meta.accent_color || '#0284c7';

  const outputDir = path.dirname(outputPdfPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const previewHtmlFile = path.join(outputDir, `${path.basename(outputPdfPath, '.pdf')}_preview.html`);
  const bodyContent = markdownToHtml(body || rawContent);

  let coverHeaderHtml = '';
  if (meta.cover_style === 'memorandum') {
    const memoOrg = meta.cbr_memo_org || 'ЦЕНТРАЛЬНЫЙ БАНК РОССИЙСКОЙ ФЕДЕРАЦИИ (БАНК РОССИИ)';
    const memoDept = meta.cbr_memo_dept || 'Департамент финансовых технологий &middot; fintech@cbr.ru';
    const memoType = meta.cbr_memo_type || 'ОФИЦИАЛЬНЫЙ ЭКСПЕРТНЫЙ ОТЗЫВ';
    const memoReg = meta.cbr_memo_reg || 'Исх. № 01-ПКСК/2026 &middot; Сентябрь 2026 г.';
    const memoSubject = meta.cbr_memo_subject || 'Консультативный доклад «Концепция платформы коммерческих смарт-контрактов» (ПКСК)';
    coverHeaderHtml = `
      <div class="memo-header">
        <div class="memo-top-row">
          <div class="memo-cbr-branding">
            <div class="memo-cbr-title">${memoOrg}</div>
            <div class="memo-cbr-dept">${memoDept}</div>
          </div>
          <div class="memo-doc-meta">
            <div class="memo-badge">${memoType}</div>
            <div class="memo-date">${memoReg}</div>
          </div>
        </div>
        <div class="memo-subject-box">
          <div class="memo-subject-label">ПРЕДМЕТ ЭКСПЕРТИЗЫ:</div>
          <div class="memo-subject-text">${memoSubject}</div>
        </div>
      </div>
    `;
  } else {
    coverHeaderHtml = `
      <div class="cover-banner">
        <div class="cover-tag">${tag}</div>
        <div class="cover-title">${escapeHtml(bannerTitle)}</div>
        <div class="cover-subtitle">${escapeHtml(bannerSubtitle)}</div>
      </div>
    `;
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(bannerTitle)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      sequence: {
        actorFontSize: '12px',
        messageFontSize: '11px',
        noteFontSize: '10.5px',
        actorFontFamily: 'Inter, sans-serif',
        noteFontFamily: 'Inter, sans-serif',
        messageFontFamily: 'Inter, sans-serif',
        mirrorActors: false,
        bottomMarginAdj: 1
      },
      flowchart: {
        htmlLabels: true,
        curve: 'basis'
      },
      themeVariables: {
        primaryColor: '#e0f2fe',
        primaryTextColor: '${accentColor}',
        primaryBorderColor: '${accentColor}',
        lineColor: '${accentColor}',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px'
      }
    });
  </script>
  <style>
    @page {
      size: A4 portrait;
      margin: 16mm 14mm 16mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 9.5pt;
      line-height: 1.55;
      color: #0f172a;
      background: #ffffff;
      padding: 0;
    }

    .pagebreak {
      page-break-before: always;
      break-before: page;
      height: 0;
      margin: 0;
      padding: 0;
    }

    .cover-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      padding: 22px 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 6px solid ${accentColor};
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .cover-tag {
      display: inline-block;
      background: rgba(2, 132, 199, 0.35);
      color: #38bdf8;
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .cover-title {
      font-size: 18pt;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.25;
      margin-bottom: 6px;
    }

    .cover-subtitle {
      font-size: 10pt;
      color: #94a3b8;
      font-weight: 500;
    }

    .doc-main-title {
      font-size: 16pt;
      font-weight: 800;
      color: ${accentColor};
      line-height: 1.25;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2.5px solid ${accentColor};
    }

    .part-title {
      font-size: 15pt;
      font-weight: 800;
      color: ${accentColor};
      line-height: 1.25;
      margin-top: 0;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 2.5px solid ${accentColor};
      page-break-before: always;
      break-before: page;
      page-break-after: avoid;
      break-after: avoid;
    }

    .section-title {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 20px;
      margin-bottom: 10px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #cbd5e1;
      page-break-after: avoid;
      break-after: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .intro-title {
      font-size: 12.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 16px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid #cbd5e1;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0369a1;
      margin-top: 12px;
      margin-bottom: 6px;
      page-break-after: avoid;
      break-after: avoid;
    }

    h4 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #334155;
      margin-top: 8px;
      margin-bottom: 4px;
      page-break-after: avoid;
      break-after: avoid;
    }

    p {
      margin-bottom: 7px;
      text-align: justify;
      orphans: 3;
      widows: 3;
    }

    blockquote {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 8.8pt;
      color: #166534;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    blockquote.callout-risk {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      color: #92400e;
    }

    blockquote.callout-cbr {
      background: #eff6ff;
      border-left: 4px solid #0284c7;
      color: #1e40af;
    }

    blockquote p {
      margin-bottom: 4px;
      text-align: left;
    }

    blockquote p:last-child {
      margin-bottom: 0;
    }

    .badge-o1 {
      display: inline-block;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #10b981;
      font-weight: 700;
      font-size: 7.2pt;
      font-family: 'JetBrains Mono', monospace;
      padding: 1px 6px;
      border-radius: 9999px;
      letter-spacing: 0.2px;
    }

    .report-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 14px 0;
      font-size: 8pt;
      line-height: 1.4;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .report-table th, .report-table td {
      border: 1px solid #cbd5e1;
      padding: 5px 7px;
      text-align: left;
      vertical-align: top;
    }

    .report-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 700;
      font-size: 8pt;
    }

    .report-table tr:nth-child(even) {
      background: #f8fafc;
    }

    ul, ol {
      margin-left: 18px;
      margin-bottom: 8px;
    }

    li {
      margin-bottom: 4px;
      orphans: 3;
      widows: 3;
    }

    .mermaid-diagram {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 8px;
      margin: 12px 0;
      display: block;
      text-align: center;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .mermaid-diagram .mermaid {
      display: block;
      margin: 0 auto;
      text-align: center;
    }

    .mermaid-diagram svg {
      max-width: 100% !important;
      max-height: 480px !important;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }

    .ascii-diagram-card {
      background: #f8fafc;
      border: 1.5px solid #94a3b8;
      border-radius: 8px;
      padding: 10px 14px;
      margin: 12px 0;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      text-align: center;
    }

    .ascii-art {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 7.2pt;
      line-height: 1.35;
      color: #0f172a;
      background: transparent;
      padding: 0;
      margin: 0;
      white-space: pre;
      overflow: hidden;
      display: inline-block;
      text-align: left;
    }

    .code-comment {
      color: #64748b;
      font-style: italic;
    }

    .code-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 10px 12px;
      margin: 10px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .code-block {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      line-height: 1.35;
      color: #38bdf8;
      background: transparent;
      padding: 0;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }

    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      background: #f1f5f9;
      color: #0369a1;
      padding: 1px 4px;
      border-radius: 3px;
    }

    .code-card code {
      background: transparent;
      color: #38bdf8;
      padding: 0;
    }

    .divider {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 14px 0;
    }

    strong {
      color: #0f172a;
    }

    .doc-link {
      color: #0284c7;
      text-decoration: none;
      font-weight: 500;
    }

    .doc-link:hover {
      text-decoration: underline;
      color: #0369a1;
    }

    .memo-header {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .memo-top-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .memo-cbr-branding {
      flex: 1;
    }

    .memo-cbr-title {
      font-size: 10.5pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      line-height: 1.25;
    }

    .memo-cbr-dept {
      font-size: 8.5pt;
      font-weight: 600;
      color: #0284c7;
      margin-top: 2px;
    }

    .memo-doc-meta {
      text-align: right;
      min-width: 200px;
    }

    .memo-badge {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 3px;
    }

    .memo-date {
      font-size: 8pt;
      color: #64748b;
      font-weight: 500;
    }

    .memo-subject-box {
      background: #f8fafc;
      border-left: 4px solid #0284c7;
      padding: 7px 12px;
      border-radius: 0 4px 4px 0;
      font-size: 8.5pt;
    }

    .memo-subject-label {
      font-weight: 800;
      color: #475569;
      font-size: 7.5pt;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 2px;
    }

    .memo-subject-text {
      color: #0f172a;
      font-weight: 600;
      line-height: 1.35;
    }

    .math-display {
      display: flex;
      justify-content: center;
      margin: 10px 0;
      overflow-x: auto;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .math-inline {
      display: inline;
    }

    .katex {
      font-size: 1.05em !important;
    }

    .scorecard-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 12px 0 14px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .scorecard-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-top: 3.5px solid #0284c7;
      border-radius: 6px;
      padding: 10px 10px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .scorecard-metric {
      font-size: 13pt;
      font-weight: 800;
      color: #0284c7;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.2;
      margin-bottom: 4px;
    }

    .scorecard-title {
      font-size: 8pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 5px;
      line-height: 1.3;
    }

    .scorecard-desc {
      font-size: 7.2pt;
      color: #475569;
      line-height: 1.4;
      text-align: left;
    }

    .cbr-question-block {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0284c7;
      border-radius: 6px;
      padding: 7px 11px;
      margin: 6px 0 8px 0;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }

    .cbr-question-block p {
      margin: 3px 0 !important;
      line-height: 1.35;
    }

    .cbr-question-block ol,
    .cbr-question-block ul {
      margin: 3px 0 !important;
      padding-left: 18px !important;
    }

    .cbr-question-block li {
      margin-bottom: 2px !important;
      line-height: 1.35;
    }

    .cbr-question-badge-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .cbr-question-badge {
      background: #0284c7;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .cbr-question-source {
      font-size: 7.2pt;
      color: #64748b;
      font-weight: 600;
    }

    .cbr-question-quote {
      background: #f0fdf4;
      border-left: 3px solid #16a34a;
      padding: 5px 8px;
      border-radius: 0 4px 4px 0;
      font-size: 7.8pt;
      color: #166534;
      font-style: italic;
      line-height: 1.35;
      margin-bottom: 6px;
    }

    .cbr-answer-title {
      font-size: 7.8pt;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 4px;
    }

    .toc-container {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 10px 14px;
      margin: 8px 0 12px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .toc-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 3px 0;
      border-bottom: 1px dotted #cbd5e1;
      font-size: 8.2pt;
    }

    .toc-row:last-child {
      border-bottom: none;
    }

    .toc-title {
      font-weight: 600;
      color: #0f172a;
    }

    .toc-page {
      font-weight: 700;
      color: #0284c7;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      padding-left: 8px;
    }
  </style>
</head>
<body>
  ${coverHeaderHtml}
  ${bodyContent}
</body>
</html>`;

  fs.writeFileSync(previewHtmlFile, fullHtml, 'utf8');

  console.log('[1/3] Launching Playwright browser for Whitepaper PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('[2/3] Rendering HTML with Mermaid diagrams, KaTeX formulas, and typography...');
  await page.goto(`file://${previewHtmlFile}`, { waitUntil: 'networkidle' });

  try {
    await page.waitForSelector('.mermaid svg', { timeout: 15000 });
    console.log('  [✓] Mermaid vector diagrams rendered successfully!');
  } catch (e) {
    console.warn('  [!] Mermaid selector note:', e.message);
  }

  await page.evaluate(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false}
        ],
        throwOnError: false
      });
    }
  });

  await new Promise(r => setTimeout(r, 1500));

  const hideFirstPageHeader = Boolean(meta.cover_style === 'memorandum' || meta.hide_first_page_header || config.hideFirstPageHeader);
  const runningHeaderHtml = `
    <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; border-bottom: 0.75px solid #cbd5e1; padding-bottom: 3px;">
      <span style="font-weight: 700; color: ${accentColor}; letter-spacing: 0.3px;">${headerTitle}</span>
      <span style="font-weight: 500;">${headerSubtitle}</span>
    </div>
  `;
  const runningFooterHtml = `
    <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; border-top: 0.75px solid #cbd5e1; padding-top: 3px;">
      <span style="font-weight: 500;">${footerText}</span>
      <span style="font-weight: 600;">Стр. <span class="pageNumber"></span> из <span class="totalPages"></span></span>
    </div>
  `;

  console.log('[3/3] Exporting executive Whitepaper PDF...');
  
  const gsPath = fs.existsSync('/opt/homebrew/bin/gs') ? '/opt/homebrew/bin/gs' : (() => {
    try {
      return execSync('which gs', { encoding: 'utf8' }).trim();
    } catch (e) {
      return null;
    }
  })();

  if (hideFirstPageHeader && gsPath) {
    const tempP1 = path.join(outputDir, `${path.basename(outputPdfPath, '.pdf')}_p1.pdf`);
    const tempP2 = path.join(outputDir, `${path.basename(outputPdfPath, '.pdf')}_p2.pdf`);

    await page.pdf({
      path: tempP1,
      pageRanges: '1',
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: runningFooterHtml
    });

    await page.pdf({
      path: tempP2,
      pageRanges: '2-',
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
      displayHeaderFooter: true,
      headerTemplate: runningHeaderHtml,
      footerTemplate: runningFooterHtml
    });

    execSync(`${gsPath} -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile="${outputPdfPath}" "${tempP1}" "${tempP2}"`);
    if (fs.existsSync(tempP1)) fs.unlinkSync(tempP1);
    if (fs.existsSync(tempP2)) fs.unlinkSync(tempP2);
  } else {
    await page.pdf({
      path: outputPdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '16mm',
        bottom: '16mm',
        left: '14mm',
        right: '14mm'
      },
      displayHeaderFooter: true,
      headerTemplate: runningHeaderHtml,
      footerTemplate: runningFooterHtml
    });
  }

  await browser.close();
  if (fs.existsSync(previewHtmlFile)) fs.unlinkSync(previewHtmlFile);

  const stats = fs.statSync(outputPdfPath);
  console.log(`[🎉] Done! Whitepaper PDF created: ${outputPdfPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

module.exports = {
  markdownToHtml,
  buildWhitepaperPdf
};
