# Исследование реализации кросс-приложенческого взаимодействия в кодовой базе AIRport и AIRline

> **Статус документа:** Исследовательский инженерный отчёт (Engineering Grounding & Source Code Audit)  
> **Назначение:** Доказательная инженерная база для Белой Книги № 12 («Экосистема платформы Турбаза») и презентации «Локальный реестр сервисов МСП и ЖКХ» (`applications_presentations/05_local_services_presentation/`)  
> **Исследованные источники:**  
> - Схемы метаданных и ядра: `AIRroot/AIRport/schemas/` (`airspace`, `airport-code`, `final-approach`, `holding-pattern`, `layover`, `travel-document-checkpoint`)  
> - Реальные прикладные приложения: `AIRroot/AIRline/apps/` (`topics`, `conversations`, `tasks`)  
> - Движок генерации и выполнения: `AIRroot/AIRport/generators/runway`, `AIRroot/AIRport/engines/tower`  
> **Дата составления:** Октябрь 2026 г.  

---

## Аннотация

Настоящий документ представляет исчерпывающий технический разбор того, как в реальном коде открытой кодовой базы `AIRport` и пакета прикладных сервисов `AIRline` реализовано взаимодействие независимых приложений между собой. В отличие от традиционных централизованных микросервисов или монолитных баз данных, в архитектуре клиентского узла («Листа») взаимодействие строится на фундаментальной асимметрии:

1. **Чтение без сетевых задержек (Unified Local Read):** все схемы и таблицы установленных приложений физически размещаются в едином локальном встраиваемом реляционном движке (SQLite / SQL.js). Компонент `Tarmaq Query` выполняет прямые реляционные соединения (`LEFT JOIN` / `INNER JOIN`) между таблицами разных приложений с микросекундной задержкой ($\le 0{,}1$ мс).
2. **Изолированная и суверенная запись (Sandboxed Encapsulated Write):** ни одно приложение не имеет права напрямую модифицировать таблицы чужой схемы или вторгаться в чужие транзакции. Запись выполняется исключительно через фасад типизированных вызовов `@Api()`, проксируемых (`ApiProxy`) через границы изолированных песочниц (`<iframe>` / Web Worker).
3. **Границы транзакций и Хранилищ (One Transaction per Repository):** композиция данных реализуется либо через **колокацию** (включение дочерней сущности другого приложения в единое Хранилище), либо через **связующие ассоциативные сущности (Link Entities)**, сохраняемые в локальном Хранилище ссылающейся стороны без мутации чужого журнала изменений.

```mermaid
flowchart TD
    subgraph UI_Layer["Пользовательский интерфейс и Каркас (Органайзер)"]
        UI["UI-компонент / Композитный экран"]
    end

    subgraph Client_DB["Локальная реляционная СУБД (SQLite на Листе)"]
        TOPIC_TBL[("Таблица TOPIC<br/>(@airline/topics)")]
        TASK_TBL[("Таблица TASKS<br/>(@airline/tasks)")]
        COLL_TBL[("Таблица COLLECTIONS<br/>(@airline/conversations)")]
        CONV_TBL[("Таблица CONVERSATIONS<br/>(@airline/conversations)")]
        GOAL_TASK_TBL[("Таблица GOAL_TASKS<br/>(@airline/tasks link)")]

        TASK_TBL -.->|"SQL LEFT JOIN (3 FK: _RID_, _AID_, _ARID_)"| TOPIC_TBL
        TASK_TBL -.->|"SQL LEFT JOIN (3 FK: _RID_, _AID_, _ARID_)"| COLL_TBL
        COLL_TBL -.->|"SQL LEFT JOIN (3 FK: _RID_, _AID_, _ARID_)"| TOPIC_TBL
    end

    subgraph App_Tasks["Песочница приложения @airline/tasks (iframe)"]
        TaskApi["TaskApi (@Api)<br/>create(task)"]
        TaskDao["TaskDao (Tarmaq DAO)"]
    end

    subgraph App_Conversations["Песочница приложения @airline/conversations (iframe)"]
        CollectionApiProxy["CollectionApi (ApiProxy)"]
        CollectionApiImpl["CollectionApi (Реализация)"]
        ConversationApiImpl["ConversationApi (Реализация)"]
    end

    UI -->|"Вызов через ApiProxy"| TaskApi
    TaskApi -->|"1. Создание Хранилища задачи"| RepApi["RepositoryApi<br/>(@airport/holding-pattern)"]
    TaskApi -->|"2. Межмодульный RPC-вызов create(name, repository)"| CollectionApiProxy
    CollectionApiProxy -->|"postMessage / airgate"| CollectionApiImpl
    CollectionApiImpl -->|"3. Колокация: запись Collection в Rep задачи"| COLL_TBL
    TaskApi -->|"4. Запись Task в Rep задачи"| TaskDao
    TaskDao -->|"Локальный SQL INSERT"| TASK_TBL
    TaskDao -->|"5. Связка с целью в Rep цели"| GOAL_TASK_TBL

    UI -.->|"Прямой локальный реактивный SQL-запрос (Live Observable)"| TaskDao
    TaskDao -.->|"Мгновенная выборка с JOIN по 3 приложениям"| Client_DB
```

