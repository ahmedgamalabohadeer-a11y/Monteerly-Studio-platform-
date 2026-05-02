'use client'

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, PlayCircle, Briefcase, Zap, Star } from 'lucide-react';

export default function LandingPage() {
  // العبارات المستقاة من الدستور المرجعي
  const dict = {
    heroTitle: "أطلق العنان لإبداعك. سيادة رقمية لا مثيل لها.",
    heroSub: "Monteerly Corporate OS: أول منصة مؤسسية تجمع بين العقود الذكية، محركات الرندر السحابية، وضمان الأجور التام.",
    ctaPrimary: "ابدأ مسيرتك السيادية",
    ctaSecondary: "استكشف الأكاديمية",
    stats: [
      { label: "مبدع موثق", value: "+10,000" },
      { label: "معاملة آمنة", value: "$2M+" },
      { label: "زمن استجابة", value: "99.9%" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans" dir="rtl">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="/assets/hero-bg.jpg" alt="Background" className="w-full h-full object-cover mix-blend-overlay" onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072'} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black mb-8 animate-fade-in-up">
            <Zap className="w-4 h-4" /> MCOS v5.0 قيد التشغيل الفعلي
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-l from-white to-slate-400 bg-clip-text text-transparent leading-tight">
            {dict.heroTitle}
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            {dict.heroSub}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ar/workspace" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-lg transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/40 hover:-translate-y-1">
              {dict.ctaPrimary}
            </Link>
            <Link href="/ar/academy" className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" /> {dict.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {dict.stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl font-black text-white">{stat.value}</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Image Grid */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              قبة الضمان المالي السيادية
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              لا مجال للخطأ. بمجرد توقيع العقد الذكي، يتم حجز الأموال في قبو مشفر لا يُفتح إلا بموافقتك النهائية. حماية مطلقة لحقوقك الفكرية والمالية.
            </p>
            <Link href="/ar/wallet" className="text-emerald-400 hover:text-emerald-300 font-black flex items-center gap-2">
              اكتشف المركز المالي &larr;
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
            <img src="/assets/security.png" alt="Security" className="relative z-10 w-full h-auto rounded-[2rem] border border-white/10 shadow-2xl" onError={(e) => e.currentTarget.src='https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070'} />
          </div>
        </div>
      </div>
    </div>
  );
}
