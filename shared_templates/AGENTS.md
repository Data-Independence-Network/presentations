# AGENTS.md — shared_templates

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
This directory serves as the archetype design library and scaffolding boilerplate for presentation decks and styling systems in the **«Турбаза»** presentation suite.

---

## 🔒 Critical Rules & Invariants
1. **No Shared Runtime Styles:** Presentations must never import or link directly to stylesheets in `shared_templates/` at runtime.
2. **Autonomous Presentation Principle:** Every presentation owns its own isolated `docs/deck.css` copied during initialization.
3. **Zero Cross-Contamination:** Edits to templates must never directly alter, overflow, or regress any compiled presentation.
4. **Billboard Typography Standard:** Canvas 1920x1080, slide titles $\ge 50, body $\ge 24, cards $\ge 28, and strictly Zero-Overflow (`scrollHeight <= clientHeight`).
5. **Semantic Labels Invariant:** Метки `%...` из базы заметок запрещено использовать в шаблонах и стилях презентаций.
