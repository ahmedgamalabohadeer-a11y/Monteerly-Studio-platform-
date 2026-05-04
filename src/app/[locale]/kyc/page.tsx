'use client'
import React, { useState } from 'react';
import { ShieldAlert, Upload, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function KYCSecurityPortal() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle, processing, approved

  const simulateAIVerification = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('approved');
      setStep(3);
    }, 4000); // محاكاة عملية فحص الذكاء الاصطناعي للهوية
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        {/* شريط التقدم */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800">
          <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <header className="text-center mb-10 mt-4">
          <div className={`inline-flex p-4 rounded-full mb-4 ${status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-500'}`}>
            {status === 'approved' ? <UserCheck className="w-10 h-10" /> : <ShieldAlert className="w-10 h-10" />}
          </div>
          <h1 className="text-3xl font-black mb-2">امتثال سيادي (KYC & AML)</h1>
          <p className="text-slate-400 text-sm">التزاماً بالقوانين الدولية، يجب التحقق من هويتك قبل تفعيل المحفظة وسحب الأرباح.</p>
        </header>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
              <p className="text-xs text-amber-200/80 font-medium">البيانات مشفرة بتشفير عسكري (AES-256) ولا يتم مشاركتها مع أي طرف ثالث.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">رقم الهوية الوطنية / جواز السفر</label>
              <input type="text" placeholder="أدخل الرقم هنا..." className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:border-indigo-500 outline-none" />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-black transition-all">
              متابعة
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-indigo-500 cursor-pointer transition-colors bg-slate-950">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-300">الوجه الأمامي للهوية</p>
              </div>
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-indigo-500 cursor-pointer transition-colors bg-slate-950">
                <UserCheck className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-slate-300">صورة سيلفي حية (Liveness)</p>
              </div>
            </div>
            <button 
              onClick={simulateAIVerification}
              disabled={status === 'processing'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2"
            >
              {status === 'processing' ? <span className="animate-pulse">جاري فحص المستندات عبر الذكاء الاصطناعي...</span> : 'تشفير وإرسال للتحقق'}
            </button>
          </div>
        )}

        {step === 3 && status === 'approved' && (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 mb-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-emerald-400 mb-2">تم التوثيق بنجاح!</h2>
              <p className="text-emerald-200/80 text-sm">هويتك الآن موثقة (KYC Level 1). حدود السحب الخاصة بك ارتفعت إلى 10,000 دولار شهرياً.</p>
            </div>
            <button onClick={() => window.location.href = '/ar/dashboard'} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
              العودة للوحة القيادة
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
