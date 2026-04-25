'use client';
import React from 'react';
import { Activity, Radio, AlertTriangle, CheckCircle } from 'lucide-react';

export function QCScopes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
       {/* Waveform Monitor (Simulated) */}
       <div className="bg-black border border-white/10 rounded-lg p-2 flex flex-col">
          <div className="flex justify-between text-[10px] text-slate-500 mb-2">
             <span>LUMA WAVEFORM</span>
             <span className="text-green-500">IRE: 0-100</span>
          </div>
          <div className="flex-1 relative overflow-hidden opacity-80">
             {/* Simulated Waveform Graph */}
             <div className="absolute inset-0 flex items-end justify-between px-1">
                {[...Array(50)].map((_, i) => (
                   <div 
                     key={i} 
                     className="w-1 bg-green-500/50 rounded-t-sm transition-all duration-300"
                     style={{ height: `${Math.random() * 80 + 20}%` }} 
                   />
                ))}
             </div>
             {/* Safety Lines */}
             <div className="absolute top-[10%] left-0 w-full h-px bg-red-500/50" />
             <div className="absolute bottom-[10%] left-0 w-full h-px bg-red-500/50" />
          </div>
       </div>

       {/* Vectorscope (Simulated) */}
       <div className="bg-black border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center relative">
          <div className="absolute top-2 left-2 text-[10px] text-slate-500">VECTORSCOPE</div>
          <div className="w-32 h-32 rounded-full border border-white/20 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/5 rounded-full" />
             {/* Color Targets */}
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500/50 rounded-full" /> {/* R */}
             <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500/50 rounded-full" /> {/* B */}
             <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-500/50 rounded-full" /> {/* G */}
             {/* Signal Cloud */}
             <div className="w-16 h-16 bg-white/20 blur-xl rounded-full animate-pulse" />
          </div>
       </div>

       {/* Audio Levels */}
       <div className="bg-black border border-white/10 rounded-lg p-2 md:col-span-2">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
             <span>AUDIO LEVELS (dBFS)</span>
          </div>
          <div className="space-y-1">
             {['L', 'R'].map(ch => (
                <div key={ch} className="flex items-center gap-2">
                   <span className="text-[10px] text-slate-500 w-2">{ch}</span>
                   <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-green-500 w-[70%]" />
                      <div className="h-full bg-yellow-500 w-[20%]" />
                      <div className="h-full bg-red-500 w-[0%] animate-pulse" />
                   </div>
                   <span className="text-[10px] text-green-400">-6dB</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}

################################################################################