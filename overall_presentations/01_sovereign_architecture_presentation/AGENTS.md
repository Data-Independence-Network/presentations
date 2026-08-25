# AGENTS.md — 01_sovereign_architecture_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, scripts, and build pipelines for **Presentation 1: Sovereign Architecture Deck** (15 slides).

---

## 📁 Subdirectory Layout
- **`docs/`**: Single Source of Truth (`presentation_deck.md`), speaker notes, `01_sovereign_architecture_notes.pdf`, and `turbase_presentation_visuals.pdf`.
- **`web_deck/`**: Interactive HTML5/CSS3/JavaScript slide player (`index.html`, compiled from `presentation_deck.md`).
- **`audio/`**: Pre-synthesized MP3 audio tracks (`slide_01.mp3` .. `slide_15.mp3`).
- **`slides_png/`**: 1920x1080 PNG slide images rendered from the web deck.
- **`scripts/`**: Automated CLI tools for audio generation, slide capture, PDF handout compilation, and multi-profile video builds.
- **`regenerate.js`**: Per-presentation smart incremental regenerator.
- **`temp_video/`**: Intermediate FFmpeg segment renders (gitignored).
- **`video_exports/`**: Final compiled MP4 video outputs (gitignored).

---

## 🚀 Quick Execution Commands
```bash
# Incremental regeneration via NPM:
npm run gen-overall-architecture

# Build Architecture Visuals Whitepaper PDF:
npm run gen-overall-architecture-doc

# Generate speaker notes Handout PDF (A4):
NODE_PATH=$(npm root -g) node scripts/generate_handout_pdf.js

# Direct local incremental regeneration:
node regenerate.js
```
