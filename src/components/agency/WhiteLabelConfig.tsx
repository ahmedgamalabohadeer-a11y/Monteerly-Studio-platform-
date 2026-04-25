'use client';
import React, { useState } from 'react';
import { Palette, Upload, Globe, Check } from 'lucide-react';

export function WhiteLabelConfig() {
  const [color, setColor] = useState('#4f46e5');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-3xl shadow-xl">
       <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-6">
          <div className="p-4 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
            <Palette size={28} />
          </div>
          <div>
             <h3 className="text-2xl font-bold text-white">تخصيص الهوية (White-label)</h3>
             <p className="text-sm text-slate-400 mt-1">اجعل المنصة تبدو كأنها ملك لشركتك الخاصة لعملائك.</p>
          </div>
       </div>

       <div className="space-y-8">
          <div>
             <label className="block text-sm font-bold text-slate-300 mb-3">شعار الوكالة (Logo)</label>
             <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:bg-slate-800/50 transition-colors cursor-pointer group">
                <Upload size={32} className="mx-auto text-slate-500 mb-4 group-hover:text-indigo-400 transition-colors" />
                <p className="text-sm text-white font-bold">اضغط لرفع الشعار أو اسحبه هنا</p>
                <p className="text-xs text-slate-500 mt-2">PNG أو SVG بخلفية شفافة (أقصى حجم 2MB)</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <label className="block text-sm font-bold text-slate-300 mb-3">لون العلامة التجارية (Primary Color)</label>
                <div className="flex gap-4 items-center bg-slate-800 p-2 rounded-lg border border-slate-700">
                   <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent"
                   />
                   <input 
                      type="text" 
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-transparent border-none text-white font-mono outline-none uppercase"
                   />
                </div>
             </div>

             <div>
                <label className="block text-sm font-bold text-slate-300 mb-3">النطاق المخصص (Custom Domain)</label>
                <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700 focus-within:border-indigo-500 transition-colors">
                   <span className="bg-slate-950 px-4 py-3 text-slate-500 text-sm border-l border-slate-700 flex items-center gap-2">
                     <Globe size={16}/> https://
                   </span>
                   <input 
                      type="text" 
                      placeholder="clients.youragency.com"
                      className="flex-1 bg-transparent px-4 py-3 text-white text-sm outline-none"
                   />
                </div>
             </div>
          </div>
       </div>

       <div className="mt-10 pt-6 border-t border-slate-800 flex justify-end">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20">
             <Check size={18} /> حفظ الإعدادات وتطبيق الهوية
          </button>
       </div>
    </div>
  );
}
