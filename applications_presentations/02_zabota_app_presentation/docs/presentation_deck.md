---
presentation_id: "02_zabota_app_presentation"
title: "«Забота»: вкладывать и просматривать"
subtitle: "Страницы, вклады и открытый социальный рейтинг по темам"
header_title: "ТУРБАЗА"
header_subtitle: "Приложение «Забота»"
theme: "platform_overview"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
author: "Артём Владимирович Шамсутдинов"
planning: "модель Claude Sonnet 5.5"
elaboration: "модель Gemini 3.8 Flash"
status: "проектная концепция"
version: "1.0 (2026)"
book: "Белая книга № 09 «Забота: вкладывать и просматривать»"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">«ЗАБОТА»: ВКЛАДЫВАТЬ И ПРОСМАТРИВАТЬ</h1>
    <p class="slide-subtitle">Сеть взаимной помощи с открытым рейтингом вкладов по темам</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 1</div>
      <div class="card-title">Вклады вместо сообщений</div>
      <div class="card-desc">Четыре типа записей вокруг конкретных жизненных Случаев.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 2</div>
      <div class="card-title">Запечатанные страницы</div>
      <div class="card-desc">Масштабирование без разрастания журналов и задержек.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 3</div>
      <div class="card-title">Рейтинг по темам</div>
      <div class="card-desc">Открытый социальный авторитет без единого общего балла.</div>
    </div>
  </div>

  <div class="attribution-bottom-bar">
    <div class="attribution-credits">
      Автор: А. В. Шамсутдинов · Планирование: Claude Sonnet 5.5 · Проработка: Gemini 3.8 Flash · Концепция 1.0 (2026)
    </div>
    <div class="attribution-spec">
      Детальная инженерная спецификация:
      <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/09_sapoto_whitepaper.md" class="whitepaper-badge" target="_blank">📄 Белая книга № 09 «Забота» ↗</a>
    </div>
  </div>
</div>

### Текст для диктора:
> Приветствуем вас! В больших городах люди нередко остаются один на один с бытовыми трудностями, хотя отзывчивые соседи рядом. Домовые чаты помогают живому общению, но важная просьба быстро тонет в общем потоке коротких сообщений. Приложение «Забота» предлагает дополнить соседское взаимодействие структурированными созидательными вкладами. Система опирается на три основы: разделение записей по типам, самозапечатывающиеся страницы и открытый социальный рейтинг по темам. В этой презентации раскрыто устройство платформы. Детальная спецификация представлена в девятой Белой книге.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">КОНТЕКСТ И ОПОРА</div>
    <h1 class="slide-title">ЧЕМ ДОПОЛНИТЬ ДОМОВЫЕ ЧАТЫ</h1>
    <p class="slide-subtitle">Чаты хороши для общения, а для помощи нужна структура</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ОСОБЕННОСТИ ЧАТОВ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Просьбы теряются</div>
          <div class="tree-branch-desc">Важное обращение смывается десятками реплик за минуты.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Открытые телефоны</div>
          <div class="tree-branch-desc">Личные номера видны всем участникам группы.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Сложность ввода</div>
          <div class="tree-branch-desc">Пожилым людям трудно набирать мелкий текст на экранах.</div>
        </div>
      </div>
    </div>

    <div class="glass-card emerald-accent">
      <div class="card-pill-tag emerald">ИЗ «КУБГОЛОСА»</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Многофакторность</div>
          <div class="tree-branch-desc">Сто базисных пунктов на причины проблемы.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Модель «Ситуация»</div>
          <div class="tree-branch-desc">Общий контекст для связывания похожих случаев.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Режимы и контуры</div>
          <div class="tree-branch-desc">Три режима регистрации и два изолированных контура.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Домовые чаты удобны для коротких объявлений, однако важная просьба о взаимопомощи, например покупка лекарств для пожилого соседа, быстро теряется среди сотен бытовых реплик. Номера личных телефонов открыты всем участникам, а пожилым людям трудно набирать мелкий текст на экранах телефонов. «Забота» дополняет чаты надёжной структурой. Приложение опирается на решения «КубГолоса»: оценку по причинам с фиксированным бюджетом влияния, общие Ситуации и три режима регистрации. Личные данные остаются строго на устройствах жителей.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">АРХИТЕКТУРА ДАННЫХ</div>
    <h1 class="slide-title">СОСТАВНАЯ КОНСТРУКЦИЯ СЛУЧАЯ</h1>
    <p class="slide-subtitle">Случай собирается из независимых открытых компонентов</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">КОМПОНЕНТ 1</div>
        <div class="step-title">Ситуация</div>
        <div class="step-desc">Общее описание проблемы из «КубГолоса»</div>
      </div>
      <div class="pipeline-arrow">+</div>
      <div class="pipeline-step">
        <div class="step-num">КОМПОНЕНТ 2</div>
        <div class="step-title">Случай</div>
        <div class="step-desc">Личная запись автора на его устройстве</div>
      </div>
      <div class="pipeline-arrow">+</div>
      <div class="pipeline-step">
        <div class="step-num">КОМПОНЕНТ 3</div>
        <div class="step-title">Разговор</div>
        <div class="step-desc">Общая схема связанных реплик платформы</div>
      </div>
      <div class="pipeline-arrow">+</div>
      <div class="pipeline-step">
        <div class="step-num">ИНТЕРФЕЙС</div>
        <div class="step-title">Дело</div>
        <div class="step-desc">Срок и исполнение из «Делового»</div>
      </div>
    </div>

    <div class="notice-banner">
      <strong>Сквозной пример:</strong> Ситуация — «Нет доступной среды». Случай — «Дедушке нужен пандус на даче». Разговор — советы соседей по материалам. Каждая часть — открытая схема.
    </div>
  </div>
