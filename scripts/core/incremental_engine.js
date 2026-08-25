/**
 * Core Smart Incremental Regeneration Engine for Turbase Presentations
 * Detects staged, unstaged, and committed changes in Markdown presentation sources
 * using cryptographic SHA-256 per-slide fingerprinting and Git commit checkpoints.
 * Regenerates only the exact dirty assets (.mp3, .png, .pdf, .mp4) needed.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const { parseFrontmatter, parseSlides, compileDeckHtml } = require('./deck_builder');
const { generateSlideAudio } = require('./tts_generator');
const { captureSlides } = require('./slide_capture');
const { buildHandoutPdf } = require('./handout_pdf_builder');
const { buildMultiProfileVideo } = require('./video_builder');

function sha256(data) {
  return crypto.createHash('sha256').update(String(data || ''), 'utf8').digest('hex');
}

function getGitCommitHash() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return 'untracked';
  }
}

function getCachePath(presentationDir) {
  const genDir = path.join(presentationDir, 'generated');
  if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });
  return path.join(genDir, '.build_cache.json');
}

function loadBuildCache(presentationDir) {
  const primaryCache = path.join(presentationDir, 'generated', '.build_cache.json');
  const legacyCache = path.join(presentationDir, '.build_cache.json');
  const cachePath = fs.existsSync(primaryCache) ? primaryCache : (fs.existsSync(legacyCache) ? legacyCache : null);
  if (!cachePath) return null;
  try {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function saveBuildCache(presentationDir, cacheData) {
  const cachePath = getCachePath(presentationDir);
  fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2), 'utf8');
}

function computePresentationFingerprints(presentationDir) {
  const docsDir = path.join(presentationDir, 'docs');
  let mdPath = path.join(docsDir, 'presentation_deck.md');
  
  if (!fs.existsSync(mdPath)) {
    const mdFiles = fs.existsSync(docsDir) ? fs.readdirSync(docsDir).filter(f => f.endsWith('.md')) : [];
    const candidate = mdFiles.find(f => f.includes('deck') || f.includes('narration') || f.includes('outline'));
    if (candidate) mdPath = path.join(docsDir, candidate);
    else throw new Error(`No presentation source Markdown found in ${docsDir}`);
  }

  const rawContent = fs.readFileSync(mdPath, 'utf8');
  const { meta, body } = parseFrontmatter(rawContent);
  const slides = parseSlides(body);

  const slideHashes = {};
  slides.forEach(slide => {
    const visualContent = [
      slide.tag,
      slide.title,
      slide.subtitle,
      slide.badge,
      slide.visualHtml,
      slide.contentHtml
    ].join('||');

    const narrationContent = [
      slide.narration,
      meta.voice || 'ru-RU-DmitryNeural',
      meta.pitch || '-5Hz',
      meta.rate || '-9%'
    ].join('||');

    slideHashes[slide.slideNum] = {
      visualHash: sha256(visualContent),
      narrationHash: sha256(narrationContent)
    };
  });

  return {
    mdPath,
    meta,
    slides,
    slideHashes
  };
}

function analyzePresentationChanges(presentationDir, options = {}) {
  const force = options.fullRegeneration || options.force || false;
  const fingerprints = computePresentationFingerprints(presentationDir);
  const cache = loadBuildCache(presentationDir);
  const currentCommit = getGitCommitHash();

  const artifactsDir = path.join(presentationDir, 'generated', 'artifacts');
  const outputsDir = path.join(presentationDir, 'generated', 'outputs');

  const audioDir = path.join(artifactsDir, 'audio');
  const slidesDir = path.join(artifactsDir, 'slides_png');
  const webDeckHtml = path.join(outputsDir, 'web_deck', 'index.html');
  const videoExportsDir = path.join(outputsDir, 'video');

  const dirtyVisuals = [];
  const dirtyAudio = [];

  const slideNumbers = Object.keys(fingerprints.slideHashes).map(Number).sort((a, b) => a - b);

  slideNumbers.forEach(slideNum => {
    const current = fingerprints.slideHashes[slideNum];
    const cached = cache && cache.slides && cache.slides[slideNum];

    const audioFile = path.join(audioDir, `slide_${String(slideNum).padStart(2, '0')}.mp3`);
    const slideImg = path.join(slidesDir, `slide_${String(slideNum).padStart(2, '0')}.png`);

    const visualDirty = force || !cached || current.visualHash !== cached.visualHash || !fs.existsSync(slideImg);
    const audioDirty = force || !cached || current.narrationHash !== cached.narrationHash || !fs.existsSync(audioFile);

    if (visualDirty) dirtyVisuals.push(slideNum);
    if (audioDirty) dirtyAudio.push(slideNum);
  });

  const dirtyDeck = force || !fs.existsSync(webDeckHtml) || dirtyVisuals.length > 0 || dirtyAudio.length > 0;
  const dirtyHandout = force || dirtyVisuals.length > 0 || dirtyAudio.length > 0;
  
  let hasVideoExports = fs.existsSync(videoExportsDir) && fs.readdirSync(videoExportsDir).some(f => f.endsWith('.mp4'));
  const dirtyVideo = force || dirtyVisuals.length > 0 || dirtyAudio.length > 0 || !hasVideoExports;

  const isClean = !force && dirtyVisuals.length === 0 && dirtyAudio.length === 0 && !dirtyDeck;

  return {
    presentationDir,
    isClean,
    dirtyDeck,
    dirtyVisuals,
    dirtyAudio,
    dirtyHandout,
    dirtyVideo,
    totalSlides: slideNumbers.length,
    currentCommit,
    lastBuildCommit: cache ? cache.git_commit : null,
    fingerprints
  };
}

async function rebuildPresentation(presentationDir, options = {}) {
  const targetDir = path.resolve(presentationDir);
  const baseName = path.basename(targetDir);
  const force = options.fullRegeneration || options.force || false;

  console.log(`\n======================================================================`);
  console.log(` 🔨 REBUILDING PRESENTATION (Offline / Pre-generated Audio): ${baseName}`);
  console.log(`======================================================================`);

  const fingerprints = computePresentationFingerprints(targetDir);
  const cache = loadBuildCache(targetDir);
  const currentCommit = getGitCommitHash();

  const artifactsDir = path.join(targetDir, 'generated', 'artifacts');
  const outputsDir = path.join(targetDir, 'generated', 'outputs');
  const audioDir = path.join(artifactsDir, 'audio');
  const slidesDir = path.join(artifactsDir, 'slides_png');
  const webDeckDir = path.join(outputsDir, 'web_deck');
  const webDeckHtml = path.join(webDeckDir, 'index.html');
  const pdfDir = path.join(outputsDir, 'pdf');
  const videoExportsDir = path.join(outputsDir, 'video');

  [artifactsDir, outputsDir, audioDir, slidesDir, webDeckDir, pdfDir, videoExportsDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  const slideNumbers = Object.keys(fingerprints.slideHashes).map(Number).sort((a, b) => a - b);
  const dirtyVisuals = [];
  const missingAudio = [];

  slideNumbers.forEach(slideNum => {
    const current = fingerprints.slideHashes[slideNum];
    const cached = cache && cache.slides && cache.slides[slideNum];

    const audioFile = path.join(audioDir, `slide_${String(slideNum).padStart(2, '0')}.mp3`);
    const slideImg = path.join(slidesDir, `slide_${String(slideNum).padStart(2, '0')}.png`);

    if (!fs.existsSync(audioFile)) {
      missingAudio.push(slideNum);
    }

    const visualDirty = force || !cached || current.visualHash !== cached.visualHash || !fs.existsSync(slideImg);
    if (visualDirty) dirtyVisuals.push(slideNum);
  });

  if (missingAudio.length > 0) {
    throw new Error(`[❌] Missing pre-synthesized audio for slide(s): ${missingAudio.join(', ')} in ${audioDir}.\n` +
      `The 'rebuild' command assumes audio is already generated.\n` +
      `To synthesize audio using Neural TTS, run: npm run regen-overall or node scripts/regenerate.js ${targetDir}`);
  }

  const dirtyDeck = force || !fs.existsSync(webDeckHtml) || dirtyVisuals.length > 0;
  const dirtyHandout = force || dirtyVisuals.length > 0;
  let hasVideoExports = fs.existsSync(videoExportsDir) && fs.readdirSync(videoExportsDir).some(f => f.endsWith('.mp4'));
  const dirtyVideo = force || dirtyVisuals.length > 0 || !hasVideoExports;

  if (!force && !dirtyDeck && dirtyVisuals.length === 0 && !dirtyHandout && !dirtyVideo) {
    console.log(`[✓] No changes detected. All assets (.png, .pdf, .mp4) are up-to-date! (0s)`);
    return { skipped: true, targetDir };
  }

  console.log(`[!] Build tasks:`);
  console.log(`    - Web deck index.html:         ${dirtyDeck ? 'Dirty' : 'Clean'}`);
  console.log(`    - Visuals (re-screenshot):     ${dirtyVisuals.length > 0 ? dirtyVisuals.join(', ') : 'None (0)'}`);
  console.log(`    - Handout Notes PDF:           ${dirtyHandout ? 'Dirty' : 'Clean'}`);
  console.log(`    - Video exports:               ${dirtyVideo ? 'Dirty' : 'Clean'}\n`);

  // Step 1: Web Deck HTML
  if (dirtyDeck) {
    console.log(`[1/4] Compiling Web Deck HTML...`);
    compileDeckHtml(targetDir, { outputDir: webDeckDir });
  }

  // Step 2: Slide Screenshot Capture
  if (dirtyVisuals.length > 0) {
    console.log(`\n[2/4] Capturing 1920x1080 screenshots for ${dirtyVisuals.length} slide(s)...`);
    const htmlPath = path.join(webDeckDir, 'index.html');
    await captureSlides({
      htmlPath,
      outputDir: slidesDir,
      slideCount: slideNumbers.length,
      targetSlides: dirtyVisuals
    });
  } else {
    console.log(`\n[2/4] Visual screenshots are up-to-date (Capture skipped)`);
  }

  // Step 3: Executive Notes Handout PDF
  if (dirtyHandout) {
    console.log(`\n[3/4] Updating Executive Notes Handout PDF...`);
    const outputPdfPath = path.join(pdfDir, `${baseName.replace('_presentation', '')}_notes.pdf`);
    await buildHandoutPdf({
      narrationMdPath: fingerprints.mdPath,
      slidesDir,
      outputPdfPath
    });
  }

  // Step 4: Multi-Profile Video Encoding
  if (dirtyVideo) {
    console.log(`\n[4/4] Encoding Multi-Profile MP4 Videos...`);
    const tempDir = path.join(artifactsDir, 'temp_video');
    buildMultiProfileVideo({
      slidesDir,
      audioDir,
      tempDir,
      videoExportsDir,
      baseName: baseName.replace('_presentation', ''),
      slideCount: slideNumbers.length,
      args: ['all']
    });
  }

  // Save new cache state
  const newCache = {
    last_build_timestamp: new Date().toISOString(),
    git_commit: currentCommit,
    total_slides: slideNumbers.length,
    slides: fingerprints.slideHashes
  };
  saveBuildCache(targetDir, newCache);

  console.log(`\n======================================================================`);
  console.log(` [🎉] REBUILD COMPLETED SUCCESSFULLY FOR: ${baseName}`);
  console.log(`======================================================================\n`);

  return { success: true, targetDir };
}

async function regeneratePresentation(presentationDir, options = {}) {
  const targetDir = path.resolve(presentationDir);
  const baseName = path.basename(targetDir);

  console.log(`\n======================================================================`);
  console.log(` 🔍 ANALYZING INCREMENTAL CHANGES (with TTS Audio Check): ${baseName}`);
  console.log(`======================================================================`);

  const analysis = analyzePresentationChanges(targetDir, options);

  // Step 1: Synthesize Neural TTS Audio for dirty narration slides
  if (analysis.dirtyAudio.length > 0) {
    console.log(`\n[🎙️] Synthesizing Neural TTS Audio for ${analysis.dirtyAudio.length} dirty slide(s)...`);
    const artifactsDir = path.join(targetDir, 'generated', 'artifacts');
    const audioDir = path.join(artifactsDir, 'audio');
    const tempDir = path.join(artifactsDir, 'temp_audio_segments');
    if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    for (const slideNum of analysis.dirtyAudio) {
      const slideObj = analysis.fingerprints.slides.find(s => s.slideNum === slideNum);
      if (slideObj && slideObj.narration) {
        await generateSlideAudio(slideNum, slideObj.narration, {
          outputDir: audioDir,
          tempDir,
          force: true,
          voice: analysis.fingerprints.meta.voice || 'ru-RU-DmitryNeural',
          pitch: analysis.fingerprints.meta.pitch || '-5Hz',
          rate: analysis.fingerprints.meta.rate || '-9%'
        });
      }
    }
  } else {
    console.log(`[✓] Audio is up-to-date (TTS skipped)`);
  }

  // Step 2: Delegate all remaining steps to rebuildPresentation
  return await rebuildPresentation(targetDir, options);
}

function discoverAllPresentations(rootDir) {
  const presentations = [];
  const searchDirs = ['overall_presentations', 'detailed_overall_impact_presentations', 'platform_overview'];

  searchDirs.forEach(sub => {
    const parent = path.join(rootDir, sub);
    if (!fs.existsSync(parent)) return;

    const entries = fs.readdirSync(parent);
    entries.forEach(entry => {
      const fullPath = path.join(parent, entry);
      if (!fs.statSync(fullPath).isDirectory()) return;

      const docsDir = path.join(fullPath, 'docs');
      if (fs.existsSync(docsDir)) {
        const mdFiles = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
        const hasDeck = mdFiles.some(f => {
          if (f === 'presentation_deck.md') return true;
          const content = fs.readFileSync(path.join(docsDir, f), 'utf8');
          return content.includes('<!-- slide:') || /#{1,2}\s*Слайд\s*1/i.test(content);
        });
        if (hasDeck) {
          presentations.push(fullPath);
        }
      }
    });
  });

  return presentations.sort();
}

async function regenerateAllPresentations(rootDir, options = {}) {
  const list = discoverAllPresentations(rootDir);
  console.log(`\n======================================================================`);
  console.log(` 🚀 STARTING GLOBAL INCREMENTAL REGENERATION (${list.length} PRESENTATIONS)`);
  console.log(`======================================================================\n`);

  for (const presDir of list) {
    try {
      await regeneratePresentation(presDir, options);
    } catch (err) {
      console.error(`\n[❌] Fatal error in presentation '${path.basename(presDir)}':`, err.message);
      console.error(`[❌] Halting global regeneration pipeline immediately.\n`);
      throw err;
    }
  }

  console.log(`\n======================================================================`);
  console.log(` [🎉] ALL PRESENTATIONS CHECKED & REGENERATED!`);
  console.log(`======================================================================\n`);
}

async function rebuildAllPresentations(rootDir, options = {}) {
  const list = discoverAllPresentations(rootDir);
  console.log(`\n======================================================================`);
  console.log(` 🔨 STARTING GLOBAL OFFLINE REBUILD (${list.length} PRESENTATIONS)`);
  console.log(`======================================================================\n`);

  for (const presDir of list) {
    try {
      await rebuildPresentation(presDir, options);
    } catch (err) {
      console.error(`\n[❌] Fatal error in presentation '${path.basename(presDir)}':`, err.message);
      console.error(`[❌] Halting global rebuild pipeline immediately.\n`);
      throw err;
    }
  }

  console.log(`\n======================================================================`);
  console.log(` [🎉] ALL PRESENTATIONS REBUILT SUCCESSFULLY!`);
  console.log(`======================================================================\n`);
}

module.exports = {
  sha256,
  getGitCommitHash,
  computePresentationFingerprints,
  analyzePresentationChanges,
  rebuildPresentation,
  rebuildAllPresentations,
  regeneratePresentation,
  discoverAllPresentations,
  regenerateAllPresentations
};
