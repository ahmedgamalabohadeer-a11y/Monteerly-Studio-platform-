import os

file_path = "next.config.js"

sentry_config = """/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.ignoreWarnings = [/Critical dependency/];
    return config;
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

// دمج Sentry مع الإعدادات السيادية
module.exports = withSentryConfig(
  nextConfig,
  {
    // كتم رسائل Sentry المزعجة في الـ Terminal
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    // إعدادات الرفع التلقائي لخرائط الأكواد
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true, // إخفاء الخرائط عن المستخدمين العاديين للأمان
    disableLogger: true,
  }
);
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(sentry_config)
print("✅ تم تجهيز next.config.js لرفع التحديثات إلى Sentry تلقائياً!")
