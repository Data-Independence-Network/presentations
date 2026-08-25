# AGENTS.md — 02_stakeholders_benefits_presentation/web_deck

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
