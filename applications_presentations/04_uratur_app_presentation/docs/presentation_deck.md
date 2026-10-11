---
presentation_id: "04_uratur_app_presentation"
title: "Платформа «Турбаза»"
subtitle: "«УраТур»: находить, беречь и сопровождать"
header_title: "ТУРБАЗА"
header_subtitle: "Приложение «УраТур»"
theme: "platform_overview"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
author: "Артём Владимирович Шамсутдинов"
planning: "Claude Sonnet 5.5"
elaboration: "Gemini 3.8 Flash"
status: "финальная версия, звук не собран"
version: "1.0 (2026)"
book: "shared_docs/whitepapers/11_uratur_whitepaper.md"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">«УРАТУР»: НАХОДИТЬ, БЕРЕЧЬ И СОПРОВОЖДАТЬ</h1>
    <p class="slide-subtitle">Навигатор и краеведческий реестр: данные семьи остаются на устройстве</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 1</div>
      <div class="card-title">Возрастной допуск</div>
      <div class="card-desc">Отсечение неподходящих материалов на Листе до загрузки.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 2</div>
      <div class="card-title">Общественные теги</div>
      <div class="card-desc">Реестр связей на домашних узлах энтузиастов.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 3</div>
      <div class="card-title">Расчёт на Листе</div>
      <div class="card-desc">Время перехода и запас света считаются без связи.</div>
    </div>
  </div>

  <div class="metric-ribbon">
    <div class="ribbon-item">
      <span class="ribbon-val">5</span>
      <span class="ribbon-lbl">вкладов в ядро</span>
    </div>
    <div class="ribbon-item">
      <span class="ribbon-val">3</span>
      <span class="ribbon-lbl">режима с картами</span>
    </div>
    <div class="ribbon-item">
      <span class="ribbon-val">7</span>
      <span class="ribbon-lbl">уровней в обществе</span>
    </div>
  </div>

  <div class="attribution-bottom-bar">
    <div class="attribution-credits">
      Автор: А. В. Шамсутдинов · Планирование: Claude Sonnet 5.5 · Проработка: Gemini 3.8 Flash · Концепция 1.0 (2026)
    </div>
    <div class="attribution-spec">
      <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/11_uratur_whitepaper.md" class="whitepaper-badge" target="_blank">📄 Белая книга № 11 «УраТур» ↗</a>
    </div>
  </div>
</div>

### Текст для диктора:
> Приветствуем зрителей. Для любого семейного путешествия требуются три потока данных: подробное описание местности, конфиденциальные сведения о группе и непрерывное сопровождение в пути. Картографические сервисы отлично справляются с картами, но обычно требуют передавать все личные маршруты на внешние серверы. «УраТур» устроен иначе: данные семьи и координаты остаются на Листе, описания троп собирают независимые сообщества, а расчёты выполняет процессор смартфона. Система опирается на три начала: возрастную защиту, открытые теги и автономное сопровождение.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ЗАДАЧА И МЕСТО В ЦИКЛЕ ЧЕТЫРЁХ ПРИЛОЖЕНИЙ</h1>
    <p class="slide-subtitle">Синтез открытых описаний, состава группы и движения во времени</p>
  </div>

  <div class="slide-body grid-2col-split">
    <div class="content-panel">
      <div class="panel-tag">ИЗ ПРЕДЫДУЩИХ ЧАСТЕЙ</div>
      <div class="concept-item">
        <span class="concept-bullet">1</span>
        <span><b>Лист, Ветка, Ствол:</b> данные у владельца.</span>
      </div>
      <div class="concept-item">
        <span class="concept-bullet">2</span>
        <span><b>Хранилище:</b> единица данных со своим ключом.</span>
      </div>
      <div class="concept-item">
        <span class="concept-bullet">3</span>
        <span><b>Пиши только своё:</b> локальный журнал изменений.</span>
      </div>
      <div class="concept-item">
        <span class="concept-bullet">4</span>
        <span><b>Опыт в «Заботе»::</b> проверенные шаблоны ситуаций.</span>
      </div>
      <div class="concept-item">
        <span class="concept-bullet">5</span>
        <span><b>Дело в органайзере:</b> исполнение задач на Листе.</span>
      </div>
    </div>

    <div class="content-panel panel-accent">
      <div class="panel-tag">ЧЕТЫРЕ СТУПЕНИ ДЕЙСТВИЯ</div>
      <div class="quartet-flow">
        <div class="quartet-node">КубГолос · Согласие</div>
        <div class="quartet-arrow">→</div>
        <div class="quartet-node">Забота · Опыт</div>
        <div class="quartet-arrow">→</div>
        <div class="quartet-node">Деловой · План</div>
        <div class="quartet-arrow">→</div>
        <div class="quartet-node quartet-active">УраТур · Движение</div>
      </div>
      <div class="privacy-chips-row">
        <span class="chip-item chip-open">Местность: открыто</span>
        <span class="chip-item chip-priv">Семья: на Листе</span>
        <span class="chip-item chip-priv">Координаты: на Листе</span>
      </div>
      <p class="panel-note-text">Маршрут развёртывается как Дело в «Деловом».</p>
    </div>
  </div>
