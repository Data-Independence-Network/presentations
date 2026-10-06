# AGENTS.md — 03_delovoy_app_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 03: «Деловой»: исполнять и связывать** (15 billboard slides).
- **Книга-источник:** [Белая книга № 10 «Деловой: исполнять и связывать»](../../shared_docs/whitepapers/10_gogetter_whitepaper.md)
- **Кто что делает:** Автор концепции и системный архитектор — Артём Владимирович Шамсутдинов. Планирование — модель Claude Sonnet 5.5 («Соната 5.5»). Проработка слайдов и дикторского текста — модель Gemini 3.8 Flash.
- **Статус:** финальная версия концепции (звук не синтезирован), версия 1.0 (2026).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в `LABELS.md` служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте).
- **Focus:** Одно Дело — одно хранилище на Листе, контракт второго уровня (L2 на устройствах) и контракт первого уровня (L1 в Банке России), независимость социального и экономического рейтингов, мандатный шлюз входящих поручений, префиксные теги и внешние метки, личный слой (матрица приоритетов, экспоненциальное угасание, «Случайный шаг»).
- **Target Audience:** Частные пользователи, семьи, специалисты, самозанятые мастера, артели, руководители проектов.
- **Narrative Style:** Практичный, дружелюбный, уважительный тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz, объем 998 слов).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script.
- **`docs/presentation_outline.md`**: Structural slide outline with timings and passports.
- **`docs/deck.css`**: Isolated, autonomous stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild:
npm --prefix applications_presentations run rebuild-03
node rebuild.js

# Full regeneration with Neural TTS (requires API key):
npm --prefix applications_presentations run regen-03
node regenerate.js

# Automated compliance & zero-overflow check:
node scripts/check_decks.js applications_presentations/03_delovoy_app_presentation
```
