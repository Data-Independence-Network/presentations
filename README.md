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

## 🎬 Воспроизводимая сборка видео (Deterministic Video Build)

Все видеофайлы генерируются на 100% детерминированно из PNG-слайдов и MP3-аудио.

### Сборка видео Презентации 2 (Stakeholder Benefits):
```bash
cd 02_stakeholders_benefits_presentation/scripts
node build_stakeholders_video.js all
```
* **Выходные файлы (в `02_stakeholders_benefits_presentation/video_exports/`):**
  * `turbase_stakeholders_email.mp4` (1080p, ~19 МБ)
  * `turbase_stakeholders_master.mp4` (1080p, ~24 МБ)
  * `turbase_stakeholders_10mb.mp4` (720p, ~7 МБ)

### Пересборка слайдов и PDF:
```bash
# Захват слайдов 1920x1080
node 02_stakeholders_benefits_presentation/scripts/capture_stakeholders_slides.js

# Сборка представительского PDF Whitepaper (A4)
node 02_stakeholders_benefits_presentation/scripts/generate_stakeholders_matrix_pdf.js

# Сборка раздаточного материала с речью диктора (Notes Handout PDF)
node 02_stakeholders_benefits_presentation/scripts/generate_stakeholders_handout_pdf.js
```
