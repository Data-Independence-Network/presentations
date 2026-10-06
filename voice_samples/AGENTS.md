# AGENTS.md — voice_samples

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../sessions/2026/10-05_00_session_format_tempate.md)).

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
