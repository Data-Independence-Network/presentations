# AGENTS.md — 02_stakeholders_benefits_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, and automated build pipelines for **Presentation 2: Stakeholder Benefits Presentation** (15 slides) and the comprehensive **Stakeholder Value Matrix Whitepaper**.

---

## 📁 Subdirectory Layout
- **`docs/`**: Master analytical Whitepaper (`turbase_stakeholders_value_matrix.md`), Single Source of Truth (`presentation_deck.md`), executive PDF Whitepaper (`turbase_stakeholders_value_matrix.pdf`), and Notes Handout PDF (`02_stakeholders_benefits_notes.pdf`).
- **`web_deck/`**: High-contrast, mobile-first billboard typography web presentation (`index.html`, compiled from `presentation_deck.md`).
- **`audio/`**: Pre-synthesized MP3 audio narration files (`slide_01.mp3` .. `slide_15.mp3`).
- **`slides_png/`**: 1920x1080 PNG slide images rendered with billboard-scale text for small-screen readability.
- **`scripts/`**: CLI build scripts for audio generation, slide capture, PDF Whitepaper rendering, Notes Handout creation, and video builds.
- **`regenerate.js`**: Per-presentation smart incremental regenerator.
- **`temp_video/`**: Intermediate FFmpeg segment renders (gitignored).
- **`video_exports/`**: Final compiled MP4 video outputs (gitignored).

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
