# AGENTS.md — shared_templates/overview_presentation_deck

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
