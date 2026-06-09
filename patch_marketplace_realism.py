import os

file_path = "src/app/[locale]/marketplace/page.tsx"

# بيانات واقعية (سعر حقيقي + صور متوافقة مع الدور)
new_content = r"""'use client'
import React, { useState } from 'react';
import { Briefcase, Star, Filter, ShieldCheck, Zap, User } from 'lucide-react';
import AiMatcher from '@/components/market/AiMatcher';
import Image from 'next/image';

export default function MarketplacePage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  // قاعدة بيانات حقيقية ومنظمة
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
          {freelancers.map(f => (
            <div key={f.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/30 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10">
                   <Image src={f.img} alt={f.name} width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-lg">{f.name}</h3>
                  <p className="text-xs text-indigo-400 font-bold">{f.role}</p>
                </div>
              </div>
              <div className="text-xl font-black mb-4">{f.rate}</div>
              <Link href={`/ar/marketplace/profile/${f.id}`} className="block w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold text-sm text-center transition-all">
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
    f.write(new_content)
print("✅ تم تصحيح البيانات: أسعار واقعية، صور متوافقة، وربط لملفات التعريف!")
