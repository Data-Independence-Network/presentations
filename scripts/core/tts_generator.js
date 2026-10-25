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
const { WebSocket } = require('ws');
const { cleanSubstitutions, ensureSilenceClip } = require('./utils');

const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
const CHROMIUM_FULL_VERSION = '143.0.3650.75';
const WIN_EPOCH = 11644473600n;
const _SHA256_INITIAL = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
const _SHA256_STATE = [0xFD9FBEA2, 0x91243CE7, 0xBE499094, 0xCD2E1E0A, 0x6C006F49, 0x04BD35AB, 0xFEB0A7E4, 0x03EFFBD2];
const _SHA256_SCHEDULE = [0xEB24BF9E, 0x1558691F, 0xA0C09EE2, 0x0CFA32BA, 0xA622EE8C, 0xD1DD9491, 0xC0DD25A0, 0xF9E70AB6, 0xF0C31573, 0x7058CE4E, 0x7188E606, 0x00E5AB33, 0xD258B060, 0x72766564];
const _SHA256_ROUND_CONSTANTS = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
];
const _SHA256_ADJUSTMENT = 0xC9DC06A7;
const _SHA256_BLOCK_CONSTANTS = [..._SHA256_ROUND_CONSTANTS.slice(0, 14), _SHA256_ADJUSTMENT, ..._SHA256_ROUND_CONSTANTS.slice(15)];
const _SHA256_SIGMA0_ADJUSTMENT = 0x059C0B80;
const _SHA256_SIGMA1_ADJUSTMENT = 0x000B92C0;
const _CS64_COEFFICIENTS = [
  [0xE82E91B1, 0xB32700D0], [0x44DE24C6, 0x88DFF51D], [0x3BEB65BC, 0x29514038], [0xC89C5933, 0xB328CBDF],
  [0x8D1EC211, 0xD405B4D5], [0x314EF5D5, 0x26E55F3C], [0xE92491B1, 0x607801C6], [0xF0A5B9D5, 0x82B2C1FB],
  [0x06064CF3, 0xFA51A3DA], [0xDA79FA60, 0x207CC464], [0xBED20560, 0x3C3C74F3], [0x89F9C9F8, 0xD2D14B61],
  [0x35FA38C6, 0xBB04A2C1], [0xCB49E3C6, 0xC5626167]
];
const _CS64_FACTOR = 0x82893933;
const _CS64_ADJUSTMENT0 = 0xF2F90B1A;
const _CS64_ADJUSTMENT1 = 0x0B1A0000;

function mul32(a, b) { return Math.imul(a, b) >>> 0; }
function rotr(x, n) { return ((x >>> n) | (x << (32 - n))) >>> 0; }
function rol16(v) { v = v >>> 0; return ((v << 16) | (v >>> 16)) >>> 0; }
function sigma0(v) { v = v >>> 0; return (rotr(v, 7) ^ rotr(v, 18) ^ (v >>> 3)) >>> 0; }
function sigma1(v) { v = v >>> 0; return (rotr(v, 17) ^ rotr(v, 19) ^ (v >>> 10)) >>> 0; }

function sha256Rounds(state, words, firstRound = 0) {
  let [a, b, c, d, e, f, g, h] = state;
  const constants = firstRound === 14 ? _SHA256_BLOCK_CONSTANTS : _SHA256_ROUND_CONSTANTS;
  for (let i = firstRound; i < 64; i++) {
    const s1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
    const ch = (g ^ (e & (f ^ g))) >>> 0;
    const t1 = (h + s1 + ch + constants[i] + words[i]) >>> 0;
    const s0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
    const maj = ((a & b) | (c & (a | b))) >>> 0;
    const t2 = (s0 + maj) >>> 0;
    h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
  }
  return [a, b, c, d, e, f, g, h];
}

