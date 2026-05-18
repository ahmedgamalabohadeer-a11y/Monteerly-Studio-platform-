'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlayCircle, ShieldCheck, Zap, Users, ArrowLeft, Star, MonitorPlay, Camera, Briefcase, Moon, Sun, Lock } from 'lucide-react';
import { MCOS_ASSETS } from '@/lib/ui/assets';
import arDict from '@/messages/ar.json';
import enDict from '@/messages/en.json';

export default function UltimateLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale as 'ar' | 'en';
  const isAr = locale === 'ar';
  const t = isAr ? arDict : enDict;
  const router = useRouter();
  const pathname = usePathname();

  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLocale = isAr ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const [activePersona, setActivePersona] = useState('editor');
  const personas = {
    editor: { id: 'editor', title: t.personas.editor, icon: <MonitorPlay className="w-4 h-4 md:w-5 md:h-5"/>, img: MCOS_ASSETS.workspace.timeline.src, desc: t.personas.editor_desc },
    photographer: { id: 'photographer', title: t.personas.photographer, icon: <Camera className="w-4 h-4 md:w-5 md:h-5"/>, img: MCOS_ASSETS.heritageAndLibrary.saudiTraditional.src, desc: t.personas.photographer_desc },
    creator: { id: 'creator', title: t.personas.creator, icon: <Zap className="w-4 h-4 md:w-5 md:h-5"/>, img: MCOS_ASSETS.workspace.laptop.src, desc: t.personas.creator_desc },
    agency: { id: 'agency', title: t.personas.agency, icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5"/>, img: MCOS_ASSETS.features.showcase.src, desc: t.personas.agency_desc },
  };
  const activeData = personas[activePersona as keyof typeof personas];

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-[#05050A] text-slate-50' : 'bg-slate-50 text-slate-900'} selection:bg-indigo-500/30 overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* شريط الملاحة الزجاجي - محسن للجوال */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#05050A]/80 border-white/5' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src={MCOS_ASSETS.branding.icon.src} alt="MCOS" className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
            <span className="font-black text-lg md:text-xl tracking-tight hidden sm:block">Monteerly <span className="text-indigo-500">OS</span></span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={toggleLanguage} className={`font-bold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-700'}`}>{t.nav.lang}</button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-1.5 md:p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-200 text-indigo-600 hover:bg-slate-300'}`}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href={`/${locale}/auth`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center gap-1.5 md:gap-2">
              <Lock className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden xs:inline">{t.nav.login}</span><span className="xs:hidden">دخول</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* قسم الهيرو - تصغير الخطوط للجوال */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 z-10 bg-gradient-to-b ${isDarkMode ? 'from-[#05050A]/80 via-[#05050A]/90 to-[#05050A]' : 'from-slate-50/80 via-slate-50/90 to-slate-50'}`}></div>
          <img src={MCOS_ASSETS.hero.banner.src} alt="Hero" className="w-full h-full object-cover opacity-60 scale-105" />
        </div>
        
        <div className="relative z-20 text-center max-w-5xl px-4 w-full mt-4 md:mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-black mb-6 md:mb-8 border backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-700 border-emerald-300'}`}>
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> {t.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-black mb-6 md:mb-8 leading-tight md:leading-[1.1] tracking-tight">
              {t.hero.title1} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 drop-shadow-sm">{t.hero.title_highlight}</span><br className="hidden sm:block" />
              {t.hero.title2}
            </h1>
            <p className={`text-base md:text-2xl mb-8 md:mb-14 max-w-3xl mx-auto leading-relaxed font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 px-4">
              <Link href={`/${locale}/auth`} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:-translate-y-1">
                {t.hero.deploy_btn} {isAr ? <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> : null}
              </Link>
              <Link href={`/${locale}/workspace`} className={`w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2 border ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 backdrop-blur-sm' : 'bg-white border-slate-300 text-slate-900 shadow-sm'}`}>
                <PlayCircle className="w-4 h-4 md:w-5 md:h-5" /> {t.hero.explore_btn}
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className={`mt-16 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-10 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
             {[ {v: t.stats.vol, l: t.stats.vol_lbl}, {v: t.stats.hrs, l: t.stats.hrs_lbl}, {v: t.stats.upt, l: t.stats.upt_lbl}, {v: t.stats.fee, l: t.stats.fee_lbl} ].map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="text-2xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-500 mb-1 md:mb-2">{s.v}</div>
                  <div className={`text-xs md:text-sm font-bold tracking-wide uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{s.l}</div>
                </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* قسم التخصيص - تمرير أفقي للجوال */}
      <section className="py-16 md:py-32 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">{t.personas.title}</h2>
          </div>
          
          {/* شريط الأزرار القابل للتمرير */}
          <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 md:gap-3 mb-10 md:mb-16 relative z-20 pb-4 justify-start md:justify-center w-full px-2">
            {Object.values(personas).map((p) => (
              <button key={p.id} onClick={() => setActivePersona(p.id)} className={`flex-shrink-0 snap-center flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg transition-all ${activePersona === p.id ? 'bg-indigo-600 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] md:-translate-y-1' : isDarkMode ? 'bg-[#0A0A0F] border border-white/5 text-slate-400' : 'bg-white border border-slate-200 text-slate-600'}`}>
                {p.icon} {p.title}
              </button>
            ))}
          </div>

          <motion.div key={activeData.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={`relative rounded-3xl md:rounded-[3rem] overflow-hidden border p-6 md:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isDarkMode ? 'bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
             <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
             <div className="flex-1 z-10 text-center md:text-right">
               <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">{activeData.title}</h3>
               <p className={`text-base md:text-2xl leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{activeData.desc}</p>
             </div>
             <div className="flex-1 w-full relative z-10 group mt-4 md:mt-0">
               <img src={activeData.img} alt={activeData.title} className="w-full h-auto rounded-xl md:rounded-2xl shadow-xl md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* قسم البينتو - تصغير التباعد للجوال */}
      <section className={`py-16 md:py-32 px-4 relative ${isDarkMode ? 'bg-[#030305]' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6">{t.bento.title}</h2>
            <p className={`text-base md:text-xl max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.bento.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className={`md:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-20 mb-6">
                <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-emerald-400 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{t.bento.escrow}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.bento.escrow_desc}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#0A0A0F] via-[#0A0A0F]/50' : 'from-white via-white/50'} to-transparent z-10`}></div>
                <img src={MCOS_ASSETS.security.digitalLock.src} alt="Escrow" className="w-full h-40 md:h-56 object-cover object-top" />
              </div>
            </motion.div>

            {/* تم تطبيق نفس النهج المصغر لباقي البطاقات للحفاظ على الأبعاد... */}
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`md:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-20 mb-6">
                <Zap className="w-10 h-10 md:w-14 md:h-14 text-indigo-400 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{t.bento.ai}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.bento.ai_desc}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#0A0A0F] via-[#0A0A0F]/50' : 'from-white via-white/50'} to-transparent z-10`}></div>
                <img src={MCOS_ASSETS.techAndAi.advisor.src} alt="AI" className="w-full h-40 md:h-56 object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. الفخ التسويقي النهائي - تصميم متوهج داكن متوافق مع النظام */}
      <section className={`py-16 md:py-24 px-4 relative overflow-hidden ${isDarkMode ? 'bg-[#05050A]' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent z-0"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-lg">{t.cta.title}</h2>
          <p className="text-base md:text-2xl text-indigo-200 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">{t.cta.subtitle}</p>
          <Link href={`/${locale}/auth`} className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] items-center gap-2 md:gap-3">
             <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> {t.cta.btn}
          </Link>
        </div>
      </section>

      {/* التذييل */}
      <footer className={`py-10 md:py-16 px-4 border-t relative z-20 ${isDarkMode ? 'bg-[#030305] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <img src={MCOS_ASSETS.branding.logoMain.src} alt="MCOS" className="h-8 md:h-10 mb-4 md:mb-6 mx-auto opacity-80" />
          <p className={`text-xs md:text-sm font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
