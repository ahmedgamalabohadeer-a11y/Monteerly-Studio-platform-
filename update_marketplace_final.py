import os

file_path = "src/app/[locale]/marketplace/page.tsx"
os.makedirs(os.path.dirname(file_path), exist_ok=True)

content = r"""'use client'
import React, { useState } from 'react';
import { Briefcase, Star, ShieldCheck, Zap } from 'lucide-react';
import AiMatcher from '@/components/market/AiMatcher';
import Image from 'next/image';
import Link from 'next/link';

export default function MarketplacePage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const freelancers = [
    { id: 1, name: "أحمد جمال", role: "مخرج ومونتير", rate: "يبدأ من 150$", status: "متاح", rating: 4.9, img: "/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png" },
    { id: 2, name: "سارة محمد", role: "خبيرة مونتاج", rate: "يبدأ من 120$", status: "متاح", rating: 4.8, img: "/images/monteerly/monteerly_13_analytics_dashboard_woman_ai.png" },
    { id: 3, name: "طارق زياد", role: "مصور سينمائي", rate: "يبدأ من 200$", status: "مشغول", rating: 5.0, img: "/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png" }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-4 flex items-center gap-3">
            <Briefcase className="text-indigo-500" /> سوق النُخب الإبداعية
          </h1>
        </header>

        <AiMatcher onMatchComplete={(result) => setAiInsight(result)} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {freelancers.map((f) => (
            <div key={f.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                   <Image src={f.img} alt={f.name} width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-lg">{f.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span className={`w-2 h-2 rounded-full ${f.status === 'متاح' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {f.status}
                  </div>
                </div>
              </div>
              <p className="text-indigo-400 text-sm font-bold mb-1">{f.role}</p>
              <p className="text-2xl font-black mb-4">{f.rate}</p>
              <div className="flex justify-between items-center mb-6 px-1">
                 <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" /> 
                    <span className="font-bold text-sm">{f.rating}</span>
                 </div>
                 <div className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Escrow مدمج
                 </div>
              </div>
              <Link href={`/ar/marketplace/profile/${f.id}`} className="block w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-black text-sm text-center transition-all shadow-lg shadow-indigo-600/20">
                استعراض المحفظة والتعاقد
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم تحديث صفحة السوق بنجاح وبدون أخطاء!")
