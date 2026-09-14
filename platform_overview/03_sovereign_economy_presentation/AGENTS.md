# AGENTS.md — 03_sovereign_economy_presentation

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 03: Справедливая экономика данных и ИИ: Экономика API (1/N), Цифровой рубль и Децентрализованный ИИ для общества** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Главная цель переработки — Объяснение платформы на реальных примерах:** Показать наглядно и пошагово, как физически работает суверенная экономика Турбазы, исключая абстрактные лозунги в пользу прикладной механики:
  - **Двухконтурная модель:** Внешний информационный контур Турбазы (микро-цепи журналов изменений на аппаратах «Лист», Zero-PII, P2P-синхронизация) + Внутренний расчетный контур (детерминированный конечный автомат FSM $O(1)$ в Цифровом рубле ЦБ РФ над переменными-кошельками без газа и Тьюринг-полноты).
  - **Универсальные шаблоны функций FSM:** `onceIn`, `lte`, `gte`, `or`, `and`, `set`, `add`, `share(...)` с криптографическим кэшированием в ОЗУ ядра.
  - **3 Реальных сквозных сценария:**
    1. *Оплата школьного питания:* Родительский FSM `onceIn(86400, lte(300, or(А, Б)))`, приватность корзины, осознанный IOU-офлайн при сбое связи.
    2. *B2B/B2C доставка еды без терминалов:* Заказ в синхронизируемой микро-цепи (ресторан, курьер, покупатель), P2P Proof-of-Delivery, клиринг `set(400, А) + add(100, Б, sum)`.
    3. *Рекурсивное сплитование выручки и роялти:* Функция `share(...)`, распределение дохода от рекламы и софта между авторами библиотек, интерфейсов и пользователем за внимание.
  - **Защита кошельков и сменяемые оболочки:** Контрактные оболочки (Account Abstraction Wrappers), сокрытие номеров счетов от контрагентов, безопасные сессионные прокси на смартфонах с лимитами и мгновенным отзывом при утере устройства.
- **Source of Intent:** Author notes ([`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md), [`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md)), Whitepaper 06 ([`06_cbr_smart_contracts_fsm_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md)), and [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).
- **Target Audience:** Предприниматели, экономисты, продуктовые лидеры, финтех-команды, разработчики и государственные регуляторы.
- **Narrative Style:** Убедительный, технически строгий, доказательный и доступный тон (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 15-slide master source and narration script.
- **`docs/presentation_outline.md`**: Structural slide outline with timings.
- **`docs/deck.css`**: Isolated, autonomous stylesheet for this presentation.
- **`rebuild.js`**: Offline build runner using committed audio assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard build artifacts (`audio/`, `slides_png/`, `web_deck/`, `pdf/`, `video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild:
npm --prefix platform_overview run rebuild-03
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix platform_overview run regen-03
node regenerate.js
```
