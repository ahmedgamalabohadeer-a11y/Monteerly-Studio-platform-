'use client'
import React from 'react';
import { GitMerge, Plus, ArrowLeft, Video, Sparkles, CheckCircle } from 'lucide-react';

export default function AgencyWorkflow() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <GitMerge className="w-8 h-8 text-indigo-500" /> محرك سير العمل (Workflows)
            </h1>
            <p className="text-slate-400">أتمتة دورة الإنتاج بين أعضاء الوكالة والذكاء الاصطناعي.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-black flex items-center gap-2">
            <Plus className="w-5 h-5" /> مسار جديد
          </button>
        </header>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
          <h3 className="font-black text-xl mb-6">مسار: "إنتاج بودكاست أسبوعي"</h3>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* خطوة 1 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full text-center">
              <Video className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">الرفع الخام</h4>
              <p className="text-xs text-slate-500">بواسطة: أحمد (المصور)</p>
            </div>
            
            <ArrowLeft className="w-8 h-8 text-slate-50 hidden md:block rotate-180 md:rotate-0 shrink-0" />
            
            {/* خطوة 2 (AI) */}
            <div className="bg-indigo-500/10 border border-indigo-500/30 p-6 rounded-2xl w-full text-center">
              <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
              <h4 className="font-bold text-indigo-300 mb-1">استخراج النصوص آلياً</h4>
              <p className="text-xs text-indigo-500/70">بواسطة: MCOS AI Engine</p>
            </div>

            <ArrowLeft className="w-8 h-8 text-slate-50 hidden md:block rotate-180 md:rotate-0 shrink-0" />

            {/* خطوة 3 */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full text-center opacity-50">
              <CheckCircle className="w-8 h-8 text-rose-500 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-1">الرندر النهائي والمراجعة</h4>
              <p className="text-xs text-slate-500">قيد الانتظار...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
