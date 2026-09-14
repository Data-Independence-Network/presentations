---
presentation_id: "03_sovereign_economy_presentation"
title: "Платформа «Турбаза»"
subtitle: "Суверенная экономика данных и смарт-контрактов: Двухконтурная модель Турбазы, FSM O(1) и Цифровой рубль ЦБ РФ"
header_title: "ТУРБАЗА"
header_subtitle: "Суверенная экономика и смарт-контракты"
theme: "platform_overview"
total_slides: 15
voice: "ru-RU-DmitryNeural"
pitch: "-5Hz"
rate: "-9%"
---

<!-- slide: 1 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ЭКСПЛЕЙНЕР &middot; ЧАСТЬ 3 ИЗ 3</div>
    <h1 class="slide-title">СУВЕРЕННАЯ ЭКОНОМИКА ДАННЫХ И СМАРТ-КОНТРАКТОВ</h1>
    <p class="slide-subtitle">Двухконтурная модель «Турбазы» и будущей системы смарт-контрактов Банка России: детерминированные автоматы FSM O(1) и Zero-PII</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout teal">
        <strong>Двухконтурный экономический двигатель:</strong>
        <p>«Турбаза» соединяет национальную платежную систему с суверенным распределенным интернетом данных. <strong>Расчетное ядро ЦБ освобождается от чужого кода и чеков</strong>, сводясь к конечному автомату O(1), а вся бизнес-логика и тайна жизни граждан исполняются на их устройствах.</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">🏛️</div>
          <h4>FSM-ядро Цифрового рубля</h4>
          <p>Сложность O(1) за такт расчетов, 0% комиссий за газ и абсолютная защита ядра от сбоев.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">📱</div>
          <h4>Внешний контур на Листьях</h4>
          <p>Микро-цепи на телефонах: Zero-PII приватность, чеки не покидают семью, ГОСТ-подписи.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">⚖️</div>
          <h4>Сплитование роялти share(...)</h4>
          <p>Справедливое распределение микроплатежей между создателями софта и гражданами за внимание.</p>
        </div>
        <div class="feature-card">
          <div class="card-icon">🛡️</div>
          <h4>Защита кошельков (Wrappers)</h4>
          <p>Контрактные оболочки скрывают счета, а сменяемые сессионные прокси защищают при краже телефона.</p>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="kpi-vertical-stack">
        <div class="kpi-card-explainer">
          <div class="kpi-num golden">O(1)</div>
          <div class="kpi-label">Математическая сложность клиринга ядра FSM для Банка России</div>
        </div>
        <div class="kpi-card-explainer">
          <div class="kpi-num teal">0%</div>
          <div class="kpi-label">Комиссий монополий, расходов на эквайринг и покупки POS-терминалов</div>
        </div>
        <div class="kpi-card-explainer">
          <div class="kpi-num emerald">100%</div>
          <div class="kpi-label">Формальная верификация инвариантов баланса без кризиса Bug Bounty</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Здравствуйте! В заключительной части генерального обзора платформы «Турбаза» мы покажем, как устроена справедливая суверенная экономика данных и смарт-контрактов.
>
> Для полноценного функционирования «Турбазы» необходима государственная расчетная система — и мы связываем её с будущей национальной платформой смарт-контрактов Банка России. В этой презентации мы представляем версию архитектуры будущих смарт-контрактов, которая описана в нашей белой бумаге для Банка России: контракт в платежном ядре должен быть не тяжелой программой общего назначения, а сверхнадежным детерминированным конечным автоматом над цифровыми кошельками.
>
> Вся богатая жизненная логика, товарные номенклатуры и персональные данные выносятся во внешний контур «Турбазы» — на аппараты самих пользователей.
>
> Сегодня мы на реальных примерах разберем работу этой двухконтурной архитектуры: покажем оплату школьного питания, безопасную доставку без терминалов и справедливые выплаты создателям программ.

---

<!-- slide: 2 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | АРХИТЕКТУРНЫЙ ВЫЗОВ</div>
    <h2 class="slide-title">ТУПИК МОНОПОЛИЙ WEB2 И ЛОВУШКА EVM</h2>
    <p class="slide-subtitle">Почему закрытые маркетплейсы душат бизнес, а Тьюринг-полные блокчейны неприменимы для государства</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="glass-card danger-accent" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag red">ТУПИК WEB2: МОНОПОЛИИ</div>
        <h3 class="card-title">Налог 30% и слежка</h3>
        <p class="card-desc">Корпоративные маркетплейсы и сторы превратились в монопольных посредников.</p>
        <ul class="card-bullets">
          <li><strong>Комиссия 30%:</strong> изъятие маржи у малого бизнеса и вывод ренты за рубеж</li>
          <li><strong>Утечки личных данных:</strong> детальные корзины покупок продаются на черном рынке</li>
          <li><strong>Бесплатный Open Source:</strong> авторы полезных библиотек не получают ни рубля</li>
        </ul>
        <div class="flow-step-row" style="border-left-color: #ff5252; margin-top: 10px;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span><strong>Захват клиентской базы:</strong> отключение прямых контактов</span>
        </div>
      </div>
      <div class="kpi-chip-footer" style="color: #ff5252; border-color: rgba(255, 82, 82, 0.3); background: rgba(255, 82, 82, 0.08); padding: 8px 12px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
        🚨 30% КОМИССИЯ · УТЕЧКИ 152-ФЗ
      </div>
    </div>

    <div class="glass-card danger-accent" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag red">ТУПИК WEB3: EVM / WASM</div>
        <h3 class="card-title">Ловушка Тьюринг-полноты</h3>
        <p class="card-desc">Попытка запуска чужого императивного кода в платежном ядре порождает кризис.</p>
        <ul class="card-bullets">
          <li><strong>Проблема остановки:</strong> бесконечные циклы, сбои Out-of-Gas и аукционы комиссий</li>
          <li><strong>Уязвимости Re-entrancy:</strong> кражи сотен миллионов долларов (The DAO, кросс-чейн мосты)</li>
          <li><strong>Перегрузка ЦОД:</strong> расчетное ядро не способно гарантировать SLA 161-ФЗ</li>
        </ul>
        <div class="flow-step-row" style="border-left-color: #ff5252; margin-top: 10px;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span><strong>Недетерминированность:</strong> непредсказуемый газ и дедлоки</span>
        </div>
      </div>
      <div class="kpi-chip-footer" style="color: #ff5252; border-color: rgba(255, 82, 82, 0.3); background: rgba(255, 82, 82, 0.08); padding: 8px 12px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
        ⚡ КРАХ АУДИТОВ · $3.8B ВЗЛОМОВ
      </div>
    </div>

    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag teal">РЕШЕНИЕ: ТУРБАЗА + ЦБ РФ</div>
        <h3 class="card-title">Детерминизм и Zero-PII</h3>
        <p class="card-desc">Разделение ответственности исключает риски обоих миров.</p>
        <ul class="card-bullets">
          <li><strong>Ядро O(1):</strong> только математические расчеты между кошельками без газа</li>
          <li><strong>Турбаза на Листьях:</strong> бизнес-логика исполняется на телефонах участников</li>
          <li><strong>Справедливое роялти:</strong> алгоритмический сплит дохода между авторами софта</li>
        </ul>
        <div class="flow-step-row teal" style="margin-top: 10px;">
          <span class="flow-step-num teal">✓</span>
          <span><strong>Чистый клиринг:</strong> мгновенные расчеты в ОЗУ за 1 такт</span>
        </div>
      </div>
      <div class="kpi-chip-footer" style="color: #1de9b6; border-color: rgba(29, 233, 182, 0.3); background: rgba(29, 233, 182, 0.08); padding: 8px 12px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
        🛡️ СЛОЖНОСТЬ O(1) · 0 ₽ ГАЗ · ZERO-PII
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Современная экономика оказалась зажата между двумя архитектурными тупиками.
>
> С одной стороны — закрытые монополии Web 2.0. Они взимают до тридцати процентов комиссии, навязывают свои правила и накапливают терабайты персональных данных, превращая граждан в объект слежки.
>
> С другой стороны — традиционные блокчейны с Тьюринг-полными виртуальными машинами, вроде EVM. Они пытаются исполнять сложный императивный код прямо в платежном реестре. Это порождает непредсказуемое время расчетов, большие комиссии за газ и постоянные взломы из-за логических дедлоков.
>
> Государственная платежная система не должна повторять эти ошибки. Решение «Турбазы» — свести ядро расчетов к детерминированному автомату, а прикладную сложность вынести наружу.

---

