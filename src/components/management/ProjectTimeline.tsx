'use client';
import React from 'react';

export function ProjectTimeline() {
  const phases = [
    { name: 'ما قبل الإنتاج', start: 0, width: 20, color: 'bg-blue-500' },
    { name: 'التصوير', start: 20, width: 15, color: 'bg-green-500' },
    { name: 'المونتاج الأولي', start: 35, width: 25, color: 'bg-indigo-500' },
    { name: 'VFX & تلوين', start: 60, width: 20, color: 'bg-purple-500' },
    { name: 'التسليم النهائي', start: 80, width: 10, color: 'bg-yellow-500' },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6 overflow-hidden">
       <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">الجدول الزمني للمشروع (يناير 2026)</h3>
          <div className="flex gap-4 text-xs">
             {phases.map((p, i) => (
                <div key={i} className="flex items-center gap-1">
                   <div className={`w-2 h-2 rounded-full ${p.color}`} />
                   <span className="text-slate-400">{p.name}</span>
                </div>
             ))}
          </div>
       </div>

       <div className="relative">
          {/* Days Header */}
          <div className="flex border-b border-white/10 pb-2 mb-4">
             {days.map(d => (
                <div key={d} className="flex-1 text-center text-[10px] text-slate-500 border-l border-white/5 h-4">
                   {d}
                </div>
             ))}
          </div>

          {/* Timeline Bars */}
          <div className="space-y-6 relative">
             {/* Background Grid Lines */}
             <div className="absolute inset-0 flex pointer-events-none">
                {days.map(d => (
                   <div key={d} className="flex-1 border-l border-white/5 h-full" />
                ))}
             </div>

             {phases.map((phase, i) => (
                <div key={i} className="relative h-8 w-full flex items-center">
                   <div className="w-32 shrink-0 text-xs font-bold text-slate-300 z-10 bg-slate-900 pr-2">
                      {phase.name}
                   </div>
                   <div className="flex-1 relative h-full">
                      <div 
                        className={`absolute top-1 bottom-1 rounded-full ${phase.color} opacity-80 hover:opacity-100 cursor-pointer transition-all flex items-center px-3 shadow-lg`}
                        style={{ left: `${phase.start}%`, width: `${phase.width}%` }}
                      >
                         <span className="text-[10px] font-bold text-white truncate drop-shadow-md">
                            {phase.width} أيام
                         </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
