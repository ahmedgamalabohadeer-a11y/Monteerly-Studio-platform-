'use client';
import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, DollarSign, AlertCircle } from 'lucide-react';

export function StudioAnalytics() {
  const employees = [
    { name: 'Ahmed', role: 'Editor', efficiency: 94, tasks: 45, profit: '$12,400' },
    { name: 'Sarah', role: 'Colorist', efficiency: 88, tasks: 32, profit: '$9,200' },
    { name: 'Khaled', role: 'Sound', efficiency: 76, tasks: 18, profit: '$4,100' },
  ];

  const clients = [
    { name: 'Tech Corp', revenue: '$50k', friction: 'Low', score: 95 },
    { name: 'Fashion Brand', revenue: '$12k', friction: 'High', score: 40 },
  ];

  return (
    <div className="space-y-8">
       {/* KPI Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
             <div className="text-slate-400 text-xs uppercase font-bold mb-1">صافي الربح (Net Profit)</div>
             <div className="text-2xl font-black text-white">$142,000</div>
             <div className="text-xs text-green-400 flex items-center gap-1 mt-1"><TrendingUp size={12}/> +12% vs last month</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
             <div className="text-slate-400 text-xs uppercase font-bold mb-1">تكلفة الريندر (Cloud Cost)</div>
             <div className="text-2xl font-black text-white">$1,204</div>
             <div className="text-xs text-red-400 flex items-center gap-1 mt-1"><TrendingDown size={12}/> -5% optimization</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
             <div className="text-slate-400 text-xs uppercase font-bold mb-1">متوسط وقت التسليم</div>
             <div className="text-2xl font-black text-white">2.4 Days</div>
             <div className="text-xs text-slate-500 mt-1">Target: 3.0 Days</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-white/10">
             <div className="text-slate-400 text-xs uppercase font-bold mb-1">معدل التعديلات (Revisions)</div>
             <div className="text-2xl font-black text-white">1.8</div>
             <div className="text-xs text-yellow-400 mt-1">Per Project Avg</div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employee Performance */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Users className="text-indigo-400" /> أداء الفريق (Efficiency)
             </h3>
             <div className="space-y-4">
                {employees.map((emp, i) => (
                   <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">{emp.name[0]}</div>
                         <div>
                            <div className="text-sm font-bold text-white">{emp.name}</div>
                            <div className="text-[10px] text-slate-400">{emp.role}</div>
                         </div>
                      </div>
                      <div className="text-right">
                         <div className="text-sm font-bold text-green-400">{emp.efficiency}%</div>
                         <div className="text-[10px] text-slate-500">Efficiency Score</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Client Friction Analysis */}
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-red-400" /> تحليل العملاء (Friction Score)
             </h3>
             <p className="text-xs text-slate-400 mb-4">يقيس هذا المؤشر مدى "إرهاق" العميل للفريق مقارنة بالربح.</p>
             
             <div className="space-y-4">
                {clients.map((client, i) => (
                   <div key={i} className="relative p-4 bg-black/20 rounded-lg overflow-hidden border border-white/5">
                      <div className="flex justify-between items-center relative z-10">
                         <div>
                            <div className="font-bold text-white">{client.name}</div>
                            <div className="text-xs text-slate-400">Revenue: {client.revenue}</div>
                         </div>
                         <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                               client.friction === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                            }`}>
                               {client.friction} Friction
                            </span>
                         </div>
                      </div>
                      {/* Health Bar */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                         <div 
                           className={`h-full ${client.score < 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                           style={{ width: `${client.score}%` }} 
                         />
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################