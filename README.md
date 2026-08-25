# Платформа «Турбаза» — Презентационные и аналитические материалы

The Russian Federation is currently rebuilding its information infrastructure, driven by the need for cultural and civilizational survival in the age of AI.  The technology stack presented here proposes building a sovereign "data internet" that can help achieve digital sovereignty goals.  I'm very glad and proud to present these  informational materials in Russian first:

Суверенная трехуровневая распределенная цифровая платформа нового поколения (Edge Computing, Zero-Knowledge Proofs, Single Source of Truth).

---

## 📁 Структура репозитория

```
turbase_benefits_presentation/
├── overall_presentations/
│   ├── 01_sovereign_architecture_presentation/     # Презентация 1: Архитектура Цифрового Суверенитета
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

## ⚡ Автоматизация и сборка (NPM Scripts)

В репозитории реализованы два уровня сборки:
1. **`rebuild-*` (100% Offline сборка):** пересобирает веб-слайды, скриншоты 1920x1080, Handout PDF и MP4-видео, используя мастер-аудиофайлы `.mp3`, сохраненные в Git (не требует ключа TTS API).
2. **`regen-*` (Регенерация с синтезом речи):** выполняет генерацию аудио через Neural TTS (требует `text_to_speech_mcp_Open_API_key.txt`) и затем вызывает цепочку `rebuild`.

### 🔨 Offline Rebuild (без API ключа):
```bash
# Комплексная пересборка всех мастер-презентаций и отчетов
npm run rebuild-overall

# Пересборка презентации по Архитектуре (HTML, PNG, Handout PDF, MP4 видео)
npm run rebuild-overall-architecture

# Пересборка презентации по Стейкхолдерам
npm run rebuild-overall-stakeholder

# Сборка аналитического отчета / Матрицы выгод стейкхолдеров (A4 Whitepaper PDF)
npm run rebuild-overall-stakeholder-doc

# Сборка архитектурного отчета / Спецификации визуальных схем (A4 Visuals PDF)
npm run rebuild-overall-architecture-doc

# Пересборка всех презентаций репозитория
npm run rebuild-all
```

### 🎙️ Полная регенерация с синтезом новой речи (требует ключ TTS):
```bash
# Комплексная регенерация всех мастер-презентаций и отчетов с проверкой аудио
npm run regen-overall

# Регенерация презентации по Архитектуре (с синтезом аудио)
npm run regen-overall-architecture

# Регенерация презентации по Стейкхолдерам (с синтезом аудио)
npm run regen-overall-stakeholder

# Полная инкрементальная проверка всех презентаций репозитория
npm run regenerate-all

# Принудительный полный пересинтез всех презентаций
npm run regenerate-all:force
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
> **Примечание:** Для синтеза аудио требуется наличие валидного ключа в `text_to_speech_mcp_Open_API_key.txt` в корне репозитория. При его отсутствии скрипт прерывает выполнение с фатальной ошибкой.
