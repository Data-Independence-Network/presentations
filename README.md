# Платформа «Турбаза» — Цифровая экосистема прямого владения данными и государственного суверенитета

This repository presents platform Turbase and is geared towards implementation in Russian  Federation and is partially complete for continuation of work during platform implementation.  Developers from around the world are invited to fork this repository, translate it and adopt to their needs.

## Полный комплекс презентационных, аналитических и инженерных материалов

<p align="left">
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/GitHub%20Pages-Смотреть%20онлайн%20в%201%20клик-success?style=for-the-badge&logo=githubpages&logoColor=white" alt="GitHub Pages"></a>
  <a href="https://data-independence-network.github.io/presentations/viewer.html"><img src="https://img.shields.io/badge/Белые%20Книги-Веб--вьюер%20Markdown-informational?style=for-the-badge&logo=markdown&logoColor=white" alt="Белые Книги"></a>
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/Слайдов-405%20(16:9)-blue?style=for-the-badge" alt="405 слайдов"></a>
  <a href="https://data-independence-network.github.io/presentations/"><img src="https://img.shields.io/badge/Нейроозвучка-DmitryNeural-purple?style=for-the-badge" alt="Нейроозвучка"></a>
</p>

> [!IMPORTANT]
> ### 🌐 САМЫЙ БЫСТРЫЙ СПОСОБ: СМОТРЕТЬ ОНЛАЙН В БРАУЗЕРЕ (1 КЛИК)
> **Все материалы комплекса опубликованы и доступны прямо в браузере без скачивания и установки:**  
> 👉 **[Открыть Единый Портал Презентаций «Турбаза» на GitHub Pages](https://data-independence-network.github.io/presentations/)**  
> 
> - **🖥️ Интерактивные слайд-деки** с поддержкой десктопа, мобильного ландшафта и портрета.
> - **🎙️ Синхронная дикторская нейроозвучка** (120 озвученных слайдов, 8 завершённых треков).
- **📑 [Встроенный вьюер Белых Книг (Markdown + KaTeX + Mermaid)](https://data-independence-network.github.io/presentations/viewer.html)** с адаптивным мобильным меню.

The Russian Federation is currently rebuilding its information infrastructure, driven by the need for cultural and civilizational survival in the age of AI. The technology stack presented here provides a distributed edge-native data architecture designed to ensure national digital sovereignty while guaranteeing direct information ownership for citizens and businesses. The complete documentation and interactive presentation materials are presented in Russian:

**Отечественная трехуровневая распределенная цифровая платформа прямого владения данными нового поколения** (*вычисления на устройствах пользователей, доказательства с нулевым разглашением, единый источник истины, 152-ФЗ, экономика API 1/N*).

---

## ⚡ БЫСТРЫЙ СТАРТ: КАК СМОТРЕТЬ ПРЕЗЕНТАЦИИ

### Вариант 1 (Самый быстрый, 1 клик): Онлайн на GitHub Pages
Ничего скачивать, клонировать или запускать не требуется. Просто перейдите по ссылке:  
👉 **[https://data-independence-network.github.io/presentations/](https://data-independence-network.github.io/presentations/)**

### Вариант 2: Локально на компьютере (офлайн)
> [!TIP]
> **Для локального просмотра ничего генерировать НЕ нужно!**  
> Все завершённые веб-презентации (`web_deck/index.html`) и студийные аудиодорожки нейроозвучки (`.mp3`) **уже скомпилированы и зафиксированы в репозитории**. Никаких внешних API-ключей, Node.js или фоновых компиляций не требуется.

#### 📋 Системные требования для локального просмотра:
- **Только Python 3** (уже предустановлен в macOS и большинстве дистрибутивов Linux) для встроенного HTTP-сервера.
- **Любой современный веб-браузер** (Safari, Chrome, Firefox, Edge).

#### 🚀 Запуск за 1 секунду:
В корне репозитория выполните команду:
```bash
./start_presentation.sh
```
- Скрипт автоматически откроет в браузере:  
  👉 **`http://localhost:8080/`** — **Единый портал презентационного комплекса «Турбаза»**.
- **В портале отображаются 8 завершённых треков с полной синхронной нейроозвучкой (120 слайдов)**:
  1. **Эксплейнер 1**: *Парадигмальный сдвиг и суверенитет данных* (15 слайдов)
  2. **Эксплейнер 2**: *Анатомия и Архитектура платформы* (15 слайдов)
  3. **Эксплейнер 3**: *Суверенная экономика и смарт-контракты* (15 слайдов)
  4. **Мастер-обзор 1**: *Архитектура Цифрового Суверенитета (Leaf-Branch-Trunk)* (15 слайдов)
  5. **Мастер-обзор 2**: *Матрица ценности для заинтересованных сторон* (15 слайдов)
  6. **Приложение 1**: *«КубГолос»: измерять и складывать* (15 слайдов)
  7. **Приложение 2**: *«Забота»: вкладывать и просматривать* (15 слайдов)
  8. **Приложение 3**: *«Деловой»: исполнять и связывать* (15 слайдов)
- На карточке любой презентации нажмите **«▶ Смотреть (15 сл.)»** для запуска интерактивного плеера с озвучкой или **«📄 PDF»** для конспекта.
- Чтобы вернуться из любой презентации обратно в портал, нажмите на логотип **`🌲 ТУРБАЗА`** в левом верхнем углу плеера.

> [!TIP]
> **💡 Управление звуком (как включить диктора на первом слайде):**  
> Из-за политик безопасности современных браузеров (Safari / Chrome на macOS), запрещающих сайтам автоматически включать звук на новой вкладке без взаимодействия с пользователем, озвучка на 1-м слайде активируется очень просто:  
> - **Либо нажмите кнопку «🔊 Озвучка» два раза** в верхнем меню (первое нажатие даёт разрешение браузеру, второе запускает воспроизведение дикторской речи);  
> - **Либо кликните в любом месте экрана / по плашке «▶ Нажмите для запуска озвучки»** (или нажмите клавишу `Пробел`);  
> - *(Чтобы звук запускался мгновенно и без кликов: в Safari откройте меню «Safari» $\to$ «Настройки для этого веб-сайта» $\to$ «Автовоспроизведение: Разрешить все»).*

---

> [!NOTE]
> Скрипты установки системных зависимостей сборки (`install_build_dependencies.sh`, `install_regen_dependencies.sh`), экспорт видео и синтез новой нейроозвучки вынесены в специализированное [Руководство по репозиторию](./docs/REPOSITORY_GUIDE.md).

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

---

## 🌐 Приглашение к открытой разработке, созданию прототипов и форкам репозитория (Open Call for Contributors)

Архитектурный фундамент, теоретические модели и нормативно-правовая база платформы «Турбаза» полностью зафиксированы в опубликованных материалах:
- **8 полностью завершённых презентационных треков со студийной нейроозвучкой** (120 слайдов);
- **2 флагманских прикладных трека** в процессе подготовки к согласованию с Белыми Книгами 11 и 12;
- **17 концептуальных инженерных и отраслевых проектов** (255 слайдов);
- **7 готовых к публикации фундаментальных Белых Книг** (№ 06–12), детально описывающих экономику API 1/N, детерминированные смарт-контракты FSM O(1) Банка России, рейтинги вкладов и прикладные архитектуры флагманских сервисов;
- **5 концептуальных проектов Белых Книг** (№ 01–05), черновой базис которых оставлен для практического наполнения на основе замеров производительности.

Теоретический этап проектирования платформы завершён. Следующий этап жизненного цикла экосистемы — **создание действующих программных прототипов** и переход от архитектурных чертежей к кодовым реализациям.

Автор платформы **Артём Владимирович Шамсутдинов** приглашает отечественное и международное сообщество независимых разработчиков, архитекторов распределённых систем, академические группы и энтузиастов суверенных технологий к созданию форков, прототипированию компонентов и независимому развитию экосистемы.

### 🛡️ Назначение патента США US10902016B2: гарантия свободы открытой разработки

Патент США **US10902016B2** получен автором исключительно в качестве **защитного правового барьера (Defensive Patent)**:
- Цель патента — зафиксировать приоритет архитектуры распределённого прямого владения данными и гарантировать невозможность патентного рейдерства или блокировки открытой разработки со стороны транснациональных IT-корпораций в американской юрисдикции;
- Патент **не накладывает никаких ограничений** на свободное создание форков, разработку суверенного программного обеспечения, развёртывание независимой инфраструктуры и промышленное внедрение платформы в Российской Федерации, странах ЕАЭС, БРИКС+ и любых других юрисдикциях мира;
- Разработка, форки и внедрение полностью открыты для независимых участников.

### ⚖️ Глобальный инвариант ядра и суверенная вариативность серверного контура

Архитектура «Турбаза» построена на фундаментальном разделении двух технологических уровней:

1. **Глобальный инвариант ядра (уровень «Листа» / Leaf):**
   - Стандарт локальных реляционных микрохранилищ на кремнии пользователей (SQLite / AIRport), протоколы верификации транзакций без централизованных посредников, прямая P2P-маршрутизация и кросс-приложенная связность через внешние ключи должны оставаться едиными и неизменными по всему миру;
   - Это гарантирует непрерывную совместимость пользовательских данных и трансграничную автономию гражданина независимо от используемого устройства и географического положения.

2. **Суверенная вариативность серверного контура (уровни «Ветки» / Branch и «Ствола» / Trunk):**
   - Серверная инфраструктура агрегации, ретрансляции и синхронизации проектируется суверенной для каждого государства;
   - В Российской Федерации контур «Ветки» интегрируется с ГОСТ Р 34.10 / 34.12, платформами ЕСИА, СБП, ГИС ЖКХ и контуром Цифрового рубля Банка России (152-ФЗ);
   - В других странах и интеграционных объединениях (ЕАЭС, БРИКС+, Латинская Америка, Азия) серверный контур адаптируется под национальные законы о персональных данных, государственные системы идентификации и локальные платёжные регуляторы.

### 🚀 Приоритетные направления для контрибьюторов и форков

Сообществу разработчиков предлагается принять участие в следующих ключевых направлениях:

1. **Разработка прототипа движка «Листа» (Leaf Core Engine):**
   - Создание базовой библиотеки на TypeScript / Rust / Go / Kotlin / Swift с локальным хранением таблиц в SQLite;
   - Реализация механизма изолированной записи («пиши только своё, читай отовсюду») и версионирования реляционных дельт;
2. **Прототипы P2P-маршрутизации и прямого обмена:**
   - Реализация прямого обмена транзакциями между смартфонами и ПК через WebRTC / QUIC без промежуточного сохранения на серверах;
3. **Реализация FSM Смарт-контрактов O(1):**
   - Разработка легковесного верификатора детерминированных конечных автоматов для микротранзакций и безопасного исполнения сделок без виртуальных машин типа EVM;
4. **Практическое наполнение и финализация Белых Книг 01–05:**
   - Проведение бенчмарков пропускной способности, задержек и ресурсоёмкости на созданных прототипах;
   - Включение полученных замеров в концептуальные проекты Белых Книг 01–05 и подготовка их финальных редакций к публикации;
5. **Финализация и озвучка презентаций 04–05 приложений и 01–07 архитектуры:**
   - Уточнение технических деталей и синтез студийной дикторской озвучки на базе работающего программного кода;
6. **Национальные адаптеры Ветки:**
   - Проектирование и реализация шлюзов под регуляторные стандарты суверенных юрисдикций.

Форкайте репозиторий, создавайте прототипы, исследуйте распределённые архитектуры и вносите вклад в построение независимого цифрового суверенитета прямого владения данными!

---

## 🛠️ Техническое руководство по репозиторию

Подробная инженерная информация об устройстве Git-репозитория, файловой структуре, скриптах установки системных зависимостей (`install_build_dependencies.sh`, `install_regen_dependencies.sh`), командах автоматизации и сборки NPM Workspaces (`rebuild-*`, `regen-*`, `check-decks`), а также ключевых архитектурных инвариантах вынесена в специализированный документ:  
👉 **[Руководство по архитектуре, сборке и инструментарию репозитория (docs/REPOSITORY_GUIDE.md)](./docs/REPOSITORY_GUIDE.md)**