<!-- slide: 3 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ДВУХКОНТУРНАЯ МОДЕЛЬ</div>
    <h2 class="slide-title">РАЗДЕЛЕНИЕ НА РАСЧЕТНЫЙ И ИНФОРМАЦИОННЫЙ КОНТУРЫ</h2>
    <p class="slide-subtitle">Внутренний расчетный контур для Цифрового рубля ЦБ РФ и внешний контур данных «Турбазы» на аппаратах участников</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="circuit-card-header" style="color: #ffd600;">
          <span>🏛️ ВНУТРЕННИЙ РАСЧЕТНЫЙ КОНТУР (МОДЕЛЬ ДЛЯ ПКСК / ЦБ РФ)</span>
        </div>
        <p class="card-desc">Государственный детерминированный конечный автомат (FSM) O(1) над цифровыми кошельками.</p>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">01</span>
          <span><strong>Только балансы и кошельки:</strong> ядро производит списания по универсальным формулам</span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">02</span>
          <span><strong>Zero-PII чистота:</strong> ядро не хранит товарных чеков, составов корзин и личной переписки</span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">03</span>
          <span><strong>Гарантированный SLA (161-ФЗ):</strong> мгновенный безотзывный клиринг без риска зависания</span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">04</span>
          <span><strong>Детерминизм переходов:</strong> состояние меняется за 1 такт в ОЗУ без очередей транзакций</span>
        </div>
      </div>

      <div class="fsm-terminal-card gold-border" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span class="gold-title">⚡ FSM CLEARING SPEC · МОДЕЛЬ ДЛЯ ПКСК ЦБ РФ</span>
          <div class="fsm-terminal-controls"><span class="fsm-terminal-dot yellow"></span><span class="fsm-terminal-dot green"></span></div>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">MACHINE:</span> M = ⟨Q, Σ, Δ, δ, λ, q₀, F⟩<br/>
          <span class="fsm-kw">REGISTRY:</span> Q = {Wallet_ID, Balance, Nonce}<br/>
          <span class="fsm-kw">TRANSITIONS:</span> δ(q, σ) → q' <span class="fsm-comment">/* O(1) Complexity, 0% Gas, Formal Proof */</span><br/>
          <span class="fsm-kw">DETERMINISM:</span> Guaranteed Halting · Pure Transition Table · 0 VM Overhead
        </div>
      </div>
    </div>

    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="circuit-card-header" style="color: #1de9b6;">
          <span>📱 ВНЕШНИЙ ИНФОРМАЦИОННЫЙ КОНТУР («ТУРБАЗА»)</span>
        </div>
        <p class="card-desc">Суверенная распределенная среда реляционных хранилищ на аппаратах участников («Лист»).</p>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">01</span>
          <span><strong>Микро-цепи изменений:</strong> полная история заказов и чеков живет на устройствах сторон</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">02</span>
          <span><strong>Смысловая логика:</strong> приложения связывают жизненные события и вызывают функции FSM</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">03</span>
          <span><strong>Вектор ГОСТ-подписей:</strong> в ядро ЦБ передается лишь доказательство выполнения условий</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">04</span>
          <span><strong>Крипто-доказательство:</strong> смарт-контракт получает пруф без раскрытия коммерческой тайны</span>
        </div>
      </div>

      <div class="fsm-terminal-card" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span>📱 LEAF STORAGE CONTOUR · ТУРБАЗА EDGE</span>
          <div class="fsm-terminal-controls"><span class="fsm-terminal-dot yellow"></span><span class="fsm-terminal-dot green"></span></div>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">STORAGE:</span> Local SQLite Micro-Chain (Zero-PII)<br/>
          <span class="fsm-kw">CONSENSUS:</span> Vector ГОСТ Р 34.10-2012 Signatures<br/>
          <span class="fsm-kw">PAYLOAD:</span> Proves State Transition without Revealing Receipt<br/>
          <span class="fsm-kw">ENCRYPTION:</span> On-Device Data Vault · ГОСТ Р 34.12-2018 (Кузнечик)
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> В основе архитектуры лежит строгое разделение ответственности на два независимых контура.
>
> Первый — внутренний расчетный контур, предложенный в нашей концепции для Банка России. Это детерминированный конечный автомат Мили над кошельками Цифрового рубля. Он оперирует исключительно балансами, моментально производя списания по математическим формулам. В нем нет персональных данных и тяжелого кода.
>
> Второй — внешний информационный контур платформы «Турбаза». Он развернут на смартфонах и серверах участников. Здесь, в локальных реляционных микро-цепях, хранится весь жизненный контекст сделки: от перечня блюд до статусов доставки.
>
> В ядро Банка России поступает лишь компактный вектор криптографических подписей по шестьдесят третьему закону, что гарантирует абсолютную масштабируемость.

---

<!-- slide: 4 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МАТЕМАТИЧЕСКИЙ АППАРАТ</div>
    <h2 class="slide-title">СМАРТ-КОНТРАКТ: ДЕТЕРМИНИРОВАННЫЙ FSM O(1)</h2>
    <p class="slide-subtitle">Кошельки как переменные автомата Мили и библиотека универсальных шаблонов математических функций</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout teal">
        <strong>Формализация автомата Мили:</strong>
        <p>Смарт-контракт в ядре задается кортежем <code>M = &lang;Q, &Sigma;, &Delta;, &delta;, &lambda;, q0, F&rang;</code>, где <strong>переменные Q &mdash; цифровые кошельки</strong>, &Sigma; &mdash; ГОСТ-подписи из Турбазы, а переходы &delta; &mdash; универсальные функции.</p>
      </div>

      <div class="fsm-primitive-grid">
        <div class="fsm-primitive-item">
          <code>onceIn(t, cond)</code>
          <p>Квантование операций по TrueTime</p>
        </div>
        <div class="fsm-primitive-item">
          <code>lte(a, b) / gte</code>
          <p>Проверка числовых лимитов</p>
        </div>
        <div class="fsm-primitive-item">
          <code>or(a, b) / and</code>
          <p>Логические условия и списки</p>
        </div>
        <div class="fsm-primitive-item">
          <code>set(amount, acc)</code>
          <p>Инициализация эскроу-баланса</p>
        </div>
        <div class="fsm-primitive-item">
          <code>add(amount, a, b)</code>
          <p>Накопительное сложение</p>
        </div>
        <div class="fsm-primitive-item">
          <code>share(r1, a1, ...)</code>
          <p>Сплитование по Вектору Шепли</p>
        </div>
      </div>

      <div class="fsm-state-pipeline" style="margin-top: 10px;">
        <div class="fsm-state-row teal">
          <span class="fsm-state-badge">[TICK_01]</span>
          <span class="fsm-state-desc"><code>q_curr = RAM_GET(hash, wallet_id)</code>: чтение состояния из хэш-таблицы ОЗУ</span>
        </div>
        <div class="fsm-state-row teal">
          <span class="fsm-state-badge">[TICK_02]</span>
          <span class="fsm-state-desc"><code>q_next = &delta;(q_curr, &Sigma;_gost)</code>: чистый функциональный переход автомата O(1)</span>
        </div>
        <div class="fsm-state-row teal">
          <span class="fsm-state-badge">[TICK_03]</span>
          <span class="fsm-state-desc"><code>ATOMIC_LEDGER_WRITE(q_next)</code>: атомарная запись балансов без блокировок</span>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-emerald" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag emerald">ИНВАРИАНТЫ НАДЕЖНОСТИ FSM</div>
          <h3 class="card-title">Математические гарантии</h3>
          <ul class="card-bullets">
            <li><strong>Предсказуемость логики:</strong> сборка из проверенных шаблонов исключает побочные эффекты и дедлоки</li>
            <li><strong>Балансовый инвариант:</strong> сумма активов на входе строго равна сумме на выходе (&sum; In &equiv; &sum; Out)</li>
            <li><strong>Гарантия возврата:</strong> автоматический возврат средств по таймауту при отсутствии ответа контрагента</li>
            <li><strong>Мгновенный расчет:</strong> сложность O(1) в оперативной памяти ядра без очередей и комиссий за газ</li>
          </ul>
        </div>

        <div>
          <div class="fsm-terminal-card emerald-border" style="margin-top: 10px;">
            <div class="fsm-terminal-header">
              <span class="emerald-title">🛡️ SMT FORMAL VERIFICATION INVARIANTS</span>
              <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
            </div>
            <div class="fsm-terminal-body">
              <span class="fsm-kw">THEOREM 1 (CONSERVATION):</span> &forall;s &isin; S: &sum; In(s) &equiv; &sum; Out(s) [PROVED]<br/>
              <span class="fsm-kw">THEOREM 2 (DEADLOCK-FREE):</span> &forall;q &isin; Q &exist;t: &delta;(q, t) &isin; F_valid [PROVED]<br/>
              <span class="fsm-kw">COMPLEXITY:</span> O(1) Time &middot; O(1) RAM &middot; 0 Gas &middot; No Halting Trap
            </div>
          </div>
          <div class="kpi-chip-footer" style="color: #00e676; border-color: rgba(0, 230, 118, 0.3); background: rgba(0, 230, 118, 0.08); padding: 8px 14px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono); margin-top: 8px;">
            ✓ 100% ФОРМАЛЬНО ДОКАЗАННАЯ НАДЕЖНОСТЬ В Z3 / TLA+
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Что же такое смарт-контракт в суверенной парадигме? Это детерминированный конечный автомат над цифровыми кошельками.
>
> В расчетном ядре нет сложного произвольного кода. Вместо этого контракт собирается, как конструктор, всего из нескольких стандартных математических операций.
>
> Это базовые правила: проверка времени расчетов, контроль лимитов сумм, условия «и» или «или», блокировка средств на эскроу-счете и автоматическое разделение платежа между участниками.
>
> Из таких простых блоков невозможно собрать ошибочную программу: система математически гарантирует сохранение баланса и исключает зависание денег. А сам расчет выполняется мгновенно, за один такт в оперативной памяти — абсолютно без задержек и комиссий за газ.

