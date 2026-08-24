# AGENTS.md — 02_stakeholders_benefits_presentation/docs

## 🎯 Purpose & Scope
Houses the analytical whitepapers, stakeholder value matrices, speaker narration scripts, and compiled PDF deliverables for the **Stakeholder Benefits Presentation**.

---

## 📄 Key Documents
- **`turbase_stakeholders_value_matrix.md`**: Master analytical Whitepaper containing detailed multi-stakeholder value propositions, Day 1 architecture, phased timeline, and comprehensive PROs / CONs / Mitigation matrices across all 6 stakeholder groups.
- **`turbase_stakeholders_value_matrix.pdf`**: Generated executive A4 PDF Whitepaper with tables, ASCII diagrams, Mermaid vector charts, and structured analyses.
- **`turbase_stakeholders_presentation_narration.md`**: Word-for-word 15-slide speaker narration text in Russian (~8.5 min).
- **`turbase_stakeholders_visual_plan.md`**: Visual slide specifications, layout blocks, and KPI metrics.
- **`turbase_stakeholders_benefits_slides.pdf`**: Generated pure 16:9 landscape slide deck PDF.
- **`turbase_stakeholders_presentation_notes.pdf`**: Generated executive A4 Notes Handout with slide previews and narration transcripts.

---

## 🛠️ Instructions for Agents
- When modifying `turbase_stakeholders_value_matrix.md`, always re-run `node ../scripts/generate_stakeholders_matrix_pdf.js` to update the corresponding PDF.
- When modifying `turbase_stakeholders_presentation_narration.md`, re-run `node ../scripts/generate_stakeholders_audio.js` and `node ../scripts/generate_stakeholders_handout_pdf.js`.