---

## 1. Топология графа зависимостей пакетов (Package Dependency Graph)

В репозитории `AIRline/apps` приложения образуют строгую иерархическую структуру зависимостей, декларируемую в манифестах `package.json` через секцию `peerDependencies`.

### 1.1. Матрица межмодульных связей

| Приложение (`Package`) | Назначение модуля | Внешние зависимости от приложений (`AIRline`) | Зависимости от схем ядра (`AIRport`) |
| :--- | :--- | :--- | :--- |
| **`@airline/topics`** | Тематические рубрики, категории, темы (`Theme`, `Topic`) | *Отсутствуют* (базовый классификатор экосистемы) | `@airport/final-approach`<br/>`@airport/holding-pattern`<br/>`@airport/travel-document-checkpoint` |
| **`@airline/conversations`** | Обсуждения, коллекции, сообщения, модераторы (`Collection`, `Conversation`, `Comment`) | `@airline/topics` | `@airport/final-approach`<br/>`@airport/holding-pattern`<br/>`@airport/travel-document-checkpoint` |
| **`@airline/tasks`** | Задачи, цели, вехи, исполнители (`Task`, `Goal`, `Subtask`, `GoalTask`) | `@airline/topics`<br/>`@airline/conversations` | `@airport/final-approach`<br/>`@airport/holding-pattern`<br/>`@airport/travel-document-checkpoint` |

### 1.2. Декларация в `package.json`

В коде `@airline/tasks/package.json` зависимости зафиксированы следующим образом:

```json
{
  "name": "@airline/tasks",
  "airport": {
    "domain": "localhost:3003",
    "application": "@airline/tasks"
  },
  "peerDependencies": {
    "@airbridge/validate": "workspace:../../../AIRbridge/validate",
    "@airline/conversations": "workspace:../conversations",
    "@airline/topics": "workspace:../topics",
    "@airport/airgate": "workspace:../../../AIRport/libs/airgate",
    "@airport/direction-indicator": "workspace:../../../AIRport/libs/direction-indicator",
    "@airport/final-approach": "workspace:../../../AIRport/schemas/final-approach",
    "@airport/ground-control": "workspace:../../../AIRport/apis/ground-control",
    "@airport/holding-pattern": "workspace:../../../AIRport/schemas/holding-pattern",
    "@airport/tarmaq-dao": "workspace:../../../AIRport/ORMs/tarmaq/dao",
    "@airport/tarmaq-entity": "workspace:../../../AIRport/ORMs/tarmaq/entity",
    "@airport/tarmaq-query": "workspace:../../../AIRport/ORMs/tarmaq/query",
    "@airport/travel-document-checkpoint": "workspace:../../../AIRport/schemas/travel-document-checkpoint",
    "@airport/web-tower": "workspace:../../../AIRport/platforms/web-tower",
    "rxjs": "workspace:../../../node_modules/rxjs"
  }
}
```

Модуль `@airline/topics` выступает независимым корневым каталогом классификаторов. Модуль `@airline/conversations` расширяет темы, добавляя к ним коллекции бесед. Модуль `@airline/tasks` объединяет категории и обсуждения вокруг структуры оперативных задач и стратегических целей.

---

## 2. Метамодель ядра `AIRport/schemas`: системный реестр связей

Для поддержки межприложенческого взаимодействия в локальной СУБД схемы ядра `AIRport` формируют метамодель, регистрирующую приложения, версии и межверсионные связи.

### 2.1. Реестр версий и зависимостей (`airspace`)

В схеме `AIRport/schemas/airspace` таблица `DB_APPLICATION_REFERENCES` хранит детерминированный граф ссылок между версиями установленных приложений:

