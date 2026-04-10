"use client";
import React, { createContext, useContext, useState } from 'react';

type Lang = 'ar' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // --- General ---
    "nav.features": "المميزات", "nav.market": "السوق", "nav.security": "الأمان", "nav.testimonials": "قصص نجاح", "nav.pricing": "الأسعار", "nav.login": "دخول", "nav.start": "ابدأ",
    "footer.rights": "© 2026 Monteerly Studio. جميع الحقوق محفوظة.",
    "hero.cta_primary": "ابدأ مجاناً", "hero.cta_secondary": "جولة في النظام",
    
    // --- Apps ---
    "monitor.title": "المراقب الميداني", "monitor.rec": "تسجيل", "monitor.link_ok": "الاتصال جيد", "monitor.scopes": "الرسوم", "monitor.lut": "فلاتر",
    "id.title": "الهوية الرقمية", "id.role": "منتج منفذ", "id.verified": "مؤكد", "id.bio_auth": "بصمة", "id.refresh": "تحديث تلقائي",
    "logger.title": "مسجل السكربت", "logger.scene": "المشهد", "logger.take": "اللقطة", "logger.notes": "ملاحظات...", "logger.save": "حفظ", "logger.tags.good": "جيدة", "logger.tags.sound": "صوت", "logger.tags.focus": "فوكس",

    // --- Dashboard ---
    "dash.welcome": "مرحباً", "dash.overview": "نظرة عامة على الاستوديو.", "dash.new_project": "مشروع جديد", "dash.active_projects": "المشاريع النشطة", "dash.hours": "ساعات العمل", "dash.team": "الفريق", "dash.recent_projects": "مشاريع حديثة", "dash.view_all": "الكل", "dash.last_update": "تحديث", "dash.quick_access": "وصول سريع", "dash.open_app": "فتح", "dash.alerts": "تنبيهات", "dash.online": "متصل", "dash.days": "7 أيام", "dash.month": "هذا الشهر",

    // --- Market ---
    "market.title": "سوق المواهب", "market.subtitle": "نخبة المحترفين.", "market.search_placeholder": "بحث...", "market.search_btn": "بحث", "market.filter": "تصنيف", "market.contact": "تواصل", "market.roles.all": "الكل", "market.roles.editor": "مونتير", "market.roles.photographer": "مصور", "market.roles.vfx": "VFX", "market.roles.sound": "صوت", "market.roles.colorist": "ألوان",

    // --- NEW: Pricing ---
    "pricing.title": "خطط تناسب طموحك",
    "pricing.subtitle": "شفافية تامة. لا رسوم خفية. إلغاء في أي وقت.",
    "pricing.free.title": "البداية", "pricing.free.price": "مجاناً", "pricing.free.desc": "للمستقلين الجدد",
    "pricing.pro.title": "المحترف", "pricing.pro.price": "19$", "pricing.pro.desc": "للإنتاج المستمر",
    "pricing.team.title": "الشركات", "pricing.team.price": "مخصص", "pricing.team.desc": "للوكالات الكبرى",
    "pricing.btn": "اختر الخطة", "pricing.btn.contact": "تواصل معنا",
    "pricing.feat.projects": "مشاريع", "pricing.feat.storage": "تخزين", "pricing.feat.comm": "عمولة",

    // --- NEW: Contact ---
    "contact.title": "تواصل مع القيادة",
    "contact.subtitle": "فريق الدعم الهندسي جاهز لمساعدتك 24/7.",
    "contact.form.name": "الاسم الكامل", "contact.form.email": "البريد الإلكتروني", "contact.form.msg": "الرسالة", "contact.form.send": "إرسال الرسالة",

    // --- NEW: 404 ---
    "404.title": "خطأ في النظام",
    "404.subtitle": "المسار الذي تحاول الوصول إليه غير موجود في الخريطة الرقمية.",
    "404.btn": "العودة للقاعدة",
  },
  en: {
    // --- General ---
    "nav.features": "Features", "nav.market": "Market", "nav.security": "Security", "nav.testimonials": "Stories", "nav.pricing": "Pricing", "nav.login": "Login", "nav.start": "Start",
    "footer.rights": "© 2026 Monteerly Studio. All rights reserved.",
    "hero.cta_primary": "Start Free", "hero.cta_secondary": "Tour",

    // --- Apps ---
    "monitor.title": "Pocket Monitor", "monitor.rec": "REC", "monitor.link_ok": "LINK OK", "monitor.scopes": "Scopes", "monitor.lut": "LUTs",
    "id.title": "Digital ID", "id.role": "Producer", "id.verified": "Verified", "id.bio_auth": "Biometric", "id.refresh": "Auto-refresh",
    "logger.title": "Quick Logger", "logger.scene": "SCENE", "logger.take": "TAKE", "logger.notes": "Notes...", "logger.save": "Save", "logger.tags.good": "Good", "logger.tags.sound": "Sound", "logger.tags.focus": "Focus",

    // --- Dashboard ---
    "dash.welcome": "Welcome", "dash.overview": "Studio Overview.", "dash.new_project": "New Project", "dash.active_projects": "Active", "dash.hours": "Hours", "dash.team": "Team", "dash.recent_projects": "Recent", "dash.view_all": "All", "dash.last_update": "Updated", "dash.quick_access": "Quick Access", "dash.open_app": "Open", "dash.alerts": "Alerts", "dash.online": "Online", "dash.days": "7 Days", "dash.month": "Month",

    // --- Market ---
    "market.title": "Talent Market", "market.subtitle": "Top Professionals.", "market.search_placeholder": "Search...", "market.search_btn": "Search", "market.filter": "Filter", "market.contact": "Contact", "market.roles.all": "All", "market.roles.editor": "Editor", "market.roles.photographer": "Photo", "market.roles.vfx": "VFX", "market.roles.sound": "Sound", "market.roles.colorist": "Colorist",

    // --- NEW: Pricing ---
    "pricing.title": "Plans for Ambition",
    "pricing.subtitle": "Full transparency. No hidden fees. Cancel anytime.",
    "pricing.free.title": "Starter", "pricing.free.price": "Free", "pricing.free.desc": "For new freelancers",
    "pricing.pro.title": "Pro", "pricing.pro.price": "$19", "pricing.pro.desc": "For daily production",
    "pricing.team.title": "Enterprise", "pricing.team.price": "Custom", "pricing.team.desc": "For agencies",
    "pricing.btn": "Choose Plan", "pricing.btn.contact": "Contact Us",
    "pricing.feat.projects": "Projects", "pricing.feat.storage": "Storage", "pricing.feat.comm": "Commission",

    // --- NEW: Contact ---
    "contact.title": "Contact HQ",
    "contact.subtitle": "Engineering support team is ready to help 24/7.",
    "contact.form.name": "Full Name", "contact.form.email": "Email Address", "contact.form.msg": "Message", "contact.form.send": "Send Message",

    // --- NEW: 404 ---
    "404.title": "SYSTEM ERROR",
    "404.subtitle": "The route you are trying to access does not exist in the digital map.",
    "404.btn": "Return to Base",
  }
};

const LanguageContext = createContext<LanguageContextType>({ lang: 'ar', toggleLang: () => {}, t: (k) => k });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ar');
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const t = (key: string) => {
    // @ts-ignore
    return translations[lang][key] || key;
  };
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
export const useLang = () => useContext(LanguageContext);
