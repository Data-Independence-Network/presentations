#!/usr/bin/env bash
set -e

# ==============================================================================
# Turbase Presentation Suite — TTS Audio Regeneration Installer (Apple macOS)
# Index: 02-MACOS-REGEN
# Installs all required software on Apple macOS for Neural TTS speech synthesis
# and full regeneration, calling the base build installation script first.
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$SCRIPT_DIR"

echo "======================================================================"
echo " 🎙️  Installing Turbase Presentation Regeneration & TTS Dependencies (Apple macOS)"
echo "======================================================================"

# 1. First run the macOS base build installer
echo ""
echo "[Step 1/3] Executing Base Build Software Installer (macOS)..."
bash "$SCRIPT_DIR/scripts/install/01_install_build_dependencies_macos.sh"

# 2. Install Neural TTS Node modules
echo ""
echo "[Step 2/3] Installing Neural TTS Node modules (node-edge-tts)..."
npm install node-edge-tts --no-audit --no-fund
echo "  [✓] node-edge-tts installed successfully."

# 3. Check for TTS API Key file
echo ""
echo "[Step 3/3] Checking TTS API Key configuration..."
KEY_FILE="text_to_speech_mcp_Open_API_key.txt"

if [ -f "$KEY_FILE" ] && [ -s "$KEY_FILE" ]; then
  echo "  [✓] Found TTS API key file: $KEY_FILE"
else
  echo "  [⚠️] Note: '$KEY_FILE' is missing or empty."
  echo "      Audio synthesis (npm run regen-overall / npm run regen-*) requires an API key."
  echo "      Please create '$KEY_FILE' in the repository root containing your TTS API key."
  if [ ! -f "$KEY_FILE" ]; then
    touch "$KEY_FILE"
    echo "      Created empty template file: $KEY_FILE"
  fi
fi

# Quick test of node-edge-tts
node -e "try { require('node-edge-tts'); console.log('  [✓] node-edge-tts module verified.'); } catch(e) { console.error('  [❌] Module check failed:', e.message); process.exit(1); }"

echo ""
echo "======================================================================"
echo " 🎉 Full Regeneration & TTS Environment Successfully Configured (Apple macOS)!"
echo "======================================================================"
echo " You can now synthesize new neural audio and regenerate presentations:"
echo "   npm run regen-platform-01"
echo "   npm run regen-overall"
echo "   npm run regenerate-all"
echo "======================================================================"
