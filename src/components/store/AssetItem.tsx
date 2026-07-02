'use client';

import React from 'react';
import Image from 'next/image';
import {
  Music,
  Video,
  FileImage,
  ShoppingCart,
  Volume2,
  Eye,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AssetProps {
  title: string;
  type: 'LUT' | 'Music' | 'Template' | 'SFX';
  price: string;
  image: string;
  downloads: string;
}

const assetMeta = {
  LUT: {
    icon: <FileImage size={16} />,
    label: 'LUT',
    accent: 'text-cyan-300',
    badgeClass: 'bg-cyan-500/15 border-cyan-400/20 text-cyan-300',
  },
  Music: {
    icon: <Music size={16} />,
    label: 'Music',
    accent: 'text-emerald-300',
    badgeClass: 'bg-emerald-500/15 border-emerald-400/20 text-emerald-300',
  },
  Template: {
    icon: <Video size={16} />,
    label: 'Template',
    accent: 'text-fuchsia-300',
    badgeClass: 'bg-fuchsia-500/15 border-fuchsia-400/20 text-fuchsia-300',
  },
  SFX: {
    icon: <Volume2 size={16} />,
    label: 'SFX',
    accent: 'text-amber-300',
    badgeClass: 'bg-amber-500/15 border-amber-400/20 text-amber-300',
  },
};

export function AssetItem({
  title,
  type,
  price,
  image,
  downloads,
}: AssetProps) {
  const meta = assetMeta[type];
  const isFree = price.trim() === '0' || price.toLowerCase().includes('free');

  return (
    <article className="bg-slate-900 border border-white/10 rounded-xl p-4 transition-all hover:border-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/10 group">
      <div className="relative h-36 rounded-lg bg-black mb-4 overflow-hidden">
        <Image
          src={image}
          alt={`معاينة الأصل الرقمي: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className="p-1.5 bg-black/60 rounded-lg text-white backdrop-blur border border-white/10">
            {meta.icon}
          </div>
          <span
            className={`text-[10px] px-2 py-1 rounded-full border backdrop-blur font-bold ${meta.badgeClass}`}
          >
            {meta.label}
          </span>
        </div>

        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold text-white border border-white/10 backdrop-blur">
            <Sparkles size={11} className={meta.accent} />
            جاهز للاستخدام
          </span>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="sm"
            className="bg-white text-black hover:bg-slate-200 font-bold"
            aria-label={`معاينة ${title}`}
          >
            <Eye size={14} className="mr-2" />
            معاينة
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="min-w-0">
          <h4 className="font-bold text-white text-sm mb-1 line-clamp-1">
            {title}
          </h4>
          <span className="text-[11px] text-slate-500">
            {type} • {downloads} تحميل
          </span>
        </div>

        <div className="shrink-0 text-left">
          <span
            className={`block font-bold text-sm ${
              isFree ? 'text-emerald-400' : 'text-indigo-400'
            }`}
          >
            {isFree ? 'مجاني' : price}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5">
          <ShieldCheck size={11} />
          ترخيص موثوق
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">
          تنزيل فوري
        </span>
      </div>

      <Button
        className="w-full mt-2 bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-300 border border-white/10 transition-all text-xs h-9"
        aria-label={`إضافة ${title} إلى السلة`}
      >
        <ShoppingCart size={14} className="mr-2" />
        إضافة إلى السلة
      </Button>
    </article>
  );
}