---

<!-- slide: 5 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СИСТЕМНАЯ ОПТИМИЗАЦИЯ</div>
    <h2 class="slide-title">КРИПТОГРАФИЧЕСКИЙ SINGLETON: 0 ₽ ЗА ДЕПЛОЙ</h2>
    <p class="slide-subtitle">Исполнение единого экземпляра автомата в ОЗУ ядра по криптографическому хэшу формулы</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card danger-accent" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag red">ТРАДИЦИОННЫЙ БЛОКЧЕЙН (EVM)</div>
        <h3 class="card-title">Дублирование байт-кода</h3>
        <p class="card-desc">Каждый пользователь развертывает отдельный экземпляр программы в блокчейн.</p>
        <div class="flow-step-row" style="border-left-color: #ff5252;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span>Плата за деплой каждого контракта (сотни рублей газа)</span>
        </div>
        <div class="flow-step-row" style="border-left-color: #ff5252;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span>Колоссальное раздувание состояния базы данных (State Bloat)</span>
        </div>
        <div class="flow-step-row" style="border-left-color: #ff5252;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span>Уязвимость перед DoS-атаками через запуск тяжелых скриптов</span>
        </div>
        <div class="flow-step-row" style="border-left-color: #ff5252;">
          <span class="flow-step-num" style="color: #ff5252;">&times;</span>
          <span>Газовый аукцион: непредсказуемый рост комиссий при нагрузке</span>
        </div>
      </div>

      <div class="fsm-terminal-card" style="border-color: rgba(244, 63, 94, 0.45); margin-top: auto;">
        <div class="fsm-terminal-header" style="color: #fda4af;">
          <span>⚠️ EVM STATE BLOAT &amp; GAS TRAP</span>
          <span class="fsm-terminal-dot red"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">DEPLOY_FEE:</span> 32 000 + 200 × Bytecode_Len (Gas)<br/>
          <span class="fsm-kw">STORAGE_BLOAT:</span> N_users × Copy(EVM_State) → > 1.4 TB<br/>
          <span class="fsm-kw">OUTCOME:</span> Деградация нод, скачки комиссий, отказ сети<br/>
          <span class="fsm-kw">FAILURE_RISK:</span> Невозможность гарантировать SLA 161-ФЗ при пиках
        </div>
      </div>
    </div>

    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag teal">АРХИТЕКТУРА ТУРБАЗЫ: SINGLETON В ОЗУ</div>
        <h3 class="card-title">Кэширование по хэшу H(Template)</h3>
        <p class="card-desc">Один экземпляр автомата обслуживает миллионы однотипных контрактов.</p>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">01</span>
          <span><strong>Нулевая стоимость:</strong> деплой контракта стоит 0 ₽, формула компилируется один раз</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">02</span>
          <span><strong>Чистые переменные:</strong> в памяти хранятся только векторы кошельков и лимитов</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">03</span>
          <span><strong>Мгновенный отклик:</strong> выполнение в регистрах процессора за наносекунды</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">04</span>
          <span><strong>Масштабируемость:</strong> миллионы граждан вызывают один проверенный шаблон</span>
        </div>
      </div>

      <div class="fsm-terminal-card" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span>🚀 SINGLETON RAM PIPELINE · 0 ₽ DEPLOY</span>
          <span class="fsm-terminal-dot green"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">HASH:</span> SHA256(onceIn || lte || share) → RAM: 0x7FA0012<br/>
          <span class="fsm-kw">REGISTRY:</span> 1 экземпляр автомата на 10 000 000 контрактов<br/>
          <span class="fsm-kw">EXECUTION:</span> L1/L2 кэш CPU ядра расчетов · 0 наносекунд<br/>
          <span class="fsm-kw">EFFICIENCY:</span> 99.8% экономия памяти ЦОД · Защита от DoS на уровне ядра
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Колоссальная проблема существующих блокчейнов — так называемое раздувание состояния. Каждый раз, когда создается смарт-контракт, сеть вынуждена компилировать и хранить отдельную копию байт-кода, требуя за это плату за деплой.
>
> В «Турбазе» применен криптографический Singleton. При создании контракта ядро вычисляет хэш его математической формулы.
>
> Если миллион родителей создают одинаковый контракт на школьное питание или тысячи магазинов запускают доставку, в оперативной памяти серверов исполняется один-единственный экземпляр конечного автомата.
>
> Различаются только номера кошельков и суммы лимитов. Затраты на развертывание равны нулю, а скорость исполнения максимальна.

---

<!-- slide: 6 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СЦЕНАРИЙ 01: ШКОЛЬНОЕ ПИТАНИЕ</div>
    <h2 class="slide-title">ЦЕЛЕВЫЕ СОЦИАЛЬНЫЕ ВЫПЛАТЫ БЕЗ СЛЕЖКИ</h2>
    <p class="slide-subtitle">Родительский контроль расходов, тайна личной жизни по 152-ФЗ и осознанный IOU-офлайн</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="fsm-terminal-card gold-border">
        <div class="fsm-terminal-header">
          <span class="gold-title">📜 FSM FORMULA · 0xFA01_SCHOOL_MEALS</span>
          <div class="fsm-terminal-controls"><span class="fsm-terminal-dot yellow"></span><span class="fsm-terminal-dot green"></span></div>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-fn">onceIn</span>(<span class="fsm-val">86400</span>, <span class="fsm-fn">lte</span>(<span class="fsm-val">300</span>, <span class="fsm-fn">or</span>(<span class="fsm-var">MEAL_A</span>, <span class="fsm-var">MEAL_B</span>)))
          <span class="fsm-meta">Параметры: Суточный лимит 300 ₽ | Категории: Завтрак / Обед | Zero-PII</span>
        </div>
      </div>

      <div class="flow-step-row teal">
        <span class="flow-step-num teal">1</span>
        <span><strong>Родительский контроль:</strong> родитель задает лимит 300 ₽ и делегирует сессионный ключ</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">2</span>
        <span><strong>Выбор в столовой:</strong> школьник берет обед на 280 ₽ и сканирует QR кассы (правило Б)</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">3</span>
        <span><strong>Валидация предикатов:</strong> телефон проверяет 280 ≤ 300 ₽ и направляет переход в ЦБ</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">4</span>
        <span><strong>Мгновенный клиринг:</strong> Банк России зачисляет 280 ₽ столовой за O(1) такт без комиссии</span>
      </div>

      <div class="fsm-state-pipeline">
        <div class="fsm-state-row gold">
          <span class="fsm-state-badge">[S0_READY]</span>
          <span class="fsm-state-desc">Суточный лимит активирован; ключ ребенка авторизован</span>
        </div>
        <div class="fsm-state-row gold">
          <span class="fsm-state-badge">[S1_VERIFY]</span>
          <span class="fsm-state-desc">Локальная проверка: <strong>280 ≤ 300 ₽ ∧ onceIn(86400) ≡ TRUE</strong></span>
        </div>
        <div class="fsm-state-row gold">
          <span class="fsm-state-badge">[S2_SETTLED]</span>
          <span class="fsm-state-desc">Списание 280 ₽ в ЦБ; остаток 20 ₽ сгорает в 23:59 (Zero-Siphon)</span>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag gold">КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА СХЕМЫ</div>
          <h3 class="card-title">Гарантии для Семьи и Школы</h3>
          <ul class="card-bullets">
            <li><strong>Zero-PII конфиденциальность:</strong> банк и регулятор видят только перевод по коду Б. Состав блюд и калории остаются строго в микро-цепи семьи и школы</li>
            <li><strong>Казначейский надзор:</strong> лимит резервирует право расхода субсидии; в 23:59 неиспользованный остаток обнуляется, исключая нецелевой вывод</li>
            <li><strong>Бестерминальность кассы:</strong> столовой не нужен терминал эквайринга &mdash; расчет идет через браузерное приложение Турбазы</li>
            <li><strong>Осознанный IOU-офлайн:</strong> при сбое связи стороны дают согласие на долговую расписку; локальный FSM кассы валидирует лимит по кэшу</li>
          </ul>
        </div>

        <div class="fsm-terminal-card gold-border" style="margin-top: 10px; margin-bottom: 10px;">
          <div class="fsm-terminal-header">
            <span class="gold-title">🛡️ LEAF EDGE PROTOCOL · АНАТОМИЯ ЛИСТА</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">VAULT_CIPHER:</span> ГОСТ Р 34.12-2018 («Кузнечик» / локально)<br/>
            <span class="fsm-kw">ZERO_PII:</span> Маскирование ФИО, меню и аллергических профилей<br/>
            <span class="fsm-kw">CLEARING:</span> Атомарное закрытие чека в реестре комбината питания
          </div>
        </div>

        <div class="kpi-chip-footer" style="color: #ffd600; border-color: rgba(250, 204, 21, 0.3); background: rgba(250, 204, 21, 0.08); padding: 10px 16px; border-radius: 8px; font-size: 20px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
          ⚡ СЛОЖНОСТЬ КЛИРИНГА: O(1) · ЭКВАЙРИНГ: 0% · ПРИВАТНОСТЬ: ZERO-PII
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Рассмотрим первый практический сценарий: целевые социальные выплаты на школьное питание.
>
> Родитель формирует простой смарт-контракт: тратить не более трехсот рублей, не чаще одного раза в сутки, и только на завтрак или обед.
>
> Школьник в столовой сканирует динамический QR-код на кассе. Смартфон проверяет сумму, формирует переход автомата и направляет его в расчетное ядро. Банк списывает двести восемьдесят рублей на счет школы ровно за один шаг.
>
> При этом банк и регулятор видят лишь код целевого назначения. А полный перечень блюд и калорийность остаются в закрытой микро-цепи семьи и школы.
>
> А если пропал интернет, касса автономно принимает платеж в виде долговой расписки, опираясь на закэшированную копию формулы.

