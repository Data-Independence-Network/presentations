# AGENTS.md — 04_advertisers_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 04: Турбаза для Рекламодателей и Брендов: 100% релевантный On-Device таргетинг, рост конверсий в 3–4 раза и честная атрибуция** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** On-Device таргетинг (алгоритм идет к данным на устройство, а не данные в облако), абсолютная защита от фрода и скликивания, рост конверсий, прозрачная атрибуция без слежки.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md)), [`turbase_detailed_impact_presentations_master_plan.md`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/turbase_detailed_impact_presentations_master_plan.md), and [`04_ecosystem_impact_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md).
- **Target Audience:** Директора по маркетингу (CMO), бренд-менеджеры, медиапланеры, performance-агентства.
- **Narrative Style:** Инновационный, доказательный, ориентированный на конверсии тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix detailed_overall_impact_presentations run rebuild-04
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix detailed_overall_impact_presentations run regen-04
node regenerate.js
```
