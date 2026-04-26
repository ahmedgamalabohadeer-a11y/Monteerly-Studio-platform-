'use client';
import React from 'react';
import { TrendingUp, Users, HardDrive, DollarSign } from 'lucide-react';

export function DashboardWidgets() {
  const stats = [
    { label: 'المشاريع النشطة', value: '12', change: '+2 هذا الأسبوع', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'إجمالي الأرباح', value: '$8,450', change: 'مستحق: $1,200', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'فريق العمل', value: '8 أعضاء', change: '2 اونلاين الآن', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'مساحة التخزين', value: '64%', change: '120GB / 200GB', icon: HardDrive, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
       {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 p-5 rounded-xl hover:border-indigo-500/20 transition-colors">
             <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">{stat.change}</span>
             </div>
             <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
             <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
       ))}
    </div>
  );
}

################################################################################