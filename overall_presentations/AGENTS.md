# AGENTS.md — overall_presentations

## 🎯 Purpose & Scope
This directory contains the high-level **Overview Presentations** covering the full architectural, economic, and cross-stakeholder fundamentals of the «Турбаза» platform.

---

## 🧭 Directory Layout
```
overall_presentations/
├── 01_sovereign_architecture_presentation/    # Master Presentation 1 (Core Technical & Sovereign Architecture)
└── 02_stakeholders_benefits_presentation/     # Master Presentation 2 (6-Stakeholder Value Matrix & Benefits)
```

---

## 🎨 Visual Identity & Shared Assets
- Overview presentations follow the **Dark Executive Sovereign** theme defined in:
  `shared_templates/overview_presentation_deck/css/overview_deck_base.css`
  `shared_templates/overview_presentation_deck/css/overview_deck_components.css`
  `shared_templates/overview_presentation_deck/js/overview_deck_engine.js`
- Ultra-large billboard typography scale ($\ge 50$px slide titles, $\ge 24$px body copy, $\ge 56$px KPI metrics).
- High contrast, full-bleed 16:9 native canvas (1920x1080).

---

## 🚀 NPM Build & Regeneration Commands
```bash
# Offline Rebuild (uses committed audio, no API key needed):
npm run rebuild-overall                  # Rebuild both master presentations and analytical PDFs
npm run rebuild-overall-architecture     # Rebuild 01 Architecture presentation
npm run rebuild-overall-stakeholder      # Rebuild 02 Stakeholders presentation
npm run rebuild-overall-stakeholder-doc  # Rebuild 02 Stakeholders Value Matrix PDF
npm run rebuild-overall-architecture-doc # Rebuild 01 Architecture Visuals PDF

# Full Regeneration with TTS Audio Synthesis:
npm run regen-overall                  # Rebuild with fresh audio synthesis
npm run regen-overall-architecture     # Rebuild 01 with fresh audio synthesis
npm run regen-overall-stakeholder      # Rebuild 02 with fresh audio synthesis
```
