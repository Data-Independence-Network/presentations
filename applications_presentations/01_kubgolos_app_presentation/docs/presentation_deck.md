---
title: "«КубГолос»: измерять и складывать"
subtitle: "Многофакторная оценка, потоковые счётчики и сложение сумм"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
author: "Артём Владимирович Шамсутдинов"
planning: "Claude Sonnet 5.5"
elaboration: "Gemini 3.8 Flash (лирическая драматургия и художественное оформление)"
status: "финальная версия"
version: "1.0 (2026)"
book: "shared_docs/whitepapers/08_votecube_whitepaper.md"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">«КУБГОЛОС»: ИЗМЕРЯТЬ И СКЛАДЫВАТЬ</h1>
    <p class="slide-subtitle">Многофакторная оценка, которая считается без сбора личных данных в одном центре</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 1</div>
      <div class="card-title">Форма оценки</div>
      <div class="card-desc">Сто базисных пунктов внимания на вопрос и честный баланс значимости.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 2</div>
      <div class="card-title">Счётчики эпох</div>
      <div class="card-desc">Потоковая обработка в памяти Ветки без задержек и дисковых перегрузок.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 3</div>
      <div class="card-title">Суммы вверх</div>
      <div class="card-desc">Точное сложение по дереву без искажений и ошибок усреднения.</div>
    </div>
  </div>

  <div class="attribution-bottom-bar">
    <div class="attribution-credits">
      Автор: А. В. Шамсутдинов · Планирование: Claude Sonnet 5.5 · Лирическая драматургия и художественное оформление: Gemini 3.8 Flash · Концепция 1.0 (2026)
    </div>
    <div class="attribution-spec">
      Детальная инженерная спецификация:
      <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/08_votecube_whitepaper.md" class="whitepaper-badge" target="_blank">📄 Белая книга № 08 «КубГолос» ↗</a>
    </div>
  </div>
</div>

### Текст для диктора:
> Каждому знакомо чувство, когда на общем собрании жильцов или в школьном совете привычный опрос вместо согласия порождает споры. Простое голосование делит людей на тех, кто победил, и тех, чьё мнение осталось неуслышанным.
> 
> Приложение «КубГолос» предлагает другой путь. Здесь жители сами определяют повестку дня своего дома или района, а платформа помогает выразить глубину каждого мнения без сбора личных данных в единый центр.
> 
> В основе лежат три простых принципа: честный бюджет внимания в сто пунктов, быстрый подсчёт в оперативной памяти и сложение сумм вверх по дереву. Посмотрим, как это устроено.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">АРХИТЕКТУРНЫЙ ПОДХОД</div>
    <h1 class="slide-title">ЧЕМ ДОПОЛНИТЬ ПРИВЫЧНЫЕ ОПРОСЫ</h1>
    <p class="slide-subtitle">Задачи совместных решений и три уровня архитектуры платформы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ОСОБЕННОСТИ ОПРОСОВ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Рамка составителя</div>
          <div class="tree-branch-desc">Формулировку задаёт автор, часто скрывая подлинные тревоги людей.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Выбор «да или нет»</div>
          <div class="tree-branch-desc">Простая галочка поляризует общество и не объясняет причин.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Усреднение итога</div>
          <div class="tree-branch-desc">Единый процент маскирует глубокий раскол мнений между участниками.</div>
        </div>
      </div>
    </div>

    <div class="glass-card highlight">
      <div class="card-pill-tag emerald">ТРИ УРОВНЯ ПЛАТФОРМЫ</div>
      <div class="tier-stack">
        <div class="tier-block">
          <div class="tier-icon">🍃</div>
          <div class="tier-info">
            <div class="tier-name">Лист</div>
            <div class="tier-desc">Смартфон гражданина, надёжно хранит его решение в тайне.</div>
          </div>
        </div>
        <div class="tier-arrow">↑ дельты</div>
        <div class="tier-block">
          <div class="tier-icon">🌿</div>
          <div class="tier-info">
            <div class="tier-name">Ветка</div>
            <div class="tier-desc">Узел района или темы, ведёт потоковый подсчёт сумм в памяти.</div>
          </div>
        </div>
        <div class="tier-arrow">↑ суммы</div>
        <div class="tier-block">
          <div class="tier-icon">🌳</div>
          <div class="tier-info">
            <div class="tier-name">Ствол</div>
            <div class="tier-desc">Государственный уровень, объединяет общую картину без надзора.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Традиционные опросы привычны и удобны, но часто оставляют ощущение недосказанности. Когда формулировка навязана заранее, в неё не помещаются настоящие заботы жителей, а сухое согласие или отказ скрывают мотивы выбора.
