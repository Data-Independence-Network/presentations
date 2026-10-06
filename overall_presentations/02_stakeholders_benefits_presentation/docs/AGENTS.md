# AGENTS.md — 02_stakeholders_benefits_presentation/docs

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Houses the analytical whitepapers, stakeholder value matrices, speaker narration scripts, and compiled PDF deliverables for the **Stakeholder Benefits Presentation**.

---

## 📄 Key Documents
- **`presentation_deck.md`**: Master Canonical Single Source of Truth (SSoT) containing 15 slide definitions, stakeholder value metrics, and speaker narration transcripts.
- **`turbase_stakeholders_value_matrix.md`**: Master analytical Whitepaper containing detailed multi-stakeholder value propositions, Day 1 architecture, phased timeline, and comprehensive PROs / CONs / Mitigation matrices across all 6 stakeholder groups.
- **`turbase_stakeholders_value_matrix.pdf`**: Generated executive A4 PDF Whitepaper with tables, ASCII diagrams, Mermaid vector charts, and structured analyses.
- **`turbase_stakeholders_benefits_slides.pdf`**: Generated pure 16:9 landscape slide deck PDF.
- **`turbase_stakeholders_presentation_notes.pdf`**: Generated executive A4 Notes Handout with slide previews and narration transcripts.

---

## 🛠️ Instructions for Agents
- When modifying `turbase_stakeholders_value_matrix.md`, always re-run `node ../scripts/generate_stakeholders_matrix_pdf.js` to update the corresponding PDF.
- When modifying `presentation_deck.md`, re-run `node ../../../scripts/build_all.js overall_presentations/02_stakeholders_benefits_presentation` to compile the web deck, speech audio, notes PDF, and video.
