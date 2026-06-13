'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldAlert, Upload, CheckCircle2, UserCheck, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function KYCSecurityPortal() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle');

  const simulateAIVerification = () => {
    setStatus('processing');
    setTimeout(() => { setStatus('approved'); setStep(3); }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden" dir="rtl">
      <Image
        src={MCOS_ASSETS.security.digitalLock.src}
        alt=""
        fill
        sizes="100vw"
        priority
        className="absolute inset-0 w-full h-full object-cover opacity-[0.03] mix-blend-screen pointer-events-none"
      />

      <div className="w-full max-w-2xl bg-[#0A0A0F]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#12121A]">
          <div className="h-full bg-emerald-500 transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <header className="text-center mb-10 mt-4">
          <div className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg border ${status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
            {status === 'approved' ? <ShieldCheck className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
          </div>
          <h1 className="text-3xl font-black mb-3">مستوى التوثيق السيادي (KYC)</h1>
          <p className="text-slate-400 text-sm md:text-base font-medium">التزاماً ببروتوكولات (AML)، يجب مطابقة الهوية لتفعيل العقود الذكية.</p>
        </header>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-xs md:text-sm text-amber-200/80 font-bold leading-relaxed">البيانات مشفرة بتشفير عسكري (AES-256) ولا يتم مشاركتها. يتم إعدام الصور بعد مطابقتها.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">رقم الهوية الوطنية / جواز السفر</label>
              <input type="text" placeholder="أدخل الرقم التعريفي هنا..." className="w-full bg-[#12121A] border border-white/10 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] mt-4">
              بدء جلسة التشفير
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center hover:border-indigo-500 cursor-pointer transition-colors bg-[#12121A]">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-300">رفع الوثيقة (مشفر)</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center hover:border-indigo-500 cursor-pointer transition-colors bg-[#12121A]">
                <UserCheck className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-300">مسح البصمة الحيوية</p>
              </div>
            </div>
            <button onClick={simulateAIVerification} disabled={status === 'processing'} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-[#12121A] disabled:border disabled:border-white/5 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 mt-4">
              {status === 'processing' ? <span className="animate-pulse flex items-center gap-2">يحلل المساعد الإخراجي البصمة...</span> : 'تشفير وإرسال للمطابقة'}
            </button>
          </div>
        )}

        {step === 3 && status === 'approved' && (
          <div className="text-center">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] p-8 mb-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-emerald-400 mb-2">تمت المطابقة بنجاح!</h2>
              <p className="text-emerald-200/80 text-sm font-bold leading-relaxed">أنت الآن عضو موثق سيادياً. يمكنك البدء بإصدار المطالبات المالية واستلام الحوالات.</p>
            </div>
            <button onClick={() => window.location.href = '/ar/dashboard'} className="bg-[#12121A] hover:bg-slate-800 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all w-full md:w-auto">
              تأكيد والعودة لمركز القيادة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
