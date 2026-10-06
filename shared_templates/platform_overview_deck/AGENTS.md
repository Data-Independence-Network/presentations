# AGENTS.md — shared_templates/platform_overview_deck

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
This directory hosts the specialized template and design system for the **3-Part General Explainer Series** (`platform_overview/`).

---

## 🎨 Visual Identity Standard
- **Theme:** «Индустриальный Горизонт» (Industrial Horizon Explainer).
- **Background:** Deep Slate `#0a0f1d` with subtle radial horizon glows.
- **Series Marker:** Top glowing badge `🏔️ ПЛАТФОРМА ТУРБАЗА | ЭКСПЛЕЙНЕР`.
- **Card Surfaces:** Glassmorphism (`rgba(20, 31, 60, 0.65)` with backdrop blur and neon contours).
- **Billboard Scale:** Slide titles $\ge 50$px, body copy $\ge 24$px, cards $\ge 28$px, metrics $\ge 54$px.
- **Slide Count:** Strict 12 slides per presentation.
- **Target Timing:** 9:00 – 10:00 minutes.
