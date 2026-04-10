import os
from pathlib import Path

ROOT = Path(".")
APP = ROOT / "src" / "app"
LOCALE_DIR = APP / "[locale]"

def build_global_platform():
    print("🌍 1. جاري بناء الواجهة العالمية (24 صورة، نصوص احترافية، تصميم متكامل)...")
    
    # توليد كود لـ 24 صورة احترافية مع نصوصها بشكل برمجي ذكي
    images_html = ""
    categories = ["مونتاج سينمائي", "مؤثرات بصرية", "تصحيح ألوان", "موشن جرافيك", "دبلجة صوتية", "تصميم قوالب"]
    
    for i in range(1, 25):
        category = categories[i % len(categories)]
        images_html += f"""
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 aspect-video hover:border-emerald-500 transition-all duration-500 cursor-pointer shadow-lg">
          <img src="https://picsum.photos/seed/monteerly{i}/800/600" alt="Monteerly Project {i}" className="object-cover w-full h-full opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md mb-2 inline-block border border-emerald-800/50">مشروع {i}#</span>
            <h3 className="text-sm font-bold text-white shadow-black drop-shadow-md">{category} - احترافية عالية</h3>
          </div>
        </div>"""

    page_code = f"""import React from 'react';
import Link from 'next/link';

export default function GlobalLandingPage() {{
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-emerald-500/30 font-sans overflow-x-hidden">
      
      {{/* 1. HERO SECTION */}}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 font-bold mb-8 shadow-2xl z-10 backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Monteerly OS - التحديث العالمي متوفر الآن
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] z-10">
          النظام البيئي <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">الأقوى</span> <br/>
          لصناع المحتوى المرئي.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed z-10 font-medium">
          أول منصة سيادية تجمع بين مساحات العمل السحابية، أدوات الذكاء الاصطناعي، ونظام الضمان المالي (Escrow) لحماية حقوق المونتيرين وأصحاب المشاريع.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 z-10 w-full sm:w-auto">
          <Link href="/ar/auth/register" className="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2">
            ابدأ رحلتك مجاناً
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/ar/workspace" className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center">
            استكشف مساحة العمل
          </Link>
        </div>
      </section>

      {{/* 2. FEATURES SECTION */}}
      <section className="py-24 bg-slate-900/50 border-y border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-950 border border-slate-800 p-10 rounded-3xl hover:border-emerald-500/50 transition-colors group">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">بنية تحتية سيادية</h3>
            <p className="text-slate-400 leading-relaxed text-lg">قواعد بيانات لا مركزية وحماية فائقة لملفاتك ومشاريعك باستخدام أحدث تقنيات التشفير.</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-10 rounded-3xl hover:border-emerald-500/50 transition-colors group">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">ضمان مالي (Escrow)</h3>
            <p className="text-slate-400 leading-relaxed text-lg">لا مزيد من ضياع الحقوق. المحرك المالي يحتجز الأموال بأمان حتى يتم تسليم المشروع بنجاح.</p>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-10 rounded-3xl hover:border-emerald-500/50 transition-colors group">
            <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">استوديو الذكاء الاصطناعي</h3>
            <p className="text-slate-400 leading-relaxed text-lg">أدوات ذكية متكاملة لتفريغ الصوتيات، دبلجة الفيديوهات، وتوليد الأفكار في ثوانٍ معدودة.</p>
          </div>
        </div>
      </section>

      {{/* 3. SHOWCASE GALLERY (24 IMAGES BENTO GRID) */}}
      <section className="py-32 px-6 max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">مكتبة الأعمال والمشاريع</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">استكشف 24 مساحة عمل حية تعكس قوة وإمكانيات منصة Monteerly في إدارة المشاريع الاحترافية.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {images_html}
        </div>
      </section>

      {{/* 4. CTA & FOOTER */}}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/50 rounded-3xl p-12 md:p-20 text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">مستعد للارتقاء بمسيرتك المهنية؟</h2>
          <p className="text-xl text-emerald-200/70 mb-10 max-w-2xl mx-auto">انضم إلى آلاف المونتيرين وصناع المحتوى الذين يثقون في Monteerly لإدارة أعمالهم وحماية حقوقهم.</p>
          <Link href="/ar/auth/register" className="inline-block px-12 py-5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl">
            أنشئ حسابك السيادي الآن
          </Link>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-800/50 pt-10">
          <div className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Monteerly<span className="text-slate-100">OS</span>
          </div>
          <p className="text-slate-500 font-medium">© 2026 جميع الحقوق محفوظة لمنصة Monteerly.</p>
          <div className="flex gap-6 text-slate-400 font-medium">
            <Link href="#" className="hover:text-emerald-400 transition-colors">الشروط والأحكام</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">الخصوصية</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">الدعم الفني</Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
}}
"""
    (LOCALE_DIR / "page.tsx").write_text(page_code, encoding="utf-8")
    print("✅ تم بناء الواجهة العالمية بنجاح. تم زرع 24 صورة تفاعلية ونصوص احترافية بضغطة واحدة.")

if __name__ == "__main__":
    build_global_platform()
