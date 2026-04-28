#!/data/data/com.termux/files/usr/bin/bash
set -e

ROOT="$HOME/Monteerly-Studio-platform-"
TEMPLATE="$ROOT/docs/governance/Feature-Production-Blueprint-Template.md"
TARGET_DIR="$ROOT/docs/sprints"

if [ -z "$1" ]; then
  echo "Usage: ./tools/new_feature_blueprint.sh feature-key"
  exit 1
fi

FEATURE_KEY="$1"
DATE="$(date +%F)"
TARGET_FILE="$TARGET_DIR/${DATE}-${FEATURE_KEY}-production-blueprint.md"

mkdir -p "$TARGET_DIR"

if [ ! -f "$TEMPLATE" ]; then
  echo "❌ Template not found: $TEMPLATE"
  exit 1
fi

if [ -f "$TARGET_FILE" ]; then
  echo "❌ Blueprint already exists: $TARGET_FILE"
  exit 1
fi

cp "$TEMPLATE" "$TARGET_FILE"
sed -i "s/- \*\*Created at\*\*:/- **Created at**: $DATE/g" "$TARGET_FILE"
sed -i "s/- \*\*Updated at\*\*:/- **Updated at**: $DATE/g" "$TARGET_FILE"

echo "✅ Blueprint created: $TARGET_FILE"
read -p "Open in nano now? (y/n): " OPEN_NOW
if [ "$OPEN_NOW" = "y" ] || [ "$OPEN_NOW" = "Y" ]; then
  nano "$TARGET_FILE"
fi
