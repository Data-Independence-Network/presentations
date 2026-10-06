# AGENTS.md — 02_stakeholders_benefits_presentation/docs

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

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
