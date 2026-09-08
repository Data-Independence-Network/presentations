# AGENTS.md — 03_app_framework_and_sdk

## 🎯 Purpose & Scope
Contains the presentation deck, interactive slide player, handout PDF, and build pipeline for **Presentation 03: Каркас приложений (Framework) и инструментарий разработчика** (13 high-density engineering slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** Принцип «Read-Anywhere, Write-Self», песочница схем, кросс-схемный SQL JOIN, API-оболочки, инъекция патчей и SDK Турбазы (DI, ORM, Decorator, API packaging).
- **Source of Intent:** Author notes (`shared_docs/comments/2026/09-07_01_Architecture_overview.html`), `Технический документ платформы Турбаза.md`, and `turbase_architecture_presentations_master_plan.md`.
- **Target Audience:** CTOs, Chief Architects, Staff Systems Engineers.
- **Narrative Style:** Academic, authoritative system architect tone without marketing hyperbole (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 13-slide master source and narration script.
- **`rebuild.js`**: Offline build runner using committed assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard output directories (`artifacts/audio/`, `artifacts/slides_png/`, `outputs/web_deck/`, `outputs/pdf/`, `outputs/video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild of web deck and visuals:
npm run rebuild-arch-03
node rebuild.js

# Full incremental regeneration with Neural TTS:
npm run regen-arch-03
node regenerate.js
```
