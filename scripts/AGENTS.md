# AGENTS.md — Global Media & Pipeline Scripts

## 🎯 Purpose & Scope
This directory hosts the shared core engine and top-level automation CLI scripts for all presentation tracks across the repository (`01_sovereign_architecture_presentation`, `02_stakeholders_benefits_presentation`, and all 10 tracks under `detailed_overall_impact_presentations/`).

---

## 🧭 Directory Layout
```
scripts/
├── core/
│   ├── utils.js                  # Phonetic substitutions, duration probing, silence clips
│   ├── tts_generator.js          # Edge Neural TTS synthesis & slide audio concatenation
│   ├── slide_capture.js          # Playwright 1920x1080 slide screenshot capturer
│   ├── handout_pdf_builder.js    # Executive A4 Notes PDF Handout builder (Slide top + Narration bottom)
│   ├── slides_pdf_builder.js     # Pure 16:9 Landscape Slide Deck PDF builder
│   ├── whitepaper_pdf_builder.js # Executive Analytical Whitepaper / Value Matrix PDF builder (Mermaid, tables)
│   └── video_builder.js          # Multi-profile MP4 builder (10mb, email, master)
│
├── generate_audio.js             # CLI: Synthesize audio for any presentation directory
├── capture_slides.js             # CLI: Capture slides for any presentation directory
├── build_handout_pdf.js          # CLI: Build notes PDF for any presentation directory
├── build_slides_pdf.js           # CLI: Build 16:9 slide deck PDF for any presentation directory
├── build_whitepaper_pdf.js       # CLI: Build executive analytical Whitepaper PDF from Markdown
├── build_video.js                # CLI: Render videos for any presentation directory
└── build_all.js                  # CLI: Full end-to-end pipeline runner
```

---

## 🛠️ Usage Examples
```bash
# Generate audio for a presentation
NODE_PATH=$(npm root -g) node scripts/generate_audio.js 02_stakeholders_benefits_presentation

# Capture slides as 1920x1080 PNGs
NODE_PATH=$(npm root -g) node scripts/capture_slides.js detailed_overall_impact_presentations/01_citizens_presentation

# Build PDF notes handout (A4 with speaker notes)
NODE_PATH=$(npm root -g) node scripts/build_handout_pdf.js detailed_overall_impact_presentations/01_citizens_presentation

# Build 16:9 pure slide deck PDF
NODE_PATH=$(npm root -g) node scripts/build_slides_pdf.js detailed_overall_impact_presentations/01_citizens_presentation

# Build executive whitepaper / value matrix PDF (with Mermaid diagrams)
NODE_PATH=$(npm root -g) node scripts/build_whitepaper_pdf.js detailed_overall_impact_presentations/01_citizens_presentation/docs/turbase_citizens_value_matrix.md

# Build all video profiles (10mb, email, master)
node scripts/build_video.js detailed_overall_impact_presentations/01_citizens_presentation all

# Run full end-to-end pipeline
NODE_PATH=$(npm root -g) node scripts/build_all.js detailed_overall_impact_presentations/01_citizens_presentation
```
