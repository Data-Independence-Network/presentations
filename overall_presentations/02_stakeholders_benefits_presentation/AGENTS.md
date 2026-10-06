# AGENTS.md — 02_stakeholders_benefits_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, and automated build pipelines for **Presentation 2: Stakeholder Benefits Presentation** (15 slides) and the comprehensive **Stakeholder Value Matrix Whitepaper**.

---

- **Semantic Labels Invariant:** Метки в [`LABELS.md`](../../shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.

---

## 📁 Subdirectory Layout
- **`docs/`**: Master analytical Whitepaper (`turbase_stakeholders_value_matrix.md`) and Single Source of Truth (`presentation_deck.md`).
- **`scripts/`**: CLI build scripts for PDF rendering, slide capture, and video builds.
- **`rebuild.js`**: Offline asset rebuilder using committed audio tracks.
- **`regenerate.js`**: Per-presentation smart incremental regenerator (with TTS).
- **`generated/`**:
  - **`artifacts/`**:
    - `audio/`: Pre-synthesized MP3 audio narration files (`slide_01.mp3` .. `slide_15.mp3`).
    - `slides_png/`: 1920x1080 PNG slide images rendered with billboard-scale text.
  - **`outputs/`**:
    - `web_deck/`: High-contrast web presentation player (`index.html`, compiled from `presentation_deck.md`).
    - `pdf/`: `turbase_stakeholders_value_matrix.pdf` and `02_stakeholders_benefits_notes.pdf`.
    - `video/`: Final compiled MP4 video outputs (`email`, `10mb`, `master`).

---

## 🚀 Quick Execution Commands
```bash
# Offline Rebuild (no API key needed):
npm run rebuild-overall-stakeholder
node rebuild.js

# Generate executive Stakeholders Value Matrix PDF Whitepaper (A4):
npm run rebuild-overall-stakeholder-doc

# Incremental regeneration with Neural TTS:
npm run regen-overall-stakeholder
node regenerate.js
```
