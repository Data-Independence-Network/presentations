# AGENTS.md — 01_sovereign_architecture_presentation/docs

## 🎯 Purpose & Scope
Contains the master narration scripts, visual layout plans, speaker notes, and generated handout PDFs for the **Sovereign Architecture Presentation**.

---

## 📄 Key Files
- **`presentation_deck.md`**: Master Canonical Single Source of Truth (SSoT) containing 15 slide definitions, metadata, Mermaid diagrams, pillar cards, and speaker narration transcripts.
- **`turbase_presentation_visuals.pdf`**: Generated executive Architectural Visuals Blueprint PDF with vector Mermaid diagrams.
- **`turbase_sovereign_architecture_slides.pdf`**: Generated pure 16:9 landscape slide deck PDF.
- **`turbase_presentation_notes.pdf`**: Generated executive A4 handout with slide previews and speaker notes.

---

## 🛠️ Instructions for Agents
- When updating slide text, visuals, or narration, edit **`presentation_deck.md`**. Re-run `node ../../../scripts/build_all.js overall_presentations/01_sovereign_architecture_presentation` to compile the web deck, speech audio, notes PDF, and video.
