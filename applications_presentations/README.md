# Флагманский прикладной стек платформы «Турбаза» (Applications Suite)
## 5 начальных сервисов повседневной цифровой жизни: «Деловой», «КубГолос», «Забота», «УраТур» и «Локальный реестр МСП и ЖКХ» (75 слайдов)

> **Категория директории:** `applications_presentations/`  
> **Количество презентаций:** 5 | **Всего слайдов:** 75  
> **Визуальный стиль:** Прикладной Спектр (Янтарь, Циан, Изумруд, Аметист, Коралл)  
> **Озвучка:** Microsoft Edge Neural TTS (`ru-RU-DmitryNeural`, темп `-9%`, тон `-5Hz`)  
> **Мастер-план направления:** [`turbase_applications_master_plan.md`](file:///Users/parents/Documents/presentations/applications_presentations/turbase_applications_master_plan.md)  

---

## 🎯 Обзор и миссия серии

Серия презентаций **«Флагманские приложения платформы Турбаза»** (`applications_presentations/`) создана для демонстрации того, как базовые архитектурные принципы платформы «Турбаза» (автономные Хранилища, реляционные схемы баз данных, внешние ключи, Общественные Оболочки (API) и экономика $1/N$) работают на практике в реальных прикладных сценариях для людей, семей, дворов, районов и путешественников.

Серия состоит из **5 взаимосвязанных презентаций**, которые показывают законченную среду повседневной цифровой жизни:
1. **«КубГолос»** — народная платформа версионных микро-опросов «снизу вверх» и коллективного разума.
2. **«Забота»** — социальная сеть взаимной поддержки граждан, добрососедства и открытых репутационных схем.
3. **«Деловой»** — персональный и семейный органайзер приоритетов, задач и поручений.
4. **«УраТур»** — флагманский туристический планер и путеводитель, рожденный из синергии первых трех сервисов.
5. **«Локальный реестр МСП и ЖКХ»** — каталог услуг шаговой доступности и сквозная прикладная синергия всей экосистемы.

---

## 🧭 Каталог презентаций серии

| № | Презентация | Фокус и ключевая тематика | Web Deck | Документация |
| :---: | :--- | :--- | :---: | :---: |
| **01** | [**«КубГолос»: Народная платформа версионных микро-опросов и коллективного разума**](file:///Users/parents/Documents/presentations/applications_presentations/01_kubgolos_app_presentation/README.md) | Раскрытие архитектуры децентрализованной социологической платформы «КубГолос». Показывает, как принимать качественные коллективные решения с... | [`web_deck/`](file:///Users/parents/Documents/presentations/applications_presentations/01_kubgolos_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/01_kubgolos_app_presentation/README.md) |
| **02** | [**«Забота»: Социальная сеть взаимной поддержки граждан и открытый репутационный стандарт**](file:///Users/parents/Documents/presentations/applications_presentations/02_zabota_app_presentation/README.md) | Презентация доверенной сети взаимной поддержки «Забота». Раскрывает концепцию добрососедства, очных QR-поручительств соседей, переиспользуем... | [`web_deck/`](file:///Users/parents/Documents/presentations/applications_presentations/02_zabota_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/02_zabota_app_presentation/README.md) |
| **03** | [**«Деловой»: Интеллектуальный персональный органайзер дел, задач и поручений**](file:///Users/parents/Documents/presentations/applications_presentations/03_delovoy_app_presentation/README.md) | Демонстрация флагманского персонального и семейного органайзера «Деловой». Показывает, как персональный тайм-менеджмент объединяет гравитаци... | [`web_deck/`](file:///Users/parents/Documents/presentations/applications_presentations/03_delovoy_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/03_delovoy_app_presentation/README.md) |
| **04** | [**«УраТур»: Автономный туристический планер и путеводитель по стране и миру**](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/README.md) | Демонстрация туристического планера «УраТур», рожденного из синергии базовых приложений: сборы от «Делового», народные тропы от «КубГолоса» ... | [`web_deck/`](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/04_uratur_app_presentation/README.md) |
| **05** | [**Локальный реестр МСП и ЖКХ: Прикладная синергия экосистемы Турбазы**](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/README.md) | Показ сквозной экономической синергии всех 5 приложений экосистемы: каталог местных мастеров и локальных предприятий шаговой доступности, ра... | [`web_deck/`](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/generated/outputs/web_deck/index.html) | [README.md](file:///Users/parents/Documents/presentations/applications_presentations/05_local_services_presentation/README.md) |

---

## 🚀 Быстрый запуск и просмотр

### Просмотр через единый веб-сервер
Запустите сервер в корне хранилища:
```bash
./start_presentation.sh
```
После запуска все презентации доступны по локальным ссылкам вида:
```
http://localhost:8080/applications_presentations/<имя_презентации>/generated/outputs/web_deck/
```

---

## ⚡ Сборка и автоматизация

Все презентации направления поддерживают инкрементальную сборку на 100% детерминированной основе:

### Скрипты инкрементальной сборки (`package.json`):

- **Полная сборка всей категории (Offline Rebuild):** `npm run rebuild`
- **Полная регенерация с озвучкой (Neural TTS):** `npm run regen`
- **Точечная сборка отдельных презентаций:**
  - `npm run rebuild-01`
  - `npm run rebuild-app-01`
  - `npm run rebuild-kubgolos`
  - `npm run rebuild-02`
  - `npm run rebuild-app-02`
  - `npm run rebuild-zabota`
  - `npm run rebuild-03`
  - `npm run rebuild-app-03`
  - `npm run rebuild-delovoy`
  - `npm run rebuild-04`
  - `npm run rebuild-app-04`
  - `npm run rebuild-uratur`
  - `npm run rebuild-05`
  - `npm run rebuild-app-05`
  - `npm run rebuild-local-services`

### Сборка из корня хранилища:
```bash
# Офлайн пересборка всех презентаций этой категории:
npm run rebuild-apps

# Регенерация с синтезом новой речи через Neural TTS:
npm run regen-apps
```

---

## 🔒 Архитектурные инварианты направления

1. **Автономность стилей (Style Isolation):** Каждая презентация владеет собственной изолированной таблицей стилей в папке `docs/` и не имеет общих runtime-зависимостей с соседними презентациями.
2. **Инвариант Zero-Overflow:** Верстка каждого слайда гарантирует отсутствие вертикальной прокрутки (`scrollHeight <= clientHeight`) во всех целевых разрешениях.
3. **Единый источник истины:** Вся структура слайдов, разметка и дикторский текст генерируются строго из `docs/presentation_deck.md`.
4. **Хранилища (AIR):** Все данные пользователей формируют децентрализованную сеть Автономных Взаимозависимых Хранилищ.
5. **Авторские заметки как источник замысла:** Все алгоритмические модели прикладных сервисов («Деловой», «КубГолос», «Забота», «УраТур») строго согласованы с авторскими заметками разработчика в [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) ([`08-30_01_Who_is_it_for.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-07_01_Architecture_overview.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-07_01_Architecture_overview.md), [`09-12_01_Smart_Contracts.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/2026/09-12_01_Smart_Contracts.md)) и словарем меток [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md).
