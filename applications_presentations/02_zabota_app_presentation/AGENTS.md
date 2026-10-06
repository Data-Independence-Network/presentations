# AGENTS.md — 02_zabota_app_presentation

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 02: «Забота»: вкладывать и просматривать** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Вклады вместо потока сообщений, самозапечатывающиеся страницы, открытый социальный рейтинг по темам, язык доверия и затухание, четыре барьера круга самоусиления, разделение социального и экономического рейтингов.
- **Source of Intent:** Белая книга № 09 ([`shared_docs/whitepapers/09_sapoto_whitepaper.md`](../../shared_docs/whitepapers/09_sapoto_whitepaper.md)), [`applications_presentations/ПЛАН_ФИНАЛ_02_Забота.md`](../ПЛАН_ФИНАЛ_02_Забота.md), [`applications_presentations/ОБЩИЙ_ПЛАН_финальных_версий_презентаций_01-03.md`](../ОБЩИЙ_ПЛАН_финальных_версий_презентаций_01-03.md).
- **Target Audience:** Граждане, исследователи распределённых систем, организаторы соседских сообществ, разработчики прикладных сервисов.
- **Narrative Style:** Институциональный, созидательный тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).
- **Кто что делает:** Автор концепции и системный архитектор — А. В. Шамсутдинов. Математическая спецификация репутационной системы — Antigravity (Google DeepMind). Планирование — модель Claude Sonnet 5.5. Проработка слайдов и дикторского текста — модель Gemini 3.8 Flash.

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script.
- **`docs/presentation_outline.md`**: Structural slide outline with timings.
- **`docs/deck.css`**: Isolated, autonomous billboard stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild:
npm --prefix applications_presentations run rebuild-02
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix applications_presentations run regen-02
node regenerate.js
```
