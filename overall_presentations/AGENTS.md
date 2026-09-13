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

## 🎨 Visual Identity & Isolated Stylesheets
- Overview presentations use dedicated, track-isolated stylesheets stored with source files:
  - `01_sovereign_architecture_presentation`: [`docs/architecture.css`](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/docs/architecture.css) (Base `html { font-size: 22px; }` for 100% 1080p fit across all 15 slides).
  - `02_stakeholders_benefits_presentation`: [`docs/stakeholders.css`](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/docs/stakeholders.css).
- Shared player navigation engine: `shared_templates/overview_presentation_deck/js/overview_deck_engine.js`.
- Ultra-large billboard typography scale ($\ge 50$px slide titles, $\ge 24$px body copy, $\ge 56$px KPI metrics).
- High contrast, full-bleed 16:9 native canvas (1920x1080).
- **Strict Decoupling:** Styles in `architecture.css` and `stakeholders.css` are completely independent of `platform_overview` or `detailed_overall_impact` templates.

---

## 📋 Architectural Standards & Conventions
1. **Author Notes as Source of Truth:** Core technical claims, Zero-PII mechanics, and economic models must strictly adhere to the developer notes in [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) (including [`2026/09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).

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