> 
> Самое же опасное противоречие кроется в усреднении: победный процент легко маскирует глубокое разделение мнений.
> 
> «КубГолос» решает эту задачу через гармонию трёх уровней платформы «Турбаза»: Лист на смартфоне гражданина бережёт решение под личным ключом, Ветка района аккуратно считает потоковые суммы без задержек, а Ствол объединяет результаты в общегосударственном масштабе.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">МАТЕМАТИЧЕСКАЯ ФОРМА</div>
    <h1 class="slide-title">ФОРМА ОЦЕНКИ: СТО ПУНКТОВ НА ВОПРОС</h1>
    <p class="slide-subtitle">Бюджет влияния, факторы выбора и две независимые метрики</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">ШАГ 1</div>
        <div class="step-title">Контекст</div>
        <div class="step-desc">Ситуация и Идея</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ШАГ 2</div>
        <div class="step-title">Факторы</div>
        <div class="step-desc">До 3 в кубе, до 7 всего</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ШАГ 3</div>
        <div class="step-title">100 пунктов</div>
        <div class="step-desc">Бюджет внимания</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ШАГ 4</div>
        <div class="step-title">Две метрики</div>
        <div class="step-desc">Значимость и позиция</div>
      </div>
    </div>

    <div class="grid-2col-equal">
      <div class="highlight-box">
        <div class="box-title">Куб как наглядная метафора</div>
        <div class="box-desc">Три главные оси показывают объём мнений. Каждая ось имеет два полюса: поддержка или несогласие.</div>
      </div>

      <div class="highlight-box gold">
        <div class="box-title">Осознанный выбор приоритетов</div>
        <div class="box-desc">Нельзя выставить максимальный балл всем факторам сразу. Участник распределяет личный бюджет заботы.</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Представьте, что каждому жителю выделяется ровно сто пунктов внимания на весь вопрос. Это личный бюджет заботы, который невозможно раздать всем сторонам поровну: чтобы усилить один довод, приходится уступить в другом.
> 
> Участник не просто одобряет проект или спорит с ним — он честно показывает, что для него важнее: безопасность детей, вечерняя тишина или затраты на ремонт.
> 
> В итоге рождаются две независимые метрики: важность фактора для человека и его искренняя позиция. Метафора куба открывает объёмный мир мнений вместо плоской шкалы.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">РАСЧЁТНЫЙ ПРИМЕР</div>
    <h1 class="slide-title">ЧЕТЫРЕ ГРАЖДАНИНА, ОДИН РАСКОЛ</h1>
    <p class="slide-subtitle">Разделение значимости и позиции выявляет скрытые противоречия</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <table class="calc-table">
        <thead>
          <tr>
            <th>Фактор</th>
            <th>Значимость</th>
            <th>Позиция</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Стоимость</td>
            <td>35%</td>
            <td>+71,4%</td>
          </tr>
          <tr class="highlight">
            <td>Сроки</td>
            <td>30%</td>
            <td>0 (раскол)</td>
          </tr>
          <tr>
            <td>Экология</td>
            <td>35%</td>
            <td>+14,3%</td>
          </tr>
        </tbody>
      </table>
      <div class="notice-banner" style="margin-top: 10px;">
        Итоговый общий индекс проекта: 30%.
      </div>
    </div>

    <div class="visual-panel">
      <div class="highlight-box gold">
        <div class="box-title">Фактор «Сроки»: раскол пополам</div>
        <div class="box-desc">
          Значимость высока для трети участников, но позиции разделились строго поровну.
        </div>
      </div>

      <div class="compromise-card" style="margin-top: 10px;">
        Обычный опрос скрыл бы острый спор за общей цифрой. Две метрики показывают реальную картину. Условный пример.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Обратимся к наглядному условному примеру: четверо соседей оценивают проект благоустройства по стоимости, срокам работ и чистоте воздуха.
