# Платформа «Турбаза» — Суверенная цифровая экосистема прямого владения данными
## Полный комплекс презентационных, аналитических и инженерных материалов

The Russian Federation is currently rebuilding its information infrastructure, driven by the need for cultural and civilizational survival in the age of AI. The technology stack presented here proposes building a sovereign "data internet" that can help achieve digital sovereignty goals. We are very glad and proud to present these informational materials in Russian first:

**Отечественная трехуровневая распределенная цифровая платформа прямого владения данными нового поколения** (*Edge Computing, Zero-Knowledge Proofs, Single Source of Truth, 152-ФЗ Zero-PII, экономика API 1/N*).

---

## ⚡ БЫСТРЫЙ СТАРТ: ПРОСМОТР ПРЕЗЕНТАЦИЙ БЕЗ ГЕНЕРАЦИИ (1 КЛИК)

> [!TIP]
> **Для просмотра презентаций ничего генерировать НЕ нужно!**  
> Все завершённые веб-презентации (`web_deck/index.html`) и студийные аудиодорожки нейроозвучки (`.mp3`) **уже скомпилированы и зафиксированы в репозитории**. Никаких внешних API-ключей, Node.js или фоновых компиляций не требуется.

### 📋 Системные требования для просмотра:
- **Только Python 3** (уже предустановлен в macOS и большинстве дистрибутивов Linux) для запуска встроенного локального веб-сервера.
- **Любой современный веб-браузер** (Safari, Chrome, Firefox, Edge).

### 🚀 Запуск за 1 секунду:
В корне репозитория выполните команду:
```bash
./start_presentation.sh
```
- Скрипт проверит порт (по умолчанию `8080`), при необходимости мягко освободит зависший процесс и автоматически откроет в браузере:  
  👉 **`http://localhost:8080/`** — **Единый портал презентационного комплекса «Турбаза»**.
- **В портале по умолчанию активен режим «🌟 Только готовые с озвучкой»**: отображаются 5 завершённых треков (75 слайдов с полной синхронной нейроозвучкой):
  1. **Эксплейнер 1**: *Парадигмальный сдвиг и суверенитет данных* (15 слайдов)
  2. **Эксплейнер 2**: *Анатомия и Архитектура платформы* (15 слайдов)
  3. **Эксплейнер 3**: *Суверенная экономика и смарт-контракты* (15 слайдов)
  4. **Мастер-обзор 1**: *Архитектура Цифрового Суверенитета (Leaf-Branch-Trunk)* (15 слайдов)
  5. **Мастер-обзор 2**: *Матрица Ценности для Стейкхолдеров* (15 слайдов)
- На карточке любой презентации нажмите **«▶ Смотреть (15 сл.)»** для запуска интерактивного плеера с озвучкой или **«📄 PDF»** для конспекта.
- Чтобы вернуться из любой презентации обратно в портал, нажмите на логотип **`🌲 ТУРБАЗА`** в левом верхнем углу плеера.

---

### 🛠️ Когда нужны установочные скрипты зависимостей?
Скрипты установки требуются **ТОЛЬКО** в случае, если вы хотите модифицировать слайды, экспортировать MP4-видео или перезаписать нейроозвучку:

1. **[`./install_build_dependencies.sh`](file:///Users/parents/Documents/presentations/install_build_dependencies.sh) — Базовое окружение офлайн-сборки (Offline Rebuild):**
   - **Что устанавливает:** `Node.js`, `npm`, `Playwright` + Chromium, `FFmpeg` и системные шрифты (PT Astra Sans/Mono).
   - **Зачем нужно:** Для запуска команды `npm run rebuild-all` (автономный экспорт слайдов в PNG, генерация раздаточных PDF и сборка MP4-видео с использованием уже закоммиченного мастер-аудио **без обращения к внешним API**).
2. **[`./install_regen_dependencies.sh`](file:///Users/parents/Documents/presentations/install_regen_dependencies.sh) — Синтез новой речи через Neural TTS:**
   - **Что устанавливает:** Библиотеку `node-edge-tts` для нейросинтеза русской речи (`ru-RU-DmitryNeural`).
   - **Зачем нужно:** Только при редактировании текста диктора в слайдах для синтеза нового звука через `npm run regen-overall`. Требует рабочий API-ключ в файле `text_to_speech_mcp_Open_API_key.txt`.

---

## 📊 Масштаб презентационного комплекса

- **27 полноформатных презентаций** с глубокой инженерной и экономической проработкой.
- **405 широкоформатных слайдов (16:9, 1920x1080)** с мобильной билборд-типографикой и нулевым скроллом (Zero-Overflow).
- **~5.5 часов профессиональной дикторской озвучки** на базе Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`).
- **6 аналитических Белых Книг (Whitepapers)** и генеральный технический документ.
- **База авторских заметок разработчика (`shared_docs/comments/`)** и семантический словарь меток ([`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md)).
- **100% автономная офлайн-сборка (Offline Rebuild):** все мастер-аудиодорожки зафиксированы в Git, сборка возможна без интернета и внешних API-ключей.

