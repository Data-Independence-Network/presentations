# AGENTS.md — 02_stakeholders_benefits_presentation

## 🎯 Purpose & Scope
This directory contains all materials, assets, web presentation code, and automated build pipelines for **Presentation 2: Stakeholder Benefits Presentation** (15 slides) and the comprehensive **Stakeholder Value Matrix Whitepaper**.

---

## 📁 Subdirectory Layout
- **`docs/`**: Master analytical Whitepaper (`turbase_stakeholders_value_matrix.md`), executive PDF Whitepaper, narration script, visual plan, and Notes Handout PDF.
- **`web_deck/`**: High-contrast, mobile-first billboard typography web presentation (`index.html`, `stakeholders.css`, `stakeholders.js`).
- **`audio/`**: Pre-synthesized MP3 audio narration files (`slide_01.mp3` .. `slide_15.mp3`).
- **`slides_png/`**: 1920x1080 PNG slide images rendered with billboard-scale text for small-screen readability.
- **`scripts/`**: CLI build scripts for audio generation, slide capture, PDF Whitepaper rendering, Notes Handout creation, and video builds.
- **`temp_video/`**: Intermediate FFmpeg segment renders (gitignored).
- **`video_exports/`**: Final compiled MP4 video outputs (gitignored).

---

## 🚀 Quick Execution Commands (from `scripts/`)
```bash
# Capture 1920x1080 slide screenshots
node scripts/capture_stakeholders_slides.js

# Generate executive Stakeholders Value Matrix PDF Whitepaper (A4)
node scripts/generate_stakeholders_matrix_pdf.js

# Generate speaker notes Handout PDF (A4)
node scripts/generate_stakeholders_handout_pdf.js

# Build video profiles (10mb, email, master, all)
node scripts/build_stakeholders_video.js all
```
