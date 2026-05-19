'use client'
import React, { useState } from 'react';
import { Link as LinkIcon, Package, PlusCircle, Copy, ShieldCheck, TrendingUp, ExternalLink } from 'lucide-react';

export default function SovereignStore() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // بيانات وهمية للخدمات المعلبة (Productized Services)
  const products = [
    { id: 1, title: 'مونتاج فيديو إعلاني (30 ثانية)', price: '$500', delivery: '3 أيام', sales: 12, clicks: 340, status: 'نشط' },
    { id: 2, title: 'تلوين سينمائي (Color Grading) لفيلم قصير', price: '$1200', delivery: '7 أيام', sales: 3, clicks: 85, status: 'نشط' },
    { id: 3, title: 'حزمة قوالب نصوص متحركة (MOGRTs)', price: '$45', delivery: 'تسليم فوري', sales: 89, clicks: 1200, status: 'نشط' }
  ];

  const handleCopy = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans pt-20 md:pt-24 relative overflow-hidden" dir="rtl">
      
      {/* خلفية سيبرانية */}
      <div className="absolute top-0 left-0 w-full h-96 bg-emerald-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <LinkIcon className="w-3 h-3" /> ميزة جلب العميل المباشر (BYOC)
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3 text-white">
              <Package className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" /> المتجر والروابط السيادية
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-medium">علّب خدماتك، ولّد روابط دفع مشفرة، واستقبل عملاءك من خارج المنصة بعمولة 2.9% فقط.</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 flex items-center gap-2 w-full md:w-auto justify-center">
            <PlusCircle className="w-5 h-5" /> تعليب خدمة جديدة
          </button>
        </header>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden shadow-lg hover:border-white/10 transition-colors">
            <TrendingUp className="absolute -left-4 -bottom-4 w-32 h-32 text-white/5 pointer-events-none" />
            <h3 className="text-slate-400 font-bold mb-2 text-sm">إجمالي المبيعات المباشرة</h3>
            <div className="text-4xl font-black text-white">$14,605</div>
          </div>
          <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8 shadow-lg hover:border-white/10 transition-colors">
            <h3 className="text-slate-400 font-bold mb-2 text-sm">النقرات على الروابط</h3>
            <div className="text-4xl font-black text-white">1,625</div>
          </div>
          <div className="bg-gradient-to-br from-[#0A0A0F] to-emerald-950/20 border border-emerald-500/20 rounded-[2rem] p-8 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <h3 className="text-emerald-400 font-bold mb-2 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> أموال في قبو الضمان (Escrow)</h3>
            <div className="text-4xl font-black text-white">$2,100</div>
          </div>
        </div>

        {/* قائمة المنتجات والروابط */}
        <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-[#12121A]">
            <h2 className="text-xl font-black text-white">الخدمات المعلبة (Productized Services)</h2>
          </div>
          <div className="divide-y divide-white/5">
            {products.map((p) => (
              <div key={p.id} className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white/5 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-black text-lg md:text-xl text-white">{p.title}</h3>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-black border border-emerald-500/20 uppercase tracking-wider">{p.status}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-bold text-slate-400">
                    <span className="text-emerald-400 text-xl font-black bg-emerald-500/10 px-3 py-1 rounded-lg">{p.price}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="bg-[#12121A] border border-white/10 px-3 py-1 rounded-lg">التسليم: {p.delivery}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="bg-[#12121A] border border-white/10 px-3 py-1 rounded-lg">المبيعات: {p.sales}</span>
                  </div>
                </div>
                
                <div className="flex w-full md:w-auto items-center gap-3 mt-4 md:mt-0">
                  <button className="flex-1 md:flex-none bg-[#12121A] hover:bg-slate-800 border border-white/10 text-white px-5 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4 text-slate-400" /> تعديل
                  </button>
                  <button 
                    onClick={() => handleCopy(p.id)}
                    className={`flex-1 md:flex-none px-6 py-3.5 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${copiedId === p.id ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]'}`}
                  >
                    {copiedId === p.id ? <><ShieldCheck className="w-4 h-4" /> تم النسخ بنجاح!</> : <><Copy className="w-4 h-4" /> نسخ الرابط السيادي</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
