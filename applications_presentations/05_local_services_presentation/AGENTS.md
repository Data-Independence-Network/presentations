# AGENTS.md — 05_local_services_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md).

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 05: Экосистема платформы «Турбаза»: хранилища, неограниченное число приложений, общие модули и кооперативный строй** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](../../shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте).
- **Focus:** Замыкание цикла 12 Белых книг платформы: математически доказанные хранилища (атомарность на Листе по патенту США 10 902 016 B2), правило автономности схем, ортогональный синтез логических модулей и свободных пользовательских интерфейсов, сквозная синергия 5 приложений, общие модули ядра и WebAssembly, кооперативная модель (41-ФЗ, 123.8 ГК РФ, 3085-1), самоокупаемость домашних узлов и десятина (10%) гражданам за внимание под девизом *Beyond Decentralized* («Справедливое владение данными и независимая разработка программного обеспечения»).
- **Source of Intent:** [Белая книга № 12 «Экосистема платформы «Турбаза»»](../../shared_docs/whitepapers/12_ecosystem_whitepaper.md).
- **Authorship:** Концептуальный автор платформы: Артём Владимирович Шамсутдинов. Мастер-план: Claude Sonnet 5.5. Инженерная веб-сборка и стили: Gemini 3.8 Flash.
- **Narrative Style:** Академически строгий, глубоко уважительный, созидательный (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
npm --prefix applications_presentations run rebuild-05
node rebuild.js

# Full regeneration with Neural TTS:
npm --prefix applications_presentations run regen-05
node regenerate.js
```
