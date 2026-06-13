import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  globalIgnores([
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/coverage/**",
    "**/node_modules/**",
    "**/next-env.d.ts",

    "**/legacy_archive/**",
    "legacy_archive/**",

    "**/scripts/**",

    "**/*.js",
    "!eslint.config.mjs",
  ]),
  ...nextVitals,
  ...nextTs,
]);
