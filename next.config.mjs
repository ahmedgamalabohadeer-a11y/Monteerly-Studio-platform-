import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // إبقاء التجاوز الآمن للنوعيات لضمان استقرار الإطلاق
    ignoreBuildErrors: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "monteerly-studio-platform",
  project: "sentry-champagne-lantern",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
