'use client';
import React from 'react';
import { Glasses, Compass } from 'lucide-react';

export function VrPlayer() {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700">
       <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto text-purple-400 animate-pulse">
             <Glasses size={40} />
          </div>
          <h3 className="text-white font-bold text-lg">360° VR Preview Mode</h3>
          <p className="text-slate-400 text-sm">Click and drag to look around</p>
          <div className="flex gap-2 justify-center">
             <span className="text-xs bg-black/50 text-white px-2 py-1 rounded flex items-center gap-1"><Compass size={12} /> Gyro Enabled</span>
          </div>
       </div>
       <div className="absolute bottom-4 right-4 text-white/50 text-xs">WebGL Renderer Active</div>
    </div>
  );
}

################################################################################