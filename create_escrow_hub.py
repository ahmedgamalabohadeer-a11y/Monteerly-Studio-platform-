import os

# إنشاء مسار المحرك المالي
hub_dir = "src/app/[locale]/marketplace/escrow/[id]"
file_path = os.path.join(hub_dir, "page.tsx")
os.makedirs(hub_dir, exist_ok=True)

content = r"""'use client'
import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Wallet } from 'lucide-react';

export default function EscrowHubPage() {
  const [stage, setStage] = useState('review'); // review, locking, success

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
            <h1 className="text-3xl font-black mb-2 flex items-center justify-center gap-2">
                <ShieldCheck className="text-emerald-500" /> العقد السيادي الموثق
            </h1>
            <p className="text-slate-400">نظام Escrow لضمان الحقوق المالية</p>
        </header>

        {stage === 'review' && (
           <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
              <h2 className="text-xl font-bold mb-6">تفاصيل التعاقد</h2>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between p-4 bg-slate-900 rounded-xl"><span>المبلغ المحجوز</span><span className="font-black text-indigo-400">150$</span></div>
                 <div className="flex justify-between p-4 bg-slate-900 rounded-xl"><span>حالة العقد</span><span className="text-emerald-400">جاهز للتوثيق</span></div>
              </div>
              <button onClick={() => setStage('locking')} className="w-full bg-emerald-600 py-4 rounded-xl font-black text-lg">
                توثيق العقد وبدء الحجز المالي
              </button>
           </div>
        )}

        {stage === 'locking' && (
           <div className="text-center p-12 bg-[#0A0A0F] border border-white/5 rounded-[2rem] animate-pulse">
              <Lock className="w-16 h-16 mx-auto mb-6 text-indigo-500" />
              <h2 className="text-2xl font-black mb-2">جاري حجز الأموال في الخزنة</h2>
              <p className="text-slate-400">يتم الآن تأمين مبلغ التعاقد في حساب الضمان المشفر...</p>
           </div>
        )}
      </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم إنشاء محرك الـ Escrow بنجاح!")