> 
> Взгляните на фактор сроков: его важность составляет треть от всех мнений, а итоговая позиция равна нулю. Но это вовсе не равнодушие жильцов — это принципиальный спор, где голоса разделились строго пополам.
> 
> Обычный опрос показал бы общую удовлетворённость в тридцать процентов, и глубокое противоречие осталось бы невидимым. Две раздельные шкалы вовремя предупреждают организаторов о скрытом конфликте.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">СТРУКТУРИРОВАНИЕ ДАННЫХ</div>
    <h1 class="slide-title">КОНТЕКСТ И ВЕРСИИ: ДЕРЕВО ТЕМ</h1>
    <p class="slide-subtitle">Привязка к ситуации, ветвление предложений и поиск аналогов</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ВЕТВЛЕНИЕ ВОПРОСА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Ситуация</div>
          <div class="tree-branch-desc">Конкретный двор, парковка или сквер.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Идея</div>
          <div class="tree-branch-desc">Исходное предложение жильцов дома.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Версии формулировок</div>
          <div class="tree-branch-desc">Варианты для водителей и для родителей.</div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="highlight-box">
        <div class="box-title">Дерево тем и колода факторов</div>
        <div class="box-desc">Вопросы упорядочены в каталоге с быстрым поиском по первым буквам.</div>
      </div>

      <div class="notice-banner gold" style="margin-top: 10px;">
        <strong>Подсказка на устройстве:</strong> «Похожий вопрос уже открыт в вашем районе. Присоединиться?» Создать новый вопрос можно последним шагом.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Каждая оценка в «КубГолосе» прочно привязана к жизненной ситуации: конкретному подъезду, школьному двору или районному скверу. Именно к месту прикрепляются предложения.
> 
> Если предложенная формулировка кажется человеку неполной, он не тратит силы на перепалки в комментариях. Он просто создаёт собственную версию в ветвящемся дереве идей, предлагая соседям конструктивный выбор.
> 
> А чтобы район не утонул в тысячах похожих обсуждений, смартфон заранее сверяет тему с районным деревом и мягко подсказывает: «Такой вопрос уже открыт, присоединяйтесь».

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРОТОКОЛ ЛИСТА</div>
    <h1 class="slide-title">ГОЛОС КАК СОБСТВЕННАЯ ЗАПИСЬ</h1>
    <p class="slide-subtitle">Принцип «Пиши только своё», дельты и квитанция</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">ЛИСТ</div>
        <div class="step-title">Подпись записи</div>
        <div class="step-desc">Личный ключ жителя</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ДЕЛЬТА</div>
        <div class="step-title">Разница голоса</div>
        <div class="step-desc">Отправка на Ветку</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ВЕТКА</div>
        <div class="step-title">Пересчёт сумм</div>
        <div class="step-desc">Итог − старый + новый</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">КВИТАНЦИЯ</div>
        <div class="step-title">Отчёт Листу</div>
        <div class="step-desc">Подтверждение узла</div>
      </div>
    </div>

    <div class="grid-3col">
      <div class="highlight-box">
        <div class="box-title">Пиши только своё</div>
        <div class="box-desc">Участник может обновлять только собственную запись.</div>
      </div>

      <div class="highlight-box">
        <div class="box-title">Нулевой вес</div>
        <div class="box-desc">Отозванный голос обнуляется без разрыва цепочки.</div>
      </div>

      <div class="highlight-box gold">
        <div class="box-title">Работа без связи</div>
        <div class="box-desc">Отметки ждут на телефоне до появления сети.</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В платформе действует непреложное правило автономии: «Пиши только своё». Гражданин создаёт голос на своём смартфоне и заверяет его личным криптографическим ключом.
