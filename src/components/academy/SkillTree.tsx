'use client';
import React from 'react';
import { Check, Lock, Star, Trophy, Zap } from 'lucide-react';

export function SkillTree() {
  const levels = [
    { id: 1, title: 'أساسيات المونتاج', status: 'completed', xp: 500, icon: Star },
    { id: 2, title: 'السرد القصصي', status: 'completed', xp: 750, icon: Star },
    { id: 3, title: 'تصحيح الألوان (Color Grading)', status: 'active', xp: 1200, icon: Zap },
    { id: 4, title: 'هندسة الصوت السينمائي', status: 'locked', xp: 1500, icon: Lock },
    { id: 5, title: 'الماستر كلاس (Enterprise)', status: 'locked', xp: 3000, icon: Trophy },
  ];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-8 relative overflow-hidden">
       {/* Header */}
       <div className="flex justify-between items-end mb-12 relative z-10">
          <div>
             <h2 className="text-2xl font-bold text-white mb-1">مسار "محترف المونتاج"</h2>
             <p className="text-slate-400 text-sm">أكمل المسار لتحصل على شارة التوثيق في السوق.</p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-black text-indigo-400">Level 3</div>
             <div className="text-xs text-slate-500 font-mono">1,250 / 2,500 XP</div>
          </div>
       </div>

       {/* Tree Structure */}
       <div className="relative space-y-0 relative z-10">
          {/* Vertical Line */}
          <div className="absolute left-8 top-4 bottom-4 w-1 bg-white/5 rounded-full -z-10" />

          {levels.map((level, i) => (
             <div key={level.id} className="group relative flex items-start gap-6 pb-12 last:pb-0">
                {/* Icon Node */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 relative z-10 transition-all duration-500 ${
                   level.status === 'completed' ? 'bg-green-500 border-green-600 text-black shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 
                   level.status === 'active' ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse shadow-[0_0_30px_rgba(99,102,241,0.5)]' : 
                   'bg-slate-800 border-slate-700 text-slate-500 grayscale'
                }`}>
                   <level.icon size={24} fill={level.status === 'completed' ? 'currentColor' : 'none'} />
                </div>

                {/* Content Card */}
                <div className={`flex-1 p-5 rounded-xl border transition-all duration-300 ${
                   level.status === 'active' ? 'bg-indigo-900/20 border-indigo-500/50 translate-x-2' : 
                   level.status === 'locked' ? 'bg-white/5 border-transparent opacity-50' : 
                   'bg-slate-800/50 border-white/10 hover:border-white/20'
                }`}>
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-lg">{level.title}</h3>
                      <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded text-slate-300">+{level.xp} XP</span>
                   </div>
                   
                   {level.status === 'active' && (
                      <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mt-3">
                         <div className="bg-indigo-500 h-full w-[45%] rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                         </div>
                      </div>
                   )}
                   
                   {level.status === 'active' && <p className="text-xs text-indigo-300 mt-2">جاري التقدم: 45%</p>}
                   {level.status === 'completed' && <p className="text-xs text-green-400 mt-2 flex items-center gap-1"><Check size={12}/> مكتمل</p>}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
