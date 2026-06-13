'use client';

import type { ReactNode } from 'react';
import { ShieldAlert, Fingerprint, MapPin, Lock } from 'lucide-react';

type CardProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

function Card({ icon, title, value }: CardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-red-500">
      <div className="rounded-full bg-slate-800 p-4">{icon}</div>
      <h3 className="text-center text-lg font-bold">{title}</h3>
      <span className="text-center text-sm text-slate-400">{value}</span>
    </div>
  );
}

export default function Security() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-6 text-3xl font-black text-red-500">القبة الحديدية والسيادة على البيانات</h1>
      <div className="grid gap-6 md:grid-cols-4">
        <Card icon={<Fingerprint className="text-emerald-400" />} title="Forensic Watermarking" value="بصمة خفية لمنع التسريب" />
        <Card icon={<MapPin className="text-blue-400" />} title="Data Residency" value="خوادم محلية (الرياض/القاهرة)" />
        <Card icon={<ShieldAlert className="text-red-400" />} title="Smart Guardian" value="مراقبة PII والتهرب" />
        <Card icon={<Lock className="text-purple-400" />} title="Zero Trust Builder" value="سياسات وصول مشروطة" />
      </div>
    </div>
  );
}
