'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BadgeCheck,
  Heart,
  Play,
  Star,
  UserRound,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface VideoHoverCardProps {
  id: string;
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
  actionLabel: string;
  actionIcon: React.ReactNode;
  actionHref: string;
}

const availabilityMap: Record<
  NonNullable<VideoHoverCardProps['availability']>,
  { label: string; className: string }
> = {
  available: {
    label: 'متاح الآن',
    className: 'border border-emerald-500/20 bg-emerald-500/15 text-emerald-300',
  },
  busy: {
    label: 'مشغول',
    className: 'border border-amber-500/20 bg-amber-500/15 text-amber-300',
  },
  offline: {
    label: 'غير متصل',
    className: 'border border-slate-500/20 bg-slate-500/15 text-slate-300',
  },
};

export function VideoHoverCard({
  id,
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
  actionLabel,
  actionIcon,
  actionHref,
}: VideoHoverCardProps) {
  const [hovering, setHovering] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const profileHref = `/ar/marketplace/profile/${encodeURIComponent(id)}`;
  const availabilityMeta = availabilityMap[availability];

  const startPreview = async () => {
    setHovering(true);

    if (!video || !videoRef.current) {
      return;
    }

    try {
      videoRef.current.currentTime = 0;
      await videoRef.current.play();
    } catch {
      // قد يمنع المتصفح التشغيل التلقائي؛ تظل معاينة الصورة ظاهرة.
    }
  };

  const stopPreview = () => {
    setHovering(false);

    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10"
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={image}
          alt={`معاينة أعمال ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 384px"
          className={`object-cover transition-opacity duration-500 ${
            hovering && video ? 'opacity-0' : 'opacity-100'
          }`}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <button
          type="button"
          aria-label={
            favorite
              ? `إزالة ${name} من المفضلة`
              : `إضافة ${name} إلى المفضلة`
          }
          aria-pressed={favorite}
          onClick={() => setFavorite((current) => !current)}
          className={`absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
            favorite
              ? 'border-rose-500/30 bg-rose-500/15 text-rose-400'
              : 'border-white/10 bg-black/40 text-slate-300 hover:border-rose-500/30 hover:text-rose-400'
          }`}
        >
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            {rating.toFixed(1)}
            <span className="text-slate-300">({reviews})</span>
          </div>
        </div>

        <div className="absolute bottom-3 right-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold ${availabilityMeta.className}`}
          >
            {availabilityMeta.label}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <Play size={12} fill="currentColor" />
            {video ? 'معاينة العمل' : 'عرض الملف'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <div className="relative shrink-0">
              <Avatar src={avatar} fallback={name.charAt(0) || 'م'} size="sm" />

              {verified && (
                <div
                  className="absolute -bottom-1 -right-1 rounded-full border-2 border-slate-900 bg-sky-500 p-1 text-white"
                  title="تم التحقق من الهوية"
                >
                  <BadgeCheck size={10} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-black text-white">{name}</h3>
              <p className="mt-1 truncate text-xs text-slate-400">{role}</p>

              {verified && (
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                  <BadgeCheck size={11} />
                  هوية موثقة
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 text-left">
            <div className="text-sm font-black text-white">{rate}</div>
            <div className="text-[10px] text-slate-500">في الساعة</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={profileHref}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <UserRound size={14} />
            الملف
          </Link>

          <Link
            href={actionHref}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-black text-white transition-colors hover:bg-indigo-500"
          >
            {actionIcon}
            {actionLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
