'use client'
import React, { useState } from 'react';
import { PlayCircle, Download, Film, Camera, Filter, ShoppingCart } from 'lucide-react';

export default function RealisticVideoLibrary() {
  const [activeTab, setActiveTab] = useState('raw');

  const assets = [
    { id: 1, title: "لقطات درون للقاهرة (4K RAW)", type: "raw", author: "أحمد المصور", price: "$45", format: "ProRes 422", img: "https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?q=80&w=2000" },
    { id: 2, title: "حزمة مقابلات (Green Screen)", type: "raw", author: "استوديو العدسة", price: "$20", format: "MP4 10bit", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=2000" },
    { id: 3, title: "انتقالات سينمائية (Glitch)", type: "presets", author: "MCOS Official", price: "مجاني للمشتركين", format: "Premiere Pro", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black mb-3 flex items-center gap-3">
              <Film className="w-8 h-8 text-rose-500" /> مكتبة الفيديوهات والأصول الواقعية
            </h1>
            <p className="text-slate-400 text-lg">منصة المصورين لبيع اللقطات الخام (Raw Footage) ومشاركة الأصول الإبداعية.</p>
          </div>
          <button className="bg-slate-900 border border-slate-700 hover:border-rose-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Camera className="w-5 h-5" /> هل أنت مصور؟ بع لقطاتك
          </button>
        </header>

        {/* فلاتر التصنيف */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {['الكل', 'لقطات خام (Raw)', 'قوالب بريمير', 'مؤثرات صوتية', 'فلاتر (LUTs)'].map(tab => (
            <button key={tab} className="bg-slate-900 hover:bg-rose-600 border border-slate-800 px-6 py-2 rounded-full font-bold whitespace-nowrap transition-colors">
              {tab}
            </button>
          ))}
          <button className="mr-auto flex items-center gap-2 text-slate-400 hover:text-white">
            <Filter className="w-4 h-4" /> تصفية متقدمة
          </button>
        </div>

        {/* شبكة الفيديوهات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map(asset => (
            <div key={asset.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-rose-500/50 transition-all">
              <div className="relative h-56 overflow-hidden">
                <img src={asset.img} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold font-mono text-rose-400">
                  {asset.format}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black mb-2">{asset.title}</h3>
                <p className="text-slate-400 text-sm mb-4">المصور/المصمم: {asset.author}</p>
                <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                  <span className="text-xl font-black text-white">{asset.price}</span>
                  <button className="bg-rose-600 hover:bg-rose-500 text-white p-3 rounded-xl transition-all">
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
