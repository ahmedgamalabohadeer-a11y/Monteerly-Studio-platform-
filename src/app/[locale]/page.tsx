'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, ShieldCheck, Zap, Users, ArrowLeft, Star, Video, Trophy, Quote } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function UltimateLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale;
  const isAr = locale === 'ar';
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* القسم 1 & 2: الهيرو والهوية (Hero & Brand) */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950/80 z-10 backdrop-blur-[2px]"></div>
          <img src={MCOS_ASSETS.hero.mainVideoCover} alt="MCOS Background" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-20 text-center max-w-5xl px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img src={MCOS_ASSETS.branding.logoIcon} alt="Logo" className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" /> إطلاق النسخة السيادية V5.0
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tight text-white">
              نظام الإنتاج <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">السيادي</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              أول نظام تشغيل متكامل يجمع بين سوق العمل، الذكاء الاصطناعي، ومساحات العمل المشفرة. وداعاً للمنصات التقليدية.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/auth`} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
                ابدأ رحلتك الآن <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link href={`/${locale}/workspace`} className="w-full sm:w-auto bg-slate-900 border border-slate-700 hover:border-slate-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" /> استكشف النظام
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* القسم 3 & 4 & 5: الأمان، الذكاء الاصطناعي، والمساحة (Features) */}
      <section className="py-32 px-4 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">لماذا Monteerly OS؟</h2>
            <p className="text-slate-400">نحن لا نربطك بعميل، نحن نوفر لك إمبراطورية إنتاجية كاملة.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] border border-slate-800 bg-emerald-500/5 backdrop-blur-sm relative overflow-hidden group">
              <img src={MCOS_ASSETS.features.escrowShield} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-black mb-3">ضمان مالي لا يخترق</h3>
                <p className="text-slate-400">أموالك محتجزة في عقود ذكية (Escrow). لن يضيع مجهودك أبداً.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] border border-slate-800 bg-indigo-500/5 backdrop-blur-sm relative overflow-hidden group">
              <img src={MCOS_ASSETS.features.aiBrain} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10">
                <Zap className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-black mb-3">ذكاء اصطناعي سيادي</h3>
                <p className="text-slate-400">مساعد شخصي يكتب لك العروض، ويسعر مشاريعك بالنيابة عنك.</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] border border-slate-800 bg-rose-500/5 backdrop-blur-sm relative overflow-hidden group">
              <img src={MCOS_ASSETS.features.liveSync} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10">
                <Users className="w-12 h-12 text-rose-400 mb-6" />
                <h3 className="text-2xl font-black mb-3">مساحة عمل كالحاسوب</h3>
                <p className="text-slate-400">نوافذ عائمة، رندر سحابي (R2)، ومزامنة حية للمراجعة مع العميل.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* القسم 6: قصص النجاح والعملاء (Testimonials) */}
      <section className="py-24 px-4 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-16"><Quote className="w-8 h-8 text-indigo-500 mx-auto mb-4"/> قادة الصناعة يثقون بنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-950 p-8 rounded-3xl border border-slate-800">
                <div className="flex justify-center gap-1 mb-4 text-amber-400"><Star fill="currentColor" className="w-5 h-5"/><Star fill="currentColor" className="w-5 h-5"/><Star fill="currentColor" className="w-5 h-5"/><Star fill="currentColor" className="w-5 h-5"/><Star fill="currentColor" className="w-5 h-5"/></div>
                <p className="text-slate-300 italic mb-6">"لم أعد أقلق بشأن تحصيل أموالي. نظام الضمان في MCOS غيّر طريقة عملي بالكامل مع وكالات الإعلانات الكبرى."</p>
                <div className="flex items-center justify-center gap-3">
                  <img src={MCOS_ASSETS.testimonials[`user${i}` as keyof typeof MCOS_ASSETS.testimonials] || MCOS_ASSETS.testimonials.user1} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                  <div className="text-right">
                    <h4 className="font-bold text-white">أحمد المونتير</h4>
                    <p className="text-xs text-slate-500">صانع محتوى PRO</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* القسم 7 & 8: مكتبة التراث والتلعيب (Heritage & Gamification) */}
      <section className="py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-[3rem] p-12 relative overflow-hidden">
          <img src={MCOS_ASSETS.library.rawVideoCover} className="absolute right-0 bottom-0 w-64 opacity-20" />
          <Video className="w-12 h-12 text-indigo-400 mb-6" />
          <h2 className="text-3xl font-black mb-4">مكتبة الأصول السيادية</h2>
          <p className="text-slate-400 mb-8">آلاف الفيديوهات الخام، المؤثرات الصوتية (SFX)، والانتقالات الحصرية لمشتركي نظام التشغيل.</p>
          <Link href={`/${locale}/library`} className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold inline-block">تصفح المكتبة</Link>
        </div>
        <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/20 rounded-[3rem] p-12 relative overflow-hidden">
          <Trophy className="w-12 h-12 text-amber-400 mb-6" />
          <h2 className="text-3xl font-black mb-4">برنامج النخبة (Gamification)</h2>
          <p className="text-slate-400 mb-8">كل مشروع تنجزه يمنحك نقاطاً تفتح لك أوسمة جديدة وتقلل من نسبة عمولة المنصة حتى تصل إلى 5% فقط!</p>
          <div className="flex gap-2">
            <span className="bg-slate-950 px-3 py-1 rounded text-amber-400 text-sm border border-amber-500/30">Level 1</span>
            <span className="bg-slate-950 px-3 py-1 rounded text-slate-400 text-sm border border-slate-800">Top Rated</span>
          </div>
        </div>
      </section>

      {/* القسم 9: التذييل (Footer) */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 px-4 text-center">
        <img src={MCOS_ASSETS.branding.logoMain} alt="MCOS" className="h-8 mx-auto mb-6 opacity-50 grayscale" />
        <p className="text-slate-500 text-sm mb-4">Monteerly Corporate OS © 2026. المنصة السيادية لإنتاج المحتوى.</p>
        <div className="flex justify-center gap-6 text-sm text-slate-400">
          <Link href={`/${locale}/about`} className="hover:text-white">من نحن</Link>
          <Link href={`/${locale}/pricing`} className="hover:text-white">الأسعار</Link>
          <Link href="#" className="hover:text-white">الشروط والأحكام</Link>
        </div>
      </footer>
    </div>
  );
}
