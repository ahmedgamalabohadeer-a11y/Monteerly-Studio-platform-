'use client'
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
    { title: 'العقود النشطة', icon: <Briefcase size={28} className="text-indigo-400" />, link: '/ar/dashboard/contracts' },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* نظام التنبيهات السيادي */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-amber-500">
               <Activity className="animate-pulse" />
               <span className="text-sm font-bold">تنبيه سيادي: لديك عقد &quot;تصوير تراثي&quot; ينتهي موعد تسليمه اليوم!</span>
            </div>
            <Link href="/ar/dashboard/contracts" className="bg-amber-500 text-black px-4 py-1 rounded-lg text-xs font-black">
               معالجة العقد
            </Link>
        </div>

        <header className="mb-10">
            <h1 className="text-3xl font-black mb-2">مركز القيادة</h1>
            <p className="text-slate-400 text-sm">مرحباً بك في Monteerly OS. كافة أنظمتك تعمل بكفاءة.</p>
        </header>

        <div className="relative h-48 rounded-[2rem] overflow-hidden mb-8 border border-white/5 shadow-2xl flex items-center p-8 bg-gradient-to-br from-indigo-950 via-slate-950 to-black">
           <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white"><Activity className="text-indigo-400"/> نظرة سريعة على الأداء</h2>
              <p className="text-slate-300 text-sm">نظام التحليل التراكمي لـ Monteerly يظهر نمواً بنسبة 12% هذا الأسبوع.</p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.link}>
              <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center text-center gap-4 shadow-lg">
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
