# AGENTS.md — 01_sovereign_architecture_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, scripts, and build pipelines for **Presentation 1: Sovereign Architecture Deck** (15 slides).

---

## 📁 Subdirectory Layout
- **`docs/`**: Markdown scripts, visual layouts, speaker notes, and generated handout PDFs.
- **`web_deck/`**: Interactive HTML5/CSS3/JavaScript slide player (`index.html`, `architecture.css`, `architecture.js`).
- **`audio/`**: Pre-synthesized MP3 audio tracks (`slide_01.mp3` .. `slide_15.mp3`).
- **`slides_png/`**: 1920x1080 PNG slide images rendered from the web deck.
- **`scripts/`**: Automated CLI tools for audio generation, slide capture, PDF handout compilation, and multi-profile video builds.
- **`temp_video/`**: Intermediate FFmpeg segment renders (gitignored).
- **`video_exports/`**: Final compiled MP4 video outputs (gitignored).

---

## 🚀 Quick Execution Commands (from `scripts/`)
```bash
# Capture 1920x1080 slide screenshots
node scripts/capture_slides.js

# Generate speaker notes Handout PDF (A4)
node scripts/generate_handout_pdf.js

# Build video profiles (10mb, email, master, all)
node scripts/build_presentation_video.js all
```
