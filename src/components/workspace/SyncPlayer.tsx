'use client';
import React, { useRef, useState } from 'react';
import { Play, Pause, RotateCcw, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface SyncProps {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
}

export function SyncPlayer({ leftSrc, rightSrc, leftLabel, rightLabel }: SyncProps) {
  const leftVideo = useRef<HTMLVideoElement>(null);
  const rightVideo = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (leftVideo.current && rightVideo.current) {
      if (isPlaying) {
        leftVideo.current.pause();
        rightVideo.current.pause();
      } else {
        leftVideo.current.play();
        rightVideo.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (leftVideo.current && rightVideo.current) {
      leftVideo.current.currentTime = time;
      rightVideo.current.currentTime = time;
    }
  };

  return (
    <div className="bg-black rounded-xl overflow-hidden border border-border">
       {/* Videos Container */}
       <div className="grid grid-cols-2 gap-1 relative">
          <div className="relative group">
             <span className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded font-bold">{leftLabel}</span>
             <video ref={leftVideo} src={leftSrc} className="w-full aspect-video bg-slate-900" />
          </div>
          <div className="relative group">
             <span className="absolute top-2 right-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded font-bold">{rightLabel}</span>
             <video ref={rightVideo} src={rightSrc} className="w-full aspect-video bg-slate-900" muted /> {/* Right muted to avoid echo */}
          </div>
          
          {/* Sync Indicator */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg z-20 pointer-events-none opacity-50">
             <SplitSquareHorizontal size={24} />
          </div>
       </div>

       {/* Controls */}
       <div className="bg-slate-900 p-4 flex items-center gap-4 text-white">
          <button onClick={togglePlay} className="hover:text-primary transition-colors">
             {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <input 
            type="range" 
            className="flex-1 accent-primary h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            onChange={handleSeek}
            defaultValue={0}
          />
          
          <button onClick={() => { if(leftVideo.current) leftVideo.current.currentTime=0; if(rightVideo.current) rightVideo.current.currentTime=0; }} className="hover:text-primary">
             <RotateCcw size={20} />
          </button>
       </div>
    </div>
  );
}
