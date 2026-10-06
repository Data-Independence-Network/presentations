# AGENTS.md — Scripts for 01_paradigm_shift_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
This directory contains dedicated CLI scripts for building, generating, and rendering all media assets for **Часть 1: Манифест и Смена парадигмы** (`platform_overview/01_paradigm_shift_presentation/`).

## 📜 Script Index
- **`capture_slides.js`**: Captures 1920x1080 slide screenshots from `generated/outputs/web_deck/index.html` into `generated/artifacts/slides_png/`.
- **`generate_slide_narration_audio.js`**: Synthesizes neural audio (`ru-RU-DmitryNeural`, `-9%` rate, `-5Hz` pitch) for all 12 slides into `generated/artifacts/audio/`.
- **`generate_handout_pdf.js`**: Generates executive A4 Notes Handout PDF (`generated/outputs/pdf/01_paradigm_shift_notes.pdf`).
- **`generate_slides_pdf.js`**: Generates 16:9 Landscape slide deck PDF (`generated/outputs/pdf/01_paradigm_shift_slides.pdf`).
- **`generate_manifesto_doc_pdf.js`**: Generates executive Manifesto & Outline PDF (`generated/outputs/pdf/01_paradigm_shift_manifesto.pdf`).
- **`build_presentation_video.js`**: Compiles multi-profile MP4 videos (`1080p_master`, `10mb_telegram`, `vertical_shorts`) into `generated/outputs/video/`.

## ⚙️ Conventions & Asset Layout
- All intermediate assets are placed in `generated/artifacts/` (`slides_png/`, `audio/`, `temp_video/`, `temp_audio_segments/`).
- All deliverables are placed in `generated/outputs/` (`web_deck/`, `pdf/`, `video/`).