> 
> Люди развиваются и меняют взгляды по мере появления новых доводов. Если мнение изменилось, устройство формирует дельту — точную разницу между прежним и новым решением. Ветка вычитает старое значение и прибавляет свежее, а жителю возвращается подписанная квитанция.
> 
> Никаких повторных начислений не происходит, а при перебоях связи голос терпеливо ждёт в защищённой памяти телефона.

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРОИЗВОДИТЕЛЬНОСТЬ ВЕТКИ</div>
    <h1 class="slide-title">СЧЁТЧИКИ В ПАМЯТИ И БЛОКИ ЭПОХ</h1>
    <p class="slide-subtitle">Потоковая обработка на узле и компактный архив решений</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">ПАКЕТЫ</div>
        <div class="step-title">19–25 байт</div>
        <div class="step-desc">Голос на Листе</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">СУММЫ</div>
        <div class="step-title">Память Ветки</div>
        <div class="step-desc">Без сброса на диск</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ЭПОХА</div>
        <div class="step-title">Час или сутки</div>
        <div class="step-desc">Отрезок подсчёта</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">БЛОК</div>
        <div class="step-title">150 байт</div>
        <div class="step-desc">Хроника эпохи</div>
      </div>
    </div>

    <div class="grid-2col-equal">
      <div class="highlight-box">
        <div class="box-title">Компактный годовой архив</div>
        <div class="box-desc">
          Годовой архив суточных блоков занимает около 55 килобайт. При часовых эпохах объём составляет до 1,3 мегабайта.
        </div>
      </div>

      <div class="highlight-box gold">
        <div class="box-title">Проектные цели</div>
        <div class="box-desc">
          Цепочка блоков позволяет строить график настроений прямо на телефоне. Измерения на реальных нагрузках ещё предстоят.
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Когда сотни тысяч жителей голосуют одновременно, обычные серверы захлёбываются под лавиной обращений к накопителям.
> 
> «КубГолос» решает инженерную задачу элегантно: Ветка района принимает крошечные пакеты размером всего в пару десятков байт и непрерывно суммирует их в быстрой оперативной памяти.
> 
> По окончании эпохи — часа для горячих обсуждений или суток для размеренных планов — узел запечатывает аккуратный блок хроники размером около ста пятидесяти байт. Весь годовой архив района умещается в скромные пятьдесят пять килобайт, сохраняя идеальную проверяемость.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">МАСШТАБИРОВАНИЕ</div>
    <h1 class="slide-title">СУММЫ ВВЕРХ ПО ДЕРЕВУ</h1>
    <p class="slide-subtitle">Почему агрегируют суммы с числом участников, а не средние</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">УСЛОВНЫЙ ПРИМЕР СЛОЖЕНИЯ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Район X: 100 участников</div>
          <div class="tree-branch-desc">Средняя оценка позиции: +80.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Район Y: 900 участников</div>
          <div class="tree-branch-desc">Средняя оценка позиции: +20.</div>
        </div>
        <div class="tree-node" style="border-color: var(--coral-light);">
          <div class="tree-branch-title">Среднее средних: 50</div>
          <div class="tree-branch-desc">Грубая математическая ошибка расчёта.</div>
        </div>
        <div class="tree-node" style="border-color: var(--emerald-light);">
          <div class="tree-branch-title">Сумма к числу: 26</div>
          <div class="tree-branch-desc">Точный и достоверный итог по городу.</div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="highlight-box">
        <div class="box-title">Иерархия Веток</div>
        <div class="box-desc">
          Район → Город → Регион → Ствол. Вектор между уровнями около 128 байт. Две структуры: территория и темы.
        </div>
      </div>

      <div class="notice-banner gold" style="margin-top: 10px;">
        <strong>Проектная цель:</strong> сводка по крупному городу за единицы секунд без сбора сырых голосов в единый центр.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В масштабных опросах часто совершают классическую математическую ошибку: вычисляют среднее значение от средних показателей.
