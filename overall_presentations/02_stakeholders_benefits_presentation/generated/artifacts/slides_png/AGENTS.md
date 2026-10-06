# AGENTS.md — 02_stakeholders_benefits_presentation/slides_png

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно предложенному шаблону.

## 🎯 Purpose & Scope
Stores the 15 full HD (1920x1080) PNG slide captures (`slide_01.png` .. `slide_15.png`), engineered for small-screen readability and used as source frames for video compilation and Notes PDF handouts.

---

## 🛠️ Regeneration Instructions
To re-capture all slides from `web_deck/index.html`:
```bash
# In 02_stakeholders_benefits_presentation/scripts:
node capture_stakeholders_slides.js
```
The script uses headless Playwright to snapshot each `.slide-card` at exact 1920x1080 viewport dimensions with high visual fidelity.
