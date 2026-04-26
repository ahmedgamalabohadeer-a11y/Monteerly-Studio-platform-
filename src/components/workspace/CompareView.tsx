'use client';
import React, { useState } from 'react';
import { SplitSquareHorizontal, ArrowRightLeft } from 'lucide-react';
export function CompareView() {
  const [sliderPosition, setSliderPosition] = useState(50);
  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
       {/* Version 1 (Left/Bottom) */}
       <div className="absolute inset-0 z-0">
          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 text-xs rounded">v1.0 (Original)</div>
          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600 font-bold text-4xl">VIDEO V1</div>
       </div>
       {/* Version 2 (Right/Top) - Clip Path based on slider */}
       <div 
         className="absolute inset-0 z-10 bg-slate-900 border-l-2 border-white"
         style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
       >
           <div className="absolute top-4 right-4 bg-emerald-500/80 text-white px-2 py-1 text-xs rounded">v2.0 (Color Graded)</div>
           <div className="w-full h-full flex items-center justify-center text-emerald-500 font-bold text-4xl">VIDEO V2</div>
       </div>
       {/* Slider Handle */}
       <input 
         type="range" 
         min="0" 
         max="100" 
         value={sliderPosition}
         onChange={(e) => setSliderPosition(Number(e.target.value))}
         className="absolute inset-0 z-20 w-full h-full opacity-0 cursor-col-resize"
       />
       <div 
         className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none flex items-center justify-center"
         style={{ left: `${sliderPosition}%` }}
       >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
             <ArrowRightLeft size={16} />
          </div>
       </div>
    </div>
  );
}
