# AGENTS.md — shared_docs

## 🎯 Purpose & Scope
Stores foundational, platform-wide technical documentation, whitepapers, cryptographic schemas, and cross-presentation architectural references.

---

## 📁 Directory Structure & Key Documents
- **`comments/`**: **Личные записи разработчика (Human-written Developer Notes)**
  - Записи автора платформы, написанные вручную без ИИ, отражающие историю концепций, глубинную мотивацию и философию архитектуры.
  - Содержит [`LABELS.md`](file:///home/anastasiya/Documents/presentations/shared_docs/comments/LABELS.md) — словарь семантических меток (`%Repository`, `%Tree`, `%ForeignKey`, `%API` и др.).
  - Структурировано по годам (`2026/` и т.д.).
- **`Технический документ платформы Турбаза.md`**: Comprehensive 110 KB technical whitepaper detailing:
  - Three-tier topology (Leaf, Branch, Sub-branch, Trunk)
  - Game-theoretic API economy & 1/N micro-royalty execution tracing
  - Post-quantum lattice cryptography (PQC) and Russian GOST standards (Кузнечик, Стрибог, ГОСТ Р 34.10)
  - Zero-Knowledge Proof (ZK) verification and Zero-PII compliance models
  - Federated OLAP query mechanics (128-byte client rollups)
  - Database engine architecture and state pruning
- **`turbase_presentation_russian_text.md`**: Foundational 30-slide master reference presentation text and narration preceding this workspace.
- **`generate_tech_doc_pdf.js`**: CLI tool to compile `Технический документ платформы Турбаза.md` into an executive PDF Whitepaper.

---

## 🛠️ Instructions for Agents

1. **Единый источник технической истины (Single Source of Technical Truth):**
   - Техническая документация (`Технический документ платформы Турбаза.md`) и заметки разработчика (`comments/`) являются главными нормативными источниками для всех презентаций репозитория.
2. **Использование авторских заметок (`comments/`):**
   - При уточнении концепций, мотивации архитектурных решений и формулировании тезисов обращайтесь к заметкам в папке `comments/`.
   - Для точного поиска фактов используйте поиск по меткам `%Label` из [`comments/LABELS.md`](file:///home/anastasiya/Documents/presentations/shared_docs/comments/LABELS.md).
   - Заметки разработчика предназначены **строго для чтения** (Read-Only). ИИ-агентам запрещено изменять авторские записи.
