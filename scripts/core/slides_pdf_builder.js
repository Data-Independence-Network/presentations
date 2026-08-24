/**
 * Core Slide Deck PDF Builder using Playwright
 * Combines 1920x1080 slide images from slides_png/ into a 16:9 Landscape PDF slide deck.
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

async function buildSlidesPdf(config = {}) {
  const slidesDir = config.slidesDir;
  const outputPdfPath = config.outputPdfPath;
  const slideCount = config.slideCount || 10;
  const presentationTitle = config.presentationTitle || 'Турбаза — Слайды презентации';

  if (!fs.existsSync(slidesDir)) {
    throw new Error(`slides_png directory not found at ${slidesDir}`);
  }

  const outputDir = path.dirname(outputPdfPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const previewHtmlFile = path.join(outputDir, 'slides_pdf_preview.html');

  let pagesHtml = '';
  for (let i = 1; i <= slideCount; i++) {
    const padded = String(i).padStart(2, '0');
    const imgPath = path.join(slidesDir, `slide_${padded}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`[!] Slide ${padded} not found in ${slidesDir}, skipping`);
      continue;
    }
    const base64Img = fs.readFileSync(imgPath).toString('base64');
    pagesHtml += `
      <div class="slide-page">
        <img class="slide-image" src="data:image/png;base64,${base64Img}" alt="Слайд ${i}">
      </div>
    `;
  }

  const fullHtml = `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>${presentationTitle}</title>
    <style>
      @page {
        size: 1920px 1080px;
        margin: 0;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        margin: 0;
        padding: 0;
        background: #060913;
        overflow: hidden;
      }
      .slide-page {
        width: 1920px;
        height: 1080px;
        page-break-after: always;
        break-after: page;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background: #060913;
      }
      .slide-image {
        width: 1920px;
        height: 1080px;
        object-fit: contain;
        display: block;
      }
    </style>
  </head>
  <body>
    ${pagesHtml}
  </body>
  </html>`;

  fs.writeFileSync(previewHtmlFile, fullHtml, 'utf8');

  console.log('[1/2] Launching Playwright browser for 16:9 Landscape Slide Deck PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('[2/2] Exporting 16:9 Slide Deck PDF...');
  await page.goto(`file://${previewHtmlFile}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.pdf({
    path: outputPdfPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  await browser.close();
  if (fs.existsSync(previewHtmlFile)) fs.unlinkSync(previewHtmlFile);

  const stats = fs.statSync(outputPdfPath);
  console.log(`[🎉] Done! 16:9 Slide Deck PDF created: ${outputPdfPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
}

module.exports = {
  buildSlidesPdf
};