> 
> Посмотрим на условный расчёт: в небольшом районе из ста человек средний энтузиазм равен плюс восьмидесяти. А в соседнем районе из девятисот жителей поддержка составляет лишь плюс двадцать. Если просто сложить их и поделить на два, получится обманчивая цифра пятьдесят. Истинный же баланс равен двадцати шести!
> 
> Чтобы не искажать реальность, «Турбаза» передаёт вверх по дереву исключительно чистые суммы и количество участников, собирая честную сводку по городу за секунды.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">БАЛАНС МНЕНИЙ И ПРАКТИКИ</div>
    <h1 class="slide-title">ТРИ ШКАЛЫ: НАРОД, ЭКСПЕРТЫ, ОПЫТ</h1>
    <p class="slide-subtitle">Раздельное отображение массовых оценок, компетенций и дел</p>
  </div>

  <div class="slide-body">
    <div class="scales-grid-3">
      <div class="scale-col-card">
        <div class="scale-header">
          <div class="scale-icon">👥</div>
          <div class="scale-name">Шкала «Народ»</div>
        </div>
        <div class="card-desc">
          Один человек — один голос. Сто базисных пунктов бюджета влияния.
        </div>
      </div>

      <div class="scale-col-card">
        <div class="scale-header">
          <div class="scale-icon">🎓</div>
          <div class="scale-name">Шкала «Эксперты»</div>
        </div>
        <div class="card-desc">
          Взвешивание репутацией в теме по итогам прошлой эпохи без самооценки.
        </div>
      </div>

      <div class="scale-col-card highlight">
        <div class="scale-header">
          <div class="scale-icon">⭐</div>
          <div class="scale-name">Шкала «Результат»</div>
        </div>
        <div class="card-desc">
          Подтверждённый практический опыт из прикладных сервисов платформы.
        </div>
      </div>
    </div>

    <div class="notice-banner gold" style="margin-top: 14px;">
      <strong>Динамика весов:</strong> до опытов вес 0,62; после пяти проверенных исходов 0,76 при успехе или 0,41 при неудаче. Проектные параметры подлежат калибровке.
    </div>
  </div>
</div>