---

<!-- slide: 7 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СЦЕНАРИЙ 02: БЕЗОПАСНАЯ СДЕЛКА</div>
    <h2 class="slide-title">B2B/B2C СДЕЛКА ДЛЯ МСП БЕЗ ТЕРМИНАЛОВ</h2>
    <p class="slide-subtitle">Синхронизация заказа через микро-цепь, P2P Proof-of-Delivery и мгновенный эскроу-клиринг</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="fsm-terminal-card emerald-border">
        <div class="fsm-terminal-header">
          <span class="emerald-title">📜 FSM ESCROW · 0xFB02_TRIPARTITE_ESCROW</span>
          <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-var">sum</span> = <span class="fsm-fn">set</span>(<span class="fsm-val">400</span>, <span class="fsm-var">RESTAURANT</span>); <span class="fsm-fn">add</span>(<span class="fsm-val">100</span>, <span class="fsm-var">COURIER</span>, <span class="fsm-var">sum</span>)
          <span class="fsm-meta">Эскроу: 500 ₽ | Ресторан 400 ₽ | Курьер 100 ₽ | Таймаут: 90 мин</span>
        </div>
      </div>

      <div class="flow-step-row gold">
        <span class="flow-step-num gold">1</span>
        <span><strong>Синхронизация P2P:</strong> микро-цепь связывает смартфоны покупателя, повара и курьера</span>
      </div>
      <div class="flow-step-row gold">
        <span class="flow-step-num gold">2</span>
        <span><strong>Подпись ресторана:</strong> повар маркирует [Приготовлено] ГОСТ-подписью (400 ₽)</span>
      </div>
      <div class="flow-step-row gold">
        <span class="flow-step-num gold">3</span>
        <span><strong>Приемка курьером:</strong> курьер сканирует QR пакета и начинает доставку [В пути]</span>
      </div>
      <div class="flow-step-row gold">
        <span class="flow-step-num gold">4</span>
        <span><strong>Вручение клиенту:</strong> покупатель жмет [Доставлено]: авто-сплит 400 + 100 ₽</span>
      </div>

      <div class="fsm-state-pipeline">
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[S0_LOCKED]</span>
          <span class="fsm-state-desc">500 ₽ заблокированы в эскроу ЦБ; P2P-заказ синхронизирован</span>
        </div>
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[S1_TRANSIT]</span>
          <span class="fsm-state-desc">Подпись готовности ресторана ⊕ скан курьера активируют статус [В пути]</span>
        </div>
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[S2_CLEARED]</span>
          <span class="fsm-state-desc">Proof-of-Delivery клиента $\to$ мгновенная выплата 400 ₽ ресторану и 100 ₽ курьеру</span>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-emerald" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag emerald">ПРЕИМУЩЕСТВА ДЛЯ МАЛОГО БИЗНЕСА</div>
          <h3 class="card-title">Автономная логистика и эскроу</h3>
          <ul class="card-bullets">
            <li><strong>Аппаратная бестерминальность:</strong> ресторану, курьеру и клиенту не нужны банковские POS-терминалы &mdash; все работает в защищенном браузере Турбазы</li>
            <li><strong>0% комиссий маркетплейсов:</strong> ресторатор не отдает 30% агрегатору, сохраняя полную прибыль</li>
            <li><strong>P2P Proof-of-Delivery:</strong> вектор взаимных подписей сторон служит неопровержимым доказательством выполнения обязательств</li>
            <li><strong>Защита от дедлоков:</strong> при срыве срока доставки детерминированный таймаут FSM автоматически возвращает 500 ₽ покупателю</li>
          </ul>
        </div>

        <div class="fsm-terminal-card emerald-border" style="margin-top: 10px; margin-bottom: 10px;">
          <div class="fsm-terminal-header">
            <span class="emerald-title">🔐 TRIPARTITE ESCROW PROTOCOL</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">BUYER_ESCROW:</span> Блокировка суммы в Цифровых рублях ЦБ РФ<br/>
            <span class="fsm-kw">NFC_HANDOVER:</span> P2P обмен подписанными хэшами «Курьер ↔ Клиент»<br/>
            <span class="fsm-kw">SETTLEMENT:</span> Мгновенное разблокирование средств ресторану за 1 такт
          </div>
        </div>

        <div class="kpi-chip-footer" style="color: #6ee7b7; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.08); padding: 10px 16px; border-radius: 8px; font-size: 20px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
          ⚡ ЭСКРОУ-КЛИРИНГ: O(1) · КОМИССИЯ АГРЕГАТОРА: 0% · POS-ОБОРУДОВАНИЕ: 0 ₽
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Второй сценарий — безопасная доставка еды из ресторана. Это классическая сделка между тремя сторонами: покупателем, ресторатором и курьером.
>
> Заказ создается в микро-цепи на телефоне покупателя и мгновенно синхронизируется с планшетом шеф-повара и смартфоном курьера через районный узел «Ветка».
>
> Покупатель резервирует пятьсот рублей в смарт-эскроу. Повар маркирует блюдо как приготовленное, курьер сканирует код при получении, а покупатель подтверждает доставку у двери.
>
> Вектор взаимных подписей отправляется в ядро Цифрового рубля, которое моментально выплачивает четыреста рублей ресторану и сто рублей курьеру.
>
> Никому не нужны POS-терминалы и дорогой эквайринг, а ресторан экономит тридцать процентов комиссии, которую раньше забирал агрегатор.

---

<!-- slide: 8 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СЦЕНАРИЙ 03: ЭКОНОМИКА СОФТА</div>
    <h2 class="slide-title">РЕКУРСИВНЫЕ РОЯЛТИ ЧЕРЕЗ SHARE(...)</h2>
    <p class="slide-subtitle">Справедливое сплитование микроплатежей по Вектору Шепли между авторами софта и пользователем</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="fsm-terminal-card emerald-border">
        <div class="fsm-terminal-header">
          <span class="emerald-title">📜 FSM RECURSIVE SHAPLEY ROYALTIES</span>
          <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-var">C</span> = <span class="fsm-fn">share</span>(<span class="fsm-val">0.50</span>, <span class="fsm-var">DEV_B</span>, <span class="fsm-val">0.50</span>, <span class="fsm-var">DEV_A</span>)<br/>
          <span class="fsm-var">E</span> = <span class="fsm-fn">share</span>(<span class="fsm-val">0.20</span>, <span class="fsm-var">UI_D</span>, <span class="fsm-val">0.60</span>, <span class="fsm-var">C</span>, <span class="fsm-val">0.20</span>, <span class="fsm-var">SCHEMA_G</span>)<br/>
          <span class="fsm-fn">share</span>(<span class="fsm-val">0.10</span>, <span class="fsm-var">USER_CITIZEN</span>, <span class="fsm-val">0.90</span>, <span class="fsm-var">E</span>)
          <span class="fsm-meta">Шепли-сплит: Гражданин 10% | UI 18% | Логика по 27% | Схема данных 18%</span>
        </div>
      </div>

      <div class="flow-step-row teal">
        <span class="flow-step-num teal">1</span>
        <span><strong>Кооперация софта:</strong> программы на Турбазе совместно используют открытые модули</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">2</span>
        <span><strong>Вклад авторов:</strong> разработчики заранее фиксируют справедливые доли в share(...)</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">3</span>
        <span><strong>Схлопывание дерева:</strong> при поступлении платежа ядро ЦБ сплитует его за O(1) такт</span>
      </div>

      <div class="fsm-state-pipeline">
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[FLATTEN_O1]</span>
          <span class="fsm-state-desc">Дерево зависимостей схлопывается в плоский вектор расчетов за один шаг</span>
        </div>
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[USER_10%]</span>
          <span class="fsm-state-desc"><strong>10% бюджета</strong> поступает гражданину за внимание прямо в Цифровых рублях</span>
        </div>
        <div class="fsm-state-row emerald">
          <span class="fsm-state-badge">[AUTO_TAX]</span>
          <span class="fsm-state-desc">Встроенный клиринг: удержание 13% НДФЛ / 4–6% налога для самозанятых инженеров</span>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag gold">СПРАВЕДЛИВОСТЬ И НАЛОГИ</div>
          <h3 class="card-title">Кооперативная экономика софта</h3>
          <ul class="card-bullets">
            <li><strong>Вектор Шепли:</strong> распределение математически справедливо, удовлетворяет четырем аксиомам теории кооперативных игр</li>
            <li><strong>Прямая монетизация Open Source:</strong> автор стандартизированной таблицы базы данных получает микророялти с каждого вызова</li>
            <li><strong>Вознаграждение гражданина:</strong> 10% рекламного бюджета поступает напрямую пользователю за внимание</li>
            <li><strong>Встроенное налогообложение:</strong> автоматическое удержание 13% НДФЛ для граждан и 4&ndash;6% налога на профдоход для самозанятых инженеров</li>
          </ul>
        </div>

        <div class="fsm-terminal-card gold-border" style="margin-top: 10px; margin-bottom: 10px;">
          <div class="fsm-terminal-header">
            <span class="gold-title">📐 SHAPLEY VALUE & DAG DECOMPOSITION</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot yellow"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">AXIOMS:</span> 1. Эффективность · 2. Симметрия · 3. Фиктивный игрок<br/>
            <span class="fsm-kw">COMPRESSION:</span> Алгоритмическое сжатие дерева софта в плоский вектор O(1)<br/>
            <span class="fsm-kw">ROYALTY_TAX:</span> Параллельное удержание НДФЛ / НПД при каждом сплите
          </div>
        </div>

        <div class="kpi-chip-footer" style="color: #ffd600; border-color: rgba(250, 204, 21, 0.3); background: rgba(250, 204, 21, 0.08); padding: 10px 16px; border-radius: 8px; font-size: 20px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
          ⚡ ВЕКТОР ШЕПЛИ · РАСЧЕТ: O(1) · НАЛОГОВЫЙ АГЕНТ: 100% АВТОМАТИЧЕСКИ
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Третий сценарий решает фундаментальный кризис открытого программного обеспечения.
>
> В «Турбазе» приложения изначально спроектированы для совместной работы. Программы органично дополняют друг друга, используя открытые схемы данных и Общественные Оболочки API.
>
> Функция share позволяет авторам заранее зафиксировать доли распределения выручки.
>
> Если приложение Д использует модуль В, созданный разработчиками Б и А, и таблицу инженера Г, поступивший доход расщепляется алгоритмически. Десять процентов получает пользователь за внимание, а девяносто процентов прозрачно распределяются по дереву софта.
>
> Дерево автоматически сворачивается в плоский расчет за один шаг, а налоги удерживаются автоматически.

