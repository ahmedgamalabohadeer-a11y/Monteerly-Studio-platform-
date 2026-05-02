'use client'
import React, { useState } from 'react';
import { Briefcase, Star, Filter, ShieldCheck } from 'lucide-react';
import AiMatcher from '@/components/market/AiMatcher';

export default function MarketplacePage() {
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const freelancers = [
    { id: 1, name: "أحمد جمال", role: "مخرج سينمائي ومونتير", skills: "VFX, Color Grading", rating: 4.9, img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780" },
    { id: 2, name: "سارة محمد", role: "خبيرة موشن جرافيك 3D", skills: "3D, Motion, After Effects", rating: 4.8, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888" },
    { id: 3, name: "طارق زياد", role: "مهندس صوتيات و VFX", skills: "Sound Design, VFX", rating: 5.0, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-indigo-500" /> سوق النُخب الإبداعية
          </h1>
          <p className="text-slate-400 font-medium">تعاقد مع أفضل المواهب المدعومة بقوة الذكاء الاصطناعي.</p>
        </header>

        {/* دمج محرك المطابقة السيادي هنا */}
        <AiMatcher onMatchComplete={(result) => setAiInsight(result)} />

        {aiInsight && (
          <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 animate-fade-in-up">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-emerald-400 font-black mb-1">تحليل MCOS الذكي:</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{aiInsight}</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">النخب المتاحة</h2>
          <button className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> تصفية يدوية
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map(f => (
            <div key={f.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl hover:bg-slate-900 transition-all group relative overflow-hidden">
              {/* تأثير التوهج عند التطابق */}
              {aiInsight && <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-3xl animate-pulse pointer-events-none"></div>}
              
              <div className="flex items-center gap-4 mb-4">
                <img src={f.img} alt={f.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors" />
                <div>
                  <h3 className="font-black text-lg">{f.name}</h3>
                  <p className="text-xs text-indigo-400 font-bold">{f.role}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800">{f.skills}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{f.rating}</span>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded font-black">جاهز للعمل</span>
              </div>
              <button className="w-full bg-white text-slate-950 hover:bg-indigo-500 hover:text-white py-3 rounded-xl font-black transition-all">
                بدء التفاوض السيادي
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
