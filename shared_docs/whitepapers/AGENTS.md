# AGENTS.md — shared_docs/whitepapers

## 🎯 Purpose & Scope
Houses the analytical and scientific-technical Whitepapers suite for the **«Турбаза»** sovereign platform. Contains the 5 master whitepapers in Markdown and their compiled publication-grade PDF documents.

---

## 📚 Documents Catalog
1. **`01_platform_overview_whitepaper.md`**: Смена парадигмы децентрализации, трехуровневая топология Лист-Ветка-Ствол, Zero-PII и -90% TCO ЦОД.
2. **`02_applications_suite_whitepaper.md`**: Прикладные алгоритмы («Деловой», «КубГолос», «Забота», «УраТур», МСП) и Branch-адаптеры ЕСИА/СБП/ГИС ЖКХ.
3. **`03_engineering_architecture_whitepaper.md`**: Модель AirEntity, SQLite на Листе, Read-Anywhere Write-Self, Branch Pipeline, P2P, TreeSearch, детерминированные FSM смарт-контракты и микро-блокчейны.
4. **`04_ecosystem_impact_whitepaper.md`**: Матрица ценности 10 участников, экономический расчет TCO (390 млн руб./год экономии) и 4-фазная дорожная карта миграции.
5. **`05_sovereign_governance_whitepaper.md`**: Правовой комплаенс 152-ФЗ Zero-PII, ГОСТ Р 34.10-2012, доверенная госинфраструктура и контур БРИКС+.

---

## 📋 Architectural Standards
- **Author Notes as Source of Intent:** Все концептуальные формулировки и топологические модели строго опираются на авторские заметки разработчика в [`shared_docs/comments/`](file:///Users/parents/Documents/presentations/shared_docs/comments/) и словарь [`LABELS.md`](file:///Users/parents/Documents/presentations/shared_docs/comments/LABELS.md).
- **Single Source of Truth:** Markdown-файлы являются исходным эталоном для PDF-сборки.
- **Zero-PII Compliance:** Персональные данные никогда не покидают Лист; внешние шлюзы обрабатывают исключительно математические доказательства.

---

## 🚀 Build Commands
```bash
# Build all 5 whitepaper PDFs:
npm run build-whitepapers

# Or from shared_docs directory:
node ../scripts/core/build_whitepaper_pdf.js --all
```
