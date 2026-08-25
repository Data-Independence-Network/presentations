# AGENTS.md — Global Media & Pipeline Scripts

## 🎯 Purpose & Scope
This directory hosts the shared core engine and top-level automation CLI scripts for all presentation tracks across the repository (`01_sovereign_architecture_presentation`, `02_stakeholders_benefits_presentation`, and all 10 tracks under `detailed_overall_impact_presentations/`).

---

## 🧭 Directory Layout
```
scripts/
├── core/
│   ├── incremental_engine.js     # Smart SHA-256 + Git commit checkpoint diffing engine
│   ├── deck_builder.js           # Markdown parser & Web Deck HTML compiler (SSoT)
│   ├── utils.js                  # Phonetic substitutions, duration probing, silence clips
│   ├── tts_generator.js          # Edge Neural TTS synthesis & slide audio concatenation (with key validation)
│   ├── slide_capture.js          # Playwright 1920x1080 slide screenshot capturer
│   ├── handout_pdf_builder.js    # Executive A4 Notes PDF Handout builder (Slide top + Narration bottom)
│   ├── slides_pdf_builder.js     # Pure 16:9 Landscape Slide Deck PDF builder
│   ├── whitepaper_pdf_builder.js # Executive Analytical Whitepaper / Value Matrix PDF builder (Mermaid, tables)
│   └── video_builder.js          # Multi-profile MP4 builder (10mb, email, master)
│
├── rebuild.js                    # Universal CLI runner for offline presentation rebuilding (uses committed audio)
├── regenerate.js                 # Universal CLI runner for incremental presentation regeneration (with TTS)
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
# Offline Rebuild (uses committed audio, no API key needed):
npm run rebuild-overall
npm run rebuild-overall-architecture
npm run rebuild-overall-stakeholder
npm run rebuild-overall-stakeholder-doc
npm run rebuild-overall-architecture-doc
npm run rebuild-all

# Incremental regeneration with Neural TTS (requires API key):
npm run regen-overall
npm run regen-overall-architecture
npm run regen-overall-stakeholder
npm run regen-overall-stakeholder-doc
npm run regen-overall-architecture-doc
npm run regenerate-all

# Direct CLI incremental regeneration:
node scripts/regenerate.js overall_presentations/01_sovereign_architecture_presentation
node scripts/regenerate.js all --full-regeneration

# Generate audio for a presentation (requires text_to_speech_mcp_Open_API_key.txt):
NODE_PATH=$(npm root -g) node scripts/generate_audio.js overall_presentations/02_stakeholders_benefits_presentation

# Build PDF notes handout (A4 with speaker notes reading directly from deck.md):
NODE_PATH=$(npm root -g) node scripts/build_handout_pdf.js overall_presentations/01_sovereign_architecture_presentation

# Build executive whitepaper / value matrix PDF (with Mermaid diagrams):
NODE_PATH=$(npm root -g) node scripts/build_whitepaper_pdf.js overall_presentations/02_stakeholders_benefits_presentation/docs/turbase_stakeholders_value_matrix.md
```
