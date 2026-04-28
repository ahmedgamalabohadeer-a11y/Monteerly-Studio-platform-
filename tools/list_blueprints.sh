#!/data/data/com.termux/files/usr/bin/bash
# Monteerly List Blueprints - v1.1 (Robust)
DIRECTORY="$HOME/Monteerly-Studio-platform-/docs/sprints"

if [ ! -d "$DIRECTORY" ] || [ -z "$(ls -A "$DIRECTORY" 2>/dev/null)" ]; then
  echo "ℹ️  لا يوجد مخططات (Blueprints) مسجلة حتى الآن."
else
  ls -1 "$DIRECTORY"/*blueprint.md 2>/dev/null | xargs -n 1 basename
fi
