'use client';
import React, { useState } from 'react';
import { Play, Pause, Volume2, Download } from 'lucide-react';

interface AudioProps {
  src: string;
  title: string;
  duration: string;
}

export function AudioPlayer({ src, title, duration }: AudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // محاكاة بصرية للموجات الصوتية (Mock Waveform Bars)
  const bars = Array.from({ length: 40 }, () => Math.floor(Math.random() * 80) + 20);

  return (
    <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
       {/* Play Button */}
       <button 
         onClick={() => setIsPlaying(!isPlaying)}
         className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shrink-0"
       >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
       </button>

       {/* Waveform Visualization */}
       <div className="flex-1 flex flex-col justify-center h-full">
          <div className="flex justify-between items-end mb-2 h-10 gap-1">
             {bars.map((height, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse bg-primary' : 'bg-muted-foreground/30'}`}
                  style={{ height: `${height}%` }}
                />
             ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
             <span>{isPlaying ? '00:14' : '00:00'}</span>
             <span className="font-bold text-foreground">{title}</span>
             <span>{duration}</span>
          </div>
       </div>

       {/* Actions */}
       <div className="flex items-center gap-2 border-l border-border pl-4">
          <button className="p-2 text-muted-foreground hover:text-foreground"><Volume2 size={18} /></button>
          <button className="p-2 text-muted-foreground hover:text-primary"><Download size={18} /></button>
       </div>
    </div>
  );
}

################################################################################