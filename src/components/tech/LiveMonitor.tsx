'use client';
import React from 'react';
import { Activity, Wifi, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LiveMonitor() {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
       <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
             <h3 className="font-bold text-white uppercase tracking-wider">On Air</h3>
             <span className="text-xs text-slate-500 font-mono">00:45:12</span>
          </div>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white h-8 text-xs">
             إيقاف البث الطارئ
          </Button>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
             <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Wifi size={12}/> Bitrate</div>
             <div className="text-xl font-bold text-green-400">6,500 <span className="text-xs">kbps</span></div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
             <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Activity size={12}/> FPS</div>
             <div className="text-xl font-bold text-white">59.94</div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
             <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Clock size={12}/> Dropped Frames</div>
             <div className="text-xl font-bold text-white">0 <span className="text-xs text-slate-500">(0%)</span></div>
          </div>
          <div className="bg-black/40 p-4 rounded-lg border border-white/5">
             <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Globe size={12}/> Server</div>
             <div className="text-xl font-bold text-indigo-400">AWS Bahrain</div>
          </div>
       </div>

       {/* Stream Health Graph Placeholder */}
       <div className="h-32 bg-black/20 rounded-lg border border-white/5 flex items-end px-2 gap-1 overflow-hidden">
          {[...Array(40)].map((_, i) => (
             <div 
               key={i} 
               className="flex-1 bg-green-500/20 hover:bg-green-500/50 transition-colors rounded-t-sm"
               style={{ height: `${Math.random() * 30 + 60}%` }}
             />
          ))}
       </div>
    </div>
  );
}
