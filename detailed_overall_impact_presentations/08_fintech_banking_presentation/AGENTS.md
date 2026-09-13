# AGENTS.md — 08_fintech_banking_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 08: Турбаза для Банков, Финтеха и Операторов Цифрового Рубля: On-Device скоринг, эскроу смарт-контракты и 0% утечек тайны** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** On-Device кредитный ZK-скоринг без передачи выписок, программируемый Цифровой рубль ЦБ РФ, детерминированные FSM смарт-аккредитивы и эскроу, верификация состояния кошелька (Wallet State), 0% утечек банковской тайны.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), [`turbase_detailed_impact_presentations_master_plan.md`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/turbase_detailed_impact_presentations_master_plan.md), and [`04_ecosystem_impact_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md).
- **Target Audience:** Руководители банков (CIO, CRO), финтех-предприниматели, разработчики платежных решений, регуляторы ЦБ РФ.
- **Narrative Style:** Финансово-точный, авторитетный, инновационный банковский тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix detailed_overall_impact_presentations run rebuild-08
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix detailed_overall_impact_presentations run regen-08
node regenerate.js
```