</div>

### Текст для диктора:
> Путешествие объединяет три потока сведений: описания природы, состав группы и текущее положение на местности. Централизованным системам привычно хранить всё в одном месте, и в этом их особенность. Платформа распределяет данные иначе: личные планы и физические возможности остаются на устройстве, а тропы лежат в открытых хранилищах. «УраТур» завершает прикладной квартет: народное согласие, жизненный опыт, личный план и действие в реальном пространстве. Каждый найденный маршрут легко развёртывается как задача в органайзере.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ВОЗРАСТНОЙ ДОПУСК: ТРИ ОГРАНИЧЕНИЯ</h1>
    <p class="slide-subtitle">Защита ребёнка на уровне ядра Листа без передачи возраста наружу</p>
  </div>

  <div class="slide-body">
    <div class="logic-flow-horizontal">
      <div class="flow-card">
        <div class="card-mini-label">ИСТОЧНИК 1</div>
        <div class="flow-card-title">Тема каталога</div>
        <div class="flow-card-desc">Возраст темы в дереве Веток</div>
      </div>
      <div class="flow-op">+</div>
      <div class="flow-card">
        <div class="card-mini-label">ИСТОЧНИК 2</div>
        <div class="flow-card-title">Общественный тег</div>
        <div class="flow-card-desc">Возраст метки классификатора</div>
      </div>
      <div class="flow-op">+</div>
      <div class="flow-card">
        <div class="card-mini-label">ИСТОЧНИК 3</div>
        <div class="flow-card-title">Хранилище</div>
        <div class="flow-card-desc">Возраст конкретного описания</div>
      </div>
      <div class="flow-op">⇒</div>
      <div class="flow-card card-highlight">
        <div class="card-mini-label">РЕЗУЛЬТАТ</div>
        <div class="flow-card-title">Наибольший из трёх</div>
        <div class="flow-card-desc">Единый эффективный допуск</div>
      </div>
    </div>

    <div class="scale-banner">
      <div class="scale-label">ШКАЛА ВОЗРАСТНОГО ДОПУСКА:</div>
      <div class="scale-badges">
        <span class="scale-badge">0+</span>
        <span class="scale-badge">6+</span>
        <span class="scale-badge">12+</span>
        <span class="scale-badge">16+</span>
        <span class="scale-badge">18+</span>
      </div>
      <div class="scale-caption">Категории закона о защите детей; для маршрутов — согласованная шкала.</div>
    </div>

    <div class="example-banner">
      <span class="example-tag">ПРИМЕР:</span>
      <span>Тема 0, тег 12, хранилище 0 → допуск 12. Для ребёнка пяти лет запись скрыта.</span>
    </div>
  </div>
</div>

