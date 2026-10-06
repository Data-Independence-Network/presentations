# AGENTS.md — 01_sovereign_architecture_presentation/web_deck

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
Houses the browser-based interactive presentation player for the Sovereign Architecture Deck.

---

## 📄 Key Files
- **`index.html`**: Semantic HTML structure for the 15 presentation slides.
- **`architecture.css`**: Dark executive theme styles, layout grids, animations, and typography tokens.
- **`architecture.js`**: Slide state management, keyboard navigation (Left/Right/Space/Home/End), audio narration playback via `../audio/slide_XX.mp3`, modal controls, and thumbnail overview.

---

## 🛠️ Instructions for Agents
- Audio references resolve to `../audio/slide_${padded}.mp3`.
- The presentation is designed to be served locally via `start_presentation.sh` or captured in headless Chrome at 1920x1080 resolution.
