# AGENTS.md — shared_templates/overview_presentation_deck

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Stores the shared design system, billboard typography rules, frame layout CSS, and interactive navigation/audio synchronization engine for all **Overview Presentations** (`overall_presentations/`).

---

## 🧭 Directory Layout
```
shared_templates/overview_presentation_deck/
├── css/
│   ├── overview_deck_base.css        # Base theme tokens, viewport framing, header/footer, reset
│   └── overview_deck_components.css  # Billboard typography, metric cards, badges, 3-col layouts, pros/cons
└── js/
    └── overview_deck_engine.js       # Universal slide navigation, keyboard/touch sync, and audio controller
```

---

## 🎨 Visual Identity Standard for Overview Presentations
- **Base Background:** Deep Dark Sovereign (`#03060f` with radial cyber-blue, gold, and emerald ambient lights).
- **Typography Scale:** Billboard scale (Titles $\ge 50$px, Body copy $\ge 24$px, Metrics $\ge 56$px).
- **Aspect Ratio:** Strict 16:9 native canvas (1920x1080).
- **Accent Scheme:** Gold (`#facc15`), Emerald (`#10b981`), Cyber Blue (`#0284c7`), Crimson (`#ef4444`).
- **Decoupled Architecture:** Custom master decks (`01_sovereign_architecture_presentation`, `02_stakeholders_benefits_presentation`) maintain their own isolated stylesheets in `docs/` (`architecture.css` and `stakeholders.css`) to prevent cross-contamination.
