'use client';
import React, { useState } from 'react';
import { Upload, Layout, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function BrandingEditor() {
  const [color, setColor] = useState('#4f46e5');
  const [domain, setDomain] = useState('portal.myagency.com');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       {/* Settings */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 space-y-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Layout className="text-purple-400" /> تخصيص البوابة (White-Label)
          </h3>
          <p className="text-sm text-slate-400">اجعل منصة Monteerly تبدو وكأنها نظامك الخاص أمام عملائك.</p>

          <div>
             <label className="text-xs text-slate-300 font-bold mb-2 block">شعار الوكالة</label>
             <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                <Upload size={24} className="text-slate-500 mb-2" />
                <span className="text-xs text-slate-400">اضغط لرفع الشعار (PNG, SVG)</span>
             </div>
          </div>

          <div>
             <label className="text-xs text-slate-300 font-bold mb-2 block">اللون الأساسي (Brand Color)</label>
             <div className="flex gap-4 items-center">
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="w-12 h-12 rounded cursor-pointer bg-transparent border-none"
                />
                <input 
                  type="text" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm"
                />
             </div>
          </div>

          <div>
             <label className="text-xs text-slate-300 font-bold mb-2 block">النطاق الخاص (Custom Domain)</label>
             <div className="flex gap-2">
                <div className="relative flex-1">
                   <Globe size={16} className="absolute right-3 top-3 text-slate-500" />
                   <input 
                     type="text" 
                     value={domain}
                     onChange={(e) => setDomain(e.target.value)}
                     className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 pr-9 text-white text-sm font-mono"
                   />
                </div>
                <Button className="bg-white text-black font-bold">تحقق</Button>
             </div>
             <p className="text-[10px] text-green-400 mt-2 flex items-center gap-1">
                ● CNAME Configured Successfully
             </p>
          </div>
       </div>

       {/* Preview */}
       <div className="bg-slate-800 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-center text-slate-500 mb-2">معاينة شاشة الدخول للعميل</div>
          <div className="bg-white rounded-lg aspect-video flex items-center justify-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 w-full h-1" style={{ backgroundColor: color }} />
             <div className="text-center p-8 border border-slate-100 rounded-xl shadow-lg bg-white/50 backdrop-blur">
                <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-[10px] font-bold text-slate-500">LOGO</div>
                <h4 className="font-bold text-slate-900 mb-1">تسجيل الدخول</h4>
                <p className="text-xs text-slate-500 mb-4">مرحباً بك في بوابة عملاء Vision Agency</p>
                <button 
                  className="text-white text-xs px-6 py-2 rounded font-bold w-full"
                  style={{ backgroundColor: color }}
                >
                   الدخول للمشروع
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