### Текст для диктора:
> Каждая краеведческая запись находится в хранилище, а хранилища объединены темами. У темы, общественного тега и самого хранилища есть собственный возрастной допуск. Из трёх величин ядро автоматически выбирает наибольшую. Проверка выполняется локально базой данных самого смартфона при каждом обращении, поэтому разработчику не нужно писать фильтры вручную. Возраст хранится строго в семейном профиле и не покидает аппарат. Шкала следует нормам законодательства, обеспечивая надежное и понятное согласование маршрутов.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ЧТО ВИДИТ КАЖДЫЙ УЗЕЛ И ЧЕГО НЕ СКАЧИВАЕТ</h1>
    <p class="slide-subtitle">Упреждающее отсечение от загрузки, два режима фильтрации и границы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="content-panel">
      <div class="panel-tag">ВИДИМОСТЬ ДАННЫХ ПО УЗЛАМ</div>
      <div class="node-row">
        <span class="node-title">Лист ребёнка:</span>
        <span class="node-desc">Хранит возраст; не скачивает записи выше допуска.</span>
      </div>
      <div class="node-row">
        <span class="node-title">Ветка района:</span>
        <span class="node-desc">Видит открытые описания; возраст не получает.</span>
      </div>
      <div class="node-row">
        <span class="node-title">Ствол сети:</span>
        <span class="node-desc">Сводные срезы без личных профилей.</span>
      </div>
      <div class="node-row">
        <span class="node-title">Соседний Лист:</span>
        <span class="node-desc">Видит лишь опубликованные сведения.</span>
      </div>
    </div>

    <div class="content-panel">
      <div class="panel-tag">РЕЖИМЫ ФИЛЬТРАЦИИ</div>
      <div class="mode-box">
        <div class="mode-title">Строгий режим</div>
        <div class="mode-desc">Скрывает весь трек при наличии сложного ответвления 16+.</div>
      </div>
      <div class="mode-box">
        <div class="mode-title">Мягкий режим</div>
        <div class="mode-desc">Оставляет доступную часть, скрывая лишь опасный участок.</div>
      </div>
    </div>
  </div>

  <div class="footer-notice-bar">
    <b>Границы:</b> Защита опирается на профиль и не заменяет внимания родителей.
  </div>
</div>

### Текст для диктора:
> Если допуск хранилища превышает возраст в профиле, Лист просто не загружает его из сети. Это бережёт трафик, а на устройстве ребёнка опасные описания физически отсутствуют. Районная Ветка и центральный Ствол знают лишь открытые параметры маршрутов и не получают возраст пользователя. Разработчик может включить строгий режим, исключающий весь поход при наличии сложных ответвлений, либо мягкий режим, скрывающий лишь опасный участок. Защита помогает семье, но не отменяет личной ответственности родителей.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">СЕМЬЯ: ПОРОГ И ДВА ХРАНИЛИЩА</h1>
    <p class="slide-subtitle">Порог по младшему участнику и разделение сложной экспедиции</p>
  </div>

  <div class="slide-body">
    <div class="family-split-diagram">
      <div class="family-root-box">
        <div class="card-mini-label">ЛОКАЛЬНЫЙ ПРОФИЛЬ</div>
        <div class="flow-card-title">Семья: родители, 13 лет, 5 лет</div>
        <div class="flow-card-desc">Порог группы по младшему участнику — 5 лет</div>
      </div>

      <div class="split-arrows-row">
        <div class="split-path">
          <div class="path-title">Простой маршрут выходного дня</div>
          <div class="path-box">Отбор прогулок с допуском не выше пяти лет</div>
        </div>
        <div class="split-path">
          <div class="path-title">Составная экспедиция в горы</div>
          <div class="path-box-two">
            <div class="repo-subcard">
              <span class="subcard-badge badge-green">Хранилище 1 (0+)</span>
              <span>Базовый лагерь, стоянка и тропа к роднику (для всех).</span>
            </div>
            <div class="repo-subcard">
              <span class="subcard-badge badge-purple">Хранилище 2 (12+)</span>
              <span>Радиальный выход на хребет, 650 м (родители и сын).</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="disclaimer-callout">
      Условный пример; ориентиры нагрузок проектные, требуют проверки медицинскими специалистами.
    </div>
  </div>
</div>

