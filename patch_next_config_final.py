import os

file_path = "next.config.js"

# كتابة الإعدادات بطريقة تضمن نفاذها
strict_config = """/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // تجاهل التحذيرات على مستوى Compiler وليس فقط إعدادات التحذير
    config.ignoreWarnings = [/Critical dependency: the request of a dependency is an expression/];
    return config;
  },
};
module.exports = nextConfig;
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(strict_config)
print("✅ تم تحديث الإعدادات بنمط صارم!")
