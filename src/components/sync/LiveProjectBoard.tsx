'use client';
import React from 'react';
import { Check, Clock, AlertTriangle, FileText, Camera, Scissors,  Sparkles, Monitor } from 'lucide-react';

export function LiveProjectBoard() {
  const scenes = [
    { id: 1, name: 'Scene 1: Intro', script: 'done', shoot: 'done', edit: 'done', vfx: 'skip', grading: 'done' },
    { id: 2, name: 'Scene 2: Chase', script: 'done', shoot: 'done', edit: 'in-progress', vfx: 'pending', grading: 'pending' },
    { id: 3, name: 'Scene 3: Roof', script: 'done', shoot: 'delay', edit: 'pending', vfx: 'pending', grading: 'pending' },
    { id: 4, name: 'Scene 4: Ending', script: 'draft', shoot: 'pending', edit: 'pending', vfx: 'pending', grading: 'pending' },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'done': return <div className="w-full h-full bg-green-500/20 flex items-center justify-center text-green-400"><Check size={16}/></div>;
      case 'in-progress': return <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Clock size={16} className="animate-spin-slow"/></div>;
      case 'delay': return <div className="w-full h-full bg-red-500/20 flex items-center justify-center text-red-400"><AlertTriangle size={16}/></div>;
      case 'draft': return <div className="w-full h-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-xs font-bold">DRAFT</div>;
      case 'skip': return <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 text-[10px]">-</div>;
      default: return <div className="w-full h-full bg-transparent flex items-center justify-center text-slate-700 text-[10px]">WAIT</div>;
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
       <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">حالة الإنتاج الحية (Live Pipeline)</h3>
          <p className="text-sm text-slate-400">تحديث فوري من جميع الأقسام.</p>
       </div>

       <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-6 text-sm">
             {/* Header */}
             <div className="bg-slate-950 p-4 font-bold text-slate-400">Scene</div>
             <div className="bg-slate-950 p-4 font-bold text-slate-400 flex items-center gap-2"><FileText size={14}/> Script</div>
             <div className="bg-slate-950 p-4 font-bold text-slate-400 flex items-center gap-2"><Camera size={14}/> Shoot</div>
             <div className="bg-slate-950 p-4 font-bold text-slate-400 flex items-center gap-2"><Scissors size={14}/> Edit</div>
             <div className="bg-slate-950 p-4 font-bold text-slate-400 flex items-center gap-2"><Sparkles size={14}/> VFX</div>
             <div className="bg-slate-950 p-4 font-bold text-slate-400 flex items-center gap-2"><Monitor size={14}/> Color</div>

             {/* Rows */}
             {scenes.map((scene) => (
                <React.Fragment key={scene.id}>
                   <div className="p-4 border-t border-white/5 font-bold text-white flex items-center bg-slate-900">{scene.name}</div>
                   <div className="border-t border-l border-white/5 h-16">{getStatusIcon(scene.script)}</div>
                   <div className="border-t border-l border-white/5 h-16">{getStatusIcon(scene.shoot)}</div>
                   <div className="border-t border-l border-white/5 h-16">{getStatusIcon(scene.edit)}</div>
                   <div className="border-t border-l border-white/5 h-16">{getStatusIcon(scene.vfx)}</div>
                   <div className="border-t border-l border-white/5 h-16">{getStatusIcon(scene.grading)}</div>
                </React.Fragment>
             ))}
          </div>
       </div>
    </div>
  );
}

