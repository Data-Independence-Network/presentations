# Комплект Белых Книг платформы «Турбаза» (Whitepapers Suite)

Данная директория содержит полный комплект из пяти фундаментальных аналитических и научно-технических документов (Whitepapers), охватывающих все направления развития платформы «Турбаза».

Документы разработаны на основе утвержденных 15-слайдовых планов презентаций, комментариев разработчика (`shared_docs/comments/`) и результатов пользовательских интервью.

---

## 📚 Состав комплекта

| № | Файл исходного текста | Скомпилированный PDF | Направление (Track) | Ключевая тематика |
| :---: | :--- | :--- | :--- | :--- |
| **01** | [`01_platform_overview_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.md) | [`01_platform_overview_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/01_platform_overview_whitepaper.pdf) | **Обзор платформы** (`platform_overview/`) | Смена парадигмы децентрализации, трехуровневая топология Лист-Ветка-Ствол, Zero-PII и снижение TCO на 90%. |
| **02** | [`02_applications_suite_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/02_applications_suite_whitepaper.md) | [`02_applications_suite_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/02_applications_suite_whitepaper.pdf) | **Флагманские приложения** (`applications_presentations/`) | Прикладные алгоритмы: «Деловой», «КубГолос», «Забота», «УраТур», МСП + Branch-шлюзы ЕСИА, СБП и ГИС ЖКХ. |
| **03** | [`03_engineering_architecture_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/03_engineering_architecture_whitepaper.md) | [`03_engineering_architecture_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/03_engineering_architecture_whitepaper.pdf) | **Инженерная архитектура** (`architecture_presentations/`) | Модель данных AirEntity, встраиваемый SQLite на Листе, Read-Anywhere Write-Self, Branch Pipeline, P2P, TreeSearch, FSM смарт-контракты и микро-блокчейны. |
| **04** | [`04_ecosystem_impact_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.md) | [`04_ecosystem_impact_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/04_ecosystem_impact_whitepaper.pdf) | **Отраслевой эффект** (`detailed_overall_impact_presentations/`) | Матрица ценности 10 категорий участников, расчет TCO (экономия 390 млн руб./год) и 4-фазная дорожная карта миграции. |
| **05** | [`05_sovereign_governance_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/05_sovereign_governance_whitepaper.md) | [`05_sovereign_governance_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/05_sovereign_governance_whitepaper.pdf) | **Мастер-обзор и суверенитет** (`overall_presentations/`) | Правовое обоснование 152-ФЗ, Zero-PII, подписи ГОСТ Р 34.10-2012, государственные шлюзы и доверенный контур БРИКС+. |
| **06** | [`06_cbr_smart_contracts_fsm_whitepaper.md`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.md) | [`06_cbr_smart_contracts_fsm_whitepaper.pdf`](file:///Users/parents/Documents/presentations/shared_docs/whitepapers/06_cbr_smart_contracts_fsm_whitepaper.pdf) | **Смарт-контракты ЦВЦБ и Банк России** (`shared_docs/whitepapers/`) | Официальный отзыв на Концепцию ПКСК ЦБ РФ: детерминированные FSM-контракты $O(1)$, внешний контур, 90% кешбэк, ответы на 7 вопросов ЦБ и референс AIRport. |

---

## 🚀 Команды сборки PDF

```bash
# Собрать все 6 Белых Книг в формате PDF:
npm run build-whitepapers

# Собрать конкретный документ по номеру:
npm run build-whitepaper-01
npm run build-whitepaper-02
npm run build-whitepaper-03
npm run build-whitepaper-04
npm run build-whitepaper-05
npm run build-whitepaper-06
```

---

## 🔒 Соответствие критическим принципам
1. **Zero-PII:** Персональные данные никогда не покидают устройство Лист; серверные шлюзы работают только с математическими доказательствами.
2. **Отсутствие упоминаний устаревшего стека:** Документы не содержат ссылок на устаревшие централизованные СУБД (ScyllaDB полностью исключена).
3. **Бесшовные государственные адаптеры:** На уровне узлов «Ветка» реализованы четкие шлюзы к ЕСИА, СБП (Цифровой рубль) и ГИС ЖКХ.
4. **Детерминированные FSM смарт-контракты:** Архитектура исключает Тьюринг-полные виртуальные машины (EVM) и плату за газ; логика контрактов исполняется локально как конечный автомат с верификацией цифровых подписей в журналах транзакций.
