'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Star, Heart, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

interface Props {
  name: string;
  role: string;
  rate: string;
  image: string;
  video?: string;
  avatar: string;
  rating?: number;
  reviews?: number;
  availability?: 'available' | 'busy' | 'offline';
  verified?: boolean;
  onBook: () => void;
}

const availabilityMap: Record<NonNullable<Props['availability']>, { label: string; className: string }> = {
  available: {
    label: 'متاح الآن',
    className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  },
  busy: {
    label: 'مشغول',
    className: 'bg-amber-500/15 text-amber-300 border border-amber-500/20',
  },
  offline: {
    label: 'غير متصل',
    className: 'bg-slate-500/15 text-slate-300 border border-slate-500/20',
  },
};

export function VideoHoverCard({
  name,
  role,
  rate,
  image,
  video,
  avatar,
  rating = 5,
  reviews = 0,
  availability = 'available',
  verified = false,
  onBook,
}: Props) {
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPreview = async () => {
    setHovering(true);

    if (videoRef.current && video) {
      try {
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch {
        // ignore autoplay restrictions
      }
    }
  };

  const stopPreview = () => {
    setHovering(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const availabilityMeta = availabilityMap[availability];

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      tabIndex={0}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={image}
          alt={`صورة معاينة أعمال ${name}`}
          fill
          className={`object-cover transition-opacity duration-500 ${hovering && video ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, 384px"
        />

        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovering ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <button
            type="button"
            aria-label={favorite ? `إزالة ${name} من المفضلة` : `إضافة ${name} إلى المفضلة`}
            onClick={() => setFavorite((prev) => !prev)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
              favorite
                ? 'border-red-500/30 bg-red-500/15 text-red-400'
                : 'border-white/10 bg-black/40 text-slate-300 hover:border-red-500/30 hover:text-red-400'
            }`}
          >
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur flex items-center gap-1">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            {rating.toFixed(1)}
            <span className="text-slate-300">({reviews})</span>
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
          <div className={`rounded-full px-3 py-1 text-[11px] font-bold ${availabilityMeta.className}`}>
            {availabilityMeta.label}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <Play size={12} fill="currentColor" />
            {video ? 'معاينة العمل' : 'عرض الملف'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="relative">
              <Avatar src={avatar} fallback={name[0]} size="sm" />
              {verified && (
                <div
                  className="absolute -bottom-1 -right-1 rounded-full border-2 border-slate-900 bg-sky-500 p-1 text-white"
                  title="تم التحقق من الهوية"
                >
                  <BadgeCheck size={10} />
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{name}</h3>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold text-white">{rate}</div>
            <div className="text-[10px] text-slate-500">في الساعة</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onBook}
            className="h-9 flex-1 border border-white/5 bg-white/10 text-xs text-white transition-colors hover:bg-indigo-600"
          >
            احجز الآن
          </Button>

          <Button
            variant="outline"
            className="h-9 border-white/10 px-3 text-xs text-white hover:bg-white/10"
          >
            الملف الشخصي
          </Button>
        </div>
      </div>
    </div>
  );
}
