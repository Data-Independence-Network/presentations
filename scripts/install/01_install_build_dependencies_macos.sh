#!/usr/bin/env bash
set -e

# ==============================================================================
# Turbase Presentation Suite — Build Dependencies Installer (Apple macOS)
# Index: 01-MACOS-BUILD
# Installs all required software on Apple Silicon (M1/M2/M3/M4) & Intel macOS
# for offline building of Web Decks, Screenshots, Notes Handouts, Whitepapers & Videos.
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$SCRIPT_DIR"

echo "======================================================================"
echo " 🍎 Installing Turbase Presentation Build Dependencies (Apple macOS)"
echo "======================================================================"

# 1. Ensure Homebrew environment in PATH (Apple Silicon vs Intel)
if [ -x "/opt/homebrew/bin/brew" ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
elif [ -x "/usr/local/bin/brew" ]; then
  eval "$(/usr/local/bin/brew shellenv)"
fi

# Check for Homebrew
echo ""
echo "[1/4] Checking Homebrew package manager..."
if ! command -v brew &> /dev/null; then
  echo "  [!] Homebrew not found. Homebrew is required to install ffmpeg and system tools on macOS."
  echo "      Installing Homebrew now..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  
  if [ -x "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -x "/usr/local/bin/brew" ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  echo "  [✓] Homebrew is installed: $(brew --version | head -n 1)"
fi

# 2. Check and install system packages (ffmpeg, python3, git)
echo ""
echo "[2/4] Checking system tools (ffmpeg, python3, git)..."
MISSING_BREW=()

if ! command -v ffmpeg &> /dev/null; then
  MISSING_BREW+=("ffmpeg")
fi
if ! command -v python3 &> /dev/null; then
  MISSING_BREW+=("python3")
fi
if ! command -v git &> /dev/null; then
  MISSING_BREW+=("git")
fi

if [ ${#MISSING_BREW[@]} -gt 0 ]; then
  echo "  Installing via Homebrew: ${MISSING_BREW[*]}..."
  brew install "${MISSING_BREW[@]}"
else
  echo "  [✓] All required system tools (ffmpeg, python3, git) are already installed."
fi

# 3. Check Node.js and NPM
echo ""
echo "[3/4] Verifying Node.js and NPM environment..."
if ! command -v node &> /dev/null; then
  echo "  [!] Node.js not found. Installing Node.js via Homebrew..."
  brew install node
fi

NODE_VER=$(node -v)
NPM_VER=$(npm -v)
echo "  [✓] Node.js is installed: $NODE_VER"
echo "  [✓] NPM is installed: $NPM_VER"

# 4. Install Node dependencies & Playwright Chromium
echo ""
echo "[4/4] Installing NPM dependencies & Playwright Chromium..."
if [ -f "package.json" ]; then
  npm install --no-audit --no-fund
else
  npm install playwright --no-audit --no-fund
fi

echo "  Verifying Playwright Chromium browser..."
npx playwright install chromium

if node -e "const { chromium } = require('playwright'); chromium.launch().then(b => { b.close(); process.exit(0); }).catch(e => { console.error(e); process.exit(1); });" &> /dev/null; then
  echo "  [✓] Playwright Chromium is working and verified."
else
  echo "  [⚠️] Playwright check had issues. Re-running browser install..."
  npx playwright install --with-deps chromium
fi

echo ""
echo "======================================================================"
echo " 🎉 Build Environment Successfully Configured (Apple macOS)!"
echo "======================================================================"
echo " System Architecture: $(uname -m) ($(sw_vers -productName 2>/dev/null || echo 'macOS') $(sw_vers -productVersion 2>/dev/null || echo ''))"
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
