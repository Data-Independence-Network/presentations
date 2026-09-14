# AGENTS.md — platform_overview

## 🎯 Purpose & Scope
This directory hosts the foundational **3-part General Explainer Mini-Series** for the **«Турбаза»** platform.

---

## 🧭 Directory Structure
```
platform_overview/
├── turbase_platform_overview_master_plan.md          # Series Master Architecture Plan
├── AGENTS.md                                         # Directory Rules & Specs
├── 01_paradigm_shift_presentation/                   # Part 1: Manifest & Autonomous Repositories (Gold/Cyan)
├── 02_architecture_principles_presentation/          # Part 2: Anatomy, Foreign Keys & App Cooperation (Cyan/Emerald)
└── 03_sovereign_economy_presentation/                # Part 3: Sovereign Economy & Decentralized AI (Teal/Gold)
```

---

## 🎨 Visual Identity Standard & Track Isolation
- Uses the specialized template in [`shared_templates/platform_overview_deck/`](file:///Users/parents/Documents/presentations/shared_templates/platform_overview_deck/) (`platform_overview_theme.css` + `platform_overview_components.css`).
- Theme: **«Индустриальный Горизонт» (Industrial Horizon Explainer)**.
- Deep Slate background (`#0a0f1d`), series top header `🏔️ ПЛАТФОРМА ТУРБАЗА | ЭКСПЛЕЙНЕР`.
- Glassmorphism card surfaces, glowing accents, billboard typography ($\ge 50$px titles, $\ge 24$px body).
- **Strict Decoupling:** Loaded independently of `overview_presentation_deck` or `detailed_impact_deck`. Changes to explainer styling will never affect overall architecture or stakeholder presentations.

---

## ⏱️ Strict Timing & Format Guidelines
1. **Slide Count:** Exactly **15 billboard slides** per presentation (matching canonical workspace standard).
2. **Time Limit:** **11:00 – 12:30 minutes** (target speech pace ~40–45s/slide + pauses).
3. **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`, voice `ru-RU-DmitryNeural`, speed `-9%`, pauses `0.9s` / `1.2s`).
4. **Deliverables per Track:**
   - Interactive Web Deck (`web_deck/index.html`)
   - Notes Handout PDF (`docs/turbase_platform_XX_notes.pdf`)
   - 16:9 Landscape Slide Deck PDF (`docs/turbase_platform_XX_slides.pdf`)
   - Explainer Whitepaper PDF (`docs/turbase_platform_XX_whitepaper.pdf`)
   - 10MB Video (`video_exports/turbase_platform_XX_10mb.mp4`)

---

## 🎯 Принцип объяснения платформы в будущей переработке презентаций
Для презентаций эксплейнер-серии, еще не имеющих зафиксированного аудио (в частности, презентации 03), и будущих итераций переработки устанавливается безусловный приоритет **наглядного объяснения сути и механики работы Турбазы**:
1. **От абстракций к физической механике:** Вместо общих лозунгов показывать, как конкретно циркулируют данные: устройство пользователя («Лист»), районный шлюз («Ветка»), национальный контур («Ствол»).
2. **Реальные жизненные сценарии:** Опираться на сквозные прикладные примеры (оплата школьного питания, доставка еды без терминалов, сплитование роялти за рекламу и софт через `share(...)`, защитные прокси-оболочки кошельков).
3. **Синтез и сокращение вторичного:** Второстепенные или оторванные концепции органично интегрируются в сценарии либо сокращаются в пользу ясного понимания двухконтурной модели (внешний информационный контур Турбазы на микро-цепях + внутренний расчетный детерминированный FSM Цифрового рубля).

---

## 🏷️ Семантические метки и авторская база знаний
Метки в [`shared_docs/comments/LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.
