'use client'
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video } from 'lucide-react';
import AiBiddingEngine from '@/components/market/AiBiddingEngine';

export default function UserDashboard() {
  const modules = [
    { title: 'سوق العمل السيادي', desc: 'تصفح المشاريع بنظام الضمان', icon: <Briefcase className="w-8 h-8 text-emerald-400" />, link: '/ar/jobs', color: 'emerald' },
    { title: 'مساحة العمل (Workspace)', desc: 'نظام التشغيل، الرندر، والرفع', icon: <MonitorPlay className="w-8 h-8 text-indigo-400" />, link: '/ar/workspace', color: 'indigo' },
    { title: 'المحفظة المالية', desc: 'أرباحك، الضرائب، وسحب الأموال', icon: <Wallet className="w-8 h-8 text-rose-400" />, link: '/ar/wallet', color: 'rose' },
    { title: 'استوديو الذكاء الاصطناعي', desc: 'التوأم الرقمي والمترجم', icon: <BrainCircuit className="w-8 h-8 text-amber-400" />, link: '/ar/ai-studio', color: 'amber' },
    { title: 'مكتبة الأصول', desc: 'فيديوهات خام وانتقالات', icon: <Video className="w-8 h-8 text-cyan-400" />, link: '/ar/library', color: 'cyan' },
    { title: 'توثيق الهوية (KYC)', desc: 'رفع حدود السحب المالي', icon: <ShieldCheck className="w-8 h-8 text-slate-400" />, link: '/ar/kyc', color: 'slate' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-10 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-indigo-500" /> مركز التحكم
            </h1>
            <p className="text-slate-400">أهلاً بك في منصتك الإنتاجية المتكاملة.</p>
          </div>
          <div className="flex gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">KYC: غير موثق</span>
            <span className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-bold border border-indigo-500/20">الرصيد: $0.00</span>
          </div>
        </header>

        {/* شبكة التطبيقات (OS App Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.link} className={`bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-${mod.color}-500/50 hover:bg-slate-800/50 transition-all group flex flex-col items-start`}>
              <div className={`bg-slate-950 p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {mod.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{mod.title}</h3>
              <p className="text-slate-400 text-sm">{mod.desc}</p>
            </Link>
          ))}
        </div>

        {/* تجربة العطاءات الذكية في الداشبورد */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8">
          <h2 className="text-2xl font-black mb-2">تجربة أدوات الـ AI السريعة</h2>
          <p className="text-slate-400 mb-6">جرب كيف يقوم الذكاء الاصطناعي بكتابة عروض العمل نيابة عنك.</p>
          <div className="max-w-2xl">
            <AiBiddingEngine jobTitle="مونتاج فيديو وثائقي لقناة يوتيوب بأسلوب المغناطيس" budget={250} />
          </div>
        </div>

      </div>
    </div>
  );
}
