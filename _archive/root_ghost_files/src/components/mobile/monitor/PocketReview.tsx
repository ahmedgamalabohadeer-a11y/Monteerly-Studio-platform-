'use client';
import React, { useState } from 'react';
import { Play, Pause, PenTool, MessageCircle, ChevronLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PocketReview() {
  const [playing, setPlaying] = useState(false);
  const [drawing, setDrawing] = useState(false);

  return (
    <div className="bg-black h-[calc(100vh-80px)] flex flex-col relative overflow-hidden rounded-xl border border-white/10 max-w-sm mx-auto shadow-2xl">
       {/* Top Bar */}
       <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-start">
          <button className="text-white bg-black/20 backdrop-blur p-2 rounded-full"><ChevronLeft size={20}/></button>
          <div className="text-center">
             <div className="text-white font-bold text-sm shadow-black drop-shadow-md">SCENE 4A - TAKE 3</div>
             <div className="text-green-400 text-[10px] font-mono bg-black/40 px-2 rounded">00:04:12:00</div>
          </div>
          <button className="text-white bg-black/20 backdrop-blur p-2 rounded-full"><MessageCircle size={20}/></button>
       </div>

       {/* Video Area */}
       <div className="flex-1 bg-slate-900 relative flex items-center justify-center">
          <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-80" />
          
          {!playing && (
             <button 
               onClick={() => setPlaying(true)}
               className="absolute z-10 w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30"
             >
                <Play size={32} className="text-white ml-1" />
             </button>
          )}

          {/* Drawing Overlay */}
          {drawing && (
             <div className="absolute inset-0 z-30 pointer-events-none">
                <svg className="w-full h-full">
                   <path d="M50,150 Q150,50 250,150 T450,150" stroke="red" strokeWidth="4" fill="none" />
                   <circle cx="100" cy="100" r="20" stroke="red" strokeWidth="4" fill="none" />
                </svg>
             </div>
          )}
       </div>

       {/* Controls */}
       <div className="bg-slate-950 p-6 pb-8 rounded-t-2xl z-20 border-t border-white/10">
          <div className="flex justify-between items-center mb-6">
             <button 
               onClick={() => setDrawing(!drawing)}
               className={`p-3 rounded-full ${drawing ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-400'}`}
             >
                <PenTool size={20} />
             </button>
             
             <div className="flex gap-4">
                <button className="p-4 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
                   <ThumbsDown size={24} />
                </button>
                <button className="p-4 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 hover:bg-green-500 hover:text-black transition-all">
                   <ThumbsUp size={24} />
                </button>
             </div>
          </div>

          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
             <div className="bg-red-600 h-full w-1/3" />
          </div>
       </div>
    </div>
  );
}

################################################################################