function expandSha256Schedule(words, firstWord = 16) {
  for (let i = firstWord; i < 64; i++) {
    words[i] = (sigma1(words[i - 2]) + words[i - 7] + sigma0(words[i - 15]) + words[i - 16]) >>> 0;
  }
}

function sha256Init(data) {
  const words = new Array(14).fill(0);
  words.push(((data[0] << 16) | (data[1] << 8) | data[2]) >>> 0);
  words.push(data.readUInt32BE(3));
  for (let i = 16; i < 30; i++) {
    let val = _SHA256_SCHEDULE[i - 16];
    if (i - 2 >= 14) val = (val + (i === 16 ? (sigma1(words[i - 2]) ^ _SHA256_SIGMA1_ADJUSTMENT) : sigma1(words[i - 2]))) >>> 0;
    if (i - 7 >= 14) val = (val + words[i - 7]) >>> 0;
    if (i - 15 >= 14) val = (val + (i === 29 ? (sigma0(words[i - 15]) ^ _SHA256_SIGMA0_ADJUSTMENT) : sigma0(words[i - 15]))) >>> 0;
    words.push(val >>> 0);
  }
  words.push((sigma1(words[28]) + words[23] + sigma0(words[15]) + words[14] + _SHA256_ADJUSTMENT - _SHA256_ROUND_CONSTANTS[14]) >>> 0);
  expandSha256Schedule(words, 31);
  const working = sha256Rounds(_SHA256_STATE, words, 14);
  return _SHA256_INITIAL.map((x, idx) => (x + working[idx]) >>> 0);
}

function sha256Digest(data) {
  const length = 57 + data.length;
  const padZeroLen = (55 - (length % 64) + 64) % 64;
  const tail = data.subarray(7);
  const padded = Buffer.alloc(tail.length + 1 + padZeroLen + 8);
  tail.copy(padded, 0);
  padded[tail.length] = 0x80;
  padded.writeBigUInt64BE(BigInt(length * 8), padded.length - 8);
  let state = sha256Init(data.subarray(0, 7));
  for (let offset = 0; offset < padded.length; offset += 64) {
    const words = [];
    for (let j = 0; j < 16; j++) words.push(padded.readUInt32BE(offset + j * 4));
    expandSha256Schedule(words, 16);
    const working = sha256Rounds(state, words, 0);
    state = state.map((x, idx) => (x + working[idx]) >>> 0);
  }
  const out = Buffer.alloc(32);
  state.forEach((v, i) => out.writeUInt32BE(v, i * 4));
  return out;
}

function wordsLe4Even(data) {
  const pad = (4 - (data.length % 4)) % 4;
  const padded = pad ? Buffer.concat([data, Buffer.alloc(pad)]) : data;
  const words = [];
  for (let i = 0; i < padded.length; i += 4) words.push(padded.readUInt32LE(i));
  if (words.length % 2 === 1) words.push(0);
  return words;
}

