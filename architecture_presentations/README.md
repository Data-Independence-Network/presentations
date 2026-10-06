# Инженерная архитектура платформы «Турбаза» (Architecture Series)
## Фундаментальный 7-серийный технический комплекс глубокого инженерного погружения (105 слайдов)

> **Категория директории:** `architecture_presentations/`  
> **Количество презентаций:** 7 | **Всего слайдов:** 105  
> **Визуальный стиль:** Инженерный Чертеж (#0b0f19, Циан, Изумруд, Лайм, Янтарь, Ультрамарин, Аметист, Золото)  
> **Озвучка:** Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`, темп `-9%`, тон `-5Hz`)  
> **Мастер-план направления:** [turbase_architecture_presentations_master_plan.md](./turbase_architecture_presentations_master_plan.md)  

---

## 🎯 Обзор и миссия серии

Серия технических презентаций **«Архитектура платформы Турбаза»** (`architecture_presentations/`) представляет собой глубокий инженерный комплекс из **7 специализированных презентационных пакетов**, предназначенный для главных архитекторов, CTO, техлидов и разработчиков распределенных систем.

Серия детально раскрывает устройство трехуровневой платформы прямого владения данными и цифрового суверенитета государства:
- **01. Топология и цифровой суверенитет:** Четыре ранга узлов (Лист, Ветка, Родительская Ветвь, Ствол), философия AIR, разграничение плоскости данных и плоскости управления.
- **02. Движок хранения Листа:** SQLite в режиме WAL, модель виртуальных хранилищ, трехколоночный первичный ключ (`RepositoryId`, `ActorId`, `RecordId`), составные внешние ключи, Bridge Entities, защита от связывания.
- **03. Каркас приложений:** Принцип «Читай отовсюду, пиши только своё», песочница безопасности, декораторы и ORM, эволюция схем, TransactionLog.
- **04. Конвейер узла «Ветка»:** Трехстадийный конвейер (`PersistentQueue` $\to$ `ConcurrentMap` $\to$ `FileSystem`), путешествия во времени, очистка логов, Hot/Cold синхронизация.
- **05. Сетевая маршрутизация и P2P:** Хранилища как асинхронный сигнальный сервер WebRTC, OIDC-аутентификация, TrueTime, сквозные туннели PassThroughConnection.
- **06. TreeSearch и аналитика:** Древовидные глобальные индексы, приватный поиск на устройстве, дублирование метаданных «вверх» для федеративной аналитики и аварийное восстановление.
- **07. Криптоконтур, смарт-контракты и экономика API:** ГОСТ Р 34.12/34.10, постквантовая криптография (PQC), минимальные детерминированные FSM смарт-контракты, микро-блокчейны, состояние кошелька (Wallet State), Keyring, 152-ФЗ и микророялти 1/N.

---

## 🧭 Каталог презентаций серии

| № | Презентация | Фокус и ключевая тематика | Web Deck | Документация |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [**Выпуск 1: Трехуровневая топология прямого владения данными и парадигма вычислений на устройствах пользователей**](./01_topology_and_sovereignty/README.md) | Глубокий технический разбор четырехуровневой древовидной иерархии платформы «Турбаза» (Лист → Ветка → Родительская Ветвь → Ствол), архитекту... | [web_deck/](./01_topology_and_sovereignty/generated/outputs/web_deck/index.html) | [README.md](./01_topology_and_sovereignty/README.md) |
| **02** | [**Выпуск 2: Архитектура узла «Лист»: СУБД, трехколоночная модель и составные ключи**](./02_leaf_storage_engine/README.md) | Анализ внутреннего устройства узла «Лист»: использование единой встраиваемой реляционной СУБД SQLite в режиме WAL, модель виртуальных хранил... | [web_deck/](./02_leaf_storage_engine/generated/outputs/web_deck/index.html) | [README.md](./02_leaf_storage_engine/README.md) |
| **03** | [**Выпуск 3: Каркас приложений и инструментарий разработчика**](./03_app_framework_and_sdk/README.md) | Исследование архитектуры прикладного каркаса и Turbase SDK. Освещение фундаментального контракта «Читай отовсюду, пиши только своё», пе... | [web_deck/](./03_app_framework_and_sdk/generated/outputs/web_deck/index.html) | [README.md](./03_app_framework_and_sdk/README.md) |
| **04** | [**Выпуск 4: Архитектура узла «Ветка»: конвейер данных и надежность хранения**](./04_branch_pipeline_and_storage/README.md) | Подробное описание архитектуры промежуточного узла «Ветка»: трехстадийный конвейер обработки данных (PersistentQueue → ConcurrentMap → FileS... | [web_deck/](./04_branch_pipeline_and_storage/generated/outputs/web_deck/index.html) | [README.md](./04_branch_pipeline_and_storage/README.md) |
| **05** | [**Выпуск 5: Сетевая маршрутизация, P2P и сквозные соединения**](./05_routing_p2p_and_passthrough/README.md) | Разбор сетевого стека платформы: использование хранилищ в качестве асинхронного сигнального сервера для установки WebRTC P2P-соединений, OID... | [web_deck/](./05_routing_p2p_and_passthrough/generated/outputs/web_deck/index.html) | [README.md](./05_routing_p2p_and_passthrough/README.md) |
| **06** | [**Выпуск 6: Древовидный глобальный поиск (TreeSearch) и федеративная аналитика**](./06_tree_search_and_analytics/README.md) | Презентация технологии глобального поиска TreeSearch: многоуровневая индексация по древовидной топологии, конфиденциальный поиск на клиентск... | [web_deck/](./06_tree_search_and_analytics/generated/outputs/web_deck/index.html) | [README.md](./06_tree_search_and_analytics/README.md) |
| **07** | [**Выпуск 7: Криптографический контур, смарт-контракты и экономика API**](./07_cryptography_and_api_economy/README.md) | Финальный выпуск инженерной серии: криптографический периметр ГОСТ Р 34.12/34.10, постквантовая защита (PQC), минимальные FSM смарт-контракты, микро-блокчейны и экономика API... | [web_deck/](./07_cryptography_and_api_economy/generated/outputs/web_deck/index.html) | [README.md](./07_cryptography_and_api_economy/README.md) |

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

- **Полная сборка всей категории:** `npm run rebuild`
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
5. **Авторские заметки как источник замысла:** Все архитектурные концепции, FSM смарт-контракты и топологические модели строго отражают авторские заметки разработчика в [shared_docs/comments/](../shared_docs/comments) ([09-07_01_Architecture_overview.md](../shared_docs/comments/2026/09-07_01_Architecture_overview.md), [09-12_01_Smart_Contracts.md](../shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), словарь семантических меток ([LABELS.md](../shared_docs/comments/LABELS.md)) и мастер-спецификацию [Технический документ платформы Турбаза.md](../shared_docs/Технический%20документ%20платформы%20Турбаза.md).