### Текст для диктора:
> Состав группы хранится исключительно на смартфоне родителей. Для обычной прогулки приложение определяет общий допуск по возрасту самого младшего участника. Для составной экспедиции одно хранилище неделимо, поэтому поездку разделяют на два независимых слоя. Базовый лагерь и обустроенная тропа открыты для всех, а радиальный подъём на вершину с перепадом шестьсот пятьдесят метров попадает лишь к родителям и старшему сыну. На аппарате пятилетней дочери второго хранилища нет. Оба подхода органично сочетаются.

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ОБЩЕСТВЕННЫЕ ТЕГИ И КООПЕРАТИВЫ</h1>
    <p class="slide-subtitle">Открытый реестр связей на домашних компьютерах энтузиастов</p>
  </div>

  <div class="slide-body grid-2col-tags">
    <div class="content-panel">
      <div class="panel-tag">ДВА ВИДА МЕТОК</div>
      <div class="compare-table">
        <div class="compare-row header-row">
          <span>Личная метка «Делового»</span>
          <span>Общественный тег «УраТура»</span>
        </div>
        <div class="compare-row">
          <span>На личном Листе</span>
          <span>В открытом реестре</span>
        </div>
        <div class="compare-row">
          <span>Видна только мне</span>
          <span>Доступна всем</span>
        </div>
        <div class="compare-row">
          <span>Свои сроки и темы</span>
          <span>Правила кооператива</span>
        </div>
      </div>
      <div class="trust-badge-row">
        <span>Автор проверен Опытом в «Заботе».</span>
      </div>
    </div>

    <div class="content-panel">
      <div class="panel-tag">КООПЕРАТИВНЫЕ ИНДЕКСЫ</div>
      <div class="coop-step">
        <span class="step-num">1</span>
        <span><b>Кооператив:</b> клуб туристов или краеведов.</span>
      </div>
      <div class="coop-step">
        <span class="step-num">2</span>
        <span><b>Индексные узлы:</b> домашние ПК хранят связи.</span>
      </div>
      <div class="coop-step">
        <span class="step-num">3</span>
        <span><b>Запись связи:</b> тег, хранилище, время, сумма.</span>
      </div>
      <div class="coop-step">
        <span class="step-num">4</span>
        <span><b>Хроно-дерево:</b> чтение периода без возврата к корню.</span>
      </div>
      <div class="metric-footnote">
        На накопителе 300 ГБ умещается ~700 млн связей.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Личная метка в «Деловом» видна только владельцу, а общественные теги принадлежат открытой кооперативной сети. Реестр ведут сообщества энтузиастов: туристские клубы, спасатели-добровольцы и краеведы. Участники могут предоставить домашние компьютеры под индексные узлы. Такие узлы хранят не тяжелые фотографии, а компактные записи связей, упорядоченные по времени в сбалансированном дереве. Контрольная сумма позволяет смартфону проверить целостность полученных данных. Репутацию авторов описаний надёжно защищает проверенный Опыт из «Заботы».

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ПОИСК И ПОДАЧА ИДЕЙ БЕЗ СКРЫТЫХ ОЦЕНОК</h1>
    <p class="slide-subtitle">Прыжковое пересечение тегов и три прозрачных источника планов</p>
  </div>

  <div class="slide-body grid-2col-search">
    <div class="content-panel">
      <div class="panel-tag">ПРЫЖКОВОЕ ПЕРЕСЕЧЕНИЕ ТЕГОВ</div>
      <div class="leapfrog-chain">
        <div class="leap-node"><span class="leap-cnt">84</span>детский маршрут</div>
        <div class="leap-arr">↓</div>
        <div class="leap-node"><span class="leap-cnt">3 200</span>стоянка с родником</div>
        <div class="leap-arr">↓</div>
        <div class="leap-node"><span class="leap-cnt">45 000</span>пеший поход</div>
        <div class="leap-arr">↓</div>
        <div class="leap-node"><span class="leap-cnt">120 000</span>Южный Урал</div>
      </div>
      <div class="leap-result">
        <b>Итог: 12 стоянок.</b> Трафик ~1,3 КБ вместо 20 МБ (числа условные).
      </div>
    </div>

    <div class="content-panel">
      <div class="panel-tag">МЕХАНИЧЕСКАЯ ПОДАЧА ИДЕЙ</div>
      <div class="ideas-sources-list">
        <div class="source-item">• Шаблоны маршрутов в «Заботе»</div>
        <div class="source-item">• Открытые хранилища планов</div>
        <div class="source-item">• Календарь свободных дней «Делового»</div>
      </div>
      <div class="filter-rules-box">
        <b>Условия:</b> допуск по возрасту, время по окну. Сортировка: близость, дата, перепад высот.
      </div>
      <div class="determinism-badge">
        Тот же ввод — тот же результат. Платного ранжирования нет.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Поиск по нескольким тегам начинается с самого редкого списка. Алгоритм прыжкового пересечения запрашивает лишь нужные идентификаторы, снижая сетевой трафик с десятков мегабайтов до полутора килобайт. Для подбора идей предусмотрены три источника, и решение всегда принимает человек: проверенный шаблон «Заботы», открытое хранилище энтузиастов или локальный синтез по календарю «Делового». Правила отбора предельно понятны и дают одинаковый результат при одинаковых условиях. Коммерческого продвижения и скрытого манипулирования вниманием в платформе нет.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ПЛАНИРОВАНИЕ НА ЛИСТЕ БЕЗ СВЯЗИ</h1>
    <p class="slide-subtitle">Расчёт времени по рельефу и определение коридора безопасности</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="content-panel">
      <div class="panel-tag">ЧЕТЫРЕ ПОТОКА НА ЛИСТЕ</div>
      <div class="stream-item"><b>1. Ветки:</b> описания троп и стоянок.</div>
      <div class="stream-item"><b>2. Теги:</b> индексы связей ориентиров.</div>
      <div class="stream-item"><b>3. Контекст:</b> профиль семьи и календарь.</div>
      <div class="stream-item"><b>4. Датчики:</b> координаты и компас.</div>
      <div class="calc-arrow-box">Расчёт времени на смартфоне</div>
    </div>

    <div class="content-panel">
      <div class="panel-tag">СКОРОСТЬ ПЕШЕХОДА ПО УКЛОНУ</div>
      <div class="slope-grid">
        <div class="slope-col"><span class="slope-val">5,0 км/ч</span><span class="slope-lbl">спуск −10%</span></div>
        <div class="slope-col"><span class="slope-val">5,0 км/ч</span><span class="slope-lbl">равнина</span></div>
        <div class="slope-col"><span class="slope-val">3,5 км/ч</span><span class="slope-lbl">подъём 10%</span></div>
        <div class="slope-col"><span class="slope-val">2,5 км/ч</span><span class="slope-lbl">подъём 20%</span></div>
      </div>
      <div class="calc-example-box">
        <b>Пример:</b> 3 км равнины, 1 км подъёма — 1 ч 48 мин.
      </div>
      <div class="safety-corridor-box">
        <b>Коридор безопасности:</b> вода, укрытие. Радиус детям до 8 лет — 7 км.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Вычисления выполняются по четырем потокам: описаниям района, индексам тегов, семейному профилю и датчикам телефона. Скорость ходьбы рассчитывается с учетом уклона местности, характера покрытия тропы и темпа самого медленного участника. В условном примере переход на четыре километра с подъемом занимает почти два часа с учетом обязательного отдыха. Алгоритм контролирует коридор безопасности: расстояние до источников воды, укрытий и дорог. Для детей до восьми лет проектный радиус автономности ограничен семью километрами.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">СОПРОВОЖДЕНИЕ В ПУТИ: ТЕМП И ЗАКАТ</h1>
    <p class="slide-subtitle">Сглаживание темпа, расчёт заката солнца и три запасных варианта</p>
  </div>

  <div class="slide-body">
    <div class="flow-steps-strip">
      <div class="strip-step">Сглаженный темп</div>
      <div class="strip-sep">→</div>
      <div class="strip-step">Спад ниже 0,75 дольше 30 мин</div>
      <div class="strip-sep">→</div>
      <div class="strip-step">Расчёт заката и прибытия</div>
      <div class="strip-sep">→</div>
      <div class="strip-step strip-alert">Зона запаса света</div>
    </div>

    <div class="zones-cards-row">
      <div class="zone-card zone-green">
        <div class="zone-badge">ЗЕЛЁНАЯ ЗОНА</div>
        <div class="zone-title">Запас от 2 часов</div>
        <div class="zone-desc">Движение по графику; штатный отдых.</div>
      </div>
      <div class="zone-card zone-yellow">
        <div class="zone-badge">ЖЁЛТАЯ ЗОНА</div>
        <div class="zone-title">Запас 1–2 часа</div>
        <div class="zone-desc">Предупреждение: сократить привалы.</div>
      </div>
      <div class="zone-card zone-red">
        <div class="zone-badge">КРАСНАЯ ЗОНА</div>
        <div class="zone-title">Запас менее 1 часа</div>
        <div class="zone-desc">Перестройка: риск сумерек. Выбор обхода.</div>
      </div>
    </div>

    <div class="fallback-options-row">
      <div class="opt-card"><b>Вариант А:</b> Ближайшая стоянка</div>
      <div class="opt-card"><b>Вариант Б:</b> Срезной обход</div>
      <div class="opt-card"><b>Вариант В:</b> Сход к дороге</div>
    </div>

    <div class="footer-notice-bar">
      Закат считается на Листе; в полярных широтах выдаётся уведомление; не заменяет спасателей.
    </div>
  </div>
