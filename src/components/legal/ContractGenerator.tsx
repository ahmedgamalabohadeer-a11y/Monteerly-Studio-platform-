'use client';
import React, { useState } from 'react';
import { FileText, Download, Check, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContractGenerator() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-8 max-w-2xl mx-auto">
       <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
             <FileText size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">مولد العقود الذكي</h2>
          <p className="text-slate-400">أنشئ عقوداً قانونية تحمي حقوقك في دقائق.</p>
       </div>

       {/* Steps Progress */}
       <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10" />
          {[1, 2, 3].map((s) => (
             <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {step > s ? <Check size={14} /> : s}
             </div>
          ))}
       </div>

       {/* Form Simulation */}
       <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs text-slate-400 mb-1">الطرف الأول (أنت)</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm" placeholder="اسمك الكامل" />
             </div>
             <div>
                <label className="block text-xs text-slate-400 mb-1">الطرف الثاني (العميل)</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm" placeholder="اسم العميل / الشركة" />
             </div>
          </div>
          <div>
             <label className="block text-xs text-slate-400 mb-1">نوع المشروع</label>
             <select className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm">
                <option>إنتاج فيديو (Video Production)</option>
                <option>موشن جرافيك (Motion Graphics)</option>
                <option>تصميم هوية (Branding)</option>
             </select>
          </div>
          <div>
             <label className="block text-xs text-slate-400 mb-1">قيمة العقد</label>
             <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white text-sm" placeholder="مثال: 5000 ريال سعودي" />
          </div>
       </div>

       <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-lg shadow-lg shadow-indigo-500/20">
          <PenTool size={18} className="ml-2" /> إنشاء العقد وتوقيعه رقمياً
       </Button>
       <p className="text-center text-[10px] text-slate-500 mt-4">
          يتم إنشاء العقود بناءً على القوانين المحلية المعمول بها في المملكة العربية السعودية ومصر.
       </p>
    </div>
  );
}

