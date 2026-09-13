# Серия эксплейнер-презентаций: Платформа «Турбаза» (Platform Overview)
## Базовый обзор и смена парадигмы: Что такое «Турбаза», зачем она создана и как работает (3 выпуска по 15 слайдов, 45 слайдов)

> **Категория директории:** `platform_overview/`  
> **Количество презентаций:** 3 | **Всего слайдов:** 45  
> **Визуальный стиль:** Индустриальный Горизонт (#0a0f1d, неоновый циан и золото)  
> **Озвучка:** Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`, темп `-9%`, тон `-5Hz`)  
> **Мастер-план направления:** [`turbase_platform_overview_master_plan.md`](file:///Users/parents/Documents/presentations/platform_overview/turbase_platform_overview_master_plan.md)  

---

## 🎯 Обзор и миссия серии

Серия презентаций **«Платформа Турбаза: Базовый обзор и смена парадигмы»** (`platform_overview/`) — это фундаментальный концептуальный эксплейнер из **3 взаимосвязанных выпусков**, адресованный широкой аудитории: государственным лидерам, предпринимателям, ИТ-архитекторам, инженерам и гражданам.

Главная цель серии — дать кристально ясный, вдохновляющий и доказательный ответ на ключевые вызовы современности:
1. **В чем заключается кризис централизованных облаков** (базы-мишени, платформенный монополизм 30%, монополия на данные граждан) и почему необходим переход к суверенному Edge Computing?
2. **Как устроена «Турбаза»** на концептуальном и архитектурном уровне (4 ранга узлов, реляционные автономные хранилища, внешние ключи, Общественные Оболочки API, Zero-PII)?
3. **Как функционирует справедливая цифровая экономика** платформы (модель 1/N, Цифровой рубль ЦБ РФ, открытый Web-of-Trust сети «Забота», локальный Edge AI и клиринг БРИКС)?

---

## 🧭 Каталог презентаций серии

| № | Презентация | Фокус и ключевая тематика | Web Deck | Документация |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [**Манифест и Смена парадигмы: От платформенного монополизма к владению собственной информацией**](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/README.md) | Обоснование исторической необходимости перехода от централизованных облачных мега-ЦОД и баз-мишеней к суверенному периферийному расчету (Edg... | [`web_deck/`](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/01_paradigm_shift_presentation/README.md) |
| **02** | [**Анатомия и Архитектура: Хранилища, внешние связи, Общественные Оболочки API и микоризный Интернет данных**](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/README.md) | Детальное раскрытие анатомии трехуровневой топологии платформы «Турбаза» (Лист → Ветка → Родительская Ветвь → Ствол), механизмов реляционных... | [`web_deck/`](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/02_architecture_principles_presentation/README.md) |
| **03** | [**Справедливая экономика данных и ИИ: Экономика API (1/N), Цифровой рубль и Децентрализованный ИИ для общества**](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/README.md) | Обоснование новой экономической парадигмы цифровой среды: ликвидация 30%-го платформенного налога магазинов приложений, внедрение экономики ... | [`web_deck/`](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/platform_overview/03_sovereign_economy_presentation/README.md) |

---

## 🚀 Быстрый запуск и просмотр

### Просмотр через единый веб-сервер
Запустите сервер в корне хранилища:
```bash
./start_presentation.sh
```
После запуска все презентации доступны по локальным ссылкам вида:
```
http://localhost:8080/platform_overview/<имя_презентации>/generated/outputs/web_deck/
```

---

## ⚡ Сборка и автоматизация

Все презентации направления поддерживают инкрементальную сборку на 100% детерминированной основе:

### Скрипты инкрементальной сборки (`package.json`):

- **Полная сборка всей категории (Offline Rebuild):** `npm run rebuild`
- **Полная регенерация с озвучкой (Neural TTS):** `npm run regen`
- **Точечная сборка отдельных презентаций:**
  - `npm run rebuild-01`
  - `npm run rebuild-platform-01`
  - `npm run rebuild-paradigm-shift`
  - `npm run rebuild-02`
  - `npm run rebuild-platform-02`
  - `npm run rebuild-architecture-principles`
  - `npm run rebuild-03`
  - `npm run rebuild-platform-03`
  - `npm run rebuild-sovereign-economy`

### Сборка из корня хранилища:
```bash
# Офлайн пересборка всех презентаций этой категории:
npm run rebuild-platform-overview

# Регенерация с синтезом новой речи через Neural TTS:
npm run regen-platform-overview
```

---

## 🔒 Архитектурные инварианты направления

1. **Автономность стилей (Style Isolation):** Каждая презентация владеет собственной изолированной таблицей стилей в папке `docs/` и не имеет общих runtime-зависимостей с соседними презентациями.
2. **Инвариант Zero-Overflow:** Верстка каждого слайда гарантирует отсутствие вертикальной прокрутки (`scrollHeight <= clientHeight`) во всех целевых разрешениях.
3. **Единый источник истины:** Вся структура слайдов, разметка и дикторский текст генерируются строго из `docs/presentation_deck.md`.
4. **Хранилища (AIR):** Все данные пользователей формируют децентрализованную сеть Автономных Взаимозависимых Хранилищ.
5. **Авторские заметки как источник замысла:** Концептуальные положения и экономические принципы прямого владения данными опираются на авторские заметки разработчика в [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) ([`08-25_01_History_of_technology.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-25_01_History_of_technology.md), [`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) и словарь меток [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md).
