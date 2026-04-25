'use client';
import React, { useState } from 'react';
import { Settings, Repeat, Gauge } from 'lucide-react';
export function PlaybackControls() {
  const [speed, setSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [loop, setLoop] = useState(false);
  return (
    <div className="flex items-center gap-2">
       {/* Speed Control */}
       <div className="relative group">
          <button className="flex items-center gap-1 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors">
             <Gauge size={14} /> {speed}x
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 border border-white/20 rounded-lg overflow-hidden hidden group-hover:flex flex-col min-w-[80px]">
             {[0.5, 1, 1.5, 2].map(s => (
                <button 
                   key={s} 
                   onClick={() => setSpeed(s)}
                   className={`px-3 py-2 text-xs text-left hover:bg-white/20 ${speed === s ? 'text-primary font-bold' : 'text-white'}`}
                >
                   {s}x
                </button>
             ))}
          </div>
       </div>
       {/* Quality Control */}
       <div className="relative group">
          <button className="flex items-center gap-1 text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors">
             <Settings size={14} /> {quality}
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 border border-white/20 rounded-lg overflow-hidden hidden group-hover:flex flex-col min-w-[80px]">
             {['4K', '1080p', '720p', 'Auto'].map(q => (
                <button 
                   key={q} 
                   onClick={() => setQuality(q)}
                   className={`px-3 py-2 text-xs text-left hover:bg-white/20 ${quality === q ? 'text-primary font-bold' : 'text-white'}`}
                >
                   {q}
                </button>
             ))}
          </div>
       </div>
       {/* Loop Toggle */}
       <button 
          onClick={() => setLoop(!loop)}
          className={`p-1.5 rounded transition-colors ${loop ? 'text-primary bg-primary/20' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
          title="Loop Playback"
       >
          <Repeat size={14} />
       </button>
    </div>
  );
}
