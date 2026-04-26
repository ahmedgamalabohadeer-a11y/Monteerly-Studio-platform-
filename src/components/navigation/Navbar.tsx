'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, Menu } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">MONTEERLY</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-300">
          <Link href="#features" className="hover:text-indigo-400 transition-colors">الميزات</Link>
          <Link href="#solutions" className="hover:text-indigo-400 transition-colors">الحلول اللوجستية</Link>
          <Link href="#pricing" className="hover:text-indigo-400 transition-colors">الأسعار</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/ar/login" className="text-sm font-bold text-slate-400 hover:text-white">دخول</Link>
          <Link href="/ar/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            ابدأ الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
