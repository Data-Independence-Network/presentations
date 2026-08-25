# AGENTS.md — 01_sovereign_architecture_presentation/scripts

## 🎯 Purpose & Scope
Contains automation tools for the Sovereign Architecture Presentation pipeline:

---

## 📜 Script Manifest
1. **`generate_architecture_doc_pdf.js`**: Builds executive Architecture Visuals PDF (`../docs/turbase_presentation_visuals.pdf`) dynamically from frontmatter in `presentation_deck.md`.
2. **`generate_handout_pdf.js`**: Builds executive A4 Notes Handout PDF (`../docs/01_sovereign_architecture_notes.pdf`) dynamically from `presentation_deck.md`.
3. **`capture_slides.js`**: Renders and saves 1920x1080 PNG screenshots into `../slides_png/`.
4. **`generate_slide_narration_audio.js`**: Synthesizes MP3 files into `../audio/` by parsing `../docs/presentation_deck.md` (validates `text_to_speech_mcp_Open_API_key.txt`).
5. **`build_presentation_video.js`**: Multi-profile FFmpeg video builder (`10mb`, `email`, `master`, or `all`), outputting MP4 files into `../video_exports/`.

---

## 🚀 Execution Guide
```bash
# Recommended incremental rebuild via NPM:
npm run gen-overall-architecture

# Build Architecture Visuals PDF:
npm run gen-overall-architecture-doc

# Generate Handout Notes PDF:
NODE_PATH=$(npm root -g) node generate_handout_pdf.js
```
