# AGENTS.md — Installation & Dependency Provisioning Scripts

> [!IMPORTANT]
> **Обязательный протокол старта сессии (динамическая тема, ступень и запись):**
> В самом первом ответе любой новой сессии (до перехода к любым другим задачам) модель (Gemini Flash, Claude Sonnet и др.) **обязана**:
> 1. Открыть [Current Topic and process](../../sessions/Current_Topic_and_process.md) и динамически определить указанный там текущий файл темы и процесса (привязка выполняется исключительно к указателю в этом файле, без жёсткой фиксации конкретного имени файла темы; тем в указателе может быть одна или несколько).
> 2. Прочитать актуальный файл темы и извлечь описанные в нём этапы и ступени процесса.
> 3. Начать первый ответ пользователю с вопроса о том, **какая ступень процесса темы будет использована в этой сессии** (перечислив найденные ступени; если в указателе задано несколько тем — сначала предложить выбор темы и ступени).
> 4. Не приступать к другим задачам до согласования темы и ступени, и вести запись хода сессии в каталоге `sessions/2026/` в формате `MM-DD_NN_Name_of_session.md` согласно эталонному шаблону [session_format_template.md](../../sessions/session_format_template.md) (или [10-05_00_session_format_tempate.md](../../sessions/2026/10-05_00_session_format_tempate.md)).

## 🎯 Purpose & Scope
This directory contains automated environment setup and dependency provisioning scripts for the **Turbase Sovereign Presentation Suite**.

## 📜 Script Index & Catalog
| Index | Script Name | Platform | Target Purpose |
| :---: | :--- | :--- | :--- |
| **01-LINUX** | `01_install_build_dependencies_linux.sh` | Debian / Ubuntu Linux | System packages (`ffmpeg`, `python3`, fonts), Node.js LTS, Playwright Chromium. |
| **02-LINUX** | `02_install_regen_dependencies_linux.sh` | Debian / Ubuntu Linux | Runs build installer + installs `node-edge-tts` and checks TTS API key. |
| **01-MACOS** | `01_install_build_dependencies_macos.sh` | Apple macOS (arm64/x86_64) | Homebrew check/install, `ffmpeg`, `python3`, Node.js, Playwright Chromium. |
| **02-MACOS** | `02_install_regen_dependencies_macos.sh` | Apple macOS (arm64/x86_64) | Runs macOS build installer + installs `node-edge-tts` and checks TTS API key. |
| **AUTO** | `install_build.sh` | Universal (Cross-Platform) | Auto-detects OS (`Darwin` vs `Linux`) and executes appropriate 01 installer. |
| **AUTO** | `install_regen.sh` | Universal (Cross-Platform) | Auto-detects OS (`Darwin` vs `Linux`) and executes appropriate 02 installer. |

## 🚀 Execution via NPM
- `npm run install:build` (universal auto-detect)
- `npm run install:build:linux` (Debian/Ubuntu)
- `npm run install:build:macos` or `npm run install:build:apple` (Apple macOS)
- `npm run install:regen` (universal auto-detect)
- `npm run install:regen:linux` (Debian/Ubuntu)
- `npm run install:regen:macos` or `npm run install:regen:apple` (Apple macOS)