---

<!-- slide: 9 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МОНЕТИЗАЦИЯ ВНИМАНИЯ</div>
    <h2 class="slide-title">ЭРА ПОСЛЕ COOKIE: ON-DEVICE ИИ И 0% ФРОДА</h2>
    <p class="slide-subtitle">Внимание человека окупает хранение данных и приносит прямой доход без утечки личных профилей</p>
  </div>

  <div class="slide-body grid-3col">
    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag teal">ПРИНЦИП 01: ZERO-PII ТАРГЕТИНГ</div>
        <h3 class="card-title">Локальный ИИ на Edge</h3>
        <p class="card-desc">Профиль интересов никогда не передается на серверы корпораций.</p>
        <ul class="card-bullets">
          <li>Компактная нейросеть работает прямо в браузере смартфона</li>
          <li>100% точность контекста на основе локальной базы SQLite</li>
          <li>Абсолютная защита семейной тайны и привычек</li>
        </ul>
      </div>
      <div class="fsm-terminal-card" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span>🧠 ON-DEVICE AI INFERENCE</span>
          <span class="fsm-terminal-dot green"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">STORAGE:</span> Local SQLite vector DB (Zero-PII)<br/>
          <span class="fsm-kw">INFERENCE:</span> SLM WebNN (0 внешних вызовов)<br/>
          <span class="fsm-kw">PRIVACY:</span> Семейная тайна 100% на устройстве
        </div>
      </div>
    </div>

    <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag gold">ПРИНЦИП 02: АППАРАТНАЯ ЗАЩИТА</div>
        <h3 class="card-title">0% скликивания ботами</h3>
        <p class="card-desc">Рекламодатели платят только за реальный подтвержденный контакт.</p>
        <ul class="card-bullets">
          <li>Каждый показ заверяется аппаратной крипто-подписью телефона</li>
          <li>Невозможность накрутки просмотров фермами эмуляторов</li>
          <li>Полная прозрачность метрик эффективности рекламы</li>
        </ul>
      </div>
      <div class="fsm-terminal-card gold-border" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span class="gold-title">🔐 HARDWARE PROOF OF CONTACT</span>
          <span class="fsm-terminal-dot yellow"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">ATTEST:</span> Secure Element &middot; ГОСТ-ключ<br/>
          <span class="fsm-kw">PROOF:</span> SIGN(device_id, slot_id, timestamp)<br/>
          <span class="fsm-kw">FRAUD:</span> 0% бот-ферм и скликивания
        </div>
      </div>
    </div>

    <div class="glass-card accent-emerald" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag emerald">ПРИНЦИП 03: САМООКУПАЕМОСТЬ</div>
        <h3 class="card-title">Оплата хранения и доход</h3>
        <p class="card-desc">Рекламный бюджет через share(...) работает на гражданина.</p>
        <ul class="card-bullets">
          <li>Автоматическая оплата аренды хранилища на районной Ветке</li>
          <li>Остаток начисляется на кошелек гражданина в Цифровых рублях</li>
          <li>Человек &mdash; не бесплатное сырье, а выгодоприобретатель</li>
        </ul>
      </div>
      <div class="fsm-terminal-card emerald-border" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span class="emerald-title">💳 REVENUE SHARE & STORAGE</span>
          <span class="fsm-terminal-dot green"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-fn">share</span>(<span class="fsm-val">0.50</span>, <span class="fsm-var">BRANCH</span>, <span class="fsm-val">0.50</span>, <span class="fsm-var">CITIZEN</span>)<br/>
          <span class="fsm-kw">CLEARING:</span> 1) Аренда шлюза оплачена 100%<br/>
          <span class="fsm-kw">PROFIT:</span> 2) Чистый остаток зачислен в Цифровых ₽
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как в этой парадигме работает рекламная индустрия эпохи после cookie?
>
> Вместо слежки глобальных корпораций за каждым кликом, профиль пользователя хранится в зашифрованной локальной базе данных на его собственном телефоне.
>
> Компактная нейросеть подбирает релевантные предложения прямо на устройстве. При этом рекламодатель получает криптографическое доказательство реального показа, исключающее бот-трафик и скликивание.
>
> Доход от рекламы автоматически оплачивает аренду хранилища данных гражданина на районном шлюзе, а чистый остаток перечисляется ему на счет в Цифровых рублях. Человек перестает быть товаром — он становится полноправным участником экономики.

---

<!-- slide: 10 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ</div>
    <h2 class="slide-title">ЗАЩИТА КОШЕЛЬКОВ: СМАРТ-ОБОЛОЧКИ (WRAPPERS)</h2>
    <p class="slide-subtitle">Экранирование номеров счетов от контрагентов и гармонизация требований 115-ФЗ и 152-ФЗ</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="circuit-card-header" style="color: #ffd600;">
          <span>🏛️ НАДЗОРНЫЙ КОНТУР (115-ФЗ / ПОЛОЖЕНИЕ ЦБ № 809-П)</span>
        </div>
        <p class="card-desc">Абсолютная прозрачность для Банка России и Росфинмониторинга.</p>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">01</span>
          <span>Мастер-кошельки Цифрового рубля открываются с полной идентификацией в ЕСИА</span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">02</span>
          <span>Смарт-оболочки жестко привязаны к мастер-счетам в государственном реестре</span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">03</span>
          <span>Автоматический финмониторинг сумм &ge; 1 млн ₽ через предикат <code>gte(Amount, 1_000_000)</code></span>
        </div>
        <div class="flow-step-row gold">
          <span class="flow-step-num gold">04</span>
          <span><strong>Сквозной аудит:</strong> регулятор видит легитимное движение средств по всей цепочке</span>
        </div>
      </div>

      <div class="fsm-terminal-card gold-border" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span class="gold-title">🏛️ REGULATOR AUDIT FEED · 115-ФЗ / 809-П</span>
          <span class="fsm-terminal-dot yellow"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">MASTER_ACCOUNT:</span> Идентификация ЕСИА + СНИЛС<br/>
          <span class="fsm-kw">RULE:</span> gte(Amount, 1_000_000 RUB) → Авто-мониторинг<br/>
          <span class="fsm-kw">COMPLIANCE:</span> Полная прозрачность для ЦБ и Росфинмониторинга<br/>
          <span class="fsm-kw">AUDIT_TRAIL:</span> Детерминированная проверка законности операций 24/7
        </div>
      </div>
    </div>

    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="circuit-card-header" style="color: #1de9b6;">
          <span>🛡️ ГРАЖДАНСКИЙ КОНТУР (152-ФЗ ZERO-PII / СТ. 26 395-1)</span>
        </div>
        <p class="card-desc">Полная защита номеров счетов и остатков от чужих глаз и приложений.</p>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">01</span>
          <span>Контрагенты видят только обезличенный публичный идентификатор смарт-оболочки</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">02</span>
          <span>Реальный номер счета и совокупный баланс кошелька в ЦБ скрыты от внешних систем</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">03</span>
          <span>Исключение рисков коммерческого шпионажа и социальной инженерии</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">04</span>
          <span><strong>Защита от слежки:</strong> контрагенты не могут профилировать благосостояние гражданина</span>
        </div>
      </div>

      <div class="fsm-terminal-card" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span>🛡️ ZERO-PII PROXY WRAPPER · 152-ФЗ</span>
          <span class="fsm-terminal-dot green"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">PUBLIC_HANDLE:</span> 0xWRAPPER_7C2B... (Обезличенный ID)<br/>
          <span class="fsm-kw">BALANCE_MASK:</span> Реальный баланс в ЦБ скрыт от приложений<br/>
          <span class="fsm-kw">SECURITY:</span> Исключение коммерческого шпионажа и фишинга<br/>
          <span class="fsm-kw">DATA_MINIMIZATION:</span> 0 бит избыточных данных передается внешним сторонам
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Прямое указание реквизитов банковских счетов в смарт-контрактах недопустимо: это создает прямую угрозу деанонимизации и финансового шпионажа.
>
> Технология контрактных смарт-оболочек гармонизирует требования антиотмывочного надхода и защиты персональных данных.
>
> Для регулятора система абсолютно прозрачна: мастер-кошельки открываются через государственные сервисы идентификации, а крупные операции автоматически проверяются платформой Знай своего клиента.
>
> Но для внешнего мира смарт-оболочки надежно экранируют финансовую тайну. Продавцы и сервисы видят лишь обезличенный номер контрактной оболочки, не имея доступа к реальному балансу и реквизитам гражданина.

