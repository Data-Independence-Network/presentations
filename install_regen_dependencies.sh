#!/usr/bin/env bash
# Forwarding wrapper — delegates to scripts/install/install_regen.sh
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "$SCRIPT_DIR/scripts/install/install_regen.sh" "$@"
