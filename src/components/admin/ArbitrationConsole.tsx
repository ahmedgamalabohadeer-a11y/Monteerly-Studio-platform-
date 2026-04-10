'use client';
import React from 'react';
import { User, FileText, MessageSquare, Clock, Check, X, Split, DollarSign } from 'lucide-react';
import { InteractiveButton } from '@/components/system/InteractiveButton';

export function ArbitrationConsole() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
       {/* Timeline & Evidence */}
       <div className="lg:col-span-2 space-y-6 overflow-y-auto">
          {/* Dispute Header */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex justify-between items-center">
             <div>
                <h2 className="text-2xl font-bold text-white mb-1">نزاع: مشروع إعلان رمضان</h2>
                <div className="flex gap-2 text-sm text-slate-400">
                   <span className="flex items-center gap-1"><Clock size={14}/> مفتوح منذ 4 ساعات</span>
                   <span className="flex items-center gap-1 text-yellow-400"><DollarSign size={14}/> المبلغ المجمد: $1,500</span>
                </div>
             </div>
             <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-bold border border-red-500/30">
                HIGH PRIORITY
             </div>
          </div>

          {/* Two Sides */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4">المدعي (Freelancer)</div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
                   <div>
                      <div className="text-white font-bold">Ahmed K.</div>
                      <div className="text-xs text-green-400">98% Success Score</div>
                   </div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg text-sm text-slate-300 leading-relaxed border border-white/5">
                   "العميل طلب تعديلات لا نهائية خارج نطاق العقد الأصلي، والآن يرفض الدفع بحجة الجودة."
                </div>
             </div>

             <div className="bg-slate-900 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase mb-4">المدعى عليه (Client)</div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
                   <div>
                      <div className="text-white font-bold">MediaCorp LLC</div>
                      <div className="text-xs text-yellow-400">New Client</div>
                   </div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg text-sm text-slate-300 leading-relaxed border border-white/5">
                   "العمل المسلم لا يطابق الـ Storyboard المتفق عليه. الألوان باهتة والصوت غير متزامن."
                </div>
             </div>
          </div>

          {/* System Analysis */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-blue-400"/> تحليل النظام الآلي
             </h3>
             <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-green-400">
                   <Check size={14}/> العقد ينص على 3 جولات تعديل فقط. (العميل طلب 5).
                </li>
                <li className="flex items-center gap-2 text-green-400">
                   <Check size={14}/> الملفات المسلمة تطابق المواصفات التقنية (4K, ProRes).
                </li>
                <li className="flex items-center gap-2 text-red-400">
                   <X size={14}/> المونتير تأخر يومين عن الموعد النهائي.
                </li>
             </ul>
          </div>
       </div>

       {/* Judgment Panel */}
       <div className="bg-gradient-to-b from-slate-900 to-black border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6">قرار المحكمة</h3>
          
          <div className="space-y-3 flex-1">
             <button className="w-full p-4 rounded-xl border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-left transition-colors group">
                <div className="font-bold text-green-400 mb-1 group-hover:text-green-300">تحرير الأموال للمونتير</div>
                <div className="text-xs text-slate-400">العمل مقبول، العميل يماطل.</div>
             </button>

             <button className="w-full p-4 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-left transition-colors group">
                <div className="font-bold text-red-400 mb-1 group-hover:text-red-300">إعادة الأموال للعميل</div>
                <div className="text-xs text-slate-400">العمل غير مكتمل أو مخالف.</div>
             </button>

             <button className="w-full p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20 text-left transition-colors group">
                <div className="font-bold text-yellow-400 mb-1 group-hover:text-yellow-300">تقسيم المبلغ (تسوية)</div>
                <div className="text-xs text-slate-400">دفع 50% وإنهاء العقد ودياً.</div>
             </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
             <label className="text-xs text-slate-400 font-bold mb-2 block">ملاحظات الحكم (ترسل للطرفين)</label>
             <textarea className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white h-24 mb-4" placeholder="اكتب حيثيات الحكم..." />
             <InteractiveButton className="w-full" icon={<Check size={16}/>}>إصدار الحكم النهائي</InteractiveButton>
          </div>
       </div>
    </div>
  );
}
