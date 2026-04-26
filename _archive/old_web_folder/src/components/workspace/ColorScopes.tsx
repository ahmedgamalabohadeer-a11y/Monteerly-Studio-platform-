'use client';
import React, { useState } from 'react';
import { Activity, CircleDashed, BarChart3 } from 'lucide-react';
export function ColorScopes() {
  const [activeScope, setActiveScope] = useState<'waveform' | 'vectorscope' | 'histogram'>('waveform');
  return (
    <div className="bg-black border border-slate-800 rounded-xl overflow-hidden w-64 h-64 flex flex-col">
       <div className="flex bg-slate-900 border-b border-slate-800">
          <ScopeTab 
             icon={Activity} 
             active={activeScope === 'waveform'} 
             onClick={() => setActiveScope('waveform')} 
             title="Waveform"
          />
          <ScopeTab 
             icon={CircleDashed} 
             active={activeScope === 'vectorscope'} 
             onClick={() => setActiveScope('vectorscope')} 
             title="Vectorscope"
          />
          <ScopeTab 
             icon={BarChart3} 
             active={activeScope === 'histogram'} 
             onClick={() => setActiveScope('histogram')} 
             title="Histogram"
          />
       </div>
       <div className="flex-1 relative p-2 flex items-center justify-center">
          {/* Scope Visualization Mockups */}
          {activeScope === 'waveform' && (
             <div className="w-full h-full flex items-end justify-between gap-[1px] opacity-80">
                {Array.from({ length: 40 }).map((_, i) => (
                   <div key={i} className="w-1 bg-green-500/50" style={{ height: `${Math.random() * 100}%` }} />
                ))}
             </div>
          )}
          {activeScope === 'vectorscope' && (
             <div className="relative w-40 h-40 rounded-full border border-slate-700 bg-black">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-red-500/20 rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
                {/* Graticule lines simulation */}
                <div className="absolute inset-0 border border-slate-800 rotate-45" />
             </div>
          )}
          {activeScope === 'histogram' && (
             <div className="w-full h-full relative">
                <div className="absolute bottom-0 left-0 right-0 top-10 bg-red-500/20 mix-blend-screen" style={{ clipPath: 'polygon(0 100%, 20% 40%, 50% 80%, 100% 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 top-10 bg-green-500/20 mix-blend-screen" style={{ clipPath: 'polygon(0 100%, 30% 60%, 60% 30%, 100% 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 top-10 bg-blue-500/20 mix-blend-screen" style={{ clipPath: 'polygon(0 100%, 40% 80%, 70% 20%, 100% 100%)' }} />
             </div>
          )}
       </div>
    </div>
  );
}
function ScopeTab({ icon: Icon, active, onClick, title }: any) {
    return (
        <button 
           onClick={onClick}
           title={title}
           className={`flex-1 py-2 flex justify-center hover:bg-slate-800 transition-colors ${active ? 'text-primary border-b-2 border-primary bg-slate-800' : 'text-slate-500'}`}
        >
           <Icon size={16} />
        </button>
    )
}
