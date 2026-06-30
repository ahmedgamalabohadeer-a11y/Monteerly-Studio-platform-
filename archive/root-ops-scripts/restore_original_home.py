import os

# المسار المستهدف (حيث توجد الصفحة الرئيسية الحالية التي تريد استبدالها)
target_path = "src/app/[locale]/page.tsx"

# المحتوى الأصلي حرفياً من الملف المرفق (FILE #10)
original_content = r'''import Navbar from '@/components/ui/Navbar';
import GallerySection from '@/components/ui/GallerySection';
import Image from 'next/image';
import { Shield, Zap, Globe, ArrowRight, PlayCircle, Lock, Server, Cpu } from 'lucide-react';

// === استيراد الأصول الاستراتيجية ===
import heroBg from '../../public/images/monteerly/monteerly_04_hero_header_marketing_banner.png';
import showcase from '../../public/images/monteerly/monteerly_06_marketing_showcase_full.png';
import securityImg from '../../public/images/monteerly/monteerly_07_tech_innovation_portrait.png'; // تم التصحيح: القفل الأزرق هنا
import collabImg from '../../public/images/monteerly/monteerly_11_global_collaboration_grid_4up.png';
import assetsImg from '../../public/images/monteerly/monteerly_08_branding_creative_assets.png';
import footerBg from '../../public/images/monteerly/monteerly_15_creator_workspace_laptop_modern.png';
import logo from '../../public/images/monteerly/monteerly_02_main_logo_full.svg';
import ahmedProfile from '../../public/images/monteerly/monteerly_03_profile_ahmed_gamal_circle.png';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white" dir="rtl">
      <Navbar />

      {/* === SECTION 1: HERO (مركز القيادة) === */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
        {/* الخلفية البانورامية */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen">
           <Image src={heroBg} alt="System Core" fill className="object-cover" priority />
        </div>
        {/* تدرج لوني عميق */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 w-full pt-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             
            {/* النصوص (العبارات الاحترافية) */}
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-8 border border-blue-500/20 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                نظام التشغيل المركزي (v2.0)
              </div>
              
              <h1 className="mb-6 text-5xl font-extrabold text-white sm:text-7xl leading-[1.1] tracking-tight">
                نظام التشغيل المركزي <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">لصناعة المحتوى الحديثة</span>
              </h1>
              
              <p className="mb-10 text-xl text-slate-400 max-w-2xl leading-relaxed">
                أدر الفوضى، أمّن الأصول، وضاعف الأرباح. منصة واحدة تجمع الاستوديو السحابي، السوق المفتوح، والعقود الذكية في بيئة مشفرة.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button className="rounded-lg bg-blue-600 px-8 py-4 font-bold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 text-lg">
                  أطلق الاستوديو مجاناً 🚀
                </button>
                <button className="rounded-lg bg-white/5 border border-white/10 px-8 py-4 font-bold text-white hover:bg-white/10 transition backdrop-blur-sm flex items-center justify-center gap-2">
                  <PlayCircle size={20} /> عرض تجريبي للنظام
                </button>
              </div>
              
              <p className="mt-6 text-sm text-slate-500 font-mono">
                * تشفير AES-256 نشط • ضمان مالي Escrow • نسخ احتياطي سحابي
              </p>
            </div>

            {/* الصورة العائمة (واجهة النظام) */}
            <div className="flex-1 hidden lg:block perspective-1000">
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm transform rotate-y-6 hover:rotate-0 transition duration-1000 ease-out">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <Image src={showcase} alt="System Interface" className="object-cover w-full h-full" />
                </div>
                {/* عناصر عائمة */}
                <div className="absolute -left-10 top-1/2 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 animate-pulse-slow">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><Server size={20}/></div>
                  <div>
                    <p className="text-xs text-slate-400">حالة السيرفر</p>
                    <p className="text-sm font-bold text-white">متصل وآمن</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: المميزات (البنية التحتية) === */}
      <section className="py-32 bg-white relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">البنية التحتية للنظام</h2>
            <p className="text-xl text-slate-500">أدوات مصممة خصيصاً للمؤسسات والفرق الاحترافية</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* ميزة الأمان */}
            <div className="group rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:border-blue-200 transition hover:shadow-xl hover:-translate-y-1">
              <div className="mb-8 relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                 <Image src={securityImg} alt="Military Grade Security" fill className="object-cover opacity-90 group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
              </div>
              <h3 className="mb-3 text-2xl font-bold flex items-center gap-3 text-slate-900">
                <Lock className="text-blue-600" size={28} /> حماية عسكرية
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                أعمالك ليست مجرد ملفات، هي أصول رقمية. نحميها بتشفير <span className="font-mono font-bold text-slate-800">AES-256</span> ونظام الضمان المالي (Escrow) حتى التسليم.
              </p>
            </div>

            {/* ميزة التعاون */}
            <div className="group rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:border-blue-200 transition hover:shadow-xl hover:-translate-y-1">
              <div className="mb-8 relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                 <Image src={collabImg} alt="Global Command Center" fill className="object-cover opacity-90 group-hover:scale-105 transition duration-700" />
              </div>
              <h3 className="mb-3 text-2xl font-bold flex items-center gap-3 text-slate-900">
                <Globe className="text-indigo-600" size={28} /> غرفة عمليات عالمية
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                اربط فريقك الموزع حول العالم في بيئة عمل موحدة. تزامن لحظي، صلاحيات دقيقة، وإدارة مركزية للمهام.
              </p>
            </div>

            {/* ميزة الأصول */}
            <div className="group rounded-3xl bg-slate-50 p-8 border border-slate-100 hover:border-blue-200 transition hover:shadow-xl hover:-translate-y-1">
              <div className="mb-8 relative h-64 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                 <Image src={assetsImg} alt="Asset Management" fill className="object-cover opacity-90 group-hover:scale-105 transition duration-700" />
              </div>
              <h3 className="mb-3 text-2xl font-bold flex items-center gap-3 text-slate-900">
                <Cpu className="text-amber-600" size={28} /> إدارة الأصول الذكية
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                مكتبة مركزية لهويتك البصرية. النظام يضمن استخدام النسخ الصحيحة والمرخصة فقط في جميع مشاريعك.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 3: المعرض (القدرات البصرية) === */}
      <GallerySection />

      {/* === SECTION 4: التذييل (نهاية النظام) === */}
      <footer className="bg-slate-950 pt-24 pb-12 text-slate-400 border-t border-slate-800 relative overflow-hidden">
        {/* خلفية جمالية */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Image src={footerBg} alt="Footer BG" fill className="object-cover grayscale" />
        </div>

        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid gap-12 lg:grid-cols-4 mb-16">
            
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                 <Image src={logo} alt="Logo" width={40} height={40} />
                 <span className="text-xl font-bold text-white">Monteerly OS</span>
              </div>
              <p className="mb-6 leading-relaxed text-sm">
                النظام السيادي الأول لإدارة الإنتاج الإعلامي.
                نحول الفوضى الإبداعية إلى تدفق رقمي منظم.
              </p>
              {/* مؤسس */}
              <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={ahmedProfile} alt="CEO" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">كلمة المؤسس</p>
                  <p className="text-sm font-bold text-white">أحمد جمال</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">النظام</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">الاستوديو السحابي</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">السوق المفتوح</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">بروتوكول الأمان</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">حالة النظام</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">الموارد</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">الأكاديمية</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">API المطورين</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">الشروط والأحكام</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">جاهز للانطلاق؟</h4>
              <p className="text-sm mb-4">انضم للنخبة اليوم.</p>
              <button className="w-full rounded-lg bg-blue-600 py-3 text-white font-bold hover:bg-blue-500 transition">
                فتح حساب جديد
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm font-mono text-slate-600">
            © 2026 Monteerly Inc. All Systems Operational.
          </div>
        </div>
      </footer>
    </main>
  );
}
'''

# كتابة الملف
os.makedirs(os.path.dirname(target_path), exist_ok=True)
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(original_content)

print(f"✅ تم استعادة الملف الأصلي بنجاح: {target_path}")