</div>

### Текст для диктора:
> Жизненный случай в «Заботе» не является единой монолитной таблицей в центральной базе данных. Он собирается из трёх независимых частей: общей Ситуации, личной записи человека и открытого Разговора. Возьмём пример: семье требуется построить пандус для дедушки на дачном участке. Схемы данных открыты и автономны. Поселковый портал или стороннее приложение могут подключить только схему Разговора без привязки к «Заботе». Так платформа защищена от монополии одного решения, а интерфейс «Делового» добавляет в карточку параметры срока и исполнения.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">СТРУКТУРА ДИАЛОГА</div>
    <h1 class="slide-title">ЧЕТЫРЕ ВИДА ВКЛАДОВ И РЕЦЕПТЫ</h1>
    <p class="slide-subtitle">Функциональные реплики превращают обсуждение в решения</p>
  </div>

  <div class="slide-body grid-2col">
    <table class="calc-table">
      <thead>
        <tr>
          <th>Вид</th>
          <th>Назначение</th>
          <th>Оценка</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Идея</strong></td>
          <td>Предложение действий</td>
          <td>До трёх ключевых причин</td>
        </tr>
        <tr>
          <td><strong>Опыт</strong></td>
          <td>Свидетельство исхода</td>
          <td>Шкала «Результат»</td>
        </tr>
        <tr>
          <td><strong>Вопрос</strong></td>
          <td>Запрос сведений</td>
          <td>В Уточнённый контекст</td>
        </tr>
        <tr>
          <td><strong>Комментарий</strong></td>
          <td>Обычный ответ</td>
          <td>Без начисления рейтинга</td>
        </tr>
      </tbody>
    </table>

    <div class="glass-card emerald-accent">
      <div class="card-pill-tag emerald">РЕЦЕПТ И ВОПРОСЫ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Формула Рецепта</div>
          <div class="tree-branch-desc">Ситуация + Принятая Идея + Подтверждённый Опыт = Рецепт.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Сквозной пример</div>
          <div class="tree-branch-desc">Идея: сборка пандуса. Вопрос: какой уклон допустим?</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В приложении «Забота» у каждого высказывания есть строго определённый функциональный вид. Идея предлагает конкретные действия, опыт подтверждает результат на практике, вопрос запрашивает недостающие сведения, а комментарий служит для обычных ответов. Идеи оцениваются по причинам и связываются с задачами исполнения. Вопросы начинаются с вопросительных слов и формируют уточнённый контекст ситуации. Когда предложенная идея успешно проверена делом, сочетание ситуации, идеи и подтверждённого опыта становится готовым рецептом для других людей.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРАКТИКА И СВИДЕТЕЛЬСТВА</div>
    <h1 class="slide-title">ОПЫТ: «ГОЛОС» И «ПОКАЗ»</h1>
    <p class="slide-subtitle">Практический результат подтверждается текстом, речью или видео</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">1</div>
        <div class="step-title">Случай</div>
        <div class="step-desc">Запись проблемы</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">2</div>
        <div class="step-title">Идея</div>
        <div class="step-desc">Оценка причин</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">3</div>
        <div class="step-title">Дело</div>
        <div class="step-desc">Органайзер</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">4</div>
        <div class="step-title">Действие</div>
        <div class="step-desc">Исполнение</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">5</div>
        <div class="step-title">Опыт</div>
        <div class="step-desc">Голос / Показ</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">6</div>
        <div class="step-title">Итог</div>
        <div class="step-desc">Шкала результата</div>
      </div>
    </div>

    <div class="grid-3col" style="margin-top: 10px;">
      <div class="benefit-card">
        <div class="card-title" style="font-size: 26px;">Автономия записи</div>
        <div class="card-desc">Опыт оформляется отдельной записью автора, чужая идея неизменна.</div>
      </div>
      <div class="benefit-card">
        <div class="card-title" style="font-size: 26px;">Счёт на телефоне</div>
        <div class="card-desc">Речь преобразуется в текст прямо на устройстве без передачи звука в облако.</div>
      </div>
      <div class="benefit-card">
        <div class="card-title" style="font-size: 26px;">Сквозной пример</div>
        <div class="card-desc">Семья построила пандус и сняла подтверждающий видеоролик «Показ».</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Истинная ценность взаимопомощи проверяется делом. Практический цикл включает шесть шагов: от фиксации случая и оценки идеи до выполнения задачи и публикации опыта. Человек может подтвердить результат текстом, голосовой записью или коротким видеороликом. Речь преобразуется в текст прямо на телефоне, звуковая запись не передаётся на внешние серверные узлы. Опыт оформляется отдельной записью автора и не меняет чужой текст. Подтверждённый опыт наполняет объективную шкалу результатов в «КубГолосе» и авторитет автора предложения.

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">МАСШТАБИРОВАНИЕ ДАННЫХ</div>
    <h1 class="slide-title">ЗАЧЕМ НУЖНЫ СТРАНИЦЫ</h1>
    <p class="slide-subtitle">Почему прямое связывание «один ко многим» создает трудности</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ПОПУЛЯРНАЯ ТЕМА</div>
      <div class="highlight-box cyan" style="margin-top: 10px;">
        <div class="box-title">Один узел — тысячи реплик</div>
        <div class="box-desc">В активном обсуждении накапливаются тысячи ответов сотен участников. В одном общем хранилище это приводит к перегрузкам.</div>
      </div>
      <div class="notice-banner gold" style="margin-top: 16px;">
        Вопрос архитектуры: как показать первые записи без скачивания всего многолетнего архива?
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag danger">ТРИ ТРУДНОСТИ ХРАНЕНИЯ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Разрастание журнала</div>
          <div class="tree-branch-desc">Первая синхронизация замедляется по мере роста данных.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Конфликты записи</div>
          <div class="tree-branch-desc">Множество параллельных авторов мешают синхронизации.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Смена родителя</div>
          <div class="tree-branch-desc">Новая запись меняет контрольную сумму родительского узла.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Представим популярную тему обустройства доступной среды, где за годы накопились тысячи полезных вкладов. Если сохранять все реплики внутри одного общего хранилища, возникают три фундаментальные трудности. Журнал непрерывно разрастается, поэтому первая загрузка становится медленной. Сотни людей пишут одновременно и порождают конфликты при синхронизации. Каждая новая запись меняет контрольную сумму родительского узла, требуя полной перестройки локального кэша. Платформе требуется способ отображать первые записи обсуждения без скачивания всего многолетнего архива.

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРИМИТИВ ПЛАТФОРМЫ</div>
    <h1 class="slide-title">КАК УСТРОЕНЫ СТРАНИЦЫ</h1>
    <p class="slide-subtitle">Самозапечатывающиеся страницы сжатых проекций в общественном контуре</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">СТРАНИЦА 1</div>
        <div class="step-title">Запечатана</div>
        <div class="step-desc">1000 записей · неизменна</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">СТРАНИЦА 2</div>
        <div class="step-title">Запечатана</div>
        <div class="step-desc">1000 записей · в кэше</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">СТРАНИЦА 3</div>
        <div class="step-title">Открыта</div>
        <div class="step-desc">Принимает новые ссылки</div>
      </div>
    </div>

    <div class="grid-2col" style="margin-top: 10px;">
      <div class="benefit-card">
        <div class="card-num-badge">ЛИСТ: УСТРОЙСТВО</div>
        <div class="card-title" style="font-size: 26px;">Полная запись автора</div>
        <div class="card-desc">Хранит полный текст и подпись автора, отправляет Ветке только ссылку.</div>
      </div>
      <div class="benefit-card">
        <div class="card-num-badge">ВЕТКА: СЕРВЕР</div>
        <div class="card-title" style="font-size: 26px;">Сжатые проекции</div>
        <div class="card-desc">Хранит заголовок, статус и ссылку; запечатывает страницу по лимиту.</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Связь делится на страницы фиксированного размера по тысяче записей в каждой. Полный текст сохраняется в персональном хранилище автора на Листе, а узел Ветки хранит лишь компактные проекции. Лист отправляет ссылку, и Ветка включает её в текущую страницу. Как только страница заполнена, она запечатывается и становится неизменяемой. Благодаря проекциям список любого объёма открывается сразу и доступен для чтения без подключения к сети. Страницы работают исключительно в открытом общественном контуре платформы.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ВЗВЕШИВАНИЕ МНЕНИЙ</div>
    <h1 class="slide-title">ВЕС ГОЛОСА ПО ДОВЕРИЮ В ТЕМЕ</h1>
    <p class="slide-subtitle">Две шкалы: мнение всех жителей и сублинейный вес экспертов</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ДВЕ ПАРАЛЛЕЛЬНЫЕ ШКАЛЫ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Шкала «Народ»</div>
          <div class="tree-branch-desc">Один человек — один голос. Простое равенство участников.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Шкала «Эксперты»</div>
          <div class="tree-branch-desc">Вес зависит от подтверждённого доверия в конкретной теме.</div>
        </div>
      </div>
    </div>

    <div class="glass-card emerald-accent">
      <div class="card-pill-tag emerald">ПРАВИЛА И КРИВАЯ ВЕСА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Границы веса: от 0,1 до 1,0</div>
          <div class="tree-branch-desc">Доверие 0 дает вес 0,1; доверие 0,5 дает 0,74; доверие 1 дает 1,0.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Три барьера честности</div>
          <div class="tree-branch-desc">Запрет самооценки, дисконт взаимности, фиксация прошлой эпохой.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Оценки предложений участников не складываются слепо. Вес голоса в треде зависит от подтверждённого доверия к человеку в конкретной предметной теме. При этом новичок обязательно имеет право голоса с минимальным весом в одну десятую, а вес признанного эксперта строго ограничен единицей. Вес растёт заметно медленнее авторитета. Оценивать свои собственные записи не допускается, взаимные симпатии снижают вес, а показатели берутся по итогам прошлой эпохи. Результаты голосования всегда отображаются на двух шкалах параллельно.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">СУБЪЕКТИВНАЯ ЛОГИКА</div>
    <h1 class="slide-title">ЯЗЫК ДОВЕРИЯ И ЗАТУХАНИЕ</h1>
    <p class="slide-subtitle">Вера, сомнение и неопределённость с учётом фактора времени</p>
  </div>

  <div class="slide-body grid-2col">
    <table class="calc-table">
      <thead>
        <tr>
          <th>Свидетельства</th>
          <th>Ожидание</th>
          <th>Неопределённость</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Нет данных</td>
          <td>0,50 (нейтрально)</td>
          <td>1,00 (наибольшая)</td>
        </tr>
        <tr>
          <td>5 «за», 1 «против»</td>
          <td>0,75</td>
          <td>0,25</td>
        </tr>
        <tr>
          <td>100 «за», 0 «против»</td>
          <td>0,99</td>
          <td>0,02</td>
        </tr>
      </tbody>
    </table>

    <div class="glass-card emerald-accent">
      <div class="card-pill-tag emerald">ЗАТУХАНИЕ СВИДЕТЕЛЬСТВ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Период полураспада</div>
          <div class="tree-branch-desc">Для бытовых тем — 6 месяцев (задаёт оператор темы).</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Динамика веса во времени</div>
          <div class="tree-branch-desc">Через полгода вес 50%, через год 25%, через два года около 6%.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Доверие выражается тремя фундаментальными долями: верой, сомнением и неопределённостью. Если о новом участнике пока ничего не известно, ожидаемая надёжность считается нейтральной, а показатель неопределённости максимален. С каждым подтверждённым делом неопределённость снижается, а общественный авторитет укрепляется. Со временем старые свидетельства плавно теряют вес: через полгода учитывается половина, а через год лишь четверть. Так прошлые ошибки сглаживаются, а репутация требует постоянного подтверждения новыми полезными делами.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">АГРЕГАЦИЯ РЕПУТАЦИИ</div>
    <h1 class="slide-title">СОЦИАЛЬНЫЙ РЕЙТИНГ ВКЛАДОВ</h1>
    <p class="slide-subtitle">Оцениваются конкретные дела, а не личность человека в целом</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag emerald">ПРИНЦИПЫ АГРЕГАЦИИ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Вклады, а не люди</div>
          <div class="tree-branch-desc">Оцениваются конкретные результаты труда, а не человек в целом.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Предметные темы</div>
          <div class="tree-branch-desc">Строитель авторитетен в монтаже пандусов, но не в педагогике.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Нет единого балла</div>
          <div class="tree-branch-desc">Единый социальный балл человека на платформе не выводится.</div>
        </div>
      </div>
    </div>

    <div class="glass-card gold-accent">
      <div class="card-pill-tag gold">ДВА НЕЗАВИСИМЫХ РЕЙТИНГА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Социальный рейтинг</div>
          <div class="tree-branch-desc">Открытый агрегат взаимопомощи по темам на узлах Веток.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Экономический рейтинг</div>
          <div class="tree-branch-desc">Вне платформы: считает Банк России по смарт-контрактам.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Оценки создаются на устройствах пользователей и заверяются личными электронными подписями. Тематические Ветки агрегируют свидетельства и поднимают точные суммы вверх по дереву аналогично решениям «КубГолоса». Оцениваются конкретные результаты труда, а не люди в целом. Авторитет формируется раздельно по каждой теме: строитель авторитетен в монтаже пандусов, но не в педагогике. Единый социальный балл человека на платформе не ведётся. Финансовый рейтинг рассчитывается строго за пределами платформы на базе смарт-контрактов Банка России.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ЦЕЛОСТНОСТЬ СИСТЕМЫ</div>
    <h1 class="slide-title">ЗАЩИТА ОТ САМОУСИЛЕНИЯ</h1>
    <p class="slide-subtitle">Разрыв автокаталитических кругов и честное признание ограничений</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag danger">ЧЕТЫРЕ БАРЬЕРА КРУГА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Прошлая эпоха</div>
          <div class="tree-branch-desc">Вес фиксируется до начала текущего периода голосования.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Приоритет дел</div>
          <div class="tree-branch-desc">Мнения не превышают практику: 10 мнений без дел равны двум.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Сублинейность</div>
          <div class="tree-branch-desc">Рост веса голоса происходит медленнее роста рейтинга.</div>
        </div>
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag cyan">ЗАЩИТА ОТ СГОВОРА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Кольца взаимных похвал</div>
          <div class="tree-branch-desc">Вес оценок снижается при избытке общих контрагентов.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Двойное слепое раскрытие</div>
          <div class="tree-branch-desc">Отзывы участников спора открываются строго одновременно.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Предел защиты</div>
          <div class="tree-branch-desc">Атака фиктивных профилей ослабляется снижением выгоды накрутки.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Когда рейтинг определяет вес голоса, а голос формирует рейтинг, возникает риск образования круга самоусиления. Система разрывает его четырьмя барьерами: вес берётся из прошлой эпохи, число мнений строго ограничено объёмом практических дел, вес растёт сублинейно, а самооценка не допускается. Группы взаимных похвал выявляются по общим контрагентам, а отзывы сторон открываются одновременно. Предотвратить создание фиктивных профилей без централизованных паспортов полностью невозможно, поэтому платформа делает такие манипуляции экономически бессмысленными.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРАВОВОЙ КОНТУР</div>
    <h1 class="slide-title">ПРАВА И ОПЕРАТОР ТЕМЫ</h1>
    <p class="slide-subtitle">Право на ответ, прозрачный аудит и изоляция закрытых сообществ</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="benefit-card">
      <div class="card-num-badge">ПРАВО 1</div>
      <div class="card-title">Право ответа</div>
      <div class="card-desc">Рядом с критическим суждением всегда виден мотивированный ответ автора.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ПРАВО 2</div>
      <div class="card-title">Аудит источника</div>
      <div class="card-desc">Пользователь может проверить цепочку записей, из которых рассчитан показатель.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">КОНТУР 3</div>
      <div class="card-title">Герметичные отсеки</div>
      <div class="card-desc">Чат подъезда или товарищества шифруется общим ключом, Ветка передаёт вслепую.</div>
    </div>
  </div>
