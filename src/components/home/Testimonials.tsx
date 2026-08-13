"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { useContent } from "@/hooks/useContent";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  text: string;
  initials: string;
  color: string;
}

interface TestimonialsContent {
  title?: string;
  items?: TestimonialItem[];
}

interface HomeContentShape {
  testimonials?: TestimonialsContent;
}

// ─── Fallback Data (لا صور خارجية — كل شيء مضمَّن) ──────────────────────────
const fallbackTestimonials: TestimonialsContent = {
  title: "Trusted by Industry Leaders",
  items: [
    {
      id: 1,
      name: "Sara Al-Najjar",
      role: "Freelance Video Editor",
      text: "The MCOS escrow system completely changed how I work. I now collaborate with top agencies securely and get paid on time — every time.",
      initials: "SN",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 2,
      name: "Mohamed Khalil",
      role: "Creative Director",
      text: "We reduced production time by 40% thanks to the synced workspace and cloud assets. The AI co-pilot alone saves us hours every week.",
      initials: "MK",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      name: "Layla Mansour",
      role: "CEO, Luminos Agency",
      text: "This isn't just a freelance platform — it's a central OS that organized our creative chaos. I can't imagine running our studio without it.",
      initials: "LM",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      name: "Khaled Yousef",
      role: "Production Director",
      text: "The platform gives our teams clear speed and better governance across every project. The escrow and milestone system is exactly what we needed.",
      initials: "KY",
      color: "from-pink-500 to-rose-500",
    },
  ],
};

const fallbackTestimonialsAr: TestimonialsContent = {
  title: "موثوق من قادة الصناعة",
  items: [
    {
      id: 1,
      name: "سارة النجار",
      role: "مونتيرة فيديو فريلانسر",
      text: "نظام الضمان في MCOS غيّر طريقة عملي كلياً. أتعاون الآن مع كبرى الوكالات بشكل آمن وأحصل على مستحقاتي في الوقت المحدد.",
      initials: "سن",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 2,
      name: "محمد خليل",
      role: "مدير إبداعي",
      text: "قللنا وقت الإنتاج بنسبة 40% بفضل مساحة العمل المتزامنة والأصول السحابية. مساعد الذكاء الاصطناعي وحده يوفر علينا ساعات كل أسبوع.",
      initials: "مخ",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 3,
      name: "ليلى منصور",
      role: "الرئيسة التنفيذية، وكالة لومينوس",
      text: "هذه ليست مجرد منصة فريلانس — إنه نظام تشغيل مركزي نظّم الفوضى الإبداعية لدينا. لا أستطيع تخيل إدارة الاستوديو بدونه.",
      initials: "لم",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      name: "خالد يوسف",
      role: "مدير الإنتاج",
      text: "تمنح المنصة فرقنا سرعة واضحة وحوكمة أفضل في كل مشروع. نظام الضمان والمعالم هو بالضبط ما كنا نحتاجه.",
      initials: "خي",
      color: "from-pink-500 to-rose-500",
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export function Testimonials({ locale = "en" }: { locale?: "ar" | "en" }) {
  const isAr = locale === "ar";
  const content = useContent() as HomeContentShape | null | undefined;

  const testimonials =
    content?.testimonials ??
    (isAr ? fallbackTestimonialsAr : fallbackTestimonials);

  const items = testimonials.items ?? (isAr ? fallbackTestimonialsAr : fallbackTestimonials).items!;
  const title = testimonials.title ?? (isAr ? "موثوق من قادة الصناعة" : "Trusted by Industry Leaders");

  return (
    <section
      className="py-20 md:py-32 px-4 bg-slate-50 dark:bg-slate-900/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border text-purple-600 border-purple-200 bg-purple-50 dark:text-purple-400 dark:border-purple-500/20 dark:bg-purple-500/10">
            {isAr ? "قصص النجاح" : "Success Stories"}
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white"
          >
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative bg-white dark:bg-[#0A0A0F] p-8 rounded-2xl border border-slate-200 dark:border-white/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-500/30 group"
            >
              {/* Quote Icon */}
              <Quote
                className="absolute top-5 right-5 text-indigo-500/10 dark:text-indigo-400/10 transition-colors duration-300 group-hover:text-indigo-500/20"
                size={44}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm md:text-base italic relative z-10">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                {/* Avatar مبني من الحرف الأول — لا صورة خارجية */}
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center font-black text-white text-sm flex-shrink-0 shadow-lg`}
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                    {item.role}
                  </div>
                </div>

                {/* Verified badge */}
                <div className="ml-auto flex items-center gap-1 text-emerald-500 text-xs font-bold">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {isAr ? "موثّق" : "Verified"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">
            {isAr
              ? "انضم إلى آلاف المبدعين الذين يثقون في منتيرلي OS"
              : "Join thousands of creators who trust Monteerly OS"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