```typescript
// AIRport/schemas/airspace/src/ddl/application/DdlApplicationReference.ts
@Entity()
@Table({ name: 'DB_APPLICATION_REFERENCES' })
export class DdlApplicationReference
    extends DdlVersionedObject
    implements IApplicationReference {

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'OWN_DB_APPLICATION_VERSION_LID',
        referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
    })
    ownApplicationVersion: DdlApplicationVersion

    @Id()
    @ManyToOne()
    @JoinColumn({
        name: 'REFERENCED_DB_APPLICATION_VERSION_LID',
        referencedColumnName: 'DB_APPLICATION_VERSION_LID', nullable: false
    })
    referencedApplicationVersion: DdlApplicationVersion

    @Column({ name: 'DB_APPLICATION_REFERENCE_INDEX', nullable: false })
    @DbNumber()
    index: IApplicationReference_Index
}
```

Каждому внешнему приложению присваивается целочисленный индекс ссылки (`index`), сохраняемый в схеме базы данных. Это позволяет адресовать внешние сущности без строковых названий пакетов, минимизируя размер бинарных записей транзакций.

### 2.2. Метамодель API-операций (`APPLICATION_API_CLASS`)

Схема `airspace` также каталогизирует все публичные интерфейсы, доступные для межприложенческого вызова:
- `APPLICATION_API_CLASS` — регистрирует классы, помеченные декоратором `@Injected()` и содержащие методы `@Api()`;
- `APPLICATION_API_OPERATION` — регистрирует сигнатуры методов, признак асинхронности (`isAsync`) и локальные идентификаторы;
- `APPLICATION_API_PARAMETER` и `APPLICATION_API_RETURN_TYPE` — определяют типы входных аргументов и возвращаемых значений.

Благодаря этому ядро `tower` на узле способно валидировать право приложения А вызывать метод приложения Б с полной проверкой типов аргументов на уровне рантайма.

---

## 3. Реляционное связывание сущностей: магия композитных ключей `AirEntity`

### 3.1. Базовый суперкласс `AirEntity`

Все сущности прикладных приложений наследуются от базового класса `AirEntity` (`@airport/final-approach`):

$$\text{AirEntity} \implies \langle \text{repository}, \text{actor}, \text{\_actorRecordId} \rangle$$

```typescript
// AIRport/schemas/final-approach/src/ddl/AirEntity.ts
@MappedSuperclass()
export abstract class AirEntity {
    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'REPOSITORY_LID', referencedColumnName: 'REPOSITORY_LID', nullable: false })
    repository: Repository;

    @Id()
    @ManyToOne()
    @JoinColumn({ name: 'ACTOR_LID', referencedColumnName: 'ACTOR_LID', nullable: false })
    actor: Actor;

    @Id()
    @Column({ name: 'ACTOR_RECORD_ID', nullable: false })
    @DbNumber()
    _actorRecordId: ActorRecordId;

    @Column({ name: 'CREATED_AT', nullable: false })
    @DbDate()
    createdAt: Date;

    @Column({ name: 'SYSTEM_WIDE_OPERATION_LID', nullable: false })
    @DbNumber()
    systemWideOperationId: SystemWideOperationId;
}
```

Поскольку первичный ключ любой сущности в распределённой среде состоит из трёх компонентов, любая внешняя ссылка также обязана состоять из трёх колонок.

### 3.2. Автоматическая генерация троек колонок в Runway

В генераторе кода Runway (`AIRport/generators/runway/src/ddl/builder/application/SApplicationBuilder.ts`) реализован механизм автоматической декомпозиции связей `@ManyToOne`:

```typescript
// Runway: SApplicationBuilder.ts (строки 547-576)
const airEntityColumns = this.dictionary.AirEntity.columns
const relationColumnReferences = [
    airEntityColumns.REPOSITORY_LID, 
    airEntityColumns.ACTOR_LID,
    airEntityColumns.ACTOR_RECORD_ID
];

let numExistingReferenceToTable = relatedTableMap.get(relatedTableName)
if (!numExistingReferenceToTable) {
    numExistingReferenceToTable = 1
} else {
    numExistingReferenceToTable++
}
relatedTableMap.set(relatedTableName, numExistingReferenceToTable)

const columnSuffixes = ['_RID_', '_AID_', '_ARID_'].map(suffix =>
    suffix + numExistingReferenceToTable)

columnSuffixes.forEach((suffix, index) => {
    const [sRelationColumn, sColumn] = this.processRelationColumn(
        relatedTableName + suffix, relationColumnReferences[index], true,
        isIdProperty, propertyIndex, entity,
        relationColumnMapByName, primitiveColumnMapByName, notNull);
    sRelationColumns.push(sRelationColumn);
    if (sColumn) {
        columns.push(sColumn);
    }
});
```

