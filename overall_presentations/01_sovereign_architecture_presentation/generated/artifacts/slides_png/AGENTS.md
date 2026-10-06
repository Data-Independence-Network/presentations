# AGENTS.md — 01_sovereign_architecture_presentation/slides_png

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
Stores high-resolution (1920x1080) PNG image captures for each slide (`slide_01.png` .. `slide_15.png`), used as visual inputs for video builds and PDF handout generation.

---

## 🛠️ Regeneration Instructions
To re-capture all slides from `web_deck/index.html`:
```bash
# In 01_sovereign_architecture_presentation/scripts:
node capture_slides.js
```
The capture script automatically spins up an internal server and captures each `.slide-card` at exact 1920x1080 dimensions.
