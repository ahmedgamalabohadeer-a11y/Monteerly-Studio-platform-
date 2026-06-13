'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  PlayCircle, ShieldCheck, Zap, Users, ArrowLeft, MonitorPlay, 
  Camera, Briefcase, Moon, Sun, Lock, CheckCircle2, Video
} from 'lucide-react';
import arDict from '@/messages/ar.json';
import enDict from '@/messages/en.json';

export default function UltimateLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale as 'ar' | 'en';
  const isAr = locale === 'ar';
  
  const t = isAr ? arDict : enDict;
  const router = useRouter();
  const pathname = usePathname();





  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleLanguage = () => {
    const newLocale = isAr ? 'en' : 'ar';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const [activePersona, setActivePersona] = useState('editor');
  const personas = {
    editor: { id: 'editor', title: t.personas?.editor || 'المونتير', icon: <MonitorPlay className="w-4 h-4 md:w-5 md:h-5"/>, img: '/images/monteerly/monteerly_12_editor_red_shirt_timeline.png', desc: t.personas?.editor_desc || 'مساحة عمل احترافية' },
    photographer: { id: 'photographer', title: t.personas?.photographer || 'المصور', icon: <Camera className="w-4 h-4 md:w-5 md:h-5"/>, img: '/images/monteerly/monteerly_21_photographer_saudi_heritage_traditional.png', desc: t.personas?.photographer_desc || 'بيع حقوق لقطاتك الحصرية' },
    creator: { id: 'creator', title: t.personas?.creator || 'صانع المحتوى', icon: <Zap className="w-4 h-4 md:w-5 md:h-5"/>, img: '/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png', desc: t.personas?.creator_desc || 'أدر مشاريعك بأمان تام' },
    agency: { id: 'agency', title: t.personas?.agency || 'الوكالات', icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5"/>, img: '/images/monteerly/monteerly_11_global_collaboration_grid_4up.png', desc: t.personas?.agency_desc || 'تحكم كامل في فريقك' },
  };
  const activeData = personas[activePersona as keyof typeof personas];

  if (!mounted) return <div className="min-h-screen bg-[#05050A]"></div>;

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-[#05050A] text-slate-50' : 'bg-slate-50 text-slate-900'} selection:bg-indigo-500/30 overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>

      {/* Navbar الموحد والذكي للونين */}
      
      {/* شريط الحالة السيادي */}
      <div className="bg-indigo-950/30 border-b border-indigo-500/20 text-center py-1 text-[10px] md:text-xs font-bold text-indigo-300 tracking-widest uppercase">
         {isAr ? 'جميع الاتصالات مشفرة | Monteerly OS V5.0 ACTIVE' : 'SECURED END-TO-END | Monteerly OS V5.0 ACTIVE'}
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b ${isDarkMode ? 'bg-[#05050A]/80 border-white/5' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-3">
              <Image src="/images/monteerly/monteerly_01_favicon_app_icon.png" alt="MCOS" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg rounded-md" />
              <span className="font-black text-lg md:text-xl tracking-tight hidden sm:block">Monteerly <span className="text-indigo-500">OS</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 font-bold text-sm">
              <Link href="#ecosystem" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}>{isAr ? 'المنظومة' : 'Ecosystem'}</Link>
              <Link href="#library" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}>{isAr ? 'المكتبة' : 'Library'}</Link>
              <Link href="#pricing" className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-indigo-600'}`}>{isAr ? 'الأسعار' : 'Pricing'}</Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={toggleLanguage} className={`font-bold text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg transition-colors border ${isDarkMode ? 'border-white/10 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-800 shadow-sm'}`}>
              {isAr ? 'English' : 'عربي'}
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-1.5 md:p-2 rounded-full transition-colors border ${isDarkMode ? 'border-white/10 bg-slate-800 text-amber-400 hover:bg-slate-700' : 'border-slate-300 bg-white text-indigo-600 hover:bg-slate-100 shadow-sm'}`}>
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href={`/${locale}/auth`} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] flex items-center gap-1.5 md:gap-2">
              <Lock className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden xs:inline">{t.nav?.login || (isAr ? 'دخول' : 'Login')}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 z-10 bg-gradient-to-b ${isDarkMode ? 'from-[#05050A]/70 via-[#05050A]/90 to-[#05050A]' : 'from-slate-50/80 via-slate-50/95 to-slate-50'}`}></div>
          <Image src="/images/monteerly/monteerly_04_hero_header_marketing_banner.png" alt="Hero" fill priority className={`object-cover scale-105 mix-blend-overlay ${isDarkMode ? 'opacity-40' : 'opacity-20'}`} />
        </div>

        <div className="relative z-20 text-center max-w-5xl px-4 w-full mt-4 md:mt-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-black mb-6 md:mb-8 border backdrop-blur-md shadow-lg ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-100 text-emerald-700 border-emerald-300'}`}>
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> {t.hero?.badge || 'الإطلاق التجريبي'}
            </div>
            <h1 className={`text-4xl sm:text-5xl md:text-[5.5rem] font-black mb-6 md:mb-8 leading-tight md:leading-[1.1] tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {t.hero?.title1 || 'النظام الإبداعي السيادي'} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 drop-shadow-lg">{t.hero?.title_highlight || 'الأول في الشرق الأوسط'}</span><br className="hidden sm:block" />
            </h1>
            <p className={`text-base md:text-2xl mb-8 md:mb-14 max-w-3xl mx-auto leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {t.hero?.subtitle || 'منصة متكاملة تجمع بين إدارة المشاريع، محرك الدفع الآمن، ومكتبة الأصول المرئية.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-5 px-4">
              <Link href={`/${locale}/auth`} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:-translate-y-1">
                {t.hero?.deploy_btn || 'ابدأ الآن'} {isAr ? <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> : null}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className={`py-6 md:py-8 border-y ${isDarkMode ? 'bg-[#0A0A0F] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <p className={`text-center text-xs md:text-sm font-bold mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {isAr ? 'محمي وموثق مالياً عبر شركائنا' : 'Secured & Trusted by Partners'}
          </p>
          <div className={`flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 transition-all duration-500 ${isDarkMode ? 'grayscale hover:grayscale-0' : 'grayscale-0'}`}>
            <span className="text-xl font-black tracking-widest text-slate-800 dark:text-white">PAYMOB</span>
            <span className="text-xl font-black tracking-widest italic text-blue-800 dark:text-white">VISA</span>
            <span className="text-xl font-black tracking-widest text-red-600 dark:text-white">MasterCard</span>
            <span className="text-xl font-black tracking-widest italic text-blue-500">PayPal</span>
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="py-16 md:py-32 px-4 overflow-hidden" id="ecosystem">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">{t.personas?.title || 'صُمم خصيصاً لك'}</h2>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar snap-x gap-2 md:gap-3 mb-10 md:mb-16 relative z-20 pb-4 justify-start md:justify-center w-full px-2">
            {Object.values(personas).map((p) => (
              <button key={p.id} onClick={() => setActivePersona(p.id)} className={`flex-shrink-0 snap-center flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg transition-all ${activePersona === p.id ? 'bg-indigo-600 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] md:-translate-y-1' : isDarkMode ? 'bg-[#0A0A0F] border border-white/5 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'}`}>
                {p.icon} {p.title}
              </button>
            ))}
          </div>
          <motion.div key={activeData.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={`relative rounded-3xl md:rounded-[3rem] overflow-hidden border p-6 md:p-20 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isDarkMode ? 'bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
             <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
             <div className="flex-1 z-10 text-center md:text-right">
               <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">{activeData.title}</h3>
               <p className={`text-base md:text-2xl leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{activeData.desc}</p>
             </div>
             <div className="flex-1 w-full relative z-10 group mt-4 md:mt-0">
               <Image src={activeData.img} alt={activeData.title} width={800} height={600} className="w-full h-auto rounded-xl md:rounded-2xl shadow-xl md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className={`py-16 md:py-32 px-4 relative ${isDarkMode ? 'bg-[#030305]' : 'bg-slate-100'}`} id="library">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6">{t.bento?.title || 'أقوى منظومة تشغيل'}</h2>
            <p className={`text-base md:text-xl max-w-2xl mx-auto font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{t.bento?.subtitle || 'كل ما تحتاجه لإدارة أعمالك الإبداعية في مكان واحد'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            <div className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="relative z-20 mb-6">
                <ShieldCheck className="w-10 h-10 md:w-14 md:h-14 text-emerald-500 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{isAr ? 'الضمان المالي (Escrow)' : 'Financial Escrow'}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{isAr ? 'أموالك محفوظة ومحمية برمجياً حتى يتم تسليم المشروع بنجاح.' : 'Your money is secured programmatically until successful delivery.'}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl">
                <Image src="/images/monteerly/monteerly_05_security_digital_lock_cyber.png" alt="Escrow" width={600} height={400} className="w-full h-40 md:h-56 object-cover object-center opacity-80" />
              </div>
            </div>

            <div className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="relative z-20 mb-6">
                <Zap className="w-10 h-10 md:w-14 md:h-14 text-indigo-500 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{isAr ? 'وكلاء الذكاء الاصطناعي' : 'AI Agents Mesh'}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{isAr ? 'مساعد شخصي يحلل طلباتك ويرشح لك أفضل المستقلين تلقائياً.' : 'Personal assistant matching you with top talents automatically.'}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl">
                <Image src="/images/monteerly/monteerly_09_ai_performance_advisor_hologram.png" alt="AI" width={600} height={400} className="w-full h-40 md:h-56 object-cover object-center opacity-80" />
              </div>
            </div>

            <div className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="relative z-20 mb-6">
                <Video className="w-10 h-10 md:w-14 md:h-14 text-pink-500 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{isAr ? 'مكتبة الأصول الواقعية' : 'Stock Footage Library'}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{isAr ? 'آلاف اللقطات الحصرية المتوافقة مع السوق العربي بنظام تراخيص ذكي.' : 'Thousands of exclusive shots tailored for the Arab market.'}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl">
                <Image src="/images/monteerly/monteerly_23_photographer_library_heritage_cinematic.png" alt="Library" width={600} height={400} className="w-full h-40 md:h-56 object-cover object-center opacity-80" />
              </div>
            </div>

            {/* تم الإصلاح: تصحيح الـ Crop إلى object-center */}
            <div className={`col-span-1 lg:col-span-2 p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border overflow-hidden relative group flex flex-col justify-between min-h-[350px] md:min-h-[450px] ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="relative z-20 mb-6">
                <Users className="w-10 h-10 md:w-14 md:h-14 text-amber-500 mb-4 md:mb-6" />
                <h3 className="text-xl md:text-3xl font-black mb-2 md:mb-4">{isAr ? 'الأكاديمية والمجتمع' : 'Academy & Community'}</h3>
                <p className={`text-sm md:text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{isAr ? 'ارتقِ بمهاراتك من خلال دورات متخصصة ومجتمع مهني داعم.' : 'Level up your skills with specialized courses and community.'}</p>
              </div>
              <div className="relative z-10 -mx-6 -mb-6 md:-mx-12 md:-mb-12 mt-auto bg-slate-900 rounded-b-3xl">
                <Image src="/images/monteerly/monteerly_16_editor_arab_thobe_collaboration.png" alt="Academy" width={600} height={400} className="w-full h-40 md:h-56 object-cover object-center opacity-80" />
              </div>
            </div>

          </div>
        </div>
      </section>

      
      {/* قسم الشهادات */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <h2 className="text-3xl font-black">{isAr ? 'قالوا عن النظام' : 'Trusted by Creators'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* شهادة 1 */}
           <div className="p-6 rounded-2xl border bg-slate-900/50 border-white/5">
              <p className="text-sm italic mb-4">{isAr ? 'المنصة تمنح فرقنا سرعة أوضح وحوكمة أفضل.' : 'The platform gives our teams clear speed and better governance.'}</p>
              <div className="font-bold">سارة أحمد - مدير إبداعي</div>
           </div>
           {/* (يمكنك إضافة المزيد هنا بنفس النمط) */}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-32 px-4" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">{isAr ? 'خطط مرنة لجميع المستويات' : 'Flexible Plans for Everyone'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className={`p-8 rounded-3xl border text-center ${isDarkMode ? 'bg-[#0A0A0F] border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}>
              <h3 className="text-2xl font-bold mb-2">Rookie</h3>
              <p className="text-4xl font-black mb-6 text-indigo-600">{isAr ? 'مجاني' : 'Free'}</p>
              <ul className="text-right space-y-4 mb-8">
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> {isAr ? 'تخزين 5GB مجاناً' : '5GB Storage'}</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> {isAr ? 'مساحة عمل أساسية' : 'Basic Workspace'}</li>
              </ul>
              <Link href={`/${locale}/auth`} className="block w-full py-3 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all">
                {isAr ? 'سجل مجاناً' : 'Join for Free'}
              </Link>
            </div>
            
            <div className={`p-8 rounded-3xl border text-center relative overflow-hidden ${isDarkMode ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200 shadow-xl'}`}>
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">{isAr ? 'الأكثر طلباً' : 'Popular'}</div>
              <h3 className="text-2xl font-bold mb-2">Pro & Enterprise</h3>
              <p className="text-4xl font-black mb-6 text-indigo-600">{isAr ? 'مخصص' : 'Custom'}</p>
              <ul className="text-right space-y-4 mb-8">
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-indigo-600"/> {isAr ? 'مساحات تخزين غير محدودة (R2)' : 'Unlimited R2 Storage'}</li>
                <li className="flex gap-2 items-center"><CheckCircle2 className="w-5 h-5 text-indigo-600"/> {isAr ? 'عمولات مخفضة وفواتير ضريبية' : 'Reduced Fees & Tax Invoices'}</li>
              </ul>
              <Link href={`/${locale}/auth`} className="block w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg">
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-16 md:py-24 px-4 relative overflow-hidden ${isDarkMode ? 'bg-[#05050A]' : 'bg-slate-900'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent z-0"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-lg">{t.cta?.title || 'مستعد للارتقاء بأعمالك؟'}</h2>
          <p className="text-base md:text-2xl text-indigo-200 mb-8 md:mb-12 max-w-2xl mx-auto font-medium">{t.cta?.subtitle || 'انضم لآلاف المبدعين الذين يثقون في منصتنا.'}</p>
          <Link href={`/${locale}/auth`} className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all shadow-[0_0_30px_rgba(79,70,229,0.4)] items-center gap-2 md:gap-3">
             <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /> {t.cta?.btn || 'أنشئ حسابك الآن'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 md:py-16 px-4 border-t relative z-20 ${isDarkMode ? 'bg-[#030305] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-4 opacity-90">
                <Image src="/images/monteerly/monteerly_01_favicon_app_icon.png" alt="MCOS Icon" width={32} height={32} className="rounded-md" />
                <span className="font-black text-xl tracking-tight">Monteerly <span className="text-indigo-600">OS</span></span>
             </div>
             <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} max-w-sm`}>
               {isAr ? 'نظام التشغيل الإبداعي السيادي الأول في الشرق الأوسط، يربط المواهب بالفرص في بيئة آمنة.' : 'The first sovereign creative OS in the Middle East.'}
             </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{isAr ? 'المنصة' : 'Platform'}</h4>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><Link href="#ecosystem" className="hover:text-indigo-600">{isAr ? 'السوق' : 'Marketplace'}</Link></li>
              <li><Link href="#library" className="hover:text-indigo-600">{isAr ? 'المكتبة' : 'Library'}</Link></li>
              <li><Link href="#pricing" className="hover:text-indigo-600">{isAr ? 'الأسعار' : 'Pricing'}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{isAr ? 'قانوني' : 'Legal'}</h4>
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <li><Link href="#" className="hover:text-indigo-600">{isAr ? 'شروط الاستخدام' : 'Terms of Service'}</Link></li>
              <li><Link href="#" className="hover:text-indigo-600">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
            </ul>
          </div>
        </div>
        <div className={`text-center pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
          <p className={`text-xs md:text-sm font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Monteerly Studio. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
