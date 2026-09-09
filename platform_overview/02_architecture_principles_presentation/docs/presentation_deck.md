---
presentation_id: "02_architecture_principles_presentation"
title: "Платформа «Турбаза»"
subtitle: "Анатомия и Архитектура: Хранилища, внешние связи, Общественные Оболочки API и микоризный Интернет данных"
header_title: "ТУРБАЗА"
header_subtitle: "Анатомия и Архитектура платформы"
theme: "platform_overview"
theme_class: "arch-principles-deck"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ЭКСПЛЕЙНЕР &middot; ЧАСТЬ 2 ИЗ 3</div>
    <h1 class="slide-title">АРХИТЕКТУРА ПЛАТФОРМЫ В ОБЩИХ ЧЕРТАХ</h1>
    <p class="slide-subtitle">Неделимые Хранилища, внешние реляционные связи, Общественные Оболочки API и микоризный Интернет данных</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout cyan">
        <strong>Архитектурный синтез автономности и связности:</strong>
        <p>Архитектура «Турбазы» решает фундаментальную дилемму распределенных систем: обеспечивает <strong>100% автономность клиентских узлов</strong> при сохранении бесшовной связности и кооперации приложений.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🧩</div>
          <h4>Единица знаний</h4>
          <p>Автономный контекст с ключами RepId, ActorId и RecordId.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🔗</div>
          <h4>Внешние связи</h4>
          <p>Ссылки на чужие базы с локальным кэшированием копий.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>Двухуровневая кооперация</h4>
          <p>SQL JOIN на уровне данных + Общественные Оболочки API.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🌲</div>
          <h4>Деревья и Federated OLAP</h4>
          <p>Древовидная подача данных и макросводка за 3 секунды.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="arch-blueprint-preview">
        <div class="arch-kpi-chip">
          <div class="kpi-val">&lt; 1 МС</div>
          <div class="kpi-label">Локальный отклик интерфейса из базы данных</div>
        </div>
        <div class="arch-kpi-chip">
          <div class="kpi-val">100%</div>
          <div class="kpi-label">Автономность узлов при обрыве внешних связей</div>
        </div>
        <div class="arch-kpi-chip">
          <div class="kpi-val">3 СЕК</div>
          <div class="kpi-label">Сбор общенациональной аналитики Federated OLAP по 128 байт</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Здравствуйте! Во второй части вводного эксплейнера платформы «Турбаза» мы познакомимся с архитектурой системы в общих чертах.
>
> Как построить цифровую среду, в которой миллионы пользовательских устройств работают полностью автономно, но при этом приложения могут бесшовно обмениваться данными и повторно использовать чужой код без центральных серверов?
>
> Сегодня мы рассмотрим базовые архитектурные примитивы: четырехуровневую топологию узлов, неделимые Хранилища, внешние реляционные связи, принцип «Read-Anywhere, Write-Self», древовидную подачу данных и микоризный Интернет данных. А углубленный инженерный разбор каждого механизма мы представим в отдельной детальной серии.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | РАСПРЕДЕЛЕННАЯ ТОПОЛОГИЯ</div>
    <h2 class="slide-title">ЧЕТЫРЕХУРОВНЕВАЯ ТОПОЛОГИЯ УЗЛОВ</h2>
    <p class="slide-subtitle">Четкое распределение обязанностей: от смартфона гражданина до федерального депозитария</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">💻</div>
          <h4>1. ЛИСТ (Leaf) &middot; Клиентский узел</h4>
          <p><strong>Первичные данные:</strong> Смартфон гражданина или терминал предприятия. Локальное хранилище SQLite, песочница софта, генерация ГОСТ-ЭЦП.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>2. ВЕТКА (Branch) &middot; Районный шлюз</h4>
          <p><strong>Муниципальный шлюз:</strong> Локализует до 80% районного трафика. Буферные очереди для спящих узлов и реестры открытых районных данных.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏢</div>
          <h4>3. ВЕТВЬ (ParentBranch) &middot; Регион</h4>
          <p><strong>Субъект РФ и ведомства:</strong> Серверы субъекта и защищенные контуры ФНС, МВД. Федеративная маршрутизация и ведомственные реестры.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🌲</div>
          <h4>4. СТВОЛ (Trunk) &middot; Депозитарий</h4>
          <p><strong>Федеральный депозитарий:</strong> Корневой реестр и суверенный международный шлюз стран БРИКС для трансграничных расчетов без SWIFT.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="topology-billboard-stack">
        <div class="topo-node topo-trunk">
          <div class="topo-badge">🌲 СТВОЛ (Trunk)</div>
          <div class="topo-details">
            <div class="topo-title">Федеральный Депозитарий &amp; Шлюз БРИКС</div>
            <div class="topo-subtitle">Корневой реестр и трансграничные расчеты без SWIFT</div>
          </div>
        </div>

        <div class="topo-connector">▼</div>

        <div class="topo-node topo-parent-branch">
          <div class="topo-badge">🏢 ВЕТВЬ (ParentBranch)</div>
          <div class="topo-details">
            <div class="topo-title">Субъект РФ / Ведомство (ФНС, МВД)</div>
            <div class="topo-subtitle">Региональная маршрутизация и отраслевые контуры</div>
          </div>
        </div>

        <div class="topo-connector">▼</div>

        <div class="topo-node topo-branch">
          <div class="topo-badge">⚡ ВЕТКА (Branch)</div>
          <div class="topo-details">
            <div class="topo-title">Муниципальный районный координатор</div>
            <div class="topo-subtitle">Замыкание до 80% трафика внутри района</div>
          </div>
        </div>

        <div class="topo-connector">▼</div>

        <div class="topo-leaves-row">
          <div class="topo-node topo-leaf">
            <div class="topo-badge">💻 ЛИСТ 1</div>
            <div class="topo-details">
              <div class="topo-title">Гражданин</div>
              <div class="topo-subtitle">«Деловой»</div>
            </div>
          </div>
          <div class="topo-p2p-bridge">◄─── Прямой P2P Data Plane ───►</div>
          <div class="topo-node topo-leaf">
            <div class="topo-badge">📱 ЛИСТ 2</div>
            <div class="topo-details">
              <div class="topo-title">Предприятие</div>
              <div class="topo-subtitle">«УраТур»</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Архитектура «Турбазы» опирается на гармоничную древовидную топологию из четырех функциональных уровней.
