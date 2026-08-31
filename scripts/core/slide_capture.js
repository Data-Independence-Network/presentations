/**
 * Core Slide Screenshot Capture Module using Playwright
 * Captures 1920x1080 PNG slides from web_deck/index.html
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

async function captureSlides(config = {}) {
  const htmlPath = config.htmlPath;
  const outputDir = config.outputDir;
  const slideCount = config.slideCount || 10;
  const delayMs = config.delayMs || 250;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();
  const fileUrl = `file://${path.resolve(htmlPath)}`;
  
  await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // Inject strict 1920x1080 framing styles
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: #060913 !important;
        overflow: hidden !important;
        width: 1920px !important;
        height: 1080px !important;
      }
      .presentation-header,
      .presentation-footer,
      .notes-drawer,
      .overview-modal,
      .modal-overlay,
      #overviewModal {
        display: none !important;
      }
      .presentation-viewport {
        padding: 0 !important;
        margin: 0 !important;
        width: 1920px !important;
        height: 1080px !important;
        display: block !important;
      }
      .deck-container {
        width: 1920px !important;
        height: 1080px !important;
        max-width: 1920px !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        aspect-ratio: auto !important;
      }
      .slide-card {
        width: 1920px !important;
        height: 1080px !important;
        padding: 48px 72px !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        display: none !important;
        opacity: 0 !important;
        transform: none !important;
        transition: none !important;
      }
      .slide-card.active {
        display: flex !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  });

  const slideList = Array.isArray(config.targetSlides) && config.targetSlides.length > 0
    ? config.targetSlides
    : Array.from({ length: slideCount }, (_, idx) => idx + 1);

  for (const i of slideList) {
    await page.evaluate((slideNum) => {
      const cards = document.querySelectorAll('.slide-card');
      cards.forEach((card, idx) => {
        if (idx + 1 === slideNum) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      if (typeof window.showSlide === 'function') {
        window.showSlide(slideNum);
      }
    }, i);

    await page.waitForTimeout(delayMs);

    const filename = `slide_${String(i).padStart(2, '0')}.png`;
    const outputPath = path.join(outputDir, filename);
    await page.screenshot({ path: outputPath, type: 'png' });

    console.log(`[📸] Captured Slide ${i}/${slideCount} -> ${filename}`);
  }

  await browser.close();
  console.log(`[🎉] Captured ${slideList.length} slide screenshot(s) in ${outputDir}!`);
}

module.exports = {
  captureSlides
};
