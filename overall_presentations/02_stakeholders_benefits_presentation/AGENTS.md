# AGENTS.md — 02_stakeholders_benefits_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, and automated build pipelines for **Presentation 2: Stakeholder Benefits Presentation** (15 slides) and the comprehensive **Stakeholder Value Matrix Whitepaper**.

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