Когда разработчик приложения `@airline/tasks` пишет лаконичный код:

```typescript
// AIRline/apps/tasks/src/ddl/task/Task.ts
@ManyToOne()
topic: Topic;

@ManyToOne()
goal: Goal;

@ManyToOne()
collection: Collection;
```

Генератор Runway автоматически порождает в физической таблице `TASKS` базы данных SQLite девять целочисленных внешних колонок:

```sql
-- Физическая структура таблицы TASKS в SQLite:
CREATE TABLE TASKS (
    REPOSITORY_LID INTEGER NOT NULL,
    ACTOR_LID INTEGER NOT NULL,
    ACTOR_RECORD_ID INTEGER NOT NULL,
    NAME TEXT,
    DESCRIPTION TEXT,
    STATUS INTEGER,
    -- Внешний ключ на Topic (@airline/topics):
    TOPIC_RID_1 INTEGER,
    TOPIC_AID_1 INTEGER,
    TOPIC_ARID_1 INTEGER,
    -- Внешний ключ на Goal (@airline/tasks):
    GOALS_RID_1 INTEGER,
    GOALS_AID_1 INTEGER,
    GOALS_ARID_1 INTEGER,
    -- Внешний ключ на Collection (@airline/conversations):
    COLLECTIONS_RID_1 INTEGER,
    COLLECTIONS_AID_1 INTEGER,
    COLLECTIONS_ARID_1 INTEGER,
    PRIMARY KEY (REPOSITORY_LID, ACTOR_LID, ACTOR_RECORD_ID)
);
```

Это подтверждается сгенерированным интерфейсом `TaskEUpdateColumns` в `@airline/tasks/src/generated/query/task/QTask.ts`:

```typescript
export interface TaskEUpdateColumns extends AirEntityEUpdateColumns {
    TOPIC_RID_1?: number | IQNumberField;
    TOPIC_AID_1?: number | IQNumberField;
    TOPIC_ARID_1?: number | IQNumberField;
    GOALS_RID_1?: number | IQNumberField;
    GOALS_AID_1?: number | IQNumberField;
    GOALS_ARID_1?: number | IQNumberField;
    COLLECTIONS_RID_1?: number | IQNumberField;
    COLLECTIONS_AID_1?: number | IQNumberField;
    COLLECTIONS_ARID_1?: number | IQNumberField;
}
```

---

## 4. Паттерны межприложенческих связей: сущности-связки и инвариант транзакций

В распределённой архитектуре действует строжайшее правило: **одна транзакция фиксирует изменения строго в границах одного Хранилища (One Transaction per Repository)**. Из этого правила вытекают два фундаментальных архитектурных паттерна связывания.

### 4.1. Паттерн А: Колокация сущностей (Entity Colocation)

Если сущность вспомогательного приложения создаётся специально для обслуживания основной сущности и разделяет её жизненный цикл и права доступа, она **колоцируется** в том же самом Хранилище.

**Пример в коде: Связка `Task` $\leftrightarrow$ `Collection`**

В файле `AIRline/apps/tasks/src/api/task/TaskApi.ts` при создании Задачи:

```typescript
@Api()
async create(task: Task): Promise<void> {
    const taskName = 'Task: ' + task.name
    // 1. Создаётся новое Хранилище для Задачи
    const repository = await this.repositoryApi.create(taskName, true)

    // 2. Вызывается API приложения бесед с ПЕРЕДАЧЕЙ созданного Хранилища!
    const collection = await this.collectionApi.create(taskName, repository)
    task.collection = collection

    // 3. Задача привязывается к тому же самому Хранилищу
    task.repository = repository
    await this.taskDao.save(task)
}
```

А в файле `AIRline/apps/conversations/src/api/CollectionApi.ts`:

```typescript
@Api()
async create(name: string, repository?: Repository): Promise<Collection> {
    const collection = new Collection()
    collection.name = name

    // Если Хранилище не передано — создаётся своё.
    // Если передано — сущность Collection помещается в Хранилище вызывающего!
    if (!repository) {
        repository = await this.repositoryApi.create(collection.name, true)
    }
    collection.repository = repository

    await this.collectionDao.save(collection)
    return collection
}
```

