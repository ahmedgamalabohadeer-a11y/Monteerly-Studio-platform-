"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Users,
  ArrowLeft,
  ArrowRight,
  MonitorPlay,
  Camera,
  Briefcase,
  Moon,
  Sun,
  Lock,
  CheckCircle2,
  Video,
  Star,
} from "lucide-react";
import arDict from "@/messages/ar.json";
import enDict from "@/messages/en.json";

// ─── Types ────────────────────────────────────────────────────────────────────
type Locale = "ar" | "en";
type Dict = typeof enDict;

// ─── Persona Image Map (مسارات مطابقة للقرص الفعلي) ────────────────────────────
const PERSONA_IMAGES: Record<string, string> = {
  editor: "/images/monteerly/monteerly_12_editor_red_shirt_timeline.png",
  photographer: "/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png",
  creator: "/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png",
  agency: "/images/monteerly/monteerly_11_global_collaboration_grid_4up.png",
};

const PERSONA_ICONS: Record<string, React.ReactNode> = {
  editor: <MonitorPlay className="w-4 h-4 md:w-5 md:h-5" />,
  photographer: <Camera className="w-4 h-4 md:w-5 md:h-5" />,
  creator: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
  agency: <Briefcase className="w-4 h-4 md:w-5 md:h-5" />,
};

// ─── Testimonials static data ──────────────────────────────────────────────────
const TESTIMONIALS_EN = [
  {
    text: "The MCOS escrow system completely changed how I work. I now collaborate with top agencies securely.",
    role: "Freelancer",
    name: "Sara Al-Najjar",
  },
  {
    text: "We reduced production time by 40% thanks to the synced workspace and cloud assets.",
    role: "Marketing Manager",
    name: "Mohamed Khalil",
  },
  {
    text: "This isn't just a freelance platform — it's a central OS that organized our creative chaos.",
    role: "CEO",
    name: "Layla Mansour",
  },
  {
    text: "The platform gives our teams clear speed and better governance across every project.",
    role: "Production Director",
    name: "Khaled Yousef",
  },
];

