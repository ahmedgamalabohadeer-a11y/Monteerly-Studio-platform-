'use client'
import React, { useState } from 'react';
import { Briefcase, Star, Filter, ShieldCheck, Zap } from 'lucide-react';
import AiMatcher from '@/components/market/AiMatcher';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function MarketplacePage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  // استخدام الصور الـ 24 الأصلية للمبدعين
  const freelancers = [
    { id: 1, name: "أحمد جمال", role: "مخرج سينمائي ومونتير", skills: "تقنية عالمية بلسان عربي مبين", rating: 4.9, img: MCOS_ASSETS.market.arabEditor.src },
    { id: 2, name: "سارة محمد", role: "خبيرة مونتاج متقدم", skills: "Desktop-like workspace", rating: 4.8, img: MCOS_ASSETS.workspace.dualScreen.src },
    { id: 3, name: "طارق زياد", role: "مصور تراث احترافي", skills: "A sovereign asset library", rating: 5.0, img: MCOS_ASSETS.heritageAndLibrary.saudiTraditional.src }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" /> سوق النُخب الإبداعية
          </h1>
          <p className="text-slate-400 text-sm md:text-lg font-medium">تصفح نخبة المبدعين في الفيديو والتصوير من العالم العربي.</p>
        </header>

        <AiMatcher onMatchComplete={(result) => setAiInsight(result)} />

        {aiInsight && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3 animate-fade-in-up">
            <Zap className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-emerald-400 font-black mb-1">توصية المساعد الإخراجي:</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{aiInsight}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map(f => (
            <div key={f.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/50 transition-all group relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <img src={f.img} alt={f.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors shadow-lg" />
                <div>
                  <h3 className="font-black text-lg text-white">{f.name}</h3>
                  <p className="text-xs text-indigo-400 font-bold">{f.role}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-xs bg-[#12121A] text-slate-400 px-3 py-1.5 rounded-lg border border-white/5 block text-center truncate">{f.skills}</span>
              </div>
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" /> <span className="font-bold text-sm">{f.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded">
                  <ShieldCheck className="w-3 h-3" /> Escrow مدمج
                </div>
              </div>
              <button className="w-full bg-[#12121A] border border-white/10 text-white hover:bg-indigo-600 hover:border-indigo-500 py-3 rounded-xl font-black text-sm transition-all shadow-md">
                بدء التفاوض السيادي
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
