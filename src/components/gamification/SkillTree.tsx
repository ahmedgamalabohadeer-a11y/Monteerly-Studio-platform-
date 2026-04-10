'use client';
import React from 'react';
import { Lock, Star, CheckCircle, Zap } from 'lucide-react';

export function SkillTree() {
  const skills = [
    { id: 1, title: 'أساسيات القص', level: 1, status: 'completed', x: 50, y: 10 },
    { id: 2, title: 'تصحيح الألوان', level: 2, status: 'unlocked', x: 30, y: 40 },
    { id: 3, title: 'هندسة الصوت', level: 2, status: 'locked', x: 70, y: 40 },
    { id: 4, title: 'المؤثرات البصرية', level: 3, status: 'locked', x: 50, y: 70 },
    { id: 5, title: 'ماستر كلاس', level: 4, status: 'locked', x: 50, y: 95 },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[600px] bg-slate-900/50 border border-white/10 rounded-2xl p-8 overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-10" 
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
       />
       
       {/* Connecting Lines (SVG) */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M50% 15% L30% 45%" stroke="#4f46e5" strokeWidth="2" />
          <path d="M50% 15% L70% 45%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M30% 55% L50% 75%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M70% 55% L50% 75%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M50% 85% L50% 95%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
       </svg>

       {/* Nodes */}
       {skills.map((skill) => (
          <div 
            key={skill.id}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer transition-all hover:scale-110`}
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
          >
             <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-xl relative z-10 ${
                skill.status === 'completed' ? 'bg-indigo-600 border-indigo-400 text-white' :
                skill.status === 'unlocked' ? 'bg-slate-800 border-indigo-500 animate-pulse text-white' :
                'bg-slate-900 border-slate-700 text-slate-600'
             }`}>
                {skill.status === 'completed' ? <CheckCircle size={24} /> :
                 skill.status === 'unlocked' ? <Zap size={24} /> :
                 <Lock size={24} />}
             </div>
             
             <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                skill.status === 'locked' ? 'bg-slate-900 border-slate-700 text-slate-600' : 'bg-black border-white/20 text-white'
             }`}>
                {skill.title}
             </div>
          </div>
       ))}

       {/* Stats Overlay */}
       <div className="absolute top-4 left-4 bg-black/60 backdrop-blur p-4 rounded-xl border border-white/10">
          <div className="text-xs text-slate-400 mb-1">المستوى الحالي</div>
          <div className="text-2xl font-black text-white mb-2">LVL 04</div>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-[75%]" />
          </div>
          <div className="text-[10px] text-right text-indigo-400 mt-1">750 / 1000 XP</div>
       </div>
    </div>
  );
}