function cs64Digest(data, digest) {
  const keyA = (digest.readUInt32LE(0) | 1) >>> 0;
  const keyB = (digest.readUInt32LE(4) | 1) >>> 0;
  const factors = [mul32(keyA, _CS64_FACTOR), mul32(keyB, _CS64_FACTOR)];
  const terms = _CS64_COEFFICIENTS.map(([c], i) => mul32(c, factors[i % 2]));
  const offsets = _CS64_COEFFICIENTS.map(([, o]) => o >>> 0);
  const words = wordsLe4Even(Buffer.concat([Buffer.from([0]), data]));
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    let term = mul32(w, i % 2 === 0 ? keyA : keyB);
    let offset = mul32(rol16(w), i % 2 === 0 ? 0xEF0569FB : 0xC31713DB);
    if (i === 0) {
      term = (term + mul32(_CS64_ADJUSTMENT0, factors[0])) >>> 0;
      offset = (offset + _CS64_ADJUSTMENT1) >>> 0;
    }
    terms.push(term >>> 0);
    offsets.push(offset >>> 0);
  }
  let swapAcc = 0, swapLast = 0, state = 0, acc = 0;
  for (let i = 0; i < terms.length; i += 2) {
    const x = terms[i], y = terms[i + 1];
    let t = rol16((offsets[i] + x) >>> 0);
    let q = mul32(t, 0x76F50F34);
    swapAcc = (swapAcc + ((mul32(rol16(q), 0xC3EFEA97) + q) >>> 0)) >>> 0;
    t = rol16((offsets[i + 1] + y) >>> 0);
    q = mul32(t, 0x1881CE3C);
    swapLast = (mul32(rol16(q), 0x35BD1EC9) + q) >>> 0;
    swapAcc = (swapAcc + swapLast) >>> 0;

    state = (mul32(state, keyA) + x) >>> 0;
    state = mul32(rol16(state), 0xCF98B111);
    state = mul32(rol16(state), 0x87085B9F);
    state = mul32(rol16(state), 0x12CEB96D);
    state = mul32(rol16(state), 0x257E1D83);
    acc = (acc + state) >>> 0;
    t = (mul32(state, keyB) + y) >>> 0;
    t = mul32(rol16(t), 0xA27416F5);
    t = mul32(rol16(t), 0xD38396FF);
    state = mul32(rol16(mul32(rol16(t), 0x7C932B89)), 0xBFA49F69);
    acc = (acc + state) >>> 0;
  }
  const out = Buffer.alloc(8);
  out.writeUInt32LE((swapLast ^ state) >>> 0, 0);
  out.writeUInt32LE((swapAcc ^ acc) >>> 0, 4);
  return out.toString('hex').toUpperCase();
}

function generateSecMsGecV2() {
  let ticks = BigInt(Math.floor(Date.now() / 1000)) + WIN_EPOCH;
  ticks -= ticks % 300n;
  ticks *= 10000000n;
  const data = Buffer.from(`${ticks}${TRUSTED_CLIENT_TOKEN}`, 'ascii');
  const digest = sha256Digest(data);
  const cs64 = cs64Digest(data, digest);
  return `${cs64}-${digest.toString('hex').toUpperCase()}`;
}

