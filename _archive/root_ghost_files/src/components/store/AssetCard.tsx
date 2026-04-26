'use client';
import React from 'react';
import { Download, ShoppingCart, Music, FileImage, Film } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssetProps {
  title: string;
  type: 'LUT' | 'Music' | 'Template';
  price: string;
  sales: number;
  image: string;
}

export function AssetCard({ title, type, price, sales, image }: AssetProps) {
  const icons = {
    LUT: <FileImage size={16} />,
    Music: <Music size={16} />,
    Template: <Film size={16} />,
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group">
       <div className="h-40 bg-black relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur p-1.5 rounded-lg text-white">
             {icons[type]}
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Button size="sm" className="bg-white text-black font-bold hover:bg-slate-200">معاينة</Button>
          </div>
       </div>
       
       <div className="p-4">
          <div className="flex justify-between items-start mb-2">
             <div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{title}</h4>
                <p className="text-xs text-slate-500">{type} • {sales} مبيعات</p>
             </div>
             <span className="font-bold text-green-400">{price}</span>
          </div>
          
          <Button className="w-full mt-2 h-9 text-xs bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white border border-white/5 transition-all">
             <ShoppingCart size={14} className="mr-2" /> إضافة للسلة
          </Button>
       </div>
    </div>
  );
}

################################################################################