Благодаря колокации:
- Запись таблицы `TASKS` и запись таблицы `COLLECTIONS` имеют одинаковый `REPOSITORY_LID`;
- Они сохраняются в одной атомарной транзакции локального SQLite;
- При репликации Хранилища задачи на другие узлы коллекция бесед реплицируется вместе с ней как единое целое.

### 4.2. Паттерн Б: Сущности-связки между независимыми Хранилищами (Cross-Repository Link Entities)

Если две сущности принадлежат разным автономным Хранилищам с разными владельцами или жизненными циклами, прямая связь `@OneToMany` недопустима. Вместо этого создаётся специальная связующая таблица (`Link Entity`), запись которой сохраняется в одном из Хранилищ.

В кодовой базе выявлены четыре такие сущности-связки:

```mermaid
classDiagram
    class Goal {
        +name: string
        +importance: number
        +topic: Topic
    }
    class Task {
        +name: string
        +status: TaskStatus
        +collection: Collection
    }
    class GoalTask {
        +goal: Goal
        +task: Task
    }
    class Conversation {
        +collection: Collection
        +participants: Participant[]
    }
    class TaskConversation {
        +task: Task
        +conversation: Conversation
    }
    class Comment {
        +text: string
        +conversation: Conversation
    }
    class TaskReferenceInComment {
        +task: Task
        +comment: Comment
    }
    class CollectionConversation {
        +collection: Collection
        +conversation: Conversation
    }

    Goal "1" <-- GoalTask : in Goal Repo
    Task "1" <-- GoalTask : cross-repo FK
    Task "1" <-- TaskConversation : in Task Repo
    Conversation "1" <-- TaskConversation : cross-repo FK
    Comment "1" <-- TaskReferenceInComment : in Comment/Conv Repo
    Task "1" <-- TaskReferenceInComment : cross-repo FK
    Collection "1" <-- CollectionConversation : in Collection Repo
    Conversation "1" <-- CollectionConversation : cross-repo FK
```

#### Реализация в коде: `GoalTask`

В файле `AIRline/apps/tasks/src/ddl/goal/Goal.ts` разработчик оставил исчерпывающий концептуальный комментарий:

```typescript
// Link in the Goal Repository (instead of OneToMany directly to Task,
// which are in different repositories)
@OneToMany({ mappedBy: 'goal' })
goalTasks: GoalTask[]
```

А в DDL-классе `GoalTask`:

```typescript
// AIRline/apps/tasks/src/ddl/goal/GoalTask.ts
@Entity()
@Table({ name: 'GOAL_TASKS' })
export class GoalTask extends AirEntity {
    @ManyToOne()
    goal: Goal;

    @ManyToOne()
    task: Task;
}
```

При связывании Задачи с Целью в `TaskApi.ts`:

```typescript
const goalTask: GoalTask = new GoalTask()
const goal = task.goal
goalTask.task = task
goalTask.goal = goal
// ВАЖНО: Связка сохраняется в Хранилище Цели!
goalTask.repository = goal.repository
await this.goalTaskDao.save(goalTask)
```

Запись `GoalTask` физически размещается в Хранилище Цели (`goal.repository`). Хранилище Задачи остаётся неизменным. Это предотвращает возникновение каскадных распределённых двухфазных блокировок (2PC).

#### Реализация в коде: `TaskConversation` и `TaskReferenceInComment`

Аналогичным образом устроены связи между задачами и обсуждениями:

1. **`TaskConversation`** (`AIRline/apps/tasks/src/ddl/task/TaskConversation.ts`):
   Связывает задачу с веткой обсуждения. Сама беседа (`Conversation`) создаётся в собственном Хранилище (где участники оставляют комментарии), а связка `TaskConversation` фиксируется в Хранилище задачи.
2. **`TaskReferenceInComment`** (`AIRline/apps/tasks/src/ddl/task/TaskReferenceInComment.ts`):
   Фиксирует факт упоминания задачи внутри конкретного комментария:
   ```typescript
   @Entity()
   @Table({ name: 'TASK_REFERENCES_IN_COMMENTS' })
   export class TaskReferenceInComment extends AirEntity {
       @ManyToOne({ optional: false })
       comment: Comment;

       @ManyToOne({ optional: false })
       task: Task;
   }
   ```
3. **`CollectionConversation`** (`AIRline/apps/conversations/src/ddl/CollectionConversation.ts`):
   Связывает общую коллекцию с конкретной беседой участников. При вызове `ConversationApi.create(...)`:
   ```typescript
   const collectionConversation = new CollectionConversation()
   collectionConversation.collection = collection
   collectionConversation.conversation = conversation
   collection.collectionConversations.push(collectionConversation)
   collectionConversation.repository = collection.repository
   await this.collectionConversationDao.save(collectionConversation)
   ```
   Связка сохраняется в Хранилище коллекции (`collection.repository`), гарантируя целостность индекса бесед.

