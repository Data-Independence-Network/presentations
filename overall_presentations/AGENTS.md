# AGENTS.md — overall_presentations

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../sessions/2026/10-05_00_session_format_tempate.md)).

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
  - `01_sovereign_architecture_presentation`: [`docs/architecture.css`](./01_sovereign_architecture_presentation/docs/architecture.css) (Base `html { font-size: 22px; }` for 100% 1080p fit across all 15 slides).
  - `02_stakeholders_benefits_presentation`: [`docs/stakeholders.css`](./02_stakeholders_benefits_presentation/docs/stakeholders.css).
- Shared player navigation engine: `shared_templates/overview_presentation_deck/js/overview_deck_engine.js`.
- Ultra-large billboard typography scale ($\ge 50$px slide titles, $\ge 24$px body copy, $\ge 56$px KPI metrics).
- High contrast, full-bleed 16:9 native canvas (1920x1080).
- **Strict Decoupling:** Styles in `architecture.css` and `stakeholders.css` are completely independent of `platform_overview` or `detailed_overall_impact` templates.

---

## 📋 Architectural Standards & Conventions
1. **Author Notes as Source of Truth:** Core technical claims, Zero-PII mechanics, and economic models must strictly adhere to the developer notes in [`shared_docs/comments/`](../shared_docs/comments) (including [`2026/09-12_01_Smart_Contracts.md`](../shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](../shared_docs/Технический%20документ%20платформы%20Турбаза.md).

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
Метки в [`shared_docs/comments/LABELS.md`](../shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.

## 🤝 Вежливость и уважение к труду других
Всегда быть вежливым и уважать труд людей, которые уже создали существующие системы и документы: теперь понятно, что многое можно делать лучше, и они сами об этом думают. Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и ярлыки (например, «карательный», «антиутопия», «токсичный», «кабала», «тупик» об идеях и системах). Описывать особенности подходов нейтрально, подавать материал как свод идей, который может пригодиться в разных ситуациях и частях мира, хотя проектируется для России. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 14.

## 🇷🇺 Чистая русская речь
Писать чистой русской речью: вместо англицизмов и жаргона («кейс», «дедлайн», «фидбэк», «бэкенд», «стартап», «комплаенс» и подобных) использовать русские слова («случай», «срок», «обратная связь», «серверная часть», «молодое предприятие», «соблюдение требований закона»). Исключения: собственные имена и названия, идентификаторы, код, формулы, точные названия законов и цитаты, а также технические термины без устоявшегося русского эквивалента (с кратким пояснением при первом упоминании). Дикторский текст должен хорошо звучать вслух. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 15.
