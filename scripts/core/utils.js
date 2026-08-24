/**
 * Core Utilities for Presentation Media & Audio Pipelines
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure globally installed packages (node-edge-tts, playwright) are resolvable
try {
  const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  if (globalRoot && !module.paths.includes(globalRoot)) {
    module.paths.push(globalRoot);
  }
} catch (e) {}

/**
 * Standard phonetic text substitutions for Russian neural TTS
 */
const DEFAULT_SUBSTITUTIONS = [
  [/152-ФЗ/g, 'сто пятьдесят второму федеральному закону'],
  [/100%/g, 'сто процентов'],
  [/87\.5%/g, 'восемьдесят семь с половиной процентов'],
  [/85%/g, 'восемьдесят пять процентов'],
  [/80%\+/g, 'более восьмидесяти процентов'],
  [/80%/g, 'восемьдесят процентов'],
  [/35%/g, 'тридцать пять процентов'],
  [/30%/g, 'тридцать процентов'],
  [/20–30%/g, 'двадцать — тридцать процентов'],
  [/20–35%/g, 'двадцать — тридцать пять процентов'],
  [/20%/g, 'двадцать процентов'],
  [/0%/g, 'ноль процентов'],
  [/(\d+)\s*%/g, '$1 процентов'],
  [/TCO/g, 'совокупной стоимости владения'],
  [/Zero-Knowledge/gi, 'нулевого разглашения'],
  [/Zero-PII/gi, 'защиты персональных данных'],
  [/Single Source of Truth/gi, 'единого эталонного источника данных'],
  [/Proof-of-Personhood/gi, 'очной верификации'],
  [/Proof-of-Impression/gi, 'доказательства показа'],
  [/P2P/g, 'пи-ту-пи'],
  [/AI/g, 'искусственный интеллект'],
  [/ИИ/g, 'искусственный интеллект'],
  [/IoT/g, 'интернет вещей'],
  [/V2X/g, 'ви-ту-экс'],
  [/PQC/g, 'постквантовой криптографии'],
  [/Mesh/gi, 'мэш'],
  [/OLAP/g, 'олап'],
  [/AdTech/g, 'эдтек'],
  [/2 мс/g, 'две миллисекунды'],
  [/1 мс/g, 'одну миллисекунду'],
  [/3 секунды/g, 'три секунды'],
  [/3 сек/g, 'три секунды'],
  [/1 секунду/g, 'одну секунду'],
  [/1 сек/g, 'одну секунду'],
  [/128 байт/g, 'сто двадцать восемь байт'],
  [/128-байтные/g, 'стодвадцативосьмибайтные'],
  [/140 млн/g, 'сто сорок миллионов'],
  [/140 миллионов/g, 'сто сорок миллионов'],
  [/30\+ лет/g, 'тридцать лет'],
  [/30 лет/g, 'тридцать лет'],
  [/2 ГБ/g, 'два гигабайта'],
  [/35 МБ/g, 'тридцать пять мегабайт']
];

function cleanSubstitutions(text, extraSubstitutions = []) {
  let cleaned = text
    .split('\n')
    .map(line => line.replace(/^>\s*/, ''))
    .join(' ')
    .replace(/[«»"]/g, '"')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');

  // Apply default substitutions
  for (const [pattern, replacement] of DEFAULT_SUBSTITUTIONS) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  // Apply extra custom substitutions if provided
  for (const [pattern, replacement] of extraSubstitutions) {
    cleaned = cleaned.replace(pattern, replacement);
  }

  return cleaned.replace(/\s+/g, ' ').trim();
}

function getAudioDuration(filePath) {
  const cmd = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`;
  const output = execSync(cmd, { encoding: 'utf8' }).trim();
  return parseFloat(output);
}

function ensureSilenceClip(durationSec, tempDir) {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  const silencePath = path.join(tempDir, `silence_${durationSec}s.mp3`);
  if (!fs.existsSync(silencePath)) {
    execSync(`ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t ${durationSec} -b:a 96k "${silencePath}"`, { stdio: 'ignore' });
  }
  return silencePath;
}

module.exports = {
  cleanSubstitutions,
  getAudioDuration,
  ensureSilenceClip,
  DEFAULT_SUBSTITUTIONS
};
