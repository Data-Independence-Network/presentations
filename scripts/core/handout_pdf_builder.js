/**
 * Core Handout Notes PDF Builder using Playwright
 * Generates an executive A4 Notes PDF Handout:
 * Top half: 1920x1080 slide render.
 * Bottom half: Calibrated speaker notes and title.
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

function extractNarrationsAndTitles(mdContent) {
  const { parseSlides, parseFrontmatter } = require('./deck_builder');
  const { meta, body } = parseFrontmatter(mdContent);
  const slides = parseSlides(body || mdContent);

  const slideData = {};
  slides.forEach(slide => {
    const rawParagraphs = (slide.narration || '')
      .split(/\n\s*>*\s*\n/)
      .map(p => p.split('\n').map(l => l.replace(/^>\s*/, '').replace(/^\(Narration\):?/i, '').trim()).filter(Boolean).join(' '))
      .map(p => p.replace(/[«»"]/g, '"').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>'))
      .filter(Boolean);

    slideData[slide.slideNum] = {
      title: slide.title || `Слайд ${slide.slideNum}`,
      paragraphs: rawParagraphs
    };
  });
  return { meta, slideData };
}

async function buildHandoutPdf(config = {}) {
  const narrationMdPath = path.resolve(config.narrationMdPath);
  const presentationDir = path.dirname(path.dirname(narrationMdPath));
  const baseName = path.basename(presentationDir).replace(/_presentation$/, '');

  const slidesDir = config.slidesDir || path.join(presentationDir, 'generated', 'artifacts', 'slides_png');
  const outputPdfPath = config.outputPdfPath || path.join(presentationDir, 'generated', 'outputs', 'pdf', `${baseName}_notes.pdf`);

  const mdContent = fs.readFileSync(narrationMdPath, 'utf8');
  const { meta, slideData } = extractNarrationsAndTitles(mdContent);

  const slideCount = config.slideCount || Object.keys(slideData).length || meta.total_slides || 15;
  const headerLogo = config.headerLogo || meta.header_title || 'ТУРБАЗА';
  const headerSubtitle = config.headerSubtitle || meta.handout_header_subtitle || meta.header_subtitle || meta.subtitle || 'Суверенная инфраструктура данных';
  const footerTitle = config.footerTitle || meta.handout_footer_title || (meta.title && meta.subtitle ? `${meta.title} — ${meta.subtitle}` : 'Платформа «Турбаза»');
  const baseFontSize = config.baseFontSize || meta.handout_font_size || '12.5pt';

  const outputDir = path.dirname(outputPdfPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const previewHtmlFile = path.join(outputDir, 'notes_preview.html');

  let pagesHtml = '';

  for (let i = 1; i <= slideCount; i++) {
    const padded = String(i).padStart(2, '0');
    const imgPath = path.join(slidesDir, `slide_${padded}.png`);
    let imgSrc = '';
    if (fs.existsSync(imgPath)) {
      const base64Img = fs.readFileSync(imgPath).toString('base64');
      imgSrc = `data:image/png;base64,${base64Img}`;
    }

    const slideInfo = slideData[i] || { title: `Слайд ${i}`, paragraphs: [] };
    const paragraphsHtml = slideInfo.paragraphs.map(p => `<p>${p}</p>`).join('\n');

    pagesHtml += `
      <div class="handout-page">
        <div class="page-header">
          <div class="header-logo">🌲 <strong>${headerLogo}</strong> <span class="header-sep">|</span> ${headerSubtitle}</div>
          <div class="header-slide-num">Слайд ${i} из ${slideCount}</div>
        </div>

        <div class="slide-image-wrapper">
          <img class="slide-img" src="${imgSrc}" alt="Слайд ${i}">
        </div>

        <div class="notes-section">
          <div class="notes-header">
            <span class="notes-icon">🎙️</span>
            <span class="notes-title-text">Сопровождение выступления (Слайд ${i}: ${slideInfo.title})</span>
          </div>
          <div class="notes-body">
            ${paragraphsHtml}
          </div>
        </div>

        <div class="page-footer">
          <div>${footerTitle}</div>
          <div>Стр. ${i} из ${slideCount}</div>
        </div>
      </div>
    `;
  }

  const fullHtml = `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Раздаточный материал — ТУРБАЗА</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
      @page {
        size: A4 portrait;
        margin: 0;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #ffffff;
        color: #0f172a;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .handout-page {
        width: 210mm;
        height: 297mm;
        padding: 12mm 14mm 10mm 14mm;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        page-break-after: always;
        break-after: page;
        position: relative;
        background: #ffffff;
        overflow: hidden;
      }
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1.5px solid #e2e8f0;
        padding-bottom: 8px;
        margin-bottom: 12px;
      }
      .header-logo {
        font-size: 11pt;
        font-weight: 700;
        color: #0284c7;
        letter-spacing: 0.5px;
      }
      .header-logo strong {
        color: #0284c7;
        font-weight: 800;
      }
      .header-sep {
        color: #94a3b8;
        margin: 0 6px;
      }
      .header-slide-num {
        font-size: 10pt;
        font-weight: 600;
        color: #475569;
        background: #f1f5f9;
        padding: 3px 10px;
        border-radius: 20px;
        border: 1px solid #e2e8f0;
      }
      .slide-image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #cbd5e1;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
        background: #060913;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .slide-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      .notes-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-top: 12px;
        margin-bottom: 8px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-left: 4px solid #0284c7;
        border-radius: 0 8px 8px 0;
        padding: 12px 16px;
        overflow: hidden;
      }
      .notes-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 6px;
      }
      .notes-icon {
        font-size: 12pt;
      }
      .notes-title-text {
        font-size: 10.5pt;
        font-weight: 700;
        color: #0369a1;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .notes-body {
        font-size: ${baseFontSize};
        line-height: 1.5;
        color: #1e293b;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .notes-body p {
        margin: 0;
        text-align: justify;
      }
      .notes-body strong {
        color: #0f172a;
        font-weight: 700;
      }
      .page-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e2e8f0;
        padding-top: 6px;
        font-size: 8.5pt;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    ${pagesHtml}
  </body>
  </html>`;

  fs.writeFileSync(previewHtmlFile, fullHtml, 'utf8');

  console.log('[1/2] Launching Playwright browser for Notes Handout...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('[2/2] Rendering pages and exporting PDF...');
  await page.goto(`file://${previewHtmlFile}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  await page.pdf({
    path: outputPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  await browser.close();
  if (fs.existsSync(previewHtmlFile)) fs.unlinkSync(previewHtmlFile);

  const stats = fs.statSync(outputPdfPath);
  console.log(`[🎉] Done! Notes PDF created: ${outputPdfPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

module.exports = {
  extractNarrationsAndTitles,
  buildHandoutPdf
};
