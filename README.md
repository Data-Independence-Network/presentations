# Платформа «Турбаза» — Презентационные и аналитические материалы

The Russian Federation is currently rebuilding its information infrastructure, driven by the need for cultural and civilizational survival in the age of AI.  The technology stack presented here proposes building a sovereign "data internet" that can help achieve digital sovereignty goals.  I'm very glad and proud to present these  informational materials in Russian first:

Суверенная трехуровневая распределенная цифровая платформа нового поколения (Edge Computing, Zero-Knowledge Proofs, Single Source of Truth).

---

## 📁 Структура репозитория

```
turbase_benefits_presentation/
├── 01_sovereign_architecture_presentation/     # Презентация 1: Архитектура Цифрового Суверенитета
│   ├── docs/                                    # Тексты диктора, визуальные планы, тезисы, PDF
│   ├── web_deck/                                # Интерактивная веб-презентация (HTML5/CSS3/JS)
│   ├── audio/                                   # Дикторская озвучка всех слайдов (MP3, нейросеть)
│   ├── slides_png/                              # Высокочеткие слайды 1920x1080 (PNG)
│   ├── scripts/                                 # Скрипты генерации аудио, захвата слайдов, PDF и видео
│   ├── temp_video/                              # Временные сегменты сборки (в .gitignore)
│   └── video_exports/                           # Финальные скомпилированные видео (в .gitignore)
│
├── 02_stakeholders_benefits_presentation/      # Презентация 2: Выгоды для 6 групп стейкхолдеров
│   ├── docs/                                    # Аналитический Whitepaper, Value Matrix, PDF
│   ├── web_deck/                                # Интерактивная веб-презентация с крупными шрифтами
│   ├── audio/                                   # Дикторская озвучка 15 слайдов (MP3)
│   ├── slides_png/                              # 15 мобильно-оптимизированных слайдов 1920x1080 (PNG)
│   ├── scripts/                                 # Скрипты захвата слайдов, генерации PDF и видео
│   ├── temp_video/                              # Временные сегменты сборки (в .gitignore)
│   └── video_exports/                           # Финальные видео MP4 (email, master, 10mb) (в .gitignore)
│
├── shared_docs/                                 # Общая техническая документация и спецификации
│   └── Технический документ платформы Турбаза.md
├── voice_samples/                               # Примеры нейросетевых голосов
├── start_presentation.sh                        # Локальный веб-сервер для просмотра презентаций
└── .gitignore                                   # Исключение временных и сгенерированных видеофайлов
```

---

## 🚀 Быстрый запуск презентаций

Запуск единого веб-сервера:
```bash
./start_presentation.sh
```
Затем откройте в браузере:
* **Презентация 1 (Архитектура):** `http://localhost:8080/01_sovereign_architecture_presentation/web_deck/`
* **Презентация 2 (Стейкхолдеры):** `http://localhost:8080/02_stakeholders_benefits_presentation/web_deck/`

---

## ⚡ Умная инкрементальная регенерация (NPM Scripts)

В репозитории реализован интеллектуальный движок инкрементальной сборки на основе SHA-256 хэшей контента (`presentation_deck.md`) и Git-чекпоинтов (`scripts/core/incremental_engine.js`):

```bash
# Регенерация презентации по Архитектуре (только изменившиеся слайды/аудио/видео)
npm run gen-overall-architecture

# Регенерация презентации по Стейкхолдерам
npm run gen-overall-stakeholder

# Сборка аналитического отчета / Матрицы выгод стейкхолдеров (A4 Whitepaper PDF)
npm run gen-overall-stakeholder-doc

# Сборка архитектурного отчета / Спецификации визуальных схем (A4 Visuals PDF)
npm run gen-overall-architecture-doc

# Полная инкрементальная проверка всех презентаций репозитория
npm run regenerate-all

# Принудительная полная пересборка всех презентаций (с флагом --full-regeneration)
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
