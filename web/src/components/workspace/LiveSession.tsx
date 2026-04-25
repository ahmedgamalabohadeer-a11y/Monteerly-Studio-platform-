'use client';
import React from 'react';
import { Radio, Users, Mic, Video, MessageSquare } from 'lucide-react';
export function LiveSession() {
  return (
    <div className="bg-black text-white h-full flex flex-col">
       <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
             <span className="font-bold text-sm tracking-wider uppercase">Live Session</span>
             <span className="bg-red-500/20 text-red-500 text-[10px] px-2 rounded">ON AIR</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
             <span className="flex items-center gap-1"><Users size={14} /> 4 Viewing</span>
             <span className="text-slate-400">00:12:45</span>
          </div>
       </div>
       <div className="flex-1 flex items-center justify-center bg-slate-800">
          <div className="text-center opacity-50">
             <Radio size={48} className="mx-auto mb-2" />
             <p>Waiting for NDI / OBS Stream Source...</p>
             <p className="text-xs font-mono mt-2">rtmp://live.monteerly.com/session/x8z9...</p>
          </div>
       </div>
       <div className="h-16 bg-slate-900 border-t border-white/10 flex items-center justify-center gap-4">
          <button className="p-3 rounded-full bg-white/10 hover:bg-white/20"><Mic size={20} /></button>
          <button className="p-3 rounded-full bg-red-600 hover:bg-red-700"><Video size={20} /></button>
          <button className="p-3 rounded-full bg-white/10 hover:bg-white/20"><MessageSquare size={20} /></button>
       </div>
    </div>
  );
}
