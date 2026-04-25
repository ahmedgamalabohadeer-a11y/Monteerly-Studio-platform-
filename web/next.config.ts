import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // نقل الخاصية للمستوى الرئيسي لإسكات التحذير
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
