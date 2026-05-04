'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, ShieldCheck, Zap, Users, ArrowLeft } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function UltimateLandingPage({ params: { locale } }: { params: { locale: string } }) {
  const isAr = locale === 'ar';
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 🌟 القسم الأول: البطل (Hero Section) */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* خلفيات سيادية */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/80 z-10 backdrop-blur-[2px]"></div>
          <img src={MCOS_ASSETS.hero.mainBackground} alt="MCOS Background" className="w-full h-full object-cover opacity-30" />
        </div>
        
        <div className="relative z-20 text-center max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" /> إطلاق النسخة السيادية V5.0
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight text-white">
              نظام الإنتاج <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">السيادي</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              أول نظام تشغيل متكامل يجمع بين سوق العمل، الذكاء الاصطناعي، ومساحات العمل المشفرة. وداعاً للمنصات التقليدية.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/auth`} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                ابدأ رحلتك الآن <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href={`/${locale}/workspace`} className="w-full sm:w-auto bg-slate-900 border border-slate-700 hover:border-slate-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" /> استكشف النظام
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 القسم الثاني: المميزات السيادية (Features) */}
      <section className="py-32 px-4 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">لماذا Monteerly OS؟</h2>
            <p className="text-slate-400">نحن لا نربطك بعميل، نحن نوفر لك إمبراطورية إنتاجية كاملة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-10 h-10 text-emerald-400" />, title: "ضمان مالي لا يخترق", desc: "أموالك محتجزة في عقود ذكية (Escrow). لن يضيع مجهودك أبداً.", bg: "bg-emerald-500/5" },
              { icon: <Zap className="w-10 h-10 text-indigo-400" />, title: "مساحة عمل كأنها حاسوبك", desc: "نوافذ عائمة، رندر سحابي، ومزامنة حية بينك وبين العميل.", bg: "bg-indigo-500/5" },
              { icon: <Users className="w-10 h-10 text-rose-400" />, title: "مجتمع نخبوي", desc: "ليس مكاناً للمبتدئين. هنا تتواجد شركات الإنتاج التي تبحث عن الجودة.", bg: "bg-rose-500/5" }
            ].map((feat, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className={`p-10 rounded-[2.5rem] border border-slate-800 ${feat.bg} backdrop-blur-sm`}>
                <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-slate-800">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-black mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
