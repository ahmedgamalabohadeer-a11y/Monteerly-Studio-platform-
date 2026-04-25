'use client';
import React from 'react';
import { TrendingUp, Users, DollarSign, Activity, Server } from 'lucide-react';

export function SuperAdminDashboard() {
  const stats = [
    { label: 'إجمالي الإيرادات (MRR)', value: '$124,500', change: '+12%', icon: DollarSign, color: 'text-green-400' },
    { label: 'المستخدمين النشطين', value: '45,200', change: '+5%', icon: Users, color: 'text-blue-400' },
    { label: 'مشاريع قيد الريندر', value: '1,204', change: '-2%', icon: Activity, color: 'text-orange-400' },
    { label: 'حمل السيرفرات', value: '42%', change: 'Stable', icon: Server, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-8">
       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
             <div key={i} className="bg-slate-900 border border-white/10 p-6 rounded-xl hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-4">
                   <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                      <stat.icon size={24} />
                   </div>
                   <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${stat.change.includes('+') ? 'text-green-400' : 'text-slate-400'}`}>
                      {stat.change}
                   </span>
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
             </div>
          ))}
       </div>

       {/* Revenue Chart Placeholder */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 p-6 rounded-xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-white">نمو الإيرادات (2026)</h3>
                <select className="bg-black/30 border border-white/10 rounded text-xs text-white p-2 outline-none">
                   <option>آخر 6 أشهر</option>
                   <option>آخر سنة</option>
                </select>
             </div>
             <div className="h-64 flex items-end justify-between gap-2">
                {[40, 55, 45, 60, 75, 65, 80, 90, 85, 95, 100, 110].map((h, i) => (
                   <div key={i} className="w-full bg-indigo-600/20 hover:bg-indigo-600/50 transition-all rounded-t-sm relative group" style={{ height: `${h * 0.8}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                         ${h}k
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl">
             <h3 className="font-bold text-white mb-6">توزيع المستخدمين</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-300 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Creators (Free)</span>
                   <span className="text-white font-bold">60%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-[60%]" /></div>
                
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-300 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500" /> Pro Freelancers</span>
                   <span className="text-white font-bold">25%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-[25%]" /></div>

                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-300 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Agencies</span>
                   <span className="text-white font-bold">15%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-green-500 h-full w-[15%]" /></div>
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################