---
presentation_id: "03_app_framework_and_sdk"
title: "Архитектура платформы «Турбаза»"
subtitle: "Выпуск 3: Каркас приложений (Framework) и инструментарий разработчика"
header_title: "ТУРБАЗА // ИНЖЕНЕРИЯ"
header_subtitle: "Выпуск 03: Прикладной каркас, SDK и реактивная среда"
theme: "dark_sovereign"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">АРХИТЕКТУРНЫЙ ВЫПУСК 03 &middot; СРЕДА ИСПОЛНЕНИЯ</div>
    <h1 class="slide-title">КАРКАС ПРИЛОЖЕНИЙ (FRAMEWORK) И SDK ТУРБАЗЫ</h1>
    <p class="slide-subtitle">Среда исполнения модульного распределенного софта без бэкенда, облачных баз и DevOps-затрат</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph TD
    UI["💻 Пользовательский интерфейс (Angular / React / Vue)"]
    SDK["📦 SDK Турбазы (Tarmaq DSL & Реактивные DAO)"]
    Sand["🛡️ Доменная песочница IFrame (Изоляция контекстов)"]
    Core["⚙️ Системное ядро Листа (DI & Entity Graph Engine)"]
    DB["💾 Локальная СУБД SQLite (WITHOUT ROWID)"]

    UI -->|Signals & Bindings| SDK
    SDK -->|RPC postMessage| Sand
    Sand -->|Read-Anywhere / Write-Self| Core
    Core -->|ACID транзакции| DB
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Революция в разработке корпоративного ПО</h4>
          <p>Разработчикам больше не нужно поднимать Kubernetes-кластеры, разворачивать серверные базы данных и писать сложные микросервисные REST API для синхронизации.</p>
        </div>
        <div class="content-card">
          <h4>Единая среда исполнения на клиенте</h4>
          <p>Прикладной каркас берет на себя компиляцию моделей данных, реактивную привязку к интерфейсу, песочницу безопасности и валидацию прав доступа.</p>
        </div>
        <div class="content-card">
          <h4>Темы архитектурного разбора</h4>
          <p>В этом выпуске: компилятор Runway, доменная песочница, протокол RPC, принцип «Read-Anywhere, Write-Self», построитель Tarmaq, живые запросы DAO и связь с Angular Signals.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Приветствую, коллеги. В третьем выпуске архитектурной серии детально исследуются прикладной каркас и инструментарий разработчика платформы «Турбаза».
>
> До сих пор создание распределенных систем требовало колоссального серверного бэкенда: кластеров баз данных, очередей сообщений, балансировщиков нагрузки и сложнейших микросервисных архитектур.
>
> Фреймворк «Турбазы» полностью переворачивает эту модель. В архитектуре платформы приложение создается как автономный локальный модуль. Разработчик оперирует привычными классами TypeScript, декораторами и SQL-запросами, а фреймворк автоматически гарантирует изоляцию, безопасность и peer-to-peer синхронизацию. Давайте разберем его внутреннее устройство.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">СТАТИЧЕСКИЙ АНАЛИЗ &middot; КОМПИЛЯТОР RUNWAY</div>
    <h2 class="slide-title">АРХИТЕКТУРА RUNWAY: ДЕКОРАТОРЫ БЕЗ ОВЕРХЕДА</h2>
    <p class="slide-subtitle">Статическая кодогенерация AST, типизированных Q-сущностей и DAO вместо рантайм-рефлексии</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="code-block-card">
          <div class="code-header">Декларация модели TypeScript &rarr; Нулевой оверхед в рантайме</div>
          <pre><code>@Entity()
@Table({ name: 'TASKS' })
export class Task extends AirEntity {
  @Id()
  @Column({ name: 'TASK_NAME' })
  name: string;

  @ManyToOne()
  @JoinColumn({ name: 'TOPIC_RID_', referencedColumnName: 'REPOSITORY_LID' })
  topic: Topic;
}
// В рантайме: decorators = () => {} (0 байт накладных расходов)
// Компилятор Runway генерирует: QTask.ts, TaskDao.ts, vSchema.ts</code></pre>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Отказ от дорогостоящей рефлексии (Reflect Metadata)</h4>
          <p>Традиционные ORM (TypeORM, Hibernate) тратят сотни мегабайт ОЗУ на разбор метаданных в рантайме. В мобильных браузерах это приводит к недопустимым задержкам старта.</p>
        </div>
        <div class="content-card">
          <h4>Статическая кодогенерация компилятором Runway</h4>
          <p>Runway парсит синтаксическое дерево (AST) моделей на этапе сборки проекта и генерирует типобезопасные классы <code>QEntity</code>, таблицы схемы и базовые DAO.</p>
        </div>
        <div class="content-card">
          <h4>Нулевой вес декораторов в браузере</h4>
          <p>В собранном JavaScript-коде декораторы компилируются в пустые заглушки без выполнения какой-либо логики в браузере пользователя.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Основой производительности каркаса Турбазы является компилятор Runway.
