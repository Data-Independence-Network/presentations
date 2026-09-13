# AGENTS.md — 01_paradigm_shift_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 01: Манифест и Смена парадигмы: От платформенного монополизма к прямому владению собственной информацией** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Кризис облачных мега-ЦОД и монополий, барьеры 30%-го налога App Store, уязвимость баз-мишеней (Honeypots), переход к суверенному Edge Computing и прямому владению данными.
- **Source of Intent:** Author notes ([`08-25_01_History_of_technology.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-25_01_History_of_technology.md), [`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md)), [`turbase_platform_overview_master_plan.md`](file:///Users/parents/Documents/presentations/platform_overview/turbase_platform_overview_master_plan.md), and [`01_platform_overview_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.md).
- **Target Audience:** Государственные лидеры, ИТ-директора, предприниматели, широкая аудитория.
- **Narrative Style:** Вдохновляющий, авторитетный манифест с четким публицистическим и доказательным тоном (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix platform_overview run rebuild-01
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix platform_overview run regen-01
node regenerate.js
```
