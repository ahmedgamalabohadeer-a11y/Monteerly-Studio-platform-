"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useI18n();

  return (
    <button
      onClick={() => switchLanguage(language === "ar" ? "en" : "ar")}
      className="flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Switch Language"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  );
}
