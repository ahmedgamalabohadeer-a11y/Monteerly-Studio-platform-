'use client';
import React from 'react';
import { Download, Music, Video, FileImage, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssetProps {
  title: string;
  type: 'LUT' | 'Music' | 'Template' | 'SFX';
  price: string;
  image: string;
  downloads: string;
}

export function AssetItem({ title, type, price, image, downloads }: AssetProps) {
  const icons = {
    LUT: <FileImage size={16} />,
    Music: <Music size={16} />,
    Template: <Video size={16} />,
    SFX: <Music size={16} />,
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-4 hover:border-indigo-500/30 transition-all group">
       <div className="h-32 rounded-lg bg-black mb-4 relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 left-2 p-1.5 bg-black/60 rounded text-white backdrop-blur">
             {icons[type]}
          </div>
       </div>
       
       <div className="flex justify-between items-start mb-2">
          <div>
             <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
             <span className="text-[10px] text-slate-500">{type} • {downloads} تحميل</span>
          </div>
          <span className="font-bold text-indigo-400 text-sm">{price}</span>
       </div>
       
       <Button className="w-full mt-2 bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-300 border border-white/5 transition-all text-xs h-8">
          <ShoppingCart size={14} className="mr-2" /> إضافة للسلة
       </Button>
    </div>
  );
}

################################################################################