# AGENTS.md — 02_stakeholders_benefits_presentation/scripts

## 🎯 Purpose & Scope
Houses the automated CLI tools for building all assets and deliverables for the Stakeholder Benefits Presentation.

---

## 📜 Script Manifest
1. **`generate_stakeholders_audio.js`**: Parses `../docs/turbase_stakeholders_presentation_narration.md` and generates MP3 tracks into `../audio/`.
2. **`capture_stakeholders_slides.js`**: Renders `../web_deck/index.html` via Playwright and captures 1920x1080 PNG images into `../slides_png/`.
3. **`generate_stakeholders_matrix_pdf.js`**: Converts `../docs/turbase_stakeholders_value_matrix.md` to an executive A4 PDF Whitepaper (`../docs/turbase_stakeholders_value_matrix.pdf`) via Chrome Headless.
4. **`generate_stakeholders_handout_pdf.js`**: Generates a 15-page Notes PDF Handout (`../docs/turbase_stakeholders_presentation_notes.pdf`) with slide previews and speaker notes.
5. **`build_stakeholders_video.js`**: Deterministic multi-profile video compiler using FFmpeg with strict slide pause rules (2s intro lead, 4s closing slide pause + 1s coming slide lead = 5s speech pause, 4s outro). Outputs MP4s into `../video_exports/`.

---

## 🚀 Execution Guide
```bash
# Rebuild all assets and documents:
node generate_stakeholders_audio.js
node capture_stakeholders_slides.js
node generate_stakeholders_matrix_pdf.js
node generate_stakeholders_handout_pdf.js

# Build all 3 video profiles (10mb, email, master):
node build_stakeholders_video.js all
```
