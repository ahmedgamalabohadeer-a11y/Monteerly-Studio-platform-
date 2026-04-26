// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // إزالة eslint لأن Next 16 لم يعد يدعم هذا المفتاح في next.config
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

export default withSentryConfig(nextConfig, {
  org: "monteerly-studio-platform-1",
  project: "sentry-champagne-lantern",
  silent: true,
  widenClientFileUpload: true,
  // استبدال hideSourceMaps بإعداد sourcemaps الرسمي (لو تريد إخفاء السورسماب فعليًا)
  // راجع docs لو أردت خيارات أكثر تفصيلاً، لكن هذا الشكل مقبول وحديث:
  sourcemaps: {
    disable: true, // يعطل رفع السورسماب لسنتري
  },
  disableLogger: true,
});
