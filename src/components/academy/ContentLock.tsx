'use client';
import React from 'react';
import { Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ContentLock() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 group">
       {/* Blurred Content Background */}
       <div className="p-8 bg-slate-900 blur-sm opacity-50 select-none pointer-events-none">
          <h3 className="text-2xl font-bold text-white mb-4">الدرس 4: أسرار تصحيح الألوان السينمائي</h3>
          <p className="text-slate-300 mb-4">في هذا الدرس سنتعلم كيفية استخدام المنحنيات (Curves) لضبط تباين الصورة...</p>
          <div className="h-64 bg-slate-800 rounded-xl mb-4"></div>
          <p className="text-slate-300">محتوى تجريبي محجوب للحفاظ على حقوق الملكية الفكرية...</p>
       </div>
       {/* Lock Overlay */}
       <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 p-6 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/30">
             <Lock size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">هذا المحتوى مقفل</h3>
          <p className="text-slate-400 mb-6 max-w-md">قم بترقية حسابك إلى باقة المبدعين (Pro) للوصول إلى مكتبة الدروس والموارد الكاملة.</p>
          <button className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/25">
             <Star size={20} className="fill-current" /> ترقية الحساب الآن
          </button>
          <p className="mt-4 text-xs text-slate-500">ضمان استرجاع الأموال لمدة 14 يوم</p>
       </div>
    </div>
  );
}
