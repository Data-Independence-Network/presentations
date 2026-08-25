# AGENTS.md — 01_sovereign_architecture_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, scripts, and build pipelines for **Presentation 1: Sovereign Architecture Deck** (15 slides).

---

## 📁 Subdirectory Layout
- **`docs/`**: Single Source of Truth (`presentation_deck.md`).
- **`scripts/`**: Automated CLI tools for PDF generation, slide capture, and video builds.
- **`rebuild.js`**: Offline asset rebuilder using committed audio tracks.
- **`regenerate.js`**: Per-presentation smart incremental regenerator (with TTS).
- **`generated/`**:
  - **`artifacts/`**:
    - `audio/`: Pre-synthesized MP3 audio tracks (`slide_01.mp3` .. `slide_15.mp3`).
    - `slides_png/`: 1920x1080 PNG slide images rendered from the web deck.
  - **`outputs/`**:
    - `web_deck/`: Interactive HTML5 slide player (`index.html`, compiled from `presentation_deck.md`).
    - `pdf/`: `01_sovereign_architecture_notes.pdf` and `turbase_presentation_visuals.pdf`.
    - `video/`: Final compiled MP4 video outputs (`email`, `10mb`, `master`).

---

## 🚀 Quick Execution Commands
```bash
# Offline Rebuild (no API key needed):
npm run rebuild-overall-architecture
node rebuild.js

# Build Architecture Visuals Whitepaper PDF:
npm run rebuild-overall-architecture-doc

# Incremental regeneration with Neural TTS:
npm run regen-overall-architecture
node regenerate.js
```
