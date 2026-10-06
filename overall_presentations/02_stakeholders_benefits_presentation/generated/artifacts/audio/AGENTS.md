# AGENTS.md — 02_stakeholders_benefits_presentation/audio

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../../../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../../../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../../../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Stores the 15 MP3 narration files (`slide_01.mp3` through `slide_15.mp3`) for the Stakeholder Benefits Presentation, synthesized with Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`) at an executive cadence.

---

## 🛠️ Regeneration Instructions
To re-generate all audio files from `docs/turbase_stakeholders_presentation_narration.md`:
```bash
# In 02_stakeholders_benefits_presentation/scripts:
node generate_stakeholders_audio.js
```
