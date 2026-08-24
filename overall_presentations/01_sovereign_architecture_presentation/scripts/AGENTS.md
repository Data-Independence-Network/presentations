# AGENTS.md — 01_sovereign_architecture_presentation/scripts

## 🎯 Purpose & Scope
Contains automation tools for the Sovereign Architecture Presentation pipeline:

---

## 📜 Script Manifest
1. **`generate_slide_narration_audio.js`**: Synthesizes MP3 files into `../audio/` by parsing `../docs/turbase_presentation_narration.md`.
2. **`capture_slides.js`**: Renders and saves 1920x1080 PNG screenshots into `../slides_png/`.
3. **`generate_handout_pdf.js`**: Builds executive A4 Notes Handout PDF (`../docs/turbase_presentation_notes.pdf`).
4. **`build_presentation_video.js`**: Multi-profile FFmpeg video builder (`10mb`, `email`, `master`, or `all`), outputting MP4 files into `../video_exports/`.

---

## 🚀 Execution Guide
```bash
# Full pipeline rebuild:
node generate_slide_narration_audio.js all
node capture_slides.js
node generate_handout_pdf.js
node build_presentation_video.js all
```
