import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/ar" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          monteerly <span className="text-slate-100 font-medium text-lg">Studio platform</span>
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
