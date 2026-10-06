# AGENTS.md — 02_stakeholders_benefits_presentation/web_deck

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../../../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../../../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../../../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Houses the browser-based interactive presentation player for the Stakeholder Benefits Deck.

---

## 🎨 Design & Typography Philosophy
This deck implements a **mobile-first billboard typography scale**:
- Slide Titles: `52-54px` (bold, high contrast)
- Subtitles: `28-30px`
- Card Headings: `28-32px`
- Body Text & Comparisons: `24-26px`
- Key Metric Badges: `50-54px`
- The visual hierarchy is optimized so that when exported as 1920x1080 PNG images, every text block remains clearly readable on a 5-6 inch smartphone screen without zooming.

---

## 📄 Key Files
- **`index.html`**: Semantic markup for the 15 stakeholder slides (split into two-column structured layouts with high-contrast badge metrics).
- **`stakeholders.css`**: Mobile-first stylesheet with HSL tokens, gold/blue sovereign gradients, and billboard typography.
- **`stakeholders.js`**: Slide state management, keyboard navigation, audio synchronization (`../audio/slide_XX.mp3`), auto-advance with 4s closing / 1s coming delays, and modal notes.
