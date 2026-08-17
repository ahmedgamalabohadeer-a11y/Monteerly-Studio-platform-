"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Trophy, Star, TrendingUp, Award, Target } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LeaderboardEntry {
  rank: number;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  xp: number;
  badge: string;
  color: string;
}

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  desc: string;
  descAr: string;
  xp: number;
  color: string;
  bg: string;
}

// ─── Static Data ──────────────────────────────────────────────────────────────
const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Sara Al-Najjar",
    nameAr: "سارة النجار",
    role: "Video Editor",
    roleAr: "مونتيرة فيديو",
    xp: 12450,
    badge: "🥇",
    color: "from-amber-500 to-yellow-400",
  },
  {
    rank: 2,
    name: "Mohamed Khalil",
    nameAr: "محمد خليل",
    role: "Colorist",
    roleAr: "ملوِّن",
    xp: 10200,
    badge: "🥈",
    color: "from-slate-400 to-slate-300",
  },
  {
    rank: 3,
    name: "Khaled Yousef",
    nameAr: "خالد يوسف",
    role: "Sound Designer",
    roleAr: "مصمم صوت",
    xp: 9800,
    badge: "🥉",
    color: "from-amber-700 to-amber-600",
  },
  {
    rank: 4,
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    role: "VFX Artist",
    roleAr: "فنانة مؤثرات",
    xp: 8500,
    badge: "⭐",
    color: "from-indigo-500 to-purple-500",
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-project",
    icon: <Target className="w-5 h-5" />,
    title: "First Project Delivered",
    titleAr: "أول مشروع مسلَّم",
    desc: "Complete your first secure delivery",
    descAr: "أكمل أول تسليم آمن",
    xp: 500,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "five-star",
    icon: <Star className="w-5 h-5" />,
    title: "5-Star Streak",
    titleAr: "سلسلة 5 نجوم",
    desc: "Earn 5-star ratings 3 times in a row",
    descAr: "احصل على 5 نجوم 3 مرات متتالية",
    xp: 1200,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "power-creator",
    icon: <Zap className="w-5 h-5" />,
    title: "Power Creator",
    titleAr: "مبدع قوة",
    desc: "Reach 10,000 XP milestone",
    descAr: "بلّغ نقطة 10,000 XP",
    xp: 2000,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: "trending",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Trending Creator",
    titleAr: "مبدع رائج",
    desc: "Appear in the weekly top 10",
    descAr: "ظهر في أفضل 10 أسبوعياً",
    xp: 800,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

// ─── XP Bar Component ─────────────────────────────────────────────────────────
function XPBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GamificationSection({ locale = "en" }: { locale?: "ar" | "en" }) {
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState<"leaderboard" | "achievements">(
    "leaderboard"
  );

  const maxXP = LEADERBOARD[0].xp;

  return (
    <section
      className="py-24 md:py-36 px-4 relative overflow-hidden bg-[#030912] dark:bg-[#030912]"
      aria-labelledby="gamification-heading"
    >
      {/* ── Background Effects ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(79,70,229,0.18),transparent)]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-4 px-3 py-1 rounded-full border text-indigo-400 border-indigo-500/20 bg-indigo-500/10">
            <Trophy size={12} />
            {isAr ? "نظام التحفيز" : "Gamification System"}
          </span>
          <h2
            id="gamification-heading"
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            {isAr ? "اكسب. ارتقِ. احكم." : "Earn. Rise. Dominate."}
          </h2>
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl mx-auto">
            {isAr
              ? "كل مشروع تنجزه يرفع مستواك. اكسب XP، افتح الشارات، وتصدّر المتصدرين."
              : "Every project you complete levels you up. Earn XP, unlock badges, and dominate the leaderboard."}
          </p>
        </div>

        {/* ── Main 2-Column Layout ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* LEFT — Visual / Image Card */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-square md:aspect-[4/3] bg-slate-900 group">
              <Image
                src="/images/monteerly/monteerly_07_tech_innovation_portrait.png"
                alt={
                  isAr
                    ? "نظام المكافآت والتحفيز"
                    : "Gamification & Rewards System"
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030912]/90 via-[#030912]/20 to-transparent" />

              {/* Floating XP Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-black text-sm">
                      {isAr ? "مستواك الحالي" : "Your Current Level"}
                    </div>
                    <div className="text-indigo-400 text-xs font-bold mt-0.5">
                      {isAr ? "مبدع متقدم · المستوى 7" : "Advanced Creator · Level 7"}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>7,200 XP</span>
                  <span>10,000 XP</span>
                </div>
                <XPBar value={7200} max={10000} color="from-indigo-500 to-purple-500" />
                <div className="text-xs text-slate-500 mt-1.5 text-right">
                  {isAr ? "2,800 XP للمستوى التالي" : "2,800 XP to next level"}
                </div>
              </div>
            </div>

            {/* Floating Achievement Pills */}
            <div className="absolute -top-4 -right-4 bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5 animate-bounce">
              <Trophy size={12} />
              {isAr ? "الأول هذا الأسبوع!" : "Top This Week!"}
            </div>
          </div>

          {/* RIGHT — Tabs: Leaderboard / Achievements */}
          <div className="flex flex-col gap-5">
            {/* Tab Switcher */}
            <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/8 w-fit">
              {(
                [
                  { key: "leaderboard", labelEn: "Leaderboard", labelAr: "المتصدرون" },
                  { key: "achievements", labelEn: "Achievements", labelAr: "الإنجازات" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-black transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isAr ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="space-y-3">
                {LEADERBOARD.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/5 hover:bg-white/8 hover:border-white/15 transition-all duration-200 group"
                  >
                    {/* Rank Badge */}
                    <div className="text-xl flex-shrink-0 w-8 text-center">
                      {entry.badge}
                    </div>

                    {/* Avatar from gradient */}
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${entry.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-md`}
                    >
                      {(isAr ? entry.nameAr : entry.name).charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-black text-sm truncate">
                        {isAr ? entry.nameAr : entry.name}
                      </div>
                      <div className="text-slate-500 text-xs truncate">
                        {isAr ? entry.roleAr : entry.role}
                      </div>
                      <XPBar
                        value={entry.xp}
                        max={maxXP}
                        color={entry.color}
                      />
                    </div>

{/* XP */}
<div className="flex-shrink-0 text-right">
                      <div className={`text-sm font-black bg-gradient-to-r ${entry.color} bg-clip-text text-transparent`}>
                        {entry.xp.toLocaleString()}
                      </div>
                      <div className="text-slate-500 text-[10px] font-bold">XP</div>
                    </div>
                  </div>
                ))}

                {/* View Full Leaderboard */}
                <Link
                  href={`/${locale}/dashboard`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/15 text-slate-400 hover:text-white text-sm font-bold transition-all duration-200 mt-2"
                >
                  <Trophy size={14} />
                  {isAr ? "عرض المتصدرين كاملاً" : "View Full Leaderboard"}
                </Link>
              </div>
            )}

            {/* Achievements */}
            {activeTab === "achievements" && (
              <div className="space-y-3">
                {ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/5 hover:bg-white/8 hover:border-white/15 transition-all duration-200 group"
                  >
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl ${achievement.bg} flex items-center justify-center ${achievement.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                    >
                      {achievement.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-black text-sm truncate">
                        {isAr ? achievement.titleAr : achievement.title}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5 truncate">
                        {isAr ? achievement.descAr : achievement.desc}
                      </div>
                    </div>

                    {/* XP Reward */}
                    <div className="flex-shrink-0 text-right">
                      <div className={`text-sm font-black ${achievement.color}`}>
                        +{achievement.xp.toLocaleString()}
                      </div>
                      <div className="text-slate-500 text-[10px] font-bold">XP</div>
                    </div>
                  </div>
                ))}

                {/* Unlock More */}
                <Link
                  href={`/${locale}/dashboard`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/8 bg-white/5 hover:bg-white/10 hover:border-white/15 text-slate-400 hover:text-white text-sm font-bold transition-all duration-200 mt-2"
                >
                  <Award size={14} />
                  {isAr ? "اكتشف كل الإنجازات" : "Discover All Achievements"}
                </Link>
              </div>
            )}

            {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
            <div className="mt-2 p-5 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 to-purple-950/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-sm mb-1">
                    {isAr
                      ? "ابدأ رحلتك الآن واكسب 500 XP مجاناً"
                      : "Start your journey now and earn 500 XP free"}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3">
                    {isAr
                      ? "أكمل ملفك الشخصي واحصل على أول شارة خلال دقائق."
                      : "Complete your profile and earn your first badge in minutes."}
                  </p>
                  <Link
                    href={`/${locale}/auth`}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-xs transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                  >
                    <Zap size={14} />
                    {isAr ? "ابدأ واكسب XP" : "Start Earning XP"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Stats Row ─────────────────────────────────────────────────── */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {(isAr
            ? [
                { val: "+١٢,٠٠٠", lbl: "مبدع نشط", icon: <Star size={16} /> },
                { val: "٨٥+", lbl: "شارة متاحة", icon: <Award size={16} /> },
                { val: "٥٠٠ XP", lbl: "مكافأة التسجيل", icon: <Zap size={16} /> },
                { val: "#١", lbl: "منصة تحفيز عربية", icon: <Trophy size={16} /> },
              ]
            : [
                { val: "12,000+", lbl: "Active Creators", icon: <Star size={16} /> },
                { val: "85+", lbl: "Available Badges", icon: <Award size={16} /> },
                { val: "500 XP", lbl: "Signup Bonus", icon: <Zap size={16} /> },
                { val: "#1", lbl: "Arab Gamified Platform", icon: <Trophy size={16} /> },
              ]
          ).map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-white/8 bg-white/5 hover:bg-white/8 hover:border-indigo-500/20 transition-all duration-200"
            >
              <span className="text-indigo-400 mb-2">{stat.icon}</span>
              <div className="text-white font-black text-xl md:text-2xl mb-1">
                {stat.val}
              </div>
              <div className="text-slate-500 text-xs font-bold">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GamificationSection;
