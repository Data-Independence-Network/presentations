# AGENTS.md — applications_presentations

## 🎯 Purpose & Scope
This directory hosts the presentation suite for the **5 Flagship Core Applications of the «Турбаза» Ecosystem**:
- **01. «Деловой»** (`01_delovoy_app_presentation/`): Personal, family, and SME task organizer based on the priority matrix and controlled serendipity.
- **02. «КубГолос»** (`02_kubgolos_app_presentation/`): Bottom-up peer micro-poll platform with versioned poll trees and 0% bot manipulation.
- **03. «Забота»** (`03_zabota_app_presentation/`): Mutual assistance social network, trusted stairwell groups, and open reputation schema libraries.
- **04. «УраТур»** (`04_uratur_app_presentation/`): Sovereign travel planner and guidebook synthesized from «Деловой», «КубГолос», and «Забота» running 100% offline.
- **05. «Локальный реестр МСП и ЖКХ»** (`05_local_services_presentation/`): Local walk-in services directory (2ms lookup), Digital Ruble escrow, and full 5-app ecosystem synergy.

Following this 5-presentation cycle, a specialized **7-presentation deep-dive cycle** will cover the complete technical architecture of Turbase.

---

## 🧭 Directory Structure
```
applications_presentations/
├── turbase_applications_master_plan.md          # Series Master Architecture Plan (5 Parts)
├── AGENTS.md                                   # Directory Rules & Specs
├── 01_delovoy_app_presentation/                 # App 1: Delovoy Organizer (Amber/Gold)
│   └── docs/presentation_outline.md
├── 02_kubgolos_app_presentation/                # App 2: KubGolos Micro-Polls (Neon Cyan)
│   └── docs/presentation_outline.md
├── 03_zabota_app_presentation/                  # App 3: Zabota Mutual Aid & Open Reputation (Emerald)
│   └── docs/presentation_outline.md
├── 04_uratur_app_presentation/                  # App 4: UraTur Sovereign Travel Guide (Purple/Amethyst)
│   └── docs/presentation_outline.md
└── 05_local_services_presentation/              # App 5: Local Services & Applied Synergy (Ruby/Coral)
    └── docs/presentation_outline.md
```

---

## 🎨 Visual Identity Standard
- Theme: **«Суверенный Горизонт» (Sovereign Horizon Explainer)**.
- Deep Slate background (`#0a0f1d`), series top header `🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНОЙ СУВЕРЕНИТЕТ`.
- Glassmorphism card surfaces, glowing accents, billboard typography ($\ge 50$px titles, $\ge 24$px body).

---

## ⏱️ Strict Timing & Format Guidelines
1. **Slide Count:** Exactly **12 slides** per presentation.
2. **Time Limit:** **9:00 – 10:00 minutes** (target speech pace ~40–45s/slide + pauses).
3. **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`, voice `ru-RU-DmitryNeural`, speed `-9%`, pauses `0.9s` / `1.2s`).
4. **Deliverables per Track:**
   - Interactive Web Deck (`web_deck/index.html`)
   - Notes Handout PDF (`docs/turbase_app_XX_notes.pdf`)
   - 16:9 Landscape Slide Deck PDF (`docs/turbase_app_XX_slides.pdf`)
   - Explainer Whitepaper PDF (`docs/turbase_app_XX_whitepaper.pdf`)
   - 10MB Video (`video_exports/turbase_app_XX_10mb.mp4`)