>
> Первичной ячейкой является узел «Лист» — смартфон или ноутбук пользователя. Здесь создаются, локально обрабатываются и надежно шифруются первичные данные.
>
> Узел «Ветка» — это муниципальный координатор, разгружающий внешние каналы связи и замыкающий до восьмидесяти процентов районного трафика.
>
> Выше располагаются «Ветви» субъектов федерации и ведомств, а вершиной структуры служит «Ствол» — общероссийский депозитарий и суверенный шлюз для международной кооперации стран БРИКС.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ЕДИНИЦА ЗНАНИЙ</div>
    <h2 class="slide-title">АНАТОМИЯ ХРАНИЛИЩА ДАННЫХ</h2>
    <p class="slide-subtitle">Неделимая единица структурированных знаний с уникальной трехуровневой адресацией</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout cyan">
        <strong>Что такое Хранилище:</strong>
        <p>Базовая неделимая единица структурированных знаний платформы. Охватывает стандартные реляционные таблицы локальной СУБД SQLite в изолированной виртуальной песочнице Листа.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🔑</div>
          <h4>RepositoryId</h4>
          <p><strong>Глобальный ключ:</strong> Уникальный крипто-хэш схемы и контекста Хранилища в реестре.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">👤</div>
          <h4>ActorId</h4>
          <p><strong>Автономный субъект:</strong> Триада «Пользователь + Устройство + Приложение» для прав доступа.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">📄</div>
          <h4>RecordId</h4>
          <p><strong>Локальный номер:</strong> Порядковый номер строки в таблице Листа без сетевой координации.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🛡️</div>
          <h4>Песочница Листа</h4>
          <p><strong>Изоляция сейфов:</strong> Виртуальное разделение данных приложений в единой локальной SQLite.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="repo-anatomy-diagram">
        <div class="repo-box">
          <div class="repo-box-header">⚡ АВТОНОМНОЕ ХРАНИЛИЩЕ ДАННЫХ</div>
          <div class="repo-keys-badge">
            <span>RepId: 0x8f2a7b1c</span>
            <span>ActorId: 0x4c1e90d2</span>
            <span>Scope: Leaf Sandbox</span>
          </div>
          <div class="repo-schema-cards">
            <div class="repo-table-card">
              <div class="repo-table-card-head">📊 @delovoy/tasks</div>
              <div class="repo-table-col">id: INTEGER PRIMARY KEY</div>
              <div class="repo-table-col">title: TEXT NOT NULL</div>
              <div class="repo-table-col">urgency: INT DEFAULT 0</div>
              <div class="repo-table-col">due_date: DATETIME</div>
              <div class="repo-table-col">actor_hash: BYTES32 NOT NULL</div>
              <div class="repo-table-col index">INDEX (actor_hash, urgency)</div>
            </div>
            <div class="repo-table-card">
              <div class="repo-table-card-head">🗳️ @kubgolos/polls</div>
              <div class="repo-table-col">id: INTEGER PRIMARY KEY</div>
              <div class="repo-table-col">topic: TEXT NOT NULL</div>
              <div class="repo-table-col">vote_hash: BYTES32</div>
              <div class="repo-table-col">quorum: INT DEFAULT 100</div>
              <div class="repo-table-col">closed_at: DATETIME</div>
              <div class="repo-table-col index">CONSTRAINT chk_vote CHECK(...)</div>
            </div>
            <div class="repo-table-card">
              <div class="repo-table-card-head">🤝 @zabota/requests</div>
              <div class="repo-table-col">id: INTEGER PRIMARY KEY</div>
              <div class="repo-table-col">skill_fk: INT REFERENCES skills</div>
              <div class="repo-table-col">status: ENUM('open','done')</div>
              <div class="repo-table-col">requester_pk: BYTES32</div>
              <div class="repo-table-col">geo_hash: TEXT(12)</div>
              <div class="repo-table-col index">INDEX (status, geo_hash)</div>
            </div>
            <div class="repo-table-card">
              <div class="repo-table-card-head">🗺️ @uratur/routes</div>
              <div class="repo-table-col">id: INTEGER PRIMARY KEY</div>
              <div class="repo-table-col">waypoint: GEOPOLY NOT NULL</div>
              <div class="repo-table-col">cached_poi: JSONB</div>
              <div class="repo-table-col">elevation: REAL DEFAULT 0.0</div>
              <div class="repo-table-col">distance_km: REAL</div>
              <div class="repo-table-col index">INDEX (waypoint)</div>
            </div>
          </div>
          <div class="repo-bottom-specs">
            <span class="spec-pill">⚡ SQLite Sandbox</span>
            <span class="spec-pill">💾 RAM &lt; 35 МБ</span>
            <span class="spec-pill">🔒 100% Офлайн</span>
            <span class="spec-pill">🛡️ Zero-Leak</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Фундаментальным строительным блоком платформы является Хранилище.
