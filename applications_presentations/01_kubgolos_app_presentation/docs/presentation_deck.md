---
title: "«КубГолос»: измерять и складывать"
subtitle: "Многофакторная оценка, потоковые счётчики и сложение сумм"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
author: "Артём Владимирович Шамсутдинов"
planning: "Claude Sonnet 5.5"
elaboration: "Gemini 3.8 Flash"
status: "финальная версия"
version: "1.0 (2026)"
book: "shared_docs/whitepapers/08_votecube_whitepaper.md"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ПРИКЛАДНЫЕ СЕРВИСЫ</div>
    <h1 class="slide-title">«КУБГОЛОС»: ИЗМЕРЯТЬ И СКЛАДЫВАТЬ</h1>
    <p class="slide-subtitle">Многофакторная оценка, которая считается без сбора голосов в одном месте</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 1</div>
      <div class="card-title">Форма оценки</div>
      <div class="card-desc">Сто базисных пунктов на вопрос и баланс значимости.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 2</div>
      <div class="card-title">Счётчики эпох</div>
      <div class="card-desc">Потоковая обработка в памяти Ветки без задержек.</div>
    </div>

    <div class="benefit-card">
      <div class="card-num-badge">ОСНОВА 3</div>
      <div class="card-title">Суммы вверх</div>
      <div class="card-desc">Точное сложение по дереву без ошибок усреднения.</div>
    </div>
  </div>

  <div class="attribution-bottom-bar">
    <div class="attribution-credits">
      Автор: А. В. Шамсутдинов · Планирование: Claude Sonnet 5.5 · Проработка: Gemini 3.8 Flash · Концепция 1.0 (2026)
    </div>
    <div class="attribution-spec">
      Детальная инженерная спецификация:
      <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/08_votecube_whitepaper.md" class="whitepaper-badge" target="_blank">📄 Белая книга № 08 «КубГолос» ↗</a>
    </div>
  </div>
</div>

### Текст для диктора:
> Приветствуем вас! Социологические службы и организаторы опросов выполняют большую и важную работу для общества. Приложение «КубГолос» предлагает дополнить существующие практики формой, где сами жители задают повестку дня своего дома или района.
> 
> Система опирается на три основы: оценку с ограниченным бюджетом влияния, счётчики в оперативной памяти и сложение сумм вверх по дереву.
> 
> В этой презентации показано устройство платформы и решения, которые станут общими для всех сервисов. Детальная инженерная спецификация представлена в Белой книге номер восемь.

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
          <div class="tree-branch-desc">Формулировку определяет автор, скрывая истинные причины.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Выбор «да или нет»</div>
          <div class="tree-branch-desc">Простое согласие не отражает глубину противоречий.</div>
        </div>
        <div class="tree-node">
          <div class="tree-branch-title">Усреднение итога</div>
          <div class="tree-branch-desc">Единый процент маскирует раскол мнений участников.</div>
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
            <div class="tier-desc">Устройство гражданина, надёжно хранит его личную запись.</div>
          </div>
        </div>
        <div class="tier-arrow">↑ дельты</div>
        <div class="tier-block">
          <div class="tier-icon">🌿</div>
          <div class="tier-info">
            <div class="tier-name">Ветка</div>
            <div class="tier-desc">Узел района или темы, ведёт потоковый подсчёт в памяти.</div>
          </div>
        </div>
        <div class="tier-arrow">↑ суммы</div>
        <div class="tier-block">
          <div class="tier-icon">🌳</div>
          <div class="tier-info">
            <div class="tier-name">Ствол</div>
            <div class="tier-desc">Государственный уровень, объединяет общие итоги.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Опросные службы дают ценные общественные срезы, однако привычные формы опросов имеют характерные особенности. Формулировку вопроса определяет составитель, ответы сведены к выбору вариантов, а единая итоговая цифра не показывает подлинные мотивы людей.
