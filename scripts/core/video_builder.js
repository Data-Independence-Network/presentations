/**
 * Core Multi-Profile Video Builder using FFmpeg
 * Combines PNG slides from slides_png/ with MP3 audio from audio/
 * Outputs final videos to video_exports/
 *
 * Spacing Rules:
 *   - Slide 1: 2.0s leading silence before audio, 4.0s trailing silence after audio.
 *   - Slides 2..(N-1): 1.0s leading silence before audio, 4.0s trailing silence after audio.
 *     (Result: Exactly 5.0s spacing between slide narrations = 4.0s on closing slide + 1.0s on coming slide)
 *   - Slide N: 1.0s leading silence before audio, 4.0s trailing outro silence.
 *
 * Profiles:
 *   - '10mb'   : Under 10MB (720p 20fps, CRF 28, AAC 48k mono)
 *   - 'email'  : Under 25MB (1080p 30fps, CRF 24, AAC 96k mono)
 *   - 'master' : Studio Master Quality (1080p 30fps, CRF 18, AAC 192k)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { getAudioDuration } = require('./utils');

function buildSegment(slideNum, profile, config) {
  const slidesDir = config.slidesDir;
  const audioDir = config.audioDir;
  const tempDir = config.tempDir;
  const slideCount = config.slideCount || 10;

  if (tempDir && !fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const padded = String(slideNum).padStart(2, '0');
  const imgPath = path.join(slidesDir, `slide_${padded}.png`);
  const audioPath = path.join(audioDir, `slide_${padded}.mp3`);
  const outSegment = path.join(tempDir, `segment_${padded}.mp4`);

  if (!fs.existsSync(imgPath) || !fs.existsSync(audioPath)) {
    throw new Error(`Missing slide or audio for Slide ${slideNum} in ${slidesDir} / ${audioDir}`);
  }

  const rawAudioDur = getAudioDuration(audioPath);

  let leadSilence = slideNum === 1 ? (config.leadSilenceFirst || 2.0) : (config.leadSilenceOther || 1.0);
  let trailSilence = config.trailSilence || 4.0;
  let totalDur = leadSilence + rawAudioDur + trailSilence;

  const leadMs = Math.round(leadSilence * 1000);

  let vcodec = 'libx264 -pix_fmt yuv420p';
  let scale = profile === '10mb' ? '-vf "scale=1280:720"' : '-vf "scale=1920:1080"';
  let fps = profile === '10mb' ? '-r 20' : '-r 30';
  let crf = profile === '10mb' ? '-crf 28' : (profile === 'email' ? '-crf 24' : '-crf 18');
  let audioBitrate = profile === '10mb' ? '-b:a 48k' : (profile === 'email' ? '-b:a 96k' : '-b:a 192k');

  const filterComplex = `[1:a]adelay=delays=${leadMs}:all=1,apad=pad_dur=${trailSilence.toFixed(1)}[a]`;

  const cmd = `ffmpeg -y -loop 1 -i "${imgPath}" -i "${audioPath}" -filter_complex "${filterComplex}" -map 0:v -map "[a]" -c:v ${vcodec} ${scale} ${fps} ${crf} -c:a aac ${audioBitrate} -t ${totalDur.toFixed(3)} "${outSegment}"`;
  execSync(cmd, { stdio: 'ignore' });

  console.log(`  [✓] Slide ${padded}/${slideCount} encoded (Speech: ${rawAudioDur.toFixed(1)}s, Total: ${totalDur.toFixed(1)}s | Lead: ${leadSilence}s, Trail: ${trailSilence}s)`);
  return `file 'segment_${padded}.mp4'`;
}

function buildVideo(profile = 'email', config = {}) {
  const slidesDir = config.slidesDir;
  const audioDir = config.audioDir;
  const tempDir = config.tempDir || path.join(path.dirname(slidesDir), 'temp_video');
  const videoExportsDir = config.videoExportsDir || path.join(path.dirname(slidesDir), 'video_exports');
  const slideCount = config.slideCount || 10;
  const baseName = config.baseName || 'presentation';

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  if (!fs.existsSync(videoExportsDir)) fs.mkdirSync(videoExportsDir, { recursive: true });

  console.log(`\n=========================================================`);
  console.log(` [🎬] Building Video: Profile '${profile.toUpperCase()}' (${baseName})`);
  console.log(`=========================================================`);

  const concatLines = [];
  let totalPresentationTime = 0;

  for (let i = 1; i <= slideCount; i++) {
    const padded = String(i).padStart(2, '0');
    const line = buildSegment(i, profile, { slidesDir, audioDir, tempDir, slideCount });
    concatLines.push(line);

    const segmentPath = path.join(tempDir, `segment_${padded}.mp4`);
    const segDur = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${segmentPath}"`).toString().trim());
    totalPresentationTime += segDur;
  }

  const concatListPath = path.join(tempDir, 'concat_list.txt');
  fs.writeFileSync(concatListPath, concatLines.join('\n'), 'utf8');

  const finalVideoName = `${baseName}_${profile}.mp4`;
  const finalVideoPath = path.join(videoExportsDir, finalVideoName);

  const concatCmd = `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c copy "${finalVideoPath}"`;
  execSync(concatCmd, { stdio: 'ignore' });

  // Clean up temporary segments
  try {
    fs.unlinkSync(concatListPath);
    for (let i = 1; i <= slideCount; i++) {
      const seg = path.join(tempDir, `segment_${String(i).padStart(2, '0')}.mp4`);
      if (fs.existsSync(seg)) fs.unlinkSync(seg);
    }
  } catch (e) {}

  const stats = fs.statSync(finalVideoPath);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  const mins = Math.floor(totalPresentationTime / 60);
  const secs = Math.round(totalPresentationTime % 60);

  console.log(`[🎉] Done! File: ${finalVideoPath} (${sizeMb} MB, Duration: ${mins}m ${secs}s)`);
  return finalVideoPath;
}

function buildMultiProfileVideo(config = {}) {
  const args = config.args || process.argv.slice(2);
  let profileArg = args[0] || 'email';
  profileArg = profileArg.toLowerCase();

  if (profileArg === 'all') {
    buildVideo('email', config);
    buildVideo('10mb', config);
    buildVideo('master', config);
  } else {
    buildVideo(profileArg, config);
  }
}

module.exports = {
  buildSegment,
  buildVideo,
  buildMultiProfileVideo
};
