'use client';
import React, { useState } from 'react';
import { Palette, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WhiteLabelSettings() {
  const [primaryColor, setPrimaryColor] = useState('#4f46e5');
  
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-8 max-w-4xl">
       <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="p-3 bg-pink-500/20 text-pink-400 rounded-xl"><Palette size={24} /></div>
          <div>
             <h3 className="text-xl font-bold text-white">تخصيص الهوية (White-Label)</h3>
             <p className="text-slate-400 text-sm">اجعل المنصة تبدو وكأنها نظامك الخاص أمام عملائك.</p>
          </div>
          <div className="mr-auto bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1 rounded text-xs font-bold uppercase">
             Agency Plan
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Logo Upload */}
          <div className="space-y-4">
             <label className="block text-sm font-bold text-white">شعار الاستوديو</label>
             <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <Upload size={24} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-300">اسحب الشعار هنا أو اضغط للرفع</p>
                <p className="text-xs text-slate-500 mt-2">PNG, SVG (Max 2MB)</p>
             </div>
          </div>

          {/* Color Scheme */}
          <div className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-white mb-3">اللون الأساسي</label>
                <div className="flex gap-3">
                   {['#4f46e5', '#ef4444', '#22c55e', '#eab308', '#ec4899', '#06b6d4'].map(color => (
                      <button 
                        key={color}
                        onClick={() => setPrimaryColor(color)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${primaryColor === color ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                      >
                         {primaryColor === color && <Check size={16} className="text-white" />}
                      </button>
                   ))}
                   <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
                      <input type="color" className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" onChange={(e) => setPrimaryColor(e.target.value)} />
                   </div>
                </div>
             </div>

             {/* Domain Settings */}
             <div>
                <label className="block text-sm font-bold text-white mb-2">النطاق الخاص (Custom Domain)</label>
                <div className="flex">
                   <span className="bg-white/5 border border-white/10 border-l-0 rounded-r-lg px-4 py-3 text-slate-400 text-sm flex items-center">https://</span>
                   <input type="text" placeholder="portal.youragency.com" className="flex-1 bg-black/40 border border-white/10 rounded-l-lg px-4 py-3 text-white focus:border-indigo-500 outline-none text-sm" />
                </div>
             </div>
          </div>
       </div>

       {/* Live Preview */}
       <div className="mt-12 p-6 bg-black rounded-xl border border-white/10">
          <h4 className="text-xs text-slate-500 uppercase font-bold mb-4">معاينة حية</h4>
          <div className="flex gap-4">
             <Button style={{ backgroundColor: primaryColor }} className="text-white">زر أساسي</Button>
             <Button variant="outline" style={{ color: primaryColor, borderColor: primaryColor }} className="bg-transparent">زر ثانوي</Button>
          </div>
       </div>
       
       <div className="mt-8 flex justify-end">
          <Button className="bg-white text-black font-bold hover:bg-slate-200">حفظ التغييرات</Button>
       </div>
    </div>
  );
}