const TESTIMONIALS_AR = [
  {
    text: "نظام الضمان في MCOS غيّر طريقة عملي كلياً. أتعاون الآن مع كبرى الوكالات بشكل آمن.",
    role: "فريلانسر",
    name: "سارة النجار",
  },
  {
    text: "قللنا وقت الإنتاج بنسبة 40% بفضل مساحة العمل المتزامنة والأصول السحابية.",
    role: "مدير تسويق",
    name: "محمد خليل",
  },
  {
    text: "هذه ليست مجرد منصة فريلانس، بل نظام تشغيل مركزي نظّم الفوضى الإبداعية لدينا.",
    role: "الرئيس التنفيذي",
    name: "ليلى منصور",
  },
  {
    text: "تمنح المنصة فرقنا سرعة واضحة وحوكمة أفضل عبر كل مشروع.",
    role: "مدير الإنتاج",
    name: "خالد يوسف",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function UltimateLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale as Locale;
  const isAr = locale === "ar";
  const t = (isAr ? arDict : enDict) as Dict;

  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePersona, setActivePersona] = useState("editor");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLocale: Locale = isAr ? "en" : "ar";
    const newPath = pathname.replace(locale, newLocale);
    router.push(newPath);
  };

  // Persona list derived from t
  const personaKeys = ["editor", "photographer", "creator", "agency"] as const;
  type PersonaKey = typeof personaKeys[number];

  const personaLabel: Record<PersonaKey, string> = {
    editor: t.personas?.editor ?? "Video Editor",
    photographer: t.personas?.photographer ?? "Photographer",
    creator: t.personas?.creator ?? "Content Creator",
    agency: t.personas?.agency ?? "Production Agency",
  };
  const personaDesc: Record<PersonaKey, string> = {
    editor: t.personas?.editordesc ?? "",
    photographer: t.personas?.photographerdesc ?? "",
    creator: t.personas?.creatordesc ?? "",
    agency: t.personas?.agencydesc ?? "",
  };

  const active = activePersona as PersonaKey;

  const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_EN;

  // ── Pricing plans ────────────────────────────────────────────────────────────
  const rookieFeatures = isAr
    ? ["5 جيجا تخزين", "مساحة عمل أساسية", "ضمان آمن", "دعم المجتمع"]
    : ["5GB Storage", "Basic Workspace", "Secure Escrow", "Community Support"];

  const proFeatures = isAr
    ? ["تخزين R2 غير محدود", "رسوم مخفضة + فواتير ضريبية", "وكيل ذكاء اصطناعي", "إدارة الفريق", "تحليلات متقدمة"]
    : ["Unlimited R2 Storage", "Reduced Fees + Tax Invoices", "AI Co-Pilot", "Team Management", "Advanced Analytics"];

  // ── Dark / Light helpers ──────────────────────────────────────────────────────
  const bg = isDarkMode ? "bg-[#05050A] text-slate-50" : "bg-slate-50 text-slate-900";
  const cardBg = isDarkMode ? "bg-[#0A0A0F] border-white/10" : "bg-white border-slate-200 shadow-sm";
  const mutedText = isDarkMode ? "text-slate-400" : "text-slate-600";
  const navBg = scrolled
    ? isDarkMode
      ? "bg-[#05050A]/95 border-white/10 shadow-2xl shadow-black/40"
      : "bg-white/95 border-slate-200 shadow-lg"
    : isDarkMode
      ? "bg-[#05050A]/60 border-white/5"
      : "bg-white/70 border-slate-200";

  return (
    <div
      className={`min-h-screen transition-colors duration-700 font-sans ${bg} selection:bg-indigo-500/30 overflow-x-hidden`}
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── Top Ticker ─────────────────────────────────────────────────────────── */}
      <div className="bg-indigo-950/40 border-b border-indigo-500/20 text-center py-1.5 text-[10px] md:text-xs font-bold text-indigo-300 tracking-widest uppercase select-none">
        {isAr
          ? "🔒 منتيرلي OS V5.0 · نشط · مؤمَّن من طرف إلى طرف · AES-256"
          : "🔒 Monteerly OS V5.0 · ACTIVE · SECURED END-TO-END · AES-256"}
      </div>

      {/* ── Navbar ─────────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-7 w-full z-50 transition-all duration-500 backdrop-blur-2xl border-b ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4 md:gap-8">
            <Link href={`/${locale}`} className="flex items-center gap-2 md:gap-3 group">
              <Image
                src="/images/monteerly/monteerly_01_favicon_app_icon.png"
                alt="Monteerly OS"
                width={40}
                height={40}
                className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg rounded-md group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-black text-lg md:text-xl tracking-tight hidden sm:block">
                Monteerly{" "}
                <span className="text-indigo-500">OS</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6 font-bold text-sm">
              {[
                { href: "#ecosystem", label: isAr ? "النظام البيئي" : "Ecosystem" },
                { href: "#library", label: isAr ? "المكتبة" : "Library" },
                { href: "#pricing", label: isAr ? "الأسعار" : "Pricing" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-indigo-500 ${mutedText}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleLanguage}
              className={`font-bold text-xs md:text-sm px-2.5 py-1.5 rounded-lg transition-all duration-200 border ${
                isDarkMode
                  ? "border-white/10 hover:bg-slate-800 text-slate-300 hover:border-white/20"
                  : "border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm"
              }`}
            >
              {isAr ? "English" : "عربي"}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-full transition-all duration-200 border ${
                isDarkMode
                  ? "border-white/10 bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300"
                  : "border-slate-200 bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm"
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href={`/${locale}/auth`}
              className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-3 py-2 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(79,70,229,0.35)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{t.nav?.login ?? (isAr ? "الدخول الآمن" : "Secure Login")}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/monteerly/monteerly_04_hero_header_marketing_banner.png"
            alt="Monteerly OS Hero"
            fill
            priority
            sizes="100vw"
            className={`object-cover scale-[1.04] mix-blend-overlay transition-opacity duration-1000 ${
              isDarkMode ? "opacity-35" : "opacity-15"
            }`}
          />
          {/* gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${
              isDarkMode
                ? "from-[#05050A]/50 via-[#05050A]/80 to-[#05050A]"
                : "from-slate-50/60 via-slate-50/90 to-slate-50"
            }`}
          />
          {/* radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(79,70,229,0.15),transparent)]" />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-black mb-6 md:mb-8 border backdrop-blur-md shadow-lg ${
                isDarkMode
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-emerald-100 text-emerald-700 border-emerald-300"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
              {t.hero?.badge ?? (isAr ? "🇸🇦 السيادة الرقمية V5.0 مُطلَقة" : "Sovereign V5.0 Launched")}
            </div>

            {/* H1 */}
            <h1
              className={`text-4xl sm:text-5xl md:text-[5.5rem] font-black mb-6 md:mb-8 leading-tight md:leading-[1.1] tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t.hero?.title1 ?? (isAr ? "النظام المركزي" : "The Central")}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 drop-shadow-lg">
                {t.hero?.titlehighlight ?? (isAr ? "لنظام التشغيل" : "Operating System")}
              </span>
              <br className="hidden sm:block" />
              {t.hero?.title2 ?? (isAr ? "للإنتاج الحديث" : "for Modern Production")}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium ${mutedText}`}
            >
              {t.hero?.subtitle ??
                (isAr
                  ? "أدر الفوضى، احمِ أصولك، وضاعف إيراداتك. منصة موحدة تجمع Cloud Studio والسوق والعقود الذكية."
                  : "Manage chaos, secure assets, and scale revenue. One unified platform combining Cloud Studio, Marketplace, and Smart Contracts.")}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 md:mb-14">
              {[
                {
                  val: t.stats?.vol ?? "500K",
                  lbl: t.stats?.vollbl ?? (isAr ? "سيولة في الضمان" : "Liquidity in Escrow"),
                },
                {
                  val: t.stats?.hrs ?? "10,000",
                  lbl: t.stats?.hrslbl ?? (isAr ? "ساعة رندر سحابي" : "Cloud Render Hours"),
                },
                {
                  val: t.stats?.upt ?? "AES-256",
                  lbl: t.stats?.uptlbl ?? (isAr ? "تشفير عسكري" : "Military Encryption"),
                },
                {
                  val: t.stats?.fee ?? "0",
                  lbl: t.stats?.feelbl ?? (isAr ? "رسوم خفية" : "Hidden Fees"),
                },
              ].map((s) => (
                <div key={s.lbl} className="text-center">
                  <div
                    className={`text-2xl md:text-3xl font-black mb-1 ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {s.val}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest ${mutedText}`}>
                    {s.lbl}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 px-4">
              <Link
                href={`/${locale}/auth`}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-8 py-4 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:-translate-y-1"
              >
                <ShieldCheck className="w-5 h-5" />
                {t.hero?.deploybtn ?? (isAr ? "انشر الاستوديو مجاناً" : "Deploy Studio Free")}
                {!isAr && <ArrowRight className="w-4 h-4" />}
                {isAr && <ArrowLeft className="w-4 h-4" />}
              </Link>
              <Link
                href={`/${locale}/marketplace`}
                className={`w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 border hover:-translate-y-1 ${
                  isDarkMode
                    ? "border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t.hero?.explorebtn ?? (isAr ? "استكشاف النظام" : "Explore System")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────────────────────────────────────── */}
      <section
        className={`py-6 md:py-8 border-y ${
          isDarkMode ? "bg-[#0A0A0F] border-white/5" : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <p className={`text-center text-xs font-bold mb-5 uppercase tracking-widest ${mutedText}`}>
            {isAr ? "مؤمَّن · موثوق من الشركاء العالميين" : "Secured · Trusted by Global Partners"}
          </p>
          <div
            className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500 ${
              isDarkMode ? "opacity-40 hover:opacity-70" : "opacity-50 hover:opacity-80"
            }`}
          >
            {["PAYMOB", "VISA", "MasterCard", "PayPal", "MADA", "STC Pay"].map((brand) => (
              <span
                key={brand}
                className={`text-lg md:text-xl font-black tracking-widest transition-colors duration-300 ${
                  isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personas Section ────────────────────────────────────────────────────── */}
      <section
        id="ecosystem"
        className={`py-20 md:py-36 px-4 overflow-hidden ${
          isDarkMode ? "bg-[#05050A]" : "bg-slate-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <span
              className={`inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border ${
                isDarkMode
                  ? "text-indigo-400 border-indigo-500/20 bg-indigo-500/10"
                  : "text-indigo-600 border-indigo-200 bg-indigo-50"
              }`}
            >
              {isAr ? "النظام البيئي" : "Ecosystem"}
            </span>
            <h2
              className={`text-3xl md:text-5xl font-black mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t.personas?.title ?? (isAr ? "مبني خصيصاً لطموحك" : "Built Specifically For Your Ambition")}
            </h2>
          </div>

          {/* Persona Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 md:gap-3 mb-10 md:mb-16 justify-start md:justify-center w-full px-2 pb-2">
            {personaKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActivePersona(key)}
                className={`flex-shrink-0 snap-center flex items-center gap-2 px-5 py-3 md:px-7 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 border ${
                  activePersona === key
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_8px_30px_rgba(79,70,229,0.35)] -translate-y-1"
                    : isDarkMode
                      ? "bg-[#0A0A0F] border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                      : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm hover:shadow-md"
                }`}
              >
                {PERSONA_ICONS[key]}
                {personaLabel[key]}
              </button>
            ))}
          </div>

          {/* Persona Card */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={`relative rounded-3xl md:rounded-[3rem] overflow-hidden border p-6 md:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
              isDarkMode
                ? "bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border-white/10 shadow-2xl"
                : "bg-white border-slate-200 shadow-xl"
            }`}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/[0.03] blur-[100px] pointer-events-none" />

            {/* Text */}
            <div className={`flex-1 z-10 text-center md:${isAr ? "text-right" : "text-left"}`}>
              <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
                {personaLabel[active]}
              </h3>
              <p className={`text-base md:text-xl leading-relaxed font-medium ${mutedText}`}>
                {personaDesc[active]}
              </p>
              <Link
                href={`/${locale}/auth`}
                className="inline-flex items-center gap-2 mt-8 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                <Lock className="w-4 h-4" />
                {isAr ? "ابدأ مجاناً" : "Get Started Free"}
              </Link>
            </div>

            {/* Image */}
            <div className="flex-1 w-full relative z-10 group mt-4 md:mt-0">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-white/10">
                <Image
                  src={PERSONA_IMAGES[active]}
                  alt={personaLabel[active]}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Bento Grid ──────────────────────────────────────────────────────────── */}
      <section
        id="library"
        className={`py-20 md:py-36 px-4 relative ${
          isDarkMode ? "bg-[#030305]" : "bg-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 md:mb-24">
            <span
              className={`inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border ${
                isDarkMode
                  ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                  : "text-emerald-600 border-emerald-200 bg-emerald-50"
              }`}
            >
              {isAr ? "لماذا منتيرلي؟" : "Why Monteerly?"}
            </span>
            <h2
              className={`text-3xl md:text-6xl font-black mb-4 md:mb-6 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t.bento?.title ?? "Monteerly OS"}
            </h2>
            <p
              className={`text-base md:text-xl max-w-2xl mx-auto font-medium ${mutedText}`}
            >
              {t.bento?.subtitle ??
                (isAr
                  ? "ترسانة كاملة لحماية وقتك وأموالك."
                  : "An entire arsenal to protect your time and money.")}
            </p>
          </div>

          {/* Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Escrow Card */}
            <div
              className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-all duration-300 hover:border-emerald-500/30 ${cardBg}`}
            >
              <div className="relative z-20 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 md:mb-6">
                  <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />
                </div>
                <h3
                  className={`text-xl md:text-3xl font-black mb-2 md:mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t.bento?.escrow ??
                    (isAr ? "حماية الأصول بمستوى عسكري" : "Military-Grade Asset Protection")}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${mutedText}`}>
                  {t.bento?.escrowdesc ??
                    (isAr
                      ? "عملك ليس مجرد ملفات — إنه أصول رقمية. محمية بـ AES-256 وعقود ضمان ذكية حتى التسليم."
                      : "Your work isn't just files — it's digital assets. Protected with AES-256 and Escrow smart contracts until delivery.")}
                </p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl overflow-hidden">
                <Image
                  src="/images/monteerly/monteerly_05_security_digital_lock_cyber.png"
                  alt={isAr ? "حماية الضمان" : "Escrow Protection"}
                  width={600}
                  height={300}
                  className="w-full h-40 md:h-56 object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* AI Card */}
            <div
              className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-all duration-300 hover:border-indigo-500/30 ${cardBg}`}
            >
              <div className="relative z-20 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 md:mb-6">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
                </div>
                <h3
                  className={`text-xl md:text-3xl font-black mb-2 md:mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {t.bento?.ai ??
                    (isAr ? "مساعد المخرج الذكي" : "Directorial Assistant Co-Pilot")}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${mutedText}`}>
                  {t.bento?.aidesc ??
                    (isAr
                      ? "يحلل المشاريع ويسعّر العروض ويتفاوض لزيادة عائدك وتقليل الجهد اليدوي."
                      : "Analyzes projects, prices offers, and negotiates to maximize your ROI and reduce manual effort.")}
                </p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl overflow-hidden">
                <Image
                  src="/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png"
                  alt={isAr ? "مساعد الذكاء الاصطناعي" : "AI Co-Pilot"}
                  width={600}
                  height={300}
                  className="w-full h-40 md:h-56 object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Library Card */}
            <div
              className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-all duration-300 hover:border-pink-500/30 ${cardBg}`}
            >
              <div className="relative z-20 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 md:mb-6">
                  <Video className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
                </div>
                <h3
                  className={`text-xl md:text-3xl font-black mb-2 md:mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {isAr ? "مكتبة اللقطات الحصرية" : "Stock Footage Library"}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${mutedText}`}>
                  {isAr
                    ? "آلاف اللقطات الحصرية المصمَّمة خصيصاً للسوق العربي."
                    : "Thousands of exclusive shots tailored for the Arab market."}
                </p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl overflow-hidden">
                <Image
                  src="/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png"
                  alt={isAr ? "مكتبة الأصول السينمائية" : "Cinematic Library"}
                  width={600}
                  height={300}
                  className="w-full h-40 md:h-56 object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Academy Card */}
            <div
              className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-all duration-300 hover:border-amber-500/30 ${cardBg}`}
            >
              <div className="relative z-20 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4 md:mb-6">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />
                </div>
                <h3
                  className={`text-xl md:text-3xl font-black mb-2 md:mb-4 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {isAr ? "الأكاديمية والمجتمع" : "Academy & Community"}
                </h3>
                <p className={`text-sm md:text-base leading-relaxed ${mutedText}`}>
                  {isAr
                    ? "طوّر مهاراتك بدورات متخصصة وانضم لمجتمع المبدعين."
                    : "Level up your skills with specialized courses and join the creator community."}
                </p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl overflow-hidden">
                <Image
                  src="/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png"
                  alt={isAr ? "الأكاديمية والمجتمع" : "Academy & Community"}
                  width={600}
                  height={300}
                  className="w-full h-40 md:h-56 object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────────── */}
      <section
        className={`py-20 md:py-32 px-4 ${
          isDarkMode ? "bg-[#05050A]" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <span
              className={`inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border ${
                isDarkMode
                  ? "text-purple-400 border-purple-500/20 bg-purple-500/10"
                  : "text-purple-600 border-purple-200 bg-purple-50"
              }`}
            >
              {isAr ? "قصص النجاح" : "Success Stories"}
            </span>
            <h2
              className={`text-3xl md:text-5xl font-black ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t.testimonials?.title ??
                (isAr ? "موثوق من قادة الصناعة" : "Trusted by Industry Leaders")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-[#0A0A0F] border-white/8 hover:border-indigo-500/30"
                    : "bg-slate-50 border-slate-200 hover:border-indigo-300 shadow-sm"
                }`}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <p
                  className={`text-sm leading-relaxed mb-5 italic ${mutedText}`}
                >
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-sm flex-shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className={`font-bold text-sm ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {item.name}
                    </div>
                    <div className="text-xs text-indigo-500 font-semibold">
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className={`py-20 md:py-36 px-4 ${
          isDarkMode ? "bg-[#030305]" : "bg-slate-100"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span
              className={`inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border ${
                isDarkMode
                  ? "text-indigo-400 border-indigo-500/20 bg-indigo-500/10"
                  : "text-indigo-600 border-indigo-200 bg-indigo-50"
              }`}
            >
              {isAr ? "الأسعار" : "Pricing"}
            </span>
            <h2
              className={`text-3xl md:text-5xl font-black ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {t.personas?.title
                ? (isAr ? "خطط مرنة للجميع" : "Flexible Plans for Everyone")
                : (isAr ? "خطط مرنة للجميع" : "Flexible Plans for Everyone")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rookie Plan */}
            <div
              className={`p-8 rounded-3xl border text-center transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-[#0A0A0F] border-white/10 hover:border-white/20 shadow-xl"
                  : "bg-white border-slate-200 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <h3
                className={`text-2xl font-black mb-1 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Rookie
              </h3>
              <p className={`text-sm mb-4 ${mutedText}`}>
                {isAr ? "ابدأ رحلتك الإبداعية" : "Start your creative journey"}
              </p>
              <p className="text-5xl font-black mb-8 text-indigo-500">
                {isAr ? "مجاناً" : "Free"}
              </p>
              <ul
                className={`space-y-3 mb-8 text-sm ${
                  isAr ? "text-right" : "text-left"
                }`}
              >
                {rookieFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className={mutedText}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/auth`}
                className={`block w-full py-3.5 rounded-xl border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all duration-200 ${
                  isDarkMode ? "hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]" : ""
                }`}
              >
                {isAr ? "انضم مجاناً" : "Join for Free"}
              </Link>
            </div>

            {/* Pro Plan */}
            <div
              className={`p-8 rounded-3xl border text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-gradient-to-br from-indigo-950/60 to-[#0A0A0F] border-indigo-500/30 shadow-[0_0_40px_rgba(79,70,229,0.15)]"
                  : "bg-indigo-50 border-indigo-200 shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-black px-4 py-1.5 rounded-bl-xl tracking-widest uppercase">
                {isAr ? "الأشهر" : "Popular"}
              </div>
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.08),transparent_70%)] pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-indigo-500/15 flex items-center justify-center mx-auto mb-5 relative z-10">
                <Zap className="w-7 h-7 text-indigo-500" />
              </div>
              <h3
                className={`text-2xl font-black mb-1 relative z-10 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Pro Enterprise
              </h3>
              <p className={`text-sm mb-4 relative z-10 ${mutedText}`}>
                {isAr ? "للفرق والوكالات" : "For teams & agencies"}
              </p>
              <p className="text-5xl font-black mb-8 text-indigo-500 relative z-10">
                {isAr ? "مخصص" : "Custom"}
              </p>
              <ul
                className={`space-y-3 mb-8 text-sm relative z-10 ${
                  isAr ? "text-right" : "text-left"
                }`}
              >
                {proFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    <span className={mutedText}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/auth`}
                className="block w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black transition-all duration-200 shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] relative z-10"
              >
                {isAr ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────────────────── */}
      <section
        className={`py-20 md:py-32 px-4 relative overflow-hidden ${
          isDarkMode ? "bg-[#05050A]" : "bg-slate-900"
        }`}
      >
        {/* Background glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-black uppercase tracking-widest mb-6 px-3 py-1 rounded-full border text-emerald-400 border-emerald-500/20 bg-emerald-500/10">
              {isAr ? "ابدأ الآن" : "Get Started"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
              {t.cta?.title ??
                (isAr
                  ? "هل أنت مستعد لبناء إمبراطوريتك الرقمية؟"
                  : "Ready to Build Your Digital Empire?")}
            </h2>
            <p className="text-base md:text-xl text-indigo-200 mb-10 md:mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
              {t.cta?.subtitle ??
                (isAr
                  ? "انضم للنخبة. لا مزيد من الأدوات المتفرقة — ابدأ العمل بنظام تشغيل سيادي موحد اليوم."
                  : "Join the elite. No more scattered tools — start working with a unified sovereign OS today.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/auth`}
                className="inline-flex bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-10 py-5 md:px-14 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all duration-200 shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_rgba(79,70,229,0.7)] items-center gap-3 hover:-translate-y-1"
              >
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                {t.cta?.btn ??
                  (isAr ? "أنشئ هويتك السيادية" : "Establish Sovereign Identity")}
              </Link>
              <Link
                href={`/${locale}/marketplace`}
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-white font-bold text-base transition-colors duration-200 border border-white/10 px-8 py-5 rounded-xl hover:bg-white/5 hover:border-white/20"
              >
                {isAr ? "تصفح السوق" : "Browse Marketplace"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────────── */}
      <footer
        className={`py-14 md:py-20 px-4 border-t relative z-20 ${
          isDarkMode
            ? "bg-[#030305] border-white/5"
            : "bg-slate-100 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4 opacity-90">
              <Image
                src="/images/monteerly/monteerly_01_favicon_app_icon.png"
                alt="Monteerly OS"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span
                className={`font-black text-xl tracking-tight ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Monteerly{" "}
                <span className="text-indigo-600">OS</span>
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-sm ${mutedText}`}>
              {isAr
                ? "أول نظام تشغيل إبداعي سيادي في الشرق الأوسط."
                : "The first sovereign creative OS in the Middle East."}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {["𝕏", "in", "ig"].map((s) => (
                <span
                  key={s}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center text-xs font-black cursor-pointer transition-colors duration-200 ${
                    isDarkMode
                      ? "border-white/10 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400"
                      : "border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4
              className={`font-black mb-5 uppercase tracking-widest text-xs ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {isAr ? "المنصة" : "Platform"}
            </h4>
            <ul className={`space-y-3 text-sm ${mutedText}`}>
              {[
                { href: "#ecosystem", label: isAr ? "السوق" : "Marketplace" },
                { href: "#library", label: isAr ? "المكتبة" : "Library" },
                { href: "#pricing", label: isAr ? "الأسعار" : "Pricing" },
                { href: `/${locale}/academy`, label: isAr ? "الأكاديمية" : "Academy" },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="hover:text-indigo-500 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4
              className={`font-black mb-5 uppercase tracking-widest text-xs ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {isAr ? "القانونية" : "Legal"}
            </h4>
            <ul className={`space-y-3 text-sm ${mutedText}`}>
              {[
                { href: `/${locale}/legal`, label: isAr ? "شروط الخدمة" : "Terms of Service" },
                { href: `/${locale}/legal`, label: isAr ? "سياسة الخصوصية" : "Privacy Policy" },
                { href: `/${locale}/legal/ip-transfer`, label: isAr ? "نقل الملكية الفكرية" : "IP Transfer" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-indigo-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`text-center pt-8 border-t ${
            isDarkMode ? "border-white/5" : "border-slate-200"
          }`}
        >
          <p className={`text-sm ${mutedText}`}>
            © {new Date().getFullYear()} Monteerly OS. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </div>
  );
}
