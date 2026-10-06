# AGENTS.md — voice_samples

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
Contains exploratory voice synthesis samples and benchmarking scripts used during initial audio production and narrator selection.

---

## 📄 Key Files
- **`sample_*.mp3`**: OpenAI TTS voice samples (`alloy`, `ash`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, `shimmer`).
- **`male_*.mp3`**: Comparative pace and pitch tests for Russian speech.
- **`test_voices.js`**: Node.js script for generating comparative voice evaluation samples (dynamically reads and validates `text_to_speech_mcp_Open_API_key.txt`).

---

## 🎙️ Current Production Standard
For all production slide narrations, Microsoft Edge Neural TTS voice **`ru-RU-DmitryNeural`** is used due to its natural baritone timbre, authoritative cadence, and native Russian phonetics. All synthesis requires `text_to_speech_mcp_Open_API_key.txt` in the root directory.
