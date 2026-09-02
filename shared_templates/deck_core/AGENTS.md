# AGENTS.md — shared_templates/deck_core

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