function connectEdgeTtsWebSocket(outputFormat = 'audio-24khz-96kbitrate-mono-mp3') {
  const muid = crypto.randomBytes(16).toString('hex').toUpperCase();
  const connId = crypto.randomUUID().replace(/-/g, '');
  const gec = generateSecMsGecV2();
  const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${gec}&Sec-MS-GEC-Version=2-${CHROMIUM_FULL_VERSION}&ConnectionId=${connId}`;
  const wsConnect = new WebSocket(url, {
    host: 'speech.platform.bing.com',
    origin: 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
    headers: {
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROMIUM_FULL_VERSION.split('.')[0]}.0.0.0 Safari/537.36 Edg/${CHROMIUM_FULL_VERSION.split('.')[0]}.0.0.0`,
      'Accept-Encoding': 'gzip, deflate, br, zstd',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': `muid=${muid};`
    }
  });
  return new Promise((resolve, reject) => {
    wsConnect.on('open', () => {
      wsConnect.send(`Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"true"},"outputFormat":"${outputFormat}"}}}}`);
      resolve(wsConnect);
    });
    wsConnect.on('unexpected-response', (req, res) => {
      try { wsConnect.close(); } catch (e) {}
      reject(new Error(`Unexpected server response: ${res.statusCode}`));
    });
    wsConnect.on('error', err => reject(err));
  });
}

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

  for (let attempt = 1; attempt <= 8; attempt++) {
    try {
      const _wsConnect = await connectEdgeTtsWebSocket('audio-24khz-96kbitrate-mono-mp3');
      await new Promise((resolve, reject) => {
        const audioStream = fs.createWriteStream(filePath);
        let finished = false;
        let timeout = setTimeout(() => {
          if (!finished) {
            finished = true;
            try { _wsConnect.close(); } catch (e) {}
            reject(new Error('Timed out'));
          }
        }, 45000);

        audioStream.on('finish', () => {
          if (!finished) {
            finished = true;
            clearTimeout(timeout);
            try { _wsConnect.close(); } catch (e) {}
            resolve();
          }
        });

        audioStream.on('error', err => {
          if (!finished) {
            finished = true;
            clearTimeout(timeout);
            try { _wsConnect.close(); } catch (e) {}
            reject(err);
          }
        });

        _wsConnect.on('error', err => {
          if (!finished) {
            finished = true;
            clearTimeout(timeout);
            try { audioStream.end(); } catch (e) {}
            reject(err);
          }
        });

        _wsConnect.on('close', (code, reason) => {
          if (!finished) {
            setTimeout(() => {
              if (!finished) {
                finished = true;
                clearTimeout(timeout);
                if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
                  resolve();
                } else {
                  reject(new Error(`WebSocket closed (${code})`));
                }
              }
            }, 300);
          }
        });

        _wsConnect.on('message', (data, isBinary) => {
          if (isBinary) {
            const separator = 'Path:audio\r\n';
            const index = data.indexOf(separator);
            if (index !== -1) {
              const audioData = data.subarray(index + separator.length);
              audioStream.write(audioData);
            }
          } else {
            const message = data.toString();
            if (message.includes('Path:turn.end')) {
              audioStream.end();
            }
          }
        });

        const requestId = crypto.randomBytes(16).toString('hex');
        const escapedText = text.replace(/[<>&"']/g, c => {
          switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return c;
          }
        });
        const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="ru-RU"><voice name="${voice}"><prosody rate="${rate}" pitch="${pitch}" volume="default">${escapedText}</prosody></voice></speak>`;
        _wsConnect.send(`X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nPath:ssml\r\n\r\n` + ssml);
      });

      if (fs.existsSync(filePath) && fs.statSync(filePath).size > 100) {
        return true;
      }
      throw new Error('File empty');
    } catch (err) {
      const reason = err ? (err.message || String(err)) : 'unknown';
      if (attempt === 8) {
        const fatalErr = new Error(
          `\n[❌] FATAL ERROR: Audio synthesis failed for text: "${text.slice(0, 60)}..."\n` +
          `    Reason: ${reason}\n` +
          `    Key file verified: ${options.keyFile || 'text_to_speech_mcp_Open_API_key.txt'}\n` +
          `    Stopping all audio synthesis and halting parent build pipelines immediately.\n`
        );
        fatalErr.code = 'ERR_TTS_SYNTHESIS_FAILED';
        fatalErr.originalError = err;
        throw fatalErr;
      }
      console.warn(`[⚠️] Segment synthesis attempt ${attempt}/8 failed (${reason}), retrying in ${(attempt * 2)}s...`);
      await new Promise(r => setTimeout(r, attempt * 2000));
    }
  }
}

async function generateSlideAudio(slideNum, segmentsOrText, options = {}) {
  // 1. Verify TTS API Key before performing any synthesis
  const { key, keyFile } = getApiKey(options);
  options = { ...options, apiKey: key, keyFile };

  const outputDir = options.outputDir ? path.resolve(options.outputDir) : null;
  const tempDir = options.tempDir ? path.resolve(options.tempDir) : null;
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
    
    if (!fs.existsSync(segFile) || fs.statSync(segFile).size <= 100) {
      await synthesizeSegment(seg.text, segFile, options);
      await new Promise(r => setTimeout(r, 1500));
    }
    concatFiles.push(segFile);

    if (seg.pauseAfter > 0) {
      const silenceFile = ensureSilenceClip(seg.pauseAfter, tempDir);
      concatFiles.push(silenceFile);
    }
  }

  const concatListFile = path.join(tempDir, `concat_slide_${slideNum}.txt`);
  const concatContent = concatFiles.map(f => `file '${path.resolve(f)}'`).join('\n');
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
