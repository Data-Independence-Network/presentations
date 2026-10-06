# AGENTS.md — Detailed Overall Impact Presentations

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
This directory hosts the complete suite of **10 specialized deep-dive presentations** focusing on individual ecosystem participants and strategic cross-sector capabilities for the **«Турбаза»** sovereign platform.

---

## 🧭 Directory Structure
```
detailed_overall_impact_presentations/
├── turbase_detailed_impact_presentations_master_plan.md  # Master Architecture Plan
├── AGENTS.md                                             # Directory Rules & Specs
├── 01_citizens_presentation/                             # 1. Citizens & Households (Theme: Cyan #00f0ff)
├── 02_security_organs_presentation/                      # 2. Security Organs & Regulators (Theme: Crimson #ff2a5f)
├── 03_business_sme_presentation/                         # 3. SMEs & Enterprise Business (Theme: Emerald #00e676)
├── 04_advertisers_presentation/                          # 4. Advertisers & Brands (Theme: Magenta #e040fb)
├── 05_ad_platforms_presentation/                         # 5. Ad Platforms & AdTech (Theme: Amber #ffab00)
├── 06_government_infra_presentation/                     # 6. State & Municipalities (Theme: Sapphire #2979ff)
├── 07_it_developers_presentation/                        # 7. Independent IT Developers (Theme: Lime #76ff03; API economy & Revenue Sharing)
├── 08_fintech_banking_presentation/                      # 8. Fintech & Banking (Theme: Teal #1de9b6; ZK-Scoring, FSM Smart-Escrow & Wallet Wrappers)
├── 09_cross_synergies_presentation/                      # 9. Cross-Participant Synergies (Theme: Gold #ffd600)
└── 10_migration_roadmap_presentation/                    # 10. Phased Migration Roadmap (Theme: Titanium #90caf9)
```

---

## 🎨 Visual Identity & Differentiating Markers
All 10 presentations in this series must use the shared template system from `shared_templates/detailed_impact_deck/`:
1. **🌿 Corner Ribbon:** Fixed top-right ribbon `🌿 ЭКОСИСТЕМА` in the participant's sector color.
2. **⚡ 6px Left Neon Stripe:** Vertical glowing stripe marking the left edge of the slide.
3. **👤 Hero Stakeholder Badge:** Top-left indicator `[ 👤 УЧАСТНИК XX: <НАЗВАНИЕ> ]`.
4. **🎴 Specialized Components:** Before vs With Turbase comparison grids, PROs/CONs/Mitigation triptychs, User Journey storyboards, and KPI metric cards.

---

## ⏱️ Strict Timing & Format Guidelines
1. **Time Limit:** Each presentation MUST NOT exceed **10 minutes** (target runtime: **7:30 – 8:45 minutes**).
2. **Slide Count:** Exactly **10 slides** per presentation track.
3. **Typography Standards:** Mobile billboard scale (Slide titles $\ge 50$px, body $\ge 24$px, cards $\ge 28$px).
4. **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`, voice `ru-RU-DmitryNeural`, speed `-9%`, pauses `0.9s` / `1.2s`).
5. **Author Notes as Source of Intent:** Participant value models, Zero-PII compliance, and economic mechanisms strictly reflect the author notes in [`shared_docs/comments/`](../shared_docs/comments) (including [`2026/09-12_01_Smart_Contracts.md`](../shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](../shared_docs/Технический%20документ%20платформы%20Турбаза.md).
6. **No Binary Video Commits:** Never commit binary `.mp4` video files or `temp_video/` folders to git.
---

## 🏷️ Семантические метки и авторская база знаний
Метки в [`shared_docs/comments/LABELS.md`](../shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.

## 🤝 Вежливость и уважение к труду других
Всегда быть вежливым и уважать труд людей, которые уже создали существующие системы и документы: теперь понятно, что многое можно делать лучше, и они сами об этом думают. Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и ярлыки (например, «карательный», «антиутопия», «токсичный», «кабала», «тупик» об идеях и системах). Описывать особенности подходов нейтрально, подавать материал как свод идей, который может пригодиться в разных ситуациях и частях мира, хотя проектируется для России. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 14.

## 🇷🇺 Чистая русская речь
Писать чистой русской речью: вместо англицизмов и жаргона («кейс», «дедлайн», «фидбэк», «бэкенд», «стартап», «комплаенс» и подобных) использовать русские слова («случай», «срок», «обратная связь», «серверная часть», «молодое предприятие», «соблюдение требований закона»). Исключения: собственные имена и названия, идентификаторы, код, формулы, точные названия законов и цитаты, а также технические термины без устоявшегося русского эквивалента (с кратким пояснением при первом упоминании). Дикторский текст должен хорошо звучать вслух. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 15.