---

## 🧭 Пять основных направлений экосистемы

| Направление экосистемы | Директория | Презентаций | Слайдов | Ключевой концептуальный фокус | Документация |
| :--- | :--- | :---: | :---: | :--- | :---: |
| **Platform Overview (Базовый обзор)** | `platform_overview/` | **3** | **45** | Кризис централизованных облаков, смена парадигмы, 4 ранга узлов, справедливость 1/N | [`Обзор серии ➔`](file:///Users/parents/Documents/presentations/platform_overview/README.md) |
| **Applications Suite (Флагманские сервисы)** | `applications_presentations/` | **5** | **75** | «Деловой», «КубГолос», «Забота», «УраТур», реестр МСП/ЖКХ, связность через внешние ключи | [`Обзор серии ➔`](file:///Users/parents/Documents/presentations/applications_presentations/README.md) |
| **Architecture Deep-Dive (Инженерная архитектура)** | `architecture_presentations/` | **7** | **105** | СУБД Листа, конвейер Ветки, P2P-сигналинг, TreeSearch, ГОСТ/PQC, Zero-PII, FSM смарт-контракты | [`Обзор серии ➔`](file:///Users/parents/Documents/presentations/architecture_presentations/README.md) |
| **Master Overview Track (Мастер-презентации)** | `overall_presentations/` | **2** | **30** | Суверенная архитектура прямого владения данными и матрица ценности 6 стейкхолдеров | [`Обзор серии ➔`](file:///Users/parents/Documents/presentations/overall_presentations/README.md) |
| **Detailed Ecosystem Impact (Отраслевой анализ)** | `detailed_overall_impact_presentations/` | **10** | **150** | Индивидуальный разбор выгод (PROs), рисков (CONs), компенсаций и KPI для 10 участников | [`Обзор серии ➔`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/README.md) |


<details>
<summary><b>🗺️ Развернуть полный реестр всех 27 презентаций платформы (405 слайдов)</b></summary>

| № | Направление | Презентация | Слайдов | Интерактивный плеер | Документация |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **01** | Platform Overview | [**01. Манифест и Смена парадигмы**](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/README.md) |
| **02** | Platform Overview | [**02. Анатомия и Архитектура**](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/README.md) |
| **03** | Platform Overview | [**03. Справедливая экономика данных и ИИ**](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/README.md) |
| **04** | Applications Suite | [**01. «Деловой»**](file:///Users/parents/Documents/presentations/applications_presentations/01_delovoy_app_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/applications_presentations/01_delovoy_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/01_delovoy_app_presentation/README.md) |
| **05** | Applications Suite | [**02. «КубГолос»**](file:///Users/parents/Documents/presentations/applications_presentations/02_kubgolos_app_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/applications_presentations/02_kubgolos_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/02_kubgolos_app_presentation/README.md) |
| **06** | Applications Suite | [**03. «Забота»**](file:///Users/parents/Documents/presentations/applications_presentations/03_zabota_app_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/applications_presentations/03_zabota_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/03_zabota_app_presentation/README.md) |
| **07** | Applications Suite | [**04. «УраТур»**](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/README.md) |
| **08** | Applications Suite | [**05. «Локальный реестр МСП и ЖКХ»**](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/README.md) |
| **09** | Architecture Deep-Dive | [**01. Топология и Edge Computing**](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/README.md) |
| **10** | Architecture Deep-Dive | [**02. Движок хранения узла «Лист»**](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/README.md) |
| **11** | Architecture Deep-Dive | [**03. Каркас приложений и SDK**](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/README.md) |
| **12** | Architecture Deep-Dive | [**04. Конвейер узла «Ветка»**](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/README.md) |
| **13** | Architecture Deep-Dive | [**05. P2P-маршрутизация и туннели**](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/README.md) |
| **14** | Architecture Deep-Dive | [**06. TreeSearch и аналитика**](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/README.md) |
| **15** | Architecture Deep-Dive | [**07. Криптоконтур, смарт-контракты и Экономика API**](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/README.md) |
| **16** | Master Overview | [**01. Суверенная Архитектура**](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/README.md) |
| **17** | Master Overview | [**02. Выгоды Стейкхолдеров**](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/README.md) |
| **18** | Detailed Overall Impact | [**01. Граждане и Домохозяйства**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/01_citizens_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/01_citizens_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/01_citizens_presentation/README.md) |
| **19** | Detailed Overall Impact | [**02. Органы Безопасности и Правопорядка**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/02_security_organs_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/02_security_organs_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/02_security_organs_presentation/README.md) |
| **20** | Detailed Overall Impact | [**03. Малый, Средний и Крупный Бизнес**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/03_business_sme_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/03_business_sme_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/03_business_sme_presentation/README.md) |
| **21** | Detailed Overall Impact | [**04. Рекламодатели и Бренды**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/04_advertisers_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/04_advertisers_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/04_advertisers_presentation/README.md) |
| **22** | Detailed Overall Impact | [**05. Рекламные Платформы и AdTech**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/05_ad_platforms_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/05_ad_platforms_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/05_ad_platforms_presentation/README.md) |
| **23** | Detailed Overall Impact | [**06. Государство и Опорная Сеть**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/06_government_infra_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/06_government_infra_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/06_government_infra_presentation/README.md) |
| **24** | Detailed Overall Impact | [**07. Независимые ИТ-Разработчики**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/07_it_developers_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/07_it_developers_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/07_it_developers_presentation/README.md) |
| **25** | Detailed Overall Impact | [**08. Банки, Финтех и Цифровой Рубль**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/08_fintech_banking_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/08_fintech_banking_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/08_fintech_banking_presentation/README.md) |
| **26** | Detailed Overall Impact | [**09. Межотраслевая Синергия**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/09_cross_synergies_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/09_cross_synergies_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/09_cross_synergies_presentation/README.md) |
| **27** | Detailed Overall Impact | [**10. Дорожная Карта Миграции**](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/10_migration_roadmap_presentation/README.md) | 15 | [`▶ Открыть web_deck`](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/10_migration_roadmap_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/detailed_overall_impact_presentations/10_migration_roadmap_presentation/README.md) |

</details>

---

## 📁 Структура хранилища

```
presentations/
├── platform_overview/                          # 3 концептуальных эксплейнера (Базовый обзор и смена парадигмы)
├── applications_presentations/                 # 5 флагманских сервисов («Деловой», «КубГолос», «Забота», «УраТур», МСП)
├── architecture_presentations/                 # 7 выпусков глубокой инженерной архитектуры (Топология, Лист, СУБД, Ветка, P2P, TreeSearch, FSM смарт-контракты)
├── overall_presentations/                      # 2 мастер-презентации верхнего уровня + Whitepaper Blueprints
├── detailed_overall_impact_presentations/      # 10 специализированных отраслевых презентаций по стейкхолдерам
├── shared_docs/                                # Мастер-спецификации платформы, Белые Книги и база заметок разработчика (LABELS.md)
├── shared_templates/                           # Эталонные дизайн-системы и шаблоны слайдов
├── scripts/                                    # Глобальный движок сборки (Playwright, TTS, FFmpeg, PDF, HTML)
├── package.json                                # Корневой диспетчер сборки (NPM Workspaces)
└── start_presentation.sh                       # Локальный веб-сервер для интерактивного просмотра
```

---

## 📚 Аналитические Белые Книги (Whitepapers Suite)

В директории [`shared_docs/whitepapers/`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/README.md) доступен полный комплект из 6 публикационных документов и генерального архитектурного документа:

| № | Документ | Тематика Белой Книги | Формат |
| :---: | :--- | :--- | :---: |
| **01** | [**01_platform_overview_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.md) | Смена парадигмы децентрализации, трехуровневая топология и -90% TCO ЦОД | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.pdf) |
| **02** | [**02_applications_suite_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/02_applications_suite_whitepaper.md) | Алгоритмический стек 5 флагманских сервисов и Branch-шлюзы ЕСИА/СБП/ГИС ЖКХ | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/02_applications_suite_whitepaper.pdf) |
| **03** | [**03_engineering_architecture_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/03_engineering_architecture_whitepaper.md) | Инженерная архитектура: SQLite на Листе, Read-Anywhere Write-Self, P2P, TreeSearch, FSM смарт-контракты | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/03_engineering_architecture_whitepaper.pdf) |
| **04** | [**04_ecosystem_impact_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md) | Отраслевой эффект для 10 категорий участников, расчет TCO и 4 фазы миграции | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.pdf) |
| **05** | [**05_sovereign_governance_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/05_sovereign_governance_whitepaper.md) | Правовое обоснование 152-ФЗ Zero-PII, ГОСТ Р 34.10, госинфраструктура и БРИКС+ | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/05_sovereign_governance_whitepaper.pdf) |
| **06** | [**06_cbr_smart_contracts_fsm_whitepaper**](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md) | Смарт-контракты Банка России, детерминированные автоматы FSM O(1) и Цифровой рубль | [PDF](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.pdf) |
| **DOC** | **Технический документ платформы «Турбаза»** | Сводный фундаментальный документ архитектуры распределенных вычислений и суверенных данных | [PDF](file:///Users/parents/Documents/presentations/shared_docs/Технический%20документ%20платформы%20Турбаза.pdf) |

---

## 🚀 Запуск единого портала презентаций

Запустите локальный сервер в корне хранилища:
```bash
./start_presentation.sh
```

Сервер автоматически откроет главную страницу каталога:
👉 **`http://localhost:8080/`**

Прямые ссылки на готовые треки со звуком:
- **1. Эксплейнер 1 (Смена парадигмы):**  
  `http://localhost:8080/platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/`
- **2. Эксплейнер 2 (Анатомия и Архитектура):**  
  `http://localhost:8080/platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/`
- **3. Эксплейнер 3 (Суверенная экономика и смарт-контракты):**  
  `http://localhost:8080/platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/`
- **4. Мастер-обзор 1 (Архитектура Цифрового Суверенитета):**  
  `http://localhost:8080/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/`
- **5. Мастер-обзор 2 (Матрица Выгод Стейкхолдеров):**  
  `http://localhost:8080/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/`

---

## 🛠️ Установка зависимостей (Debian / Ubuntu / macOS)

### 1. Установка базового окружения сборки (Offline Rebuild):
Устанавливает `ffmpeg`, `python3`, системные шрифты, `Node.js`, `npm`, `playwright` и headless Chromium:
```bash
./install_build_dependencies.sh
# или через npm:
npm run install:build
```

### 2. Установка окружения с синтезом речи (Neural TTS):
Настраивает голосовой синтез `node-edge-tts` и проверяет файл API-ключа `text_to_speech_mcp_Open_API_key.txt`:
```bash
./install_regen_dependencies.sh
# или через npm:
npm run install:regen
```

---

## ⚡ Автоматизация и сборка (NPM Workspaces)

### 🔨 Сборка целых направлений презентаций (Offline Rebuild, без затрат API):
```bash
# Серия Platform Overview (3 части):
npm run rebuild-platform-overview

# Флагманские приложения (5 сервисов):
npm run rebuild-apps

# Инженерная архитектура (7 выпусков):
npm run rebuild-arch

# Мастер-презентации и архитектурные отчеты:
npm run rebuild-overall

# Детальный анализ стейкхолдеров (10 презентаций):
npm run rebuild-impact

# Все Белые Книги (Whitepapers PDF):
npm run build-whitepapers

# Глобальная сборка абсолютно всех презентаций хранилища:
npm run rebuild-all
```

### 🎙️ Регенерация с синтезом новой речи через Neural TTS (требует ключ):
```bash
npm run regen-platform-overview
npm run regen-apps
npm run regen-arch
npm run regen-overall
npm run regen-impact
npm run regenerate-all
```

---

## 🔒 Ключевые архитектурные инварианты хранилища

1. **Автономия стилей (Strict Style Isolation):**  
   Каждая из 27 презентаций автономна и владеет собственной изолированной таблицей стилей в папке `docs/`. Презентации физически не зависят от общих runtime-стилей, исключая кросс-регрессии при правках.
2. **Инвариант нулевого переполнения (Zero-Overflow Invariant):**  
   Каждый из 405 слайдов протестирован в Playwright (1920x1080) и гарантирует строгое условие `scrollHeight <= clientHeight` — полное отсутствие вертикальных полос прокрутки.
3. **Единый источник истины (Single Source of Truth):**  
   Разметка слайдов, графические карточки и дикторский текст генерируются строго из `docs/presentation_deck.md`.
4. **Философия Автономных Хранилищ (AIR):**  
   Вся терминология данных строго отражает авторскую концепцию децентрализованных хранилищ: личные данные гражданина и семьи хранятся на локальном кремнии в реляционном виде (SQLite) и никогда не аккумулируются на внешних серверах.
