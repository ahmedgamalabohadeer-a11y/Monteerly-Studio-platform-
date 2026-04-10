'use client';

import React, { createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Language = 'ar' | 'en';

// تعريف شكل البيانات المتوقع لتجنب أخطاء TypeScript
interface I18nContextType {
  locale: string;
  language: Language; // هذا ما كان يبحث عنه LanguageSwitcher
  switchLanguage: (lang: Language) => void; // وهذه الدالة المفقودة
}

// قيم افتراضية
const I18nContext = createContext<I18nContextType>({
  locale: 'ar',
  language: 'ar',
  switchLanguage: () => {},
});

export function I18nProvider({
  children,
  locale = 'ar'
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // منطق تبديل اللغة البسيط
  const switchLanguage = (newLang: Language) => {
    if (!pathname) return;
    const currentLang = locale;
    if (newLang === currentLang) return;
    
    // استبدال كود اللغة في الرابط (مثلاً /ar/dashboard -> /en/dashboard)
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <I18nContext.Provider value={{ 
      locale, 
      language: locale as Language, 
      switchLanguage 
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
