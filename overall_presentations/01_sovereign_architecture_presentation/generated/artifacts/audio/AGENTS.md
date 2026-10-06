# AGENTS.md — 01_sovereign_architecture_presentation/audio

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
Stores the 15 MP3 narration files (`slide_01.mp3` through `slide_15.mp3`) synthesized using Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`) for the Sovereign Architecture Presentation.

---

## 🛠️ Regeneration Instructions
To regenerate any or all audio tracks from `docs/turbase_presentation_narration.md`:
```bash
# In 01_sovereign_architecture_presentation/scripts:
node generate_slide_narration_audio.js all
```
