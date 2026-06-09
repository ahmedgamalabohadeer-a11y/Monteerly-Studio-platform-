import os

disputes_dir = "src/app/[locale]/disputes"
file_path = os.path.join(disputes_dir, "page.tsx")
os.makedirs(disputes_dir, exist_ok=True)

content = r"""'use client'
import React from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function DisputesPage() {
  // بيانات وهمية للنزاعات الحالية
  const disputes = [
    { id: "DSP-092", contract: "مونتاج فيديو إعلاني", client: "شركة الأفق", freelancer: "أحمد جمال", amount: "450$", reason: "تأخير في التسليم ومخالفة الجودة", status: "بانتظار الحكم" },
    { id: "DSP-088", contract: "هوية بصرية", client: "مؤسسة الرؤية", freelancer: "سارة محمد", amount: "1,200$", reason: "عدم تسليم الملفات المفتوحة", status: "تحت المراجعة" }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8 font-sans" dir="rtl">
        <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-rose-500">
                <ShieldAlert size={36} /> إدارة النزاعات السيادية
            </h1>
            <p className="text-slate-400 text-sm">مركز اتخاذ القرارات المالية والفصل في الخلافات بين العملاء والمبدعين.</p>
        </header>

        <div className="space-y-6">
            {disputes.map(d => (
                <div key={d.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-xs font-bold border border-rose-500/20">{d.id}</span>
                            <h3 className="font-black text-xl">{d.contract}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-[#12121A] p-4 rounded-xl border border-white/5">
                            <div><span className="text-slate-500">العميل (المشتكي):</span> <span className="font-bold">{d.client}</span></div>
                            <div><span className="text-slate-500">المبدع (المشتكى عليه):</span> <span className="font-bold">{d.freelancer}</span></div>
                            <div className="col-span-2"><span className="text-slate-500">السبب:</span> <span className="text-amber-400 font-bold">{d.reason}</span></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4 w-full md:w-auto bg-[#05050A] p-5 rounded-2xl border border-white/5">
                        <div className="text-right w-full">
                            <p className="text-slate-500 text-xs font-bold mb-1">المبلغ المحتجز (Escrow)</p>
                            <p className="text-2xl font-black text-white">{d.amount}</p>
                        </div>
                        <div className="flex gap-2 w-full mt-2">
                            <button className="flex-1 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-emerald-500/20">
                                <CheckCircle size={16} /> لصالح المبدع
                            </button>
                            <button className="flex-1 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-black transition-all px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-rose-500/20">
                                <XCircle size={16} /> إعادة للعميل
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم إنشاء وحدة إدارة النزاعات السيادية بنجاح!")
