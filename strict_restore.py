import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم استعادة الملف: {path}")

# ==============================================================================
# 1. استعادة الصفحة الرئيسية الأصلية (Landing Page) حرفياً من الملف المرفق
# ==============================================================================
landing_page_original = """'use client';

import { useLang } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import SocialProofToast from "@/components/SocialProofToast"; // ✅ New Import
import Link from "next/link";
import { 
motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Play, ShieldCheck, Zap, Globe2, Layers, Lock,
  Cpu, CheckCircle2, Star, Search, Quote, Layout, Users, 
  TrendingUp, Briefcase, Award, Monitor, ChevronDown, HelpCircle,
  Smartphone, Video, QrCode
} from "lucide-react";

export default function Home() {
  const { t, lang } = useLang();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative min-h-screen font-sans bg-[#020817] text-white">
      <Navbar />
      <SocialProofToast /> {/* ✅ تم تفعيل الإشعارات */}

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-32 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Legacy Blobs Integration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
           <div className="absolute top-0 right-1/4 w-96 
h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0 z-0">
          <motion.div style={{ y }} className="w-full h-[120%]">
            <img src="/images/monteerly/monteerly_04_hero_header_marketing_banner.png" alt="Hero" className="w-full h-full object-cover opacity-30 dark:opacity-40" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/80 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 hover:bg-blue-500/20 transition-colors cursor-pointer shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-bold text-blue-300">نظام التشغيل v2.0 - الآن مع الذكاء الاصطناعي</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-6">
              <span className="block drop-shadow-2xl text-white">MONTEERLY</span>
            
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">STUDIO OS</span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              {lang === 'ar' ? "أدر الفوضى، أمّن الأصول، وضاعف الأرباح." : "Manage Chaos. Secure Assets. Scale Revenue."}
              <br className="hidden md:block" />
              <span className="text-white/80 font-medium">المنصة المركزية لصناع المحتوى والشركات الإعلامية.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/signup" className="group relative px-10 py-5 rounded-2xl bg-blue-600 overflow-hidden shadow-2xl shadow-blue-600/30 hover:scale-105 transition-transform">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 
transition-all group-hover:scale-110" />
                <span className="relative flex items-center gap-3 text-white font-bold text-xl">
                  <Zap size={24} fill="currentColor" /> {t('hero.cta_primary')}
                </span>
              </Link>
              <Link href="/dashboard" className="px-10 py-5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium text-xl flex items-center justify-center gap-3 transition-all hover:scale-105">
                <Play size={24} /> {t('hero.cta_secondary')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FIELD APPS (تم تفعيل Logger) --- */}
      <section className="py-24 bg-[#0a0f1e] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Smartphone className="text-blue-500" /> تطبيقات الميدان (Companion Apps)
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              أدوات ميدانية متكاملة تعمل معك في موقع التصوير.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Monitor */}
            <Link href="/apps/monitor" className="group relative p-8 rounded-3xl bg-[#0f172a] border border-white/10 hover:border-red-500/50 transition-all hover:-translate-y-2">
   
           <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6"><Video size={28} /></div>
              <h3 className="text-2xl font-bold mb-2">Pocket Monitor</h3>
              <p className="text-gray-400">شاشة مراجعة فورية.</p>
            </Link>

            {/* ID */}
            <Link href="/apps/id" className="group relative p-8 rounded-3xl bg-[#0f172a] border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6"><QrCode size={28} /></div>
              <h3 className="text-2xl font-bold mb-2">Digital Pass</h3>
              <p className="text-gray-400">هوية رقمية آمنة.</p>
            </Link>

          
  {/* Logger (تم تفعيله) */}
            <Link href="/apps/logger" className="group relative p-8 rounded-3xl bg-[#0f172a] border border-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6"><Layers size={28} /></div>
              <h3 className="text-2xl font-bold mb-2">Quick Logger</h3>
              <p className="text-gray-400">تسجيل السكربت واللقطات.</p>
              <div className="mt-4 flex items-center text-green-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                ابدأ التسجيل <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      
{/* --- SHOWCASE --- */}
      <section className="py-24 relative bg-[#020817]">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[3rem] border border-white/10 bg-[#0f172a]/60 overflow-hidden shadow-2xl shadow-blue-900/30 p-12">
            <div className="absolute top-0 w-full h-12 bg-[#0f172a] border-b border-white/10 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="pt-16 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-5xl font-extrabold leading-tight text-transparent 
bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">لوحة تحكم ذكية</h2>
                <p className="text-gray-300 text-xl leading-relaxed">
                  راقب أداء فريقك، وتتبع المشاريع، وحلل البيانات المالية من لوحة واحدة متكاملة.
                </p>
                <ul className="space-y-4">
                  {['تحليلات فورية (Real-time Analytics)', 'إدارة مهام متقدمة', 'نظام إشعارات ذكي'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                      <div className="p-1 rounded-full bg-blue-500/20 text-blue-400"><CheckCircle2 size={18} /></div> {item}
                    </li>
            
      ))}
                </ul>
              </div>
              <div className="relative">
                <img src="/images/monteerly/monteerly_06_marketing_showcase_full.png" alt="Dashboard" className="rounded-xl shadow-2xl border border-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-[#010409]">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src="/images/monteerly/monteerly_02_main_logo_full.svg" alt="Logo" className="h-8" />
 
           <span className="text-xl font-bold text-white">Monteerly OS</span>
          </div>
          <p className="text-gray-500 text-sm">© 2026 جميع الحقوق محفوظة. صنع بكل فخر للمبدعين العرب.</p>
        </div>
      </footer>
    </div>
  );
}
"""
write_file("src/app/[locale]/page.tsx", landing_page_original)

