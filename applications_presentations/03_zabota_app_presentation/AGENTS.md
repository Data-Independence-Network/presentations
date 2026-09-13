# AGENTS.md — 03_zabota_app_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 03: «Забота»: Социальная сеть взаимной поддержки граждан и открытый репутационный стандарт** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** Добрососедство, очные QR-поручительства, открытая схема репутации (Web-of-Trust), отсутствие рекламы и трекеров, взаимопомощь на уровне подъезда, двора и района.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md)), [`turbase_applications_master_plan.md`](file:///Users/parents/Documents/presentations/applications_presentations/turbase_applications_master_plan.md), and [`02_applications_suite_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/02_applications_suite_whitepaper.md).
- **Target Audience:** Жители домов, волонтерские организации, благотворительные фонды, соседские центры.
- **Narrative Style:** Теплый, созидательный, социально ориентированный тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script.
- **`docs/presentation_outline.md`**: Structural slide outline with timings.
- **`docs/deck.css`**: Isolated, autonomous stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild:
npm --prefix applications_presentations run rebuild-03
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix applications_presentations run regen-03
node regenerate.js
```
