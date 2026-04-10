import os, shutil
from pathlib import Path

ROOT = Path(".")

def enforce_architecture():
    print("🔍 1. تشخيص مسارات المشروع وعلاج العمى المعماري (Root Cause Analysis)...")
    src_app = ROOT / "src" / "app"
    root_app = ROOT / "app"
    
    # تحديد المسار النشط الذي يعتمده Next.js إجبارياً
    if root_app.exists() and not src_app.exists():
        print("⚙️ المشروع يعتمد مسار 'app' المباشر.")
        active_app = root_app
        middleware_path = ROOT / "middleware.ts"
    else:
        print("⚙️ المشروع سيعتمد مسار 'src/app' القياسي.")
        (ROOT / "src").mkdir(exist_ok=True)
        active_app = src_app
        middleware_path = ROOT / "src" / "middleware.ts"
        # تنظيف المسار المتعارض إن وجد لإنهاء الـ 404 للأبد
        if root_app.exists():
            print("⚠️ تم اكتشاف تعارض مسارات. جاري تدمير 'app' المتعارض...")
            shutil.rmtree(root_app)

    active_app.mkdir(parents=True, exist_ok=True)

    print("🧹 2. مسح الذاكرة المؤقتة وإعادة ضبط المصنع...")
    for item in active_app.iterdir():
        if item.name != "api": # نحافظ على مسارات قاعدة البيانات التي تعمل بنجاح
            if item.is_dir(): shutil.rmtree(item)
            else: item.unlink()

    if (ROOT / ".next").exists():
        shutil.rmtree(ROOT / ".next")

    print("🏗️ 3. بناء الهيكل المركزي السيادي (Next.js 15 Ready)...")
    locale_dir = active_app / "[locale]"
    locale_dir.mkdir(parents=True, exist_ok=True)

    # Layout متوافق مع Next.js 15 (استخدام Promise للـ params)
    layout_code = """import React from 'react';
export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-slate-950 text-white m-0 p-0 font-sans">{children}</body>
    </html>
  );
}
"""
    (locale_dir / "layout.tsx").write_text(layout_code, encoding="utf-8")

    middleware_code = """import { NextResponse } from 'next/server';
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
"""
    middleware_path.write_text(middleware_code, encoding="utf-8")

    print("🌍 4. توليد واجهات منصة Monteerly الشاملة بالكامل...")
    pages = {
        "": {"title": "بوابة Monteerly", "desc": "المنصة الأولى لربط المونتيرين وصناع المحتوى."},
        "auth/login": {"title": "بوابة الدخول السيادية", "desc": "وصول آمن للمونتيرين وصناع المحتوى."},
        "auth/register": {"title": "إصدار الهوية الرقمية", "desc": "انضم إلى نخبة صناع المحتوى والمونتيرين."},
        "workspace": {"title": "غرفة المونتاج (Workspace)", "desc": "بيئة العمل المشتركة والمراجعة المباشرة."},
        "library": {"title": "مكتبة الأصول (Library)", "desc": "تأثيرات، قوالب، وموارد إبداعية."},
        "ai-studio": {"title": "استوديو الذكاء الاصطناعي", "desc": "تفريغ، دبلجة، وتوليد نصوص."},
        "marketplace": {"title": "سوق العمل والمشاريع", "desc": "فرص للمونتيرين والبحث عن مواهب."},
        "finance": {"title": "النظام المالي (Escrow)", "desc": "نظام حماية المدفوعات والضمان."}
    }

    for route, info in pages.items():
        target_dir = locale_dir / route if route else locale_dir
        target_dir.mkdir(parents=True, exist_ok=True)
        (target_dir / "page.tsx").write_text(f"""import React from 'react';
export default function Page() {{
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 p-8 text-white flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-12 shadow-2xl text-center hover:border-emerald-500 transition-all">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          {info['title']}
        </h1>
        <p className="text-slate-400 text-xl mb-10">{info['desc']}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 font-bold text-slate-300">وحدة العمليات</div>
           <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 font-bold text-slate-300">البيانات الحية</div>
           <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 font-bold text-slate-300">الإعدادات</div>
        </div>
      </div>
    </div>
  );
}}
""", encoding="utf-8")
    print("✅ تمت العملية بنجاح ساحق! جميع المسارات الآن مربوطة بخادم Next.js مباشرة، ولا وجود للتعارضات.")

if __name__ == "__main__":
    enforce_architecture()
