# AGENTS.md — architecture_presentations

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
This directory contains the complete technical presentation suite **«Архитектура платформы Турбаза»** (Architecture Presentations) — a deep-dive 7-part engineering presentation track covering the inner workings of Leaf, Branch, Parent Branch, Trunk, storage engines, application framework, developer libraries, data pipelines, P2P network topology, TreeSearch, and cryptographic / API economic models.

---

## 🧭 Directory Structure & Sub-Tracks
```
architecture_presentations/
├── turbase_architecture_presentations_master_plan.md # Master plan and 7-part curriculum
├── AGENTS.md                                         # This agent context and guideline document
├── 01_topology_and_sovereignty/                      # 1. 3-tier topology, edge paradigm, trunk gateway
├── 02_leaf_storage_engine/                           # 2. Leaf storage, 3-ID columns, composite FKs
├── 03_app_framework_and_sdk/                         # 3. Framework, SQL sandbox, APIs, DI/ORM/Decorators
├── 04_branch_pipeline_and_storage/                   # 4. Branch pipeline: Queue -> ConcurrentMap -> Storage
├── 05_routing_p2p_and_passthrough/                   # 5. P2P links, passthrough tunnels, tree routing
├── 06_tree_search_and_analytics/                     # 6. TreeSearch indices, distributed queries, DR
└── 07_cryptography_and_api_economy/                  # 7. GOST/PQC, Zero-PII, ZK, FSM Smart Contracts, Keyring & API economy
```

---

## 📋 Architectural Standards & Conventions
1. **Author Notes as Source of Intent**: All technical concepts, terminology, and topological models must strictly reflect the human-written author notes in [`shared_docs/comments/`](../shared_docs/comments/) (especially [`2026/09-07_01_Architecture_overview.md`](../shared_docs/comments/2026/09-07_01_Architecture_overview.md) and [`2026/09-12_01_Smart_Contracts.md`](../shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) and [`Технический документ платформы Турбаза.md`](../shared_docs/Технический%20документ%20платформы%20Турбаза.md).
2. **Strict Style Isolation**: All slide styles must be isolated and decoupled to prevent style regression or bleed into other tracks (`overall_presentations/`, `platform_overview/`, etc.).
3. **Billboard Typography**: Ensure mobile readability on 1920x1080 canvas (titles $\ge 50$px, body $\ge 24$px, cards $\ge 28$px).
4. **Zero Vertical Overflow**: All slides must fit strictly within 1920x1080 without scrolling (`scrollHeight <= clientHeight`).
5. **Standard Output Structure**:
   - `generated/artifacts/audio/` (pre-synthesized voice tracks)
   - `generated/artifacts/slides_png/` (slide captures)
   - `generated/outputs/web_deck/` (interactive player)
   - `generated/outputs/pdf/` (handouts)
   - `generated/outputs/video/` (master/email/10mb videos)
---

## 🧭 Инвариант относительных путей (Strict Repository-Relative Paths)
- Категорически запрещены любые машинозависимые абсолютные пути (`/Users/...`, `/home/...`, `file:///Users/...`, `C:\...`).
- Все ссылки на файлы в презентациях, документах, конспектах и коде оформляются исключительно относительно корня репозитория (например: `sessions/...`, `shared_docs/...`, `architecture_presentations/...`).

---

## 👑 Правило употребления терминов «суверенитет» и «суверенный»
- Термины «суверенитет» и «суверенный» применяются **исключительно в контексте государства, Отечества, национальной юрисдикции и межгосударственных союзов** («государственный суверенитет», «цифровой суверенитет государства / России», «национальный технологический суверенитет»).
- Категорически запрещено применять термины «суверенитет» и «суверенный» к отдельным людям, гражданам, смартфонам, узлам Лист, таблицам, базам данных или приложениям.
- Для граждан, их устройств и личных данных используются понятия: *«неприкосновенность частной жизни»*, *«тайна личной информации»*, *«защита персональных данных»*, *«автономия»*, *«независимость»*, *«самохранение»*, *«данные у владельца»*, *«изоляция хранилищ»*.

---

## 🏷️ Семантические метки и авторская база знаний
Метки в [`shared_docs/comments/LABELS.md`](../shared_docs/comments/LABELS.md) и комментариях являются системой индексации исключительно внутри базы знаний авторских заметок, предназначенной для того, чтобы сессии и ИИ-агенты могли получить связанную картину начальных знаний платформы.
**Категорически запрещено добавлять метки `%...` вне базы комментариев** (в презентационные слайды, дикторский текст, структуры презентаций, README и программный код), поскольку они загромождают текст и делают чтение и просмотр презентаций труднее.

---

## 🤝 Вежливость и уважение к труду других
Всегда быть вежливым и уважать труд людей, которые уже создали существующие системы и документы: теперь понятно, что многое можно делать лучше, и они сами об этом думают. Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и ярлыки (например, «карательный», «антиутопия», «токсичный», «кабала», «тупик» об идеях и системах). Описывать особенности подходов нейтрально, подавать материал как свод идей, который может пригодиться в разных ситуациях и частях мира, хотя проектируется для России. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 14.

---

## 🇷🇺 Чистая русская речь
Писать чистой русской речью: вместо англицизмов и жаргона («кейс», «дедлайн», «фидбэк», «бэкенд», «стартап», «комплаенс» и подобных) использовать русские слова («случай», «срок», «обратная связь», «серверная часть», «молодое предприятие», «соблюдение требований закона»). Исключения: собственные имена и названия, идентификаторы, код, формулы, точные названия законов и цитаты, а также технические термины без устоявшегося русского эквивалента (с кратким пояснением при первом упоминании). Дикторский текст должен хорошо звучать вслух. Подробные правила: корневой [`AGENTS.md`](../AGENTS.md), правило 15.
