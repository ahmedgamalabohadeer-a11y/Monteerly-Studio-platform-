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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
       {/* Header */}
       <div className="flex justify-between items-end mb-12 relative z-10">
          <div>
             <h2 className="text-2xl font-bold text-white mb-1">مسار "محترف المونتاج"</h2>
             <p className="text-slate-400 text-sm">أكمل المسار لتحصل على شارة التوثيق في السوق.</p>
          </div>
          <div className="text-right">
             <p className="text-xs text-indigo-400 font-bold mb-1">XP الإجمالي</p>
             <p className="text-3xl font-black text-white">1,250</p>
          </div>
       </div>

       {/* Tree Flow */}
       <div className="relative z-10 space-y-6">
          {levels.map((level, index) => (
             <div key={level.id} className={`flex items-center gap-4 ${level.status === 'locked' ? 'opacity-50' : 'opacity-100'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 ${
                   level.status === 'completed' ? 'bg-indigo-600 border-indigo-600 text-white' : 
                   level.status === 'active' ? 'bg-slate-800 border-indigo-500 text-indigo-400 animate-pulse' : 
                   'bg-slate-800 border-slate-700 text-slate-500'
                }`}>
                   <level.icon size={20} />
                </div>
                <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex justify-between items-center">
                   <div>
                      <h4 className={`font-bold ${level.status === 'active' ? 'text-indigo-400' : 'text-white'}`}>{level.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">+{level.xp} XP</p>
                   </div>
                   {level.status === 'completed' && <p className="text-xs text-green-400 flex items-center gap-1 font-bold"><Check size={12}/> مكتمل</p>}
                   {level.status === 'locked' && <Lock size={16} className="text-slate-500" />}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
