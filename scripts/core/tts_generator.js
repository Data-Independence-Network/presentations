/**
 * Core Neural TTS Generator for Turbase Presentations
 * Engine: Microsoft Edge Neural TTS ('ru-RU-DmitryNeural')
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
let EdgeTTS;
try {
  EdgeTTS = require('node-edge-tts').EdgeTTS;
} catch (e) {
  const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  module.paths.push(globalRoot);
  EdgeTTS = require('node-edge-tts').EdgeTTS;
}

const crypto = require('crypto');
const { cleanSubstitutions, ensureSilenceClip } = require('./utils');

function computeSlideNarrationHash(narration, optionsOrMeta = {}) {
  const narrationContent = [
    narration || '',
    optionsOrMeta.voice || 'ru-RU-DmitryNeural',
    optionsOrMeta.pitch || '-5Hz',
    optionsOrMeta.rate || '-9%'
  ].join('||');
  return crypto.createHash('sha256').update(narrationContent, 'utf8').digest('hex');
}

function getAudioHashesPath(outputDir) {
  return path.join(outputDir, '.audio_hashes.json');
}

function loadAudioHashes(outputDir) {
  if (!outputDir) return {};
  const hashFile = getAudioHashesPath(outputDir);
  if (fs.existsSync(hashFile)) {
    try {
      return JSON.parse(fs.readFileSync(hashFile, 'utf8'));
    } catch (e) {
      return {};
    }
  }
  return {};
}

function saveSlideAudioHash(outputDir, slideNum, data) {
  if (!outputDir) return {};
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const hashFile = getAudioHashesPath(outputDir);
    const hashes = loadAudioHashes(outputDir);
    hashes[slideNum] = {
      ...(hashes[slideNum] || {}),
      ...data,
      updatedAt: new Date().toISOString()
    };
    fs.writeFileSync(hashFile, JSON.stringify(hashes, null, 2), 'utf8');
    return hashes;
  } catch (e) {
    console.warn(`[⚠️] Warning: Could not write audio hash file in ${outputDir}:`, e.message);
    return {};
  }
}

function findPresentationDirFromAudioDir(outputDir) {
  if (!outputDir) return null;
  let cur = path.resolve(outputDir);
  while (cur !== path.dirname(cur)) {
    if (fs.existsSync(path.join(cur, 'docs', 'presentation_deck.md')) ||
        fs.existsSync(path.join(cur, 'generated', '.build_cache.json')) ||
        fs.existsSync(path.join(cur, '.build_cache.json'))) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return null;
}

function getCachedSlideNarrationHash(presentationDir, slideNum) {
  if (!presentationDir) return null;
  try {
    const primaryCache = path.join(presentationDir, 'generated', '.build_cache.json');
    const legacyCache = path.join(presentationDir, '.build_cache.json');
    const cachePath = fs.existsSync(primaryCache) ? primaryCache : (fs.existsSync(legacyCache) ? legacyCache : null);
    if (cachePath) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (cache && cache.slides && cache.slides[slideNum] && cache.slides[slideNum].narrationHash) {
        return cache.slides[slideNum].narrationHash;
      }
    }
  } catch (e) {}
  return null;
}

function updateSlideCacheImmediately(presentationDir, slideNum, narrationHash) {
  if (!presentationDir) return;
  try {
    const genDir = path.join(presentationDir, 'generated');
    const primaryCachePath = path.join(genDir, '.build_cache.json');
    const legacyCachePath = path.join(presentationDir, '.build_cache.json');
    const targetPath = fs.existsSync(primaryCachePath)
      ? primaryCachePath
      : (fs.existsSync(legacyCachePath) ? legacyCachePath : primaryCachePath);

    if (!fs.existsSync(genDir) && targetPath === primaryCachePath) {
      fs.mkdirSync(genDir, { recursive: true });
    }

    let cache = {};
    if (fs.existsSync(targetPath)) {
      try {
        cache = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      } catch (e) {
        cache = {};
      }
    }

    if (!cache.slides) cache.slides = {};
    if (!cache.slides[slideNum]) cache.slides[slideNum] = {};

    cache.slides[slideNum].narrationHash = narrationHash;
    cache.last_build_timestamp = new Date().toISOString();

    fs.writeFileSync(targetPath, JSON.stringify(cache, null, 2), 'utf8');
  } catch (e) {
    // Non-fatal cache write
  }
}

function parseSlideSegments(rawText, extraSubstitutions = []) {
  const rawParagraphs = rawText
    .split(/\n\s*>*\s*\n/)
    .map(p => p.split('\n').map(l => l.replace(/^>\s*/, '').replace(/^\(Narration\):?/i, '').trim()).filter(Boolean).join(' '))
    .filter(Boolean);

  const segments = [];
  for (let pIdx = 0; pIdx < rawParagraphs.length; pIdx++) {
    const pText = cleanSubstitutions(rawParagraphs[pIdx], extraSubstitutions);
    if (!pText) continue;

    const sents = pText
      .split(/(?<=[.!?])\s+(?=[А-ЯA-Z"«\d])/g)
      .map(s => s.trim())
      .filter(Boolean);

    for (let sIdx = 0; sIdx < sents.length; sIdx++) {
      const isLastSentenceInParagraph = (sIdx === sents.length - 1);
      const isLastParagraph = (pIdx === rawParagraphs.length - 1);
      let pauseAfter = 0;
      if (!isLastParagraph || !isLastSentenceInParagraph) {
        pauseAfter = isLastSentenceInParagraph ? 1.2 : 0.9;
      }
      segments.push({
        text: sents[sIdx],
        pauseAfter,
        paragraphIdx: pIdx,
        sentenceIdx: sIdx
      });
    }
  }
  return segments;
}

function extractNarrationsFromMarkdown(mdContent, extraSubstitutions = []) {
  const { parseSlides, parseFrontmatter } = require('./deck_builder');
  const { body } = parseFrontmatter(mdContent);
  const slides = parseSlides(body || mdContent);

  const narrations = {};
  narrations._rawNarrations = {};
  slides.forEach(slide => {
    if (slide.narration) {
      narrations[slide.slideNum] = parseSlideSegments(slide.narration, extraSubstitutions);
      narrations._rawNarrations[slide.slideNum] = slide.narration;
    }
  });
  return narrations;
}

function findApiKeyFile(startDir) {
  let cur = path.resolve(startDir || process.cwd());
  while (cur !== path.dirname(cur)) {
    const candidate = path.join(cur, 'text_to_speech_mcp_Open_API_key.txt');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    cur = path.dirname(cur);
  }
  return null;
}

function getApiKey(options = {}) {
  const keyFile = options.keyFile || findApiKeyFile(options.startDir || process.cwd());
  if (!keyFile || !fs.existsSync(keyFile)) {
    const expectedPath = path.resolve(process.cwd(), 'text_to_speech_mcp_Open_API_key.txt');
    const err = new Error(
      `\n[❌] FATAL ERROR: TTS API Key file is missing!\n` +
      `    Expected location: ${expectedPath}\n` +
      `    Audio generation cannot proceed without 'text_to_speech_mcp_Open_API_key.txt'.\n` +
      `    Please create this file with a valid API key in the repository root.\n`
    );
    err.code = 'ERR_TTS_KEY_MISSING';
    throw err;
  }

  const rawKey = fs.readFileSync(keyFile, 'utf8').trim();
  if (!rawKey) {
    const err = new Error(
      `\n[❌] FATAL ERROR: TTS API Key file '${keyFile}' is empty!\n` +
      `    Audio generation cannot proceed with an empty key file.\n` +
      `    Please provide a valid API key inside 'text_to_speech_mcp_Open_API_key.txt'.\n`
    );
    err.code = 'ERR_TTS_KEY_EMPTY';
    throw err;
  }

  return { key: rawKey, keyFile };
}

async function synthesizeSegment(text, filePath, options = {}) {
  const voice = options.voice || 'ru-RU-DmitryNeural';
  const pitch = options.pitch || '-5Hz';
  const rate = options.rate || '-9%';

  const tts = new EdgeTTS({
    voice,
    lang: 'ru-RU',
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    pitch,
    rate,
    timeout: 30000,
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await tts.ttsPromise(text, filePath);
      return true;
    } catch (err) {
      if (attempt === 3) {
        const fatalErr = new Error(
          `\n[❌] FATAL ERROR: Audio synthesis failed for text: "${text.slice(0, 60)}..."\n` +
          `    Reason: ${err.message}\n` +
          `    Key file verified: ${options.keyFile || 'text_to_speech_mcp_Open_API_key.txt'}\n` +
          `    Stopping all audio synthesis and halting parent build pipelines immediately.\n`
        );
        fatalErr.code = 'ERR_TTS_SYNTHESIS_FAILED';
        fatalErr.originalError = err;
        throw fatalErr;
      }
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function generateSlideAudio(slideNum, segmentsOrText, options = {}) {
  // 1. Verify TTS API Key before performing any synthesis
  const { key, keyFile } = getApiKey(options);
  options = { ...options, apiKey: key, keyFile };

  const outputDir = options.outputDir;
  const tempDir = options.tempDir;
  const force = options.force || false;

  if (outputDir && !fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (tempDir && !fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const segments = typeof segmentsOrText === 'string'
    ? parseSlideSegments(segmentsOrText, options.extraSubstitutions || [])
    : segmentsOrText;

  const rawNarration = options.rawNarration || (
    typeof segmentsOrText === 'string'
      ? segmentsOrText
      : (Array.isArray(segmentsOrText) ? segmentsOrText.map(s => s.text).join(' ') : '')
  );

  const narrationHash = options.narrationHash || computeSlideNarrationHash(rawNarration, options);
  const presentationDir = options.presentationDir || findPresentationDirFromAudioDir(outputDir);

  const finalFilename = `slide_${String(slideNum).padStart(2, '0')}.mp3`;
  const finalFilePath = path.join(outputDir, finalFilename);

  const audioHashes = loadAudioHashes(outputDir);
  const recordedHash = audioHashes[slideNum] && audioHashes[slideNum].narrationHash;
  const cachedHash = getCachedSlideNarrationHash(presentationDir, slideNum);
  const knownHash = recordedHash || cachedHash;

  const hasValidFile = fs.existsSync(finalFilePath) && fs.statSync(finalFilePath).size > 1000;

  // Skip if audio file already exists and hash matches exactly
  if (!force && hasValidFile && knownHash === narrationHash) {
    console.log(`[✓] Slide ${slideNum} audio is up-to-date (${(fs.statSync(finalFilePath).size / 1024).toFixed(1)} KB), skipping.`);
    if (!recordedHash) {
      saveSlideAudioHash(outputDir, slideNum, {
        narrationHash,
        size: fs.statSync(finalFilePath).size,
        voice: options.voice || 'ru-RU-DmitryNeural',
        pitch: options.pitch || '-5Hz',
        rate: options.rate || '-9%'
      });
    }
    if (!cachedHash && presentationDir) {
      updateSlideCacheImmediately(presentationDir, slideNum, narrationHash);
    }
    return;
  }

  console.log(`[🎙️] Synthesizing Slide ${slideNum} (${segments.length} segments, rate: ${options.rate || '-9%'}, pauses: 0.9s / 1.2s)...`);

  const concatFiles = [];
  for (let idx = 0; idx < segments.length; idx++) {
    const seg = segments[idx];
    const segFile = path.join(tempDir, `s${slideNum}_seg${idx}.mp3`);
    
    await synthesizeSegment(seg.text, segFile, options);
    concatFiles.push(segFile);
    await new Promise(r => setTimeout(r, 350));

    if (seg.pauseAfter > 0) {
      const silenceFile = ensureSilenceClip(seg.pauseAfter, tempDir);
      concatFiles.push(silenceFile);
    }
  }

  const concatListFile = path.join(tempDir, `concat_slide_${slideNum}.txt`);
  const concatContent = concatFiles.map(f => `file '${f}'`).join('\n');
  fs.writeFileSync(concatListFile, concatContent);

  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${finalFilePath}"`, { stdio: 'ignore' });

  try {
    fs.unlinkSync(concatListFile);
    for (let idx = 0; idx < segments.length; idx++) {
      const segFile = path.join(tempDir, `s${slideNum}_seg${idx}.mp3`);
      if (fs.existsSync(segFile)) fs.unlinkSync(segFile);
    }
  } catch (e) {}

  const stats = fs.statSync(finalFilePath);
  let dur = '0.0';
  try {
    dur = execSync(`ffprobe -i "${finalFilePath}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
  } catch (e) {}

  // IMMEDIATELY RECORD HASH IN BOTH CACHES UPON SUCCESSFUL SYNTHESIS
  saveSlideAudioHash(outputDir, slideNum, {
    narrationHash,
    size: stats.size,
    durationSeconds: parseFloat(dur) || 0,
    voice: options.voice || 'ru-RU-DmitryNeural',
    pitch: options.pitch || '-5Hz',
    rate: options.rate || '-9%'
  });

  if (presentationDir) {
    updateSlideCacheImmediately(presentationDir, slideNum, narrationHash);
  }

  console.log(`    [✓] Slide ${slideNum} compiled: ${finalFilename} (${(stats.size / 1024).toFixed(1)} KB, ${parseFloat(dur).toFixed(1)}s)`);
}

async function generateAudioForPresentation(config = {}) {
  // Verify TTS API Key before processing
  const { key, keyFile } = getApiKey(config);
  config = { ...config, apiKey: key, keyFile };

  const narrationFile = config.narrationFile;
  const outputDir = config.outputDir;
  const tempDir = config.tempDir || path.join(path.dirname(outputDir), 'temp_audio_segments');
  const extraSubstitutions = config.extraSubstitutions || [];
  const args = config.args || process.argv.slice(2);
  const presentationDir = config.presentationDir || findPresentationDirFromAudioDir(outputDir) || path.resolve(path.dirname(narrationFile), '..');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const mdContent = fs.readFileSync(narrationFile, 'utf8');
  const { parseFrontmatter } = require('./deck_builder');
  const { meta } = parseFrontmatter(mdContent);

  const voice = config.voice || (meta && meta.voice) || 'ru-RU-DmitryNeural';
  const pitch = config.pitch || (meta && meta.pitch) || '-5Hz';
  const rate = config.rate || (meta && meta.rate) || '-9%';

  const slideNarrations = extractNarrationsFromMarkdown(mdContent, extraSubstitutions);
  const rawNarrations = slideNarrations._rawNarrations || {};

  const forceFlag = args.includes('--force');
  const targetArg = args.find(a => a !== '--force') || 'all';

  const keys = Object.keys(slideNarrations).filter(k => !k.startsWith('_')).map(Number).sort((a, b) => a - b);
  console.log(`[i] Extracted narrations for ${keys.length} slides from ${path.basename(narrationFile)}.`);

  for (const slideNum of keys) {
    if (targetArg && targetArg !== 'all' && Number(targetArg) !== slideNum) {
      continue;
    }
    const rawText = rawNarrations[slideNum] || '';
    const narrationHash = computeSlideNarrationHash(rawText, { voice, pitch, rate });

    await generateSlideAudio(slideNum, slideNarrations[slideNum], {
      outputDir,
      tempDir,
      presentationDir,
      rawNarration: rawText,
      narrationHash,
      force: forceFlag,
      voice,
      pitch,
      rate
    });
  }
  console.log(`\n[🎉] All requested slide audio files processed in ${outputDir}`);
}

module.exports = {
  getApiKey,
  findApiKeyFile,
  parseSlideSegments,
  extractNarrationsFromMarkdown,
  synthesizeSegment,
  generateSlideAudio,
  generateAudioForPresentation,
  computeSlideNarrationHash,
  loadAudioHashes,
  saveSlideAudioHash,
  findPresentationDirFromAudioDir,
  getCachedSlideNarrationHash,
  updateSlideCacheImmediately
};