---

<!-- slide: 11 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | БЕЗОПАСНОСТЬ УСТРОЙСТВ</div>
    <h2 class="slide-title">СМЕНЯЕМЫЕ ПРОКСИ ПРИ УТЕРЕ ТЕЛЕФОНА</h2>
    <p class="slide-subtitle">Смартфон как временный сессионный манипулятор: суточные лимиты и мгновенный отзыв в один клик</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout teal" style="padding: 10px 16px; margin-bottom: 8px;">
        <strong style="font-size: 22px;">Принцип ненадежного клиента:</strong>
        <p style="font-size: 21px; line-height: 1.28; margin: 2px 0 0 0;">Мастер-ключ Цифрового рубля никогда не хранится на смартфоне. Телефон оперирует лишь сессионным прокси с суточным лимитом.</p>
      </div>

      <div class="flow-step-row teal">
        <span class="flow-step-num teal">1</span>
        <span><strong>Сессионный прокси:</strong> к аппарату привязывается ключ с суточным лимитом (напр. 3 000 ₽)</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">2</span>
        <span><strong>Векторная изоляция:</strong> код исполняется в браузере и заверяется районным шлюзом «Ветка»</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">3</span>
        <span><strong>Экстренный отзыв:</strong> при утрате аппарата прокси отзывается с домашнего ПК в 1 клик</span>
      </div>
      <div class="flow-step-row teal">
        <span class="flow-step-num teal">4</span>
        <span><strong>Сохранность капитала:</strong> мастер-кошелек ЦБ неприкосновенен; выдается новый прокси</span>
      </div>

      <div class="fsm-state-pipeline">
        <div class="fsm-state-row">
          <span class="fsm-state-badge">[ACTIVE]</span>
          <span class="fsm-state-desc">Смартфон оперирует сессионным прокси с жестким суточным лимитом (3 000 ₽)</span>
        </div>
        <div class="fsm-state-row">
          <span class="fsm-state-badge">[REVOKE]</span>
          <span class="fsm-state-desc">При краже владелец отзывает прокси с ПК; доступ мгновенно обнуляется в ЦБ</span>
        </div>
        <div class="fsm-state-row">
          <span class="fsm-state-badge">[REBIND]</span>
          <span class="fsm-state-desc">Новый телефон генерирует свежий прокси без перевыпуска государственных счетов</span>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-emerald" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag emerald">СРАВНЕНИЕ С КРИПТОВАЛЮТАМИ</div>
          <h3 class="card-title">Защита при краже аппарата</h3>
          <ul class="card-bullets">
            <li><strong>Классический блокчейн (Web3):</strong> потеря смартфона с мнемонической фразой (Seed-фразой) означает безвозвратную потерю всех накоплений</li>
            <li><strong>Банковские приложения:</strong> кража разблокированного телефона открывает доступ ко всем счетам и кредитным лимитам</li>
            <li><strong>Архитектура Турбазы:</strong> злоумышленник ограничен суточным лимитом оболочки. Мастер-счет не может быть скомпрометирован, а отзыв происходит мгновенно без перевыпуска счетов</li>
          </ul>
        </div>

        <div class="fsm-terminal-card emerald-border" style="margin-top: 10px; margin-bottom: 10px;">
          <div class="fsm-terminal-header">
            <span class="emerald-title">🔑 TRUST QUORUM &amp; KEY REBINDING</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">QUORUM:</span> 3 из 5 поручителей сети «Забота» подтверждают личность<br/>
            <span class="fsm-kw">BLACKHOLE:</span> Мгновенный отзыв скомпрометированного сессионного прокси<br/>
            <span class="fsm-kw">SYNC:</span> Восстановление зашифрованной базы SQLite на новом аппарате
          </div>
        </div>

        <div class="kpi-chip-footer" style="color: #6ee7b7; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.08); padding: 10px 16px; border-radius: 8px; font-size: 20px; font-weight: 800; text-align: center; font-family: var(--font-mono);">
          ⚡ МАСТЕР-СЧЕТ: 100% В БЕЗОПАСНОСТИ · ОТЗЫВ: 1 КЛИК · СМЕНА СЧЕТА: НЕ ТРЕБУЕТСЯ
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Что произойдет, если пользователь потеряет свой смартфон или станет жертвой кражи?
>
> В традиционных криптовалютах потеря сид-фразы означает мгновенную утрату всех средств. А в мобильных банках злоумышленник получает доступ ко всем счетам и кредитам.
>
> В «Турбазе» мастер-ключ от государственного кошелька никогда не хранится на смартфоне. К телефону привязывается лишь легковесная прокси-оболочка с жестким суточным лимитом — например, три тысячи рублей на мелкие расходы.
>
> При утере аппарата гражданин заходит с домашнего компьютера или обращается в банк и отзывает прокси-оболочку в один клик. Все сбережения остаются нетронутыми.

---

<!-- slide: 12 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | ДЕЦЕНТРАЛИЗОВАННОЕ ДОВЕРИЕ</div>
    <h2 class="slide-title">ДОВЕРИЕ БЕЗ ПОСРЕДНИКОВ: WEB-OF-TRUST</h2>
    <p class="slide-subtitle">Многомерный граф взаимной помощи «Забота» и арбитражные ветви FSM при возникновении споров</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card danger-accent" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag red">ЕДИНЫЙ СОЦРЕЙТИНГ (АНТИУТОПИЯ)</div>
        <h3 class="card-title">Токсичный глобальный балл</h3>
        <p class="card-desc">Попытки ввести единую оценку благонадежности ведут к цифровому рабству.</p>
        <ul class="card-bullets">
          <li><strong>Произвол монополий:</strong> риск внезапной блокировки или обнуления единого рейтинга</li>
          <li><strong>Смешение контекстов:</strong> невозможно оценить разные роли человека единой цифрой</li>
          <li><strong>Индустрия фрода:</strong> процветание черного рынка заказных отзывов и бот-ферм</li>
          <li><strong>Бесправие гражданина:</strong> невозможность оспорить вердикт непрозрачного алгоритма</li>
        </ul>
      </div>

      <div class="fsm-terminal-card" style="border-color: rgba(244, 63, 94, 0.45); margin-top: auto;">
        <div class="fsm-terminal-header" style="color: #fda4af;">
          <span>⚠️ РИСКИ ЦЕНТРАЛИЗОВАННОГО РЕЙТИНГА</span>
          <span class="fsm-terminal-dot red"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">МОНОПОЛИЯ:</span> Черный ящик закрытых алгоритмов платформы<br/>
          <span class="fsm-kw">БОТ-ФЕРМЫ:</span> Скупка фальшивых отзывов за фиатные деньги<br/>
          <span class="fsm-kw">ДИСКРИМИНАЦИЯ:</span> Единый балл уничтожает репутацию человека<br/>
          <span class="fsm-kw">VULNERABILITY:</span> 0% защиты от предвзятости центрального оператора
        </div>
      </div>
    </div>

    <div class="glass-card accent-teal" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag teal">СЕТЬ «ЗАБОТА»: МНОГОМЕРНЫЙ ГРАФ</div>
        <h3 class="card-title">Контекстуальное поручительство</h3>
        <p class="card-desc">Репутация децентрализована и строится на очных связях людей.</p>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">01</span>
          <span><strong>Локальные контексты:</strong> мастер ЖКХ, соседская помощь, попутчик &mdash; независимые ветви</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">02</span>
          <span><strong>0% спама и накруток:</strong> добавление жильцов происходит лично или по поручительству</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">03</span>
          <span><strong>Внешняя логика арбитража:</strong> доказательства и разбор спора &mdash; в приложениях Турбазы; в FSM &mdash; лишь универсальный шаблон функции</span>
        </div>
        <div class="flow-step-row teal">
          <span class="flow-step-num teal">04</span>
          <span><strong>P2P-медиация:</strong> споры разрешаются коллегиально выбранным медиатором</span>
        </div>
      </div>

      <div class="fsm-terminal-card" style="margin-top: auto;">
        <div class="fsm-terminal-header">
          <span>🌐 TRUST GRAPH · ДОВЕРИЕ В «ЗАБОТЕ»</span>
          <span class="fsm-terminal-dot green"></span>
        </div>
        <div class="fsm-terminal-body">
          <span class="fsm-kw">VECTORS:</span> T_repair(0.94) ⊕ T_neighbor(0.98) ⊕ T_carpool(0.89)<br/>
          <span class="fsm-kw">ARBITRAGE:</span> Доказательства и переписка — в Турбазе (Zero-PII)<br/>
          <span class="fsm-kw">FSM_ROLE:</span> Универсальный шаблон or/and с подписью медиатора<br/>
          <span class="fsm-kw">QUORUM:</span> Доказательное решение с мультиподписью сторон спора
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Как формируется доверие в обществе без централизованных регуляторов?
>
> Единый государственный или корпоративный социальный рейтинг — это опасная антиутопия, ведущая к дискриминации и торговле отзывами.
>
> «Турбаза» опирается на многомерный граф доверия в сети «Забота». Репутация здесь контекстуальна: мастер по ремонту, добросовестный сосед или надежный попутчик — это совершенно разные доверенные связи.
>
> Поручительства оформляются очно между реальными людьми, исключая бот-фермы.
>
> При возникновении спора вся бизнес-логика арбитража, переписка и доказательства остаются в приложениях и микро-цепях «Турбазы». В конечном автомате хранится лишь адрес универсального шаблона функции, а приложения внешнего контура наполняют его смыслом, направляя решение с подписью медиатора.