>
> Хранилище — это неделимая единица структурированных знаний. Внутри него данные организованы в привычные реляционные таблицы локальной базы данных SQLite.
>
> Каждая запись адресуется строгой тройкой координат: идентификатором Хранилища, ключом актора и локальным номером записи. Это гарантирует стопроцентную глобальную уникальность объектов без обращения к центральным серверам даже при многонедельной работе в офлайне.
>
> Все хранилища виртуализированы в единой базе узла Лист, что дает мгновенные выборки и минимальное потребление оперативной памяти.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СВЯЗНОСТЬ ДАННЫХ</div>
    <h2 class="slide-title">ВНЕШНИЕ СВЯЗИ ПРИ ПОЛНОЙ АВТОНОМНОСТИ</h2>
    <p class="slide-subtitle">Реляционные ссылки между независимыми хранилищами с кэшированием копий и Bridge Entities</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout emerald">
        <strong>Принцип абсолютной автономности узла:</strong>
        <p>Записи ссылаются на другие хранилища через реляционные внешние ключи. При этом узел <strong>кэширует копии актуальных внешних записей</strong> на Листе для автономной работы 24/7.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>Нулевая зависимость от сети</h4>
          <p><strong>100% офлайн:</strong> При падении серверов узел открывает кэш за 0.1 мс без ошибок 404/500.</p>
          <p><strong>Рекурсивный кэш:</strong> Платформа сохраняет все связанные ветви внешних данных.</p>
          <p><strong>Фоновая сверка:</strong> Сверка версий идет через P2P-пакеты без блокировки экрана.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🌉</div>
          <h4>Паттерн Bridge Entities</h4>
          <p><strong>Сущности-мосты:</strong> Таблицы («GoalTask», «OrderLine») изолируют сейфы участников.</p>
          <p><strong>Раздельные базы:</strong> Клиент и ресторан ведут свои независимые таблицы данных.</p>
          <p><strong>Двусторонний P2P:</strong> Статус заказа подтверждается крипто-квитанцией.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="fk-connection-diagram">
        <div class="fk-node left">
          <div class="fk-node-header">
            <span class="fk-node-title">ХРАНИЛИЩЕ А &middot; ОРГАНАЙЗЕР «ДЕЛОВОЙ»</span>
            <span class="fk-node-badge">Клиентский Лист</span>
          </div>
          <div class="fk-row-card">
            <div class="fk-row-title">Запись #101: «Заказ пиццы»</div>
            <div class="fk-pointer-badge">FK ➔ RepB:Actor#88:Rec#502</div>
          </div>
          <div class="fk-cache-box">
            <div class="fk-cache-label">✅ Локально кэшированная копия записи #502:</div>
            <div class="fk-cache-val">«Пицца Пепперони XXL, 850 ₽, доставка 19:00» (доступна офлайн 24/7)</div>
          </div>
        </div>

        <div class="fk-arrow">⮂ <span>Внешний ключ &middot; Реляционная связь</span> ⮂</div>

        <div class="fk-node right">
          <div class="fk-node-header">
            <span class="fk-node-title">ХРАНИЛИЩЕ Б &middot; РЕСТОРАН «ПИЦЦЕРИЯ»</span>
            <span class="fk-node-badge emerald">Узел Предприятия</span>
          </div>
          <div class="fk-row-card">
            <div class="fk-row-title">Запись #502: «Меню: Пепперони XXL, 850 ₽»</div>
            <div class="fk-status-badge">Первоисточник</div>
          </div>
          <div class="fk-sync-box">
            <div class="fk-sync-label">🔄 P2P-синхронизация и оповещения:</div>
            <div class="fk-sync-val">Прямое обновление цен и стоп-листов между пирами без облачных серверов</div>
          </div>
        </div>

        <div class="fk-footer-banner">
          🛡️ <strong>Zero-Dependency:</strong> При выключении сервера ресторана органайзер мгновенно читает локальный кэш за 0.1 мс!
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как связать данные независимых участников, не сваливая информацию в централизованный серверный монолит?
>
> В «Турбазе» используются стандартные реляционные внешние ключи ForeignKey. Запись задачи в семейном органайзере «Деловой» может ссылаться на позицию в каталоге магазина или школьное расписание.
>
> При этом действует ключевой закон автономности: локальное хранилище автоматически сохраняет актуальную копию внешних связанных записей.
>
> Если ресторан закроется, а школа временно отключит сервер, ваше приложение продолжит полноценно функционировать. Экран мгновенно откроет локально сохраненную копию данных.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МГНОВЕННЫЙ ИНТЕРФЕЙС</div>
    <h2 class="slide-title">ИНТЕРФЕЙСЫ И МГНОВЕННАЯ ЗАГРУЗКА ЭКРАНОВ</h2>
    <p class="slide-subtitle">Первоначальный рендеринг экранов за &lt; 1 мс из локального кэша и аппаратная TEE-защита</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">⚡ МГНОВЕННЫЙ LOCAL-FIRST РЕНДЕРИНГ (&lt; 1 мс)</div>
      <h3 class="card-title">Интерфейс со скоростью дисплея</h3>
      <p class="card-desc">Пользовательский интерфейс считывает экраны напрямую из локальной реляционной базы SQLite без сетевых обращений.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">📁</div>
          <div class="pipe-step-title">Локальная СУБД</div>
          <div class="pipe-step-sub">SQLite на Листе</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">⚡</div>
          <div class="pipe-step-title">Живые Сигналы</div>
          <div class="pipe-step-sub">Signals / Hooks</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🖥️</div>
          <div class="pipe-step-title">Экран интерфейса</div>
          <div class="pipe-step-sub">&lt; 1 мс рендеринг</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>⚡ Нулевой сетевой пинг:</strong> Все экраны, списки и дашборды считываются из локальной базы за доли миллисекунды.</li>
        <li><strong>🚫 Никаких спиннеров:</strong> Отсутствие зависающих индикаторов ожидания даже при полном отключении 4G/LTE.</li>
        <li><strong>🔄 Реактивные запросы:</strong> Прямая привязка базы к Angular Signals, React Hooks и Flutter Streams.</li>
        <li><strong>📊 Неблокирующий UI:</strong> Фоновые синхронизации и шифрование никогда не задерживают отрисовку интерфейса.</li>
      </ul>

      <div class="ui-summary-banner">
        ⚡ <strong>Предел скорости:</strong> Отрисовка экранов ограничена только частотой обновления дисплея (до 120 FPS)!
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag emerald">🛡️ АППАРАТНЫЕ АНКЛАВЫ БЕЗОПАСНОСТИ (TEE)</div>
      <h3 class="card-title">Аппаратная изоляция ключей</h3>
      <p class="card-desc">Секретные криптографические ключи запечатаны в специализированном защищенном процессоре пользовательского смартфона.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">📱</div>
          <div class="pipe-step-title">Приложение</div>
          <div class="pipe-step-sub">Изолированный софт</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🛡️</div>
          <div class="pipe-step-title">Аппаратный TEE</div>
          <div class="pipe-step-sub">Secure Enclave</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🔐</div>
          <div class="pipe-step-title">ГОСТ-Крипто</div>
          <div class="pipe-step-sub emerald">«Кузнечик» ЭЦП</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>🛡️ Аппаратные анклавы:</strong> Использование Secure Enclave (Apple) и ARM TrustZone (Android) на каждом узле.</li>
        <li><strong>🚫 Защита от троянов:</strong> Вредоносный софт и сторонние процессы ОС не способны извлечь приватный ключ.</li>
        <li><strong>🇷🇺 Отечественная криптография:</strong> Аппаратная поддержка ГОСТ Р 34.12 («Кузнечик») и ГОСТ Р 34.11 («Стрибог»).</li>
        <li><strong>📜 Локальная ЭЦП:</strong> Мгновенная генерация юридически значимой подписи по ГОСТ без отправки ключа во внешние облака.</li>
      </ul>

      <div class="tee-summary-banner">
        🔒 <strong>Тайна частной жизни:</strong> Ваши ключи никогда не покидают кремний пользовательского чипа!
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Благодаря Local-First архитектуре пользовательский интерфейс работает со скоростью дисплея.
>
> Первоначальный рендеринг любого экрана приложений загружается напрямую из локальной базы данных менее чем за одну миллисекунду. Пользователь забывает о зависающих индикаторах загрузки и белых экранах при нестабильном мобильном интернете.
>
> Реактивные живые запросы мгновенно обновляют интерфейс при любых изменениях. При этом безопасность данных гарантируется на аппаратном уровне: криптографические ключи хранятся в защищенных аппаратных анклавах процессора, исключая их компрометацию вредоносным софтом.

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | КООПЕРАЦИЯ ДАННЫХ</div>
    <h2 class="slide-title">КООПЕРАЦИЯ НА УРОВНЕ ДАННЫХ</h2>
    <p class="slide-subtitle">Кросс-доменные SQL SELECT и JOIN между таблицами разных вендоров без API-посредников</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout cyan">
        <strong>Сквозные реляционные соединения:</strong>
        <p>Приложения могут напрямую считывать данные из схем других модулей через стандартные <strong>SQL JOIN</strong>. Стандартные типы данных (задачи, геометки, профили) повторно используются без дублирования.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>Сверхскорость</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Мгновенный отклик:</strong> Локальный JOIN исполняется SQLite на Листе всего за 0.4 мс.</div>
            <div class="feat-point"><strong>Нулевой оверхед:</strong> Соединение в оперативной памяти без сетевых сокетов и HTTP.</div>
            <div class="feat-point"><strong>Экономия ресурсов:</strong> Никакой нагрузки на серверные мощности и каналы связи.</div>
          </div>
        </div>
        <div class="feature-card">
          <div class="card-icon">📦</div>
          <h4>Спецификация типов</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Общие типы:</strong> Задачи, геометки, профили и чеки стандартизированы.</div>
            <div class="feat-point"><strong>Без дублирования:</strong> Приложения используют одну запись вместо копирования.</div>
            <div class="feat-point"><strong>Связанный граф:</strong> Сквозная ссылочная целостность через внешние ключи.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card">
        <div class="card-pill-tag cyan">КРОСС-СХЕМНЫЙ SQL JOIN В ПРИЛОЖЕНИЯХ ТУРБАЗЫ</div>

        <div class="code-block" style="margin-top: 6px;">
          <span style="color: #38bdf8;">SELECT</span> t.title, f.flight_code, f.departs_at, f.gate<br>
          <span style="color: #38bdf8;">FROM</span> @delovoy.tasks t<br>
          <span style="color: #38bdf8;">LEFT JOIN</span> @uratur.flights f <span style="color: #38bdf8;">ON</span> t.flight_fk = f.id<br>
          <span style="color: #38bdf8;">WHERE</span> t.date = CURRENT_DATE;
        </div>

        <div class="join-schema-diagram">
          <div class="schema-table left">
            <div class="table-name">📁 @delovoy.tasks (Органайзер)</div>
            <div class="table-field">id: 104 &middot; INTEGER PRIMARY KEY</div>
            <div class="table-field">title: "Вылет в Казань"</div>
            <div class="table-field">urgency: 1 (Срочно)</div>
            <div class="table-field">flight_fk: 0x4a12 &middot; REFERENCES flights</div>
            <div class="table-field">actor_hash: 0x8f2a... (Владелец)</div>
          </div>
          <div class="join-badge">⟕ LEFT JOIN ⟖</div>
          <div class="schema-table right">
            <div class="table-name">✈️ @uratur.flights (Билеты)</div>
            <div class="table-field">id: 0x4a12 &middot; PRIMARY KEY</div>
            <div class="table-field">flight_code: "SU-1402"</div>
            <div class="table-field">route: "SVO ➔ KZN (Казань)"</div>
            <div class="table-field">departs_at: "18:45" (По расписанию)</div>
            <div class="table-field">gate: "B14 (Терминал 1)"</div>
          </div>
        </div>

        <div class="join-result-banner">
          ⚡ <strong>Локальное выполнение за 0.4 мс:</strong> Пользователь видит рейс и гейт в карточке задачи мгновенно, без сетевых запросов и без раскрытия личного расписания авиакомпании!
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В классическом вебе объединение данных из двух программ требует написания сложных серверных интеграций и ожидания ответов от сторонних веб-серверов.
>
> В «Турбазе» кооперация происходит на уровне единого локального реляционного движка.
>
> Поскольку все данные принадлежат пользователю, приложение органайзера «Деловой» может выполнить прямой SQL SELECT с оператором JOIN к таблицам туристического сервиса «УраТур». Задача из расписания мгновенно обогащается номером авиарейса и временем вылета за четыре десятых миллисекунды без выхода в интернет.

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ДОВЕРЕННАЯ БЕЗОПАСНОСТЬ</div>
    <h2 class="slide-title">ПРИНЦИП «READ-ANYWHERE, WRITE-SELF»</h2>
    <p class="slide-subtitle">Архитектурный закон безопасности: свободное чтение локальных данных и строгая защита от чужих мутаций</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">READ-ANYWHERE (Свободное чтение)</div>
      <h3 class="card-title">Чтение локальных данных без барьеров</h3>
      <p class="card-desc">Поскольку данные на Листе принадлежат гражданину, доверенные приложения могут свободно объединять информацию через SQL SELECT.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">🔍</div>
          <div class="pipe-step-title">SQL SELECT</div>
          <div class="pipe-step-sub">Запрос приложения</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">⚡</div>
          <div class="pipe-step-title">Локальный движок</div>
          <div class="pipe-step-sub">SQLite на Листе</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">📖</div>
          <div class="pipe-step-title">Чтение данных</div>
          <div class="pipe-step-sub">&lt; 1 мс отклик</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>⚡ Прямые SQL-выборки:</strong> Доверенные программы свободно считывают данные чужих схем через JOIN.</li>
        <li><strong>🚫 Без платных шлюзов:</strong> Данные принадлежат владельцу — софт не взимает плату за чтение с Листа.</li>
        <li><strong>🔄 Обогащение контекста:</strong> Органайзер, туризм и взаимопомощь мгновенно видят связанные факты.</li>
        <li><strong>🔒 Нулевой сетевой след:</strong> Запросы исполняются на чипе смартфона без отправки поисков в сеть.</li>
      </ul>

      <div class="ui-summary-banner">
        ⚡ <strong>Свобода чтения:</strong> Гражданин — полноправный хозяин информации на своем устройстве!
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag emerald">WRITE-SELF (Защищенная запись)</div>
      <h3 class="card-title">Запрет прямой перезаписи чужих таблиц</h3>
      <p class="card-desc">Ни одно стороннее приложение не имеет права напрямую вставлять или изменять строки в чужих таблицах.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">✏️</div>
          <div class="pipe-step-title">Попытка записи</div>
          <div class="pipe-step-sub">Чужой модуль</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🛡️</div>
          <div class="pipe-step-title">Граф-анализатор</div>
          <div class="pipe-step-sub emerald">FROM_ANOTHER_APP</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">⛔</div>
          <div class="pipe-step-title">Отказ транзакции</div>
          <div class="pipe-step-sub">Защита целостности</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>🛡️ Граф-анализатор:</strong> Система помечает сторонние мутации строгим флагом FROM_ANOTHER_APP.</li>
        <li><strong>⛔ Блокировка записи:</strong> Планировщик транзакций немедленно отклоняет нелегитимный коммит.</li>
        <li><strong>🔑 Только через @Api():</strong> Изменение чужих сущностей разрешено строго через контракт владельца.</li>
        <li><strong>📜 Целостность схем:</strong> Исключена порча баланса, статусов заказов или персональных документов.</li>
      </ul>

      <div class="tee-summary-banner">
        🔒 <strong>Абсолютная защита:</strong> Прямая перезапись чужих таблиц физически невозможна на уровне СУБД!
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как подружить открытость данных с надежной защитой от ошибок и вредоносного софта?
>
> Архитектура «Турбазы» утверждает базовый закон: «Read-Anywhere, Write-Self» — «Читай отовсюду, пиши только свое».
>
> Читать данные пользователя через SQL SELECT разрешено любому доверенному приложению. Однако на прямую запись действует категорический запрет. Сторонний модуль не может тайком изменить баланс счета или переписать статус чужого документа. При попытке прямой записи фреймворк помечает операцию флагом ошибки и блокирует транзакцию.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | КООПЕРАЦИЯ ЛОГИКИ</div>
    <h2 class="slide-title">ОБЩЕСТВЕННАЯ ОБОЛОЧКА ПРИЛОЖЕНИЙ (API)</h2>
    <p class="slide-subtitle">Легитимный шлюз вызова методов приложения-владельца для безопасной модификации данных</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout emerald">
        <strong>Шлюз бизнес-логики владельца (API):</strong>
        <p>Чтобы изменить данные в чужой схеме, приложение обязано вызвать <strong>Общественную Оболочку</strong> целевого модуля. Вся бизнес-валидация, проверка прав и расчеты исполняются кодом владельца.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🛡️</div>
          <h4>Контроль целостности</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Проверка правил:</strong> Владелец схемы валидирует параметры и права перед коммитом.</div>
            <div class="feat-point"><strong>Изоляция мутаций:</strong> Исключены скрытые побочные эффекты в смежных таблицах.</div>
            <div class="feat-point"><strong>Локальный аудит:</strong> Каждая операция фиксируется в журнале транзакций Листа.</div>
          </div>
        </div>
        <div class="feature-card">
          <div class="card-icon">♻️</div>
          <h4>Переиспользование логики</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Единый контракт:</strong> Бизнес-логика пишется один раз для сотен сторонних модулей.</div>
            <div class="feat-point"><strong>Открытые библиотеки:</strong> Стандарты бронирования и биллинга открыты в экосистеме.</div>
            <div class="feat-point"><strong>Снижение затрат:</strong> Разработчикам не нужно изобретать свои шлюзы интеграций.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="api-pipeline-stack">
        <div class="pipeline-step-card step-1">
          <div class="pipeline-step-left">
            <div class="pipeline-step-num">1</div>
            <div class="pipeline-step-info">
              <div class="pipeline-step-name">Органайзер «Деловой»</div>
              <div class="pipeline-step-action">uraturApi.bookRoute(tripId: 402)</div>
            </div>
          </div>
          <div class="pipeline-step-badge cyan">Внешний вызов</div>
        </div>

        <div class="pipeline-connector">▼ Делегирование через защищенный контракт</div>

        <div class="pipeline-step-card step-2">
          <div class="pipeline-step-left">
            <div class="pipeline-step-num">2</div>
            <div class="pipeline-step-info">
              <div class="pipeline-step-name">Общественная Оболочка (API)</div>
              <div class="pipeline-step-action">Защитный шлюз и изоляция среды исполнения</div>
            </div>
          </div>
          <div class="pipeline-step-badge gold">Контракт API</div>
        </div>

        <div class="pipeline-connector">▼ Передача в ядро приложения-владельца</div>

        <div class="pipeline-step-card step-3">
          <div class="pipeline-step-left">
            <div class="pipeline-step-num">3</div>
            <div class="pipeline-step-info">
              <div class="pipeline-step-name">Модуль «УраТур» (Владелец схемы)</div>
              <div class="pipeline-step-action">Проверка свободных мест и тарифа маршрута</div>
            </div>
          </div>
          <div class="pipeline-step-badge purple">Бизнес-валидация</div>
        </div>

        <div class="pipeline-connector">▼ Легитимный прямой коммит владельцем</div>

        <div class="pipeline-step-card step-4">
          <div class="pipeline-step-left">
            <div class="pipeline-step-num">4</div>
            <div class="pipeline-step-info">
              <div class="pipeline-step-name">Локальная СУБД SQLite</div>
              <div class="pipeline-step-action">Фиксация бронирования в таблицах схемы ✅</div>
            </div>
          </div>
          <div class="pipeline-step-badge emerald">100% Write-Self</div>
        </div>

        <div class="pipeline-status-ribbon">
          🛡️ Инвариант соблюден: сторонний модуль не имеет прямого доступа на запись в чужую БД
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Единственный легитимный способ изменить данные другого сервиса — обратиться к его Общественной Оболочке API.
>
> Общественная Оболочка выступает защитным контрактом приложения. Когда органайзер хочет забронировать туристический маршрут в «УраТуре», он вызывает специальный API-метод этого сервиса.
>
> Приложение-владелец проверяет наличие свободных мест, рассчитывает стоимость и само выполняет запись в свои таблицы. Это гарантирует строгое соблюдение бизнес-правил и позволяет разработчикам легко комбинировать функции разных программ без риска испортить данные.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СЕТЕВОЙ КОНТУР</div>
    <h2 class="slide-title">CONTROL PLANE И DATA PLANE: ZERO-KNOWLEDGE</h2>
    <p class="slide-subtitle">Разделение легких метаданных маршрутизации и прямого однорангового обмена данными P2P</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🌲</div>
          <h4>Control Plane (Ветки)</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Минимум трафика:</strong> Передает только легковесные метаданные маршрутизации (&lt;1% трафика).</div>
            <div class="feat-point"><strong>Слепой координатор:</strong> Сервер не видит тел файлов и не является оператором ПДн.</div>
            <div class="feat-point"><strong>Сигналинг сессий:</strong> Верификация ZK-доказательств прав и обмен сетевыми дескрипторами.</div>
          </div>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>Data Plane (Листья)</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Прямой P2P-канал:</strong> Высокоскоростной обмен WebRTC DataChannel между устройствами.</div>
            <div class="feat-point"><strong>0 ₽ серверам:</strong> Передача тяжелых файлов, баз и медиа не тратит серверные бюджеты.</div>
            <div class="feat-point"><strong>ГОСТ-шифрование:</strong> Сквозное симметричное шифрование по ключам участников.</div>
          </div>
        </div>
      </div>

      <div class="key-callout cyan" style="margin-top: 10px;">
        <strong>Принцип селективного раскрытия (Zero-Knowledge):</strong>
        <p>Подтверждение фактов (возраст 18+, рецепт врача, членство в кооперативе) происходит строго без передачи самого документа и без раскрытия персональных данных.</p>
      </div>
    </div>

    <div class="visual-panel">
      <div class="planes-comparison-card">
        <div class="plane-box control-plane">
          <div class="plane-header">
            <div class="plane-title">🏢 CONTROL PLANE &middot; Серверные Ветки</div>
            <div class="plane-tags">
              <span class="plane-badge cyan">&lt;1% трафика</span>
              <span class="plane-badge gold">Zero-Knowledge</span>
            </div>
          </div>
          <p class="plane-desc">
            Сервер выступает «слепым координатором»: проверяет ZK-доказательства прав, выдает токены доступа и координирует маршрутизацию без доступа к приватным файлам граждан.
          </p>
        </div>

        <div class="plane-bridge-connector">
          <div class="plane-bridge-badge">🔒 ZK-Верификация прав &amp; Сигналинг P2P-сессии через Ветки</div>
        </div>

        <div class="plane-box data-plane">
          <div class="plane-header">
            <div class="plane-title">⚡ DATA PLANE &middot; Клиентские Листья</div>
            <div class="plane-tags">
              <span class="plane-badge emerald">0 ₽ серверам</span>
              <span class="plane-badge cyan">WebRTC P2P</span>
            </div>
          </div>
          <div class="p2p-direct-pipe">
            <div class="p2p-node">💻 Гражданин</div>
            <div class="p2p-stream">◄═══ До 1 Гбит/с &middot; Прямой туннель E2EE ═══►</div>
            <div class="p2p-node">📱 Предприятие</div>
          </div>
          <p class="plane-desc">
            Тяжелые файлы, медиа и базы данных передаются напрямую между устройствами участников со сквозным шифрованием ГОСТ.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


