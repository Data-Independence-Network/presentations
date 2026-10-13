# Платформа «Турбаза» / Turbase Platform
### Цифровая экосистема прямого владения данными и суверенной инфраструктуры
*Edge-Native Distributed Data Ownership Ecosystem & Sovereign Computing Architecture*

<p align="left">
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/GitHub%20Pages-Смотреть%20онлайн%20в%201%20клик-success?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages"></a>
  <a href="https://data-independence-network.github.io/presentations/viewer.html"><img src="https://img.shields.io/badge/Белые%20Книги-Веб--вьюер%20Markdown-informational?style=for-the-badge&logo=markdown&logoColor=white" alt="Белые Книги"></a>
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/Слайдов-405%20(16:9)-blue?style=for-the-badge" alt="405 слайдов"></a>
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/Нейроозвучка-DmitryNeural-purple?style=for-the-badge" alt="Нейроозвучка"></a>
</p>

---

## 🧭 Руководства и разъяснение проекта / Project Explainers

| Документ / Document | Язык / Language | Описание / Summary |
| :--- | :---: | :--- |
| [**English Explainer**](./docs/EXPLAINER_EN.md) | 🇬🇧 English | Core architecture, author contribution status, defensive US patent, and sovereign adaptation guide |
| [**Разъяснение проекта**](./docs/EXPLAINER_RU.md) | 🇷🇺 Русский | Суть платформы, статус авторского вклада, защитный патент США и руководство по суверенной адаптации |

---

## 🌐 Витрина презентаций и Белых Книг

