'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video, ChevronLeft, Crown } from 'lucide-react';
import AiBiddingEngine from '@/components/market/AiBiddingEngine';
import { supabase } from '@/lib/supabase';
import { SOVEREIGN_EMAIL, SOVEREIGN_TITLE } from '@/lib/constants/roles';

export default function ElegantDashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };
    fetchUser();
  }, []);

  const isSovereign = userEmail === SOVEREIGN_EMAIL;

  const baseModules = [
    { title: 'سوق العمل', desc: 'مشاريع حصرية', icon: <Briefcase className="w-7 h-7 text-emerald-400" />, link: '/ar/jobs', grad: 'from-emerald-500/20 to-transparent' },
    { title: 'مساحة العمل', desc: 'استوديو الإنتاج', icon: <MonitorPlay className="w-7 h-7 text-indigo-400" />, link: '/ar/workspace', grad: 'from-indigo-500/20 to-transparent' },
    { title: 'المحفظة', desc: 'الأرباح والضمان', icon: <Wallet className="w-7 h-7 text-rose-400" />, link: '/ar/wallet', grad: 'from-rose-500/20 to-transparent' },
    { title: 'الذكاء الاصطناعي', desc: 'مساعدك الإبداعي', icon: <BrainCircuit className="w-7 h-7 text-amber-400" />, link: '/ar/ai-studio', grad: 'from-amber-500/20 to-transparent' },
    { title: 'المكتبة', desc: 'أصول وفيديوهات', icon: <Video className="w-7 h-7 text-cyan-400" />, link: '/ar/library', grad: 'from-cyan-500/20 to-transparent' },
    { title: 'الامتثال', desc: 'توثيق الهوية', icon: <ShieldCheck className="w-7 h-7 text-slate-400" />, link: '/ar/kyc', grad: 'from-slate-500/20 to-transparent' },
  ];

  const modules = isSovereign
    ? [
        { title: 'الغرفة المركزية', desc: 'إدارة المنصة بالكامل', icon: <Crown className="w-7 h-7 text-amber-500" />, link: '/ar/admin/sovereign', grad: 'from-amber-600/30 to-rose-600/30' },
        ...baseModules
      ]
    : baseModules;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">

        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 text-white">مركز القيادة</h1>
            <p className="text-slate-400 text-lg">
              {isSovereign ? `أهلاً بك في ${SOVEREIGN_TITLE} يا صانع الإمبراطورية.` : 'أهلاً بك يا صانع الإمبراطورية في MCOS.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {isSovereign && (
              <div className="bg-gradient-to-r from-amber-600/20 to-rose-600/20 border border-amber-500/50 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Crown className="w-5 h-5 text-amber-500 animate-pulse" />
                <span className="font-black text-sm text-amber-500">{SOVEREIGN_TITLE} نشط</span>
              </div>
            )}
            <div className="bg-slate-900 border border-emerald-500/30 px-6 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-bold text-sm text-emerald-400">النظام آمن</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <Link key={i} href={mod.link}>
                <motion.div whileHover={{ scale: 1.02 }} className={`bg-slate-900/50 border ${isSovereign && i === 0 ? 'border-amber-500/50' : 'border-slate-800'} rounded-3xl p-6 h-full relative overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${mod.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="bg-slate-950 p-4 rounded-2xl shadow-xl border border-slate-800 mb-6">{mod.icon}</div>
                    <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1 relative z-10">{mod.title}</h3>
                  <p className="text-slate-400 text-sm relative z-10">{mod.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-1 bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-[2.5rem] p-8">
            <h2 className="text-2xl font-black text-white mb-2">المساعد السيادي</h2>
            <p className="text-slate-400 text-sm mb-8">دع الذكاء اصطناعي يتفاوض نيابة عنك.</p>
            <AiBiddingEngine jobTitle="مونتاج وثائقي بطول 10 دقائق" budget={350} />
          </div>
        </div>

      </div>
    </div>
  );
}
