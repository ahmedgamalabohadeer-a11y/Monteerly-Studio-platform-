#!/data/data/com.termux/files/usr/bin/bash
set -e
echo "🛡️ بدء تحديث عقل المنصة (MCOS Brain)..."

mkdir -p /sdcard/Download/monteerly_source
mv /sdcard/Download/*.md /sdcard/Download/monteerly_source/ 2>/dev/null || true
mv /sdcard/Download/*.docx /sdcard/Download/monteerly_source/ 2>/dev/null || true
mv /sdcard/Download/*.pdf /sdcard/Download/monteerly_source/ 2>/dev/null || true

cd ~/monteerly_ai_core
python ultimate_builder.py

cp Monteerly-Platform-Ultimate-Blueprint.md ~/Monteerly-Studio-platform-/docs/vision/
cd ~/Monteerly-Studio-platform-
git add docs/vision/Monteerly-Platform-Ultimate-Blueprint.md
git commit -m "Docs(Vision): Auto-refresh Ultimate Blueprint" || true
git push origin main
echo "🎉 اكتمل التحديث!"
