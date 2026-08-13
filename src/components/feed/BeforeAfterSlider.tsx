'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((clientX - left) / width) * 100;

    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 relative group">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 mb-2">
          <Sparkles size={12} /> جرب سحر الذكاء الاصطناعي
        </span>
        <h2 className="text-2xl font-bold text-white">تحسين الألوان بلمسة واحدة</h2>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize border border-white/20 shadow-2xl select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <Image
          src="/images/features/live.jpg"
          alt="المشهد بعد تحسين الألوان بالذكاء الاصطناعي"
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          After (AI Color)
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%`, borderRight: '2px solid white' }}
        >
          <Image
            src="/images/features/live.jpg"
            alt="المشهد قبل المعالجة اللونية بصيغة RAW"
            fill
            className="absolute inset-0 object-cover filter grayscale contrast-75 brightness-75"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
            Before (RAW)
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-8 -ml-4 bg-transparent flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-slate-400" />
              <div className="w-0.5 h-3 bg-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
