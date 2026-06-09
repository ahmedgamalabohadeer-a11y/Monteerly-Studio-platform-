import os

# المسار: /dashboard/contracts
contracts_dir = "src/app/[locale]/dashboard/contracts"
file_path = os.path.join(contracts_dir, "page.tsx")
os.makedirs(contracts_dir, exist_ok=True)

content = r"""'use client'
import React from 'react';
import { Briefcase, Clock, CheckCircle2 } from 'lucide-react';

export default function ContractsPage() {
  const activeContracts = [
    { id: 1, title: "مونتاج فيديو وثائقي", freelancer: "أحمد جمال", status: "قيد التنفيذ", deadline: "بعد 3 أيام" },
    { id: 2, title: "تصوير تراثي", freelancer: "طارق زياد", status: "في انتظار المراجعة", deadline: "اليوم" }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8" dir="rtl">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3"><Briefcase className="text-indigo-500" /> العقود النشطة</h1>
        
        <div className="space-y-4">
            {activeContracts.map(c => (
                <div key={c.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-2xl flex justify-between items-center">
                    <div>
                        <h3 className="font-black text-lg">{c.title}</h3>
                        <p className="text-sm text-slate-400">مع المبدع: {c.freelancer}</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-emerald-400 font-bold">{c.status}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <Clock size={12} /> {c.deadline}
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
print("✅ تم إنشاء محرك العقود النشطة بنجاح!")
