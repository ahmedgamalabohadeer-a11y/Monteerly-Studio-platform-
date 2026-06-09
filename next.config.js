/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // تجاهل التحذيرات على مستوى Compiler وليس فقط إعدادات التحذير
    config.ignoreWarnings = [/Critical dependency: the request of a dependency is an expression/];
    return config;
  },
};
module.exports = nextConfig;
