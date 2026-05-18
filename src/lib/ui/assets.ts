export type Locale = 'ar' | 'en';
export type AssetItem = {
  src: string;
  alt: { ar: string; en: string };
  text?: { ar: string; en: string };
};

export const MCOS_ASSETS = {
  branding: {
    logoMain: {
      src: "/images/monteerly/monteerly_02_main_logo_full.svg",
      alt: { ar: "شعار Monteerly Studio – نظام التشغيل الإبداعي", en: "Monteerly Studio main logo – Creative OS" }
    },
    icon: {
      src: "/images/monteerly/monteerly_01_favicon_app_icon.png",
      alt: { ar: "أيقونة النظام", en: "System Icon" }
    },
    founder: {
      src: "/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png",
      alt: { ar: "أحمد جمال - المؤسس", en: "Ahmed Gamal - Founder" },
      text: { 
        ar: "أحمد جمال – المؤسس والرئيس التنفيذي. رؤيتنا تحويل الفوضى الإبداعية إلى تدفق رقمي منظم للمبدعين العرب.", 
        en: "Ahmed Gamal – Founder & CEO. Our mission is to turn creative chaos into a structured digital revenue stream for Arabic creators." 
      }
    }
  },
  hero: {
    banner: {
      src: "/images/monteerly/monteerly_04_hero_header_marketing_banner.png",
      alt: { ar: "خلفية الهيرو", en: "Hero Background" },
      text: { ar: "منصة الإنتاج الإعلامي الأكثر تكاملاً في الشرق الأوسط.", en: "The MENA region’s most comprehensive media production OS." }
    }
  },
  security: {
    digitalLock: {
      src: "/images/monteerly/monteerly_05_security_digital_lock_cyber.png",
      alt: { ar: "قفل سيبراني", en: "Cyber Lock" },
      text: { ar: "حماية من المستوى العسكري لأصولك الرقمية ومشاريعك الذكية.", en: "Military‑grade protection for your digital assets and smart projects." }
    }
  },
  features: {
    showcase: { src: "/images/monteerly/monteerly_06_marketing_showcase_full.png", alt: { ar: "منظومة متكاملة تغنيك عن التشتت", en: "Integrated ecosystem" } },
    brandAssets: { src: "/images/monteerly/monteerly_08_branding_creative_assets.png", alt: { ar: "إدارة أصول العلامة", en: "Brand Assets Management" } },
    globalGrid: { src: "/images/monteerly/monteerly_11_global_collaboration_grid_4up.png", alt: { ar: "تعاون عالمي", en: "Global Collaboration" } }
  },
  techAndAi: {
    innovation: { src: "/images/monteerly/monteerly_07_tech_innovation_portrait.png", alt: { ar: "قلب تقني متطور", en: "Advanced Tech Core" } },
    advisor: { src: "/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png", alt: { ar: "مستشارك الذكي للأداء", en: "AI Performance Advisor" } },
    publishing: { src: "/images/monteerly/monteerly_10_multi_platform_publishing_hero.png", alt: { ar: "نشر متعدد المنصات", en: "Multi-platform Publishing" } },
    analytics: { src: "/images/monteerly/monteerly_13_analytics_dashboard_woman_ai.png", alt: { ar: "لوحة التحليلات الذكية", en: "Smart Analytics Dashboard" } }
  },
  workspace: {
    timeline: { src: "/images/monteerly/monteerly_12_editor_red_shirt_timeline.png", alt: { ar: "استوديو الفيديو", en: "Video Studio" } },
    dualScreen: { src: "/images/monteerly/monteerly_14_editor_professional_dual_screen.png", alt: { ar: "بيئة العمل الاحترافية", en: "Professional Workspace" } },
    laptop: { src: "/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png", alt: { ar: "حرية الإبداع", en: "Creative Freedom" } }
  },
  market: {
    arabEditor: {
      src: "/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png",
      alt: { ar: "محرر فيديو عربي", en: "Arab Video Editor" },
      text: { ar: "تقنية عالمية بلسان عربي مبين.", en: "World‑class tech with a native Arabic experience." }
    }
  },
  testimonials: {
    b2bWoman: { src: "/images/monteerly/monteerly_17_testimonial_woman_gray_suit_office.png", alt: { ar: "شهادة مديرة تسويق", en: "Marketing Manager Testimonial" } },
    executive: { src: "/images/monteerly/monteerly_18_testimonial_executive_growth_charts.png", alt: { ar: "شهادة نمو تنفيذي", en: "Executive Growth Testimonial" } },
    freelance: { src: "/images/monteerly/monteerly_19_testimonial_creative_hoodie_freelance.png", alt: { ar: "شهادة مبدع مستقل", en: "Freelancer Testimonial" } },
    enterprise: { src: "/images/monteerly/monteerly_20_testimonial_business_exec_corporate.png", alt: { ar: "شهادة مؤسسة كبرى", en: "Enterprise Testimonial" } }
  },
  heritageAndLibrary: {
    saudiTraditional: { src: "/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png", alt: { ar: "مكتبة الأصول - تراث سعودي", en: "Saudi Heritage Photography" } },
    algerianDrone: { src: "/images/monteerly/monteerly_22_photographer_algerian_drone_aerial.png", alt: { ar: "تصوير جوي احترافي", en: "Professional Aerial Drone" } },
    cinematic: { src: "/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png", alt: { ar: "أصول سينمائية", en: "Cinematic Assets" } },
    cityDrone: { src: "/images/monteerly/monteerly_24_photographer_algerian_drone_cityshot.png", alt: { ar: "عمران ومدن حديثة", en: "Urban and Cityscapes" } }
  },
  gamification: {
    powerAction: { 
      src: "/images/monteerly/gamification_power_action.png",
      alt: { ar: "زر الطاقة والمكافآت", en: "Power Action & Rewards" } 
    }
  }
};
