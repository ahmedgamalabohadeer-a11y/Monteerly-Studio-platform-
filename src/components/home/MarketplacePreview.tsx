"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BadgeCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MarketplaceTalent {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  rate: string;
  image: string;
  rating: number;
  reviews: number;
  availability: "available" | "busy" | "offline";
  verified: boolean;
  specialty: string;
  specialtyAr: string;
  accentColor: string;
}

// ─── Static Talent Data — صور monteerly موجودة فعلاً ─────────────────────────
const TALENTS: MarketplaceTalent[] = [
  {
    id: "talent-1",
    name: "Ahmed Samir",
    nameAr: "أحمد سمير",
    role: "Senior Video Editor",
    roleAr: "مونتير فيديو أول",
    rate: "$35/hr",
    image: "/images/monteerly/monteerly12-editor-redshirt-timeline.png",
    rating: 5.0,
    reviews: 18,
    availability: "available",
    verified: true,
    specialty: "Narrative & Documentary",
    specialtyAr: "سردي ووثائقي",
    accentColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "talent-2",
    name: "Sara Nabil",
    nameAr: "سارة نبيل",
    role: "Motion Designer",
    roleAr: "مصممة موشن",
    rate: "$42/hr",
    image: "/images/monteerly/monteerly13-analytics-dashboard-woman-ai.png",
    rating: 4.9,
    reviews: 24,
    availability: "busy",
    verified: true,
    specialty: "Brand & UI Animation",
    specialtyAr: "أنيميشن براند وواجهات",
    accentColor: "from-pink-500 to-rose-600",
  },
  {
    id: "talent-3",
    name: "Khaled Tarek",
    nameAr: "خالد طارق",
    role: "Colorist",
    roleAr: "ملوِّن",
    rate: "$50/hr",
    image: "/images/monteerly/monteerly14-editor-professional-dual-screen.png",
    rating: 4.8,
    reviews: 12,
    availability: "available",
    verified: true,
    specialty: "Cinematic Color Grading",
    specialtyAr: "تدرج الألوان السينمائي",
    accentColor: "from-amber-500 to-orange-600",
  },
  {
    id: "talent-4",
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    role: "Photographer",
    roleAr: "مصورة",
    rate: "$38/hr",
    image: "/images/monteerly/monteerly17-testimonial-woman-gray-suit-office.png",
    rating: 4.9,
    reviews: 31,
    availability: "available",
    verified: true,
    specialty: "Heritage & Portrait",
    specialtyAr: "تراث وبورتريه",
    accentColor: "from-emerald-500 to-teal-600",
  },
];

// ─── Availability Badge ───────────────────────────────────────────────────────
function AvailabilityBadge({
  status,
  isAr,
}: {
  status: MarketplaceTalent["availability"];
  isAr: boolean;
}) {
  const map = {
    available: {
      color: "bg-emerald-500",
      label: isAr ? "متاح" : "Available",
      text: "text-emerald-400",
    },
    busy: {
      color: "bg-amber-500",
      label: isAr ? "مشغول" : "Busy",
      text: "text-amber-400",
    },
    offline: {
      color: "bg-slate-500",
      label: isAr ? "غير متاح" : "Offline",
      text: "text-slate-400",
    },
  };
  const s = map[status];
  return (
    <span className={`flex items-center gap-1 text-xs font-bold ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.color} animate-pulse`} />
      {s.label}
    </span>
  );
}

