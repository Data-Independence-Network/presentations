# AGENTS.md — shared_templates

## 🎯 Purpose & Scope
This directory serves as the archetype design library and scaffolding boilerplate for presentation decks and styling systems in the **«Турбаза»** presentation suite.

---

## 🔒 Critical Rules & Invariants
1. **No Shared Runtime Styles:** Presentations must never import or link directly to stylesheets in `shared_templates/` at runtime.
2. **Autonomous Presentation Principle:** Every presentation owns its own isolated `docs/deck.css` copied during initialization.
3. **Zero Cross-Contamination:** Edits to templates must never directly alter, overflow, or regress any compiled presentation.
4. **Billboard Typography Standard:** Canvas 1920x1080, slide titles $\ge 50, body $\ge 24, cards $\ge 28, and strictly Zero-Overflow (`scrollHeight <= clientHeight`).
