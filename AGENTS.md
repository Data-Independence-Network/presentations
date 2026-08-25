# AGENTS.md — Root Workspace Context

## 🎯 Overview & Purpose
This repository hosts the complete presentation suite, video production pipelines, interactive slide decks, and executive whitepaper materials for **«Турбаза»** (Turbase) — a sovereign, three-tier distributed edge computing platform designed for high security, data sovereignty, and massive infrastructure TCO reduction.

The workspace is structured into high-level overview presentations, specialized deep-dive participant presentations, shared templates, and global tooling:
- **`overall_presentations/`**: High-level master overview presentations covering the complete architectural, economic, and stakeholder landscape:
  - `01_sovereign_architecture_presentation/`: Core technical architecture, 3-tier topology (Leaf $\to$ Branch $\to$ Trunk), 152-ФЗ Zero-PII compliance, and game-theoretic API economy.
  - `02_stakeholders_benefits_presentation/`: 6-stakeholder value matrix (Citizens, SME/Business, AdTech, Fintech, Regulators, Municipalities), PROs/CONs/Mitigations, and billboard-scale slides.
- **`detailed_overall_impact_presentations/`**: Complete suite of 10 specialized deep-dive presentations for individual ecosystem participants, cross-sector synergies, and phased legacy migration roadmap.
- **`shared_templates/`**: Shared slide deck templates and design systems (`overview_presentation_deck/` for dark sovereign overview decks, and upcoming specialized styling for deep-dive decks).
- **`scripts/`**: Global automation and media pipelines (`core/` engines for TTS, slide capture, handout PDF, slide deck PDF, whitepaper PDF, and video generation).
- **`shared_docs/`**: Master technical documentation, whitepapers, and architectural specifications.
- **`voice_samples/`**: Audio samples and evaluation scripts for neural voice synthesis.

---

## 🧭 Repository Structure & Key Conventions
```
turbase_benefits_presentation/
├── overall_presentations/                      # Master Overview Presentations Track
│   ├── 01_sovereign_architecture_presentation/ # Architecture & Sovereign Edge Compute
│   └── 02_stakeholders_benefits_presentation/  # 6-Stakeholder Value Matrix & Economics
├── detailed_overall_impact_presentations/      # Specialized 10-Presentation Series
│   ├── turbase_detailed_impact_presentations_master_plan.md
│   └── 01_citizens_presentation/ ... 10_migration_roadmap_presentation/
├── shared_templates/                           # Reusable UI / Deck Design Systems & Engines
│   └── overview_presentation_deck/             # Dark Sovereign billboard presentation engine
├── package.json                                # NPM scripts for presentation & doc regeneration
├── scripts/                                    # Global build automation CLI & core engines
│   ├── core/                                   # Incremental engine, TTS, Playwright, PDF, FFmpeg builders
│   └── regenerate.js, build_all.js, etc.       # Unified CLI runners
├── shared_docs/                                # Master technical whitepapers & specifications
├── text_to_speech_mcp_Open_API_key.txt         # Required TTS API key file (gitignored)
├── start_presentation.sh                       # HTTP server launcher on port 8080
└── .gitignore                                  # Video exports (*.mp4), cache, & temp dirs excluded
```

---

## 🛠️ Global Tooling & Execution Environment
- **Runtime:** Node.js (v24.x)
- **Headless Browser:** Chrome Headless (`google-chrome --headless=new`), Playwright
- **Media Processing:** FFmpeg & FFprobe (must be installed in PATH)
- **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`) with voice `ru-RU-DmitryNeural` (-9% rate, -5Hz pitch)
- **Incremental Engine:** SHA-256 content hashing + Git checkpoint caching (`generated/.build_cache.json`) via `npm run regenerate-all` or `npm run regen-*`

---

## 📋 Agent Guidelines & Rules
1. **NPM Task Execution**: Always prefer `npm run regen-overall` or `npm run regen-*` for rebuilding presentations and documents.
2. **Standard Generated Layout**: All generated assets must reside strictly under `<presentation_dir>/generated/`:
   - `generated/artifacts/`: intermediate build assets (`audio/`, `slides_png/`, temporary segment renders).
   - `generated/outputs/`: final distributable deliverables (`web_deck/`, `pdf/`, `video/`).
3. **TTS API Key Validation**: Audio synthesis strictly requires `text_to_speech_mcp_Open_API_key.txt` in repository root. If missing or empty, scripts immediately halt execution with a fatal error.
4. **Never commit binary videos (`*.mp4`), cache files (`.build_cache.json`), or temporary segment folders**: All video builds are 100% deterministic and generated via scripts into `generated/outputs/video/`.
5. **Preserve Relative Path Conventions**: All scripts within presentation subdirectories use relative traversal (`path.join(__dirname, '..', ...)`).
6. **Typography & Mobile Readability Priority**: Presentation slides must adhere to the high-contrast billboard typography scale (Slide titles $\ge 50$px, body copy $\ge 24$px, cards $\ge 28$px) for readability on small mobile screens.
7. **Git Hygiene**: When adding or moving files, ensure related assets and documentation are committed with clean, categorized messages.
