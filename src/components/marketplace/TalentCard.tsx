'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, BadgeCheck, Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface TalentProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  rate: string;
  skills: string[];
  image: string;
  verified?: boolean;
}

export function TalentCard({ name, role, rating, reviews, rate, skills, image, verified = false }: TalentProps) {
  const [favorite, setFavorite] = useState(false);
  const extraSkills = skills.length > 3 ? skills.length - 3 : 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="relative h-24 overflow-hidden bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <Image
          src={image}
          alt={`غلاف أعمال ${name}`}
          fill
          className="object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1280px) 50vw, 25vw"
        />
        <button
          type="button"
          aria-label={favorite ? `إزالة ${name} من المفضلة` : `إضافة ${name} إلى المفضلة`}
          onClick={() => setFavorite((prev) => !prev)}
          className={`absolute top-3 left-3 transition-colors ${
            favorite ? 'text-red-500' : 'text-white/50 hover:text-red-500'
          }`}
        >
          <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6">
        <div className="relative -mt-10 mb-4 flex items-end justify-between">
          <div className="relative">
            <Avatar src={image} fallback={name[0]} size="xl" className="border-4 border-slate-900" />
            {verified && (
              <div
                className="absolute bottom-0 right-0 rounded-full border-2 border-slate-900 bg-blue-500 p-1 text-white"
                title="تم التحقق من الهوية"
              >
                <BadgeCheck size={14} />
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="mb-0.5 text-lg font-bold text-white">{rate}</div>
            <div className="text-xs text-slate-400">ساعة / مشروع</div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-indigo-400">{name}</h3>
          <p className="mb-2 text-sm text-slate-400">{role}</p>

          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={12} />
            السعودية، الرياض
          </div>

          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="font-bold text-white">{rating}</span>
            <span className="text-slate-500">({reviews})</span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded border border-white/5 bg-white/5 px-2 py-1 text-[10px] text-slate-300"
            >
              {skill}
            </span>
          ))}

          {extraSkills > 0 && (
            <span className="py-1 text-[10px] text-slate-500">+{extraSkills}</span>
          )}
        </div>

        <div className="mt-auto">
          <Button className="w-full border border-white/5 bg-white/10 text-white hover:bg-white/20">
            عرض الملف
          </Button>
        </div>
      </div>
    </div>
  );
}
