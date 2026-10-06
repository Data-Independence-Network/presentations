# AGENTS.md — 01_topology_and_sovereignty

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Contains the presentation deck, interactive slide player, handout PDF, and build pipeline for **Presentation 01: Трехуровневая распределенная топология и парадигма вычислений на устройствах пользователей** (13 high-density engineering slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](../../shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Лист -> Ветка -> Ветвь -> Ствол, плоскость управления vs плоскость данных, изоляция периметра, международный шлюз БРИКС.
- **Source of Intent:** Author notes ([`09-07_01_Architecture_overview.md`](../../shared_docs/comments/2026/09-07_01_Architecture_overview.md)), [`Технический документ платформы Турбаза.md`](../../shared_docs/Технический%20документ%20платформы%20Турбаза.md), and [`turbase_architecture_presentations_master_plan.md`](../turbase_architecture_presentations_master_plan.md).
- **Target Audience:** CTOs, Chief Architects, Staff Systems Engineers.
- **Narrative Style:** Academic, authoritative system architect tone without marketing hyperbole (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

---

## 📁 Subdirectory Layout
- **`docs/presentation_deck.md`**: Canonical 13-slide master source and narration script.
- **`rebuild.js`**: Offline build runner using committed assets.
- **`regenerate.js`**: Incremental smart builder with Neural TTS.
- **`generated/`**: Standard output directories (`artifacts/audio/`, `artifacts/slides_png/`, `outputs/web_deck/`, `outputs/pdf/`, `outputs/video/`).

---

## 🚀 Build Commands
```bash
# Offline rebuild of web deck and visuals:
npm run rebuild-arch-01
node rebuild.js

# Full incremental regeneration with Neural TTS:
npm run regen-arch-01
node regenerate.js
```
