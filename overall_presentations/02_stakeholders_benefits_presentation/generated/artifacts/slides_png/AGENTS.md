# AGENTS.md — 02_stakeholders_benefits_presentation/slides_png

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
