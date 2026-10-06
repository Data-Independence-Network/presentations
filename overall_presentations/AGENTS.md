# AGENTS.md — overall_presentations

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
This directory contains the high-level **Overview Presentations** covering the full architectural, economic, and cross-stakeholder fundamentals of the «Турбаза» platform.

---

## 🧭 Directory Layout
```
overall_presentations/
├── 01_sovereign_architecture_presentation/    # Master Presentation 1 (Core Technical & Sovereign Architecture)
└── 02_stakeholders_benefits_presentation/     # Master Presentation 2 (6-Stakeholder Value Matrix & Benefits)
```

---

## 🎨 Visual Identity & Isolated Stylesheets
- Overview presentations use dedicated, track-isolated stylesheets stored with source files:
  - `01_sovereign_architecture_presentation`: [`docs/architecture.css`](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/docs/architecture.css) (Base `html { font-size: 22px; }` for 100% 1080p fit across all 15 slides).
  - `02_stakeholders_benefits_presentation`: [`docs/stakeholders.css`](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/docs/stakeholders.css).
- Shared player navigation engine: `shared_templates/overview_presentation_deck/js/overview_deck_engine.js`.
- Ultra-large billboard typography scale ($\ge 50$px slide titles, $\ge 24$px body copy, $\ge 56$px KPI metrics).
- High contrast, full-bleed 16:9 native canvas (1920x1080).
- **Strict Decoupling:** Styles in `architecture.css` and `stakeholders.css` are completely independent of `platform_overview` or `detailed_overall_impact` templates.

---

## 📋 Architectural Standards & Conventions
1. **Author Notes as Source of Truth:** Core technical claims, Zero-PII mechanics, and economic models must strictly adhere to the developer notes in [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) (including [`2026/09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).

---

## 🚀 NPM Build & Regeneration Commands
```bash
# Offline Rebuild (uses committed audio, no API key needed):
npm run rebuild-overall                  # Rebuild both master presentations and analytical PDFs
npm run rebuild-overall-architecture     # Rebuild 01 Architecture presentation
npm run rebuild-overall-stakeholder      # Rebuild 02 Stakeholders presentation
npm run rebuild-overall-stakeholder-doc  # Rebuild 02 Stakeholders Value Matrix PDF
npm run rebuild-overall-architecture-doc # Rebuild 01 Architecture Visuals PDF

# Full Regeneration with TTS Audio Synthesis:
npm run regen-overall                  # Rebuild with fresh audio synthesis
npm run regen-overall-architecture     # Rebuild 01 with fresh audio synthesis
npm run regen-overall-stakeholder      # Rebuild 02 with fresh audio synthesis
```
---

## 🏷️ Семантические метки и авторская база знаний
Метки в [`shared_docs/comments/LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.

## 🤝 Вежливость и уважение к труду других
Всегда быть вежливым и уважать труд людей, которые уже создали существующие системы и документы: теперь понятно, что многое можно делать лучше, и они сами об этом думают. Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и ярлыки (например, «карательный», «антиутопия», «токсичный», «кабала», «тупик» об идеях и системах). Описывать особенности подходов нейтрально, подавать материал как свод идей, который может пригодиться в разных ситуациях и частях мира, хотя проектируется для России. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 14.

## 🇷🇺 Чистая русская речь
Писать чистой русской речью: вместо англицизмов и жаргона («кейс», «дедлайн», «фидбэк», «бэкенд», «стартап», «комплаенс» и подобных) использовать русские слова («случай», «срок», «обратная связь», «серверная часть», «молодое предприятие», «соблюдение требований закона»). Исключения: собственные имена и названия, идентификаторы, код, формулы, точные названия законов и цитаты, а также технические термины без устоявшегося русского эквивалента (с кратким пояснением при первом упоминании). Дикторский текст должен хорошо звучать вслух. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 15.
