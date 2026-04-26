'use client';
import React, { useState } from 'react';
import { Play, Pause, Mic, MicOff, Users, Glasses } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export function ScreeningRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [micOn, setMicOn] = useState(true);

  const viewers = [
    { id: 1, name: 'سارة (Producer)', avatar: '/avatars/sara.jpg', speaking: true },
    { id: 2, name: 'أحمد (Director)', avatar: '/avatars/ahmed.jpg', speaking: false },
    { id: 3, name: 'أنت (Editor)', avatar: '/avatars/me.jpg', speaking: false },
  ];

  return (
    <div className="relative h-[calc(100vh-100px)] bg-slate-950 overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-white/5 shadow-2xl perspective-1000">
       {/* Ambient Light Effect */}
       <div className={`absolute inset-0 transition-opacity duration-1000 ${isPlaying ? 'opacity-30' : 'opacity-80'}`} 
            style={{ background: 'radial-gradient(circle at center, #1e1b4b 0%, #000 70%)' }} />

       {/* The Screen (3D Transform) */}
       <div className="relative z-10 w-[80%] aspect-video bg-black shadow-[0_0_100px_rgba(79,70,229,0.3)] rounded-lg overflow-hidden border border-slate-800 transform rotate-x-2 transition-transform duration-500">
          <img src="/images/features/live.jpg" className={`w-full h-full object-cover transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-50'}`} />
          
          {!isPlaying && (
             <div className="absolute inset-0 flex items-center justify-center">
                <button onClick={() => setIsPlaying(true)} className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                   <Play size={40} className="text-white ml-1" />
                </button>
             </div>
          )}
          
          <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
             LIVE SYNC
          </div>
       </div>

       {/* The Audience (Avatars) */}
       <div className="relative z-20 mt-12 flex gap-12 items-end">
          {viewers.map((viewer) => (
             <div key={viewer.id} className="flex flex-col items-center gap-2 group">
                {viewer.speaking && (
                   <div className="mb-1 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                      يتحدث...
                   </div>
                )}
                <div className={`w-16 h-16 rounded-full p-1 ${viewer.speaking ? 'bg-green-500 box-content' : 'bg-transparent'}`}>
                   <Avatar src={viewer.avatar} fallback={viewer.name[0]} size="lg" />
                </div>
                <span className="text-slate-400 text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur">{viewer.name}</span>
             </div>
          ))}
       </div>

       {/* Controls */}
       <div className="absolute bottom-8 flex gap-4 bg-black/80 backdrop-blur px-6 py-3 rounded-full border border-white/10 z-30">
          <button onClick={() => setMicOn(!micOn)} className={`p-3 rounded-full ${micOn ? 'bg-white/10 text-white' : 'bg-red-500/20 text-red-500'}`}>
             {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          <div className="w-px h-10 bg-white/10" />
          <button className="p-3 rounded-full hover:bg-white/10 text-indigo-400" title="VR Mode">
             <Glasses size={20} />
          </button>
          <button className="p-3 rounded-full hover:bg-white/10 text-slate-300">
             <Users size={20} />
          </button>
       </div>
    </div>
  );
}

