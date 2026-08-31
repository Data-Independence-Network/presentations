# AGENTS.md — Scripts for 01_paradigm_shift_presentation

## 🎯 Purpose & Scope
This directory contains dedicated CLI scripts for building, generating, and rendering all media assets for **Часть 1: Манифест и Смена парадигмы** (`platform_overview/01_paradigm_shift_presentation/`).

## 📜 Script Index
- **`capture_slides.js`**: Captures 1920x1080 slide screenshots from `generated/outputs/web_deck/index.html` into `generated/artifacts/slides_png/`.
- **`generate_slide_narration_audio.js`**: Synthesizes neural audio (`ru-RU-DmitryNeural`, `-9%` rate, `-5Hz` pitch) for all 12 slides into `generated/artifacts/audio/`.
- **`generate_handout_pdf.js`**: Generates executive A4 Notes Handout PDF (`generated/outputs/pdf/01_paradigm_shift_notes.pdf`).
- **`generate_slides_pdf.js`**: Generates 16:9 Landscape slide deck PDF (`generated/outputs/pdf/01_paradigm_shift_slides.pdf`).
- **`generate_manifesto_doc_pdf.js`**: Generates executive Manifesto & Outline PDF (`generated/outputs/pdf/01_paradigm_shift_manifesto.pdf`).
- **`build_presentation_video.js`**: Compiles multi-profile MP4 videos (`1080p_master`, `10mb_telegram`, `vertical_shorts`) into `generated/outputs/video/`.

## ⚙️ Conventions & Asset Layout
- All intermediate assets are placed in `generated/artifacts/` (`slides_png/`, `audio/`, `temp_video/`, `temp_audio_segments/`).
- All deliverables are placed in `generated/outputs/` (`web_deck/`, `pdf/`, `video/`).
