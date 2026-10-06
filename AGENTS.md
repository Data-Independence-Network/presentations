# AGENTS.md — Root Workspace Context

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [`sessions/Current_Topic_and_process.md`](sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести непрерывную запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [`sessions/session_format_template.md`](sessions/session_format_template.md) (или [`sessions/2026/10-05_00_session_format_tempate.md`](sessions/2026/10-05_00_session_format_tempate.md)).
> 5. **Обязательные требования к протоколу сессии:**
>    - Дословная фиксация всех запросов оператора в кавычках `> «...»` в блоках `### Шаг N`;
>    - Полное раскрытие хода рассуждений модели (альтернативы, архитектурные и лирические решения);
>    - Проверяемые метрики качества (слайды/страницы, слова, хронометраж звучания, тесты `check-decks` с гарантией отсутствия переполнений);
>    - Сводный реестр всех созданных файлов со ссылками относительно корня репозитория (строгий запрет на машинозависимые абсолютные пути вида `/Users/...` или `file:///Users/...`);
>    - Признание творческого соавторства модели в драматургии и художественном оформлении.

## 🎯 Overview & Purpose
This repository hosts the complete presentation suite, video production pipelines, interactive slide decks, and executive whitepaper materials for **«Турбаза»** (Turbase) — a three-tier distributed edge computing platform designed for high security, national data sovereignty, and massive infrastructure TCO reduction.

The workspace is structured into high-level overview presentations, specialized deep-dive participant presentations, explainer trilogies, flagship application suites, shared templates, and global tooling:
- **`platform_overview/`**: Foundational 3-part Explainer Mini-Series covering the paradigm shift, architectural principles, and sovereign economy of Turbase.
- **`applications_presentations/`**: 5-presentation Flagship Application Suite covering «КубГолос» (Peer Micro-Polls), «Забота» (Mutual Aid & Open Reputation), «Деловой» (Organizer), «УраТур» (Autonomous Travel Planner), and «Локальный реестр МСП и ЖКХ» (Local Services).
- **`architecture_presentations/`**: Complete 7-part deep engineering presentation series on platform architecture (Topology, Leaf storage, Framework/SDK, Branch pipeline, P2P/Routing, TreeSearch, Cryptography/API economy & minimal FSM smart contracts).
- **`overall_presentations/`**: High-level master overview presentations covering the complete architectural, economic, and stakeholder landscape:
  - `01_sovereign_architecture_presentation/`: Core technical architecture, 3-tier topology (Leaf $\to$ Branch $\to$ Trunk), 152-ФЗ compliance, and game-theoretic API economy.
  - `02_stakeholders_benefits_presentation/`: 6-stakeholder value matrix (Citizens, SME/Business, AdTech, Fintech, Regulators, Municipalities), PROs/CONs/Mitigations, and billboard-scale slides.
- **`detailed_overall_impact_presentations/`**: Complete suite of 10 specialized deep-dive presentations for individual ecosystem participants, cross-sector synergies, and phased legacy migration roadmap.
- **`shared_templates/`**: Shared slide deck templates and design systems (`overview_presentation_deck/`, `platform_overview_deck/`, and detailed impact styling).
- **`scripts/`**: Global automation and media pipelines (`core/` engines for TTS, slide capture, handout PDF, slide deck PDF, whitepaper PDF, and video generation).
- **`shared_docs/`**: Master technical documentation, specifications, developer notes (`comments/`), and the **10-Part Executive Whitepapers Suite** (`shared_docs/whitepapers/`, see dedicated handbook in [`shared_docs/whitepapers/AGENTS.md`](shared_docs/whitepapers/AGENTS.md) for publication-grade layout standards, 15-page invariants, KaTeX/Unicode math, and Mermaid rules).
- **`voice_samples/`**: Audio samples and evaluation scripts for neural voice synthesis.

---

## 🧭 Repository Structure & Key Conventions
```
turbase_benefits_presentation/
├── platform_overview/                          # Foundational 3-Part Explainer Mini-Series
├── applications_presentations/                 # 4 Flagship Core Applications Suite
├── architecture_presentations/                 # 7-Part Deep Engineering Architecture Series
│   ├── turbase_architecture_presentations_master_plan.md
│   └── 01_topology_and_sovereignty/ ... 07_cryptography_and_api_economy/
├── overall_presentations/                      # Master Overview Presentations Track
│   ├── 01_sovereign_architecture_presentation/ # Architecture & Sovereign Edge Compute
│   └── 02_stakeholders_benefits_presentation/  # 6-Stakeholder Value Matrix & Economics
├── detailed_overall_impact_presentations/      # Specialized 10-Presentation Series
│   ├── turbase_detailed_impact_presentations_master_plan.md
│   └── 01_citizens_presentation/ ... 10_migration_roadmap_presentation/
├── shared_templates/                           # Reusable UI / Deck Design Systems & Engines
│   └── overview_presentation_deck/             # Dark Sovereign billboard presentation engine
├── package.json                                # NPM scripts for presentation & doc regeneration
├── scripts/                                    # Global build automation CLI & core engines
│   ├── core/                                   # Incremental engine, TTS, Playwright, PDF, FFmpeg builders
│   └── rebuild.js, regenerate.js, etc.         # Unified CLI runners
├── install_build_dependencies.sh               # Debian/Ubuntu bash installer for base build software
├── install_regen_dependencies.sh               # Debian/Ubuntu bash installer for Neural TTS regeneration
├── shared_docs/                                # Master technical whitepapers & specifications
│   ├── comments/                               # Human-written developer notes & semantic label index (LABELS.md)
│   ├── whitepapers/                            # 10 Executive Whitepapers Suite (01–07 A4 PDF, 08–10 Markdown)
│   │   ├── 01_platform_overview_whitepaper.md ... 10_gogetter_whitepaper.md
│   │   └── AGENTS.md & README.md
│   └── Технический документ платформы Турбаза.md # Sovereign architecture whitepaper
├── text_to_speech_mcp_Open_API_key.txt         # Required TTS API key file (gitignored)
├── start_presentation.sh                       # HTTP server launcher on port 8080
└── .gitignore                                  # Video exports (*.mp4), cache, & temp dirs excluded
```

---

## 🛠️ Global Tooling & Execution Environment
- **Runtime:** Node.js (v24.x)
- **Headless Browser:** Chrome Headless (`google-chrome --headless=new`), Playwright
- **Media Processing:** FFmpeg & FFprobe (must be installed in PATH)
- **TTS Engine:** Microsoft Edge Neural TTS (`node-edge-tts`) with voice `ru-RU-DmitryNeural` (-9% rate, -5Hz pitch)
- **Incremental Engine:** SHA-256 content hashing + Git checkpoint caching (`generated/.build_cache.json`) via `npm run rebuild-*` (offline) or `npm run regen-*` (with TTS synthesis).

---

## 📋 Agent Guidelines & Rules
1. **NPM Task Execution**: Prefer `npm run rebuild-overall` or `npm run rebuild-*` for routine builds using committed `.mp3` audio (no API key needed). Use `npm run regen-*` only when narration text changes and new audio synthesis is required.
2. **Master Audio in Git**: Pre-synthesized `.mp3` master audio tracks in `generated/artifacts/audio/` are tracked in Git so the entire suite can be built offline.
3. **Standard Generated Layout**: All generated assets must reside strictly under `<presentation_dir>/generated/`:
   - `generated/artifacts/`: intermediate build assets (`audio/`, `slides_png/`, temporary segment renders).
   - `generated/outputs/`: final distributable deliverables (`web_deck/`, `pdf/`, `video/`).
4. **TTS API Key Validation**: Audio synthesis strictly requires `text_to_speech_mcp_Open_API_key.txt` in repository root. If missing or empty during `regen-*`, scripts immediately halt execution with a fatal error.
5. **Never commit binary videos (`*.mp4`), PDFs (`*.pdf`), cache files (`.build_cache.json`), or temporary segment folders**: All deliverables and video builds are 100% deterministic and generated via build scripts.
6. **Preserve Relative Path Conventions**: All scripts within presentation subdirectories use relative traversal (`path.join(__dirname, '..', ...)`).
7. **Typography & Mobile Readability Priority**: Presentation slides must adhere to the high-contrast billboard typography scale (Slide titles $\ge 50$px, body copy $\ge 24$px, cards $\ge 28$px) for readability on small mobile screens.
8. **Git Hygiene**: When adding or moving files, ensure related assets and documentation are committed with clean, categorized messages.
9. **Developer Notes & Semantic Labels (`shared_docs/comments/`)**:
   - **Internal Indexing System for Foundational Knowledge:** Notes in `shared_docs/comments/` are human-written records representing the developer's original vision, rationale, and conceptual evolution without AI. The semantic labels in [`LABELS.md`](shared_docs/comments/LABELS.md) (`%Repository`, `%Tree`, `%ForeignKey`, `%API`, `%SmartContract`, `%StateMachine`, `%MicroBlockchain`, `%Wallet`, etc.) serve **exclusively as an internal indexing and semantic navigation system within the comments knowledge base**, enabling LLM sessions and agents to form a coherent, linked mental model of foundational platform knowledge.
   - **Strict Prohibition Outside Comments Base:** Agents and developers must **NEVER add or use these `%...` labels outside `shared_docs/comments/`** (do not use them in presentation decks, slide notes, narration texts, outlines, whitepapers, READMEs, or code). Outside the comments knowledge base, raw label tokens clutter the text, degrade visual presentation, and make reading and viewing slides substantially harder.
   - **Strict Read-Only:** Files in `shared_docs/comments/` must be treated as strictly Read-Only.
10. **Strict Style Isolation & Two-Layer Presentation Architecture Principle**:
    The presentation system operates on a clean two-layer architecture separating the shared engine shell (chrome) from autonomous slide content:
    - **Layer 1: Universal Presentation Chrome Engine (`shared_templates/deck_core/css/deck_core.css`):**
      The outer player shell (16:9 viewport container `.presentation-viewport`, top header bar `.presentation-header`, navigation buttons `.nav-btn-arrow`, slide indicator, audio toggle, speaker notes drawer `.notes-drawer`, and overview grid modal `.modal-overlay`) is a **universal, shared engine asset**. It is centrally maintained in `deck_core.css`, wired in `scripts/core/deck_builder.js`, and powered by `overview_deck_engine.js`. Any update to player controls immediately and consistently enhances all 27 presentations without code duplication.
    - **Layer 2: 100% Isolated Slide Content Canvas (`docs/deck.css`, `architecture.css`, or `stakeholders.css`):**
      All styles and components *inside* `.slide-card` (billboard typography, content cards, grids, KPIs, Mermaid flowcharts, and custom color variables) are strictly isolated within each presentation's own stylesheet. Presentations never cross-import slide styles from other presentations or shared template components at runtime.
    - **Zero Cross-Contamination:** Edits to slide typography, layout, or cards in one presentation are physically guaranteed to never alter or regress any of the other 26 presentations.
    - **Zero-Overflow Invariant:** Any style or typography modification must be verified across all slides in Playwright (1920x1080) to ensure zero vertical overflow (`scrollHeight <= clientHeight`). All 27 presentations (405 slides) strictly uphold this invariant. The check is automated: `npm run check-decks` (all decks), `npm --prefix applications_presentations run check` (decks 01–03) or `node scripts/check_decks.js <presentation_dir>` (any deck); `--no-browser` runs only the text part.
11. **Primary Purpose of Presentations & Guidelines for Yet-to-be-Generated Tracks (Rework Policy)**:
    - **Overarching Mission — Explaining Turbase:** The primary purpose of every presentation across the entire workspace is to clearly, pedagogically, and convincingly **explain Turbase** — how the platform physically operates, how data moves between devices, why architectural decisions were made, and how real-world problems are solved, rather than staying in vague marketing abstractions or disconnected slogans.
    - **Guiding Principles for Ungenerated Presentations (Without Committed Audio) & Future Reworks:**
      For all presentations that do not yet have committed master audio in `generated/artifacts/audio/` (including `platform_overview/03`, pending deep-dive tracks in `architecture_presentations/`, `applications_presentations/`, and `detailed_overall_impact_presentations/`), all future planning and generation must follow these requirements:
      1. **Pedagogical Mechanics & "How It Works Under the Hood":** Show the concrete data flow across the 3 tiers (Leaf $\to$ Branch $\to$ Trunk). Explain what happens locally on the user's phone (`Leaf`), how changes are recorded in local micro-chains/repositories, how transactions are verified without centralized intermediaries, and how state transitions execute.
      2. **Grounded Real-World Scenarios:** Anchor every economic and architectural concept in concrete, recognizable situations (e.g., student school lunch with parental limits, B2B/B2C restaurant food delivery without POS terminals, composite app revenue-sharing via `share(...)`, revocable proxy-wrappers for wallet protection).
      3. **Natural Synthesis & Consolidation:** Eliminate speculative fluff and disjointed topics. Naturally integrate secondary concepts (e.g. AI attention scoring, reputation networks, cross-border settlement) into end-to-end user workflows so the deck feels like a unified, coherent narrative.
      4. **Billboard Accessibility & Invariants:** Maintain billboard scale (titles $\ge 50$px, body $\ge 24$px, cards $\ge 28$px) and zero-overflow guarantee across all 15 slides.
12. **Строгий запрет на корпоративные и коллективные формулировки («мы/наш»):**
    В соответствии с редакционными стандартами репозитория и объективной реальностью разработки (один архитектор/разработчик и искусственный интеллект), категорически исключаются коллективные формулировки от имени несуществующей корпорации или команды («мы представляем», «наша презентация», «наша концепция», «мы разработали», «в нашей экосистеме», «в нашей платформе»). Допустимы исключительно нейтральные институциональные и описательные конструкции («в этой презентации представлена», «в концепции платформы», «в архитектуре «Турбазы»», «платформа задействует», «разработан механизм»). Общегражданские, семейные и патриотические конструкции («наша страна», «наши граждане», «наши дети», «наши семьи», «наше Отечество») сохраняются в исходном виде.
13. **Строгий запрет на программный код, DDL-описания и классы в Белых Книгах и презентациях (Временный статус инженерных набросков):**
    Все программные классы, DDL-описания таблиц и технические фрагменты кода в инженерных спецификациях (например, в директории `shared_docs/whitepapers/applications/`) являются исключительно **временными рабочими проектными набросками** (draft approximations) базового инженерного уровня. **Они категорически запрещены к отображению и включению в представительские материалы: официальные Белые Книги (Whitepapers) и слайды презентаций.** В Белых Книгах и презентациях архитектурные концепции платформы («Турбаза», «Деловой», «КубГолос», «Забота» и др.) должны раскрываться исключительно на понятийном уровне: через концептуальные модели, потоки данных между уровнями «Лист» $\to$ «Ветка» $\to$ «Ствол», архитектурные инварианты, конечные автоматы FSM и социально-экономические эффекты.
14. **Вежливость и уважение к труду других (запрет обесценивающих слов):**
    - Всегда быть вежливым: в документах, белых книгах, презентациях, дикторском тексте, комментариях к коду, сообщениях коммитов и в общении с пользователем.
    - Уважать труд людей, которые уже создали и реализовали существующие системы (кредитные бюро и скоринг, системы социального рейтинга, платформы, стандарты, а также код и документы, уже лежащие в репозитории). Теперь понятно, что многое можно делать лучше, и сами авторы об этом думают. Цель общая: улучшить положение дел для всех, а не противопоставить себя другим.
    - Не использовать неуважительные, обесценивающие, оскорбительные и ругательные слова и оценочные ярлыки. В частности, не употреблять «карательный», «антиутопия», «дистопия», «тоталитарный», «токсичный» (о людях, системах, рейтингах), «кабала», «паразитарный», «деструктивный», «тупик» и «ловушка» (об идеях и системах), и подобные. Не приписывать странам, организациям и людям слежку, дискриминацию и другие обвинения.
    - Вместо этого описывать особенности подходов нейтрально и с признанием заслуг («отличие», «особенность», «ограничение»), подавать материал как свод идей («предлагается», «может дополнить», «вариант»). Не называть свой подход «альтернативой», «единственно правильным» или «лучшим».
    - Идеи проектируются для России, но часть из них может пригодиться в разных ситуациях и частях мира. Так и писать, без обещаний, что система подойдёт всем.
    - Замечания по существу допустимы, но только как конкретное, проверяемое замечание с предложением улучшения и без оценок людей. Ошибки в чужом тексте или коде называть спокойно и по существу.
    - Точные названия нормативных актов, цитаты и общепринятые технические термины не заменять. Файлы авторских заметок `shared_docs/comments/` остаются строго только для чтения.
    - Проверка перед сдачей: `grep -rIn -i -P "карател|антиутоп|дистоп|тоталитар|авторитарн|токсичн|кабал|паразит|деструктив|стигматиз|клейм" --include=*.md --exclude=AGENTS.md <каталог>`. Файлы `AGENTS.md` исключены, потому что содержат сам список слов. Найденное проверить по смыслу: допустимы только точные термины и цитаты, но не оценочные слова.
15. **Чистая русская речь (без англицизмов и жаргона):**
    - Писать чистой, живой русской речью. Там, где есть хорошее русское слово, использовать его, а не англицизм, жаргонизм или транслитерацию.
    - Примеры замен: «кейс» — «случай», «пример», «сценарий»; «дедлайн» — «срок»; «фидбэк» — «обратная связь», «отзыв»; «бэкенд» — «серверная часть»; «фронтенд» — «клиентская часть», «интерфейс»; «стартап» — «молодое предприятие», «новое дело»; «комплаенс» — «соблюдение требований закона», «правовое соответствие»; «онбординг» — «первое знакомство», «подключение»; «дашборд» — «панель показателей»; «апдейт» — «обновление»; «апрув» — «одобрение», «подтверждение»; «юзер» — «пользователь»; «фича» — «возможность», «функция»; «тренд» — «тенденция»; «менеджмент» — «управление»; «челлендж» — «испытание», «задача»; «лайфхак» — «полезный приём»; «хайп» — «шумиха»; «аутсорс» — «передача на сторону»; «логи» — «журналы»; «куки» — «файлы куки» (при первом упоминании объяснять).
    - Принятые русские названия платформенных понятий: «Zero-PII» — «частное остаётся частным» (название принципа), «данные у владельца» (короткий ярлык в перечислениях и на значках), «нулевое хранение персональных данных на платформе» (юридическая формулировка); «Read-Anywhere, Write-Self» — «Читай отовсюду, пиши только своё»; «On-Device» — «на устройстве»; «Control Plane / Data Plane» — «плоскость управления / плоскость данных»; «Edge Computing» — «вычисления на устройствах пользователей»; «Mesh» — «ячеистая сеть»; «PROs / CONs / Mitigations» — «плюсы / опасения / способы компенсации». Также: «Wrappers» — «контрактные оболочки»; «Self-Custody» — «самохранение»; «Legacy» — «действующие системы»; «Branch Adapter» — «адаптер Ветки»; «Bug Bounty» — «поиск уязвимостей за вознаграждение»; «Disaster Recovery» — «аварийное восстановление»; «Web-of-Trust» — «сеть доверия»; «Proof-of-Delivery» — «подтверждение доставки»; «Pruning» — «очистка»; «Time-Traveling» — «путешествия во времени».
    - Допустимые исключения, которые не нужно заменять: собственные имена и названия (AIRport, SQLite, Ed25519, ГОСТ, названия приложений и репозиториев, имена людей и организаций); идентификаторы, имена файлов и пути, код и формулы; точные названия нормативных актов и цитаты; общепринятые технические термины, у которых нет устоявшегося русского эквивалента или замена исказила бы смысл (например, «сервер», «браузер», «файл», «смартфон», «хеш», «токен» в техническом значении, «эскроу», «клиринг», «скоринг» как названия финансовых понятий). Для таких терминов при первом упоминании в тексте давать краткое русское пояснение.
    - Не вводить новых английских терминов и сокращений без нужды. Если английский термин всё же нужен, писать его один раз в скобках после русского названия («механизм состояний (FSM)»), а дальше использовать русское.
    - Не смешивать алфавиты в одном слове и не писать русские слова латиницей. Не использовать кальки с английского, которые звучат неестественно («имплементировать», «релизить», «мэпить»). Предпочитать простые глаголы: «реализовать», «выпустить», «сопоставить».
    - Дикторский текст и заголовки слайдов должны хорошо звучать вслух: без английских аббревиатур там, где можно обойтись русским словом, и без слов, которые синтезатор речи читает неверно.
    - Существующие тексты править постепенно: при редактировании абзаца заменять в нём англицизмы. Массовую замену не делать без просмотра каждого случая, чтобы не исказить смысл, цитаты и названия.
    - Проверка перед сдачей: `grep -rIn -i -P "(?<![а-яё])(кейс|дедлайн|фидб[эе]к|б[эе]кенд|фронтенд|стартап|комплаенс|онбординг|дашборд|апдейт|апрув|юзер|фич|тренд|менеджмент|челлендж|лайфхак|хайп|аутсорс)[а-яё]*" --include=*.md --exclude=AGENTS.md <каталог>`. Найденное проверять по смыслу: допустимы исключения из третьего пункта, остальное заменять.
16. **Проверка презентаций перед сдачей (автоматическая):**
    - Для каждой новой или изменённой презентации выполнить `node scripts/check_decks.js <каталог презентации>` (для серии прикладных приложений: `npm --prefix applications_presentations run check-01`, `check-02`, `check-03`; для всех колод: `npm run check-decks`). Скрипт проверяет число слайдов и нумерацию, объём дикторского текста, запреты правил 9, 12–15 (метки `%…`, «мы/наш», запретные слова, англицизмы, программные имена, знак `$`), атрибутику и инвариант нулевого переполнения (`scrollHeight <= clientHeight`, Chromium 1920×1080).
    - Ошибки (✗) обязательно устранить; предупреждения (!) проверить по смыслу. Для колод серии `applications_presentations/01–03` действует строгий профиль (15 слайдов, 990–1100 слов дикторского текста, не более 110 слов на слайде, обязательная атрибутика); для остальных колод те же запреты выводятся предупреждениями.
    - Перед запуском выполнить `export LC_ALL=C.UTF-8`, иначе поиск по кириллице в оболочке работает неверно.
17. **Инвариант относительных путей (Strict Repository-Relative Paths):**
    - Категорически запрещены любые абсолютные машинозависимые пути (`/Users/...`, `/home/...`, `file:///Users/...`, `C:\...`).
    - Все ссылки на файлы, пути в документации, протоколах сессий, шаблонах, скриптах и коде должны указываться строго относительно корня репозитория (например: `sessions/...`, `applications_presentations/...`, `shared_docs/...`).
    - Это обеспечивает 100% переносимость репозитория между разработчиками, операционными системами (macOS, Linux, Windows) и серверами сборки.
18. **Правило употребления терминов «суверенитет» и «суверенный» (исключительно контекст государства):**
    - В соответствии с основами государственного права и Конституцией РФ термины «суверенитет» и «суверенный» означают верховенство и независимость публичной власти и применимы **исключительно в контексте государства, Отечества, национальной юрисдикции и межгосударственных союзов** («государственный суверенитет», «цифровой суверенитет государства / России / Отечества», «технологический суверенитет РФ», «национальный суверенитет данных», «суверенная инфраструктура государства», «суверенный клиринг в контуре БРИКС / ЕАЭС»).
    - Категорически запрещено применять термины «суверенитет» и «суверенный» к гражданам, отдельным людям, мобильным устройствам, смартфонам, узлам Лист, таблицам, базам данных, приложениям или органайзерам (прямая калька с англоязычных псевдоюридических штампов вроде *«sovereign citizen»*, *«self-sovereign identity»*, *«sovereign storage»*).
    - В отношении граждан, их устройств, личных данных и локальных баз данных используются принятые в российском праве и инженерной традиции понятия: *«неприкосновенность частной жизни»*, *«тайна личной информации»*, *«защита персональных данных»*, *«автономия»*, *«независимость»*, *«самохранение»*, *«данные у владельца»*, *«изоляция хранилищ»*.
    - Проверка перед сдачей: автоматический контроль в `scripts/check_decks.js` (`findNonStateSovereignty`). Ручная проверка:
      `grep -rIn -i -P "(?<![а-яё])суверен[а-яё]*" --include=*.md --exclude=AGENTS.md <каталог>` с обязательным анализом контекста (любое употребление без явного государственного или национального контекста недопустимо).

