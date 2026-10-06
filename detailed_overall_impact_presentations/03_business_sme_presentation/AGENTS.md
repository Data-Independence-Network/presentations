# AGENTS.md — 03_business_sme_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 03: Турбаза для Малого, Среднего и Крупного Бизнеса: Снижение TCO на 85%, локальный учет и прямая торговля без посредников** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Снижение серверных затрат (TCO) на 85%, работа без риска штрафов по 152-ФЗ, ликвидация монопольных поборов маркетплейсов (до 35%), прямые B2B/B2C смарт-контракты в Цифровом рубле.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), [`turbase_detailed_impact_presentations_master_plan.md`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/turbase_detailed_impact_presentations_master_plan.md), and [`04_ecosystem_impact_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md).
- **Target Audience:** Владельцы малого и среднего бизнеса, директора по цифровизации, финансовые директора.
- **Narrative Style:** Прагматичный, экономически обоснованный, ориентированный на ROI тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix detailed_overall_impact_presentations run rebuild-03
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix detailed_overall_impact_presentations run regen-03
node regenerate.js
```