>
> Классические серверные ORM используют тяжелую динамическую рефлексию метаданных. При запуске на мобильном устройстве это съедает десятки мегабайт оперативной памяти и задерживает старт приложения на секунды.
>
> Runway решает проблему принципиально иначе. Декораторы Entity, Table и ManyToOne служат лишь маркерами для статического анализатора на этапе сборки. Runway генерирует строгие типизированные Q-сущности и базовые DAO во время компиляции. В рантайме в браузер попадает чистый легковесный код с нулевыми накладными расходами на рефлексию.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">БЕЗОПАСНОСТЬ ИЗОЛЯЦИИ &middot; ПЕСОЧНИЦА</div>
    <h2 class="slide-title">АРХИТЕКТУРА ДОМЕННОЙ ПЕСОЧНИЦЫ (SANDBOX)</h2>
    <p class="slide-subtitle">Изоляция независимых приложений в доменных IFrame с рандомизацией поддоменов</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph TB
    subgraph Host["Хостовая страница оболочки Турбазы (turbase.local)"]
        Hub["Ядро Турбазы: SQLite, Keyring, RPC Hub"]
    end

    subgraph SandA["IFrame Песочница А (app-a-7f9a.turbase.local)"]
        AppA["Органайзер «Деловой»<br/>Свой DOM, локальный JS"]
    end

    subgraph SandB["IFrame Песочница Б (app-b-3d2c.turbase.local)"]
        AppB["Путешествия «УраТур»<br/>Свой DOM, локальный JS"]
    end

    AppA -.->|Блокировано политикой Same-Origin| AppB
    AppA -->|Только типизированный postMessage RPC| Hub
    AppB -->|Только типизированный postMessage RPC| Hub
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Угроза взаимного влияния в браузере</h4>
          <p>В единой экосистеме работают десятки приложений разных разработчиков. Одно скомпрометированное приложение не должно иметь возможности прочитать чужие токены или украсть сессию.</p>
        </div>
        <div class="content-card">
          <h4>Изоляция на уровне происхождения (Origin Isolation)</h4>
          <p>Каждое приложение изолируется в собственном контейнере IFrame с уникальным псевдослучайным поддоменом. Политика Same-Origin браузера на аппаратном уровне ядра ОС блокирует прямой доступ к чужому DOM и памяти.</p>
        </div>
        <div class="content-card">
          <h4>Контролируемый канал связи с ядром</h4>
          <p>Единственный путь взаимодействия приложения с базой данных — строго типизированный канал обмена сообщениями, контролируемый RPC-шлюзом Турбазы.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Когда на одном клиентском устройстве запускаются приложения разных разработчиков — от органайзера до финансовых сервисов — критически важно гарантировать их полную взаимную изоляцию.
>
> Фреймворк «Турбазы» запускает каждое приложение внутри изолированного IFrame с динамически генерируемым уникальным поддоменом.
>
> Браузер применяет аппаратную изоляцию процессов на базе политики Same-Origin. Ни одно приложение не может прочитать чужую память, перехватить нажатия клавиш или получить доступ к локальным файлам другого модуля. Все операции с базой данных проходят через единый защищенный RPC-мост с обязательной проверкой криптографических сертификатов.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРОТОКОЛ ОБМЕНА &middot; АСИНХРОННЫЙ МОСТ</div>
    <h2 class="slide-title">МЕЖКОНТЕКСТНЫЙ RPC ЧЕРЕЗ POSTMESSAGE</h2>
    <p class="slide-subtitle">Высокоскоростная шина вызовов с защитой от спама, пакетным дебаунсингом и токенами вызовов</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
sequenceDiagram
    participant App as Приложение в IFrame (SDK Client)
    participant Bridge as RPC Interceptor & Debouncer
    participant Core as Ядро Турбазы (SQLite Engine)

    App->>Bridge: Запрос: TaskDao._find({ status: 1 }) [ReqId: 1042]
    Bridge->>Bridge: Проверка квоты частоты вызовов (Debounce)
    Bridge->>Core: window.postMessage(ReqId, Payload)
    Core->>Core: Валидация прав доступа к схеме
    Core->>Core: Исполнение SQL в ядре SQLite
    Core-->>Bridge: window.postMessage(ReqId, ResultData)
    Bridge-->>App: Promise.resolve(ResultData)
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Асинхронный мост без блокировки интерфейса</h4>
          <p>Все обращения к базе данных выполняются через асинхронный протокол <code>window.postMessage</code>, что полностью исключает фризы основного потока отрисовки интерфейса (UI Thread).</p>
        </div>
        <div class="content-card">
          <h4>Пакетный дебаунсинг и агрегация</h4>
          <p>Шина автоматически склеивает множественные запросы, отправленные в рамках одного тика событий (Event Loop), снижая количество межконтекстных переключений в разы.</p>
        </div>
        <div class="content-card">
          <h4>Токены корреляции и тайм-ауты</h4>
          <p>Каждый запрос несет уникальный <code>RequestCorrelationId</code>. Система защищена от зависаний: при превышении тайм-аута запрос корректно отменяется с освобождением ресурсов.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Взаимодействие между песочницей приложения и ядром базы данных осуществляется через специализированный протокол межконтекстного RPC.
