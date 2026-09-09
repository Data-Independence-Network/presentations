# Платформа «Турбаза» — Презентационные и аналитические материалы

The Russian Federation is currently rebuilding its information infrastructure, driven by the need for cultural and civilizational survival in the age of AI.  The technology stack presented here proposes building a sovereign "data internet" that can help achieve digital sovereignty goals.  I'm very glad and proud to present these  informational materials in Russian first:

Отечественная трехуровневая распределенная цифровая платформа прямого владения данными нового поколения (Edge Computing, Zero-Knowledge Proofs, Single Source of Truth).

---

## 📁 Структура хранилища

```
turbase_benefits_presentation/
├── overall_presentations/
│   ├── 01_sovereign_architecture_presentation/     # Презентация 1: Архитектура прямого владения данными и технологического суверенитета государства
│   │   ├── docs/                                    # Исходный Markdown (presentation_deck.md)
│   │   ├── scripts/                                 # Скрипты генерации PDF и слайдов
│   │   ├── regenerate.js                            # Локальный инкрементальный сборщик
│   │   └── generated/                               # Все генерируемые файлы
│   │       ├── artifacts/                           # Промежуточные материалы (audio/*.mp3, slides_png/*.png)
│   │       └── outputs/                             # Финальные результаты (web_deck/, pdf/, video/)
│   │
│   └── 02_stakeholders_benefits_presentation/      # Презентация 2: Выгоды для 6 групп стейкхолдеров
│       ├── docs/                                    # Исходный Markdown (presentation_deck.md, value_matrix.md)
│       ├── scripts/                                 # Скрипты генерации PDF и слайдов
│       ├── regenerate.js                            # Локальный инкрементальный сборщик
│       └── generated/                               # Все генерируемые файлы
│           ├── artifacts/                           # Промежуточные материалы (audio/*.mp3, slides_png/*.png)
│           └── outputs/                             # Финальные результаты (web_deck/, pdf/, video/)
│
├── detailed_overall_impact_presentations/          # 10 детальных презентаций по участникам экосистемы
├── shared_templates/                               # Общие дизайн-системы и движки веб-плеера
├── scripts/                                        # Глобальные скрипты сборки и автоматизации
│   └── core/                                       # Модули сборки (incremental_engine, tts, video, pdf)
├── package.json                                    # NPM-скрипты инкрементальной сборки
├── start_presentation.sh                           # Локальный веб-сервер для просмотра презентаций
└── .gitignore                                      # Исключение временных и видеофайлов
```

---

## 🚀 Быстрый запуск презентаций

Запуск единого веб-сервера:
```bash
./start_presentation.sh
```
Затем откройте в браузере:
* **Презентация 1 (Архитектура):** `http://localhost:8080/overall_presentations/01_sovereign_architecture_presentation/generated/outputs/web_deck/`
* **Презентация 2 (Стейкхолдеры):** `http://localhost:8080/overall_presentations/02_stakeholders_benefits_presentation/generated/outputs/web_deck/`

---

## 🛠️ Установка зависимостей (Debian / Ubuntu Linux)

Для развертывания полного окружения сборки на Debian-подобных системах доступны два bash-скрипта:

### 1. Установка базового окружения сборки (Offline Rebuild):
Устанавливает `ffmpeg`, `python3`, шрифты, `Node.js`, `npm`, `playwright` и браузер Chromium:
```bash
./install_build_dependencies.sh
# или через npm:
npm run install:build
```

### 2. Установка окружения с синтезом речи (Neural TTS):
Вызывает базовый установщик и дополнительно настраивает `node-edge-tts` и проверяет файл API-ключа `text_to_speech_mcp_Open_API_key.txt`:
```bash
./install_regen_dependencies.sh
# или через npm:
npm run install:regen
```

---

## ⚡ Автоматизация и сборка (NPM Workspaces & Scripts)

Структура сборки разделена на два уровня:
1. **Главный `package.json` (в корне):** содержит общие команды для сборки целых видов презентаций и глобальных отчетов:
   - `rebuild-overall` / `regen-overall` (`overall_presentations/`)
   - `rebuild-platform-overview` / `regen-platform-overview` (`platform_overview/`)
   - `rebuild-apps` / `regen-apps` (`applications_presentations/`)
   - `rebuild-arch` / `regen-arch` (`architecture_presentations/`)
   - `rebuild-impact` / `regen-impact` (`detailed_overall_impact_presentations/`)
   - `build-whitepapers` (`shared_docs/`)
   - `rebuild-all` / `regenerate-all` (Глобальная сборка)
2. **Локальные подфайлы `package.json` (в папке каждого вида презентаций):** содержат точечные скрипты для сборки конкретных презентаций внутри соответствующего направления (`overall_presentations/`, `platform_overview/`, `applications_presentations/`, `architecture_presentations/`, `detailed_overall_impact_presentations/`, `shared_docs/`).

### 🔨 Сборка целых видов презентаций из корня (Offline Rebuild, без API-ключа):
```bash
# Мастер-презентации и архитектурные отчеты
npm run rebuild-overall

# Серия Platform Overview (3 части)
npm run rebuild-platform-overview

# Флагманские приложения (5 приложений)
npm run rebuild-apps

# Инженерная архитектура Turbase (7 частей)
npm run rebuild-arch

# Анализ экосистемы и стейкхолдеров (10 презентаций)
npm run rebuild-impact

# Все Whitepapers / аналитические документы
npm run build-whitepapers

# Полная сборка всех презентаций хранилища
npm run rebuild-all
```

### 🎙️ Регенерация с синтезом новой речи через Neural TTS (требует ключ TTS):
```bash
npm run regen-overall
npm run regen-platform-overview
npm run regen-apps
npm run regen-arch
npm run regen-impact
npm run regenerate-all
npm run regenerate-all:force
```

### 🎯 Точечная сборка отдельных презентаций (внутри папки нужного направления):
```bash
# Например, для мастер-презентаций:
cd overall_presentations
npm run rebuild-architecture        # Сборка только архитектурной презентации
npm run rebuild-stakeholder         # Сборка только презентации по стейкхолдерам
npm run rebuild-architecture-doc    # Сборка Architectural Visuals PDF
npm run rebuild-stakeholder-doc     # Сборка Stakeholders Value Matrix PDF

# Либо из корня через --prefix или --workspace:
npm --prefix overall_presentations run rebuild-architecture
npm --prefix architecture_presentations run rebuild-01
npm --prefix applications_presentations run rebuild-01
```

---

## 🎬 Воспроизводимая сборка медиа и документов

Все артефакты генерируются на 100% детерминированно из единого источника истины (`docs/presentation_deck.md`):

### Генерация раздаточного материала с речью диктора (Notes Handout PDF):
```bash
NODE_PATH=$(npm root -g) node scripts/build_handout_pdf.js overall_presentations/01_sovereign_architecture_presentation
NODE_PATH=$(npm root -g) node scripts/build_handout_pdf.js overall_presentations/02_stakeholders_benefits_presentation
```

### Генерация дикторской озвучки (Neural TTS):
```bash
NODE_PATH=$(npm root -g) node scripts/generate_audio.js overall_presentations/01_sovereign_architecture_presentation all
```
> **Примечание:** Для синтеза аудио требуется наличие валидного ключа в `text_to_speech_mcp_Open_API_key.txt` в корне хранилища. При его отсутствии скрипт прерывает выполнение с фатальной ошибкой.
