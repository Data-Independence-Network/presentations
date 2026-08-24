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

const { cleanSubstitutions, ensureSilenceClip } = require('./utils');

function parseSlideSegments(rawText, extraSubstitutions = []) {
  const rawParagraphs = rawText
    .split(/\n\s*>*\s*\n/)
    .map(p => p.split('\n').map(l => l.replace(/^>\s*/, '').trim()).filter(Boolean).join(' '))
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
  const narrations = {};
  const slideSections = mdContent.split(/#{1,3}\s*Слайд\s*(\d+)/i);
  
  for (let i = 1; i < slideSections.length; i += 2) {
    const slideNum = parseInt(slideSections[i], 10);
    const content = slideSections[i + 1];

    const marker = 'Текст для диктора';
    const idx = content.indexOf(marker);
    if (idx === -1) continue;

    const after = content.slice(idx);
    const lineEnd = after.indexOf('\n');
    let rawText = after.slice(lineEnd + 1).split(/\n---/)[0].trim();

    narrations[slideNum] = parseSlideSegments(rawText, extraSubstitutions);
  }
  return narrations;
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
      if (attempt === 3) throw err;
      await new Promise(r => setTimeout(r, 1500));
    }
  }
}

async function generateSlideAudio(slideNum, segments, options = {}) {
  const outputDir = options.outputDir;
  const tempDir = options.tempDir;
  const force = options.force || false;

  if (outputDir && !fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (tempDir && !fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const finalFilename = `slide_${String(slideNum).padStart(2, '0')}.mp3`;
  const finalFilePath = path.join(outputDir, finalFilename);

  if (!force && fs.existsSync(finalFilePath) && fs.statSync(finalFilePath).size > 50000) {
    console.log(`[✓] Slide ${slideNum} audio already exists (${(fs.statSync(finalFilePath).size / 1024).toFixed(1)} KB), skipping.`);
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
  const dur = execSync(`ffprobe -i "${finalFilePath}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
  console.log(`    [✓] Slide ${slideNum} compiled: ${finalFilename} (${(stats.size / 1024).toFixed(1)} KB, ${parseFloat(dur).toFixed(1)}s)`);
}

async function generateAudioForPresentation(config = {}) {
  const narrationFile = config.narrationFile;
  const outputDir = config.outputDir;
  const tempDir = config.tempDir || path.join(path.dirname(outputDir), 'temp_audio_segments');
  const extraSubstitutions = config.extraSubstitutions || [];
  const args = config.args || process.argv.slice(2);

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const mdContent = fs.readFileSync(narrationFile, 'utf8');
  const slideNarrations = extractNarrationsFromMarkdown(mdContent, extraSubstitutions);
  console.log(`[i] Extracted narrations for ${Object.keys(slideNarrations).length} slides from ${path.basename(narrationFile)}.`);

  const forceFlag = args.includes('--force');
  const targetArg = args.find(a => a !== '--force') || 'all';

  const keys = Object.keys(slideNarrations).map(Number).sort((a, b) => a - b);
  for (const slideNum of keys) {
    if (targetArg && targetArg !== 'all' && Number(targetArg) !== slideNum) {
      continue;
    }
    await generateSlideAudio(slideNum, slideNarrations[slideNum], {
      outputDir,
      tempDir,
      force: forceFlag,
      voice: config.voice || 'ru-RU-DmitryNeural',
      pitch: config.pitch || '-5Hz',
      rate: config.rate || '-9%'
    });
  }
  console.log(`\n[🎉] All requested slide audio files processed in ${outputDir}`);
}

module.exports = {
  parseSlideSegments,
  extractNarrationsFromMarkdown,
  synthesizeSegment,
  generateSlideAudio,
  generateAudioForPresentation
};
