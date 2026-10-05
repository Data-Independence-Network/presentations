# AGENTS.md — 01_kubgolos_app_presentation

## 🎯 Purpose & Scope
Presentation 01 of the 5-part Flagship Applications Suite: **«КубГолос»: измерять и складывать** (15 billboard slides).
- **Associated Whitepaper:** [Белая книга № 08 «КубГолос: форма оценки, счётчики и сложение вверх по дереву»](../../shared_docs/whitepapers/08_votecube_whitepaper.md)
- **Who does what:** Author & system architect — Artem V. Shamsutdinov. Planning — Claude Sonnet 5.5. Slide & narration elaboration — Gemini 3.8 Flash. Version 1.0 (2026).

---

## 🧭 Architectural Focus & Key Concepts
- **3 Core Contributions:**
  1. Multidimensional evaluation form with 100 basis points budget per question;
  2. In-memory streaming counters on Branches with compact epoch blocks;
  3. Upward tree summation of sums and counts instead of averaging averages.
- **Strict Invariants:**
  - Forbidden `%...` labels in slides, notes, or narration (Rule 9).
  - No collective corporate «мы/наш» (Rule 12).
  - No source code, DDL, or class names on slides (Rule 13).
  - Respectful tone, no derogatory words (Rule 14).
  - Clean Russian speech, no Anglicisms like "VoteCube", "SQLite", etc. (Rule 15).
  - Strict zero overflow (`scrollHeight <= clientHeight`) at 1920x1080 verified via `scripts/check_decks.js`.
- **Target Audience:** Citizens, sociologists, municipal services, housing cooperatives, systems engineers.
- **Narrative Style:** Constructive, institutional, respectful (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script (1002 words).
- **`docs/presentation_outline.md`**: Structural slide outline with timings and word count table.
- **`docs/deck.css`**: Isolated, autonomous stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build & Verification Commands
```bash
# Automated rule and zero-overflow verification:
npm --prefix applications_presentations run check-01
node scripts/check_decks.js applications_presentations/01_kubgolos_app_presentation

# Web deck compilation (offline, no TTS):
node scripts/build_deck_html.js applications_presentations/01_kubgolos_app_presentation
```
