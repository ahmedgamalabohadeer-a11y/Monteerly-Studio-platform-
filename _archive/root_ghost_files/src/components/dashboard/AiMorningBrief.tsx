'use client';
import React, { useState } from 'react';
import { Sparkles, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';
// استخدام زر TypeUI
import Button from '@/components/ui/Button';

export function AiMorningBrief() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="mb-8 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden animate-in slide-in-from-top-4">
       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

       <div className="flex items-start justify-between">
          <div className="flex gap-4">
             <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                <Sparkles size={24} className="text-white" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white mb-1">صباح الخير، أحمد! 👋</h2>
                <p className="text-slate-300 text-sm mb-4 max-w-xl">
                   قام الذكاء الاصطناعي بتحليل مشاريعك. لديك <span className="text-white font-bold">3 أولويات</span> اليوم لضمان التسليم في الموعد:
                </p>
                
                <div className="space-y-2">
                   <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <AlertTriangle size={16} className="text-red-400" />
                      <span className="text-sm text-slate-200 flex-1">مشروع "إعلان رمضان" يحتاج مراجعة نهائية (ينتهي اليوم)</span>
                      <button className="h-7 px-3 rounded text-xs font-bold bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white transition-colors">افتح المشروع</button>
                   </div>
                   <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <Clock size={16} className="text-yellow-400" />
                      <span className="text-sm text-slate-200 flex-1">فاتورة #9021 مستحقة الدفع من العميل</span>
                      <button className="h-7 px-3 rounded text-xs font-bold bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500 hover:text-white transition-colors">تذكير العميل</button>
                   </div>
                   <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-sm text-slate-200 flex-1">تمت الموافقة على النسخة v2 من "وثائقي النيل"</span>
                      <button className="h-7 px-3 rounded text-xs font-bold bg-green-500/20 text-green-300 hover:bg-green-500 hover:text-white transition-colors">أرشفة</button>
                   </div>
                </div>
             </div>
          </div>
          
          <button onClick={() => setVisible(false)} className="text-slate-500 hover:text-white transition-colors">
             <X size={20} />
          </button>
       </div>
    </div>
  );
}
