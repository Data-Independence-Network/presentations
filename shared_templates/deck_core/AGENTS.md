# AGENTS.md — shared_templates/deck_core

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

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
