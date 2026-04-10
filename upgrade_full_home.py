import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم تحديث/إنشاء: {path}")

# ==============================================================================
# 1. إنشاء مكونات الواجهة الناقصة (لضمان عمل الصفحة الرئيسية)
# ==============================================================================

# A. Navbar Component
navbar_code = """'use client';
import Link from 'next/link';
import { Menu, X, LayoutGrid } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#020817]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="text-xl font-bold text-white tracking-tight">Monteerly Studio</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#infrastructure" className="hover:text-white transition">البنية التحتية</a>
          <a href="#apps" className="hover:text-white transition">التطبيقات</a>
          <a href="#gallery" className="hover:text-white transition">المعرض</a>
        </div>

        <div className="flex gap-4">
          <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-white hover:text-blue-400 font-medium transition">
            <LayoutGrid size={18} /> لوحة التحكم
          </Link>
          <Link href="/dashboard" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold hover:bg-blue-50 transition shadow-lg">
            ابدأ الآن
          </Link>
        </div>
      </div>
    </nav>
  );
}
"""
write_file("src/components/Navbar.tsx", navbar_code)

# B. Social Proof Toast (إشعارات المبيعات الوهمية للتحفيز)
social_proof_code = """'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const NOTIFICATIONS = [
  { name: "أحمد م.", action: "انضم إلى الاستوديو", time: "منذ دقيقة" },
  { name: "Sara Design", action: "أنهت مشروعاً جديداً", time: "منذ 3 دقائق" },
  { name: "Media House", action: "رقت الخطة إلى Pro", time: "منذ 10 دقائق" }
];

export default function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 pointer-events-none">
      <AnimatePresence mode='wait'>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[250px]"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              {NOTIFICATIONS[index].name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{NOTIFICATIONS[index].name}</p>
              <p className="text-xs text-slate-400">{NOTIFICATIONS[index].action} • {NOTIFICATIONS[index].time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"""
write_file("src/components/SocialProofToast.tsx", social_proof_code)

# C. Gallery Section (قسم المعرض البصري)
gallery_code = """'use client';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-[#020817] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">قدرات بصرية غير محدودة</h2>
          <p className="text-slate-400 text-lg">منصة مصممة للتعامل مع أعلى دقة وجودة (4K/8K HDR).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          {/* Main Item */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-slate-800 animate-pulse group-hover:animate-none transition-colors" /> {/* Placeholder for Image */}
            <div className="absolute bottom-8 right-8 z-20">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">FEATURED</span>
              <h3 className="text-2xl font-bold text-white">مونتاج سينمائي متقدم</h3>
              <p className="text-slate-300">أدوات قص وتلوين مدمجة في المتصفح.</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </motion.div>

          {/* Sub Item 1 */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 group">
             <div className="absolute inset-0 flex items-center justify-center text-slate-700 group-hover:text-slate-600 transition-colors">
                <span className="text-6xl font-black opacity-20">VFX</span>
             </div>
             <div className="absolute bottom-6 right-6 p-4">
                <h4 className="font-bold text-white">مؤثرات بصرية</h4>
             </div>
          </motion.div>

          {/* Sub Item 2 */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900 group">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
             <div className="absolute bottom-6 right-6 p-4">
                <h4 className="font-bold text-white">تصحيح ألوان</h4>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"""
write_file("src/components/ui/GallerySection.tsx", gallery_code)


# ==============================================================================
# 2. التحديث الشامل للصفحة الرئيسية (Master Landing Page)
# ==============================================================================
# ملاحظة: سنقوم بدمج الهيرو (الأصلي) + البنية التحتية (الأصلية) + التطبيقات (الإضافية)
master_page_code = """'use client';

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
"""
write_file("src/app/[locale]/page.tsx", master_page_code)

print("🚀 تمت العملية بنجاح: تم دمج الهيكل الأصلي مع الإضافات الحديثة في صفحة واحدة متكاملة.")
