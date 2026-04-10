import os
from pathlib import Path
import shutil

ROOT = Path(".")
SRC = ROOT / "src"
APP = SRC / "app"
LOCALE_DIR = APP / "[locale]"

def fix_css_and_layout():
    print("🛠️ 1. جاري إصلاح مسار الأنماط (Global CSS)...")
    
    # التأكد من وجود globals.css في مكانه الصحيح
    css_path = APP / "globals.css"
    css_path.write_text("""
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-950 text-slate-100;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #020617; }
::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #475569; }
""", encoding="utf-8")

    print("🔧 2. جاري تصحيح استدعاء الأنماط في الهيكل الرئيسي (Layout)...")
    layout_path = LOCALE_DIR / "layout.tsx"
    
    # استخدام المسار المطلق للمشروع '@/app/globals.css' بدلاً من المسار النسبي المعرض للخطأ
    corrected_layout = """import React from 'react';
import '@/app/globals.css';
import Navbar from '@/components/ui/Navbar';

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30">
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
"""
    layout_path.write_text(corrected_layout, encoding="utf-8")

    print("🧹 3. مسح الذاكرة المؤقتة (Cache)...")
    if (ROOT / ".next").exists():
        shutil.rmtree(ROOT / ".next")

if __name__ == "__main__":
    fix_css_and_layout()
    print("✅ تم إصلاح العطل بنجاح. الواجهة جاهزة للعمل!")
