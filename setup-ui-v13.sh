#!/bin/bash
set -e
echo "✨ إطلاق Agent Ultra V13 (The UI/UX Architect)..."

cat > agent_v13_ui.py << 'EOF_PYTHON'
import os
from pathlib import Path

ROOT = Path(".")
SRC = ROOT / "src"
APP = SRC / "app"
COMPONENTS = SRC / "components"

def build_global_styles():
    print("🎨 1. هندسة الهوية البصرية (Global Styles)...")
    # ضمان وجود ملف globals.css مع تخصيص الـ Scrollbar والخلفيات
    css_path = SRC / "app" / "globals.css"
    css_path.write_text("""
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-950 text-slate-100;
  }
}

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
""", encoding="utf-8")

def build_shared_components():
    print("🧩 2. بناء مكونات النظام (Components)...")
    COMPONENTS.mkdir(exist_ok=True)
    ui_dir = COMPONENTS / "ui"
    ui_dir.mkdir(exist_ok=True)

    # مكون الـ Navbar السيادي
    (ui_dir / "Navbar.tsx").write_text("""import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/ar" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Monteerly<span className="text-slate-100">OS</span>
        </Link>
        <div className="hidden md:flex gap-8 font-bold text-slate-300">
          <Link href="/ar/workspace" className="hover:text-emerald-400 transition-colors">مساحة العمل</Link>
          <Link href="/ar/ai-studio" className="hover:text-emerald-400 transition-colors">استوديو AI</Link>
          <Link href="/ar/library" className="hover:text-emerald-400 transition-colors">مكتبة الأصول</Link>
          <Link href="/ar/marketplace" className="hover:text-emerald-400 transition-colors">سوق العمل</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/ar/auth/login" className="px-6 py-2.5 rounded-full font-bold text-slate-300 hover:bg-slate-800 transition-colors">
            دخول
          </Link>
          <Link href="/ar/auth/register" className="px-6 py-2.5 rounded-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 transition-all hover:scale-105">
            ابدأ الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
""", encoding="utf-8")

def inject_layout():
    print("🏗️ 3. حقن الـ Navbar في الهيكل الرئيسي (Layout)...")
    layout_path = APP / "[locale]" / "layout.tsx"
    layout_path.write_text("""import React from 'react';
import '../../globals.css';
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
""", encoding="utf-8")

def build_stunning_pages():
    print("🌍 4. تصميم واجهات احترافية عالمية...")
    locale_dir = APP / "[locale]"
    
    # 1. الصفحة الرئيسية (Landing Page)
    landing_code = """import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="z-10 text-center max-w-5xl px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-emerald-400 font-bold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          المنصة السيادية الأولى لصناع المحتوى
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
          حرر إبداعك. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500">
            أدِر أعمالك بسيادة.
          </span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          نظام تشغيل متكامل يربط المونتيرين بصناع المحتوى. مساحة عمل سحابية، أدوات ذكاء اصطناعي لتوليد الأفكار، ونظام ضمان مالي (Escrow) يحمي حقوق الجميع.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/ar/workspace" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/50 transition-all hover:scale-105 hover:-translate-y-1">
            ادخل مساحة العمل
          </Link>
          <Link href="/ar/marketplace" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-2xl font-black text-lg transition-all hover:scale-105">
            استكشف سوق العمل
          </Link>
        </div>
      </div>
    </div>
  );
}
"""
    (locale_dir / "page.tsx").write_text(landing_code, encoding="utf-8")

    # 2. صفحة تسجيل الدخول (مع ربط Supabase الفعلي)
    auth_dir = locale_dir / "auth" / "login"
    auth_code = """'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/ar/workspace');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-black mb-2 text-center">مرحباً بعودتك</h2>
        <p className="text-slate-400 text-center mb-8">أدخل بيانات هويتك السيادية للوصول للمنصة</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">البريد الإلكتروني</label>
            <input type="email" required className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">كلمة المرور</label>
            <input type="password" required className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {error && <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-bold">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/50">
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
"""
    (auth_dir / "page.tsx").write_text(auth_code, encoding="utf-8")

if __name__ == "__main__":
    build_global_styles()
    build_shared_components()
    inject_layout()
    build_stunning_pages()
    print("✅ تم بناء الهوية البصرية، الـ Navbar، وتصميم واجهات احترافية عالمية بنجاح!")
EOF_PYTHON

python3 agent_v13_ui.py
echo "🚀 جاهز للإبهار! شغل الخادم الآن وانظر للفرق."
