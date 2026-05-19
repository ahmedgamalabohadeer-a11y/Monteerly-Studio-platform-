'use client'
import React from 'react';
import { LifeBuoy, MessageSquare, BookOpen, AlertCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-white/5 pb-8 text-center">
          <LifeBuoy className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-4">مركز الدعم السيادي</h1>
          <p className="text-slate-400 text-lg">نحن هنا لحماية إمبراطوريتك. اختر طريقة التواصل المناسبة.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] text-center hover:bg-white/5 transition-colors cursor-pointer">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">فض النزاعات (Disputes)</h3>
            <p className="text-sm text-slate-400">تصعيد مشكلة متعلقة بالضمان المالي (Escrow).</p>
          </div>
          <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] text-center hover:bg-white/5 transition-colors cursor-pointer">
            <MessageSquare className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">التواصل المباشر</h3>
            <p className="text-sm text-slate-400">تحدث مع الدعم الفني عبر الشات الحي المشفر.</p>
          </div>
          <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem] text-center hover:bg-white/5 transition-colors cursor-pointer">
            <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">قاعدة المعرفة</h3>
            <p className="text-sm text-slate-400">أدلة استخدام النظام السيادي وحل المشكلات الشائعة.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
