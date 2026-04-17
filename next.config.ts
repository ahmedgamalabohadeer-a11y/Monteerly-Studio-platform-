import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  }
};

export default withSentryConfig(nextConfig, {
  org: "monteerly-studio-platform-1",
  project: "sentry-champagne-lantern",
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true
});