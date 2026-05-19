'use client'
import React, { useState } from 'react';
import { PlayCircle, Download, Film, Camera, Filter, ShoppingCart, ShieldCheck } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function SovereignLibrary() {
  const [activeTab, setActiveTab] = useState('الكل');

  // استخدام صور المبدعين والمكتبة الأصلية
  const assets = [
    { id: 1, title: "لقطات درون للجزائر (4K RAW)", type: "raw", author: "طيران سيادي", price: "$85", format: "ProRes 422", img: MCOS_ASSETS.heritageAndLibrary.cityDrone.src },
    { id: 2, title: "أصول سينمائية (Glitch & LUTs)", type: "presets", author: "MCOS Official", price: "مجاني للنخبة", format: "Premiere Pro", img: MCOS_ASSETS.heritageAndLibrary.cinematic.src },
    { id: 3, title: "تراث سعودي (Raw Footage)", type: "raw", author: "استوديو العدسة", price: "$120", format: "ARRI RAW", img: MCOS_ASSETS.heritageAndLibrary.saudiTraditional.src },
    { id: 4, title: "تصوير جوي احترافي للطبيعة", type: "raw", author: "طيران سيادي", price: "$65", format: "H.265 10bit", img: MCOS_ASSETS.heritageAndLibrary.algerianDrone.src }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3 text-white">
              <Film className="w-8 h-8 md:w-10 md:h-10 text-rose-500" /> قبو الأصول السيادية
            </h1>
            <p className="text-slate-400 text-sm md:text-lg font-medium">مكتبة حصرية للمبدعين لبيع اللقطات الخام، المؤثرات، وحفظ التراث العربي بأعلى جودة.</p>
          </div>
          <button className="bg-[#12121A] border border-white/10 hover:bg-rose-600 hover:border-rose-500 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-md">
            <Camera className="w-5 h-5" /> استحوذ على التراخيص / بع لقطاتك
          </button>
        </header>

        {/* فلاتر التصنيف */}
        <div className="flex gap-3 mb-10 overflow-x-auto hide-scrollbar pb-2">
          {['الكل', 'لقطات خام (RAW)', 'أصول سينمائية (LUTs)', 'مؤثرات صوتية (SFX)', 'تصوير جوي'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-colors border ${activeTab === tab ? 'bg-rose-600 border-rose-500 text-white' : 'bg-[#12121A] border-white/5 text-slate-400 hover:text-white hover:bg-white/5'}`}>
              {tab}
            </button>
          ))}
          <button className="mr-auto flex items-center gap-2 text-slate-400 hover:text-white px-4">
            <Filter className="w-4 h-4" /> تصفية الذكاء الاصطناعي
          </button>
        </div>

        {/* شبكة الأصول */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map(asset => (
            <div key={asset.id} className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] transition-all flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10 opacity-60"></div>
                <img src={asset.img} alt={asset.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="absolute top-3 right-3 bg-[#05050A]/80 backdrop-blur border border-white/10 px-3 py-1 rounded-lg text-[10px] font-bold font-mono text-rose-400 z-20 flex items-center gap-1">
                   <ShieldCheck className="w-3 h-3" /> {asset.format}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-black mb-1 text-white leading-snug">{asset.title}</h3>
                <p className="text-slate-400 text-xs mb-4 font-medium">المالك الأصلي: {asset.author}</p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                  <span className="text-xl font-black text-emerald-400">{asset.price}</span>
                  <button className="bg-[#12121A] border border-white/5 hover:bg-rose-600 text-slate-300 hover:text-white p-2.5 rounded-xl transition-all">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
