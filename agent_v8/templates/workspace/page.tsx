'use client';

import type { ReactNode } from 'react';
import { MonitorPlay, SlidersHorizontal, Focus, Activity } from 'lucide-react';

type CardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

function Card({ icon, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-blue-500">
      <div className="rounded-full bg-slate-800 p-4">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <span className="text-sm text-slate-400">{value}</span>
    </div>
  );
}

export default function Workspace() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-6 text-3xl font-black text-blue-400">بيئة التحرير والمونتاج السحابية</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <Card icon={<Activity className="text-emerald-400" />} title="QC Scopes" value="تدقيق الألوان والصوت" />
        <Card icon={<Focus className="text-purple-400" />} title="Deep Focus Mode" value="عزل المشتتات" />
        <Card icon={<SlidersHorizontal className="text-blue-400" />} title="Compare View" value="مقارنة A/B" />
        <Card icon={<MonitorPlay className="text-red-400" />} title="Live Stream Cutter" value="قص البث المباشر" />
      </div>
    </div>
  );
}