>
> Протокол использует браузерный механизм postMessage с интеллектуальным перехватчиком запросов. Если пользовательский интерфейс генерирует несколько обращений к базе в рамках одного кадра, система автоматически объединяет их в единый пакет, предотвращая перегрузку браузерной шины.
>
> Каждый запрос маркируется уникальным идентификатором корреляции и защищен жесткими квотами частоты вызовов. Это исключает атаки типа «отказ в обслуживании», гарантируя стабильную отзывчивость всей платформы в 60 кадров в секунду.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">БАЗОВЫЙ ИНВАРИАНТ &middot; ФИЛОСОФИЯ БЕЗОПАСНОСТИ</div>
    <h2 class="slide-title">ПРИНЦИП «READ-ANYWHERE, WRITE-SELF»</h2>
    <p class="slide-subtitle">Фундаментальный закон гарантированной безопасности и владения данными в экосистеме Турбазы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph LR
    subgraph ReadOperation["ЧТЕНИЕ: Read-Anywhere (Открыто)"]
        App1["Приложение «Деловой»"] -->|Прямой SQL SELECT & JOIN| DataBoth["Таблицы Органайзера + Таблицы Путешествий"]
    end

    subgraph WriteOperation["ЗАПИСЬ: Write-Self (Строго изолировано)"]
        App1 -->|Прямой SQL INSERT/UPDATE| OwnData["Свои таблицы (Органайзер) ✅"]
        App1 -.->|Прямая запись заблокирована ❌| ForeignData["Чужие таблицы (Путешествия)"]
        App1 -->|Вызов открытого метода @Api()| SafeGateway["API Путешествий &rarr; Валидация &rarr; Запись ✅"]
    end
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Полное владение пользователя своими данными</h4>
          <p>Поскольку все данные на устройстве принадлежат пользователю, приложения должны свободно взаимодействовать и обогащать информацию друг друга без искусственных барьеров.</p>
        </div>
        <div class="content-card">
          <h4>Read-Anywhere (Свободное чтение)</h4>
          <p>Любое авторизованное приложение может делать прямые SQL SELECT запросы и межсхемные JOIN с таблицами любых других установленных приложений.</p>
        </div>
        <div class="content-card">
          <h4>Write-Self (Запись только своего)</h4>
          <p>Ни одно приложение не имеет права напрямую модифицировать таблицы другого вендора. Запись чужих данных возможна только через вызовы открытых методов <code>@Api()</code> приложения-владельца.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Краеугольным камнем архитектуры безопасности Турбазы является принцип «Read-Anywhere, Write-Self» — «Читай отовсюду, пиши только свое».
>
> В традиционных операционных системах приложения изолированы в «силосных башнях»: чтобы органайзер увидел бронирование из туристического приложения, разработчики должны писать сложные API-интеграции через удаленные серверы.
>
> В «Турбазе» все локальные данные принадлежат гражданину. Любое приложение может мгновенно прочитать данные других приложений через нативный SQL JOIN прямо на устройстве. Однако на запись действует абсолютный запрет: изменить чужие данные напрямую через SQL невозможно. Модификация разрешена исключительно через легитимный API-шлюз владельца структуры данных.

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">КРОСС-СХЕМНЫЕ ЗАПРОСЫ &middot; СИНЕРГИЯ ДАННЫХ</div>
    <h2 class="slide-title">РЕАЛИЗАЦИЯ «READ-ANYWHERE»: ЛОКАЛЬНЫЕ JOIN</h2>
    <p class="slide-subtitle">Мгновенное объединение данных разных приложений в единой локальной реляционной базе</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="code-block-card">
          <div class="code-header">Кросс-доменный запрос в Tarmaq DSL (Органайзер + Путешествия)</div>
          <pre><code>// Выборка задач органайзера с привязкой к билетам «УраТур»:
