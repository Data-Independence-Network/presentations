# AGENTS.md — 02_architecture_principles_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 02: Анатомия и Архитектура: Хранилища, внешние связи, Общественные Оболочки API и микоризный Интернет данных** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Четыре ранга узлов (Лист -> Ветка -> Родительская Ветвь -> Ствол), автономные виртуальные хранилища, связи через внешние ключи, Общественные Оболочки API, Zero-PII и децентрализованная синхронизация.
- **Source of Intent:** Author notes ([`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md)), [`turbase_platform_overview_master_plan.md`](file:///Users/parents/Documents/presentations/platform_overview/turbase_platform_overview_master_plan.md), and [`01_platform_overview_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.md).
- **Target Audience:** Системные архитекторы, технические руководители, инженеры распределенных систем.
- **Narrative Style:** Инженерно-архитектурный, доказательный, системный тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix platform_overview run rebuild-02
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix platform_overview run regen-02
node regenerate.js
```