---

<!-- slide: 13 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МАТЕМАТИЧЕСКАЯ НАДЕЖНОСТЬ</div>
    <h2 class="slide-title">100% ВЕРИФИКАЦИЯ FSM ПРОТИВ КРИЗИСА BUG BOUNTY</h2>
    <p class="slide-subtitle">Математическое доказательство инвариантов баланса и отсутствия дедлоков SMT-сольверами до запуска</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="glass-card danger-accent" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag red">ТЬЮРИНГ-ПОЛНЫЙ КОД (EVM)</div>
        <h3 class="card-title">Иллюзия надежности аудитов</h3>
        <p class="card-desc">Программы этичного хакинга (Bug Bounty) не способны гарантировать безопасность.</p>
        <ul class="card-bullets">
          <li><strong>Теорема Райса:</strong> семантические свойства произвольного кода алгоритмически неразрешимы</li>
          <li>Бесконечное пространство состояний делает невозможным полный перебор</li>
          <li>Контракты взламываются даже после десятков престижных аудитов</li>
          <li><strong>Комбинаторный взрыв:</strong> миллионы ветвей исполнения исключают полную верификацию</li>
        </ul>
      </div>

      <div>
        <div class="fsm-terminal-card red-border" style="margin-top: auto;">
          <div class="fsm-terminal-header">
            <span class="red-title">⚠️ EVM TURING FAILURE ARCHIVE</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot red"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">RICE_THEOREM:</span> &forall; nontrivial P: semantic P is UNDECIDABLE<br/>
            <span class="fsm-kw">RE-ENTRANCY:</span> The DAO ($60M), Nomad ($190M), Euler ($197M)<br/>
            <span class="fsm-kw">AUDIT_PARADOX:</span> 82% взломанных контрактов прошли Bug Bounty
          </div>
        </div>
        <div class="kpi-chip-footer" style="color: #ff5252; border-color: rgba(255, 82, 82, 0.3); background: rgba(255, 82, 82, 0.08); padding: 8px 14px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono); margin-top: 8px;">
          🚨 $3.8B ЕЖЕГОДНЫХ ПОТЕРЬ ИЗ-ЗА ТЬЮРИНГ-ПОЛНОТЫ
        </div>
      </div>
    </div>

    <div class="glass-card accent-emerald" style="height: 100%; justify-content: space-between;">
      <div>
        <div class="card-pill-tag emerald">ДЕЙТЕРМИНИРОВАННЫЙ FSM ТУРБАЗЫ O(1)</div>
        <h3 class="card-title">Формальное доказательство</h3>
        <p class="card-desc">Пространство состояний конечно и проверяется автоматическими SMT-сольверами.</p>
        <ul class="card-bullets">
          <li><strong>Доказательство инвариантов:</strong> математически доказано &sum; Assets_In &equiv; &sum; Assets_Out</li>
          <li><strong>Deadlock-freedom:</strong> автоматическое подтверждение отсутствия тупиков в Z3 и TLA+</li>
          <li><strong>Истинная роль Bug Bounty:</strong> привлечение хакеров только для проверки чипов и ГОСТ-шифров</li>
          <li><strong>Государственный реестр:</strong> математический допуск безопасных шаблонов в ядро ЦБ</li>
        </ul>
      </div>

      <div>
        <div class="fsm-terminal-card emerald-border" style="margin-top: auto;">
          <div class="fsm-terminal-header">
            <span class="emerald-title">🛡️ SMT SOLVER / TLA+ PROVER CONSOLE</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">SOLVER:</span> Z3 SMT Solver v4.12 + CVC5 (Zero Heuristics)<br/>
            <span class="fsm-kw">PROOF_1:</span> Conservation Theorem: &sum; In &equiv; &sum; Out [Q.E.D.]<br/>
            <span class="fsm-kw">PROOF_2:</span> No Deadlock, Liveness Guarantee [Q.E.D.]
          </div>
        </div>
        <div class="kpi-chip-footer" style="color: #00e676; border-color: rgba(0, 230, 118, 0.3); background: rgba(0, 230, 118, 0.08); padding: 8px 14px; border-radius: 8px; font-size: 18px; font-weight: 800; text-align: center; font-family: var(--font-mono); margin-top: 8px;">
          ✓ 100% ВЕРИФИКАЦИЯ ДО ДЕПЛОЯ · 0 УЯЗВИМОСТЕЙ В ЯДРЕ
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Банк России в своей концепции предлагает привлекать отечественные платформы Bug Bounty для поиска уязвимостей в смарт-контрактах.
>
> Однако мировая практика доказала: программы этичного хакинга бессильны перед Тьюринг-полным кодом. Из-за фундаментальной теоремы Райса проверить все сценарии сложной программы невозможно, и взломы происходят регулярно.
>
> Конечно-автоматная модель, предложенная в нашей белой бумаге, решает эту проблему в корне. Пространство состояний FSM конечно и счетно.
>
> До добавления шаблона в государственный реестр автоматические математические анализаторы на сто процентов доказывают строгое сохранение баланса и невозможность зависания средств.
>
> А Bug Bounty привлекается строго для аудита криптографических библиотек ГОСТ.

---

