const fs = require('fs');
const path = require('path');
const OpenAI = require('/home/anastasiya/.gemini/mcp-servers/openai-tts/node_modules/openai');

const apiKey = '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';
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
    console.log(`[✗] Failed ${voice}: ${err.message}`);
  }
}

async function run() {
  for (const v of voices) {
    await testVoice(v);
  }
}
run();
