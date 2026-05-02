'use client'
import React from 'react';
import { Bot, Mic, Image as ImageIcon, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AiStudioPage() {
  const aiTools = [
    { title: "التوأم الرقمي الصوتي", desc: "استنساخ صوتي دقيق لإنشاء Voice-Over احترافي من النصوص مباشرة.", icon: <Mic className="w-8 h-8 text-rose-500" /> },
    { title: "مولد الستوريبورد (Storyboard)", desc: "تحويل النص المكتوب (الاسكريبت) إلى مشاهد مرئية وتصور إخراجي.", icon: <ImageIcon className="w-8 h-8 text-indigo-500" /> },
    { title: "مساعد العقود الذكي", desc: "توليد عقود حفظ حقوق الملكية (NDA) وصياغتها قانونياً للمشاريع.", icon: <FileText className="w-8 h-8 text-emerald-500" /> },
    { title: "المسوق الآلي", desc: "تحليل الفيديو واقتراح عناوين ووصف يوتيوب/تيك توك (SEO Optimized).", icon: <Bot className="w-8 h-8 text-amber-500" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-400" /> ترسانة الذكاء الاصطناعي
            </h1>
            <p className="text-slate-400 text-lg">أدوات حصرية لمشتركي باقات Pro و Studio لكسر حدود الإنتاج.</p>
          </div>
          <Link href="/ar/pricing" className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-full font-black text-sm transition-all shadow-lg shadow-indigo-500/20">
            ترقية الباقة لفتح الترسانة
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiTools.map((tool, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/50 transition-all group flex gap-6 items-start cursor-not-allowed relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-xs font-black text-slate-300">يتطلب باقة Pro</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl shrink-0">
                {tool.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">{tool.title}</h3>
                <p className="text-slate-400 leading-relaxed">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