await taskDao.find({
  SELECT: {
    taskName: qTask.name,
    flightNumber: qFlight.flightCode,
    departureTime: qFlight.departsAt
  },
  FROM: [
    qTask,
    qFlight.LEFT_JOIN(qTask.flightLink)
  ],
  WHERE: qTask.status.equals(TaskStatus.ACTIVE)
});
// Выполняется на ядре SQLite за 0.4 миллисекунды!</code></pre>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Кросс-схемная синергия без серверных API</h4>
          <p>Органайзер «Деловой» может встроить в расписание перелеты из «УраТур», платежи из Финтех-модуля и голосования из «КубГолос» в одном SQL-запросе.</p>
        </div>
        <div class="content-card">
          <h4>Отсутствие сетевых задержек</h4>
          <p>Вместо десятков параллельных HTTP-запросов к внешним REST API запрос исполняется напрямую в локальной разделяемой памяти за доли миллисекунды.</p>
        </div>
        <div class="content-card">
          <h4>Полная автономность в офлайне</h4>
          <p>Сложные аналитические выборки и сводные дашборды формируются моментально даже при полном отсутствии подключения к интернету.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Посмотрим, как принцип «Read-Anywhere» раскрывается на практике.
>
> Представьте, что разработчик органайзера «Деловой» хочет показать пользователю задачи, привязанные к расписанию авиаперелетов из приложения «УраТур». В классическом вебе потребовалось бы согласовывать серверные API, настраивать OAuth и слать тяжелые сетевые запросы.
>
> В «Турбазе» разработчик просто пишет типобезопасный запрос с оператором LEFT_JOIN между таблицей задач и таблицей авиарейсов. Ядро SQLite выполняет этот запрос в единой локальной базе за четыре десятых миллисекунды. Пользователь получает бесшовную интеграцию данных без единого байта трафика и с гарантией работы в авиарежиме.

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ЗАЩИТА ЦЕЛОСТНОСТИ &middot; КОНТРОЛЬ МУТАЦИЙ</div>
    <h2 class="slide-title">РЕАЛИЗАЦИЯ «WRITE-SELF»: ЗАЩИТА ГРАФА СУЩНОСТЕЙ</h2>
    <p class="slide-subtitle">Инспекция графа модификаций и перехват чужих сущностей маркером FROM_ANOTHER_APP</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph TD
    SaveCall["Вызов сохранения графа: taskDao.save(taskWithTopic)"]
    Inspect["EntityGraphReconstructor: Анализ схемы сущностей"]
    Check{"Сущность принадлежит текущему приложению?"}
    Allow["Включение в очередь записи: DependencyGraphResolver &rarr; SQL INSERT/UPDATE ✅"]
    Block["Присвоение маркера: FROM_ANOTHER_APP 🚫"]
    Error["Выброс исключения безопасности: Direct write to foreign schema forbidden!"]

    SaveCall --> Inspect
    Inspect --> Check
    Check -- "Да (Своя схема)" --> Allow
    Check -- "Нет (Чужая схема)" --> Block
    Block --> Error
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Угроза несанкционированной перезаписи</h4>
          <p>Если стороннее приложение попытается напрямую изменить статус билета или баланс в таблице чужого сервиса, это разрушит бизнес-инварианты системы.</p>
        </div>
        <div class="content-card">
          <h4>Анализатор графа: EntityGraphReconstructor</h4>
          <p>Перед формированием транзакции фреймворк разбирает полный граф переданных объектов и проверяет идентификатор схемы каждого из них.</p>
        </div>
        <div class="content-card">
          <h4>Маркер изоляции: FROM_ANOTHER_APP</h4>
          <p>Любая сущность, принадлежащая чужой схеме, автоматически маркируется флагом <code>FROM_ANOTHER_APP</code>. Планировщик <code>DependencyGraphResolver</code> исключает ее из транзакции и блокирует запись.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как же платформа гарантирует соблюдение второй части принципа — «Write-Self»?
>
> Когда приложение вызывает метод сохранения графа объектов, в работу вступает анализатор EntityGraphReconstructor. Он рекурсивно обходит все связанные сущности и сопоставляет их с реестром зарегистрированных схем.
>
> Если в графе обнаруживается объект, принадлежащий другому приложению, система присваивает ему системный маркер FROM_ANOTHER_APP. Планировщик зависимостей мгновенно исключает чужой объект из очереди дисковой записи и генерирует аппаратную ошибку доступа. Прямая перезапись чужих таблиц заблокирована на уровне ядра фреймворка.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ИНТЕРФЕЙСЫ МИКРОСЕРВИСОВ &middot; ШЛЮЗЫ МУТАЦИЙ</div>
    <h2 class="slide-title">ОБЩЕСТВЕННЫЕ ИНТЕРФЕЙСЫ: ДЕКОРАТОР @Api()</h2>
    <p class="slide-subtitle">Легитимный вызов бизнес-методов приложения-владельца для модификации данных</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="code-block-card">
          <div class="code-header">Объявление открытого API микросервиса (@airline/topics)</div>
          <pre><code>@Injected()
export class TopicApi {
  @Inject()
  topicDao: ITopicDao;

