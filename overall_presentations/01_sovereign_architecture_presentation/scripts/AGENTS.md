# AGENTS.md — 01_sovereign_architecture_presentation/scripts

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
Contains automation tools for the Sovereign Architecture Presentation pipeline:

---

## 📜 Script Manifest
1. **`generate_architecture_doc_pdf.js`**: Builds executive Architecture Visuals PDF (`../docs/turbase_presentation_visuals.pdf`) dynamically from frontmatter in `presentation_deck.md`.
2. **`generate_handout_pdf.js`**: Builds executive A4 Notes Handout PDF (`../docs/01_sovereign_architecture_notes.pdf`) dynamically from `presentation_deck.md`.
3. **`capture_slides.js`**: Renders and saves 1920x1080 PNG screenshots into `../slides_png/`.
4. **`generate_slide_narration_audio.js`**: Synthesizes MP3 files into `../audio/` by parsing `../docs/presentation_deck.md` (validates `text_to_speech_mcp_Open_API_key.txt`).
5. **`build_presentation_video.js`**: Multi-profile FFmpeg video builder (`10mb`, `email`, `master`, or `all`), outputting MP4 files into `../video_exports/`.

---

## 🚀 Execution Guide
```bash
# Recommended incremental rebuild via NPM:
npm run regen-overall-architecture

# Build Architecture Visuals PDF:
npm run regen-overall-architecture-doc

# Generate Handout Notes PDF:
NODE_PATH=$(npm root -g) node generate_handout_pdf.js
```
