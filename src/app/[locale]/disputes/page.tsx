'use client'
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import DisputeList from '@/components/disputes/DisputeList';

export default function DisputesPage() {
  const disputes = [
    { id: "DSP-092", contract: "مونتاج فيديو إعلاني", reason: "تأخير في التسليم", status: "بانتظار الحكم" },
    { id: "DSP-088", contract: "هوية بصرية", reason: "عدم تسليم الملفات", status: "تحت المراجعة" }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8 font-sans" dir="rtl">
        <header className="mb-10 border-b border-white/10 pb-6">
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3 text-rose-500">
                <ShieldAlert size={36} /> إدارة النزاعات السيادية
            </h1>
        </header>
        <DisputeList initialDisputes={disputes} />
    </div>
  );
}
