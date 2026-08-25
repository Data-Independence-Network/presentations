# AGENTS.md — 02_stakeholders_benefits_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, and automated build pipelines for **Presentation 2: Stakeholder Benefits Presentation** (15 slides) and the comprehensive **Stakeholder Value Matrix Whitepaper**.

---

## 📁 Subdirectory Layout
- **`docs/`**: Master analytical Whitepaper (`turbase_stakeholders_value_matrix.md`) and Single Source of Truth (`presentation_deck.md`).
- **`scripts/`**: CLI build scripts for PDF rendering, slide capture, and video builds.
- **`regenerate.js`**: Per-presentation smart incremental regenerator.
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
# Incremental regeneration via NPM:
npm run regen-overall-stakeholder

# Generate executive Stakeholders Value Matrix PDF Whitepaper (A4):
npm run regen-overall-stakeholder-doc

# Generate speaker notes Handout PDF (A4):
NODE_PATH=$(npm root -g) node scripts/generate_stakeholders_handout_pdf.js

# Direct local incremental regeneration:
node regenerate.js
```