</div>

### Текст для диктора:
> Кратковременные остановки не вызывают ложных тревог: темп экспоненциально сглаживается. Но если скорость падает ниже трех четвертей от плана и держится дольше получаса, контроллер вычисляет астрономический закат солнца и запас светлого времени. Выделяются три зоны безопасности. При переходе в красную зону устройство заранее предлагает три выхода: промежуточную стоянку, срезной обход или сход к автодороге. Окончательный выбор всегда делает руководитель группы. Сервис помогает человеку, но не подменяет спасателей.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">КАРТЫ: ТРИ РЕЖИМА РАБОТЫ</h1>
    <p class="slide-subtitle">Разделение графа движения и экономика партнёрства без раскрытия треков</p>
  </div>

  <div class="slide-body grid-2col-maps">
    <div class="content-panel">
      <div class="panel-tag">ТРИ РЕЖИМА УЧАСТИЯ</div>
      <div class="mode-item">
        <span class="mode-num">1</span>
        <div><b>Полная автономия:</b> работа строго по кэшу без сети.</div>
      </div>
      <div class="mode-item">
        <span class="mode-num">2</span>
        <div><b>Выборочный обмен:</b> загрузка тайлов и адресов без профиля.</div>
      </div>
      <div class="mode-item">
        <span class="mode-num">3</span>
        <div><b>Интеграция:</b> навигация на авто до начала тропы.</div>
      </div>
    </div>

    <div class="content-panel panel-accent">
      <div class="panel-tag">РАЗДЕЛЕНИЕ ГРАФА ДВИЖЕНИЯ</div>
      <div class="graph-flow">
        <div class="graph-node">Дом</div>
        <div class="graph-edge">Авто: сервис карт</div>
        <div class="graph-node">Стоянка у тропы</div>
        <div class="graph-edge graph-edge-priv">Пешком: Лист</div>
        <div class="graph-node">Приют в горах</div>
      </div>
      <div class="maps-invariants-box">
        • При штатной работе пешеходные треки и семья сервису не передаются.<br/>
        • Подложка по соглашению с поставщиком; десятина гражданину 10%.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Яндекс Карты обладают великолепной инфраструктурой, и концепция предполагает честное партнерство. Пользователь сам выбирает режим участия: полную автономию, выборочную загрузку карт или навигацию по шоссе. Маршрут делится на две части: подъезд к началу тропы рассчитывает сервис карт, а пешеходные тропы ведет Лист. При штатной работе личные треки и состав семьи не передаются. Офлайн-карты сохраняются по соглашению с поставщиком, а расчеты строятся на автоматических программах с выделением десятины гражданину.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ПРИМЕР: ЭКСПЕДИЦИЯ НА ЮЖНЫЙ УРАЛ</h1>
    <p class="slide-subtitle">Сквозной сценарий: два хранилища, расчёт подъёма, замедление и выбор обхода</p>
  </div>

  <div class="slide-body">
    <div class="scenario-header-box">
      <b>Семья:</b> Родители и двое детей · Горный поход на Южный Урал
    </div>

    <div class="scenario-timeline">
      <div class="timeline-card">
        <div class="t-step">ШАГ 1</div>
        <div class="t-text">Лагерь 0+, хребет 12+ (подъём 650 м).</div>
      </div>
      <div class="timeline-card">
        <div class="t-step">ШАГ 2</div>
        <div class="t-text">Расчёт подъёма: 3 ч 40 мин.</div>
      </div>
      <div class="timeline-card">
        <div class="t-step">ШАГ 3</div>
        <div class="t-text">Дождь: темп упал до 0,68 от плана.</div>
      </div>
      <div class="timeline-card card-alert">
        <div class="t-step">ШАГ 4</div>
        <div class="t-text">Закат 19:20, запас 30 мин (красная зона).</div>
      </div>
      <div class="timeline-card card-success">
        <div class="t-step">ШАГ 5</div>
        <div class="t-text">Срезной обход, лагерь в 17:30 (запас почти 2 ч).</div>
      </div>
      <div class="timeline-card">
        <div class="t-step">ШАГ 6</div>
        <div class="t-text">Треки сохранены строго на смартфонах.</div>
      </div>
    </div>

    <div class="scenario-subtext-bar">
      В книге: экотропа 1,8 км. Пример условный.
    </div>
  </div>
