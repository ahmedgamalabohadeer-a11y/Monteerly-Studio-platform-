'use client';
import React from 'react';
import { Eye, Clock, MousePointer, ThumbsDown } from 'lucide-react';

export function ContentHeatmap() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <div>
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Eye size={20} className="text-pink-500" /> تحليل تفاعل الجمهور (Heatmap)
             </h3>
             <p className="text-slate-400 text-xs">تحليل الفيديو: "إعلان منتج X"</p>
          </div>
          <div className="text-right">
             <div className="text-2xl font-bold text-white">68%</div>
             <div className="text-xs text-slate-500">معدل الاحتفاظ (Retention)</div>
          </div>
       </div>

       {/* Video Timeline Visualization */}
       <div className="relative h-32 bg-black rounded-lg border border-white/5 mb-6 overflow-hidden">
          {/* Heatmap Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 via-yellow-500/30 to-red-500/30" />
          
          {/* Retention Curve Line */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
             <path d="M0,10 Q100,10 200,30 T400,50 T600,80 T800,100" fill="none" stroke="white" strokeWidth="2" className="opacity-50" />
          </svg>

          {/* Spike Markers */}
          <div className="absolute top-0 left-[25%] h-full w-px bg-white/20 border-l border-dashed">
             <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">Replayed 120x</div>
          </div>
          <div className="absolute top-0 left-[65%] h-full w-px bg-red-500/50 border-l border-dashed">
             <div className="absolute bottom-2 left-2 bg-red-900/80 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                <ThumbsDown size={10} /> Drop-off Point
             </div>
          </div>
       </div>

       {/* Detailed Metrics */}
       <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/5 rounded-lg">
             <Clock size={16} className="mx-auto mb-2 text-blue-400" />
             <div className="text-xs text-slate-400">Avg. Watch Time</div>
             <div className="font-bold text-white">01:45</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
             <MousePointer size={16} className="mx-auto mb-2 text-green-400" />
             <div className="text-xs text-slate-400">Click Rate</div>
             <div className="font-bold text-white">4.2%</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
             <ThumbsDown size={16} className="mx-auto mb-2 text-red-400" />
             <div className="text-xs text-slate-400">Exit Rate</div>
             <div className="font-bold text-white">12%</div>
          </div>
       </div>
    </div>
  );
}
