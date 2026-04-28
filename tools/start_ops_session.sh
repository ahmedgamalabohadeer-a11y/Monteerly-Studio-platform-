#!/data/data/com.termux/files/usr/bin/bash
set -e
ROOT="$HOME/Monteerly-Studio-platform-"
cd "$ROOT"

echo "=================================================="
echo " Monteerly Ops Session"
echo "=================================================="
echo "📍 Repo: $(pwd)"
echo "🌿 Branch: $(git branch --show-current)"
echo "📝 Git status:"
git status --short || true
echo "--------------------------------------------------"
echo "📦 Recent commits:"
git log --oneline -n 5 || true
echo "--------------------------------------------------"
echo "🗂 Available blueprints:"
if [ -x "$ROOT/tools/list_blueprints.sh" ]; then
  "$ROOT/tools/list_blueprints.sh" || true
else
  echo "list_blueprints.sh not ready"
fi
echo "=================================================="
