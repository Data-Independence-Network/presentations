#!/usr/bin/env bash
set -e

# ==============================================================================
# Turbase Presentation Suite — Build Dependencies Installer (Debian/Ubuntu Linux)
# Index: 01-LINUX-BUILD
# Installs all required software for offline building of Web Decks, Screenshots,
# Notes Handout PDFs, Whitepaper PDFs, and MP4 Videos.
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$SCRIPT_DIR"

echo "======================================================================"
echo " 🛠️  Installing Turbase Presentation Build Dependencies (Debian/Ubuntu Linux)"
echo "======================================================================"

# 1. Check for Debian/Ubuntu environment
if ! command -v apt-get &> /dev/null; then
  echo "[⚠️] Warning: apt-get not found. This script is designed for Debian/Ubuntu Linux systems."
  echo "     Please ensure ffmpeg, python3, nodejs (>= 18), npm, and chromium dependencies are installed."
fi

# Determine sudo helper
SUDO=""
if [ "$(id -u)" -ne 0 ]; then
  if command -v sudo &> /dev/null; then
    SUDO="sudo"
  else
    echo "[!] Non-root user and sudo not found. If package installation fails, run as root."
  fi
fi

# 2. Update and install required system packages
echo ""
echo "[1/4] Checking and installing system packages (ffmpeg, python3, fonts, utils)..."
MISSING_PKGS=()

for cmd_pkg in "ffmpeg:ffmpeg" "python3:python3" "git:git" "curl:curl" "wget:wget"; do
  cmd="${cmd_pkg%%:*}"
  pkg="${cmd_pkg##*:}"
  if ! command -v "$cmd" &> /dev/null; then
    MISSING_PKGS+=("$pkg")
  fi
done

for font_pkg in fonts-dejavu-core fonts-liberation fonts-noto-color-emoji ca-certificates; do
  if ! dpkg -s "$font_pkg" &> /dev/null; then
    MISSING_PKGS+=("$font_pkg")
  fi
done

if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
  echo "  Installing missing system packages: ${MISSING_PKGS[*]}..."
  $SUDO apt-get update -qq
  $SUDO apt-get install -y --no-install-recommends "${MISSING_PKGS[@]}"
else
  echo "  [✓] All required system packages (ffmpeg, python3, fonts) are already installed."
fi

# 3. Check Node.js and NPM
echo ""
echo "[2/4] Verifying Node.js and NPM environment..."
if ! command -v node &> /dev/null; then
  echo "  [!] Node.js not found. Installing Node.js LTS via NodeSource..."
  $SUDO apt-get update -qq
  $SUDO apt-get install -y ca-certificates curl gnupg
  $SUDO mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | $SUDO gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  NODE_MAJOR=20
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | $SUDO tee /etc/apt/sources.list.d/nodesource.list
  $SUDO apt-get update -qq
  $SUDO apt-get install -y nodejs
else
  NODE_VER=$(node -v)
  echo "  [✓] Node.js is installed: $NODE_VER"
fi

if ! command -v npm &> /dev/null; then
  echo "  [!] NPM not found. Installing npm..."
  $SUDO apt-get install -y npm
else
  NPM_VER=$(npm -v)
  echo "  [✓] NPM is installed: $NPM_VER"
fi

# 4. Install Node dependencies (Playwright & local modules)
echo ""
echo "[3/4] Installing NPM dependencies (Playwright)..."
if [ -f "package.json" ]; then
  npm install --no-audit --no-fund
else
  npm install playwright --no-audit --no-fund
fi
echo "  [✓] NPM dependencies installed."

# 5. Install Playwright Chromium & System Dependencies
echo ""
echo "[4/4] Verifying Playwright Chromium browser..."
if node -e "const { chromium } = require('playwright'); chromium.launch().then(b => { b.close(); process.exit(0); }).catch(e => process.exit(1));" &> /dev/null; then
  echo "  [✓] Playwright Chromium is working and verified."
else
  echo "  Installing Playwright Chromium browser..."
  npx playwright install chromium

  if ! node -e "const { chromium } = require('playwright'); chromium.launch().then(b => { b.close(); process.exit(0); }).catch(e => process.exit(1));" &> /dev/null; then
    echo "  [!] Chromium requires shared libraries. Installing dependencies..."
    if [ "$(id -u)" -eq 0 ]; then
      npx playwright install-deps chromium || true
    elif [ -n "$SUDO" ] && $SUDO -n true 2>/dev/null; then
      $SUDO npx playwright install-deps chromium || true
    else
      echo "  [ℹ️] Note: If Chromium fails, run: sudo npx playwright install-deps chromium"
    fi
  fi
fi

echo ""
echo "======================================================================"
echo " 🎉 Build Environment Successfully Configured (Linux)!"
echo "======================================================================"
echo " Installed components:"
echo "   - Node.js: $(node -v)"
echo "   - NPM: $(npm -v)"
echo "   - FFmpeg: $(ffmpeg -version | head -n 1)"
echo "   - Playwright: $(npx playwright --version 2>/dev/null || echo 'installed')"
echo "   - Python3: $(python3 --version)"
echo ""
echo " Ready for offline building! You can now run:"
echo "   npm run rebuild-platform-01"
echo "   npm run rebuild-overall"
echo "======================================================================"
