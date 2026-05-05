/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // 1. كتم تحذيرات Prisma و OpenTelemetry المزعجة
    config.ignoreWarnings = [
      /Critical dependency/,
      /Unable to snapshot resolve dependencies/
    ];

    // 2. عزل محرك المراقبة (Watchpack) لمنعه من فحص ملفات الأندرويد المحظورة
    if (dev) {
      config.watchOptions = {
        ignored: [
          '**/node_modules/**', 
          '/data/**', 
          '/system/**', 
          '/storage/**', 
          '/proc/**', 
          '/sys/**', 
          '/' // منع الوصول لجذر النظام نهائياً
        ],
        poll: 1000,
      };
    }
    return config;
  },
};

export default nextConfig;
