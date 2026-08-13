// ─────────────────────────────────────────────────────────────────────────────
// Monteerly Studio Platform — Sovereign Asset Map
// src/constants/assets.ts
//
// ⚠️  قاعدة ثابتة: جميع المسارات تبدأ بـ / (slash أمامية)
//     وتُشير إلى ملفات موجودة فعلاً في public/images/monteerly/
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AssetPath {
  src: string;
  alt: {
    ar: string;
    en: string;
  };
  width?: number;
  height?: number;
}

// ─── Base path helper (للاستخدام الداخلي فقط) ────────────────────────────────
const M = (filename: string) =>
  `/images/monteerly/${filename}` as const;

// ─────────────────────────────────────────────────────────────────────────────
// MONTEERLY ASSETS — الخريطة الكاملة لأصول المنصة
// ─────────────────────────────────────────────────────────────────────────────
export const MONTEERLYASSETS = {
  // ── Logo & Branding ─────────────────────────────────────────────────────────
  LOGO: {
    ICON: M("monteerly01-favicon-app-icon.png"),
    FULL: M("monteerly02-main-logo-full.svg"),
  },

  // ── Hero & Marketing ────────────────────────────────────────────────────────
  HERO: {
    MAIN: M("monteerly04-hero-header-marketing-banner.png"),
    DASHBOARD: M("monteerly06-marketing-showcase-full.png"),
  },

  // ── Features ────────────────────────────────────────────────────────────────
  FEATURES: {
    SECURITY: M("monteerly05-security-digital-lock-cyber.png"),
    AI: M("monteerly09-ai-performance-advisor-hologram.png"),
    WORKSPACE: M("monteerly15-creator-workspace-laptop-modern.png"),
    PUBLISHING: M("monteerly10-multiplatform-publishing-hero.png"),
    ANALYTICS: M("monteerly13-analytics-dashboard-woman-ai.png"),
    INNOVATION: M("monteerly07-tech-innovation-portrait.png"),
    BRANDING: M("monteerly08-branding-creative-assets.png"),
    GLOBAL: M("monteerly11-global-collaboration-grid-4up.png"),
    SHOWCASE: M("monteerly06-marketing-showcase-full.png"),
  },

  // ── Avatars & People ────────────────────────────────────────────────────────
  AVATARS: {
    // ✅ إصلاح: كانت "images/avatarplaceholder.png" (MISS) → الآن مسار صحيح
    ADMIN: M("monteerly03-profile-ahmed-gamal-circle.png"),
    PLACEHOLDER: M("monteerly03-profile-ahmed-gamal-circle.png"),
    FOUNDER: M("monteerly03-profile-ahmed-gamal-circle.png"),
  },

  // ── Workspace & Studio ──────────────────────────────────────────────────────
  WORKSPACE: {
    TIMELINE: M("monteerly12-editor-redshirt-timeline.png"),
    DUAL_SCREEN: M("monteerly14-editor-professional-dual-screen.png"),
    LAPTOP: M("monteerly15-creator-workspace-laptop-modern.png"),
    ARAB_EDITOR: M("monteerly16-editor-arab-thobe-collaboration.png"),
  },

  // ── Market & Talent ─────────────────────────────────────────────────────────
  MARKET: {
    ARAB_EDITOR: M("monteerly16-editor-arab-thobe-collaboration.png"),
  },

  // ── Testimonials ────────────────────────────────────────────────────────────
  TESTIMONIALS: {
    B2B_WOMAN: M("monteerly17-testimonial-woman-gray-suit-office.png"),
    EXECUTIVE: M("monteerly18-testimonial-executive-growth-charts.png"),
    FREELANCE: M("monteerly19-testimonial-creative-hoodie-freelance.png"),
    ENTERPRISE: M("monteerly20-testimonial-business-exec-corporate.png"),
  },

  // ── Heritage & Library ──────────────────────────────────────────────────────
  HERITAGE: {
    SAUDI_TRADITIONAL: M("monteerly21-photographer-saudi-heritage-traditional.png"),
    ALGERIAN_DRONE: M("monteerly22-photographer-algerian-drone-aerial.png"),
    CINEMATIC: M("monteerly23-photographer-library-heritage-cinematic.png"),
    CITY_DRONE: M("monteerly24-photographer-algerian-drone-city-shot.png"),
  },

  // ── Gamification ────────────────────────────────────────────────────────────
  GAMIFICATION: {
    POWER_ACTION: "/images/monteerly/gamification-power-action.png",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MCOS ASSETS — النسخة الموسّعة مع alt texts ثنائية اللغة
// (تُستخدم في src/lib/ui/assets.ts وفي الـ components)
// ─────────────────────────────────────────────────────────────────────────────
export const MCOSASSETS = {
  branding: {
    logoMain: {
      src: M("monteerly02-main-logo-full.svg"),
      alt: { ar: "شعار منتيرلي ستوديو الكامل", en: "Monteerly Studio main logo — Creative OS" },
    } satisfies AssetPath,
    icon: {
      src: M("monteerly01-favicon-app-icon.png"),
      alt: { ar: "أيقونة النظام", en: "System Icon" },
      width: 40,
      height: 40,
    } satisfies AssetPath,
    founder: {
      src: M("monteerly03-profile-ahmed-gamal-circle.png"),
      alt: { ar: "أحمد جمال — المؤسس والرئيس التنفيذي", en: "Ahmed Gamal — Founder & CEO" },
      width: 80,
      height: 80,
    } satisfies AssetPath,
  },

  hero: {
    banner: {
      src: M("monteerly04-hero-header-marketing-banner.png"),
      alt: { ar: "خلفية الهيرو التسويقية", en: "Hero Background" },
    } satisfies AssetPath,
  },

  security: {
    digitalLock: {
      src: M("monteerly05-security-digital-lock-cyber.png"),
      alt: { ar: "قفل رقمي للأمن السيبراني", en: "Cyber Security Lock" },
    } satisfies AssetPath,
  },

  features: {
    showcase: {
      src: M("monteerly06-marketing-showcase-full.png"),
      alt: { ar: "عرض النظام البيئي المتكامل", en: "Integrated Ecosystem Showcase" },
    } satisfies AssetPath,
    brandAssets: {
      src: M("monteerly08-branding-creative-assets.png"),
      alt: { ar: "إدارة أصول العلامة التجارية", en: "Brand Assets Management" },
    } satisfies AssetPath,
    globalGrid: {
      src: M("monteerly11-global-collaboration-grid-4up.png"),
      alt: { ar: "التعاون العالمي", en: "Global Collaboration" },
    } satisfies AssetPath,
  },

  techAndAi: {
    innovation: {
      src: M("monteerly07-tech-innovation-portrait.png"),
      alt: { ar: "النواة التقنية المتقدمة", en: "Advanced Tech Core" },
    } satisfies AssetPath,
    advisor: {
      src: M("monteerly09-ai-performance-advisor-hologram.png"),
      alt: { ar: "مستشار الأداء بالذكاء الاصطناعي", en: "AI Performance Advisor" },
    } satisfies AssetPath,
    publishing: {
      src: M("monteerly10-multiplatform-publishing-hero.png"),
      alt: { ar: "النشر متعدد المنصات", en: "Multi-platform Publishing" },
    } satisfies AssetPath,
    analytics: {
      src: M("monteerly13-analytics-dashboard-woman-ai.png"),
      alt: { ar: "لوحة التحليلات الذكية", en: "Smart Analytics Dashboard" },
    } satisfies AssetPath,
  },

  workspace: {
    timeline: {
      src: M("monteerly12-editor-redshirt-timeline.png"),
      alt: { ar: "استوديو الفيديو", en: "Video Studio Timeline" },
    } satisfies AssetPath,
    dualScreen: {
      src: M("monteerly14-editor-professional-dual-screen.png"),
      alt: { ar: "مساحة العمل الاحترافية", en: "Professional Workspace" },
    } satisfies AssetPath,
    laptop: {
      src: M("monteerly15-creator-workspace-laptop-modern.png"),
      alt: { ar: "حرية الإبداع", en: "Creative Freedom" },
    } satisfies AssetPath,
  },

  market: {
    arabEditor: {
      src: M("monteerly16-editor-arab-thobe-collaboration.png"),
      alt: { ar: "مونتير عربي في التعاون", en: "Arab Video Editor Collaboration" },
      text: {
        ar: "تقنية عالمية بتجربة عربية أصيلة.",
        en: "World-class tech with a native Arabic experience.",
      },
    } satisfies AssetPath,
  },

  testimonials: {
    b2bWoman: {
      src: M("monteerly17-testimonial-woman-gray-suit-office.png"),
      alt: { ar: "شهادة مدير التسويق", en: "Marketing Manager Testimonial" },
    } satisfies AssetPath,
    executive: {
      src: M("monteerly18-testimonial-executive-growth-charts.png"),
      alt: { ar: "شهادة نمو المدير التنفيذي", en: "Executive Growth Testimonial" },
    } satisfies AssetPath,
    freelance: {
      src: M("monteerly19-testimonial-creative-hoodie-freelance.png"),
      alt: { ar: "شهادة الفريلانسر", en: "Freelancer Testimonial" },
    } satisfies AssetPath,
    enterprise: {
      src: M("monteerly20-testimonial-business-exec-corporate.png"),
      alt: { ar: "شهادة المؤسسة", en: "Enterprise Testimonial" },
    } satisfies AssetPath,
  },

  heritageAndLibrary: {
    saudiTraditional: {
      src: M("monteerly21-photographer-saudi-heritage-traditional.png"),
      alt: { ar: "التصوير التراثي السعودي", en: "Saudi Heritage Photography" },
    } satisfies AssetPath,
    algerianDrone: {
      src: M("monteerly22-photographer-algerian-drone-aerial.png"),
      alt: { ar: "الطائرة المسيّرة الجوية الاحترافية", en: "Professional Aerial Drone" },
    } satisfies AssetPath,
    cinematic: {
      src: M("monteerly23-photographer-library-heritage-cinematic.png"),
      alt: { ar: "الأصول السينمائية", en: "Cinematic Assets" },
    } satisfies AssetPath,
    cityDrone: {
      src: M("monteerly24-photographer-algerian-drone-city-shot.png"),
      alt: { ar: "المناطق الحضرية والمدن", en: "Urban and Cityscapes" },
    } satisfies AssetPath,
  },

  gamification: {
    powerAction: {
      src: "/images/monteerly/gamification-power-action.png",
      alt: { ar: "مكافآت القوة والنشاط", en: "Power Action Rewards" },
    } satisfies AssetPath,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Convenience re-exports للتوافق مع الاستيراد القديم
// ─────────────────────────────────────────────────────────────────────────────

/** @deprecated استخدم MONTEERLYASSETS بدلاً من هذا */
export const LOGO = MONTEERLYASSETS.LOGO;

/** @deprecated استخدم MONTEERLYASSETS بدلاً من هذا */
export const HERO_IMAGES = MONTEERLYASSETS.HERO;

/** @deprecated استخدم MONTEERLYASSETS بدلاً من هذا */
export const FEATURE_IMAGES = MONTEERLYASSETS.FEATURES;

/** @deprecated استخدم MONTEERLYASSETS بدلاً من هذا */
export const AVATAR_PLACEHOLDER = MONTEERLYASSETS.AVATARS.PLACEHOLDER;

// ─────────────────────────────────────────────────────────────────────────────
// Helper: getAssetSrc — يُرجع src مع fallback آمن
// ─────────────────────────────────────────────────────────────────────────────
export function getAssetSrc(
  asset: AssetPath | { src: string } | string | undefined | null,
  fallback = MONTEERLYASSETS.LOGO.ICON
): string {
  if (!asset) return fallback;
  if (typeof asset === "string") return asset;
  return asset.src ?? fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: getAssetAlt — يُرجع alt text حسب اللغة
// ─────────────────────────────────────────────────────────────────────────────
export function getAssetAlt(
  asset: AssetPath | undefined | null,
  locale: "ar" | "en" = "en",
  fallback = ""
): string {
  if (!asset) return fallback;
  return asset.alt?.[locale] ?? asset.alt?.en ?? fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper: getAllImagePaths — يُرجع كل المسارات للتحقق منها
// ─────────────────────────────────────────────────────────────────────────────
export function getAllImagePaths(): string[] {
  return [
    MONTEERLYASSETS.LOGO.ICON,
    MONTEERLYASSETS.LOGO.FULL,
    MONTEERLYASSETS.HERO.MAIN,
    MONTEERLYASSETS.HERO.DASHBOARD,
    MONTEERLYASSETS.FEATURES.SECURITY,
    MONTEERLYASSETS.FEATURES.AI,
    MONTEERLYASSETS.FEATURES.WORKSPACE,
    MONTEERLYASSETS.FEATURES.PUBLISHING,
    MONTEERLYASSETS.FEATURES.ANALYTICS,
    MONTEERLYASSETS.FEATURES.INNOVATION,
    MONTEERLYASSETS.FEATURES.BRANDING,
    MONTEERLYASSETS.FEATURES.GLOBAL,
    MONTEERLYASSETS.FEATURES.SHOWCASE,
    MONTEERLYASSETS.AVATARS.ADMIN,
    MONTEERLYASSETS.AVATARS.PLACEHOLDER,
    MONTEERLYASSETS.WORKSPACE.TIMELINE,
    MONTEERLYASSETS.WORKSPACE.DUAL_SCREEN,
    MONTEERLYASSETS.WORKSPACE.LAPTOP,
    MONTEERLYASSETS.WORKSPACE.ARAB_EDITOR,
    MONTEERLYASSETS.MARKET.ARAB_EDITOR,
    MONTEERLYASSETS.TESTIMONIALS.B2B_WOMAN,
    MONTEERLYASSETS.TESTIMONIALS.EXECUTIVE,
    MONTEERLYASSETS.TESTIMONIALS.FREELANCE,
    MONTEERLYASSETS.TESTIMONIALS.ENTERPRISE,
    MONTEERLYASSETS.HERITAGE.SAUDI_TRADITIONAL,
    MONTEERLYASSETS.HERITAGE.ALGERIAN_DRONE,
    MONTEERLYASSETS.HERITAGE.CINEMATIC,
    MONTEERLYASSETS.HERITAGE.CITY_DRONE,
    MONTEERLYASSETS.GAMIFICATION.POWER_ACTION,
  ];
}
