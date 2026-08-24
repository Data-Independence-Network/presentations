# AGENTS.md — 01_sovereign_architecture_presentation/docs

## 🎯 Purpose & Scope
Contains the master narration scripts, visual layout plans, speaker notes, and generated handout PDFs for the **Sovereign Architecture Presentation**.

---

## 📄 Key Files
- **`turbase_presentation_narration.md`**: Master 15-slide speaker narration script in Russian (speech pace, cues, emphasis).
- **`turbase_presentation_visuals.md`**: Visual slide specifications, Mermaid architectural flowcharts, and metric layouts.
- **`turbase_presentation_visuals.pdf`**: Generated executive Architectural Visuals Blueprint PDF with vector Mermaid diagrams.
- **`turbase_sovereign_architecture_slides.pdf`**: Generated pure 16:9 landscape slide deck PDF.
- **`turbase_presentation_notes.pdf`**: Generated executive A4 handout with slide previews and speaker notes.

---

## 🛠️ Instructions for Agents
- When updating narration text in `turbase_presentation_narration.md`, re-run `node ../scripts/generate_slide_narration_audio.js` to update audio, followed by `node ../scripts/generate_handout_pdf.js`.
