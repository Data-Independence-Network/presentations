# AGENTS.md — 07_cryptography_and_api_economy

## 🎯 Purpose & Scope
Contains the presentation deck, interactive slide player, handout PDF, and build pipeline for **Presentation 07: Криптографический контур и экономика совместного использования API** (13 high-density engineering slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Focus:** Модель Keyring, ГОСТ (Кузнечик, Стрибог, 34.10), PQC, 152-ФЗ Zero-PII, ZK-доказательства, Execution Trace, теория игр консенсуса (1/N, Proof of Burn), Цифровой рубль.
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
npm run rebuild-arch-07
node rebuild.js

# Full incremental regeneration with Neural TTS:
npm run regen-arch-07
node regenerate.js
```
