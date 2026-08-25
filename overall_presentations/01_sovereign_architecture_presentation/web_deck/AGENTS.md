# AGENTS.md — 01_sovereign_architecture_presentation/web_deck

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
