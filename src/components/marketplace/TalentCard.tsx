'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  BriefcaseBusiness,
  Heart,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

type UserRole = 'freelancer' | 'client' | 'agency';

interface TalentProps {
  id: string;
  name: string;
  roleLabel: string;
  rating: number;
  reviews: number;
  rate: string;
  skills: string[];
  verified?: boolean;
  currentRole: UserRole;
}

function getRoleAction(currentRole: UserRole) {
  if (currentRole === 'client') {
    return {
      label: 'طلب تعاون',
      icon: <BriefcaseBusiness size={16} />,
      href: '/ar/jobs/new',
    };
  }

  if (currentRole === 'agency') {
    return {
      label: 'إضافة لمشروع',
      icon: <ShieldCheck size={16} />,
      href: '/ar/jobs/new',
    };
  }

  return {
    label: 'عرض الملف',
    icon: <UserRound size={16} />,
    href: null,
  };
}

export function TalentCard({
  id,
  name,
  roleLabel,
  rating,
  reviews,
  rate,
  skills,
  verified = false,
  currentRole,
}: TalentProps) {
  const [favorite, setFavorite] = useState(false);
  const extraSkills = skills.length > 3 ? skills.length - 3 : 0;
  const action = getRoleAction(currentRole);

  const profileHref = `/ar/marketplace/profile/${id}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* الغلاف */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-indigo-900/70 via-slate-900 to-purple-950/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.35),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(255,255,255,0.06)_45%,transparent_60%)]" />

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
              : 'border-white/10 bg-black/20 text-white/70 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400'
          }`}
        >
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>

        {verified && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
            <ShieldCheck size={12} />
            موثّق
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="relative -mt-10 mb-4 flex items-end justify-between gap-3">
          <div className="relative">
            <Avatar
              fallback={name.charAt(0) || 'م'}
              size="xl"
              className="border-4 border-slate-900 bg-indigo-600"
            />

            {verified && (
              <div
                className="absolute bottom-0 right-0 rounded-full border-2 border-slate-900 bg-sky-500 p-1 text-white"
                title="تم التحقق من الهوية"
              >
                <BadgeCheck size={14} />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0A0A0F] px-3 py-2 text-left">
            <div className="text-sm font-black text-white">{rate}</div>
            <div className="text-[10px] text-slate-500">
              {currentRole === 'freelancer' ? 'عرض السوق' : 'تسعير مبدئي'}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-white transition-colors group-hover:text-indigo-300">
                {name}
              </h3>

              <p className="mt-1 text-sm text-indigo-300">{roleLabel}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={13} />
            متاح للعمل عن بُعد
          </div>

          <div className="mt-3 flex items-center gap-1 text-sm text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="font-bold text-white">{rating.toFixed(1)}</span>
            <span className="text-slate-500">
              ({reviews > 0 ? `${reviews} خبرة` : 'عضو جديد'})
            </span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1.5 text-[11px] text-slate-300"
            >
              {skill}
            </span>
          ))}

          {extraSkills > 0 && (
            <span className="py-1.5 text-[11px] text-slate-500">
              +{extraSkills}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href={profileHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-black text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <UserRound size={15} />
            الملف
          </Link>

          {action.href ? (
            <Link
              href={`${action.href}?talent=${encodeURIComponent(id)}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-black text-white transition-colors hover:bg-indigo-500"
            >
              {action.icon}
              {action.label}
            </Link>
          ) : (
            <Button
              type="button"
              className="min-h-11 bg-indigo-600 px-3 text-xs font-black text-white hover:bg-indigo-500"
              onClick={() => {
                window.location.href = profileHref;
              }}
            >
              {action.icon}
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