### Текст для диктора:
> В организации сетевого взаимодействия «Турбаза» строго разделяет плоскость управления — Control Plane — и плоскость данных — Data Plane.
>
> По плоскости управления через дерево серверов-веток передаются только легковесные метаданные, маршруты и криптографические подтверждения. Операторы серверов не видят содержимого файлов.
>
> Основной же массив данных — документы, базы и видео — передается напрямую между устройствами пользователей по одноранговым каналам WebRTC DataChannel. Это снимает нагрузку с магистральных интернет-сетей и снижает серверные расходы на трафик до нуля.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ГОСУДАРСТВЕННАЯ АНАЛИТИКА</div>
    <h2 class="slide-title">ПОДАЧА ДАННЫХ И FEDERATED OLAP</h2>
    <p class="slide-subtitle">Древовидная координация открытых реестров и мгновенный сбор макростатистики за 3 секунды</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout emerald">
        <strong>Древовидная подача данных:</strong>
        <p>Хранение общедоступных реестров и сводок организовано по территориально-иерархическому дереву. Запросы каскадируются вниз, а результаты агрегируются снизу вверх.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">⚡</div>
          <h4>3 секунды на всю страну</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Параллельный расчет:</strong> Запрос исполняется одновременно на миллионах процессоров Листов.</div>
            <div class="feat-point"><strong>Мгновенная сводка:</strong> Федеральный центр получает макроотчет без централизованной базы.</div>
            <div class="feat-point"><strong>Свежие данные:</strong> Аналитика отражает реальное состояние дел на текущую секунду.</div>
          </div>
        </div>
        <div class="feature-card">
          <div class="card-icon">📦</div>
          <h4>Порции по 128 байт</h4>
          <div class="feat-points">
            <div class="feat-point"><strong>Микро-агрегаты:</strong> Устройства отдают только зашумленные математические суммы.</div>
            <div class="feat-point"><strong>Zero-PII гарантия:</strong> Исходные чеки, покупки и профили никогда не покидают Лист.</div>
            <div class="feat-point"><strong>Разгрузка каналов:</strong> Объем трафика макроаналитики ничтожен по сравнению с логами.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="federated-olap-display">
        <div class="olap-tier tier-trunk">
          <div class="olap-title-row">
            <div class="olap-tier-name">🌲 ФЕДЕРАЛЬНЫЙ СТВОЛ</div>
            <div class="olap-tier-sub">Минэкономразвития / Банк России</div>
          </div>
          <div class="olap-metric-badge gold">⚡ Макросводка за 3.0 сек</div>
        </div>

        <div class="olap-connector-row">
          <span>↓ Запрос аналитики</span>
          <span>↑ Итоговый макроотчет</span>
        </div>

        <div class="olap-tier tier-region">
          <div class="olap-title-row">
            <div class="olap-tier-name">🏢 РЕГИОНАЛЬНЫЕ ВЕТВИ</div>
            <div class="olap-tier-sub">89 Субъектов РФ / Ведомственные контуры</div>
          </div>
          <div class="olap-metric-badge purple">Агрегация по субъекту</div>
        </div>

        <div class="olap-connector-row">
          <span>↓ Каскадирование</span>
          <span>↑ Сводки муниципалитетов</span>
        </div>

        <div class="olap-tier tier-branch">
          <div class="olap-title-row">
            <div class="olap-tier-name">⚡ МУНИЦИПАЛЬНЫЕ ВЕТКИ</div>
            <div class="olap-tier-sub">Районные шлюзы координации</div>
          </div>
          <div class="olap-metric-badge cyan">Сбор локальных срезов</div>
        </div>

        <div class="olap-connector-row">
          <span>↓ SQL-запрос</span>
          <span>↑ 128 байт (Дифференциальная приватность)</span>
        </div>

        <div class="olap-tier tier-leaf">
          <div class="olap-title-row">
            <div class="olap-tier-name">💻 МИЛЛИОНЫ КЛИЕНТСКИХ ЛИСТЬЕВ</div>
            <div class="olap-tier-sub">Смартфоны &amp; ПК: расчет в SQLite без передачи PII</div>
          </div>
          <div class="olap-metric-badge emerald">0 утечек PII</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как государственным органам собирать достоверную экономическую статистику, не стягивая чеки и покупки граждан в уязвимое центральное хранилище?
