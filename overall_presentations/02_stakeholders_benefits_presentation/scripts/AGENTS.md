# AGENTS.md — 02_stakeholders_benefits_presentation/scripts

## 🎯 Purpose & Scope
Houses the automated CLI tools for building all assets and deliverables for the Stakeholder Benefits Presentation.

---

## 📜 Script Manifest
1. **`generate_stakeholders_matrix_pdf.js`**: Converts `../docs/turbase_stakeholders_value_matrix.md` to an executive A4 PDF Whitepaper (`../docs/turbase_stakeholders_value_matrix.pdf`) reading metadata dynamically from frontmatter.
2. **`generate_stakeholders_handout_pdf.js`**: Generates a 15-page Notes PDF Handout (`../docs/02_stakeholders_benefits_notes.pdf`) with slide previews and speaker notes from `presentation_deck.md`.
3. **`capture_stakeholders_slides.js`**: Renders `../web_deck/index.html` via Playwright and captures 1920x1080 PNG images into `../slides_png/`.
4. **`generate_stakeholders_audio.js`**: Synthesizes MP3 tracks into `../audio/` by parsing `../docs/presentation_deck.md` (validates `text_to_speech_mcp_Open_API_key.txt`).
5. **`build_stakeholders_video.js`**: Deterministic multi-profile video compiler using FFmpeg with strict slide pause rules (2s intro lead, 4s closing slide pause + 1s coming slide lead = 5s speech pause, 4s outro). Outputs MP4s into `../video_exports/`.

---

## 🚀 Execution Guide
```bash
# Recommended incremental rebuild via NPM:
npm run regen-overall-stakeholder

# Build Stakeholders Value Matrix PDF:
npm run regen-overall-stakeholder-doc

# Generate Handout Notes PDF:
NODE_PATH=$(npm root -g) node generate_stakeholders_handout_pdf.js
```
