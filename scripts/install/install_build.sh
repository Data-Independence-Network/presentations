#!/usr/bin/env bash
set -e

# ==============================================================================
# Turbase Presentation Suite — Universal Cross-Platform Build Installer
# Auto-detects OS (macOS/Apple vs Linux) and delegates to the appropriate script.
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OS="$(uname -s)"

if [ "$OS" = "Darwin" ]; then
  echo "[ℹ️] Detected Apple macOS ($OS). Running macOS installer..."
  bash "$SCRIPT_DIR/01_install_build_dependencies_macos.sh" "$@"
elif [ "$OS" = "Linux" ]; then
  echo "[ℹ️] Detected Linux ($OS). Running Linux installer..."
  bash "$SCRIPT_DIR/01_install_build_dependencies_linux.sh" "$@"
else
  echo "[⚠️] Unsupported or unrecognized OS: $OS"
  echo "     Please run one of the specific scripts in scripts/install/ directly."
  exit 1
fi