### Текст для диктора:
> Принимая ответственные решения, важно слышать каждого, но нельзя игнорировать знания специалистов и проверку жизнью. Поэтому результаты показываются тремя параллельными шкалами.
> 
> Шкала «Народ» гарантирует равенство всех участников. Шкала «Эксперты» учитывает признанный авторитет в конкретном вопросе, защищая от популизма. А шкала «Результат» беспристрастно фиксирует реальные дела и последствия прошлых шагов.
> 
> На старте лидируют мнения. Однако по мере накопления проверенного опыта именно реальный результат выходит на первый план, расставляя всё по своим местам.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">УСТОЙЧИВОСТЬ СИСТЕМЫ</div>
    <h1 class="slide-title">РЕГИСТРАЦИЯ И ЗАЩИТА ОТ НАКРУТОК</h1>
    <p class="slide-subtitle">Три режима участия, барьеры искажений и объективные пределы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ТРИ РЕЖИМА</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Полная анонимность</div>
          <div class="tree-branch-desc">Известен лишь подтверждённый район проживания.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Социальная анонимность</div>
          <div class="tree-branch-desc">Один кошелёк Банка России или поручительство соседей.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Поимённый контур</div>
          <div class="tree-branch-desc">Открытое имя после прямого предупреждения.</div>
        </div>
      </div>
    </div>

    <div class="glass-card">
      <table class="risk-table">
        <thead>
          <tr>
            <th>Угроза</th>
            <th>Защитный барьер</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Массовые профили</td>
            <td>Ценз района, лимиты частоты</td>
          </tr>
          <tr>
            <td>Подмена голоса</td>
            <td>Личная цифровая подпись</td>
          </tr>
          <tr>
            <td>Спам факторов</td>
            <td>До 3 новых факторов в сутки</td>
          </tr>
        </tbody>
      </table>
      <div class="notice-banner" style="margin-top: 10px;">
        Предел известен: Дж. Дусер, 2002. Без центра реестра накрутки не отсекаются нацело. Система снижает их выгоду.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В открытых цифровых сообществах всегда существует риск недобросовестных манипуляций. «КубГолос» предлагает гибкую лестницу доверия из трёх режимов: от полной районной анонимности до поручительства соседей, цифрового кошелька Банка России или открытого поимённого голосования.
> 
> Защита выстроена продуманными рубежами: территориальный ценз, разумные лимиты частоты предложений и криптографическая подпись каждого действия.
> 
> Теорема Джона Дусера доказала, что без тотального контроля накрутки нельзя устранить целиком. Поэтому платформа делает искажения экономически и социально бессмысленными.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">РАЗГРАНИЧЕНИЕ КОНТУРОВ</div>
    <h1 class="slide-title">ДВА КОНТУРА: ОБЩЕСТВЕННЫЙ И ЛИЧНЫЙ</h1>
    <p class="slide-subtitle">Слепой ретранслятор и неприкосновенность личной информации</p>
  </div>

  <div class="slide-body dual-track-box">
    <div class="track-row public">
      <div class="track-head">
        <div class="track-title">Общественный контур</div>
        <div class="track-badge badge-blue">ОТКРЫТЫЙ ИНДЕКС</div>
      </div>
      <div class="track-flow">
        Лист → Ветка (суммирует, индексирует по темам) → Открытый районный итог.
      </div>
    </div>

    <div class="track-row private">
      <div class="track-head">
        <div class="track-title">Частный контур</div>
        <div class="track-badge badge-emerald">СКРЫТЫЙ ПОТОК</div>
      </div>
      <div class="track-flow">
        Лист ↔ Слепой ретранслятор (Ветка без ключей) ↔ Лист.
      </div>
      <div class="tree-branch-desc" style="margin-top: 6px;">
        Пример: семейный совет о совместных планах. Подсчёт строго на смартфонах.
      </div>
    </div>

    <div class="notice-banner gold">
      <strong>Принцип платформы:</strong> частное остаётся частным, общественное открыто индексируется.
    </div>
  </div>
</div>

