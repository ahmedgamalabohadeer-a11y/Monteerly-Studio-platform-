'use client';
import React, { useState } from 'react';
import { Palette, Upload, Globe } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function WhiteLabelConfig() {
  const [color, setColor] = useState('#4f46e5');

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-8 max-w-3xl">
       <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl"><Palette size={24} /></div>
          <div>
             <h3 className="text-lg font-bold text-white">تخصيص الهوية (White-label)</h3>
             <p className="text-sm text-slate-400">اجعل المنصة تبدو كأنها ملك لشركتك الخاصة.</p>
          </div>
       </div>

       <div className="space-y-8">
          {/* Logo Upload */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-white/5 pb-8">
             <div className="md:col-span-1">
                <label className="text-sm font-bold text-white">شعار الشركة</label>
                <p className="text-xs text-slate-500 mt-1">يظهر في الهيدر وشاشة الدخول.</p>
             </div>
             <div className="md:col-span-2">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-center">
                   <Upload size={24} className="text-slate-400 mb-2" />
                   <span className="text-xs text-slate-300">اضغط لرفع الشعار (PNG, SVG)</span>
                </div>
             </div>
          </div>

          {/* Brand Color */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start border-b border-white/5 pb-8">
             <div className="md:col-span-1">
                <label className="text-sm font-bold text-white">اللون الأساسي</label>
                <p className="text-xs text-slate-500 mt-1">يستخدم للأزرار والروابط.</p>
             </div>
             <div className="md:col-span-2 flex gap-3">
                {['#4f46e5', '#ef4444', '#22c55e', '#eab308', '#ec4899'].map(c => (
                   <button 
                     key={c}
                     onClick={() => setColor(c)}
                     className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-white' : 'border-transparent'}`}
                     style={{ backgroundColor: c }}
                   />
                ))}
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="bg-transparent border-none w-8 h-8" />
             </div>
          </div>

          {/* Custom Domain */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
             <div className="md:col-span-1">
                <label className="text-sm font-bold text-white">النطاق الخاص (CNAME)</label>
                <p className="text-xs text-slate-500 mt-1">رابط دخول العملاء.</p>
             </div>
             <div className="md:col-span-2">
                <div className="flex">
                   <span className="bg-white/5 border border-white/10 border-l-0 rounded-r-lg px-3 py-2 text-sm text-slate-400 flex items-center">https://</span>
                   <input type="text" placeholder="portal.my-agency.com" className="flex-1 bg-black/40 border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none" />
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded w-fit">
                   <Globe size={12} /> يتطلب التحقق من DNS
                </div>
             </div>
          </div>
       </div>

       <div className="mt-8 flex justify-end">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">حفظ الإعدادات</Button>
       </div>
    </div>
  );
}