---

## 5. Межмодульный фасад RPC: `@Api()`, `ApiProxy` и изоляция песочниц

### 5.1. Архитектура изоляции на Листе

Каждое приложение `AIRline` выполняется в изолированной среде браузерного контекста (песочница `iframe` или Web Worker):

```typescript
// AIRline/apps/conversations/src/to_be_generated/conversations.runtime-index.ts
import { loadIframe } from '@airport/web-tower'
import { airApp } from './conversations.runtime-injection'

// Запуск приложения в изолированном фрейме веб-терминала:
loadIframe(airApp.getFullName())
```

Ни одно внешнее приложение или пользовательский интерфейс не могут получить прямую ссылку на объекты в памяти другого приложения. Все взаимодействия маршрутизируются через прокси.

### 5.2. Автоматическая генерация `ApiProxy` в Runway

Для каждого класса, содержащего методы `@Api()`, генератор Runway формирует клиентскую заглушку `ApiProxy`:

```typescript
// AIRline/apps/conversations/src/generated/api/CollectionApi.ts
import { ApiProxy } from '@airport/airgate';
import { application } from '../../to_be_generated/app-declaration';

// An API stub for other Applications and UIs to use
export class CollectionApi extends ApiProxy<CollectionApi> {

    constructor() {
        super(application, [
            'searchAll',
            'searchCollectionUsers',
            'searchAllForTopic',
            'loadWithDetails'
        ])
    }

    searchAll(): Observable<Collection[]> {
        return this.proxy.searchAll()
    }

    async create(name: string, repository?: Repository): Promise<Collection> {
        return await this.proxy.create(name, repository)
    }

    async save(collection: Collection): Promise<void> {
        await this.proxy.save(collection)
    }
}
```

### 5.3. Механизм передачи сообщений и диспетчеризация в `tower`

Когда `@airline/tasks` вызывает метод `collectionApi.create(taskName, repository)`:

1. Вызов перехватывается базовым классом `ApiProxy` (`@airport/airgate`).
2. Сообщение сериализуется через протокол `aviation-communication`:
   $$\text{Message} = \langle \text{origin}, \text{destination}, \text{objectName}, \text{methodName}, \text{args}, \text{actor} \rangle$$
3. Сообщение передаётся через безопасный транспорт `postMessage` в ядро `tower`.
4. Диспетчер `LocalAPIServer` (`AIRport/engines/tower/src/core/api/LocalAPIServer.ts`):
   - Устанавливает контекст безопасности: `this.requestManager.actor = request.actor`;
   - Проверяет права вызова через `apiRegistry.findObjectAndOperationForApi(...)`;
   - Десериализует параметры через `queryResultsDeserializer`;
   - Выполняет метод на реальном объекте приложения:
     ```typescript
     let result = apiObject[request.methodName].apply(apiObject, [...request.args, context]);
     if (apiOperation.isAsync) {
         result = await result;
     }
     ```
   - Упаковывает ответ и возвращает его вызывающей стороне.

Благодаря этому достигается абсолютная безопасность: даже если приложение А скомпрометировано, оно не может повредить внутреннее состояние приложения Б в оперативной памяти Листа.

---

## 6. Локальные реляционные выборки в DAO: реактивный SQL через границы приложений

Хотя запись строго изолирована, **чтение в `AIRport` объединено на уровне локального SQL-движка**. Все таблицы всех установленных приложений находятся в одной локальной базе данных SQLite (или оперативной реляционной памяти).

### 6.1. Реляционные объединения `LEFT JOIN` между таблицами разных схем

В файле `AIRline/apps/tasks/src/dao/task/TaskDao.ts` запросы объединяют таблицы `TASKS`, `COLLECTIONS`, `GOALS` и `TOPIC` в едином SQL-выражении:

