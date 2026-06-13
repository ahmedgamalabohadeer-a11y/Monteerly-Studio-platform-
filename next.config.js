/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    config.ignoreWarnings = [/Critical dependency/];
    
    // إبقاء إعدادات بيئة التطوير التي تمنع الانهيار كما هي
    if (dev) {
      config.watchOptions = {
        ignored: ['**/node_modules', '/data/**', '/system/**', '/storage/**', '/proc/**', '/sys/**', '/'],
        poll: 1000,
        aggregateTimeout: 300,
      };
      config.resolve = config.resolve || {};
      config.resolve.roots = [process.cwd()];
    }
    return config;
  },
  // تم تغييرها إلى false لتفعيل الأمان ومنع تسرب الأخطاء البرمجية
  typescript: { ignoreBuildErrors: false },
};

module.exports = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
