'use client';
import { use } from 'react';

import React from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import SocialProofToast from "@/components/SocialProofToast";
import GallerySection from "@/components/ui/GallerySection";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Play, Shield, Zap, Globe, Lock, Server, Cpu, 
  Smartphone, Video, QrCode, Layers, CheckCircle2 
} from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="relative min-h-screen font-sans bg-[#020817] text-white selection:bg-blue-600 selection:text-white" dir="rtl">
      <Navbar />
      <SocialProofToast />

      {/* === SECTION 1: HERO (مركز القيادة) === */}
      <section className="relative pt-32 pb-32 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8 hover:bg-blue-500/20 transition-colors cursor-pointer shadow-lg shadow-blue-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-bold text-blue-300">نظام التشغيل v2.0 - متاح للشركات</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              <span className="block drop-shadow-2xl text-white">MONTEERLY</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                STUDIO OS
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              أدر الفوضى، أمّن الأصول، وضاعف الأرباح. <br/>
              <span className="text-white font-medium">المنصة المركزية الشاملة لصناع المحتوى والشركات الإعلامية في الشرق الأوسط.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/dashboard" className="group relative px-10 py-5 rounded-2xl bg-blue-600 overflow-hidden shadow-2xl shadow-blue-600/30 hover:scale-105 transition-transform w-full sm:w-auto">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all group-hover:scale-110" />
                <span className="relative flex items-center justify-center gap-3 text-white font-bold text-xl">
                  <Zap size={24} fill="currentColor" /> أطلق الاستوديو مجاناً
                </span>
              </Link>
              <Link href="/dashboard" className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-medium text-xl flex items-center justify-center gap-3 transition-all hover:scale-105 w-full sm:w-auto">
                <Play size={24} fill="currentColor" /> عرض تجريبي للنظام
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === SECTION 2: البنية التحتية (Infrastructure) === */}
      <section id="infrastructure" className="py-32 bg-[#0b1121] relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-white mb-4">البنية التحتية للنظام</h2>
            <p className="text-xl text-slate-400">أدوات مصممة خصيصاً للمؤسسات والفرق الاحترافية</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Security */}
            <div className="group rounded-3xl bg-[#131b2e] p-8 border border-white/5 hover:border-blue-500/50 transition hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-8 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                 <Lock size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">حماية عسكرية</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                تشفير <span className="font-mono text-blue-400">AES-256</span> ونظام Escrow. أصولك المالية والرقمية في أمان تام.
              </p>
            </div>

            {/* Collaboration */}
            <div className="group rounded-3xl bg-[#131b2e] p-8 border border-white/5 hover:border-indigo-500/50 transition hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-8 w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                 <Globe size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">غرفة عمليات عالمية</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                ربط الفريق الموزع في بيئة موحدة. تزامن لحظي، صلاحيات دقيقة، وإدارة مركزية.
              </p>
            </div>

            {/* Assets */}
            <div className="group rounded-3xl bg-[#131b2e] p-8 border border-white/5 hover:border-purple-500/50 transition hover:shadow-2xl hover:-translate-y-1">
              <div className="mb-8 w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                 <Cpu size={32} />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">إدارة الأصول الذكية</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                مكتبة مركزية لهويتك البصرية. النظام يضمن استخدام النسخ الصحيحة والمرخصة فقط.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 3: تطبيقات الميدان (Field Apps) - (إضافة محسنة) === */}
      <section id="apps" className="py-24 bg-[#020817] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
              <Smartphone className="text-blue-500" /> تطبيقات الميدان (Companion Apps)
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              أدوات ميدانية متكاملة تعمل معك في موقع التصوير، متصلة مباشرة بالاستوديو.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/dashboard" className="group relative p-8 rounded-3xl bg-[#0a0f1e] border border-white/10 hover:border-red-500/50 transition-all hover:-translate-y-2">
               <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6"><Video size={28} /></div>
               <h3 className="text-2xl font-bold mb-2 text-white">Pocket Monitor</h3>
               <p className="text-slate-400">شاشة مراجعة فورية للمخرج.</p>
            </Link>

            <Link href="/dashboard" className="group relative p-8 rounded-3xl bg-[#0a0f1e] border border-white/10 hover:border-blue-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6"><QrCode size={28} /></div>
              <h3 className="text-2xl font-bold mb-2 text-white">Digital Pass</h3>
              <p className="text-slate-400">هوية رقمية آمنة للطاقم.</p>
            </Link>

            <Link href="/dashboard" className="group relative p-8 rounded-3xl bg-[#0a0f1e] border border-white/10 hover:border-green-500/50 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mb-6"><Layers size={28} /></div>
              <h3 className="text-2xl font-bold mb-2 text-white">Quick Logger</h3>
              <p className="text-slate-400">تسجيل السكربت واللقطات في الموقع.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* === SECTION 4: المعرض (Gallery) === */}
      <GallerySection />

      {/* === SECTION 5: CTA النهائي === */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-blue-600 px-6 py-20 text-center shadow-2xl shadow-blue-900/50">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">جاهز لنقل عملك للمستوى التالي؟</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                جرب النظام مجاناً لمدة 14 يوم. انضم للنخبة اليوم.
              </p>
              <Link href="/dashboard" className="inline-flex bg-white text-blue-900 px-10 py-5 rounded-2xl font-bold text-xl items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all">
                ابدأ رحلتك الآن <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 6: التذييل (Footer) === */}
      <footer className="py-12 border-t border-white/10 bg-[#010409]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black">M</div>
             <span className="text-xl font-bold text-white">Monteerly OS</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 جميع الحقوق محفوظة. صنع بكل فخر للمبدعين العرب.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-white transition">الشروط</Link>
            <Link href="#" className="hover:text-white transition">تواصل معنا</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
