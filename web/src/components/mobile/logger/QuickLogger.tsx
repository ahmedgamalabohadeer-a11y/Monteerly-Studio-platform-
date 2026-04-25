'use client';
import React, { useState } from 'react';
import { Plus, Minus, Film, Mic, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function QuickLogger() {
  const [scene, setScene] = useState(4);
  const [shot, setShot] = useState('A');
  const [take, setTake] = useState(1);

  return (
    <div className="bg-slate-950 h-[calc(100vh-80px)] flex flex-col p-4 max-w-sm mx-auto border border-white/10 rounded-xl">
       {/* Meta Data */}
       <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-900 p-4 rounded-xl text-center border border-white/10">
             <div className="text-xs text-slate-500 mb-1">SCENE</div>
             <div className="text-3xl font-black text-white">{scene}</div>
             <div className="flex justify-center gap-2 mt-2">
                <button onClick={() => setScene(s => s-1)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Minus size={12}/></button>
                <button onClick={() => setScene(s => s+1)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Plus size={12}/></button>
             </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl text-center border border-white/10">
             <div className="text-xs text-slate-500 mb-1">SHOT</div>
             <div className="text-3xl font-black text-white">{shot}</div>
             <div className="flex justify-center gap-2 mt-2">
                <button className="p-1 bg-white/10 rounded hover:bg-white/20 text-[10px]">Prev</button>
                <button className="p-1 bg-white/10 rounded hover:bg-white/20 text-[10px]">Next</button>
             </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl text-center border border-white/10">
             <div className="text-xs text-slate-500 mb-1">TAKE</div>
             <div className="text-3xl font-black text-white">{take}</div>
             <div className="flex justify-center gap-2 mt-2">
                <button onClick={() => setTake(t => t > 1 ? t-1 : 1)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Minus size={12}/></button>
                <button onClick={() => setTake(t => t+1)} className="p-1 bg-white/10 rounded hover:bg-white/20"><Plus size={12}/></button>
             </div>
          </div>
       </div>

       {/* Timecode */}
       <div className="bg-black border border-white/20 rounded-xl p-4 text-center mb-6">
          <div className="text-4xl font-mono text-red-500 font-bold tracking-widest animate-pulse">
             10:42:15:08
          </div>
          <div className="text-[10px] text-slate-500 mt-1 uppercase">Time of Day (Free Run)</div>
       </div>

       {/* Action Buttons */}
       <div className="grid grid-cols-2 gap-4 flex-1">
          <button className="bg-green-600 hover:bg-green-700 active:scale-95 transition-all rounded-2xl flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-green-900/20">
             <span className="text-2xl font-black">GOOD</span>
             <span className="text-xs opacity-80">Circle Take</span>
          </button>
          
          <button className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all rounded-2xl flex flex-col items-center justify-center gap-2 text-white shadow-lg shadow-red-900/20">
             <span className="text-2xl font-black">BAD</span>
             <span className="text-xs opacity-80">False Start / Error</span>
          </button>
       </div>

       {/* Issues */}
       <div className="grid grid-cols-3 gap-2 mt-4">
          <button className="p-3 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 flex flex-col items-center gap-1">
             <Film size={16} /> Camera Issue
          </button>
          <button className="p-3 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 flex flex-col items-center gap-1">
             <Mic size={16} /> Sound Issue
          </button>
          <button className="p-3 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-700 flex flex-col items-center gap-1">
             <AlertTriangle size={16} /> Continuity
          </button>
       </div>
    </div>
  );
}