>
> «Турбаза» применяет технологию Federated OLAP. Запрос рассылается вниз по древовидной иерархии узлов. Миллионы клиентских устройств выполняют быстрый расчет локально на своих процессорах.
>
> Наверх передаются только компактные математические агрегаты размером всего в сто двадцать восемь байт с дифференциальным зашумлением. Руководство региона или профильное министерство получает точную макроэкономическую картину за три секунды, при этом тайна частной жизни граждан защищена математически.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ЖИВУЧЕСТЬ И GREEN TECH</div>
    <h2 class="slide-title">ПОИСКОВЫЕ ОЧЕРЕДИ И GREEN COMPUTING</h2>
    <p class="slide-subtitle">Высокоскоростное извлечение свежих записей и энергоэффективность периферийных вычислений</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ПОИСКОВЫЕ ОЧЕРЕДИ</div>
      <h3 class="card-title">Мгновенный доступ к актуальным событиям</h3>
      <p class="card-desc">Специализированные структуры очередей для ультрабыстрой выдачи свежей информации.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">📢</div>
          <div class="pipe-step-title">Новое событие</div>
          <div class="pipe-step-sub">Экстренное оповещение</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">⚡</div>
          <div class="pipe-step-title">Очередь Queue</div>
          <div class="pipe-step-sub">Память Листа</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">📲</div>
          <div class="pipe-step-title">P2P-доставка</div>
          <div class="pipe-step-sub">&lt; 1 мс отклик</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>⚡ Мгновенная доставка:</strong> Срочные районные оповещения, аварии ЖКХ и новости передаются за доли миллисекунды.</li>
        <li><strong>🤝 Взаимопомощь «Забота»:</strong> Срочная просьба пожилого соседа о лекарствах сразу видна волонтерам района.</li>
        <li><strong>🗳️ Экспресс-опросы «КубГолос»:</strong> Мгновенное голосование жителей по благоустройству двора в реальном времени.</li>
        <li><strong>📡 Локальный буфер на Ветке:</strong> Сохранение очереди для временно спящих или отключенных терминалов.</li>
      </ul>

      <div class="ui-summary-banner">
        ⚡ <strong>Экстренный приоритет:</strong> Критическая информация доставляется мгновенно без задержек в облаках!
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag emerald">GREEN COMPUTING</div>
      <h3 class="card-title">Разгрузка национальной энергосистемы</h3>
      <p class="card-desc">Отказ от строительства энергозатратных дата-центров за счет микроэнергетики клиентских устройств.</p>
      
      <div class="pipeline-stepper-compact">
        <div class="pipe-step">
          <div class="pipe-step-icon">📱</div>
          <div class="pipe-step-title">Микроэнергетика</div>
          <div class="pipe-step-sub">Доли ватта на Листе</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🌐</div>
          <div class="pipe-step-title">P2P-сеть</div>
          <div class="pipe-step-sub emerald">Миллионы Листьев</div>
        </div>
        <div class="pipe-arrow">➔</div>
        <div class="pipe-step">
          <div class="pipe-step-icon">🌱</div>
          <div class="pipe-step-title">Энергосеть</div>
          <div class="pipe-step-sub">Разгрузка мега-ЦОД</div>
        </div>
      </div>

      <ul class="card-bullets">
        <li><strong>🌱 Микропотребление Листов:</strong> Смартфон тратит доли ватта на расчеты, которые в ЦОД требуют мегаватт энергии.</li>
        <li><strong>🚫 Отказ от гигаватт ЦОД:</strong> Ликвидация потребности в строительстве энергоемких серверных комплексов.</li>
        <li><strong>🔋 Живучесть при блэкаутах:</strong> Автономные аккумуляторы смартфонов поддерживают работу при авариях.</li>
        <li><strong>📉 Нулевой углеродный след:</strong> Энергоэффективная периферия кардинально снижает тепловые выбросы.</li>
      </ul>

      <div class="tee-summary-banner">
        🌿 <strong>Зеленые вычисления:</strong> Энергия миллионов карманных устройств заменяет энергоемкие дата-центры!
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Для мгновенного распространения свежих новостей и экстренных оповещений платформа задействует поисковые очереди Queue. В приложении взаимной помощи «Забота» срочная просьба пожилого соседа о покупке лекарств доставляется волонтерам района за миллисекунды.
>
> Не менее важен экологический аспект — концепция Green Computing.
>
> Централизованные дата-центры потребляют гигаватты электроэнергии, перегружая городские подстанции и требуя сложного охлаждения. «Турбаза» задействует микроэнергетику уже работающих компьютеров и смартфонов, снижая углеродный след и сохраняя работоспособность при региональных блэкаутах.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МИКОРИЗНАЯ СЕТЬ</div>
    <h2 class="slide-title">«ИНТЕРНЕТ ДАННЫХ» И КОНТУР БРИКС</h2>
    <p class="slide-subtitle">Объединение независимых деревьев по принципу лесной микоризы и трансграничный шлюз</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout cyan">
        <strong>Принцип природной микоризы:</strong>
        <p>Подобно тому как подземная грибница микоризы связывает корни отдельных деревьев в единую лесную экосистему, протокол «Интернет данных» объединяет независимые региональные и отраслевые деревья данных.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🌐</div>
          <h4>Федерация Стволов</h4>
          <p>Связывание ведомственных и корпоративных контуров без монополии.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏛️</div>
          <h4>Контур БРИКС</h4>
          <p>Суверенный клиринг национальных валют и торговля без SWIFT.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🍄</div>
          <h4>Принцип Микоризы</h4>
          <p>Естественная саморегуляция обмена данными независимых узлов.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🛡️</div>
          <h4>Торговый P2P-Шлюз</h4>
          <p>Прямой обмен реестрами и клиринг без санкционных рисков.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="brics-mycorrhiza-display">
        <div class="mycorrhiza-grid">
          <div class="mycorrhiza-col russia">
            <div class="myco-col-title">🇷🇺 Контур РФ</div>
            <div class="myco-subcard">🌲 Ствол РФ (Госреестры)</div>
            <div class="myco-subcard">🏭 Дерево: Промышленность</div>
            <div class="myco-subcard">🏔️ Дерево: Туризм «УраТур»</div>
          </div>

          <div class="mycorrhiza-col bridge">
            <div class="myco-bridge-icon">🌐</div>
            <div class="myco-bridge-title">Микоризный Шлюз Данных</div>
            <div class="myco-bridge-desc">Межгосударственный P2P-клиринг и синхронизация независимых Стволов без SWIFT</div>
            <div class="myco-bridge-badge">◄═══ Прямой обмен ═══►</div>
          </div>

          <div class="mycorrhiza-col brics">
            <div class="myco-col-title">🌏 Контур БРИКС</div>
            <div class="myco-subcard">🇨🇳 Ствол КНР (Цифровой юань)</div>
            <div class="myco-subcard">🇮🇳 Ствол Индии (Цифровая рупия)</div>
            <div class="myco-subcard">🇧🇷 Ствол Бразилии / ОАЭ / ЮАР</div>
          </div>
        </div>

        <div class="myco-summary-ribbon">
          🛡️ Архитектура исключает монопольного провайдера: суверенное равноправие национальных контуров
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как объединить тысячи независимых отраслевых и региональных деревьев в единое целое?
>
> Архитектура «Турбазы» вдохновлена живой природой — лесной микоризой, связывающей корни отдельных деревьев в общую саморегулирующуюся экосистему.
>
> Протокол «Интернета данных» позволяет объединять независимые Стволы и Деревья между собой без создания глобального мирового сервера-монополиста. Это открывает прямой путь для международного партнерства со странами БРИКС и ЕАЭС: государства обмениваются торговыми реестрами и проводят клиринг национальных валют по защищенным суверенным каналам без риска санкционных отключений от западных систем.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | КРИПТОГРАФИЧЕСКАЯ ЗАЩИТА</div>
    <h2 class="slide-title">КРИПТОГРАФИЯ И 152-ФЗ ZERO-PII</h2>
    <p class="slide-subtitle">Защита по стандартам ГОСТ, локальный Keyring и гарантированное «Право на забвение»</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">152-ФЗ ZERO-PII КОНТУР</div>
      <h3 class="card-title">Нулевой риск утечек из облака</h3>
      <p class="card-desc">Персональные данные (ПДн) никогда не покидают процессор и память клиентского устройства Лист.</p>
      <ul class="card-bullets">
        <li><strong>🛡️ Зашифрованные дельты:</strong> Серверы-ветки хранят только непроницаемые крипто-пакеты.</li>
        <li><strong>🚫 Не операторы ПДн:</strong> Провайдеры и муниципалитеты не имеют доступа к содержимому.</li>
        <li><strong>📜 Закон 152-ФЗ:</strong> Полная математическая гарантия соблюдения федерального законодательства.</li>
        <li><strong>⚡ Аппаратные анклавы:</strong> Обработка персональных данных строго внутри защищенных чипов Листа.</li>
      </ul>
      <div class="ui-summary-banner">
        🔒 <strong>Гарантия 152-ФЗ:</strong> Персональные данные физически отсутствуют на серверах!
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag emerald">ПРАВО НА ЗАБВЕНИЕ</div>
      <h3 class="card-title">Мгновенное крипто-уничтожение</h3>
      <p class="card-desc">Полное владение гражданина собственной цифровой историей без участия третьих лиц.</p>
      <ul class="card-bullets">
        <li><strong>🔑 Стирание мастер-ключа:</strong> Удаление ключа превращает все копии в нерасшифровываемый шум.</li>
        <li><strong>🧹 Команда VACUUM:</strong> Физическая перезапись секторов флеш-памяти на устройстве нулями.</li>
        <li><strong>🛡️ Keyring-изоляция:</strong> Иерархический Keyring предотвращает связывание профилей.</li>
        <li><strong>🔄 Отзыв публичных прав:</strong> Мгновенная инвалидация реплик в пиринговой сети за миллисекунды.</li>
      </ul>
      <div class="tee-summary-banner">
        ⚡ <strong>Без посредников:</strong> Гражданин стирает свои данные в один клик без третьих лиц!
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Фундаментом доверия в «Турбазе» служит отечественный криптографический контур ГОСТ и строгое соблюдение закона 152-ФЗ.
>
> Применяя парадигму Zero-PII, платформа исключает нахождение сырых персональных данных на серверах. Промежуточные узлы оперируют зашифрованными блоками и не являются операторами персональных данных.
>
> А право на забвение обеспечивается математически. Если гражданин решает удалить репозиторий, уничтожение мастер-ключа в локальном Keyring мгновенно превращает все распределенные копии в нерасшифровываемый белый шум, а локальный сектор флеш-памяти физически перезаписывается нулями.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СИСТЕМНЫЕ МЕТРИКИ</div>
    <h2 class="slide-title">ИЗМЕРИМЫЕ ТЕХНИЧЕСКИЕ ПОКАЗАТЕЛИ (KPIs)</h2>
    <p class="slide-subtitle">Четыре ключевых показателя надежности, скорости и экономической эффективности архитектуры</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="kpi-row-explainer">
      <div class="kpi-card-explainer">
        <div class="kpi-val-explainer text-cyan">&lt; 1 МС</div>
        <div class="kpi-title-explainer">Отклик экрана UI</div>
        <div class="kpi-desc-explainer">Мгновенная локальная отрисовка экранов из базы SQLite со скоростью дисплея 120 FPS</div>
        <div class="kpi-badge-explainer">⚡ 0 мс сетевой задержки</div>
      </div>
      <div class="kpi-card-explainer">
        <div class="kpi-val-explainer text-emerald">3 СЕК</div>
        <div class="kpi-title-explainer">Federated OLAP</div>
        <div class="kpi-desc-explainer">Сбор общенациональной макроаналитики порциями по 128 байт без централизованных баз</div>
        <div class="kpi-badge-explainer emerald">🛡️ Дифференциальная приватность</div>
      </div>
      <div class="kpi-card-explainer">
        <div class="kpi-val-explainer text-cyan">-90%</div>
        <div class="kpi-title-explainer">Снижение TCO</div>
        <div class="kpi-desc-explainer">Ликвидация затрат на серверные кластеры за счет использования процессоров Листов</div>
        <div class="kpi-badge-explainer">💰 Падение нагрузки CPU до 8%</div>
      </div>
      <div class="kpi-card-explainer">
        <div class="kpi-val-explainer text-emerald">0 БАЙТ</div>
        <div class="kpi-title-explainer">Утечек ПДн</div>
        <div class="kpi-desc-explainer">Математическая невозможность сливов баз данных граждан из облачной инфраструктуры</div>
        <div class="kpi-badge-explainer emerald">🔒 Стандарт ГОСТ 152-ФЗ</div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card">
        <div class="card-pill-tag cyan">ИНЖЕНЕРНЫЙ ИТОГ АРХИТЕКТУРЫ</div>
        <h3 class="card-title">Надежность, превосходящая облака</h3>
        <p class="card-desc">«Турбаза» доказала, что децентрализованная система превосходит традиционные серверные мега-ЦОД по скорости отклика, надежности хранения и экономической эффективности.</p>
        <ul class="card-bullets">
          <li><strong>⚡ Мгновенный интерфейс:</strong> Отклик UI &lt; 1 мс гарантирует комфорт миллионов пользователей без спиннеров.</li>
          <li><strong>📊 Государственная аналитика:</strong> Экспресс-срез Federated OLAP за 3 секунды по всем 89 субъектам РФ.</li>
          <li><strong>🛡️ Гарантированная безопасность:</strong> 0 байт персональных данных в облаках исключает риск массовых атак.</li>
          <li><strong>💰 Экономический триумф:</strong> Сокращение совокупной стоимости владения (TCO) на 90% для бизнеса и государства.</li>
        </ul>
        <div class="repo-keys-badge" style="margin-top: 14px;">Готовность к внедрению: 100% &middot; Стандарты: ГОСТ / 152-ФЗ Zero-PII</div>
      </div>
    </div>
  </div>
