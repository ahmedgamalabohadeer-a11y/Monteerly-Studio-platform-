'use client'
import React from 'react';
import Image from 'next/image';
import { Bot, Mic, Image as ImageIcon, FileText, Sparkles, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function AiStudioPage() {
  const aiTools = [
    { title: 'المساعد الإخراجي (Co-Pilot)', desc: 'يحلل مشاريعك، يسعر عروضك تلقائياً، وينوب عنك في التفاوض لتعظيم أرباحك وتقليل الجهد.', icon: <Bot className="w-8 h-8 text-indigo-400" /> },
    { title: 'التوأم الرقمي الصوتي', desc: 'استنساخ صوتي دقيق لإنشاء Voice-Over احترافي من النصوص مباشرة، معزز بمشاعر بشرية.', icon: <Mic className="w-8 h-8 text-rose-400" /> },
    { title: 'مولد المشاهد (Storyboard)', desc: 'تحويل النص المكتوب إلى مشاهد مرئية وتصور إخراجي دقيق لتقليص وقت التحضير.', icon: <ImageIcon className="w-8 h-8 text-emerald-400" /> },
    { title: 'مولد العقود الذكية (NDA)', desc: 'توليد عقود حفظ حقوق الملكية الفكرية وصياغتها قانونياً لربطها بـ Escrow مباشرة.', icon: <FileText className="w-8 h-8 text-amber-400" /> }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <Image
          src={MCOS_ASSETS.techAndAi.advisor.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover mix-blend-screen"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center justify-center md:justify-start gap-3 text-white">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" /> ترسانة الذكاء الاصطناعي
            </h1>
            <p className="text-slate-400 text-sm md:text-lg font-medium">أدوات حصرية مصممة لتسريع التدفق الإبداعي وكسر حدود الإنتاج التقليدي.</p>
          </div>
          <Link href="/ar/pricing" className="bg-[#12121A] hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-[0_0_15px_rgba(79,70,229,0.2)] flex items-center gap-2">
            <Lock className="w-4 h-4" /> فك تشفير الترسانة <ArrowLeft className="w-4 h-4" />
          </Link>
        </header>

        <div className="mb-8 p-8 md:p-12 rounded-[2.5rem] border border-indigo-500/30 bg-gradient-to-br from-[#0A0A0F] to-indigo-950/20 shadow-[0_0_50px_rgba(79,70,229,0.1)] flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-4">نشط الآن للمؤسسين</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">{aiTools[0].title}</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">{aiTools[0].desc}</p>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg">تفعيل المساعد</button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[50px] rounded-full"></div>
            <div className="relative z-10 h-64 md:h-80 w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={MCOS_ASSETS.techAndAi.advisor.src}
                alt="واجهة المساعد الإخراجي بالذكاء الاصطناعي"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiTools.slice(1).map((tool, i) => (
            <div key={i} className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] hover:border-indigo-500/50 transition-all group flex flex-col items-start cursor-not-allowed relative overflow-hidden">
              <div className="absolute inset-0 bg-[#05050A]/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Lock className="w-8 h-8 text-slate-500 mb-2" />
                <span className="bg-[#12121A] border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-slate-300">يتطلب ترقية السيادة</span>
              </div>
              <div className="bg-[#12121A] border border-white/5 p-4 rounded-2xl mb-6 shadow-inner">
                {tool.icon}
              </div>
              <div>
                <h3 className="text-xl font-black mb-3 text-white">{tool.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