</div>

### Текст для диктора:
> Репутация является естественным продолжением правосубъектности гражданина. Платформа гарантирует право ответа: мотивированная позиция автора всегда отображается рядом с критической оценкой. Любой агрегированный показатель можно разобрать до первичных подписанных записей. Закрытые объединения, например совет подъезда или дачное товарищество, изолированы общим ключом шифрования, и серверные узлы передают их трафик вслепую. Правила тем устанавливают операторы сообществ в строгом соответствии с законами страны. Противоправные материалы исключаются из общественной индексации.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ИДЕНТИФИКАЦИЯ И ДОВЕРИЕ</div>
    <h1 class="slide-title">РЕГИСТРАЦИЯ И ПЕРЕНОС РЕЙТИНГА</h1>
    <p class="slide-subtitle">Три режима участия и запрет торговли анонимными профилями</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">РЕЖИМ 1</div>
        <div class="step-title">Полная анонимность</div>
        <div class="step-desc">Известен только район проживания</div>
      </div>
      <div class="pipeline-arrow">⊘</div>
      <div class="pipeline-step">
        <div class="step-num">РЕЖИМ 2</div>
        <div class="step-title">Социальная анонимность</div>
        <div class="step-desc">Банк удостоверяет личность для платежей</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">РЕЖИМ 3</div>
        <div class="step-title">Поимённый режим</div>
        <div class="step-desc">ФИО открыты добровольно для услуг</div>
      </div>
    </div>

    <div class="grid-2col" style="margin-top: 10px;">
      <div class="benefit-card">
        <div class="card-title" style="font-size: 26px;">Запрет переноса из анонимности</div>
        <div class="card-desc">Рейтинг анонимного ключа не конвертируется в социальный профиль для исключения торговли аккаунтами.</div>
      </div>
      <div class="benefit-card">
        <div class="card-title" style="font-size: 26px;">Строгое разделение знаний</div>
        <div class="card-desc">Банк России не знает о бытовых просьбах жителей, а районная Ветка не имеет доступа к счетам.</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Приложение «Забота» сохраняет три режима регистрации из «КубГолоса». Репутация накапливается во всех режимах, однако правила перехода строго регламентированы. Рейтинг из полной анонимности нельзя перенести в социальную при подключении расчётного счёта, что предотвращает торговлю накрученными анонимными профилями. Переход из социальной анонимности в поимённый режим происходит исключительно добровольно. Знания разделены: районная Ветка не имеет доступа к счетам, а финансовые структуры не знают о содержании домашних разговоров жителей.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПЛАТФОРМЕННЫЙ ВКЛАД</div>
    <h1 class="slide-title">БАЗОВЫЕ МОДУЛИ ПЛАТФОРМЫ</h1>
    <p class="slide-subtitle">Инженерные решения «Заботы», переходящие в общее ядро «Турбазы»</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card emerald-accent">
      <div class="card-pill-tag emerald">СЕМЬ МОДУЛЕЙ ПЛАТФОРМЫ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Запечатанные страницы</div>
          <div class="tree-branch-desc">Примитив масштабирования для любых открытых коллекций.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Составная конструкция</div>
          <div class="tree-branch-desc">Сборка независимых сервисов без риска монополизации.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Ядро социального рейтинга</div>
          <div class="tree-branch-desc">Агрегация доверия по темам с защитой от сговоров.</div>
        </div>
      </div>
    </div>

    <div class="glass-card">
      <div class="card-pill-tag cyan">ГРАНИЦЫ РОЛИ ПРИЛОЖЕНИЯ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Не считает платёжеспособность</div>
          <div class="tree-branch-desc">Кредитный скоринг остаётся прерогативой банковских структур.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Не ведёт единый балл</div>
          <div class="tree-branch-desc">Репутация строго разделена по независимым темам.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Оператор темы по закону</div>
          <div class="tree-branch-desc">Правила модерации определяются сообществом в рамках закона.</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Инженерные решения «Заботы» формируют универсальные модули для всей экосистемы платформы. Самозапечатывающиеся страницы, составная конструкция из открытых схем, мультимодальная фиксация опыта на телефоне и алгоритмы предметного рейтинга войдут в общий инструмент разработки. Границы сервиса определены не менее строго. «Забота» не рассчитывает кредитоспособность, не сводит личность к единому баллу и не подменяет государственное законодательство. Приложение предоставляет открытый инструмент сотрудничества, в котором правила определяются самими жителями и операторами тем.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ИТОГИ И ГОРИЗОНТ</div>
    <h1 class="slide-title">ИТОГИ И ПЕРЕХОД К «ДЕЛОВОМУ»</h1>
    <p class="slide-subtitle">Переход от взаимной помощи к среде исполнения</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag emerald">ВЫВОДЫ ПРЕЗЕНТАЦИИ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Страницы</div>
          <div class="tree-branch-desc">Масштаб без перегрузки сети.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Составная модель</div>
          <div class="tree-branch-desc">Защита от монополии сервисов.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Язык доверия</div>
          <div class="tree-branch-desc">Точный расчёт при неполноте данных.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">4. Два рейтинга</div>
          <div class="tree-branch-desc">Социальный авторитет отделён от финансов.</div>
        </div>
      </div>
    </div>

    <div class="glass-card gold-accent">
      <div class="card-pill-tag gold">СЛЕДУЮЩАЯ ЧАСТЬ</div>
      <div class="highlight-box gold" style="margin-bottom: 8px;">
        <div class="box-title">Приложение № 03: «Деловой»</div>
        <div class="box-desc">
          Среда исполнения: принятая идея становится задачей, а контракты связывают рейтинги.
        </div>
      </div>

      <div class="attribution-panel">
        <strong>Архитектор:</strong> Артём Владимирович Шамсутдинов · <strong>Планирование:</strong> Claude Sonnet 5.5 · <strong>Проработка:</strong> Gemini 3.8 Flash · <strong>Спецификация рейтинга:</strong> Antigravity (Google DeepMind) · Концепция 1.0 (2026), «как есть» · <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/09_sapoto_whitepaper.md" class="whitepaper-link" target="_blank">Белая книга № 09</a>.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Подведём итоги: приложение «Забота» показало, как открытая взаимопомощь опирается на надёжные структуры данных, страницы защищают сеть от перегрузок, а социальный авторитет честно учитывает дела человека без сведения к единому баллу. Материалы презентации представляют собой проектную концепцию, и практические испытания ещё продолжаются. Приглашаем разработчиков и организаторов местных сообществ к открытому диалогу. В следующей презентации представлен «Деловой», где принятые идеи превращаются в дела и финансовые расчёты. Спасибо за внимание!
