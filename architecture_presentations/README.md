# Инженерная архитектура платформы «Турбаза» (Architecture Series)
## Фундаментальный 7-серийный технический комплекс глубокого инженерного погружения (105 слайдов)

> **Категория директории:** `architecture_presentations/`  
> **Количество презентаций:** 7 | **Всего слайдов:** 105  
> **Визуальный стиль:** Инженерный Чертеж (#0b0f19, Циан, Изумруд, Лайм, Янтарь, Ультрамарин, Аметист, Золото)  
> **Озвучка:** Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`, темп `-9%`, тон `-5Hz`)  
> **Мастер-план направления:** [`turbase_architecture_presentations_master_plan.md`](file:///Users/parents/Documents/presentations/architecture_presentations/turbase_architecture_presentations_master_plan.md)  

---

## 🎯 Обзор и миссия серии

Серия технических презентаций **«Архитектура платформы Турбаза»** (`architecture_presentations/`) представляет собой глубокий инженерный комплекс из **7 специализированных презентационных пакетов**, предназначенный для главных архитекторов, CTO, техлидов и разработчиков распределенных систем.

Серия детально раскрывает устройство трехуровневой платформы прямого владения данными и цифрового суверенитета государства:
- **01. Топология и цифровой суверенитет:** Четыре ранга узлов (Лист, Ветка, Родительская Ветвь, Ствол), философия AIR, разграничение Data Plane и Control Plane.
- **02. Движок хранения Листа:** SQLite в режиме WAL, модель виртуальных хранилищ, трехколоночный первичный ключ (`RepositoryId`, `ActorId`, `RecordId`), составные внешние ключи, Bridge Entities, Anti-Linkability.
- **03. Каркас приложений (Framework):** Принцип «Read-Anywhere, Write-Self», песочница безопасности, декораторы и ORM, эволюция схем, TransactionLog.
- **04. Конвейер узла «Ветка»:** Трехстадийный конвейер (`PersistentQueue` $\to$ `ConcurrentMap` $\to$ `FileSystem`), Time-Traveling, Pruning, Hot/Cold синхронизация.
- **05. Сетевая маршрутизация и P2P:** Хранилища как асинхронный сигнальный сервер WebRTC, OIDC-аутентификация, TrueTime, сквозные туннели PassThroughConnection.
- **06. TreeSearch и аналитика:** Древовидные глобальные индексы, On-Device приватный поиск, дублирование метаданных «вверх» для федеративной аналитики и Disaster Recovery.
- **07. Криптоконтур, смарт-контракты и экономика API:** ГОСТ Р 34.12/34.10, постквантовая криптография (PQC), минимальные детерминированные FSM смарт-контракты, микро-блокчейны, состояние кошелька (Wallet State), Keyring, 152-ФЗ Zero-PII и микророялти 1/N.

---

## 🧭 Каталог презентаций серии

| № | Презентация | Фокус и ключевая тематика | Web Deck | Документация |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [**Выпуск 1: Трехуровневая топология прямого владения данными и парадигма Edge Computing**](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/README.md) | Глубокий технический разбор четырехуровневой древовидной иерархии платформы «Турбаза» (Лист → Ветка → Родительская Ветвь → Ствол), архитекту... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/01_topology_and_sovereignty/README.md) |
| **02** | [**Выпуск 2: Архитектура узла «Лист»: СУБД, трехколоночная модель и составные ключи**](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/README.md) | Анализ внутреннего устройства узла «Лист»: использование единой встраиваемой реляционной СУБД SQLite в режиме WAL, модель виртуальных хранил... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/02_leaf_storage_engine/README.md) |
| **03** | [**Выпуск 3: Каркас приложений (Framework) и инструментарий разработчика**](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/README.md) | Исследование архитектуры прикладного каркаса (Framework) и Turbase SDK. Освещение фундаментального контракта «Read-Anywhere, Write-Self», пе... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/03_app_framework_and_sdk/README.md) |
| **04** | [**Выпуск 4: Архитектура узла «Ветка»: конвейер данных и надежность хранения**](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/README.md) | Подробное описание архитектуры промежуточного узла «Ветка»: трехстадийный конвейер обработки данных (PersistentQueue → ConcurrentMap → FileS... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/04_branch_pipeline_and_storage/README.md) |
| **05** | [**Выпуск 5: Сетевая маршрутизация, P2P и сквозные соединения**](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/README.md) | Разбор сетевого стека платформы: использование хранилищ в качестве асинхронного сигнального сервера для установки WebRTC P2P-соединений, OID... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/05_routing_p2p_and_passthrough/README.md) |
| **06** | [**Выпуск 6: Древовидный глобальный поиск (TreeSearch) и федеративная аналитика**](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/README.md) | Презентация технологии глобального поиска TreeSearch: многоуровневая индексация по древовидной топологии, конфиденциальный поиск на клиентск... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/06_tree_search_and_analytics/README.md) |
| **07** | [**Выпуск 7: Криптографический контур, смарт-контракты и экономика API**](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/README.md) | Финальный выпуск инженерной серии: криптографический периметр ГОСТ Р 34.12/34.10, постквантовая защита (PQC), минимальные FSM смарт-контракты, микро-блокчейны и экономика API... | [`web_deck/`](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/architecture_presentations/07_cryptography_and_api_economy/README.md) |

---

## 🚀 Быстрый запуск и просмотр

### Просмотр через единый веб-сервер
Запустите сервер в корне хранилища:
```bash
./start_presentation.sh
```
После запуска все презентации доступны по локальным ссылкам вида:
```
http://localhost:8080/architecture_presentations/<имя_презентации>/generated/outputs/web_deck/
```

---

## ⚡ Сборка и автоматизация

Все презентации направления поддерживают инкрементальную сборку на 100% детерминированной основе:

### Скрипты инкрементальной сборки (`package.json`):

- **Полная сборка всей категории (Offline Rebuild):** `npm run rebuild`
- **Полная регенерация с озвучкой (Neural TTS):** `npm run regen`
- **Точечная сборка отдельных презентаций:**
  - `npm run rebuild-01`
  - `npm run rebuild-arch-01`
  - `npm run rebuild-topology`
  - `npm run rebuild-02`
  - `npm run rebuild-arch-02`
  - `npm run rebuild-leaf-storage`
  - `npm run rebuild-03`
  - `npm run rebuild-arch-03`
  - `npm run rebuild-app-framework`
  - `npm run rebuild-04`
  - `npm run rebuild-arch-04`
  - `npm run rebuild-branch-pipeline`
  - `npm run rebuild-05`
  - `npm run rebuild-arch-05`
  - `npm run rebuild-routing-p2p`
  - `npm run rebuild-06`
  - `npm run rebuild-arch-06`
  - `npm run rebuild-tree-search`
  - `npm run rebuild-07`
  - `npm run rebuild-arch-07`
  - `npm run rebuild-cryptography`

### Сборка из корня хранилища:
```bash
# Офлайн пересборка всех презентаций этой категории:
npm run rebuild-arch

# Регенерация с синтезом новой речи через Neural TTS:
npm run regen-arch
```

---

## 🔒 Архитектурные инварианты направления

1. **Автономность стилей (Style Isolation):** Каждая презентация владеет собственной изолированной таблицей стилей в папке `docs/` и не имеет общих runtime-зависимостей с соседними презентациями.
2. **Инвариант Zero-Overflow:** Верстка каждого слайда гарантирует отсутствие вертикальной прокрутки (`scrollHeight <= clientHeight`) во всех целевых разрешениях.
3. **Единый источник истины:** Вся структура слайдов, разметка и дикторский текст генерируются строго из `docs/presentation_deck.md`.
4. **Хранилища (AIR):** Все данные пользователей формируют децентрализованную сеть Автономных Взаимозависимых Хранилищ.
5. **Авторские заметки как источник замысла:** Все архитектурные концепции, FSM смарт-контракты и топологические модели строго отражают авторские заметки разработчика в [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) ([`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), словарь семантических меток ([`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md)) и мастер-спецификацию [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).
