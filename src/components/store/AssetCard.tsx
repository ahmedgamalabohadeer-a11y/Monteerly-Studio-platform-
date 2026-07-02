'use client';

import React from 'react';
import Image from 'next/image';
import {
  ShoppingCart,
  Music,
  FileImage,
  Film,
  Eye,
  Sparkles,
  BadgeDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssetProps {
  title: string;
  type: 'LUT' | 'Music' | 'Template';
  price: string;
  sales: number;
  image: string;
}

const assetMeta = {
  LUT: {
    icon: <FileImage size={16} />,
    label: 'LUT احترافي',
    badgeClass:
      'bg-cyan-500/15 text-cyan-300 border border-cyan-400/20',
  },
  Music: {
    icon: <Music size={16} />,
    label: 'موسيقى مرخّصة',
    badgeClass:
      'bg-emerald-500/15 text-emerald-300 border border-emerald-400/20',
  },
  Template: {
    icon: <Film size={16} />,
    label: 'قالب جاهز',
    badgeClass:
      'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/20',
  },
};

export function AssetCard({
  title,
  type,
  price,
  sales,
  image,
}: AssetProps) {
  const meta = assetMeta[type];
  const isFree = price.trim() === '0' || price.toLowerCase().includes('free');

  return (
    <article className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 group">
      <div className="relative h-44 bg-black overflow-hidden">
        <Image
          src={image}
          alt={`معاينة الأصل الرقمي: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-black/60 backdrop-blur-md p-2 rounded-lg text-white border border-white/10">
            {meta.icon}
          </span>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${meta.badgeClass}`}>
            {meta.label}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-amber-300 border border-white/10 backdrop-blur-md">
            <Sparkles size={12} />
            أصل مميز
          </span>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="sm"
            className="bg-white text-black font-bold hover:bg-slate-200 shadow-lg"
            aria-label={`معاينة ${title}`}
          >
            <Eye size={14} className="mr-2" />
            معاينة سريعة
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h4 className="font-bold text-white text-sm line-clamp-1">
              {title}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {type} • {sales.toLocaleString()} مبيعات
            </p>
          </div>

          <div className="text-left shrink-0">
            <div
              className={`text-sm font-black ${
                isFree ? 'text-emerald-400' : 'text-green-400'
              }`}
            >
              {isFree ? 'مجاني' : price}
            </div>
            <div className="text-[10px] text-slate-500 mt-1 inline-flex items-center gap-1">
              <BadgeDollarSign size={11} />
              ترخيص تجاري
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">
            جاهز للاستخدام
          </span>
          <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">
            تسليم فوري
          </span>
        </div>

        <Button
          className="w-full h-10 text-xs bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white border border-white/10 transition-all"
          aria-label={`إضافة ${title} إلى السلة`}
        >
          <ShoppingCart size={14} className="mr-2" />
          إضافة إلى السلة
        </Button>
      </div>
    </article>
  );
}
