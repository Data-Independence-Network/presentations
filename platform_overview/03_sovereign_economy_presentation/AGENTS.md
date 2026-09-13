# AGENTS.md — 03_sovereign_economy_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 03: Справедливая экономика данных и ИИ: Экономика API (1/N), Цифровой рубль и Децентрализованный ИИ для общества** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Ликвидация 30%-го платформенного налога, модель микророялти 1/N по цепочке вызовов, интеграция смарт-контрактов Цифрового рубля ЦБ РФ, доверенные сети Web-of-Trust («Забота») и локальный Edge AI без утечек данных.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), [`turbase_platform_overview_master_plan.md`](file:///Users/parents/Documents/presentations/platform_overview/turbase_platform_overview_master_plan.md), and [`01_platform_overview_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.md).
- **Target Audience:** Экономисты, предприниматели, продуктовые лидеры, разработчики ИИ и финтех-команды.
- **Narrative Style:** Экономически аргументированный, прогрессивный и вдохновляющий тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix platform_overview run rebuild-03
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix platform_overview run regen-03
node regenerate.js
```
