import os

file_path = "next.config.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# إزالة السطر المسبب للتحذير
content = content.replace("  eslint: { ignoreDuringBuilds: true },\n", "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم تنظيف إعدادات Next.js وإنشاء ملف التتبع!")
