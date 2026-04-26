'use client';
import React from 'react';
import { Globe } from 'lucide-react';

export function LiveActivityMap() {
  return (
    <div className="bg-slate-900 text-white rounded-xl overflow-hidden shadow-xl border border-slate-800">
       <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2"><Globe size={18} className="text-blue-400" /> النشاط الحي</h3>
          <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
       </div>
       <div className="h-64 relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center opacity-80">
          {/* Simulated User Dots */}
          <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" title="Riyadh" />
          <div className="absolute top-[38%] left-[52%] w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse delay-75" title="Cairo" />
          <div className="absolute top-[35%] left-[50%] w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse delay-150" title="Dubai" />
       </div>
       <div className="bg-slate-800 p-2 text-xs text-center text-slate-400">
          Most Active: <span className="text-white font-bold">Egypt, KSA, UAE</span>
       </div>
    </div>
  );
}

