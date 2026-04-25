'use client';
import React, { useState } from 'react';
import { Play, Square, Scissors, Share2, Signal, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LiveStreamCutter() {
  const [clips, setClips] = useState([
    { id: 1, title: 'تصريح الوزير عن الميزانية', duration: '00:30', time: '10:15 AM' },
    { id: 2, title: 'لحظة وصول الوفد', duration: '01:15', time: '10:22 AM' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
       {/* Main Player */}
       <div className="lg:col-span-2 flex flex-col bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
          <div className="relative flex-1 bg-black">
             <img src="/images/features/live.jpg" className="w-full h-full object-cover opacity-80" />
             <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse flex items-center gap-2">
                   <div className="w-2 h-2 bg-white rounded-full" /> LIVE
                </span>
                <span className="bg-black/60 text-white px-2 py-1 rounded text-xs font-mono">
                   RTMP INGEST: source_01
                </span>
             </div>
             
             {/* Timeline Overlay */}
             <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent p-4 flex items-end">
                <div className="w-full h-8 bg-slate-800/50 rounded flex items-center px-2 relative border border-white/20">
                   <div className="absolute left-[80%] h-full w-0.5 bg-red-500 z-10">
                      <div className="absolute -top-6 -left-3 bg-red-500 text-white text-[9px] px-1 rounded">NOW</div>
                   </div>
                   <div className="w-full h-4 bg-slate-700 rounded-sm overflow-hidden flex gap-1">
                      {/* Fake Audio Waveform */}
                      {Array.from({length: 40}).map((_, i) => (
                         <div key={i} className="w-1 bg-slate-500" style={{ height: `${Math.random() * 100}%` }} />
                      ))}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-4 bg-slate-950 border-t border-white/10 flex justify-between items-center">
             <div className="flex gap-4">
                <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10 gap-2">
                   <Square size={16} fill="currentColor" /> إيقاف مؤقت
                </Button>
                <div className="h-10 w-px bg-white/10" />
                <Button className="bg-white text-black font-bold gap-2">
                   <Scissors size={16} /> قص آخر 30 ثانية
                </Button>
                <Button variant="outline" className="border-white/10 text-white gap-2">
                   قص يدوي (In/Out)
                </Button>
             </div>
             <div className="text-right">
                <div className="text-2xl font-mono font-bold text-white">10:45:22</div>
                <div className="text-xs text-slate-500">Live Timecode</div>
             </div>
          </div>
       </div>

       {/* Clips Bin */}
       <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
             <Scissors size={18} className="text-yellow-400" /> المقتطفات الجاهزة
          </h3>
          
          <div className="flex-1 space-y-3 overflow-y-auto">
             {clips.map((clip) => (
                <div key={clip.id} className="bg-black/30 border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                   <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white text-sm">{clip.title}</span>
                      <span className="text-[10px] text-slate-500 bg-white/10 px-1 rounded">{clip.duration}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={10}/> {clip.time}</span>
                      <button className="text-indigo-400 hover:text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Share2 size={12} /> نشر سريع
                      </button>
                   </div>
                </div>
             ))}
             
             {/* Creating Clip State */}
             <div className="bg-indigo-900/10 border border-indigo-500/20 p-3 rounded-lg animate-pulse">
                <div className="text-xs text-indigo-300 mb-1">جاري معالجة المقطع الجديد...</div>
                <div className="w-full h-1 bg-indigo-900 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 w-[60%]" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

################################################################################