# ==============================================================================
# 2. نقل لوحة التحكم (Dashboard) إلى مسار منفصل للحفاظ عليها
# ==============================================================================
dashboard_page = """'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, DollarSign, Briefcase, Play, 
  ArrowLeft, Clock, Star, TrendingUp, Bell 
} from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم، كريم 👋</h1>
          <p className="text-slate-400">إليك ملخص نشاطك الإبداعي اليوم.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
            + مشروع جديد
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "الرصيد المتاح", val: "12,450 EGP", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "مشاريع نشطة", val: "3", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "ساعات العمل", val: "142 ساعة", icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "تقييمك", val: "4.9/5", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 transition-colors"
          >
            <div>
              <p className="text-slate-400 text-xs font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.val}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Play className="w-5 h-5 text-indigo-500" /> متابعة العمل</h2>
              <Link href="/studio" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">الذهاب للاستوديو <ArrowLeft className="w-4 h-4" /></Link>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all">
              <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500" />
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-28 bg-black rounded-lg flex items-center justify-center relative">
                  <Play className="w-10 h-10 text-white/50" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-xs px-2 py-1 rounded text-white">01:15 / 03:00</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div><h3 className="text-xl font-bold mb-1">إعلان تطبيق وصلة - النسخة 3</h3><p className="text-slate-400 text-sm mb-3">آخر تعديل: منذ ساعتين</p></div>
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1 rounded-full border border-yellow-500/20">مراجعة العميل</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2"><div className="bg-indigo-600 h-full rounded-full w-[85%]" /></div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
        
        {/* Side Column */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-400"><TrendingUp className="w-4 h-4" /> تريندات السوق</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm"><span>طلب عالي: Reels Editing</span><span className="text-green-400 font-bold">+24%</span></div>
              <div className="flex items-center justify-between text-sm"><span>متوسط سعر الدقيقة</span><span className="text-white font-bold">450 EGP</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/dashboard/page.tsx", dashboard_page)

# ==============================================================================
# 3. تحديث الشريط الجانبي (Sidebar) ليختفي في الصفحة الرئيسية
# ==============================================================================
sidebar_code = """'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ShoppingBag, Clapperboard, GraduationCap, MessageSquare, Users, Building2, Settings, Home } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'لوحة التحكم', path: '/dashboard', icon: LayoutGrid },
  { name: 'الرئيسية (الزوار)', path: '/', icon: Home }, 
  { name: 'سوق العمل', path: '/marketplace', icon: ShoppingBag },
  { name: 'الاستوديو', path: '/studio', icon: Clapperboard },
  { name: 'الأكاديمية', path: '/academy', icon: GraduationCap },
  { name: 'الرسائل', path: '/messages', icon: MessageSquare },
  { name: 'المجتمع', path: '/community', icon: Users },
  { name: 'الوكالة', path: '/agency', icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  // إخفاء الشريط الجانبي في الصفحة الرئيسية التسويقية
  // ملاحظة: التحقق من المسار بدقة ليشمل اللغات
  if (pathname === '/' || pathname === '/en' || pathname === '/ar') return null;

  const isActive = (path) => {
    // منطق خاص للوحة التحكم لأنها الجذر الجديد للمستخدم
    if (path === '/dashboard' && pathname?.includes('/dashboard')) return true;
    if (path !== '/' && pathname?.includes(path)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-l border-slate-800 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          مونتيرلي ستوديو
        </h1>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
              {active && <span className="mr-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">K</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">كريم المونتير</p>
            <p className="text-xs text-slate-500 truncate">محترف | Level 5</p>
          </div>
          <button className="text-slate-400 hover:text-white"><Settings className="w-4 h-4" /></button>
        </div>
      </div>
    </aside>
  );
}
"""
write_file("src/components/Sidebar.tsx", sidebar_code)

print("\n🚀 تمت استعادة الصفحة الرئيسية الأصلية بنجاح ونقل لوحة التحكم إلى /dashboard.")