</div>

### Текст для диктора:
> В реальном примере на телефон младшей дочери сложное хранилище с подъемом не попадает. Расчетное время восхождения составляло три часа сорок минут. На курумнике пошел дождь, и за полчаса темп упал до шестидесяти восьми сотых от плана. Бортовой алгоритм рассчитал закат солнца в девятнадцать двадцать. Возвращение в лагерь ожидалось в восемнадцать пятьдесят с опасным запасом в полчаса. Руководитель выбрал запасной срезной обход, и семья благополучно вернулась в семнадцать тридцать. Все треки остались на устройствах.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">СЕМЬ УРОВНЕЙ ОБЩЕСТВА</h1>
    <p class="slide-subtitle">Общественная ценность приложения от отдельной семьи до субъекта страны</p>
  </div>

  <div class="slide-body">
    <div class="pillars-top-strip">
      Опоры: Автономия Листа · Возрастной допуск · Кооперативные индексы
    </div>

    <div class="levels-stacked-grid">
      <div class="level-row">
        <span class="lvl-num">1. Семьи:</span>
        <span>Безопасный отбор и тайна семейных планов.</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">2. Детсады:</span>
        <span>Короткие экотропы 1,5–2 км (ориентир).</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">3. Школы:</span>
        <span>Уроки краеведения и безопасность на местности.</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">4. Гиды и МСП:</span>
        <span>Прямой контакт с туристами без посредников.</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">5. ТОС и соседи:</span>
        <span>Контроль родников, троп и субботники.</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">6. Муниципалитеты:</span>
        <span>Сводки о нагрузке для благоустройства.</span>
      </div>
      <div class="level-row">
        <span class="lvl-num">7. Регионы:</span>
        <span>Межрегиональные коридоры и предания края.</span>
      </div>
    </div>

    <div class="footer-notice-bar">
      Примеры условные; данные хранятся в инфраструктуре России.
    </div>
  </div>