// ─── Talent Card ─────────────────────────────────────────────────────────────
function TalentCard({
  talent,
  isAr,
  locale,
}: {
  talent: MarketplaceTalent;
  isAr: boolean;
  locale: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={talent.image}
        alt={isAr ? talent.nameAr : talent.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className={`object-cover transition-transform duration-700 ${
          hovered ? "scale-110" : "scale-100"
        }`}
        loading="lazy"
      />

      {/* Gradient Overlay — always visible at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
        {talent.verified && (
          <span className="flex items-center gap-1 bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-full">
            <BadgeCheck size={10} />
            {isAr ? "موثّق" : "Verified"}
          </span>
        )}
        <span
          className={`ml-auto text-xs font-black text-white bg-gradient-to-r ${talent.accentColor} px-2.5 py-1 rounded-full shadow-lg`}
        >
          {talent.rate}
        </span>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Availability */}
        <div className="mb-2">
          <AvailabilityBadge status={talent.availability} isAr={isAr} />
        </div>

        {/* Name & Role */}
        <h3 className="font-black text-white text-base md:text-lg leading-tight">
          {isAr ? talent.nameAr : talent.name}
        </h3>
        <p className="text-xs text-indigo-300 font-bold mt-0.5">
          {isAr ? talent.roleAr : talent.role}
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">
          {isAr ? talent.specialtyAr : talent.specialty}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <Star size={12} className="text-amber-400" fill="currentColor" />
          <span className="text-white text-xs font-black">{talent.rating}</span>
          <span className="text-slate-400 text-[10px]">
            ({talent.reviews} {isAr ? "تقييم" : "reviews"})
          </span>
        </div>

        {/* CTA — appears on hover */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            hovered ? "max-h-12 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            href={`/${locale}/marketplace`}
            className={`block w-full text-center py-2 rounded-xl bg-gradient-to-r ${talent.accentColor} text-white text-xs font-black hover:opacity-90 transition-opacity`}
          >
            {isAr ? "احجز الآن" : "Book Now"}
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MarketplacePreview({
  locale = "en",
}: {
  locale?: "ar" | "en";
}) {
  const isAr = locale === "ar";

  return (
    <section
      className="py-24 md:py-36 px-4 bg-slate-50 dark:bg-[#030305]"
      aria-labelledby="marketplace-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border text-indigo-600 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <Sparkles size={12} />
              {isAr ? "المواهب المميزة" : "Featured Talents"}
            </span>
            <h2
              id="marketplace-heading"
              className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-3"
            >
              {isAr
                ? "أفضل المبدعين العرب"
                : "Top Arab Creative Talents"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium max-w-xl">
              {isAr
                ? "موهبة معتمدة، ضمان آمن، نتائج مضمونة."
                : "Verified talent, secure escrow, guaranteed results."}
            </p>
          </div>

          {/* View All Link */}
          <Link
            href={`/${locale}/marketplace`}
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-white font-bold text-sm hover:bg-indigo-50 dark:hover:bg-white/10 hover:border-indigo-300 dark:hover:border-white/20 transition-all duration-200 flex-shrink-0"
          >
            {isAr ? "عرض الكل" : "View All"}
            {isAr ? (
              <ArrowLeft size={16} />
            ) : (
              <ArrowRight size={16} />
            )}
          </Link>
        </div>

        {/* ── Talent Grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TALENTS.map((talent) => (
            <TalentCard
              key={talent.id}
              talent={talent}
              isAr={isAr}
              locale={locale}
            />
          ))}
        </div>

        {/* ── Bottom Trust Strip ──────────────────────────────────────────────── */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(isAr
            ? [
                { icon: <BadgeCheck size={18} />, text: "كل المواهب موثّقة يدوياً" },
                { icon: <Clock size={18} />, text: "استجابة خلال 24 ساعة مضمونة" },
                { icon: <Star size={18} fill="currentColor" />, text: "متوسط تقييم 4.9 من 5" },
              ]
            : [
                { icon: <BadgeCheck size={18} />, text: "All talents manually verified" },
                { icon: <Clock size={18} />, text: "24-hour response guaranteed" },
                { icon: <Star size={18} fill="currentColor" />, text: "Average rating 4.9 out of 5" },
              ]
          ).map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0A0A0F]"
            >
              <span className="text-indigo-500 flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketplacePreview;
