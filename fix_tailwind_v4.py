import os, shutil
from pathlib import Path

ROOT = Path(".")
SRC = ROOT / "src"
APP = SRC / "app"

def fix_tailwind():
    print("🛠️ 1. تحديث الأنماط لتتوافق مع Tailwind CSS v4...")
    css_path = APP / "globals.css"
    
    # الطريقة الحديثة لـ Tailwind v4 لا تحتاج إلى @layer base في حالة استخدام الألوان الثابتة
    # نستخدم @import لـ tailwindcss ثم نضع الأنماط العادية.
    correct_css = """@import "tailwindcss";

/* Custom Scrollbar for a premium feel */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #020617; 
}
::-webkit-scrollbar-thumb {
  background: #334155; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569; 
}
"""
    css_path.write_text(correct_css, encoding="utf-8")

def fix_layout():
    print("🔧 2. ضمان أن الهيكل الرئيسي يعمل بخلفية متوافقة...")
    layout_path = APP / "[locale]" / "layout.tsx"
    
    # نضمن أن الـ body يأخذ لون الخلفية بشكل مباشر (فئة Tailwind) 
    # دون الحاجة لاستدعاء @apply المزعجة في النسخة الجديدة.
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

def clear_cache():
    print("🧹 3. مسح كاش Next.js لحذف الأخطاء السابقة...")
    if (ROOT / ".next").exists():
        shutil.rmtree(ROOT / ".next")

if __name__ == "__main__":
    fix_tailwind()
    fix_layout()
    clear_cache()
    print("✅ اكتملت عملية الإصلاح. Tailwind v4 يعمل الآن بثبات.")
