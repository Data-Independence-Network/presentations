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
    if (!lang || lang === 'text' || lang === 'ascii') {
      blocks.push(`<div class="ascii-diagram-card"><pre class="ascii-art">${escapeHtml(code.trim())}</pre></div>`);
    } else {
      blocks.push(`<div class="code-card"><pre class="code-block"><code>${escapeHtml(code.trim())}</code></pre></div>`);
    }
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

  // 5. Blockquotes
  text = text.replace(/^\> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

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
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
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
  const bannerSubtitle = config.bannerSubtitle || meta.whitepaper_subtitle || meta.subtitle || 'Суверенная трехуровневая архитектура данных';
  const headerTitle = config.headerTitle || meta.header_title || 'ТУРБАЗА';
  const headerSubtitle = config.headerSubtitle || meta.whitepaper_header_subtitle || meta.header_subtitle || meta.subtitle || 'Суверенная архитектура';
  const footerText = config.footerText || meta.whitepaper_footer || (meta.title && meta.subtitle ? `${meta.title} — ${meta.subtitle}` : 'Платформа «Турбаза» — Суверенная трехуровневая архитектура данных');
  const accentColor = config.accentColor || meta.accent_color || '#0284c7';

  const outputDir = path.dirname(outputPdfPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const previewHtmlFile = path.join(outputDir, `${path.basename(outputPdfPath, '.pdf')}_preview.html`);
  const bodyContent = markdownToHtml(body || rawContent);

  const fullHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(bannerTitle)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      sequence: {
        actorFontSize: '12px',
        messageFontSize: '12px',
        noteFontSize: '11px',
        actorFontFamily: 'Inter, sans-serif',
        noteFontFamily: 'Inter, sans-serif',
        messageFontFamily: 'Inter, sans-serif',
        mirrorActors: false
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
        fontSize: '12px'
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
      font-size: 9pt;
      color: #166534;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    blockquote p {
      margin-bottom: 4px;
      text-align: left;
    }

    blockquote p:last-child {
      margin-bottom: 0;
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
      padding: 10px 12px;
      margin: 12px 0;
      page-break-inside: avoid;
      break-inside: avoid;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .ascii-art {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 6.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: transparent;
      padding: 0;
      margin: 0;
      white-space: pre;
      overflow: hidden;
      display: block;
      text-align: center;
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
  </style>
</head>
<body>
  <div class="cover-banner">
    <div class="cover-tag">${tag}</div>
    <div class="cover-title">${escapeHtml(bannerTitle)}</div>
    <div class="cover-subtitle">${escapeHtml(bannerSubtitle)}</div>
  </div>
  ${bodyContent}
</body>
</html>`;

  fs.writeFileSync(previewHtmlFile, fullHtml, 'utf8');

  console.log('[1/3] Launching Playwright browser for Whitepaper PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('[2/3] Rendering HTML with Mermaid diagrams and typography...');
  await page.goto(`file://${previewHtmlFile}`, { waitUntil: 'networkidle' });

  try {
    await page.waitForSelector('.mermaid svg', { timeout: 15000 });
    console.log('  [✓] Mermaid vector diagrams rendered successfully!');
  } catch (e) {
    console.warn('  [!] Mermaid selector note:', e.message);
  }

  await new Promise(r => setTimeout(r, 1500));

  console.log('[3/3] Exporting executive Whitepaper PDF...');
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
    headerTemplate: `
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; border-bottom: 0.5px solid #e2e8f0; padding-bottom: 3px;">
        <span style="font-weight: 700; color: ${accentColor};">${headerTitle}</span>
        <span>${headerSubtitle}</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; border-top: 0.5px solid #e2e8f0; padding-top: 3px;">
        <span>${footerText}</span>
        <span>Стр. <span class="pageNumber"></span> из <span class="totalPages"></span></span>
      </div>
    `
  });

  await browser.close();
  if (fs.existsSync(previewHtmlFile)) fs.unlinkSync(previewHtmlFile);

  const stats = fs.statSync(outputPdfPath);
  console.log(`[🎉] Done! Whitepaper PDF created: ${outputPdfPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

module.exports = {
  markdownToHtml,
  buildWhitepaperPdf
};
