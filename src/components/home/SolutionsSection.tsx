"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Zap, Video, Users, Globe, Layers } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SolutionFeature {
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
}

interface SolutionsData {
  title: string;
  subtitle: string;
  mainImage: string;
  mainImageAlt: string;
  features: SolutionFeature[];
}

// ─── Static Data — صور موجودة فعلاً في public/ ───────────────────────────────
const DATA_EN: SolutionsData = {
  title: "One Platform. Every Solution.",
  subtitle:
    "Monteerly OS unifies your creative workflow — from talent discovery to secure delivery.",
  mainImage: "/images/monteerly/monteerly06-marketing-showcase-full.png",
  mainImageAlt: "Monteerly OS Integrated Ecosystem",
  features: [
    {
      id: "escrow",
      title: "Military-Grade Escrow",
      desc: "AES-256 encrypted smart contracts hold funds securely until every milestone is approved. Zero disputes, full transparency.",
      image: "/images/monteerly/monteerly05-security-digital-lock-cyber.png",
      icon: <ShieldCheck className="w-6 h-6" />,
      accentColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "ai",
      title: "AI Directorial Co-Pilot",
      desc: "Analyzes your project scope, suggests pricing, negotiates terms, and maximizes your ROI automatically.",
      image: "/images/monteerly/monteerly09-ai-performance-advisor-hologram.png",
      icon: <Zap className="w-6 h-6" />,
      accentColor: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      id: "library",
      title: "Sovereign Asset Library",
      desc: "Thousands of exclusive Arab-market stock shots, audio, and templates — all licensed and instantly accessible.",
      image: "/images/monteerly/monteerly23-photographer-library-heritage-cinematic.png",
      icon: <Video className="w-6 h-6" />,
      accentColor: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      id: "academy",
      title: "Academy & Community",
      desc: "Specialized courses, live labs, and a thriving community of Arab creators — learn, grow, and collaborate.",
      image: "/images/monteerly/monteerly16-editor-arab-thobe-collaboration.png",
      icon: <Users className="w-6 h-6" />,
      accentColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      id: "publishing",
      title: "Multi-Platform Publishing",
      desc: "Distribute content across all major platforms in one click. Analytics, scheduling, and revenue tracking built in.",
      image: "/images/monteerly/monteerly10-multiplatform-publishing-hero.png",
      icon: <Globe className="w-6 h-6" />,
      accentColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "workspace",
      title: "Cloud Workspace Studio",
      desc: "GPU-powered cloud editor with floating windows, real-time collaboration, and sync across all your devices.",
      image: "/images/monteerly/monteerly15-creator-workspace-laptop-modern.png",
      icon: <Layers className="w-6 h-6" />,
      accentColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ],
};

const DATA_AR: SolutionsData = {
  title: "منصة واحدة. كل الحلول.",
  subtitle:
    "منتيرلي OS يوحّد سير عملك الإبداعي — من اكتشاف المواهب إلى التسليم الآمن.",
  mainImage: "/images/monteerly/monteerly06-marketing-showcase-full.png",
  mainImageAlt: "النظام البيئي المتكامل لمنتيرلي",
  features: [
    {
      id: "escrow",
      title: "ضمان بمستوى عسكري",
      desc: "عقود ذكية مشفرة بـ AES-256 تحتفظ بالأموال بشكل آمن حتى اعتماد كل معلم. صفر نزاعات، شفافية كاملة.",
      image: "/images/monteerly/monteerly05-security-digital-lock-cyber.png",
      icon: <ShieldCheck className="w-6 h-6" />,
      accentColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      id: "ai",
      title: "مساعد المخرج الذكي",
      desc: "يحلل نطاق مشروعك، يقترح الأسعار، يتفاوض على الشروط، ويزيد عائدك تلقائياً.",
      image: "/images/monteerly/monteerly09-ai-performance-advisor-hologram.png",
      icon: <Zap className="w-6 h-6" />,
      accentColor: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      id: "library",
      title: "مكتبة الأصول السيادية",
      desc: "آلاف اللقطات الحصرية للسوق العربي والصوتيات والقوالب — مرخّصة ومتاحة فوراً.",
      image: "/images/monteerly/monteerly23-photographer-library-heritage-cinematic.png",
      icon: <Video className="w-6 h-6" />,
      accentColor: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      id: "academy",
      title: "الأكاديمية والمجتمع",
      desc: "دورات متخصصة ومختبرات مباشرة ومجتمع نابض من المبدعين العرب — تعلّم ونمِ وتعاون.",
      image: "/images/monteerly/monteerly16-editor-arab-thobe-collaboration.png",
      icon: <Users className="w-6 h-6" />,
      accentColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      id: "publishing",
      title: "النشر متعدد المنصات",
      desc: "وزّع المحتوى عبر جميع المنصات الكبرى بنقرة واحدة. تحليلات وجدولة وتتبع إيرادات مدمجة.",
      image: "/images/monteerly/monteerly10-multiplatform-publishing-hero.png",
      icon: <Globe className="w-6 h-6" />,
      accentColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "workspace",
      title: "استوديو العمل السحابي",
      desc: "محرر سحابي مدعوم بـ GPU مع نوافذ عائمة وتعاون في الوقت الفعلي ومزامنة عبر جميع أجهزتك.",
      image: "/images/monteerly/monteerly15-creator-workspace-laptop-modern.png",
      icon: <Layers className="w-6 h-6" />,
      accentColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export function SolutionsSection({ locale = "en" }: { locale?: "ar" | "en" }) {
  const isAr = locale === "ar";
  const data = isAr ? DATA_AR : DATA_EN;

  return (
    <section
      className="py-24 md:py-36 px-4 bg-white dark:bg-[#05050A]"
      aria-labelledby="solutions-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border text-indigo-600 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            {isAr ? "الحلول" : "Solutions"}
          </span>
          <h2
            id="solutions-heading"
            className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white"
          >
            {data.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* ── Main Layout: Image + Features ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Ecosystem Visual — sticky on large screens */}
          <div className="relative lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl aspect-[4/3] group bg-slate-900">
              <Image
                src={data.mainImage}
                alt={data.mainImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-black/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-white text-xs font-bold">
                  {isAr
                    ? "النظام البيئي المتكامل — نشط ومباشر"
                    : "Integrated Ecosystem — Live & Active"}
                </span>
              </div>
            </div>

            {/* Stats below image */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {(isAr
                ? [
                    { val: "٢٤/٧", lbl: "مراقبة مستمرة" },
                    { val: "+٥٠٠", lbl: "أداة مدمجة" },
                    { val: "٩٩.٩٪", lbl: "وقت تشغيل" },
                  ]
                : [
                    { val: "24/7", lbl: "Live Monitoring" },
                    { val: "500+", lbl: "Built-in Tools" },
                    { val: "99.9%", lbl: "Uptime SLA" },
                  ]
              ).map((stat) => (
                <div
                  key={stat.lbl}
                  className="text-center p-3 rounded-2xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#0A0A0F]"
                >
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {stat.val}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 font-medium mt-0.5">
                    {stat.lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-5">
            {data.features.map((feature) => (
              <div
                key={feature.id}
                className="group flex gap-5 p-5 md:p-6 rounded-2xl bg-white dark:bg-[#0A0A0F] border border-slate-200 dark:border-white/8 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Feature Image Thumbnail */}
                <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="96px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.accentColor} flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white truncate">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA Strip ───────────────────────────────────────────────── */}
        <div className="mt-16 md:mt-20 p-6 md:p-10 rounded-3xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
              {isAr
                ? "هل أنت مستعد لتوحيد سير عملك؟"
                : "Ready to unify your workflow?"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {isAr
                ? "ابدأ مجاناً — لا بطاقة ائتمانية مطلوبة."
                : "Start free — no credit card required."}
            </p>
          </div>
          <a
            href={`/${locale}/auth`}
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-8 py-3.5 rounded-xl font-black text-sm transition-all duration-200 shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:-translate-y-0.5 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            {isAr ? "ابدأ الآن مجاناً" : "Get Started Free"}
          </a>
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
