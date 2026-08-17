"use client";

import Image from "next/image";

// ─── جميع المسارات بـ / أمامية صحيحة ─────────────────────────────────────────
const heroImages: { src: string; alt: string }[] = [
  {
    src: "/images/monteerly/monteerly16-editor-arab-thobe-collaboration.png",
    alt: "Arab Video Editor Collaboration",
  },
  {
    src: "/images/monteerly/monteerly21-photographer-saudi-heritage-traditional.png",
    alt: "Saudi Heritage Photography",
  },
  {
    src: "/images/monteerly/monteerly22-photographer-algerian-drone-aerial.png",
    alt: "Professional Aerial Drone",
  },
  {
    src: "/images/monteerly/monteerly23-photographer-library-heritage-cinematic.png",
    alt: "Cinematic Heritage Assets",
  },
  {
    src: "/images/monteerly/monteerly24-photographer-algerian-drone-city-shot.png",
    alt: "Urban and Cityscapes",
  },
  {
    src: "/images/monteerly/monteerly14-editor-professional-dual-screen.png",
    alt: "Professional Dual Screen Workspace",
  },
  {
    src: "/images/monteerly/monteerly12-editor-redshirt-timeline.png",
    alt: "Video Studio Timeline",
  },
  {
    src: "/images/monteerly/monteerly10-multiplatform-publishing-hero.png",
    alt: "Multi-platform Publishing",
  },
  {
    src: "/images/monteerly/monteerly13-analytics-dashboard-woman-ai.png",
    alt: "Smart Analytics Dashboard",
  },
  {
    src: "/images/monteerly/monteerly15-creator-workspace-laptop-modern.png",
    alt: "Creative Freedom Workspace",
  },
  {
    src: "/images/monteerly/monteerly_07_tech_innovation_portrait.png",
    alt: "Advanced Tech Core",
  },
  {
    src: "/images/monteerly/monteerly_08_branding_creative_assets.png",
    alt: "Brand Assets Management",
  },
  {
    src: "/images/monteerly/monteerly_05_security_guardian_wide.png",
    alt: "Cyber Security Lock",
  },
  {
    src: "/images/monteerly/monteerly_04_hero_header_marketing_banner.png",
    alt: "Marketing Hero Banner",
  },
  {
    src: "/images/monteerly/monteerly20-testimonial-business-exec-corporate.png",
    alt: "Enterprise Testimonial",
  },
  {
    src: "/images/monteerly/monteerly18-testimonial-executive-growth-charts.png",
    alt: "Executive Growth Testimonial",
  },
  {
    src: "/images/monteerly/monteerly17-testimonial-woman-gray-suit-office.png",
    alt: "Marketing Manager Testimonial",
  },
  {
    src: "/images/monteerly/monteerly19-testimonial-creative-hoodie-freelance.png",
    alt: "Freelancer Testimonial",
  },
  {
    src: "/images/monteerly/monteerly11-global-collaboration-grid-4up.png",
    alt: "Global Collaboration",
  },
  {
    src: "/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png",
    alt: "AI Performance Advisor",
  },
  {
    src: "/images/monteerly/monteerly_06_marketing_showcase_full.png",
    alt: "Integrated Ecosystem Showcase",
  },
  {
    src: "/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png",
    alt: "Ahmed Gamal - Founder",
  },
  {
    src: "/images/monteerly/monteerly_02_main_logo_full.svg",
    alt: "Monteerly Studio Main Logo",
  },
  {
    src: "/images/monteerly/monteerly_01_favicon_app_icon.png",
    alt: "Monteerly OS Icon",
  },
];

export default function HeroGallery() {
  return (
    <section
      aria-label="Monteerly Studio Gallery"
      className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6"
    >
      {heroImages.map((item, i) => (
        <div
          key={item.src}
          className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl bg-slate-900 shadow-xl transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:z-10"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            // أول 8 صور تُحمَّل فوراً، الباقي lazy
            loading={i < 8 ? "eager" : "lazy"}
            priority={i < 4}
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm line-clamp-1">
              {item.alt}
            </span>
          </div>

          {/* Index badge */}
          <div className="absolute top-2 left-2 rounded-full bg-black/40 px-1.5 py-0.5 text-[9px] font-black text-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {String(i + 1).padStart(2, "0")}
          </div>
        </div>
      ))}
    </section>
  );
}
