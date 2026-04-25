'use client';
import React, { useState } from 'react';
import { Mic, Music, Volume2, Sliders, Play, Square, Headphones } from 'lucide-react';

export function AudioMixer() {
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Dialogue (Host)', volume: 80, pan: 0, muted: false, solo: false, color: 'bg-blue-500' },
    { id: 2, name: 'Dialogue (Guest)', volume: 75, pan: 0, muted: false, solo: false, color: 'bg-green-500' },
    { id: 3, name: 'SFX: Ambience', volume: 40, pan: -20, muted: false, solo: false, color: 'bg-yellow-500' },
    { id: 4, name: 'Music Bed', volume: 30, pan: 20, muted: false, solo: false, color: 'bg-pink-500' },
  ]);

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden flex flex-col h-[600px]">
       {/* Top Bar */}
       <div className="p-4 bg-slate-950 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-indigo-600 p-2 rounded text-white"><Headphones size={20} /></div>
             <div>
                <h3 className="font-bold text-white text-sm">Mastering Session: Ep 04</h3>
                <div className="text-xs text-slate-500">48kHz / 24-bit • Stereo</div>
             </div>
          </div>
          <div className="flex gap-2">
             <div className="bg-black border border-white/10 px-4 py-2 rounded text-green-400 font-mono font-bold">00:04:12:08</div>
             <button className="p-2 bg-white text-black rounded hover:bg-slate-200"><Play size={20} fill="currentColor"/></button>
             <button className="p-2 bg-white/10 text-white rounded hover:bg-white/20"><Square size={20} fill="currentColor"/></button>
          </div>
       </div>

       {/* Mixer Tracks */}
       <div className="flex-1 flex overflow-x-auto p-6 gap-4 bg-[#1a1a1a]">
          {tracks.map((track) => (
             <div key={track.id} className="w-24 bg-[#2a2a2a] border border-white/5 rounded-lg flex flex-col p-2 relative group">
                <div className="text-xs font-bold text-slate-300 text-center mb-2 truncate">{track.name}</div>
                
                {/* Pan Knob (Simulated) */}
                <div className="w-8 h-8 rounded-full border-2 border-slate-500 mx-auto mb-4 relative">
                   <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-white -translate-x-1/2" style={{ transform: `translateX(-50%) rotate(${track.pan}deg)` }} />
                </div>

                {/* Volume Fader Path */}
                <div className="flex-1 bg-black/50 rounded-full w-2 mx-auto relative my-2">
                   {/* Fader Handle */}
                   <div 
                      className={`absolute left-1/2 -translate-x-1/2 w-8 h-12 rounded shadow-lg cursor-pointer border-t border-white/20 ${track.color}`}
                      style={{ bottom: `${track.volume}%` }}
                   >
                      <div className="w-full h-px bg-black/50 mt-6" />
                   </div>
                </div>

                {/* Mute / Solo */}
                <div className="flex flex-col gap-2 mt-2">
                   <button className="w-full py-1 bg-[#3a3a3a] text-slate-400 text-[10px] font-bold rounded hover:bg-yellow-500 hover:text-black transition-colors">S</button>
                   <button className="w-full py-1 bg-[#3a3a3a] text-slate-400 text-[10px] font-bold rounded hover:bg-red-500 hover:text-white transition-colors">M</button>
                </div>
                
                {/* VU Meter (Simulated) */}
                <div className="absolute right-1 top-10 bottom-20 w-1 bg-black rounded overflow-hidden flex flex-col justify-end gap-px opacity-50">
                   {Array.from({length: 20}).map((_, i) => (
                      <div key={i} className={`w-full h-1 ${i > 15 ? 'bg-red-500' : i > 12 ? 'bg-yellow-500' : 'bg-green-500'} opacity-${Math.random() > 0.5 ? '100' : '30'}`} />
                   ))}
                </div>
             </div>
          ))}

          {/* Master Channel */}
          <div className="w-28 bg-[#1f1f1f] border-l border-white/10 rounded-lg flex flex-col p-2 ml-4">
             <div className="text-xs font-bold text-red-400 text-center mb-2">MASTER</div>
             <div className="flex gap-2 h-full px-2">
                <div className="flex-1 bg-black rounded flex flex-col justify-end">
                   <div className="w-full bg-green-500 h-[70%]" />
                </div>
                <div className="flex-1 bg-black rounded flex flex-col justify-end">
                   <div className="w-full bg-green-500 h-[65%]" />
                </div>
             </div>
             <div className="mt-2 text-center text-xs font-mono text-white">-6.2 dB</div>
          </div>
       </div>
    </div>
  );
}

################################################################################