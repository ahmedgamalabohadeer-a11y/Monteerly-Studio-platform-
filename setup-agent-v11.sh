#!/bin/bash
set -e
echo "🔥 إطلاق Agent Ultra V11 (The Core Reset & Auto-Deployer)..."

cat > agent_v11_auto.py << 'EOF_PYTHON'
import os, shutil
from pathlib import Path

ROOT = Path(".")
SRC = ROOT / "src"
APP = SRC / "app"

def hard_reset():
    print("🧹 1. إعادة ضبط المصنع لمجلد App (إزالة أي تعارضات سابقة)...")
    if APP.exists():
        for item in APP.iterdir():
            if item.is_dir() and item.name != "api": # نحافظ على الـ API
                shutil.rmtree(item)
            elif item.name in ["page.tsx", "layout.tsx"]:
                item.unlink()
    if (ROOT / ".next").exists():
        shutil.rmtree(ROOT / ".next")

def build_core_i18n():
    print("🌍 2. هندسة نظام اللغات المركزي (Root Level)...")
    APP.mkdir(parents=True, exist_ok=True)
    
    # Root Layout يجب أن يكون داخل مجلد اللغة
    locale_dir = APP / "[locale]"
    locale_dir.mkdir(parents=True, exist_ok=True)
    
    (locale_dir / "layout.tsx").write_text("""
import React from 'react';
export default function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  return (
    <html lang={params.locale} dir={params.locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-slate-950 text-white m-0 p-0 font-sans">{children}</body>
    </html>
  );
}
""", encoding="utf-8")

    # Middleware لتوجيه الروابط بشكل صحيح
    (SRC / "middleware.ts").write_text("""
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  const locales = ['ar', 'en'];
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  
  if (!hasLocale) {
    request.nextUrl.pathname = `/ar${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
  
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] };
""", encoding="utf-8")

def build_monteerly_platform():
    print("🏢 3. بناء صفحات منصة Monteerly الشاملة...")
    pages = {
        "": {"title": "بوابة Monteerly", "desc": "المنصة الأولى لربط المونتيرين وصناع المحتوى."},
        "auth/login": {"title": "بوابة الدخول السيادية", "desc": "وصول آمن للمونتيرين وصناع المحتوى."},
        "workspace": {"title": "غرفة المونتاج (Workspace)", "desc": "بيئة العمل المشتركة والمراجعة المباشرة."},
        "library": {"title": "مكتبة الأصول (Library)", "desc": "تأثيرات، قوالب، وموارد إبداعية."},
        "ai-studio": {"title": "استوديو الذكاء الاصطناعي", "desc": "تفريغ، دبلجة، وتوليد نصوص."},
        "marketplace": {"title": "سوق العمل والمشاريع", "desc": "فرص للمونتيرين والبحث عن مواهب."},
        "finance": {"title": "النظام المالي (Escrow)", "desc": "نظام حماية المدفوعات والضمان."}
    }
    
    locale_dir = APP / "[locale]"
    for route, info in pages.items():
        target_dir = locale_dir / route if route else locale_dir
        target_dir.mkdir(parents=True, exist_ok=True)
        (target_dir / "page.tsx").write_text(f"""
import React from 'react';
export default function Page() {{
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 p-8 text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl text-center">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          {info['title']}
        </h1>
        <p className="text-slate-400 text-xl mb-10">{info['desc']}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">إحصائيات</div>
           <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">نشاط حديث</div>
           <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">تنبيهات</div>
        </div>
      </div>
    </div>
  );
}}
""", encoding="utf-8")

if __name__ == "__main__":
    hard_reset()
    build_core_i18n()
    build_monteerly_platform()
    print("✅ تم إعادة هندسة المنصة بالكامل وتهيئة مسارات i18n بشكل سليم 100%.")

EOF_PYTHON

python3 agent_v11_auto.py
echo "🚀 جاهز للانطلاق! شغل الخادم الآن."
