'use client';
import React from 'react';
import { Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContentLock() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
       {/* Blurred Content Background */}
       <div className="p-8 bg-slate-900 blur-sm opacity-50 select-none pointer-events-none">
          <h3 className="text-2xl font-bold text-white mb-4">الدرس 4: أسرار تصحيح الألوان السينمائي</h3>
          <p className="text-slate-300 mb-4">في هذا الدرس سنتعلم كيفية استخدام المنحنيات (Curves) لضبط تباين الصورة...</p>
          <div className="h-64 bg-slate-800 rounded-xl mb-4"></div>
          <p className="text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
       </div>

       {/* Lock Overlay */}
       <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent z-10 p-6 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/30">
             <Lock size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">هذا المحتوى حصري للمشتركين</h3>
          <p className="text-slate-300 max-w-md mb-8">اشترك في باقة Pro لتكملة المسار التعليمي والحصول على الشهادة المعتمدة.</p>
          <Button className="bg-white text-indigo-900 font-bold px-8 py-3 hover:bg-slate-200">
             ترقية الحساب بـ $15/شهر
          </Button>
          <p className="mt-4 text-xs text-slate-500">ضمان استرجاع الأموال لمدة 14 يوم</p>
       </div>
    </div>
  );
}
