# AGENTS.md — 05_local_services_presentation

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
Contains presentation materials, slides, web deck, audio tracks, and automated build pipelines for **Presentation 05: Локальный реестр МСП и ЖКХ: Прикладная синергия экосистемы Турбазы** (15 billboard slides).

---

## 🧭 Architectural Focus & Key Concepts
- **Semantic Labels Invariant:** Метки в [`LABELS.md`](../../shared_docs/comments/LABELS.md) служат внутренней системой индексации базы заметок для связывания начальных знаний платформы агентами. Запрещено использовать метки `%...` в материалах презентации (слайдах, дикторском тексте), так как они затрудняют восприятие.
- **Focus:** Каталог услуг шаговой доступности, расчеты по смарт-контрактам Цифрового рубля с эскроу-защитой, 0% комиссий посредникам, прямая связь с ТСЖ/УК и локальными мастерами.
- **Source of Intent:** Author notes ([`08-30_01_Who_is_it_for.md`](../../shared_docs/comments/2026/08-30_01_Who_is_it_for.md), [`09-12_01_Smart_Contracts.md`](../../shared_docs/comments/2026/09-12_01_Smart_Contracts.md)), [`turbase_applications_master_plan.md`](../turbase_applications_master_plan.md), and [`02_applications_suite_whitepaper.md`](../../shared_docs/whitepapers/02_applications_suite_whitepaper.md).
- **Target Audience:** Самозанятые, малый бизнес, управляющие компании ЖКХ, жители микрорайонов.
- **Narrative Style:** Деловой, практичный, ориентированный на локальную экономику (`ru-RU-DmitryNeural`, rate -9%, pitch -5Hz).

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