  @Api()
  async createTopic(name: string): Promise<Topic> {
    // 1. Валидация прав и бизнес-правил
    if (!name || name.trim().length === 0) {
      throw new Error('Имя темы не может быть пустым');
    }
    // 2. Легитимная запись владельцем схемы
    return await this.topicDao.save({ name });
  }
}</code></pre>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Управляемые точки входа (Contract Gateways)</h4>
          <p>Декоратор <code>@Api()</code> объявляет открытый метод сервиса, доступный для вызова другими приложениями через межпесочный RPC-мост.</p>
        </div>
        <div class="content-card">
          <h4>Полный контроль бизнес-логики владельцем</h4>
          <p>Приложение-владелец проверяет права вызывающей стороны, проводит валидацию входных параметров и выполняет запись в свои таблицы от своего имени.</p>
        </div>
        <div class="content-card">
          <h4>Автоматическая генерация клиентских SDK</h4>
          <p>Компилятор Runway генерирует строго типизированные интерфейсы-клиенты, позволяя другим разработчикам вызывать чужие API с автодополнением кода в IDE.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Единственный легитимный способ изменить данные другого приложения — вызвать его открытый метод, помеченный декоратором @Api.
>
> Декоратор @Api превращает обычный класс TypeScript в защищенный шлюз микросервиса. Когда внешнему приложению требуется создать новую категорию или изменить статус заказа, оно вызывает сгенерированный клиентский метод этого шлюза.
>
> Вся бизнес-логика, проверка прав доступа, валидация полей и фиксация изменений выполняются самим приложением-владельцем. Это обеспечивает абсолютную строгость корпоративных правил при полной открытости децентрализованной экосистемы.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ВНЕДРЕНИЕ ЗАВИСИМОСТЕЙ &middot; ТРАНЗАКЦИОННЫЙ КОНТЕКСТ</div>
    <h2 class="slide-title">КОНТЕКСТНЫЙ DEPENDENCY INJECTION</h2>
    <p class="slide-subtitle">Разрешение зависимостей на лету через direction-indicator без тяжелых DI-контейнеров</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph LR
    subgraph TransactionContext["Контекст транзакции (Transaction Scope)"]
        Tx["Активная транзакция SQLite (Savepoint)"]
        Token["Токен контекста выполнения"]
    end

    subgraph ServiceLayer["Слой внедрения зависимостей"]
        Api["@Injected() Сервис"]
        Dao1["@Inject() TaskDao"]
        Dao2["@Inject() TopicDao"]
    end

    Api -->|Ленивая резолюция через Object.defineProperty| Dao1
    Api -->|Ленивая резолюция через Object.defineProperty| Dao2
    Dao1 -->|Связывание с единым Tx контекстом| Tx
    Dao2 -->|Связывание с единым Tx контекстом| Tx
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Легковесный DI-движок (direction-indicator)</h4>
          <p>Вместо тяжелых контейнеров Spring или NestJS платформа использует сверхбыстрый алгоритм разрешения зависимостей на базе дескрипторов <code>Object.defineProperty</code>.</p>
        </div>
        <div class="content-card">
          <h4>Транзакционная изоляция контекстов (Scope)</h4>
          <p>Все внедряемые DAO в рамках одного запроса автоматически привязываются к текущему контексту транзакции и разделяют единый сэйвпоинт базы данных.</p>
        </div>
        <div class="content-card">
          <h4>Ленивая инициализация сервисов</h4>
          <p>Экземпляры сервисов создаются только в момент первого фактического обращения к свойству, сохраняя оперативную память мобильного устройства.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Управление зависимостями в клиентских приложениях критично для чистоты кода и тестируемости. Однако стандартные контейнеры внедрения зависимостей перегружены сложной рефлексией.
>
> Фреймворк «Турбазы» применяет легковесный механизм direction-indicator. Связывание компонентов происходит на базе нативных дескрипторов JavaScript свойств с ленивой инициализацией.
>
> Главное архитектурное достоинство этого механизма внедрения зависимостей — автоматическая контекстная изоляция. Все зависимости, инжектированные в сервис, бесшовно связываются с текущей транзакцией базы данных. Если операция падает с ошибкой, весь контекст транзакции откатывается атомарно.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ТИПОБЕЗОПАСНЫЙ SQL &middot; DSL ЗАПРОСОВ</div>
    <h2 class="slide-title">ТИПИЗИРОВАННЫЙ ПОСТРОИТЕЛЬ ЗАПРОСОВ (TARMAQ DSL)</h2>
    <p class="slide-subtitle">Статически проверяемый DSL на TypeScript: защита от инъекций, мощь реляционного SQL и контракты IChildRecordPage</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="code-block-card">
          <div class="code-header">Tarmaq DSL и контракт страниц IChildRecordPage</div>
          <pre><code>// 1. Контракт страницы агрегативного хранилища 1:N:
export interface IChildRecordPage&lt;T&gt; extends AirEntity {
  pageNumber: number;
  isSealed: boolean;
  childRecords: T[]; // Листовые проекции (ID + Title)
}

