"use client";
import React from 'react';
import { useI18n, Language } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, switchLanguage } = useI18n();

  return (
    <button
      onClick={() => switchLanguage(language === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
      aria-label="Switch Language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{language}</span>
    </button>
  );
}
