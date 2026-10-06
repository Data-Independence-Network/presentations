# AGENTS.md — 01_sovereign_architecture_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, scripts, and build pipelines for **Presentation 1: Sovereign Architecture Deck** (15 slides).

---

- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.

---

## 📁 Subdirectory Layout
- **`docs/`**: Single Source of Truth (`presentation_deck.md`).
- **`scripts/`**: Automated CLI tools for PDF generation, slide capture, and video builds.
- **`rebuild.js`**: Offline asset rebuilder using committed audio tracks.
- **`regenerate.js`**: Per-presentation smart incremental regenerator (with TTS).
- **`generated/`**:
  - **`artifacts/`**:
    - `audio/`: Pre-synthesized MP3 audio tracks (`slide_01.mp3` .. `slide_15.mp3`).
    - `slides_png/`: 1920x1080 PNG slide images rendered from the web deck.
  - **`outputs/`**:
    - `web_deck/`: Interactive HTML5 slide player (`index.html`, compiled from `presentation_deck.md`).
    - `pdf/`: `01_sovereign_architecture_notes.pdf` and `turbase_presentation_visuals.pdf`.
    - `video/`: Final compiled MP4 video outputs (`email`, `10mb`, `master`).

---

## 🚀 Quick Execution Commands
```bash
# Offline Rebuild (no API key needed):
npm run rebuild-overall-architecture
node rebuild.js

# Build Architecture Visuals Whitepaper PDF:
npm run rebuild-overall-architecture-doc

# Incremental regeneration with Neural TTS:
npm run regen-overall-architecture
node regenerate.js
```
