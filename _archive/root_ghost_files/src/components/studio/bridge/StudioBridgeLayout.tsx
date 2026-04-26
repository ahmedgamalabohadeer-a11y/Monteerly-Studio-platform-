'use client';
import React from 'react';
import { AssetBrowser } from './AssetBrowser';
import { ChevronLeft, ChevronRight, Layers, Settings } from 'lucide-react';

export function StudioBridgeLayout() {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
       {/* Left: Asset Browser (The Bridge) */}
       <AssetBrowser />

       {/* Center: Main Editor (Simplified) */}
       <div className="flex-1 flex flex-col min-w-0">
          {/* Viewer */}
          <div className="flex-1 bg-[#050505] relative flex items-center justify-center border-b border-white/10">
             <div className="w-3/4 aspect-video bg-black border border-white/10 rounded-lg relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs">
                   Main Viewer
                </div>
                {/* Drop Zone Hint */}
                <div className="absolute inset-0 border-2 border-dashed border-indigo-500/50 opacity-0 hover:opacity-100 bg-indigo-500/10 flex items-center justify-center transition-opacity pointer-events-none">
                   <span className="text-indigo-400 font-bold">Drop Asset Here</span>
                </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="h-64 bg-[#111] p-4">
             <div className="flex justify-between items-center mb-2 text-xs text-slate-400">
                <span>00:00:00</span>
                <span>00:05:00</span>
             </div>
             
             {/* Tracks */}
             <div className="space-y-2">
                <div className="h-10 bg-[#1a1a1a] rounded border border-white/5 relative">
                   <div className="absolute left-10 w-40 h-full bg-blue-900/50 border-l border-r border-blue-500 rounded flex items-center px-2 text-[10px] text-blue-200">
                      Interview_CamA.mp4
                   </div>
                </div>
                <div className="h-10 bg-[#1a1a1a] rounded border border-white/5 relative">
                   <div className="absolute left-20 w-24 h-full bg-green-900/50 border-l border-r border-green-500 rounded flex items-center px-2 text-[10px] text-green-200">
                      B-Roll_City.mp4
                   </div>
                </div>
                {/* Audio Track */}
                <div className="h-8 bg-[#1a1a1a] rounded border border-white/5 relative mt-4">
                   <div className="absolute left-0 w-full h-full flex items-center justify-center text-[10px] text-slate-600 border-2 border-dashed border-slate-700">
                      Drag Audio Here
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Right: Properties */}
       <div className="w-64 bg-[#111] border-l border-white/10 hidden xl:block p-4">
          <div className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Properties</div>
          <div className="space-y-4">
             <div className="h-24 bg-[#1a1a1a] rounded border border-white/5"></div>
             <div className="h-24 bg-[#1a1a1a] rounded border border-white/5"></div>
          </div>
       </div>
    </div>
  );
}

################################################################################