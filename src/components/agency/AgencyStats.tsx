'use client';
import React from 'react';
import { DollarSign, Briefcase, Users, ArrowUpRight } from 'lucide-react';

export function AgencyStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/20">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-indigo-500/20 rounded-lg text-indigo-400"><DollarSign size={24} /></div>
             <span className="text-xs text-green-400 flex items-center bg-green-500/10 px-2 py-1 rounded">+12% <ArrowUpRight size={12} /></span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$24,500</div>
          <div className="text-sm text-slate-400">إيرادات هذا الشهر</div>
       </div>

       <div className="p-6 rounded-xl bg-slate-900 border border-white/10">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-white/5 rounded-lg text-white"><Briefcase size={24} /></div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">8</div>
          <div className="text-sm text-slate-400">مشاريع نشطة</div>
       </div>

       <div className="p-6 rounded-xl bg-slate-900 border border-white/10">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-white/5 rounded-lg text-white"><Users size={24} /></div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12/15</div>
          <div className="text-sm text-slate-400">سعة الفريق</div>
       </div>
    </div>
  );
}

################################################################################