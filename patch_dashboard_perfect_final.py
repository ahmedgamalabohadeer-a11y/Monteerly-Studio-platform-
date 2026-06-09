import os

file_path = "src/app/[locale]/dashboard/page.tsx"

perfect_content = r"""'use client'
import React from 'react';
import Link from 'next/link';
import { Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video, Activity } from 'lucide-react';

export default function ElegantDashboard() {
  const modules = [
    { title: 'سوق العمل', icon: <Briefcase size={28} className="text-emerald-400" />, link: '/ar/marketplace' },
    { title: 'مساحة العمل', icon: <MonitorPlay size={28} className="text-indigo-400" />, link: '/ar/workspace' },
    { title: 'المحفظة', icon: <Wallet size={28} className="text-rose-400" />, link: '/ar/dashboard/wallet' },
    { title: 'الذكاء الاصطناعي', icon: <BrainCircuit size={28} className="text-amber-400" />, link: '/ar/ai-studio' },
    { title: 'الامتثال', icon: <ShieldCheck size={28} className="text-slate-400" />, link: '/ar/kyc' },
    { title: 'المكتبة', icon: <Video size={28} className="text-cyan-400" />, link: '/ar/library' },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-black mb-2">مركز القيادة</h1>
            <p className="text-slate-400 text-sm">مرحباً بك في Monteerly OS. كافة أنظمتك تعمل بكفاءة.</p>
        </header>

        {/* Hero Section مع صورة خلفية ثابتة */}
        <div className="relative h-48 rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl flex items-center p-8">
           <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20" />
           <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2"><Activity className="text-indigo-500"/> نظرة سريعة على الأداء</h2>
              <p className="text-slate-300 text-sm">نظام التحليل التراكمي لـ Monteerly يظهر نمواً بنسبة 12% هذا الأسبوع.</p>
           </div>
        </div>

        {/* Bento Grid المتوازن */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.link}>
              <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 hover:bg-[#12121A] transition-all flex flex-col items-center justify-center text-center gap-4 shadow-lg">
                 <div className="p-4 bg-[#05050A] rounded-2xl border border-white/5">{mod.icon}</div>
                 <h3 className="text-sm font-black text-slate-200">{mod.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(perfect_content)
print("✅ تم ضبط النسخة النهائية للداشبورد!")
