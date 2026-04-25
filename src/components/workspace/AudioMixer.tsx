'use client';
import React, { useState } from 'react';
import { Mic, Music, Volume2, Settings2 } from 'lucide-react';

export function AudioMixer() {
  const [levels, setLevels] = useState({ voice: 80, music: 40, sfx: 60 });

  return (
    <div className="bg-card border border-border rounded-xl p-4 w-48">
       <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
          <h3 className="font-bold text-xs flex items-center gap-1"><Settings2 size={12} /> Audio Mixer</h3>
       </div>

       <div className="flex justify-between h-40">
          <Fader label="Voice" icon={Mic} value={levels.voice} onChange={(v: number) => setLevels({...levels, voice: v})} color="bg-blue-500" />
          <Fader label="Music" icon={Music} value={levels.music} onChange={(v: number) => setLevels({...levels, music: v})} color="bg-purple-500" />
          <Fader label="SFX" icon={Volume2} value={levels.sfx} onChange={(v: number) => setLevels({...levels, sfx: v})} color="bg-emerald-500" />
       </div>
    </div>
  );
}

function Fader({ label, icon: Icon, value, onChange, color }: any) {
    return (
        <div className="flex flex-col items-center gap-2 h-full group">
           <div className="relative flex-1 w-6 bg-muted rounded-full overflow-hidden flex flex-col justify-end border border-border">
              {/* dB Level Visual */}
              <div 
                className={`w-full transition-all duration-100 ${color} opacity-80 group-hover:opacity-100`} 
                style={{ height: `${value}%` }} 
              />
              {/* Invisible Range Input for Interaction */}
              <input 
                 type="range" 
                 min="0" max="100" 
                 value={value} 
                 onChange={(e) => onChange(Number(e.target.value))}
                 className="absolute inset-0 opacity-0 cursor-ns-resize"
                 // @ts-ignore
                 orient="vertical" 
              />
           </div>
           <Icon size={12} className="text-muted-foreground" />
           <span className="text-[10px] font-mono font-bold">{value}</span>
        </div>
    )
}

################################################################################