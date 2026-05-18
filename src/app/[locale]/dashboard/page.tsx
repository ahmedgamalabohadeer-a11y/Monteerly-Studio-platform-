'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video, ChevronLeft, Crown, Activity } from 'lucide-react';
import AiBiddingEngine from '@/components/market/AiBiddingEngine';
import { supabase } from '@/lib/supabase';
import { SOVEREIGN_EMAIL, SOVEREIGN_TITLE } from '@/lib/constants/roles';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function ElegantDashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) setUserEmail(session.user.email);
    };
    fetchUser();
  }, []);

  const isSovereign = userEmail === SOVEREIGN_EMAIL;

  const baseModules = [
    { title: 'سوق العمل', desc: 'مشاريع حصرية', icon: <Briefcase className="w-7 h-7 text-emerald-400" />, link: '/ar/marketplace', grad: 'from-emerald-500/20 to-transparent' },
    { title: 'مساحة العمل', desc: 'استوديو الإنتاج', icon: <MonitorPlay className="w-7 h-7 text-indigo-400" />, link: '/ar/workspace', grad: 'from-indigo-500/20 to-transparent' },
    { title: 'المحفظة', desc: 'الأرباح والضمان', icon: <Wallet className="w-7 h-7 text-rose-400" />, link: '/ar/wallet', grad: 'from-rose-500/20 to-transparent' },
    { title: 'الذكاء الاصطناعي', desc: 'مساعدك الإبداعي', icon: <BrainCircuit className="w-7 h-7 text-amber-400" />, link: '/ar/ai-studio', grad: 'from-amber-500/20 to-transparent' },
    { title: 'المكتبة', desc: 'أصول وفيديوهات', icon: <Video className="w-7 h-7 text-cyan-400" />, link: '/ar/library', grad: 'from-cyan-500/20 to-transparent' },
    { title: 'الامتثال', desc: 'توثيق الهوية', icon: <ShieldCheck className="w-7 h-7 text-slate-400" />, link: '/ar/kyc', grad: 'from-slate-500/20 to-transparent' },
  ];

  const modules = isSovereign ? [ { title: 'الغرفة المركزية', desc: 'إدارة المنصة بالكامل', icon: <Crown className="w-7 h-7 text-amber-500" />, link: '/ar/admin/sovereign', grad: 'from-amber-600/30 to-rose-600/30' }, ...baseModules ] : baseModules;

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-2 text-white flex items-center gap-3">
              مركز القيادة
            </h1>
            <p className="text-slate-400 text-sm md:text-lg">مرحباً بك في Monteerly Studio. هذه لمحة سريعة عن مشاريعك اليوم.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isSovereign && (
              <div className="bg-gradient-to-r from-amber-600/20 to-rose-600/20 border border-amber-500/50 px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Crown className="w-4 h-4 text-amber-500 animate-pulse" />
                <span className="font-black text-xs text-amber-500">{SOVEREIGN_TITLE} نشط</span>
              </div>
            )}
            <div className="bg-slate-900 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-emerald-400">محمي بتشفير AES-256</span>
            </div>
          </div>
        </header>

        {/* دمج صورة التحليلات الذكية من الـ 24 صورة */}
        <div className="mb-8 rounded-[2rem] overflow-hidden border border-white/10 relative h-64 md:h-80 group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/60 to-transparent z-10"></div>
          <img src={MCOS_ASSETS.techAndAi.analytics.src} alt="Analytics" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 z-20 flex flex-col md:flex-row items-end justify-between gap-4">
             <div>
               <h2 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-2"><Activity className="w-6 h-6 text-indigo-400"/> نظرة سريعة على الأداء</h2>
               <p className="text-slate-300 text-sm">يحلل المساعد الإخراجي نشاطك لاقتراح أفضل المشاريع.</p>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg">توليد تقرير سيادي</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {modules.map((mod, i) => (
              <Link key={i} href={mod.link}>
                <motion.div whileHover={{ scale: 1.02 }} className={`bg-[#0A0A0F] border ${isSovereign && i === 0 ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/5'} rounded-3xl p-5 md:p-6 h-full relative overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${mod.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="bg-[#12121A] p-3 md:p-4 rounded-2xl shadow-xl border border-white/5 mb-4 md:mb-6">{mod.icon}</div>
                    <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1 relative z-10">{mod.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm relative z-10">{mod.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-1 bg-gradient-to-b from-indigo-900/20 to-[#0A0A0F] border border-indigo-500/20 rounded-[2.5rem] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">المساعد الإخراجي (Co-Pilot)</h2>
            <p className="text-slate-400 text-xs md:text-sm mb-6">ينوب عنك في التفاوض لتعظيم أرباحك.</p>
            <AiBiddingEngine jobTitle="مونتاج وثائقي بطول 10 دقائق" budget={350} />
          </div>
        </div>
      </div>
    </div>
  );
}