### Текст для диктора:
> Вопросы благоустройства города требуют полной открытости, однако сокровенная жизнь семьи нуждается в надёжной защите. Архитектура проводит нерушимую границу между двумя мирами.
> 
> В общественном контуре Ветка открыто публикует суммы и каталогизирует темы района.
> 
> В частном же пространстве — будь то семейный совет о покупках или голосование дружеского круга — Ветка выступает лишь слепым ретранслятором. Не владея ключами, она просто пересылает зашифрованные пакеты, а вычисления производятся исключительно на устройствах участников. Частное остаётся неприкосновенным.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРАВОВАЯ ФИКСАЦИЯ</div>
    <h1 class="slide-title">ВРЕМЯ И ПРАВО: ПОДПИСАННЫЙ БЛОК</h1>
    <p class="slide-subtitle">Протокол отсечки, автономность и экономика узлов</p>
  </div>

  <div class="slide-body">
    <div class="pipeline-flow">
      <div class="pipeline-step">
        <div class="step-num">РЕГЛАМЕНТ</div>
        <div class="step-title">Срок собрания</div>
        <div class="step-desc">Момент окончания</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">ФИКСАЦИЯ</div>
        <div class="step-title">Блок отсечки</div>
        <div class="step-desc">Суммы на момент срока</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">СТАНДАРТ</div>
        <div class="step-title">Подпись ГОСТ</div>
        <div class="step-desc">Квалифицированная подпись</div>
      </div>
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-step">
        <div class="step-num">РЕЗУЛЬТАТ</div>
        <div class="step-title">Акт в реестр</div>
        <div class="step-desc">Юридический протокол</div>
      </div>
    </div>

    <div class="grid-2col-equal">
      <div class="highlight-box">
        <div class="box-title">Работа без связи</div>
        <div class="box-desc">
          При отсутствии сети участники соединяются напрямую через локальную радиосеть.
        </div>
      </div>

      <div class="highlight-box gold">
        <div class="box-title">Кто держит Ветки</div>
        <div class="box-desc">
          Кооперативы и товарищества жильцов. Гражданину причитается десятина (10%) рекламного бюджета.
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Чтобы волеизъявление жильцов обрело законную силу, оно должно опираться на безупречный регламент. В час завершения собрания собственников Ветка фиксирует итоговые суммы в специальном блоке отсечки.
> 
> Этот блок заверяется квалифицированной электронной подписью по государственному стандарту ГОСТ, превращаясь в юридически значимый документ для управляющих компаний и ведомств.
> 
> А если собрание проходит в цокольном помещении без мобильной сети, телефоны связываются напрямую по радиоканалу, обмениваясь голосами до выхода на поверхность.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ПРАКТИЧЕСКИЙ СЦЕНАРИЙ</div>
    <h1 class="slide-title">ПРИМЕР: ШЛАГБАУМ ВО ДВОРЕ</h1>
    <p class="slide-subtitle">Сквозной сценарий поиска согласия жильцов с расчётом</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">УСЛОВИЯ СИТУАЦИИ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">Двор у метро</div>
          <div class="tree-branch-desc">Транзитные автомобили занимают парковочные места.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Идея жильцов</div>
          <div class="tree-branch-desc">Установка шлагбаума с автоматическим распознаванием номеров.</div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="highlight-box">
        <div class="box-title">Распределение по факторам</div>
        <div class="box-desc">
          1. Доступность мест: значимость 45%, позиция +95%<br>
          2. Затраты на монтаж: значимость 35%, позиция −45%<br>
          3. Проезд спецслужб: значимость 20%, позиция −30%
        </div>
      </div>

      <div class="compromise-card" style="margin-top: 8px;">
        <strong>Компромисс:</strong> жильцы без машин освобождены от сборов; оплата из фасадной рекламы. Одобрение 88%. Условный пример.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Посмотрим, как это оживает на практике в обычном дворе возле станции метро. Чужие машины заполонили проезды. Инициативная группа предлагает поставить шлагбаум.