- 👉 **[Единый онлайн-портал презентаций на GitHub Pages](https://data-independence-network.github.io/presentations/)** — просмотр всех 27 интерактивных слайд-деков с дикторской озвучкой и переключением режимов. Локальный запуск витрины: [index.html](./index.html).
- 👉 **[Интерактивный веб-вьюер Белых Книг (viewer.html)](https://data-independence-network.github.io/presentations/viewer.html)** — удобное чтение 12 аналитических и архитектурных документов с рендерингом формул KaTeX и диаграмм Mermaid. Локальный запуск вьюера: [viewer.html](./viewer.html).
- 🚀 **Офлайн-просмотр без интернета:** Выполните команду `./start_presentation.sh` в корне репозитория и откройте в браузере `http://localhost:8080/`.

---

## 💡 TL;DR: Краткая суть проекта (Russian)

**«Турбаза»** — отечественная трехуровневая распределенная цифровая платформа прямого владения данными, созданная для защиты национального цифрового суверенитета и кардинального снижения совокупной стоимости серверной инфраструктуры (TCO):

1. **Трехуровневая топология вычислений:**
   - **«Лист» (Leaf):** вычисления и локальные реляционные микробазы (SQLite / AIRport) выполняются на персональных устройствах пользователей (смартфоны, ПК). Данные рождаются, версионируются и хранятся у владельца («читай отовсюду, пиши только своё»);
   - **«Ветка» (Branch):** государственно-суверенные серверные шлюзы агрегации, маршрутизации и валидации транзакций;
   - **«Ствол» (Trunk):** распределенный корневой контур глобального доверия и якорной фиксации реестров.
2. **Снижение серверного TCO на 90%:** Серверные мощности разгружаются от хранения терабайтов пользовательских баз и вычислений, превращаясь в компактные ретрансляторы дельт.
3. **Соответствие 152-ФЗ и суверенная безопасность:** Персональные данные никогда не консолидируются на центральных серверах, устраняя риски утечек; обеспечена интеграция с ГОСТ Р 34.10, ЕСИА, СБП, ГИС ЖКХ и Цифровым рублем Банка России.
4. **Детерминированные микросмарт-контракты $O(1)$:** Использование математически строгих конечных автоматов (FSM) с константной сложностью вместо ресурсоемких и уязвимых виртуальных машин типа EVM.
5. **Сквозная связность и репутация:** Объединение микроприложений через внешние ключи и открытый социальный рейтинг вкладов вместо монопольных корпоративных экосистем.

---

## 💡 TL;DR: Executive Summary (English)

**Turbase** is a sovereign three-tier edge-native distributed data architecture designed for information sovereignty, consumer data ownership, and radical cloud infrastructure TCO reduction:

1. **Three-Tier Topological Model:**
   - **Leaf (Edge Silicon):** Local data processing and embedded relational micro-databases (SQLite / AIRport) run on user devices. Data is authored and retained locally under the principle "read everywhere, write own";
   - **Branch (Sovereign Gateways):** National/regional edge servers handling routing, aggregation, and jurisdictional compliance gateways;
   - **Trunk (Core Consensus):** Global anchoring root consensus securing canonical event logs without centralizing private data.
2. **90% Cloud TCO Reduction:** Edge compute and client-side storage eliminate expensive multi-gigawatt datacenter expansions, transforming servers into lightweight relay proxies.
3. **Jurisdictional Sovereignty & Privacy:** Strict compliance with data localization and privacy mandates (including Russian 152-FZ, GDPR, and sovereign regulations) by retaining raw data on edge devices; turnkey adapters for national e-ID, instant payment systems, and Central Bank Digital Currencies (CBDC).
4. **Deterministic $O(1)$ FSM Smart Contracts:** Finite State Machine execution with constant mathematical complexity replaces volatile, high-gas virtual machines (e.g. EVM).
5. **Cross-Application Relational Interoperability:** Seamless multi-application linking via foreign keys and decentralized topic-based social reputation matrices without corporate platform lock-in.

---

## 📜 Завершение авторского вклада и материалы для суверенной адаптации

Авторский вклад **Артёма Владимировича Шамсутдинова** в концептуальную документацию платформы полностью завершён — зафиксированы все ключевые теоретические модели, архитектурные чертежи и правовые механизмы. В процессе работы выявлены прикладные детали, требующие перехода к созданию действующих программных прототипов перед их последующим документированием.

Поскольку архитектура серверного контура («Ветки») будет различаться от страны к стране в зависимости от национального законодательства, платёжных систем и регуляторных стандартов, дальнейшая разработка прототипов рекомендуется участникам Ассоциации «Турбаза» в соответствующих юрисдикциях (подробнее см. комментарий [[Future papers and presentations](./shared_docs/comments/2026/10-11_01_Future_papers_and_presentations.md)]).

Подробные разъяснения сути платформы, авторского вклада, назначения защитного патента США US10902016B2, разделения неизменного ядра «Листа» и суверенной вариативности «Ветки», а также реестры адаптации представлены в двух официальных документах:

- 🇷🇺 **[Разъяснение проекта и руководство по суверенной адаптации (на русском языке)](./docs/EXPLAINER_RU.md)**
- 🇬🇧 **[English Explainer and Sovereign Adaptation Guide (in English)](./docs/EXPLAINER_EN.md)**

### Ключевой реестр готовых материалов и адаптационных треков:
1. **Завершённые вводные и флагманские презентации (со студийной нейроозвучкой DmitryNeural):**
   - [«Парадигмальный сдвиг и суверенитет данных»](./platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/index.html) — базовое введение в смену парадигмы децентрализации;
   - [«Анатомия и Архитектура платформы»](./platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/index.html) — базовое введение в архитектуру (основа для [инженерной адаптации](./architecture_presentations/README.md));
   - [«Суверенная экономика и смарт-контракты»](./platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/index.html) — экономика API 1/N и FSM смарт-контракты ([бонды Банка России](./shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.pdf), [рейтинги вкладов](./shared_docs/whitepapers/07_social_economic_ratings_whitepaper.pdf));
   - [«Архитектура Цифрового Суверенитета»](./overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/index.html) — трехуровневая топология и правовой суверенитет;
   - [«Матрица ценности для стейкхолдеров»](./overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/index.html) — системный анализ выгод для участников (основа для [отраслевой адаптации](./detailed_overall_impact_presentations/README.md));
   - [«КубГолос»: измерять и складывать](./applications_presentations/01_kubgolos_app_presentation/generated/outputs/web_deck/index.html) — системообразующий сервис ([Белая Книга 08](./viewer.html?doc=shared_docs%2Fwhitepapers%2F08_votecube_whitepaper.md));
   - [«Забота»: вкладывать и просматривать](./applications_presentations/02_zabota_app_presentation/generated/outputs/web_deck/index.html) — открытый социальный опыт ([Белая Книга 09](./viewer.html?doc=shared_docs%2Fwhitepapers%2F09_sapoto_whitepaper.md));
   - [«Деловой»: исполнять и связывать](./applications_presentations/03_delovoy_app_presentation/generated/outputs/web_deck/index.html) — контракты и организация деятельности ([Белая Книга 10](./viewer.html?doc=shared_docs%2Fwhitepapers%2F10_gogetter_whitepaper.md)).
2. **Материалы прикладных систем для суверенной адаптации:**
   - **Белая Книга 11:** [«УраТур — автономное планирование путешествий»](./viewer.html?doc=shared_docs%2Fwhitepapers%2F11_uratur_whitepaper.md) (презентация оставлена для суверенной адаптации);
   - **Белая Книга 12:** [«Экосистема приложений прямого владения данными»](./viewer.html?doc=shared_docs%2Fwhitepapers%2F12_ecosystem_whitepaper.md) (презентация оставлена для суверенной адаптации).

---

### 📊 Масштаб презентационного комплекса

- **27 полноформатных презентаций** с глубокой инженерной и экономической проработкой:
  - **8 завершённых треков (120 слайдов)** с полной синхронной студийной нейроозвучкой DmitryNeural;
  - **2 прикладных трека (30 слайдов)** в процессе подготовки к синхронизации с Белыми Книгами 11 и 12;
  - **7 инженерных выпусков (105 слайдов)** концептуальной архитектуры, открытых для создания прототипов сообществом;
  - **10 отраслевых выпусков (150 слайдов)** детального анализа, открытых для юрисдикционной доработки.
- **405 широкоформатных слайдов (16:9, 1920x1080)** с мобильной билборд-типографикой и нулевым скроллом (Zero-Overflow).
- **120 озвученных слайдов (~2.7 часа студийного звучания)** на базе Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`).
- **12 аналитических Белых Книг (Whitepapers)**:
  - **7 готовых к публикации документов** (№ 06–07 в полиграфическом формате А4, № 08–12 в формате Markdown для веб-вьюера);
  - **5 концептуальных проектов (№ 01–05)**, оставленных для практической доработки сторонними разработчиками на базе прототипов.
- **База авторских заметок разработчика (`shared_docs/comments/`)** и семантический словарь меток ([LABELS.md](./shared_docs/comments/LABELS.md)).
- **100% автономная офлайн-сборка:** все мастер-аудиодорожки зафиксированы в Git, сборка и просмотр возможны без интернета и внешних API-ключей.

---

## 🧭 Пять основных направлений экосистемы

| Направление экосистемы | Директория | Презентаций | Слайдов | Статус направления | Ключевой концептуальный фокус | Документация |
| :--- | :--- | :---: | :---: | :--- | :--- | :---: |
| **Platform Overview (Базовый обзор)** | `platform_overview/` | **3** | **45** | **Завершено** (озвучено 3 из 3) | Кризис централизованных облаков, смена парадигмы, 4 ранга узлов, справедливость 1/N | [Обзор серии ➔](./platform_overview/README.md) |
| **Applications Suite (Флагманские сервисы)** | `applications_presentations/` | **5** | **75** | **3 завершено / 2 готовятся** | «Деловой», «КубГолос», «Забота», «УраТур», реестр МСП/ЖКХ, связность через внешние ключи | [Обзор серии ➔](./applications_presentations/README.md) |
| **Architecture Deep-Dive (Инженерная архитектура)** | `architecture_presentations/` | **7** | **105** | *Концептуальные проекты* | СУБД Листа, конвейер Ветки, P2P-сигналинг, TreeSearch, ГОСТ/PQC, данные у владельца, FSM смарт-контракты | [Обзор серии ➔](./architecture_presentations/README.md) |
| **Master Overview Track (Мастер-презентации)** | `overall_presentations/` | **2** | **30** | **Завершено** (озвучено 2 из 2) | Архитектура цифрового суверенитета и матрица ценности 6 заинтересованных сторон | [Обзор серии ➔](./overall_presentations/README.md) |
| **Detailed Ecosystem Impact (Отраслевой анализ)** | `detailed_overall_impact_presentations/` | **10** | **150** | *Отраслевые проекты* | Индивидуальный разбор выгод, рисков, компенсаций и KPI для 10 участников | [Обзор серии ➔](./detailed_overall_impact_presentations/README.md) |


<details>
<summary><b>🗺️ Развернуть полный реестр всех 27 презентаций платформы (405 слайдов)</b></summary>

| № | Направление | Презентация | Слайдов | Статус готовности | Интерактивный плеер | Документация |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: |
| **01** | Platform Overview | [**01. Манифест и Смена парадигмы**](./platform_overview/01_paradigm_shift_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/index.html) | [README.md](./platform_overview/01_paradigm_shift_presentation/README.md) |
| **02** | Platform Overview | [**02. Анатомия и Архитектура**](./platform_overview/02_architecture_principles_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/index.html) | [README.md](./platform_overview/02_architecture_principles_presentation/README.md) |
| **03** | Platform Overview | [**03. Справедливая экономика данных и ИИ**](./platform_overview/03_sovereign_economy_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/index.html) | [README.md](./platform_overview/03_sovereign_economy_presentation/README.md) |
| **04** | Applications Suite | [**01. «КубГолос»**](./applications_presentations/01_kubgolos_app_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./applications_presentations/01_kubgolos_app_presentation/generated/outputs/web_deck/index.html) | [README.md](./applications_presentations/01_kubgolos_app_presentation/README.md) |
| **05** | Applications Suite | [**02. «Забота»**](./applications_presentations/02_zabota_app_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./applications_presentations/02_zabota_app_presentation/generated/outputs/web_deck/index.html) | [README.md](./applications_presentations/02_zabota_app_presentation/README.md) |
| **06** | Applications Suite | [**03. «Деловой»**](./applications_presentations/03_delovoy_app_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./applications_presentations/03_delovoy_app_presentation/generated/outputs/web_deck/index.html) | [README.md](./applications_presentations/03_delovoy_app_presentation/README.md) |
| **07** | Applications Suite | [**04. «УраТур»**](./applications_presentations/04_uratur_app_presentation/README.md) | 15 | *В процессе подготовки* | [▶ Открыть web_deck](./applications_presentations/04_uratur_app_presentation/generated/outputs/web_deck/index.html) | [README.md](./applications_presentations/04_uratur_app_presentation/README.md) |
| **08** | Applications Suite | [**05. «Локальный реестр МСП и ЖКХ»**](./applications_presentations/05_local_services_presentation/README.md) | 15 | *В процессе подготовки* | [▶ Открыть web_deck](./applications_presentations/05_local_services_presentation/generated/outputs/web_deck/index.html) | [README.md](./applications_presentations/05_local_services_presentation/README.md) |
| **09** | Architecture Deep-Dive | [**01. Топология и вычисления на устройствах пользователей**](./architecture_presentations/01_topology_and_sovereignty/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/01_topology_and_sovereignty/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/01_topology_and_sovereignty/README.md) |
| **10** | Architecture Deep-Dive | [**02. Движок хранения узла «Лист»**](./architecture_presentations/02_leaf_storage_engine/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/02_leaf_storage_engine/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/02_leaf_storage_engine/README.md) |
| **11** | Architecture Deep-Dive | [**03. Каркас приложений и SDK**](./architecture_presentations/03_app_framework_and_sdk/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/03_app_framework_and_sdk/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/03_app_framework_and_sdk/README.md) |
| **12** | Architecture Deep-Dive | [**04. Конвейер узла «Ветка»**](./architecture_presentations/04_branch_pipeline_and_storage/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/04_branch_pipeline_and_storage/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/04_branch_pipeline_and_storage/README.md) |
| **13** | Architecture Deep-Dive | [**05. P2P-маршрутизация и туннели**](./architecture_presentations/05_routing_p2p_and_passthrough/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/05_routing_p2p_and_passthrough/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/05_routing_p2p_and_passthrough/README.md) |
| **14** | Architecture Deep-Dive | [**06. TreeSearch и аналитика**](./architecture_presentations/06_tree_search_and_analytics/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/06_tree_search_and_analytics/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/06_tree_search_and_analytics/README.md) |
| **15** | Architecture Deep-Dive | [**07. Криптоконтур, смарт-контракты и Экономика API**](./architecture_presentations/07_cryptography_and_api_economy/README.md) | 15 | *Концептуальный проект (для прототипов)* | [▶ Открыть web_deck](./architecture_presentations/07_cryptography_and_api_economy/generated/outputs/web_deck/index.html) | [README.md](./architecture_presentations/07_cryptography_and_api_economy/README.md) |
| **16** | Master Overview | [**01. Архитектура Цифрового Суверенитета**](./overall_presentations/01_sovereign_architecture_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/index.html) | [README.md](./overall_presentations/01_sovereign_architecture_presentation/README.md) |
| **17** | Master Overview | [**02. Выгоды Стейкхолдеров**](./overall_presentations/02_stakeholders_benefits_presentation/README.md) | 15 | **Завершена** (озвучка DmitryNeural) | [▶ Открыть web_deck](./overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/index.html) | [README.md](./overall_presentations/02_stakeholders_benefits_presentation/README.md) |
| **18** | Detailed Overall Impact | [**01. Граждане и Домохозяйства**](./detailed_overall_impact_presentations/01_citizens_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/01_citizens_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/01_citizens_presentation/README.md) |
| **19** | Detailed Overall Impact | [**02. Органы Безопасности и Правопорядка**](./detailed_overall_impact_presentations/02_security_organs_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/02_security_organs_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/02_security_organs_presentation/README.md) |
| **20** | Detailed Overall Impact | [**03. Малый, Средний и Крупный Бизнес**](./detailed_overall_impact_presentations/03_business_sme_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/03_business_sme_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/03_business_sme_presentation/README.md) |
| **21** | Detailed Overall Impact | [**04. Рекламодатели и Бренды**](./detailed_overall_impact_presentations/04_advertisers_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/04_advertisers_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/04_advertisers_presentation/README.md) |
| **22** | Detailed Overall Impact | [**05. Рекламные Платформы и AdTech**](./detailed_overall_impact_presentations/05_ad_platforms_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/05_ad_platforms_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/05_ad_platforms_presentation/README.md) |
| **23** | Detailed Overall Impact | [**06. Государство и Опорная Сеть**](./detailed_overall_impact_presentations/06_government_infra_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/06_government_infra_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/06_government_infra_presentation/README.md) |
| **24** | Detailed Overall Impact | [**07. Независимые ИТ-Разработчики**](./detailed_overall_impact_presentations/07_it_developers_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/07_it_developers_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/07_it_developers_presentation/README.md) |
| **25** | Detailed Overall Impact | [**08. Банки, Финтех и Цифровой Рубль**](./detailed_overall_impact_presentations/08_fintech_banking_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/08_fintech_banking_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/08_fintech_banking_presentation/README.md) |
| **26** | Detailed Overall Impact | [**09. Межотраслевая Синергия**](./detailed_overall_impact_presentations/09_cross_synergies_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/09_cross_synergies_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/09_cross_synergies_presentation/README.md) |
| **27** | Detailed Overall Impact | [**10. Дорожная Карта Миграции**](./detailed_overall_impact_presentations/10_migration_roadmap_presentation/README.md) | 15 | *Отраслевой проект (для адаптации)* | [▶ Открыть web_deck](./detailed_overall_impact_presentations/10_migration_roadmap_presentation/generated/outputs/web_deck/index.html) | [README.md](./detailed_overall_impact_presentations/10_migration_roadmap_presentation/README.md) |

</details>

---

## 📁 Структура хранилища

Подробная файловая структура хранилища, описание директорий и двухслойная архитектура стилей представлены в [Руководстве по репозиторию](./docs/REPOSITORY_GUIDE.md).

---

## 📚 Аналитические Белые Книги (Whitepapers Suite)

В директории [shared_docs/whitepapers/](./shared_docs/whitepapers/README.md) доступен полный комплект из **двенадцати фундаментальных аналитических и научно-технических документов (Whitepapers)** и генерального архитектурного документа платформы. На данный момент **7 Белых Книг полностью готовы к публикации** (№ 06–07 оформлены по представительскому полиграфическому стандарту А4, № 08–12 — в интерактивном формате Markdown для [веб-вьюера](https://data-independence-network.github.io/presentations/viewer.html)); первые 5 документов (№ 01–05) оставлены в виде концептуальных черновых проектов на доработку сторонними разработчиками на базе практических прототипов в будущем:

| № | Документ | Тематика Белой Книги | Статус готовности | Формат |
| :---: | :--- | :--- | :--- | :---: |
| **01** | [**01_platform_overview_whitepaper**](./shared_docs/whitepapers/01_platform_overview_whitepaper.md) | Смена парадигмы децентрализации, трехуровневая топология и -90% TCO ЦОД | *Концептуальный черновик (ожидает прототипов)* | [PDF](./shared_docs/whitepapers/01_platform_overview_whitepaper.pdf) |
| **02** | [**02_applications_suite_whitepaper**](./shared_docs/whitepapers/02_applications_suite_whitepaper.md) | Алгоритмический стек 5 флагманских сервисов и Branch-шлюзы ЕСИА/СБП/ГИС ЖКХ | *Концептуальный черновик (ожидает прототипов)* | [PDF](./shared_docs/whitepapers/02_applications_suite_whitepaper.pdf) |
| **03** | [**03_engineering_architecture_whitepaper**](./shared_docs/whitepapers/03_engineering_architecture_whitepaper.md) | Инженерная архитектура: SQLite на Листе, «читай отовсюду, пиши только своё», P2P, TreeSearch, FSM смарт-контракты | *Концептуальный черновик (ожидает прототипов)* | [PDF](./shared_docs/whitepapers/03_engineering_architecture_whitepaper.pdf) |
| **04** | [**04_ecosystem_impact_whitepaper**](./shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md) | Отраслевой эффект для 10 категорий участников, расчет TCO и 4 фазы миграции | *Концептуальный черновик (ожидает прототипов)* | [PDF](./shared_docs/whitepapers/04_ecosystem_impact_whitepaper.pdf) |
| **05** | [**05_sovereign_governance_whitepaper**](./shared_docs/whitepapers/05_sovereign_governance_whitepaper.md) | Правовое обоснование 152-ФЗ, ГОСТ Р 34.10, госинфраструктура и БРИКС+ | *Концептуальный черновик (ожидает прототипов)* | [PDF](./shared_docs/whitepapers/05_sovereign_governance_whitepaper.pdf) |
| **06** | [**06_cbr_smart_contracts_fsm_whitepaper**](./shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md) | Смарт-контракты Банка России, детерминированные автоматы FSM O(1) и Цифровой рубль | **Готова к публикации** | [PDF](./shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.pdf) |
| **07** | [**07_social_economic_ratings_whitepaper**](./shared_docs/whitepapers/07_social_economic_ratings_whitepaper.md) | Социальный и экономический рейтинги: открытый социальный рейтинг вкладов по темам и экономический рейтинг Банка России | **Готова к публикации** | [PDF](./shared_docs/whitepapers/07_social_economic_ratings_whitepaper.pdf) |
| **08** | [**08_votecube_whitepaper**](./shared_docs/whitepapers/08_votecube_whitepaper.md) | «КубГолос» — измерять и складывать: форма 100 б.п., счётчики на Ветках, блоки эпох, 3 шкалы консенсуса | **Готова к публикации** | [Markdown](./shared_docs/whitepapers/08_votecube_whitepaper.md) |
| **09** | [**09_sapoto_whitepaper**](./shared_docs/whitepapers/09_sapoto_whitepaper.md) | «Забота» — вкладывать и просматривать: самозапечатывающиеся страницы, треды, свидетельства Опыта, социальный рейтинг | **Готова к публикации** | [Markdown](./shared_docs/whitepapers/09_sapoto_whitepaper.md) |
| **10** | [**10_gogetter_whitepaper**](./shared_docs/whitepapers/10_gogetter_whitepaper.md) | «Деловой» — исполнять и связывать: Дело как хранилище и контракт, теги, мандатный API, L2, связка рейтингов | **Готова к публикации** | [Markdown](./shared_docs/whitepapers/10_gogetter_whitepaper.md) |
| **11** | [**11_uratur_whitepaper**](./shared_docs/whitepapers/11_uratur_whitepaper.md) | «УраТур» — автономное планирование путешествий: P2P-бронирование, динамическое расписание, офлайн-маршруты и распределенная экономика гостеприимства | **Готова к публикации** | [Markdown](./shared_docs/whitepapers/11_uratur_whitepaper.md) |
| **12** | [**12_ecosystem_whitepaper**](./shared_docs/whitepapers/12_ecosystem_whitepaper.md) | «Экосистема приложений прямого владения данными»: архитектурная синергия флагманских сервисов, единый контур доверия и сквозная связность через внешние ключи | **Готова к публикации** | [Markdown](./shared_docs/whitepapers/12_ecosystem_whitepaper.md) |
| **DOC** | **Технический документ платформы «Турбаза»** | Сводный фундаментальный документ архитектуры распределенных вычислений и суверенных данных | Архитектурный фундамент | [PDF](./shared_docs/Технический%20документ%20платформы%20Турбаза.pdf) |

Все Markdown-версии Белых Книг доступны для чтения в веб-браузере через интерактивный [Веб-вьюер Markdown](https://data-independence-network.github.io/presentations/viewer.html) с автоматическим рендерингом формул KaTeX и диаграмм Mermaid.

---

## 🛠️ Техническое руководство по репозиторию

Подробная инженерная информация об устройстве Git-репозитория, файловой структуре, скриптах установки системных зависимостей (`install_build_dependencies.sh`, `install_regen_dependencies.sh`), командах автоматизации и сборки NPM Workspaces (`rebuild-*`, `regen-*`, `check-decks`), а также ключевых архитектурных инвариантах вынесена в специализированный документ:  
👉 **[Руководство по архитектуре, сборке и инструментарию репозитория (docs/REPOSITORY_GUIDE.md)](./docs/REPOSITORY_GUIDE.md)**