// 2. Типобезопасный запрос страниц через Tarmaq DSL:
const qPage = Q_APP_PAGES.ChildRecordPage;
const activePages = await this.pageDao.find({
  SELECT: { id: qPage.actorRecordId, isSealed: qPage.isSealed },
  FROM: [qPage],
  WHERE: AND(
    qPage.isSealed.equals(false),
    qPage.pageNumber.greaterThan(0)
  )
});</code></pre>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>100% типобезопасность на этапе компиляции</h4>
          <p>Любая опечатка в имени колонки, типе данных или операторе сравнения отлавливается компилятором TypeScript до запуска кода на устройстве.</p>
        </div>
        <div class="content-card">
          <h4>Абсолютный иммунитет к SQL-инъекциям</h4>
          <p>Tarmaq DSL не склеивает строки. Движок компилирует предикаты в параметризованные запросы SQLite с жестким связыванием бинарных параметров.</p>
        </div>
        <div class="content-card">
          <h4>Встроенные контракты IChildRecordPage</h4>
          <p>DSL нативно поддерживает агрегативные страницы <code>IChildRecordPage</code> (~1000 элементов), позволяя типобезопасно оперировать выжимками дочерних хранилищ.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Для построения сложных запросов каркас Турбазы предоставляет Tarmaq DSL — строго типизированный язык запросов для TypeScript.
>
> Вместо ненадежного склеивания сырых SQL-строк разработчик оперирует сгенерированными объектами QEntity и логическими предикатами. Любая синтаксическая ошибка или несовпадение типов пресекается компилятором на этапе сборки.
>
> DSL включает прямую поддержку контрактов страниц IChildRecordPage для масштабирования коллекций. При исполнении Tarmaq транслирует граф условий в параметризованные команды SQLite, гарантируя защиту от инъекций и максимальное быстродействие.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">РЕАКТИВНОСТЬ &middot; ЖИВЫЕ ЗАПРОСЫ ДАННЫХ</div>
    <h2 class="slide-title">РЕАКТИВНЫЕ DAO: ЖИВЫЕ ЗАПРОСЫ (LIVE QUERIES)</h2>
    <p class="slide-subtitle">Метод Dao._search() и автоматическая реактивная трансляция изменений из журнала WAL</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
sequenceDiagram
    participant UI as Компонент интерфейса
    participant DAO as Реактивный DAO: _search()
    participant Core as Ядро Турбазы (WAL Monitor)
    participant Peer as Входящий P2P пакет синхронизации

    UI->>DAO: taskDao._search({ WHERE: ... })
    DAO->>Core: Регистрация подписки на таблицы TASKS
    Core-->>DAO: Первичный снимок данных &rarr; RxJS Observable
    DAO-->>UI: Отрисовка задач в UI

    Peer->>Core: Применение внешнего блока WAL в SQLite
    Core->>Core: Детекция мутации в таблице TASKS
    Core-->>DAO: Push-уведомление о модификации
    DAO->>DAO: Пересчет запроса из кэша ОЗУ
    DAO-->>UI: Эмиссия нового состояния Observable (0 мс)
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Ликвидация ручного опроса (Polling)</h4>
          <p>Приложениям больше не нужно запускать периодические таймеры <code>setInterval</code> для обновления списков или писать сложный код WebSockets.</p>
        </div>
        <div class="content-card">
          <h4>Нативная реактивность через _search()</h4>
          <p>Вызов <code>_search()</code> возвращает RxJS <code>Observable</code>. Любое изменение в базе данных — будь то локальное действие или P2P-синхронизация с коллегой — мгновенно передается подписчикам.</p>
        </div>
        <div class="content-card">
          <h4>Умная гранулярная инвалидация</h4>
          <p>Движок отслеживает сигнатуры таблиц и колонок, обновляя только те подписки, которых коснулись изменения, предотвращая лишние рендеры.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Одной из самых трудоемких задач при создании современных приложений является поддержание актуальности пользовательского интерфейса при изменении данных.
