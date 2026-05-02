'use client'
import React from 'react';
import { Briefcase, Star, Filter } from 'lucide-react';

export default function MarketplacePage() {
  const freelancers = [
    { id: 1, name: "أحمد جمال", role: "مخرج سينمائي ومونتير", rating: 4.9, img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780" },
    { id: 2, name: "سارة محمد", role: "خبيرة موشن جرافيك 3D", rating: 4.8, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888" },
    { id: 3, name: "طارق زياد", role: "مهندس صوتيات و VFX", rating: 5.0, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-indigo-500" />
              سوق النُخب الإبداعية
            </h1>
            <p className="text-slate-400 font-medium">تعاقد مع أفضل المواهب المدعومة بقوة الذكاء الاصطناعي.</p>
          </div>
          <button className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> تصفية الكفاءات
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map(f => (
            <div key={f.id} className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl hover:bg-slate-900 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <img src={f.img} alt={f.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors" />
                <div>
                  <h3 className="font-black text-lg">{f.name}</h3>
                  <p className="text-xs text-indigo-400 font-bold">{f.role}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold">{f.rating}</span>
                </div>
                <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">موثق بالهوية</span>
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
