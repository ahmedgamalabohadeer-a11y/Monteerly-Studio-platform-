'use client';
import React, { useState } from 'react';
import { Wand2, RefreshCw, Image as ImageIcon, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function StoryboardGen() {
  const scenes = [
    { id: 1, text: 'EXT. DESERT - DAY. A lone wanderer walks towards the horizon.', img: '/images/features/live.jpg' },
    { id: 2, text: 'CLOSE UP on his boots hitting the sand.', img: '/images/features/speed.jpg' },
    { id: 3, text: 'He stops and looks at a compass.', img: '/images/features/ai-brain.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
       {/* Script Source */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6">تحليل السيناريو</h3>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
             {scenes.map((scene) => (
                <div key={scene.id} className="p-4 bg-black/30 border border-white/5 rounded-xl hover:border-indigo-500/50 transition-all cursor-pointer group">
                   <div className="flex justify-between items-start mb-2">
                      <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded">Shot {scene.id}</span>
                      <button className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1">
                         <Wand2 size={12} /> Re-Imagine
                      </button>
                   </div>
                   <p className="text-sm text-slate-300 font-mono">{scene.text}</p>
                </div>
             ))}
             <div className="p-4 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-slate-500 text-sm">
                + Add new shot description
             </div>
          </div>
       </div>

       {/* Visual Board */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-white">اللوحة البصرية (Visual Board)</h3>
             <Button size="sm" className="bg-indigo-600 text-white gap-2">
                <Download size={14} /> تصدير للعرض
             </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-4">
             {scenes.map((scene) => (
                <div key={scene.id} className="bg-black border border-white/10 rounded-lg overflow-hidden flex flex-col">
                   <div className="aspect-video relative group">
                      <img src={scene.img} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <button className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"><RefreshCw size={16}/></button>
                         <button className="p-2 bg-white rounded-full text-black hover:scale-110 transition-transform"><ImageIcon size={16}/></button>
                      </div>
                   </div>
                   <div className="p-2 bg-slate-950 text-[10px] text-slate-400 h-12 overflow-hidden">
                      {scene.text}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

