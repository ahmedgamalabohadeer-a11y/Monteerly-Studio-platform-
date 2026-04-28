#!/data/data/com.termux/files/usr/bin/bash
set -e
ROOT="$HOME/Monteerly-Studio-platform-"
TARGET_DIR="$ROOT/docs/sprints"

if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ No blueprints directory found: $TARGET_DIR"
  exit 1
fi

find "$TARGET_DIR" -maxdepth 1 -type f -name "*production-blueprint.md" | sort | xargs -n 1 basename
