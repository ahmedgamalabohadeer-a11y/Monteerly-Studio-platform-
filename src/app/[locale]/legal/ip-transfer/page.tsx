'use client'
import React from 'react';
import { FileSignature, ShieldCheck, Download } from 'lucide-react';

export default function IpTransferContract() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-center border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <FileSignature className="w-8 h-8 text-emerald-500" /> ملحق نقل الملكية الفكرية
            </h1>
            <p className="text-slate-400 mt-2">يُفعل تلقائياً بعد تحرير أموال الضمان (Escrow).</p>
          </div>
          <button className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            <Download className="w-4 h-4" /> تحميل PDF
          </button>
        </header>

        <div className="bg-slate-50 text-slate-900 p-12 rounded-[2rem] shadow-2xl font-serif">
          <div className="text-center mb-10 border-b-2 border-slate-200 pb-6">
            <h2 className="text-2xl font-black">عقد نقل حقوق الملكية الفكرية (IP Transfer)</h2>
            <p className="text-slate-500 font-bold mt-2">تم التوثيق عبر MCOS Smart Contracts</p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-700 font-medium">
            <p>بموجب هذا العقد الرقمي، وبمجرد اكتمال تحويل الدفعة المالية من محفظة الضمان (Escrow) إلى حساب الطرف الثاني (المبدع/المونتير)، يقر الطرف الثاني بالتنازل الكامل والتام عن كافة حقوق الملكية الفكرية، وحقوق النشر، وحقوق التوزيع المتعلقة بالعمل الفني/المرئي المُسلم إلى الطرف الأول (العميل).</p>
            <p>يصبح الطرف الأول هو المالك الحصري والوحيد للمصنف، ويحق له تعديله، توزيعه، أو استغلاله تجارياً دون الرجوع للطرف الثاني أو التزام بأي تعويضات مالية إضافية.</p>
            
            <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 mt-8">
              <h4 className="font-black text-slate-900 mb-4">التوقيعات المشفرة (Cryptographic Signatures)</h4>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">توقيع العميل (الطرف الأول)</p>
                  <p className="font-mono font-bold text-indigo-600 mt-1">0x8f2a...c91</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">توقيع المبدع (الطرف الثاني)</p>
                  <p className="font-mono font-bold text-emerald-600 mt-1">0x3b1e...f4a</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