</div>


### Текст для диктора:
> Подведем итог в объективных инженерных цифрах.
>
> Локальный отклик интерфейса — менее одной миллисекунды. Задержка сбора государственной макроаналитики методом Federated OLAP по всей стране — ровно три секунды.
>
> Совокупная стоимость владения ИТ-инфраструктурой снижается на девяносто процентов благодаря переносу вычислений на клиентские терминалы и отказу от аренды мега-серверов.
>
> А показатель утечек персональных данных равен абсолютному нулю байт, потому что централизованных баз-мишеней больше не существует.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ФИНАЛ ЧАСТИ 2</div>
    <h2 class="slide-title">РЕЗЮМЕ И ПЕРЕХОД К СПРАВЕДЛИВОЙ ЭКОНОМИКЕ ДАННЫХ</h2>
    <p class="slide-subtitle">Архитектурный фундамент создан: впереди разбор экономики API и справедливых расчетов</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ИТОГИ АРХИТЕКТУРНОЙ АНАТОМИИ</div>
      <h3 class="card-title">Ключевые принципы платформы</h3>
      <p class="card-desc">Фундаментальные инженерные основы суверенной распределенной платформы «Турбаза»:</p>
      <ul class="card-bullets">
        <li><strong>🌲 4-уровневая топология:</strong> Лист &rarr; Ветка &rarr; Ветвь &rarr; Ствол.</li>
        <li><strong>📦 Неделимые Хранилища:</strong> RepId, ActorId, RecordId на базе SQLite.</li>
        <li><strong>⚡ Read-Anywhere, Write-Self:</strong> Свободный SQL JOIN и шлюзы @Api().</li>
        <li><strong>🛡️ Zero-Knowledge сеть:</strong> P2P Data Plane и почтовый сигналинг.</li>
        <li><strong>📊 Federated OLAP:</strong> Макросводка за 3 секунды по 128 байт.</li>
        <li><strong>🔒 152-ФЗ Zero-PII:</strong> Стек ГОСТ и полное право на забвение.</li>
      </ul>
      <div class="repo-footer" style="margin-top: 10px;">✅ Техническая основа: Полная готовность к развертыванию</div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag gold">АНОНС: ЧАСТЬ 3 ИЗ 3</div>
      <h3 class="card-title">Справедливая экономика и ИИ</h3>
      <p class="card-desc">В третьей, завершающей части эксплейнер-серии мы увидим, как эта архитектура преобразует экономику:</p>
      <ul class="card-bullets">
        <li><strong>💰 Модель микророялти:</strong> Распределение прибыли 1/N за вызовы API.</li>
        <li><strong>🇷🇺 Цифровой рубль:</strong> Мгновенные бескоммиссионные расчеты смарт-контрактов.</li>
        <li><strong>🤝 Открытая репутация:</strong> Механизмы доверия в сети взаимопомощи «Забота».</li>
        <li><strong>🧠 Локальный суверенный ИИ:</strong> Нейросетевые модели на чипе без слива данных.</li>
      </ul>
      <div class="repo-footer" style="margin-top: 10px;">Смотрите далее: Часть 3 &middot; «Справедливая экономика данных» ➔</div>
    </div>
  </div>
</div>

### Текст для диктора:
> Мы завершили знакомство с архитектурными принципами платформы «Турбаза».
>
> Мы увидели, как неделимые Хранилища, реляционные внешние ключи, принцип «Read-Anywhere, Write-Self», древовидная топология и микоризный Интернет данных формируют целостную распределенную цифровую среду.
>
> Но архитектура — это лишь фундамент. Как эта техническая ткань преобразует экономику страны?
>
> В третьей, заключительной части нашего цикла мы разберем справедливую экономику платформы «Турбаза»: распределение микророялти один на эн между разработчиками, мгновенные расчеты в Цифровом рубле, открытые репутационные механизмы взаимопомощи в приложении «Забота» и искусственный интеллект на службе человека. До встречи в третьей части!
