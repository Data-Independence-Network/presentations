# Мастер-презентации платформы «Турбаза» (Master Overview Track)
## Две стратегические мастер-презентации государственного и отраслевого уровня + аналитические документы (30 слайдов)

> **Категория директории:** `overall_presentations/`  
> **Количество презентаций:** 2 | **Всего слайдов:** 30  
> **Визуальный стиль:** Dark Sovereign (#050811, Золото и Циан)  
> **Озвучка:** Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`, темп `-9%`, тон `-5Hz`)  

---

## 🎯 Обзор и миссия серии

Направление **«Мастер-презентации платформы Турбаза»** (`overall_presentations/`) объединяет две ключевые презентации высшего стратегического уровня, дающие исчерпывающее представление об архитектуре и экономике платформы для первых лиц государства, инвесторов и руководителей отраслей:

1. **«Суверенная архитектура прямого владения данными и технологического суверенитета государства»** (`01_sovereign_architecture_presentation`):
   - Комплексный разбор трехуровневой топологии (Лист $\to$ Ветка $\to$ Ствол).
   - Ликвидация баз-мишеней (Honeypots) и обеспечение 152-ФЗ Zero-PII.
   - Гарантия непрерывности работы критических госуслуг при отключении внешнего интернета.
   - Сопровождается архитектурным буклетом `turbase_presentation_visuals.pdf`.

2. **«Комплексный анализ выгод и сценариев запуска для всех участников экосистемы»** (`02_stakeholders_benefits_presentation`):
   - 6-секторная матрица ценности (Граждане, Малый бизнес, AdTech, Банки/Финтех, Государство, Силовые органы).
   - Объективный анализ Плюсов (PROs), Опасений (CONs) и Инженерных компенсаций (Mitigations).
   - Сценарии запуска первого дня (Day-1) и экономика совместного использования API 1/N.
   - Сопровождается аналитическим отчетом `turbase_stakeholders_value_matrix.pdf`.

---

## 🧭 Каталог презентаций серии

| № | Презентация | Фокус и ключевая тематика | Web Deck | Документация |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [**Трехуровневая архитектура прямого владения данными и защищенных вычислений**](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/README.md) | Главная техническая мастер-презентация платформы «Турбаза». Комплексный стратегический обзор трехуровневой топологии (Лист → Ветка → Ствол),... | [`web_deck/`](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/overall_presentations/01_sovereign_architecture_presentation/README.md) |
| **02** | [**Комплексный анализ выгод и сценариев запуска для всех участников экосистемы**](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/README.md) | Главная экономическая мастер-презентация платформы «Турбаза». Развернутая матрица ценности для 6 ключевых групп стейкхолдеров (Граждане, Мал... | [`web_deck/`](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/overall_presentations/02_stakeholders_benefits_presentation/README.md) |

---

## 🚀 Быстрый запуск и просмотр

### Просмотр через единый веб-сервер
Запустите сервер в корне хранилища:
```bash
./start_presentation.sh
```
После запуска все презентации доступны по локальным ссылкам вида:
```
http://localhost:8080/overall_presentations/<имя_презентации>/generated/outputs/web_deck/
```

---

## ⚡ Сборка и автоматизация

Все презентации направления поддерживают инкрементальную сборку на 100% детерминированной основе:

### Скрипты инкрементальной сборки (`package.json`):

- **Полная сборка всей категории (Offline Rebuild):** `npm run rebuild`
- **Полная регенерация с озвучкой (Neural TTS):** `npm run regen`
- **Точечная сборка отдельных презентаций:**
  - `npm run rebuild-architecture`
  - `npm run rebuild-01`
  - `npm run rebuild-stakeholder`
  - `npm run rebuild-02`
  - `npm run rebuild-architecture-doc`
  - `npm run rebuild-stakeholder-doc`

### Сборка из корня хранилища:
```bash
# Офлайн пересборка всех презентаций этой категории:
npm run rebuild-overall

# Регенерация с синтезом новой речи через Neural TTS:
npm run regen-overall
```

---

## 🔒 Архитектурные инварианты направления

1. **Автономность стилей (Style Isolation):** Каждая презентация владеет собственной изолированной таблицей стилей в папке `docs/` и не имеет общих runtime-зависимостей с соседними презентациями.
2. **Инвариант Zero-Overflow:** Верстка каждого слайда гарантирует отсутствие вертикальной прокрутки (`scrollHeight <= clientHeight`) во всех целевых разрешениях.
3. **Единый источник истины:** Вся структура слайдов, разметка и дикторский текст генерируются строго из `docs/presentation_deck.md`.
4. **Хранилища (AIR):** Все данные пользователей формируют децентрализованную сеть Автономных Взаимозависимых Хранилищ.
5. **Авторские заметки как источник замысла:** Все архитектурные концепции, Zero-PII регламенты и экономические механизмы строго отражают авторские заметки разработчика в [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) ([`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), словарь меток ([`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md)) и мастер-спецификацию [`Технический документ платформы Турбаза.md`](file:///Users/parents/Documents/presentations/shared_docs/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20%D0%A2%D1%83%D1%80%D0%B1%D0%B0%D0%B7%D0%B0.md).
