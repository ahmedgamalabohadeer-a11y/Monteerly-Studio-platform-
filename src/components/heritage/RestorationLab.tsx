'use client';
import React, { useState } from 'react';
import { Wand2, Layers, Download, ScanLine, Eraser, Palette } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function RestorationLab() {
  const [sliderPos, setSliderPos] = useState(50);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
       {/* Controls */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6 flex items-center gap-2">
             <Wand2 className="text-yellow-400" /> أدوات الترميم (AI Restoration)
          </h3>

          <div className="space-y-6 flex-1">
             <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded"><ScanLine size={18}/></div>
                   <div className="font-bold text-white text-sm">Upscale to 4K</div>
                </div>
                <p className="text-[10px] text-slate-400">Super-Resolution لرفع الدقة دون فقدان التفاصيل.</p>
                <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-indigo-500"></div></div>
             </div>

             <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-green-500/20 text-green-400 rounded"><Palette size={18}/></div>
                   <div className="font-bold text-white text-sm">AI Colorization</div>
                </div>
                <p className="text-[10px] text-slate-400">تلوين اللقطات الأبيض والأسود بناءً على السياق التاريخي.</p>
                <input type="range" className="w-full mt-2 accent-green-500" />
             </div>

             <div className="p-4 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-red-500/20 text-red-400 rounded"><Eraser size={18}/></div>
                   <div className="font-bold text-white text-sm">Scratch Removal</div>
                </div>
                <p className="text-[10px] text-slate-400">إزالة الخدوش والضوضاء من الأشرطة القديمة.</p>
             </div>
          </div>

          <Button 
            onClick={() => setProcessing(true)}
            className="w-full bg-white text-black font-bold h-12 gap-2 mt-4"
          >
             {processing ? 'جاري المعالجة...' : 'بدء الترميم'}
          </Button>
       </div>

       {/* Preview Area */}
       <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl relative overflow-hidden group select-none">
          <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white border border-white/10">
             Original (1965)
          </div>
          <div className="absolute top-4 right-4 z-20 bg-indigo-600 px-3 py-1 rounded text-xs font-bold text-white border border-indigo-400">
             Restored (2026)
          </div>

          {/* After Image */}
          <div className="absolute inset-0">
             <img src="/images/features/live.jpg" className="w-full h-full object-cover" />
          </div>

          {/* Before Image (Clipped) */}
          <div className="absolute inset-0 overflow-hidden bg-black" style={{ width: `${sliderPos}%`, borderRight: '2px solid white' }}>
             <img src="/images/features/live.jpg" className="absolute inset-0 w-full h-full object-cover filter grayscale sepia contrast-125 brightness-75" style={{ width: '100vw', maxWidth: 'none' }} />
             {/* Simulated Scratches overlay */}
             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/scratch-pad.png')] mix-blend-screen pointer-events-none"></div>
          </div>

          {/* Slider Handle */}
          <div 
             className="absolute inset-y-0 w-1 bg-transparent cursor-ew-resize z-30"
             style={{ left: `${sliderPos}%` }}
             onMouseMove={(e) => {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if(rect) setSliderPos(((e.clientX - rect.left) / rect.width) * 100);
             }}
          >
             <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl">
                <Layers size={16} className="text-black" />
             </div>
          </div>
       </div>
    </div>
  );
}
