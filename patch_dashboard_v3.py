import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# تحديث الصورة ودمج الأيقونات المفقودة وتنسيقها
new_dashboard_content = r"""'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video, ChevronLeft, Crown, Activity, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SOVEREIGN_TITLE } from '@/lib/constants/roles';

export default function ElegantDashboard() {
  const modules = [
    { title: 'سوق العمل', desc: 'مشاريع حصرية', icon: <Briefcase size={32} className="text-emerald-400" />, link: '/ar/marketplace' },
    { title: 'مساحة العمل', desc: 'استوديو الإنتاج', icon: <MonitorPlay size={32} className="text-indigo-400" />, link: '/ar/workspace' },
    { title: 'المحفظة', desc: 'الأرباح والضمان', icon: <Wallet size={32} className="text-rose-400" />, link: '/ar/dashboard/wallet' },
    { title: 'الذكاء الاصطناعي', desc: 'مساعدك الإبداعي', icon: <BrainCircuit size={32} className="text-amber-400" />, link: '/ar/ai-studio' },
    { title: 'الامتثال', desc: 'توثيق الهوية', icon: <ShieldCheck size={32} className="text-slate-400" />, link: '/ar/kyc' },
    { title: 'المكتبة', desc: 'أصول وفيديوهات', icon: <Video size={32} className="text-cyan-400" />, link: '/ar/library' },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
            <h1 className="text-4xl font-black mb-2">مركز القيادة</h1>
            <p className="text-slate-400">مرحباً بك في Monteerly OS. كافة أنظمتك تعمل بكفاءة.</p>
        </header>

        {/* Hero Section */}
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
           <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" />
           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-black mb-2 flex items-center gap-3"><Activity className="text-indigo-500"/> نظرة سريعة على الأداء</h2>
              <p className="text-slate-300 max-w-md">نظام التحليل التراكمي لـ Monteerly يظهر نمواً بنسبة 12% هذا الأسبوع.</p>
           </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.link}>
              <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl hover:border-indigo-500/30 transition-all flex items-center gap-5">
                 <div className="p-4 bg-[#12121A] rounded-2xl border border-white/5">{mod.icon}</div>
                 <div>
                    <h3 className="text-lg font-black">{mod.title}</h3>
                    <p className="text-xs text-slate-500 font-bold">{mod.desc}</p>
                 </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_dashboard_content)
print("✅ تم دمج كل الصور، الأيقونات، والتنسيقات بنجاح!")
