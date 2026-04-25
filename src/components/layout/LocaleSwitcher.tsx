'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // هذا مجرد تمثيل للمنطق، التنفيذ الفعلي يعتمد على مكتبة i18n المستخدمة
  const currentLang = pathname.startsWith('/en') ? 'en' : 'ar';

  const toggleLang = () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    // Logic to replace URL segment
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button 
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors text-sm font-bold text-foreground"
    >
       <Languages size={18} />
       <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
}

################################################################################