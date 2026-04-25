'use client';
import React, { useState, useRef } from 'react';
import { Play, Pause, Heart, MessageCircle, Share2, UserPlus, Briefcase } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface FeedItemProps {
  id: string;
  videoSrc: string; // Placeholder image for now
  creator: { name: string; role: string; avatar: string; available: boolean };
  stats: { likes: string; comments: string; shares: string };
  tags: string[];
}

export function CreativeFeedItem({ data }: { data: FeedItemProps }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-8 group">
       {/* Video/Image Placeholder */}
       <div className="absolute inset-0 bg-slate-900">
          <img src={data.videoSrc} alt="Showreel" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
             {!isPlaying && (
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                   <Play size={32} fill="white" className="text-white ml-1" />
                </div>
             )}
          </div>
       </div>

       {/* Right Actions Bar */}
       <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center z-20">
          <div className="flex flex-col items-center gap-1">
             <button onClick={() => setLiked(!liked)} className={`p-3 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 transition-all ${liked ? 'text-red-500' : 'text-white'}`}>
                <Heart size={28} fill={liked ? "currentColor" : "none"} />
             </button>
             <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{data.stats.likes}</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
             <button className="p-3 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 text-white transition-all">
                <MessageCircle size={28} />
             </button>
             <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{data.stats.comments}</span>
          </div>

          <button className="p-3 rounded-full bg-black/40 backdrop-blur hover:bg-black/60 text-white transition-all">
             <Share2 size={28} />
          </button>
       </div>

       {/* Bottom Info Area */}
       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20 z-10">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-3">
                <div className="relative">
                   <Avatar src={data.creator.avatar} fallback={data.creator.name[0]} size="md" />
                   <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-0.5 border border-black">
                      <UserPlus size={10} className="text-white" />
                   </div>
                </div>
                <div>
                   <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      {data.creator.name}
                      {data.creator.available && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="متاح للعمل" />}
                   </h3>
                   <p className="text-xs text-slate-300">{data.creator.role}</p>
                </div>
             </div>
             
             <Button size="sm" className="bg-white text-black hover:bg-indigo-50 font-bold text-xs gap-2">
                <Briefcase size={14} /> توظيف
             </Button>
          </div>
          
          <p className="text-sm text-white/90 line-clamp-2 mb-3">
             مشروعي الأخير لشركة بيبسي، تم استخدام Blender للـ VFX و DaVinci للتلوين. #VFX #Commercial
          </p>
          
          <div className="flex flex-wrap gap-2">
             {data.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur rounded-md text-[10px] text-white border border-white/10">
                   #{tag}
                </span>
             ))}
          </div>
       </div>
    </div>
  );
}

