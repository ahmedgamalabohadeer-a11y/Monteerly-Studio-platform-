#!/data/data/com.termux/files/usr/bin/bash
set -e

if [ -z "$1" ]; then
  echo "⚠️ خطأ إداري: يرجى تحديد اسم الميزة."
  exit 1
fi

FEATURE_KEY="$1"
TARGET_DIR="$HOME/Monteerly-Studio-platform-/docs/sprints"
mkdir -p "$TARGET_DIR"
TARGET_FILE="$TARGET_DIR/${FEATURE_KEY}-production-blueprint.md"

cp "$HOME/Monteerly-Studio-platform-/docs/governance/Feature-Production-Blueprint-Template.md" "$TARGET_FILE"

echo "✅ تم بنجاح إنشاء وثيقة التخطيط للميزة: $TARGET_FILE"