>
> Реактивные DAO в «Турбазе» решают эту проблему концепцией живых запросов через метод _search().
>
> Метод _search() возвращает реактивный поток RxJS Observable. Ядро базы данных отслеживает коммиты в журнал транзакций. Как только в таблице меняются строки — будь то локальный клик пользователя или входящий блок синхронизации от коллеги по P2P — поток мгновенно эмитит обновленный массив данных. Никакого ручного поллинга и никаких внешних WebSocket-серверов.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">МЕЖМОДУЛЬНАЯ КОМПОЗИЦИЯ &middot; ЭВОЛЮЦИЯ СХЕМ</div>
    <h2 class="slide-title">МЕЖМОДУЛЬНАЯ КОМПОЗИЦИЯ ПРИЛОЖЕНИЙ И ЭВОЛЮЦИЯ СХЕМ</h2>
    <p class="slide-subtitle">Однонаправленная иерархия схем VoteCube &rarr; Sapoto &rarr; GoGetter и бесконфликтное расширение</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph TB
    subgraph CoreApp["«КубГолос» (VoteCube)"]
        VoteSchema["Базовые контракты сущностей<br/>- Голосования и опросы<br/>- Факторы и шкалы оценок"]
    end

    subgraph CareApp["«Забота» (Sapoto)"]
        CareSchema["Расширение: Социальная взаимопомощь<br/>- Заявки и подтверждения помощи<br/>- Открытая взаимная репутация"]
    end

    subgraph BizApp["«Деловой» (GoGetter)"]
        BizSchema["Расширение: Бизнес и проекты<br/>- Профессиональные задачи и сметы<br/>- Исполнители и контракты"]
    end

    VoteSchema -->|Импорт схемы| CareSchema
    CareSchema -->|Импорт схемы| BizSchema
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Строгая однонаправленность зависимостей</h4>
          <p>Схемы выстраиваются в четкую иерархию: «КубГолос» &rarr; «Забота» &rarr; «Деловой». Отсутствие циклических зависимостей гарантирует бесконфликтное слияние.</p>
        </div>
        <div class="content-card">
          <h4>Повторное использование типов без дублирования</h4>
          <p>Бизнес-приложение «Деловой» повторно использует проверенные типы репутации из «Заботы» и механизмы опросов из «КубГолоса» прямо в реляционной СУБД.</p>
        </div>
        <div class="content-card">
          <h4>Атомарная инъекция DDL-патчей без даунтайма</h4>
          <p>При обновлении приложений модули инжектируют инкрементальные патчи DDL. Старые клиенты продолжают работу в режиме обратной совместимости.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Уникальной возможностью архитектуры «Турбазы» является межмодульная композиция приложений и непрерывная эволюция схем данных.
>
> Схемы данных образуют строгую однонаправленную иерархию. Базовые контракты опросов и сущностей из «КубГолоса» наследуются модулем взаимопомощи и открытой репутации «Забота». В свою очередь, деловой органайзер «Деловой» надстраивает над ними бизнес-задачи и сметы.
>
> Модули повторно используют проверенные структуры без дублирования кода. При появлении новых версий ядро атомарно применяет инкрементальные DDL-патчи, сохраняя полную обратную совместимость для всех участников экосистемы без остановки сервисов.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">БЕЗОПАСНОСТЬ ДИСТРИБУЦИИ &middot; ЭКОСИСТЕМА</div>
    <h2 class="slide-title">ЖИЗНЕННЫЙ ЦИКЛ ПРИЛОЖЕНИЯ И ДИСТРИБУЦИЯ</h2>
    <p class="slide-subtitle">Сборка пакетов, верификация открытого ключа разработчика и децентрализованная публикация</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="mermaid-diagram-card">
        <div class="mermaid">
graph TB
    Dev["👨‍💻 Разработчик софта (Сборка TypeScript)"]
    Pack["📦 Формирование пакета приложения (.turbase)"]
    Sign["🛡️ Подпись релизным ключом ГОСТ / Ed25519"]
    Store["🌐 Реестр хранилищ (Ветка / P2P Сеть)"]
    User["💻 Клиентский узел: Проверка подписи & Песочница"]

    Dev --> Pack
    Pack --> Sign
    Sign --> Store
    Store --> User
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Независимая дистрибуция без ограничений</h4>
          <p>Приложения не зависят от зарубежных магазинов приложений (App Store / Google Play). Пакеты дистрибутируются через распределенные узлы-ветки и P2P-сеть.</p>
        </div>
        <div class="content-card">
          <h4>Криптографическая верификация целостности</h4>
          <p>Каждый пакет приложения подписывается цифровой подписью вендора. Клиентский терминал проверяет хэш и подпись перед запуском в изолированной песочнице.</p>
        </div>
        <div class="content-card">
          <h4>Прозрачный аудит безопасности</h4>
          <p>В кодовой базе отсутствуют скрытые сетевые коннекторы и закрытые трекеры. Все межмодульные связи прозрачно декларируются в манифесте приложения.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Дистрибуция программного обеспечения в «Турбазе» свободна от монопольного контроля зарубежных магазинов приложений.
