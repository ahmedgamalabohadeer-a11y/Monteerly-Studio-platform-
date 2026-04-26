'use client';
import React, { useState, useRef } from 'react';
import { Play, Star, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

interface Props {
  name: string;
  role: string;
  rate: string;
  image: string; // Thumbnail
  video: string; // Preview Video (Simulated)
  avatar: string;
  onBook: () => void;
}

export function VideoHoverCard({ name, role, rate, image, video, avatar, onBook }: Props) {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovering(true);
    // In a real app, we would play the video here
    // videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    // videoRef.current?.pause();
  };

  return (
    <div 
      className="group relative bg-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
       {/* Media Area */}
       <div className="aspect-video bg-black relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-full object-cover transition-opacity duration-500 ${hovering ? 'opacity-0' : 'opacity-100'}`} 
          />
          
          {/* Simulated Video Layer */}
          <div className={`absolute inset-0 bg-slate-800 flex items-center justify-center transition-opacity duration-500 ${hovering ? 'opacity-100' : 'opacity-0'}`}>
             <img src={image} className="w-full h-full object-cover scale-110 animate-pulse opacity-50" alt="Video Preview" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-2">
                   <Play size={12} fill="currentColor" /> معاينة العمل
                </div>
             </div>
          </div>

          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
             <Star size={12} className="text-yellow-400" fill="currentColor" /> 5.0
          </div>
       </div>

       {/* Info Area */}
       <div className="p-4">
          <div className="flex justify-between items-start mb-3">
             <div className="flex gap-3">
                <Avatar src={avatar} fallback={name[0]} size="sm" />
                <div>
                   <h3 className="font-bold text-white text-sm">{name}</h3>
                   <p className="text-xs text-slate-400">{role}</p>
                </div>
             </div>
             <div className="text-right">
                <div className="font-bold text-white">{rate}</div>
                <div className="text-[10px] text-slate-500">في الساعة</div>
             </div>
          </div>

          <div className="flex gap-2">
             <Button onClick={onBook} className="flex-1 bg-white/10 hover:bg-indigo-600 text-white border border-white/5 transition-colors text-xs h-9">
                احجز الآن
             </Button>
             <button className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 hover:text-red-500 hover:border-red-500/30 transition-colors text-slate-400">
                <Heart size={16} />
             </button>
          </div>
       </div>
    </div>
  );
}

