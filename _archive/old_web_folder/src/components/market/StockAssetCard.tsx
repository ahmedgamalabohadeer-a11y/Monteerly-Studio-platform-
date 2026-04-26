'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Heart, ShoppingCart } from 'lucide-react';

interface AssetProps {
  title: string;
  price: number;
  type: 'video' | 'image' | 'audio';
  thumbnail: string;
  duration?: string;
}

export function StockAssetCard({ title, price, type, thumbnail, duration }: AssetProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative rounded-xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       {/* Thumbnail Area */}
       <div className="relative aspect-video bg-black">
          <Image src={thumbnail} alt={title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase">
             {type}
          </div>
          {duration && (
             <div className="absolute bottom-2 left-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">
                {duration}
             </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
             <button className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Play fill="currentColor" size={20} className="ml-1" />
             </button>
          </div>
       </div>

       {/* Info Area */}
       <div className="p-3">
          <div className="flex justify-between items-start mb-2">
             <h4 className="font-bold text-sm line-clamp-1 hover:text-primary cursor-pointer">{title}</h4>
             <span className="font-bold text-sm">${price}</span>
          </div>
          
          <div className="flex justify-between items-center mt-3">
             <p className="text-[10px] text-muted-foreground">بواسطة <span className="underline cursor-pointer">PixelStudio</span></p>
             <div className="flex gap-1">
                <button className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors text-muted-foreground">
                   <Heart size={16} />
                </button>
                <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-md transition-colors text-muted-foreground">
                   <ShoppingCart size={16} />
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

