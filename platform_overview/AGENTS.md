# AGENTS.md — platform_overview

## 🎯 Purpose & Scope
This directory hosts the foundational **3-part General Explainer Mini-Series** for the **«Турбаза»** platform.

---

## 🧭 Directory Structure
```
platform_overview/
├── turbase_platform_overview_master_plan.md          # Series Master Architecture Plan
├── AGENTS.md                                         # Directory Rules & Specs
├── 01_paradigm_shift_presentation/                   # Part 1: Manifest & Sovereign Repositories (Gold/Cyan)
├── 02_architecture_principles_presentation/          # Part 2: Anatomy, Foreign Keys & App Cooperation (Cyan/Emerald)
└── 03_sovereign_economy_presentation/                # Part 3: Sovereign Economy & Decentralized AI (Teal/Gold)
```

---

## 🎨 Visual Identity Standard
- Uses the shared template in `shared_templates/platform_overview_deck/`.
- Theme: **«Суверенный Горизонт» (Sovereign Horizon Explainer)**.
- Deep Slate background (`#0a0f1d`), series top header `🏔️ ПЛАТФОРМА ТУРБАЗА | ЭКСПЛЕЙНЕР`.
- Glassmorphism card surfaces, glowing accents, billboard typography ($\ge 50$px titles, $\ge 24$px body).

---

## ⏱️ Strict Timing & Format Guidelines
1. **Slide Count:** Exactly **12 slides** per presentation.
2. **Time Limit:** **9:00 – 10:00 minutes** (target speech pace ~40–45s/slide + pauses).
3. **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`, voice `ru-RU-DmitryNeural`, speed `-9%`, pauses `0.9s` / `1.2s`).
4. **Deliverables per Track:**
   - Interactive Web Deck (`web_deck/index.html`)
   - Notes Handout PDF (`docs/turbase_platform_XX_notes.pdf`)
   - 16:9 Landscape Slide Deck PDF (`docs/turbase_platform_XX_slides.pdf`)
   - Explainer Whitepaper PDF (`docs/turbase_platform_XX_whitepaper.pdf`)
   - 10MB Video (`video_exports/turbase_platform_XX_10mb.mp4`)
