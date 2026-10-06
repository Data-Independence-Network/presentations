# AGENTS.md — applications_presentations

> [!IMPORTANT]
> **Текущая тема, рабочий процесс и запись сессий:**
> Всегда необходимо использовать [`sessions/Current_Topic_and_process.md`](file:///Users/parents/Documents/presentations/sessions/Current_Topic_and_process.md) для установления ступени темы сессии и записи самой сессии. Тема и процесс работы, а также предложенный формат записи находятся в этом файле.

## 🎯 Purpose & Scope
This directory hosts the presentation suite for the **5 Flagship Core Applications of the «Турбаза» Ecosystem**:
- **01. «КубГолос»** (`01_kubgolos_app_presentation/`): Bottom-up peer micro-poll platform with versioned poll trees and 0% bot manipulation.
- **02. «Забота»** (`02_zabota_app_presentation/`): Mutual assistance social network, trusted stairwell groups, and open reputation schema libraries.
- **03. «Деловой»** (`03_delovoy_app_presentation/`): Personal, family, and SME task organizer based on the priority matrix and controlled serendipity.
- **04. «УраТур»** (`04_uratur_app_presentation/`): Autonomous direct data ownership travel planner and guidebook synthesized from «Деловой», «КубГолос», and «Забота» running 100% offline.
- **05. «Локальный реестр МСП и ЖКХ»** (`05_local_services_presentation/`): Local walk-in services directory (2ms lookup), Digital Ruble escrow, and full 5-app ecosystem synergy.

Following this 5-presentation cycle, a specialized **7-presentation deep-dive cycle** will cover the complete technical architecture of Turbase.

---

## 🧭 Directory Structure
```
applications_presentations/
├── turbase_applications_master_plan.md          # Series Master Architecture Plan (5 Parts)
├── AGENTS.md                                   # Directory Rules & Specs
├── 01_kubgolos_app_presentation/                # App 1: KubGolos Micro-Polls (Neon Cyan)
│   └── docs/presentation_outline.md
├── 02_zabota_app_presentation/                  # App 2: Zabota Mutual Aid & Open Reputation (Emerald)
│   └── docs/presentation_outline.md
├── 03_delovoy_app_presentation/                 # App 3: Delovoy Organizer (Amber/Gold)
│   └── docs/presentation_outline.md
├── 04_uratur_app_presentation/                  # App 4: UraTur Autonomous Travel Guide (Purple/Amethyst)
│   └── docs/presentation_outline.md
└── 05_local_services_presentation/              # App 5: Local Services & Applied Synergy (Ruby/Coral)
    └── docs/presentation_outline.md
```

---

## 🎨 Visual Identity Standard
- Theme: **«Индустриальный Горизонт» (Industrial Horizon Explainer)**.
- Deep Slate background (`#0a0f1d`), series top header `🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ`.
- Glassmorphism card surfaces, glowing accents, billboard typography ($\ge 50$px titles, $\ge 24$px body).

---

## ⏱️ Strict Timing & Format Guidelines
1. **Slide Count:** Exactly **15 slides** per presentation.
2. **Time Limit:** **11:00 – 12:30 minutes** (about 90 spoken words per minute including pauses; 990–1100 words of narration per presentation).
3. **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`, voice `ru-RU-DmitryNeural`, speed `-9%`, pauses `0.9s` / `1.2s`).
4. **Deliverables per Track:**
   - Interactive Web Deck (`web_deck/index.html`)
   - Notes Handout PDF (`docs/turbase_app_XX_notes.pdf`)
   - 16:9 Landscape Slide Deck PDF (`docs/turbase_app_XX_slides.pdf`)
   - Explainer Whitepaper PDF (`docs/turbase_app_XX_whitepaper.pdf`)
   - 10MB Video (`video_exports/turbase_app_XX_10mb.mp4`)
5. **Checks before delivery:** `npm --prefix applications_presentations run check-01` (also `check-02`, `check-03`, `check` for 01–03, `check-all` for all five). See root `AGENTS.md`, rule 16, and the plans `ОБЩИЙ_ПЛАН_финальных_версий_презентаций_01-03.md`, `ПЛАН_ФИНАЛ_0N_*.md`.

---

## 🏷️ Семантические метки и авторская база знаний
Метки в [`shared_docs/comments/LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.

## 🤝 Вежливость и уважение к труду других
Всегда быть вежливым и уважать труд людей, которые уже создали существующие системы и документы: теперь понятно, что многое можно делать лучше, и они сами об этом думают. Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и ярлыки (например, «карательный», «антиутопия», «токсичный», «кабала», «тупик» об идеях и системах). Описывать особенности подходов нейтрально, подавать материал как свод идей, который может пригодиться в разных ситуациях и частях мира, хотя проектируется для России. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 14.

## 🇷🇺 Чистая русская речь
Писать чистой русской речью: вместо англицизмов и жаргона («кейс», «дедлайн», «фидбэк», «бэкенд», «стартап», «комплаенс» и подобных) использовать русские слова («случай», «срок», «обратная связь», «серверная часть», «молодое предприятие», «соблюдение требований закона»). Исключения: собственные имена и названия, идентификаторы, код, формулы, точные названия законов и цитаты, а также технические термины без устоявшегося русского эквивалента (с кратким пояснением при первом упоминании). Дикторский текст должен хорошо звучать вслух. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 15.
