'use client';
import React from 'react';
import { Eye, Activity, GlassWater, Move } from 'lucide-react';
import { motion } from 'framer-motion';

export function HealthGuardian() {
  const stats = [
    { icon: Eye, label: 'راحة العين', val: '12m ago', status: 'good' },
    { icon: Move, label: 'الحركة', val: '45m ago', status: 'warning' },
    { icon: GlassWater, label: 'شرب الماء', val: '2h ago', status: 'danger' },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white flex items-center gap-2">
             <Activity className="text-green-400" /> الحارس الصحي
          </h3>
          <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20">Active</span>
       </div>

       <div className="space-y-4">
          {stats.map((stat, i) => (
             <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${
                      stat.status === 'good' ? 'bg-green-500/20 text-green-400' :
                      stat.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                   }`}>
                      <stat.icon size={16} />
                   </div>
                   <span className="text-sm text-slate-300 font-bold">{stat.label}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className={`text-xs font-mono ${
                      stat.status === 'good' ? 'text-green-400' :
                      stat.status === 'warning' ? 'text-yellow-400' :
                      'text-red-400'
                   }`}>{stat.val}</span>
                   
                   {stat.status !== 'good' && (
                      <button className="text-[10px] bg-white text-black px-2 py-0.5 rounded font-bold hover:bg-slate-200">
                         Reset
                      </button>
                   )}
                </div>
             </div>
          ))}
       </div>

       <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h4 className="text-xs font-bold text-blue-300 mb-2">نصيحة ذكية:</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
             لاحظنا أنك تعمل بوضعية ثابتة منذ ساعة.
             <br/>
             <span className="text-white font-bold">جرب قاعدة 20-20-20:</span> انظر لشيء يبعد 20 قدماً لمدة 20 ثانية.
          </p>
       </div>
    </div>
  );
}
