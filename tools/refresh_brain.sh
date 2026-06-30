#!/usr/bin/env bash
set -euo pipefail

echo "🛡️ بدء تحديث عقل المنصة (MCOS Brain)..."

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

BRAIN_CANDIDATES=(
  "$PROJECT_ROOT/.docs/monteerly_unified_executive_document.md"
  "$PROJECT_ROOT/.docs/vision/Monteerly-Master-Brain.md"
  "$PROJECT_ROOT/.docs/vision/Monteerly-Platform-Ultimate-Blueprint.md"
  "$PROJECT_ROOT/.docs/MASTER_BRAIN.md"
)

MASTER_BRAIN=""
for f in "${BRAIN_CANDIDATES[@]}"; do
  if [ -f "$f" ]; then
    MASTER_BRAIN="$(readlink -f "$f")"
    break
  fi
done

if [ -z "${MASTER_BRAIN:-}" ]; then
  echo "❌ ERROR: Master brain document not found."
  exit 1
fi

echo "🧠 Using master brain: $MASTER_BRAIN"

mkdir -p "$PROJECT_ROOT/docs/vision"
mkdir -p "$PROJECT_ROOT/.docs/runtime"

cp "$MASTER_BRAIN" "$PROJECT_ROOT/docs/vision/Monteerly-Platform-Ultimate-Blueprint.md"
cp "$MASTER_BRAIN" "$PROJECT_ROOT/.docs/runtime/brain.current.md"

sha256sum "$MASTER_BRAIN" | tee "$PROJECT_ROOT/.docs/runtime/brain.current.sha256"

echo "✅ Brain synchronized successfully."
echo "📁 Canonical source: $MASTER_BRAIN"
echo "📁 Synced blueprint: $PROJECT_ROOT/docs/vision/Monteerly-Platform-Ultimate-Blueprint.md"
echo "📁 Runtime brain: $PROJECT_ROOT/.docs/runtime/brain.current.md"
