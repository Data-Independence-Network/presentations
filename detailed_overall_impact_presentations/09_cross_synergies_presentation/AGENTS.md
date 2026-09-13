# AGENTS.md — 09_cross_synergies_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 09: Межотраслевая Синергия и Сетевые Эффекты: Игра с положительной суммой и маховик национальной цифровой экономики** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** Теоретико-игровая модель игры с положительной суммой (Positive-Sum Game), сетевые мультипликаторы между гражданами, бизнесом, банками и государством, самоподдерживающийся маховик роста экосистемы.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md)), [`turbase_detailed_impact_presentations_master_plan.md`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/turbase_detailed_impact_presentations_master_plan.md), and [`04_ecosystem_impact_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md).
- **Target Audience:** Стратеги, макроэкономисты, венчурные инвесторы, руководители институтов развития.
- **Narrative Style:** Масштабный, фундаментальный, системно-экономический тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix detailed_overall_impact_presentations run rebuild-09
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix detailed_overall_impact_presentations run regen-09
node regenerate.js
```