<!-- slide: 14 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | МАКРОЭКОНОМИЧЕСКИЙ ЭФФЕКТ</div>
    <h2 class="slide-title">ИЗМЕРИМЫЙ ЭКОНОМИЧЕСКИЙ ЭФФЕКТ</h2>
    <p class="slide-subtitle">Конкретная отдача двухконтурной модели для Регулятора, Бизнеса, ИТ-разработчиков и Граждан</p>
  </div>

  <div class="slide-body grid-4cards">
    <div class="glass-card accent-golden">
      <div>
        <div class="card-pill-tag gold">РЕГУЛЯТОР И ГОСУДАРСТВО</div>
        <h3 class="card-title">Банк России</h3>
        <ul class="card-bullets">
          <li><strong>Сложность O(1):</strong> пиковая масштабируемость без риска перегрузки ЦОД</li>
          <li><strong>-90% затрат на сервера:</strong> вся сложность и хранение вынесены на Листья</li>
          <li><strong>161-ФЗ и 152-ФЗ:</strong> безотзывность клиринга и Zero-PII соответствие</li>
          <li><strong>161-ФЗ SLA:</strong> отклик ядра &lt; 100 мс при миллионах транзакций</li>
        </ul>
      </div>
      <div class="metric-highlight-box gold-border">
        <span class="metric-highlight-val" style="color: #ffd600;">-90% ЦОД</span>
        <span class="metric-highlight-lbl">Экономия серверных мощностей ядра</span>
      </div>
      <div class="kpi-chip-footer" style="color: #ffd600; border-color: rgba(250, 204, 21, 0.3);">⚡ O(1) КЛИРИНГ · -90% ЦОД</div>
    </div>

    <div class="glass-card accent-teal">
      <div>
        <div class="card-pill-tag teal">ПРЕДПРИНИМАТЕЛИ И МСП</div>
        <h3 class="card-title">Реальный бизнес</h3>
        <ul class="card-bullets">
          <li><strong>0% налога монополий:</strong> экономия 30% комиссий маркетплейсов</li>
          <li><strong>0 ₽ за терминалы:</strong> расчеты через браузер без покупки POS-оборудования</li>
          <li><strong>Мгновенный эскроу:</strong> исключение неплатежей и кассовых разрывов</li>
          <li><strong>Мгновенный оборот:</strong> средства зачисляются сразу после выдачи заказа</li>
        </ul>
      </div>
      <div class="metric-highlight-box cyan-border">
        <span class="metric-highlight-val" style="color: #38bdf8;">+30% МАРЖА</span>
        <span class="metric-highlight-lbl">Сохранение прибыли без комиссий маркетплейсов</span>
      </div>
      <div class="kpi-chip-footer" style="color: #1de9b6; border-color: rgba(29, 233, 182, 0.3);">⚡ +30% МАРЖА · 0 ₽ POS</div>
    </div>

    <div class="glass-card accent-emerald">
      <div>
        <div class="card-pill-tag emerald">ИТ-СООБЩЕСТВО</div>
        <h3 class="card-title">Разработчики ПО</h3>
        <ul class="card-bullets">
          <li><strong>Микророялти share(...):</strong> автоматический доход авторам библиотек и схем</li>
          <li><strong>Сотрудничество вместо войн:</strong> приложения усиливают функционал друг друга</li>
          <li><strong>Встроенные налоги:</strong> авто-уплата 4&ndash;6% налога на профдоход</li>
          <li><strong>Открытый рынок схем:</strong> монетизация без создания своих платежек</li>
        </ul>
      </div>
      <div class="metric-highlight-box emerald-border">
        <span class="metric-highlight-val" style="color: #10b981;">100% РОЯЛТИ</span>
        <span class="metric-highlight-lbl">Прямой доход авторам софта и SQL-схем</span>
      </div>
      <div class="kpi-chip-footer" style="color: #6ee7b7; border-color: rgba(16, 185, 129, 0.3);">⚡ SHARE(...) · АВТО-НАЛОГ</div>
    </div>

    <div class="glass-card">
      <div>
        <div class="card-pill-tag cyan">ОБЩЕСТВО</div>
        <h3 class="card-title">Гражданин и Семья</h3>
        <ul class="card-bullets">
          <li><strong>Zero-PII защита:</strong> тайна покупок защищена от агрессивной слежки</li>
          <li><strong>Безопасность кошелька:</strong> защита сбережений при утере смартфона</li>
          <li><strong>Доход за внимание:</strong> реклама окупает личное хранилище данных</li>
          <li><strong>Справедливый доход:</strong> прямое вознаграждение в Цифровых рублях</li>
        </ul>
      </div>
      <div class="metric-highlight-box teal-border">
        <span class="metric-highlight-val" style="color: #1de9b6;">ZERO-PII</span>
        <span class="metric-highlight-lbl">Абсолютная защита личной тайны и чеков</span>
      </div>
      <div class="kpi-chip-footer" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.3);">⚡ ZERO-PII · ЗАЩИТА СЧЕТОВ</div>
    </div>
  </div>
</div>

### Текст для диктора:
> Внедрение двухконтурной экономики «Турбазы» дает конкретный измеримый результат каждому участнику.
>
> Банк России получает государственную платформу смарт-контрактов с гарантированной сложностью O от единицы, которая разгружает дата-центры на девяносто процентов и исключает риски квазивалют.
>
> Малый бизнес полностью избавляется от тридцатипроцентной комиссии маркетплейсов и расходов на покупку терминалов эквайринга.
>
> Независимые ИТ-разработчики получают справедливую модель микророялти за каждую полезную библиотеку и реляционную схему данных.
>
> А граждане обретают гарантированную защиту частной жизни, безопасность своих сбережений и доход от собственного цифрового внимания.

---

<!-- slide: 15 -->
<div class="slide-content">
  <div class="slide-header">
    <div class="explainer-series-marker">🏔️ ПЛАТФОРМА ТУРБАЗА | СУВЕРЕННЫЙ ГОРИЗОНТ</div>
    <h2 class="slide-title">СУВЕРЕННЫЙ ГОРИЗОНТ: ДОРОЖНАЯ КАРТА И РАЗВИТИЕ</h2>
    <p class="slide-subtitle">Открытый стек AIRport, потребности в финансировании и команде, и 3-летний план до бета-версии</p>
  </div>

  <div class="slide-body grid-2col">
    <div class="info-panel">
      <div class="key-callout teal">
        <strong>Итоги генеральной трилогии «Турбаза»:</strong>
        <p>Мы прошли путь от философии суверенного владения данными (Часть 1) и трехзвенной архитектуры шлюзов (Часть 2) к справедливой двухконтурной экономике FSM-контрактов в Цифровом рубле (Часть 3).</p>
      </div>

      <div class="feature-cards-grid">
        <div class="feature-card">
          <div class="card-icon">📦</div>
          <h4>Открытый стек AIRport</h4>
          <p>Базовое ядро и клиентский движок Листьев открыты сообществу на GitHub.</p>
          <div class="card-param-tag">✦ TypeScript / WASM · MIT</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">👥</div>
          <h4>Команда и инвестиции</h4>
          <p>Для реализации требуется целевое финансирование и набор системной команды.</p>
          <div class="card-param-tag">✦ Инженеры · ГОСТ · FSM ядра</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🏛️</div>
          <h4>Предложение для ЦБ РФ</h4>
          <p>Направление экспертной белой бумаги и предложение совместного пилота в финтех-песочнице.</p>
          <div class="card-param-tag">✦ Белая бумага · Песочница ЦБ</div>
        </div>
        <div class="feature-card">
          <div class="card-icon">🎯</div>
          <h4>Пилотные внедрения</h4>
          <p>Школьное питание, региональный МСП, городские расчеты и сеть «Забота».</p>
          <div class="card-param-tag">✦ Школы · Рестораны · МСП</div>
        </div>
      </div>
    </div>

    <div class="visual-panel">
      <div class="glass-card accent-golden" style="height: 100%; justify-content: space-between;">
        <div>
          <div class="card-pill-tag gold">ОПТИМАЛЬНЫЙ ПЛАН РАЗВИТИЯ (3 ГОДА)</div>
          <h3 class="card-title">Поэтапный вывод платформы</h3>
          <div class="flow-step-row gold">
            <span class="flow-step-num gold">Год 1</span>
            <span><strong>Доработка и стабилизация ядра:</strong> распределенный расчетный движок и шлюзы</span>
          </div>
          <div class="flow-step-row gold">
            <span class="flow-step-num gold">Год 2</span>
            <span><strong>Внешние модули и приложения:</strong> API-оболочки, реляционные схемы и сервисы</span>
          </div>
          <div class="flow-step-row gold">
            <span class="flow-step-num gold">Год 3</span>
            <span><strong>Запуск и бета-версия:</strong> обкатка открытой бета-версии и пилотные внедрения</span>
          </div>
          <div class="flow-step-row gold">
            <span class="flow-step-num gold">3+</span>
            <span><strong>Суверенная среда:</strong> тиражирование в субъектах РФ и масштабирование</span>
          </div>
        </div>

        <div class="fsm-terminal-card gold-border" style="margin: 10px 0;">
          <div class="fsm-terminal-header">
            <span class="gold-title">🧭 NATIONAL SOVEREIGN STACK METRICS</span>
            <div class="fsm-terminal-controls"><span class="fsm-terminal-dot green"></span></div>
          </div>
          <div class="fsm-terminal-body">
            <span class="fsm-kw">CORE:</span> 100% Отечественный стек · Без зарубежных вендоров<br/>
            <span class="fsm-kw">REGULATION:</span> Полное соответствие 152-ФЗ, 161-ФЗ и 115-ФЗ<br/>
            <span class="fsm-kw">SCALE:</span> От смартфона гражданина до федерального клиринга
          </div>
        </div>

        <div class="sovereign-mission-banner">
          <span class="banner-title">ЧЕТКИЙ ИНЖЕНЕРНЫЙ ПЛАН</span>
          <span class="banner-desc">От открытого репозитория и детерминированного ядра FSM — к национальной платформе суверенитета данных и смарт-контрактов.</span>
        </div>
      </div>
    </div>
  </div>
</div>

### Текст для диктора:
> Подведем итоги нашей генеральной эксплейнер-трилогии.
>
> В первой части мы обосновали неизбежность возврата данных гражданам, а во второй — раскрыли анатомию шлюзов, микро-цепей и открытых интерфейсов. Сегодня мы показали завершенную модель справедливой двухконтурной экономики.
>
> Базовый клиентский стек AIRport открыт для профессионального сообщества. Чтобы воплотить эту масштабную архитектуру в жизнь, проекту требуются целевое финансирование и формирование сильной инженерной команды.
>
> В оптимальном сценарии реализация займет три года: первый год — доработка и стабилизация ядра, второй год — создание внешних модулей и прикладных сервисов, и третий год — запуск и практическая отладка бета-версии в пилотных проектах.
>
> «Турбаза» — это надежный долгосрочный фундамент технологического и экономического суверенитета страны. Спасибо за внимание!
