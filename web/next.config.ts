import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }, # لصور حسابات جوجل
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' } # لصور Firebase
    ],
  },
  typescript: {
    ignoreBuildErrors: true, # لتجاوز أخطاء الأنواع البسيطة أثناء التطوير السريع في Termux
  }
};

export default nextConfig;
