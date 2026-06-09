import os

file_path = "next.config.js"

# نقوم بقراءة الملف الحالي أو إنشاء واحد جديد إذا لم يكن موجوداً
if os.path.exists(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
else:
    content = "/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;"

# إضافة إعدادات الـ Webpack لتجاهل التحذيرات
webpack_config = """
const nextConfig = {
  webpack: (config, { isServer }) => {
    // تجاهل تحذيرات المكتبات التي تستخدم require ديناميكي
    config.ignoreWarnings = [
      { module: /node_modules\/require-in-the-middle/ },
      { module: /node_modules\/@opentelemetry/ }
    ];
    return config;
  },
};
"""

# استبدال الإعدادات القديمة (إذا وجدت) أو الكتابة فوقها
with open(file_path, "w", encoding="utf-8") as f:
    f.write(webpack_config)
print("✅ تم تحديث next.config.js لإخفاء التحذيرات نهائياً!")
