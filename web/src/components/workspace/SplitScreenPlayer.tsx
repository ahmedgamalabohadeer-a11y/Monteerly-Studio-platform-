'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';
export function SplitScreenPlayer() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, pos)));
  };
  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden cursor-col-resize select-none border border-white/10 group"
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
      onTouchMove={handleDrag}
    >
       {/* After Image (V2) - Base Layer */}
       <div className="absolute inset-0">
          <img src="/images/features/live.jpg" className="w-full h-full object-cover" alt="V2" />
          <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-white">V2 (Color Graded)</div>
       </div>
       {/* Before Image (V1) - Clipped Layer */}
       <div 
         className="absolute inset-0 overflow-hidden border-r-2 border-white"
         style={{ width: `${sliderPosition}%` }}
       >
          <img src="/images/features/live.jpg" className="w-full h-full object-cover grayscale" alt="V1" />
          <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs font-bold text-slate-300">V1 (RAW)</div>
       </div>
       {/* Slider Handle */}
       <div 
         className="absolute top-0 bottom-0 w-1 bg-transparent cursor-col-resize flex items-center justify-center"
         style={{ left: `${sliderPosition}%` }}
       >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl -ml-0.5">
             <MoveHorizontal size={16} className="text-black" />
          </div>
       </div>
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          اسحب للمقارنة
       </div>
    </div>
  );
}
