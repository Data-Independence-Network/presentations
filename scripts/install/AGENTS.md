# AGENTS.md — Installation & Dependency Provisioning Scripts

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
