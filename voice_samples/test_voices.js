const fs = require('fs');
const path = require('path');
const OpenAI = require('/home/anastasiya/.gemini/mcp-servers/openai-tts/node_modules/openai');

const { getApiKey } = require('../scripts/core/tts_generator');

const { key: apiKey, keyFile } = getApiKey();
console.log(`[i] Loaded TTS API key from: ${keyFile}`);

const openai = new OpenAI({ apiKey });

const sampleText = "Архитектура «Турбаза» — это национальная суверенная инфраструктура данных, снижающая расходы на государственные дата-центры более чем в восемь раз.";

const voices = ['onyx', 'nova', 'echo', 'alloy', 'shimmer', 'fable', 'sage', 'ash', 'coral'];

async function testVoice(voice) {
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1-hd',
      voice: voice,
      input: sampleText,
      speed: 1.0,
      response_format: 'mp3',
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    const outDir = __dirname;
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filePath = path.join(outDir, `sample_${voice}.mp3`);
    fs.writeFileSync(filePath, buffer);
    console.log(`[✓] Generated ${voice}: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`);
  } catch (err) {
    console.error(`\n[❌] FATAL ERROR: Audio generation failed for voice '${voice}' with key from ${keyFile}!\n    Reason: ${err.message}\n`);
    throw err;
  }
}

async function run() {
  for (const v of voices) {
    await testVoice(v);
  }
}
run().catch(err => {
  console.error('[❌] Halting voice testing execution.');
  process.exit(1);
});
