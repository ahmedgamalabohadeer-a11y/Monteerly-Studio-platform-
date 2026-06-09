'use client'
import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

export default function EscrowHubPage() {
  const [stage, setStage] = useState('review');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
            <h1 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                <ShieldCheck className="text-emerald-500" /> العقد السيادي الموثق
            </h1>
            <p className="text-slate-400">حماية مالية مشفرة لضمان حقوق الطرفين</p>
        </header>

        {stage === 'review' && (
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><FileText /> بنود التعاقد</h2>
              <div className="bg-slate-900 p-6 rounded-xl text-sm text-slate-400 mb-6 h-40 overflow-y-auto border border-white/5">
                 <p className="mb-4">1. يتم حجز مبلغ التعاقد في خزنة Monteerly المشفرة فور التوثيق.</p>
                 <p className="mb-4">2. لا يتم تحرير المبلغ للمبدع إلا بعد استلام العميل للعمل ومطابقته للمواصفات.</p>
                 <p className="mb-4">3. في حال حدوث نزاع، يتدخل نظام التحكيم السيادي للفصل في المطالبات.</p>
              </div>
              
              <label className="flex items-center gap-3 mb-8 cursor-pointer">
                 <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5 rounded border-white/10" />
                 <span className="text-sm font-bold">أوافق على بنود العقد السيادي وألتزم بشروط الضمان المالي.</span>
              </label>

              <button 
                disabled={!agreed}
                onClick={() => setStage('locking')} 
                className={`w-full py-4 rounded-xl font-black text-lg transition-all ${agreed ? 'bg-emerald-600 hover:bg-emerald-500 shadow-lg' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                توثيق العقد وبدء الحجز المالي
              </button>
           </div>
        )}

        {stage === 'locking' && (
           <div className="text-center p-12 bg-[#0A0A0F] border border-white/5 rounded-[2rem]">
              <Lock className="w-16 h-16 mx-auto mb-6 text-indigo-500 animate-bounce" />
              <h2 className="text-2xl font-black mb-2">جاري حجز الأموال...</h2>
              <p className="text-slate-400">تأمين مبلغ 150$ في حساب الضمان المشفر</p>
           </div>
        )}
      </div>
    </div>
  );
}
