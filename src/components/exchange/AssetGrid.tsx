'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Play, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AssetGrid() {
  const assets = [
    {
      id: 1,
      title: 'Drone Shot: Riyadh Night',
      type: 'Video 4K',
      price: '$49',
      sales: 120,
      image: '/images/features/live.jpg',
    },
    {
      id: 2,
      title: 'Cinematic LUTs Pack',
      type: 'Preset',
      price: '$25',
      sales: 850,
      image: '/images/features/ai-brain.jpg',
    },
    {
      id: 3,
      title: 'Sound FX: Horror Pack',
      type: 'Audio',
      price: '$15',
      sales: 300,
      image: '/images/features/speed.jpg',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all"
        >
          <div className="h-40 relative bg-black">
            <Image
              src={asset.image}
              alt={asset.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110">
                <Play size={14} />
              </button>
            </div>
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
              {asset.type}
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-white text-sm mb-1 truncate">{asset.title}</h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-4">
              <Tag size={10} /> {asset.sales} مبيعات
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <span className="text-lg font-bold text-green-400">{asset.price}</span>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white h-7 text-xs gap-1">
                <ShoppingCart size={12} /> شراء
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