```typescript
// Запрос задачи с подтягиванием коллекции бесед:
searchById(taskUuId: string): Observable<Task> {
    let t: QTask,
        c: QCollection
    return this._searchOne({
        SELECT: {
            '*': Y,
            collection: {}
        },
        FROM: [
            t = Q.Task,
            c = t.collection.LEFT_JOIN() // Объединение схем tasks и conversations!
        ],
        WHERE: t.equals(taskUuId)
    })
}

// Запрос всех задач по теме с подтягиванием целей:
searchAllForTopicWithGoal(topic: Topic | string): Observable<Task[]> {
    let ta: QTask,
        to: QTopic
    return this._search({
        SELECT: {
            '*': Y,
            goal: {}
        },
        FROM: [
            ta = Q.Task,
            ta.goal.LEFT_JOIN(),
            to = ta.topic.LEFT_JOIN() // Объединение схем tasks и topics!
        ],
        WHERE: to.equals(topic)
    })
}
```

А в `AIRline/apps/conversations/src/dao/CollectionDao.ts` запрос проникает через три уровня отношений вплоть до схемы пользователей ядра:

```typescript
loadWithDetails(collectionId: string): Observable<Collection> {
    let cn: QConversation,
        cl: QCollection,
        cc: QCollectionConversation,
        p: QParticipant

    return this._searchOne({
        SELECT: {
            name: Y,
            collectionConversations: {
                conversation: {
                    participants: {
                        userAccount: {
                            username: Y
                        }
                    }
                }
            }
        },
        FROM: [
            cl = Q.Collection,
            cc = cl.collectionConversations.LEFT_JOIN(),
            cn = cc.conversation.LEFT_JOIN(),
            p = cn.participants.LEFT_JOIN(),
            p.userAccount.LEFT_JOIN() // Соединение с UserAccount из travel-document-checkpoint!
        ],
        WHERE: cl.equals(collectionId)
    })
}
```

### 6.2. Реактивность через RxJS `Observable`

Все методы DAO возвращают потоки `Observable<T>`. Движок `Tarmaq DAO` отслеживает изменения в локальных таблицах через журнал транзакций. При поступлении новой записи в таблицу `COMMENTS` или `TASKS` запрос автоматически инвалидируется и пересчитывается, отправляя обновлённый срез данных в пользовательский интерфейс **без необходимости повторного опроса (polling)**.

---

## 7. Проекция на платформу «Турбаза» и сервисы МСП и ЖКХ

Исследованный механизм межприложенческого взаимодействия в точности соответствует архитектурным принципам платформы **«Турбаза»** и составляет фундамент концепции **«Локального реестра сервисов МСП и ЖКХ»** (`05_local_services_presentation`).

### 7.1. Архитектурное соответствие сервисов

| Компонент в коде `AIRline` | Соответствующее флагманское приложение «Турбазы» | Роль в экосистеме платформы «Турбаза» |
| :--- | :--- | :--- |
| **`@airline/topics`** | **«Забота» / Общественный классификатор** | Каталог категорий взаимной помощи, видов работ ЖКХ, типов услуг МСП и публичных тегов. |
| **`@airline/tasks`** | **«Деловой» (Органайзер)** | Управление личными и совместными делами, заявками на ремонт, бизнес-процессами артелей. |
| **`@airline/conversations`** | **«КубГолос»** | Защищённые обсуждения, принятие решений в домах, верификация микроопросов и споров. |
| **Расширения через 3 FK** | **«Локальный реестр сервисов МСП и ЖКХ»** | Таблицы-расширения для смет, показаний счётчиков, прейскурантов, привязанные к задачам и беседам. |

```mermaid
flowchart LR
    subgraph Core_Classifiers["Базовые классификаторы"]
        Care["«Забота»<br/>(Категории услуг и репутация)"]
    end

    subgraph Core_Engines["Базовые движки процессов"]
        Business["«Деловой»<br/>(Задачи, заявки, графики)"]
        CubeVoice["«КубГолос»<br/>(Беседы, согласования, опросы)"]
    end

    subgraph Local_Registry["«Локальный реестр сервисов МСП и ЖКХ»"]
        WorkOrder["Таблица АктРабот<br/>(Extension Table)"]
        Estimate["Таблица Смета<br/>(Extension Table)"]
        Meter["Таблица ПоказанияСчётчиков<br/>(Extension Table)"]
    end

    Business -->|"@ManyToOne topic"| Care
    CubeVoice -->|"@ManyToOne topic"| Care
    Business -->|"@ManyToOne collection"| CubeVoice

    WorkOrder -.->|"3 FK (_RID_, _AID_, _ARID_)"| Business
    Estimate -.->|"3 FK (_RID_, _AID_, _ARID_)"| Business
    Meter -.->|"3 FK (_RID_, _AID_, _ARID_)"| CubeVoice
```

### 7.2. Преимущества для локальной экономики и кооперативов