> 
> «КубГолос» предлагает дополнить эти методы снизу. Архитектура платформы опирается на три уровня: Лист на смартфоне надёжно хранит личную запись, Ветка района или профессионального сообщества суммирует голоса в оперативной памяти, а Ствол объединяет результаты в общегосударственном масштабе.

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
        <div class="step-desc">Бюджет влияния</div>
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
        <div class="box-desc">Три ключевые оси показывают объём мнений. Каждая ось имеет два полюса: за и против.</div>
      </div>

      <div class="highlight-box gold">
        <div class="box-title">Правило распределения</div>
        <div class="box-desc">Нельзя выставить высший балл сразу всем факторам. Участник осознанно выбирает приоритеты.</div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Вместо простого согласия участник детально оценивает идею по нескольким конкретным причинам.
> 
> На один вопрос каждому гражданину даётся ровно сто базисных пунктов влияния. Поставить высший балл сразу всем пунктам невозможно, поэтому человек осознанно выбирает самые важные аспекты.
> 
> По каждому фактору отмечается личное отношение: за или против. В итоге сообщество получает две независимые метрики: значимость фактора и направление позиции. Метафора куба наглядно отражает трёхмерный объём мнений вместо плоской шкалы.

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
> Рассмотрим условный пример: четыре гражданина оценивают проект по стоимости, срокам реализации и экологическому эффекту.
> 
> Фактор сроков имеет среднюю значимость тридцать процентов, а итоговая позиция равна нулю. Это не равнодушие, а острый спор, где мнения разделились поровну.
> 
> Если бы организаторы опирались на единый сводный показатель в тридцать процентов, глубокий конфликт вокруг сроков остался бы незамеченным. Две раздельные метрики защищают общество от ошибочных выводов.

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
> Оценка всегда привязана к контексту: конкретному двору, парковке или скверу. К ситуации прикрепляются идеи.
> 
> Если формулировка кого-то не устраивает, человек создаёт собственную версию в ветвящемся дереве предложений, а не затевает перепалку в комментариях.
> 
> Все вопросы упорядочены в дереве тем и легко находятся по первым буквам. Прежде чем открыть новое голосование, устройство проверяет районную базу и подсказывает похожие темы. Это предотвращает появление дубликатов.

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
> Голос создаётся на устройстве гражданина и подписывается его криптографическим ключом по правилу «Пиши только своё».
> 
> Если мнение изменилось, устройство формирует дельту — разницу между старой и новой позицией. Ветка вычитает прежнее значение и прибавляет свежее, исключая повторный учёт, а человеку возвращается подписанная квитанция.
> 
> Записи никогда не удаляются физически: отозванный голос получает нулевой вес. При перебоях со связью решение надёжно сохраняется на телефоне до выхода в сеть.

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
> При одновременном голосовании сотен тысяч жителей постоянная запись каждого действия на накопитель перегрузила бы серверную часть.
> 
> Поэтому Ветка накапливает суммы в оперативной памяти. В конце эпохи — одного часа для оперативных или одних суток для плановых вопросов — узел выпускает блок размером около ста пятидесяти байт со ссылкой на предыдущий.
> 
> Так образуется проверяемая хроника настроений. Годовой архив занимает всего около пятидесяти пяти килобайт. Это проектные цели, подлежащие проверке на реальных нагрузках.

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
> Поясним на условном примере: в районе Икс сто человек поддержали решение на плюс восемьдесят, а в районе Игрек девятьсот жителей — на плюс двадцать.
> 
> Среднее от средних даёт пятьдесят, искажая картину. Правильный расчёт делит общую сумму на тысячу участников, давая итог двадцать шесть.
> 
> Поэтому вверх по дереву передаются точные суммы и количество участников в компактных векторах около ста двадцати восьми байт.
> 
> Цель архитектуры — получение достоверной сводки по крупному городу за единицы секунд.

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
> Результаты отображаются тремя шкалами рядом, не подменяя друг друга.
> 
> Шкала «Народ» отражает равный голос каждого гражданина.
> 
> Шкала «Эксперты» учитывает компетенции и репутацию участников в конкретной теме, исключая самооценку.
> 
> Шкала «Результат» фиксирует реальный исход дел.
> 
> Вначале преобладают мнения. Но по мере накопления проверенных практических фактов их вес возрастает. Начальные параметры калибруются: пять подтверждённых опытов способны подтвердить гипотезу либо скорректировать оценку. Это проектные ориентиры для дальнейшей настройки.

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
> В платформе предусмотрено три режима участия: полная анонимность с подтверждением района, социальная анонимность через единый кошелёк Банка России или поручительство группы соседей, и поимённый контур.
> 
> Защита строится эшелонированно: районный ценз, ограничение до трёх новых факторов в сутки, личная подпись и сопоставление трёх шкал.
> 
> Предел открытых распределённых сетей известен: Джон Дусер доказал в две тысячи втором году невозможность полного исключения подставных участников без централизованного органа. «КубГолос» лишает накрутки экономической выгоды.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="slide-tag">РАЗГРАНИЧЕНИЕ КОНТУРОВ</div>
    <h1 class="slide-title">ДВА КОНТУРА: ОБЩЕСТВЕННЫЙ И ЛИЧНЫЙ</h1>
    <p class="slide-subtitle">Слепой ретранслятор и суверенитет персональной информации</p>
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
> Вопросы сообщества требуют прозрачности, а личные темы нуждаются в защите. Поэтому архитектура разделена на два независимых контура.
> 
> В общественном контуре Ветка открыто считает суммы и ведёт каталогизацию тем.
> 
> В частном контуре — например, при семейном голосовании — Ветка выступает лишь слепым ретранслятором. Не имея криптографических ключей, она пересылает зашифрованные пакеты, а подсчёт выполняется исключительно на устройствах участников.
> 
> Частное остаётся сугубо частным, а общественное индексируется.

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
> У общего собрания собственников жилья есть конкретный срок.
> 
> В этот момент Ветка фиксирует точные суммы в блоке отсечки и удостоверяет его квалифицированной цифровой подписью по стандарту ГОСТ. Так формируется официальный протокол для внешних государственных систем.
> 
> Если связь отсутствует, например во время схода в цокольном этаже, устройства соединяются напрямую по локальной радиосети.
> 
> Узлы Ветки поддерживают кооперативы и товарищества жильцов. При проведении коммерческих опросов гражданину причитается десятина рекламного бюджета.

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
> Разберём реальную ситуацию на условном примере: двор около метро перегружен транзитными автомобилями. Жители обсуждают установку шлагбаума.
> 
> Многофакторная оценка показала: освобождение мест критически важно для сорока пяти процентов жильцов с позицией плюс девяносто пять. Но затраты вызвали протест тех, у кого нет машин, а скорая помощь вызвала опасения.
> 
> Обычное голосование «да или нет» привело бы к раздору. Совет дома выработал компромисс: освободить жильцов без автомобилей от взносов. В этом условном примере проект одобрили восемьдесят восемь процентов.

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
> Инженерные решения «КубГолоса» формируют фундамент платформы.
> 
> Форма оценки со ста пунктами становится универсальным модулем для сравнения любых предложений. Счётчики эпох ложатся в основу потоковой аналитики, а сложение сумм обеспечивает масштабирование без искажений.
> 
> Чётко определены границы роли сервиса: платформа категорически не ведёт единый социальный балл человека. Экономический рейтинг остаётся вне её рамок и относится к ведению Банка России. Система не принимает решений за людей, а частные голосования никогда не индексируются.

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
        <strong>Архитектор:</strong> Артём Владимирович Шамсутдинов · <strong>Планирование:</strong> Claude Sonnet 5.5 · <strong>Проработка:</strong> Gemini 3.8 Flash · Концепция 1.0 (2026), «как есть» · <a href="../../../../../viewer.html?doc=shared_docs/whitepapers/08_votecube_whitepaper.md" class="whitepaper-link" target="_blank">Белая книга № 08</a>.
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Подведём итоги: многофакторная оценка даёт объёмную картину мнений, счётчики эпох обеспечивают производительность, а суммы по дереву защищают целостность данных.
> 
> Представленный материал является сводом проектных идей, а измерения на реальных нагрузках ещё предстоят. Приглашаем инженеров, социологов и исследователей к совместной проверке и калибровке параметров.
> 
> В следующей презентации представлена платформа взаимной помощи «Забота», где идеи оцениваются по причинам, а практические дела наполняют шкалу результатов. Спасибо за внимание!