> 
> Простое голосование немедленно раскололо бы дом: пешеходы не желают платить за чужой комфорт, а пожилые люди тревожатся о проезде скорой помощи.
> 
> «КубГолос» разложил тревоги по полочкам: парковка получила плюс девяносто пять, но расходы дали минус сорок пять. Увидев истинную картину, совет дома освободил жителей без машин от сборов, профинансировав шлагбаум из фасадной рекламы. В итоге достигнуто согласие восьмидесяти восьми процентов соседей.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">СИСТЕМНЫЙ ВКЛАД</div>
    <h1 class="slide-title">БАЗОВЫЕ МОДУЛИ ДЛЯ ПЛАТФОРМЫ</h1>
    <p class="slide-subtitle">Что разработано в приложении и границы его ответственности</p>
  </div>

  <div class="slide-body">
    <div class="modules-grid-8">
      <div class="mod-item">
        <div class="mod-from">100 пунктов</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Оценка любых сущностей</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Счётчики эпох</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Потоковая аналитика</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Сложение сумм</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Масштабирование без искажений</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Дерево тем</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Единая каталогизация</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Подсказка дублей</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Защита от засорения</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Три режима</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Ступени доверия</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Слепой ретранслятор</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Защита частных данных</div>
      </div>
      <div class="mod-item">
        <div class="mod-from">Блок отсечки</div>
        <div class="mod-arrow">→</div>
        <div class="mod-to">Юридические протоколы</div>
      </div>
    </div>

    <div class="notice-banner gold" style="margin-top: 10px;">
      <strong>Границы роли:</strong> не ведёт единый «социальный балл» человека; не считает экономический рейтинг (компетенция Банка России); не принимает решений за людей; частные голосования не индексируются.
    </div>
  </div>
</div>

### Текст для диктора:
> Разработки «КубГолоса» служат строительными модулями для всей линейки сервисов «Турбазы». Форма со ста пунктами, потоковые счётчики и передача сумм становятся общими стандартами взаимодействия.
> 
> При этом платформа устанавливает строжайшие этические и правовые границы: система никогда не формирует единый социальный балл человека и не выносит вердиктов о личности.
> 
> Экономический рейтинг остаётся исключительной прерогативой Банка России. Платформа не решает за людей, она лишь бережно помогает им договориться между собой.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">ИТОГИ И ГОРИЗОНТ</div>
    <h1 class="slide-title">ИТОГИ И ПЕРЕХОД К «ЗАБОТЕ»</h1>
    <p class="slide-subtitle">Ключевые итоги и переход к платформе взаимной помощи</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card">
      <div class="card-pill-tag cyan">ВЫВОДЫ ПРЕЗЕНТАЦИИ</div>
      <div class="tree-struct">
        <div class="tree-node">
          <div class="tree-branch-title">1. Многофакторность</div>
          <div class="tree-branch-desc">100 пунктов на вопрос.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">2. Счётчики эпох</div>
          <div class="tree-branch-desc">Потоковый учёт в памяти.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">3. Точные суммы</div>
          <div class="tree-branch-desc">Сложение без погрешностей.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">4. Честная защита</div>
          <div class="tree-branch-desc">Многослойный барьер.</div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="highlight-box" style="border-color: var(--border-emerald); background: rgba(16, 185, 129, 0.12);">
        <div class="card-num-badge" style="background: rgba(16, 185, 129, 0.2); border-color: var(--border-emerald); color: var(--emerald-light);">СЛЕДУЮЩАЯ ЧАСТЬ</div>
        <div class="box-title">Приложение № 02: «Забота»</div>
        <div class="box-desc">
          Сеть взаимопомощи: идеи оцениваются по причинам, а дела наполняют шкалу результатов.
        </div>
      </div>

      <div class="attribution-panel" style="margin-top: 10px;">
        <strong>Архитектор:</strong> Артём Владимирович Шамсутдинов · <strong>Планирование:</strong> Claude Sonnet 5.5 · <strong>Лирическая драматургия и художественное оформление:</strong> Gemini 3.8 Flash · Концепция 1.0 (2026), «как есть» · <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/08_votecube_whitepaper.md" class="whitepaper-link" target="_blank">Белая книга № 08</a>.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Подведём итоги: многофакторная оценка заменяет споры созидательным диалогом, счётчики эпох обеспечивают высокую скорость и лёгкость, а передача сумм по дереву сохраняет честность данных.
> 
> Перед нами не просто теория, а свод продуманных архитектурных решений, открытых для калибровки и совместной работы инженеров и исследователей нашей страны.
> 
> В следующей части представлена платформа взаимной поддержки «Забота», где найденное согласие воплощается в добрые дела, наполняя шкалу результатов. Благодарим за внимание!