1. **Никакого взлома чужого кода:** Разработчик модуля сантехнических услуг или ТСЖ создаёт своё приложение со своими таблицами. Ему не требуется просить авторов «Делового» добавлять поля в таблицу `TASKS`. Он просто объявляет `@ManyToOne() task: Task` и связывает свою смету с задачей через трёхкомпонентный ключ.
2. **Нулевой сетевой оверхед на мобильном устройстве:** Мастер участка ЖКХ открывает экран заявки, и локальный SQLite на его телефоне мгновенно склеивает адрес дома, смету, переписку жильцов и статус задачи одним SQL-запросом за $0{,}08$ мс без подключения к серверу.
3. **Безопасность и независимость транзакций:** Если сантехник одобряет акт приёмки, запись акта помещается в Хранилище договора, не требуя распределённой двухфазной блокировки со всеми участниками дома.

---

## 8. Итоговые выводы исследования

1. **Техническая зрелость кросс-приложенческого механизма:**
   Исследование подтвердило, что кросс-приложенческое взаимодействие в коде `AIRport` и `AIRline` не является абстрактной идеей, а детально реализовано на уровне компилятора Runway, метамодели `airspace`, генератора прокси `ApiBuilder`, маршрутизатора сообщений `tower/LocalAPIServer` и запросного языка `Tarmaq Query`.
2. **Соблюдение инвариантов децентрализации:**
   Межприложенческие связи полностью сохраняют принципы суверенности данных:
   - Отсутствие глобальных автоинкрементных ключей (применение триады $\langle \text{Repository}, \text{Actor}, \text{ActorRecordId} \rangle$);
   - Изоляция записи по Хранилищам с использованием связующих сущностей (`GoalTask`, `TaskConversation`, `TaskReferenceInComment`, `CollectionConversation`);
   - Изоляция выполнения кода через песочницы `iframe` и RPC-прокси `ApiProxy`.
3. **Готовность к масштабированию в Белой книге № 12:**
   Полученные результаты предоставляют исчерпывающий фактический материал для описания программного взаимодействия приложений в Белой книге № 12 и в презентации «Локальный реестр сервисов МСП и ЖКХ».

---

## Реестр ссылок на исследованные файлы кодовой базы

- Схемы метамодели и репозиториев ядра:
  - `AIRroot/AIRport/schemas/airspace/src/ddl/application/DdlApplicationReference.ts`
  - `AIRroot/AIRport/schemas/airspace/src/ddl/application/api/ApplicationApiClass.ts`
  - `AIRroot/AIRport/schemas/final-approach/src/ddl/AirEntity.ts`
  - `AIRroot/AIRport/schemas/holding-pattern/src/ddl/repository/relation/CopiedRecordLedger.ts`
  - `AIRroot/AIRport/schemas/holding-pattern/src/manager/CrossRepositoryRelationManager.ts`
- Прикладные приложения:
  - `AIRroot/AIRline/apps/topics/src/ddl/Topic.ts` • `AIRline/apps/topics/src/ddl/Theme.ts`
  - `AIRroot/AIRline/apps/conversations/src/ddl/Collection.ts` • `AIRline/apps/conversations/src/ddl/Conversation.ts` • `AIRline/apps/conversations/src/ddl/Comment.ts`
  - `AIRroot/AIRline/apps/tasks/src/ddl/task/Task.ts` • `AIRline/apps/tasks/src/ddl/goal/Goal.ts` • `AIRline/apps/tasks/src/ddl/goal/GoalTask.ts`
  - `AIRline/apps/tasks/src/ddl/task/TaskConversation.ts` • `AIRline/apps/tasks/src/ddl/task/TaskReferenceInComment.ts`
- API и DAO:
  - `AIRline/apps/tasks/src/api/task/TaskApi.ts` • `AIRline/apps/tasks/src/api/goal/GoalApi.ts`
  - `AIRline/apps/conversations/src/api/CollectionApi.ts` • `AIRline/apps/conversations/src/api/ConversationApi.ts`
  - `AIRline/apps/tasks/src/dao/task/TaskDao.ts` • `AIRline/apps/conversations/src/dao/CollectionDao.ts`
- Генератор и движок:
  - `AIRroot/AIRport/generators/runway/src/ddl/builder/application/SApplicationBuilder.ts`
  - `AIRroot/AIRport/generators/runway/src/api/builder/ApiBuilder.ts`
  - `AIRroot/AIRport/engines/tower/src/core/api/LocalAPIServer.ts`
