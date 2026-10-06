# AGENTS.md — shared_templates/deck_core

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Stores the **Universal Presentation Core Engine Styles** shared across all presentation players in the workspace.

---

## 🧭 File Structure
```
shared_templates/deck_core/
├── css/
│   └── deck_core.css          # Universal player reset, 1920x1080 viewport frame, top header bar, modal overlay, notes drawer
├── js/
│   └── deck_core_engine.js    # Core player logic (navigation, audio sync, events)
└── AGENTS.md                  # Scope & separation documentation
```

---

## 🛡️ Style Separation Principle
`deck_core.css` strictly provides **layout framing and chrome controls** (header, footer, modal overlay, drawer, viewport wrapper). It **must NEVER contain track-specific typography, content-card dimensions, or domain-specific component overrides**. All slide-specific content styling is delegated to the respective track's isolated stylesheets.
