'use client';
import React from 'react';
import { Users, ShieldCheck, Palette } from 'lucide-react';
import { AgencyStats } from '@/components/agency/AgencyStats';
import { AgencyTeamList } from '@/components/agency/AgencyTeamList';
import { WhiteLabelConfig } from '@/components/agency/WhiteLabelConfig';

export default function AgencyPage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="text-indigo-500" size={32} />
          مركز إدارة الوكالة
        </h1>
        <p className="text-slate-400 mt-2 text-sm">إدارة فرق العمل وتخصيص الهوية البصرية للشركاء.</p>
      </div>

      <AgencyStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AgencyTeamList />
        </div>
        <div>
          <WhiteLabelConfig />
        </div>
      </div>
    </div>
  );
}
