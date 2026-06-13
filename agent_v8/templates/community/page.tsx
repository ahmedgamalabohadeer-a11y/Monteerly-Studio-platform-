'use client';

import type { ReactNode } from 'react';
import { Users, Award, TrendingUp, MessageSquare } from 'lucide-react';

type CardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

function Card({ icon, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="rounded-full bg-slate-50 p-4">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <span className="text-sm text-slate-500">{value}</span>
    </div>
  );
}

export default function Community() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-6 text-3xl font-black text-blue-900">مجتمع المونتيرين وصناع المحتوى</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <Card icon={<MessageSquare className="text-blue-600" />} title="ساحة النقاش (Feed)" value="تبادل الخبرات" />
        <Card icon={<Award className="text-amber-500" />} title="Gamification Badges" value="Top Rated Talent" />
        <Card icon={<Users className="text-emerald-600" />} title="Referral Dashboard" value="ترقيات العضوية" />
        <Card icon={<TrendingUp className="text-red-600" />} title="Trending Topics" value="المواضيع الرائجة" />
      </div>
    </div>
  );
}
