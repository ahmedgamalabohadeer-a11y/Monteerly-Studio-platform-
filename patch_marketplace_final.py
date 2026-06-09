import os

file_path = "src/app/[locale]/marketplace/page.tsx"

new_content = r"""'use client'
import React, { useState } from 'react';
import { Briefcase, Star, ShieldCheck, Zap, Filter, Clock } from 'lucide-react';
import AiMatcher from '@/components/market/AiMatcher';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function MarketplacePage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  
  const freelancers = [
    { id: 1, name: "أحمد جمال", role: "مخرج سينمائي", rate: "يبدأ من 500$", status: "متاح", rating: 4.9, img: MCOS_ASSETS.market.arabEditor.src },
    { id: 2, name: "سارة محمد", role: "خبيرة مونتاج", rate: "يبدأ من 350$", status: "مشغول", rating: 4.8, img: MCOS_ASSETS.workspace.dualScreen.src },
    { id: 3, name: "طارق زياد", role: "مصور تراث", rate: "يبدأ من 400$", status: "متاح", rating: 5.0, img: MCOS_ASSETS.heritageAndLibrary.saudiTraditional.src }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" /> سوق النُخب الإبداعية
          </h1>
        </header>

        {/* شريط الفلترة المضاف */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 bg-[#12121A] px-4 py-2 rounded-xl border border-white/10 hover:border-indigo-500"><Filter className="w-4 h-4"/> تصفية حسب السعر</button>
            <button className="flex items-center gap-2 bg-[#12121A] px-4 py-2 rounded-xl border border-white/10 hover:border-indigo-500">التصنيف الأعلى</button>
        </div>

        <AiMatcher onMatchComplete={(result) => setAiInsight(result)} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {freelancers.map(f => (
            <div key={f.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img src={f.img} alt={f.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30" />
                  <div>
                    <h3 className="font-black text-lg">{f.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${f.status === 'متاح' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {f.status}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-indigo-400 text-sm font-bold mb-2">{f.role}</p>
              <p className="text-white text-xl font-black mb-4">{f.rate}</p>
              
              <div className="flex justify-between items-center mb-6 px-2">
                 <div className="flex items-center gap-1 text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> <span className="font-bold">{f.rating}</span></div>
                 <div className="text-emerald-400 text-xs font-bold flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Escrow مدمج</div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-black text-sm transition-all shadow-lg shadow-indigo-600/20">
                بدء التفاوض السيادي
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
