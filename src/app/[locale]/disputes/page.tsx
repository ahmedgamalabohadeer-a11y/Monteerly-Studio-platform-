'use client'
import React, { useState } from 'react';
import { Scale, AlertOctagon, UploadCloud, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DisputeCenter() {
  const [status, setStatus] = useState('idle');

  const fileDispute = () => {
    setStatus('processing');
    setTimeout(() => setStatus('submitted'), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 text-center">
          <div className="inline-block bg-rose-500/10 p-4 rounded-full mb-4">
            <Scale className="w-10 h-10 text-rose-500" />
          </div>
          <h1 className="text-4xl font-black mb-2">مركز التحكيم وفض المنازعات</h1>
          <p className="text-slate-400">حماية سيادية. لا يتم تحرير أموال الضمان (Escrow) إلا بعد حل النزاع.</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex gap-4 mb-8">
            <AlertOctagon className="w-6 h-6 text-rose-500 shrink-0" />
            <div>
              <h4 className="text-rose-400 font-bold mb-1">تعليمات فتح النزاع</h4>
              <p className="text-sm text-slate-400">سيتم تجميد المشروع المالي فوراً. يجب تقديم أدلة مادية (محادثات، ملفات مسودة) لدعم موقفك أمام لجنة تحكيم MCOS.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">رقم المشروع المشفر</label>
              <input type="text" placeholder="مثال: MCOS-PRJ-9821" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:border-rose-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">تفاصيل النزاع</label>
              <textarea rows={4} placeholder="اشرح المشكلة التقنية أو المالية بوضوح..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:border-rose-500 outline-none resize-none" />
            </div>

            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-300">أرفق الأدلة (صور، ملفات PDF)</p>
            </div>

            <button 
              onClick={fileDispute}
              disabled={status !== 'idle'}
              className="w-full bg-rose-600 hover:bg-rose-500 disabled:bg-emerald-600 text-white py-4 rounded-xl font-black transition-all flex justify-center items-center gap-2"
            >
              {status === 'idle' && <Scale className="w-5 h-5" />}
              {status === 'idle' && 'تصعيد النزاع للجنة التحكيم'}
              {status === 'processing' && 'جاري تشفير الأدلة...'}
              {status === 'submitted' && <><CheckCircle2 className="w-5 h-5" /> تم رفع النزاع بنجاح</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
