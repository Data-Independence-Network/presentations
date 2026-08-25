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

async function regeneratePresentation(presentationDir, options = {}) {
  const targetDir = path.resolve(presentationDir);
  const baseName = path.basename(targetDir);

  console.log(`\n======================================================================`);
  console.log(` 🔍 ANALYZING INCREMENTAL CHANGES FOR: ${baseName}`);
  console.log(`======================================================================`);

  const analysis = analyzePresentationChanges(targetDir, options);

  if (analysis.isClean) {
    console.log(`[✓] No changes detected. All assets (.mp3, .png, .pdf, .mp4) are up-to-date! (0s)`);
    return { skipped: true, targetDir };
  }

  console.log(`[!] Changes detected:`);
  console.log(`    - Visual changes (re-screenshot): ${analysis.dirtyVisuals.length > 0 ? analysis.dirtyVisuals.join(', ') : 'None (0)'}`);
  console.log(`    - Narration changes (re-TTS):     ${analysis.dirtyAudio.length > 0 ? analysis.dirtyAudio.join(', ') : 'None (0)'}`);
  console.log(`    - Web deck index.html:            ${analysis.dirtyDeck ? 'Dirty' : 'Clean'}`);
  console.log(`    - Handout PDF & Video exports:    ${analysis.dirtyHandout || analysis.dirtyVideo ? 'Dirty' : 'Clean'}\n`);

  const artifactsDir = path.join(targetDir, 'generated', 'artifacts');
  const outputsDir = path.join(targetDir, 'generated', 'outputs');
  const audioDir = path.join(artifactsDir, 'audio');
  const slidesDir = path.join(artifactsDir, 'slides_png');
  const webDeckDir = path.join(outputsDir, 'web_deck');
  const pdfDir = path.join(outputsDir, 'pdf');
  const videoExportsDir = path.join(outputsDir, 'video');

  [artifactsDir, outputsDir, audioDir, slidesDir, webDeckDir, pdfDir, videoExportsDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  // Step 1: Compile Web Deck
  if (analysis.dirtyDeck) {
    console.log(`[1/5] Compiling Web Deck HTML...`);
    compileDeckHtml(targetDir, { outputDir: webDeckDir });
  }

  // Step 2: Targeted TTS Synthesis
  if (analysis.dirtyAudio.length > 0) {
    console.log(`\n[2/5] Synthesizing Neural TTS Audio for ${analysis.dirtyAudio.length} dirty slide(s)...`);
    const tempDir = path.join(artifactsDir, 'temp_audio_segments');
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
    console.log(`\n[2/5] Audio is up-to-date (TTS skipped — saved ~30s)`);
  }

  // Step 3: Targeted Screenshot Capture
  if (analysis.dirtyVisuals.length > 0) {
    console.log(`\n[3/5] Capturing 1920x1080 screenshots for ${analysis.dirtyVisuals.length} dirty slide(s)...`);
    const htmlPath = path.join(webDeckDir, 'index.html');

    await captureSlides({
      htmlPath,
      outputDir: slidesDir,
      slideCount: analysis.totalSlides,
      targetSlides: analysis.dirtyVisuals
    });
  } else {
    console.log(`\n[3/5] Visual screenshots are up-to-date (Capture skipped)`);
  }

  // Step 4: Handout Notes PDF
  if (analysis.dirtyHandout) {
    console.log(`\n[4/5] Updating Executive Notes Handout PDF...`);
    const outputPdfPath = path.join(pdfDir, `${baseName.replace('_presentation', '')}_notes.pdf`);

    await buildHandoutPdf({
      narrationMdPath: analysis.fingerprints.mdPath,
      slidesDir,
      outputPdfPath
    });
  }

  // Step 5: Multi-Profile Video Encoding
  if (analysis.dirtyVideo) {
    // Ensure audio exists for all slides before building video
    const hasAllAudio = Array.from({ length: analysis.totalSlides }, (_, i) => i + 1)
      .every(num => fs.existsSync(path.join(audioDir, `slide_${String(num).padStart(2, '0')}.mp3`)));

    if (hasAllAudio) {
      console.log(`\n[5/5] Re-encoding Multi-Profile MP4 Videos...`);
      const tempDir = path.join(artifactsDir, 'temp_video');

      buildMultiProfileVideo({
        slidesDir,
        audioDir,
        tempDir,
        videoExportsDir,
        baseName: baseName.replace('_presentation', ''),
        slideCount: analysis.totalSlides,
        args: ['all']
      });
    } else {
      console.log(`\n[5/5] Video encoding skipped (Audio files pending synthesis)`);
    }
  }

  // Save new cache state
  const newCache = {
    last_build_timestamp: new Date().toISOString(),
    git_commit: analysis.currentCommit,
    total_slides: analysis.totalSlides,
    slides: analysis.fingerprints.slideHashes
  };
  saveBuildCache(targetDir, newCache);

  console.log(`\n======================================================================`);
  console.log(` [🎉] REGENERATION COMPLETED SUCCESSFULLY FOR: ${baseName}`);
  console.log(`======================================================================\n`);

  return { success: true, targetDir };
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

module.exports = {
  sha256,
  getGitCommitHash,
  computePresentationFingerprints,
  analyzePresentationChanges,
  regeneratePresentation,
  discoverAllPresentations,
  regenerateAllPresentations
};
