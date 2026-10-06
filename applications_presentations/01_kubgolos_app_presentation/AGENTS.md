# AGENTS.md — 01_kubgolos_app_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Presentation 01 of the 5-part Flagship Applications Suite: **«КубГолос»: измерять и складывать** (15 billboard slides).
- **Associated Whitepaper:** [Белая книга № 08 «КубГолос: форма оценки, счётчики и сложение вверх по дереву»](../../shared_docs/whitepapers/08_votecube_whitepaper.md)
- **Who does what:** Author & system architect — Artem V. Shamsutdinov. Planning — Claude Sonnet 5.5. Slide & narration elaboration — Gemini 3.8 Flash. Version 1.0 (2026).

---

## 🧭 Architectural Focus & Key Concepts
- **3 Core Contributions:**
  1. Multidimensional evaluation form with 100 basis points budget per question;
  2. In-memory streaming counters on Branches with compact epoch blocks;
  3. Upward tree summation of sums and counts instead of averaging averages.
- **Strict Invariants:**
  - Forbidden `%...` labels in slides, notes, or narration (Rule 9).
  - No collective corporate «мы/наш» (Rule 12).
  - No source code, DDL, or class names on slides (Rule 13).
  - Respectful tone, no derogatory words (Rule 14).
  - Clean Russian speech, no Anglicisms like "VoteCube", "SQLite", etc. (Rule 15).
  - Strict zero overflow (`scrollHeight <= clientHeight`) at 1920x1080 verified via `scripts/check_decks.js`.
- **Target Audience:** Citizens, sociologists, municipal services, housing cooperatives, systems engineers.
- **Narrative Style:** Constructive, institutional, respectful (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script (1002 words).
- **`docs/presentation_outline.md`**: Structural slide outline with timings and word count table.
- **`docs/deck.css`**: Isolated, autonomous stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build & Verification Commands
```bash
# Automated rule and zero-overflow verification:
npm --prefix applications_presentations run check-01
node scripts/check_decks.js applications_presentations/01_kubgolos_app_presentation

# Web deck compilation (offline, no TTS):
node scripts/build_deck_html.js applications_presentations/01_kubgolos_app_presentation
```
