#!/data/data/com.termux/files/usr/bin/bash
set -e

ROOT="$HOME/Monteerly-Studio-platform-"
TEMPLATE="$ROOT/docs/governance/Feature-Production-Blueprint-Template.md"
TARGET_DIR="$ROOT/docs/sprints"

if [ -z "$1" ]; then
  echo "⚠️ Usage: ./tools/new_feature_blueprint.sh feature-name"
  exit 1
fi

FEATURE_KEY="$1"
DATE="$(date +%F)"
TARGET_FILE="$TARGET_DIR/${DATE}-${FEATURE_KEY}-blueprint.md"

mkdir -p "$TARGET_DIR"

cp "$TEMPLATE" "$TARGET_FILE"
# تحديث التاريخ تلقائياً داخل الملف
sed -i "s/\[DATE\]/$DATE/g" "$TARGET_FILE"

echo "✅ Blueprint Created: $TARGET_FILE"
read -p "❓ Open in nano for editing? (y/n): " choice
if [ "$choice" == "y" ]; then
    nano "$TARGET_FILE"
fi
