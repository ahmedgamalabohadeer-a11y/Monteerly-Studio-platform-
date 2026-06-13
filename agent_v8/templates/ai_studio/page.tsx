'use client';

import type { ReactNode } from 'react';
import { Bot, Mic, FileText } from 'lucide-react';

type CardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

function Card({ icon, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-6 transition-all hover:border-purple-500">
      <div className="rounded-full bg-slate-900 p-4">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <span className="text-sm text-slate-400">{value}</span>
    </div>
  );
}

export default function AIStudio() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="mb-6 text-3xl font-black text-purple-400">استوديو الذكاء الاصطناعي</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card icon={<Bot className="text-blue-400" />} title="Digital Twin" value="التوأم الرقمي البصري" />
        <Card icon={<Mic className="text-emerald-400" />} title="AI Dubbing" value="دبلجة مع حفظ نبرة الصوت" />
        <Card icon={<FileText className="text-amber-400" />} title="AI Script Writer" value="توليد السكربتات الإعلانية" />
      </div>
    </div>
  );
}