</div>

### Текст для диктора:
> Три фундаментальные опоры создают пользу на семи уровнях общества: семье, детскому саду, школе, малому бизнесу, местным сообществам, муниципалитетам и регионам страны. Муниципальные власти получают агрегированные обезличенные сводки о рекреационной нагрузке без сбора персональных данных туристов. Краеведческие гиды взаимодействуют с путешественниками напрямую. Народные предания и топонимы бережно сохраняются в открытых описаниях. Документ не приводит денежных оценок, поскольку масштабные полевые измерения еще только предстоят.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ИЗ ИСТОРИИ ЗАМЫСЛА: ДЕВЯТНАДЦАТЬ ЛЕТ</h1>
    <p class="slide-subtitle">От первой идеи программы автора и симуляции к архитектуре Дерева</p>
  </div>

  <div class="slide-body grid-2col-history">
    <div class="content-panel">
      <div class="panel-tag">ХРОНИКА РАЗВИТИЯ ИДЕИ</div>
      <div class="hist-entry">
        <span class="hist-year">2007</span>
        <div><b>Первая идея программы:</b> планер поездок и логотип.</div>
      </div>
      <div class="hist-entry">
        <span class="hist-year">Имя</span>
        <div><b>От «Урарун» к «УраТур»:</b> клич «Ура!» и туризм.</div>
      </div>
      <div class="hist-entry">
        <span class="hist-year">Истоки</span>
        <div><b>Симуляция «НСНК»:</b> Дерево, связь и очереди.</div>
      </div>
      <div class="hist-entry">
        <span class="hist-year">2026</span>
        <div><b>27-я страница доклада:</b> логотип для Минцифры России.</div>
      </div>
      <div class="hist-entry">
        <span class="hist-year">Завтра</span>
        <div><b>Перспектива:</b> защищённые очки с проекцией тропы.</div>
      </div>
    </div>

    <div class="content-panel panel-accent center-content">
      <div class="motto-box">
        <div class="motto-label">ГЛАВНЫЙ СМЫСЛ ЗАМЫСЛА</div>
        <div class="motto-text">«Чтобы все были живы, целы и невредимы»</div>
        <div class="motto-desc">
          Стихии природы и безопасное возвращение домой.
        </div>
      </div>
      <div class="history-note-card">
        Путь от первого листа к семейной безопасности на тропе.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Девятнадцать лет назад родилась самая первая в жизни автора идея программы: личный планировщик поездок. От тех дней сохранился лист бумаги с цветным логотипом, электронная версия которого представлена на двадцать седьмой странице презентации платформы для Минцифры России. Первоначальное название «Урарун» со временем стало «УраТуром». Разработка тактической симуляции подтолкнула к трехуровневому Дереву и очередям хранилищ. В мирном будущем очки подскажут поворот тропы, а сегодня главное — надежная работа смартфона в походе.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ЧТО СТАНЕТ БАЗОВЫМ МОДУЛЕМ ПЛАТФОРМЫ</h1>
    <p class="slide-subtitle">Семь решений, выводимых в ядро экосистемы, и границы возможностей</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="content-panel">
      <div class="panel-tag">СЕМЬ ВЫВОДИМЫХ МОДУЛЕЙ ЯДРА</div>
      <div class="module-item"><b>1. Возрастной допуск:</b> разграничение на Листе.</div>
      <div class="module-item"><b>2. Общественные теги:</b> открытые каталоги.</div>
      <div class="module-item"><b>3. Быстрые запросы:</b> опросы и помощь.</div>
      <div class="module-item"><b>4. Геостатистика:</b> реестр услуг и ЖКХ.</div>
      <div class="module-item"><b>5. Контроль планов:</b> календарь и задачи.</div>
      <div class="module-item"><b>6. Геокэш:</b> работа бригад без связи.</div>
      <div class="module-item"><b>7. Адаптер:</b> подключение внешних карт.</div>
    </div>

    <div class="content-panel">
      <div class="panel-tag">ЧЕТЫРЕ ГРАНИЦЫ ВОЗМОЖНОСТЕЙ</div>
      <div class="boundary-box">
        <b>1. Вне спецслужб:</b> МЧС и спасатели.
      </div>
      <div class="boundary-box">
        <b>2. Не удостоверяет возраст:</b> юридический статус.
      </div>
      <div class="boundary-box">
        <b>3. Открытые данные:</b> проверка на месте.
      </div>
      <div class="boundary-box">
        <b>4. Приоритет человека:</b> решение за лидером.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Семь инженерных решений со временем станут общими платформенными модулями ядра платформы: возрастной допуск Листа, общественные теги, быстрые многотеговые запросы, пространственная статистика, контроль планов, кэш геоданных и адаптер внешних сервисов. Жизненный цикл архитектурно прост: обкатка в приложении, выработка единых интерфейсов, включение в ядро и стандартизация в двенадцатой Белой книге. Границы четко очерчены: сервис не подменяет государственные службы спасения, не устанавливает юридический возраст и оставляет право окончательного решения за человеком.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">ИТОГИ И ПРОДОЛЖЕНИЕ СЕРИИ</h1>
    <p class="slide-subtitle">Прикладной квартет решений и переход к местным службам</p>
  </div>

  <div class="slide-body grid-2col-summary">
    <div class="content-panel">
      <div class="panel-tag">ТРИ ГЛАВНЫХ ИТОГА «УРАТУРА»</div>
      <div class="summary-card">
        <div class="summary-num">1</div>
        <div><b>Возраст на Листе:</b> отсечение рисков в ядре без передачи возраста.</div>
      </div>
      <div class="summary-card">
        <div class="summary-num">2</div>
        <div><b>Кооперативные теги:</b> открытые индексы на домашних узлах.</div>
      </div>
      <div class="summary-card">
        <div class="summary-num">3</div>
        <div><b>Автономия:</b> расчёт времени и запаса света без связи.</div>
      </div>
    </div>

    <div class="content-panel panel-accent">
      <div class="panel-tag">ПРОДОЛЖЕНИЕ СЕРИИ ПРЕЗЕНТАЦИЙ</div>
      <div class="next-deck-box">
        <div class="next-deck-badge">СЛЕДУЮЩАЯ ПРЕЗЕНТАЦИЯ № 05</div>
        <div class="next-deck-title">Локальный реестр МСП и ЖКХ</div>
        <div class="next-deck-desc">
          Синтез квартета приложений («КубГолос», «Забота», «Деловой», «УраТур») для местных служб.
        </div>
      </div>
    </div>
  </div>

  <div class="attribution-panel-footer">
    <div class="attr-full-text">
      Автор: А. В. Шамсутдинов · Планирование: Claude Sonnet 5.5 · Проработка: Gemini 3.8 Flash · Концепция 1.0 (2026). Материал «как есть». Белая книга № 11.
    </div>
  </div>
</div>

### Текст для диктора:
> Подведем итоги. Возраст ребенка защищает ядро Листа без передачи личных сведений. Открытые теги поддерживают кооперативы энтузиастов на домашних компьютерах. Расчет времени перехода и запаса светлого времени производит сам смартфон, а внешние карты подключаются по выбору пользователя. Четыре программы — «КубГолос», «Забота», «Деловой» и «УраТур» — образуют завершенный прикладной квартет. В следующей презентации эти наработки объединяются в локальном реестре услуг и ЖКХ. Приглашаем к изучению одиннадцатой Белой книги.
