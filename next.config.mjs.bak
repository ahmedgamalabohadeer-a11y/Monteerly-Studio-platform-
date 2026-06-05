/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // 1. الحل الجذري: تعطيل الذاكرة المؤقتة (Cache) التي تسبب الانهيار في Termux
    config.cache = false;

    // 2. كتم جميع التحذيرات المزعجة
    config.ignoreWarnings = [
      /Critical dependency/,
      /Unable to snapshot resolve dependencies/
    ];

    if (dev) {
      // 3. تقييد صارم لمسار المراقبة ومنع الصعود إلى مجلدات النظام
      config.watchOptions = {
        ignored: ['**/node_modules', '/data/**', '/system/**', '/storage/**', '/proc/**', '/sys/**', '/'],
        poll: 1000,
        aggregateTimeout: 300,
      };
      
      // 4. الحل الجذري لمنع scandir '/': تقييد جذور البحث لمجلد المشروع فقط
      config.resolve = config.resolve || {};
      config.resolve.roots = [process.cwd()];
    }
    return config;
  },
};

export default nextConfig;