>
> Пакет приложения собирается в компактный подписанный архив, включающий скомпилированный код песочницы, манифест схем данных и открытые интерфейсы.
>
> Пакеты распространяются напрямую через пиринговую сеть платформы и муниципальные ветки. При установке клиентское устройство верифицирует криптографическую подпись создателя по отечественным стандартам ГОСТ. Это исключает внедрение вредоносных закладок на этапах передачи и развертывания.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПОЛЬЗОВАТЕЛЬСКИЙ ИНТЕРФЕЙС &middot; ИНТЕГРАЦИЯ С UI</div>
    <h2 class="slide-title">ИНТЕГРАЦИЯ С UI: ПРЯМАЯ СВЯЗЬ СО SIGNALS</h2>
    <p class="slide-subtitle">Бесшовный мост от RxJS Observable к Angular Signals (toSignal) и React Hooks без задержек</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="code-block-card">
          <div class="code-header">Привязка данных в компоненте Angular Signals</div>
          <pre><code>@Component({
  selector: 'delovoy-task-list',
  template: `
    @for (task of tasks(); track task.id) {
      &lt;div class="task-card"&gt;{{ task.title }}&lt;/div&gt;
    }
  `
})
export class TaskListComponent {
  private taskDao = inject(TaskDao);
  // Моментальная трансформация живого запроса в сигнал:
  tasks = toSignal(this.taskDao._search({
    WHERE: qTask.status.equals(TaskStatus.ACTIVE)
  }), { initialValue: [] });
}</code></pre>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Прямая реактивность без бойлерплейта</h4>
          <p>Функция <code>toSignal()</code> превращает живой запрос базы данных в нативный сигнал пользовательского интерфейса в одну строчку кода.</p>
        </div>
        <div class="content-card">
          <h4>Отклик интерфейса за 1 кадр дисплея (16 мс)</h4>
          <p>Поскольку данные лежат в оперативной памяти того же устройства, смена состояния в интерфейсе происходит моментально со скоростью 60 кадров в секунду.</p>
        </div>
        <div class="content-card">
          <h4>Универсальная поддержка UI-фреймворков</h4>
          <p>SDK предоставляет адаптеры для всех современных стеков: Angular Signals, React Hooks (<code>useLiveQuery</code>), Vue Composition API и Svelte Stores.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как живые запросы интегрируются в современный пользовательский интерфейс?
>
> Благодаря открытой архитектуре реактивных потоков, интеграция с новейшими механизмами вроде Angular Signals или React Hooks требует ровно одной строки кода. С помощью функции toSignal живой запрос базы данных напрямую связывается с шаблоном компонента.
>
> Фронтенд-разработчик избавлен от необходимости писать Redux-экшены, саги и контроллеры состояний. База данных сама становится реактивным источником правды для интерфейса, обеспечивая мгновенный отклик в шестнадцать миллисекунд.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">РЕЗЮМЕ ВЫПУСКА 03 &middot; АРХИТЕКТУРНЫЙ ИТОГ</div>
    <h2 class="slide-title">АРХИТЕКТУРНОЕ РЕЗЮМЕ ДЛЯ ИНЖЕНЕРА</h2>
    <p class="slide-subtitle">Разработка корпоративных распределенных систем без расходов на бэкенд и облачные базы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="visual-panel">
      <div class="content-cards-stack">
        <div class="content-card border-lime">
          <h4>Ключевые преимущества Framework и SDK Турбазы</h4>
          <ul class="arch-list">
            <li><strong>Компилятор Runway:</strong> Нулевой оверхед рантайма, генерация типизированных сущностей и DAO из AST.</li>
            <li><strong>Доменная песочница:</strong> Аппаратная изоляция приложений в IFrame с защитой Same-Origin.</li>
            <li><strong>Read-Anywhere, Write-Self:</strong> Свободные кросс-схемные JOIN при абсолютной защите от чужих мутаций.</li>
            <li><strong>Tarmaq DSL:</strong> 100% типобезопасный SQL на TypeScript с полной защитой от инъекций.</li>
            <li><strong>Живые запросы:</strong> Нативная привязка изменений WAL к Angular Signals за 16 миллисекунд.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="content-panel">
      <div class="content-cards-stack">
        <div class="content-card border-cyan">
          <h4>Мост к следующему выпуску: Выпуск 04</h4>
          <p>В следующем выпуске представлена <strong>Архитектура узла «Ветка» (Branch Node)</strong>: конвейер данных высокой надежности, трехфазная цепочка PersistentQueue &rarr; ConcurrentMap &rarr; FileSystem, Time-Traveling и обслуживание общественных реестров.</p>
        </div>
        <div class="content-card">
          <h4>Экономический триумф архитектуры</h4>
          <p>ИТ-компания получает возможность создавать масштабируемые цифровые продукты корпоративного класса с нулевыми затратами на аренду облачных серверов.</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Подведем итоги третьего выпуска архитектурной серии.
>
> Framework и SDK платформы «Турбаза» предоставляют инженерам законченный инструмент для создания распределенных приложений нового поколения с прямым владением информацией.
>
> Сочетание статического компилятора Runway, доменной изоляции песочницы, незыблемого принципа «Read-Anywhere, Write-Self», типобезопасного DSL Tarmaq и реактивных живых запросов позволяет программистам создавать сложные корпоративные сервисы в разы быстрее, чем в классическом веб-стеке. И главное — с нулевыми затратами на серверный бэкенд.
>
> В следующем, четвертом выпуске рассматривается архитектура узла «Ветка» — периферийного координатора гарантированной надежности. Спасибо за внимание, увидимся в выпуске номер четыре.
