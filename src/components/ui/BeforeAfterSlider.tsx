'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface Props {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const position = ((pageX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-col-resize group select-none touch-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
       {/* After Image (Base) */}
       <Image src={afterImage} alt="After" fill className="object-cover" />
       <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">After</div>

       {/* Before Image (Overlay) */}
       <div 
         className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-white"
         style={{ width: `${sliderPosition}%` }}
       >
          <div className="relative w-full h-full">
             {/* We use a trick here: Image must be absolute and full width relative to PARENT container, not this clipped div */}
             {/* Note: In production, you might need fixed dimensions or advanced CSS to prevent squishing. For simplicity: */}
             <img src={beforeImage} alt="Before" className="absolute top-0 left-0 h-full max-w-none w-[100vw] sm:w-[500px] md:w-[800px] object-cover" style={{ width: containerRef.current?.offsetWidth }} />
          </div>
          <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">Before</div>
       </div>

       {/* Slider Handle */}
       <div 
         className="absolute top-0 bottom-0 w-8 -ml-4 flex items-center justify-center pointer-events-none"
         style={{ left: `${sliderPosition}%` }}
       >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-900">
             <ChevronsLeftRight size={16} />
          </div>
       </div>
    </div>
  );
}
