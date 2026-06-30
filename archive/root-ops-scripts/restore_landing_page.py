import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم إنشاء: {path}")

# ========================================================
# 1. نقل لوحة التحكم الحالية إلى مسار جديد (/dashboard)
# ========================================================
dashboard_code = """'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, DollarSign, Briefcase, Play, 
  ArrowLeft, Clock, Star, TrendingUp, Bell 
} from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">لوحة التحكم، كريم 👋</h1>
          <p className="text-slate-400">إليك ملخص نشاطك الإبداعي اليوم.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
            + مشروع جديد
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "الرصيد المتاح", val: "12,450 EGP", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "مشاريع نشطة", val: "3", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "ساعات العمل", val: "142 ساعة", icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "تقييمك", val: "4.9/5", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 transition-colors"
          >
            <div>
              <p className="text-slate-400 text-xs font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.val}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Play className="w-5 h-5 text-indigo-500" /> متابعة العمل</h2>
              <Link href="/studio" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">الذهاب للاستوديو <ArrowLeft className="w-4 h-4" /></Link>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all">
              <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500" />
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-28 bg-black rounded-lg flex items-center justify-center relative">
                  <Play className="w-10 h-10 text-white/50" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-xs px-2 py-1 rounded text-white">01:15 / 03:00</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div><h3 className="text-xl font-bold mb-1">إعلان تطبيق وصلة - النسخة 3</h3><p className="text-slate-400 text-sm mb-3">آخر تعديل: منذ ساعتين</p></div>
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1 rounded-full border border-yellow-500/20">مراجعة العميل</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2"><div className="bg-indigo-600 h-full rounded-full w-[85%]" /></div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
        
        {/* Side Column */}
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-400"><TrendingUp className="w-4 h-4" /> تريندات السوق</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm"><span>طلب عالي: Reels Editing</span><span className="text-green-400 font-bold">+24%</span></div>
              <div className="flex items-center justify-between text-sm"><span>متوسط سعر الدقيقة</span><span className="text-white font-bold">450 EGP</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/dashboard/page.tsx", dashboard_code)

# ========================================================
# 2. استعادة الصفحة الرئيسية الأصلية (Landing Page)
# ========================================================
landing_page_code = """'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Play, Shield, Zap, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Navbar (Landing Style) */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          مونتيرلي ستوديو
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-white transition-colors">المميزات</Link>
          <Link href="#solutions" className="hover:text-white transition-colors">الحلول</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">الأسعار</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-slate-300 hover:text-white font-medium py-2 px-4">
            تسجيل الدخول
          </Link>
          <Link href="/dashboard" className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold hover:bg-slate-200 transition-colors">
            ابدأ مجاناً
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-1.5 text-sm text-indigo-400 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              الآن: الإصدار 2.0 متاح للشركات
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              نظام التشغيل المتكامل <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
                لاقتصاد المبدعين
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              وداعاً لرسائل الواتساب وفوضى الإيميلات. منصة واحدة تجمع إدارة المشاريع، 
              المدفوعات الآمنة، وأدوات التعاون الفني في مكان واحد.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-indigo-600/25">
                أنشئ استوديو مجاناً
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto bg-slate-900/50 hover:bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all backdrop-blur-sm">
                <Play className="w-5 h-5 fill-current" />
                شاهد كيف يعمل
              </button>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl shadow-indigo-900/20 overflow-hidden">
              <div className="bg-slate-950 rounded-xl overflow-hidden aspect-[16/9] relative flex items-center justify-center border border-slate-800/50">
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Play className="w-8 h-8 text-indigo-400 fill-current" />
                  </div>
                  <p className="text-slate-500 font-mono text-sm">Dashboard Interface Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative z-10 bg-slate-950" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">سير عمل فائق السرعة</h3>
              <p className="text-slate-400 leading-relaxed">
                أدوات مراجعة الفيديو (Frame-by-frame)، التعليقات المباشرة، وإدارة النسخ. 
                كل ما تحتاجه لتسليم المشاريع في نصف الوقت.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 transition-colors group">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">نظام "الحارس" الأمني</h3>
              <p className="text-slate-400 leading-relaxed">
                احمِ حقوقك المالية بنظام Escrow المتطور. لا تبدأ العمل قبل تأمين الدفعة، 
                ولا تدفع قبل استلام العمل بالجودة المطلوبة.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">توسع في السوق العربي</h3>
              <p className="text-slate-400 leading-relaxed">
                واجهة عربية بالكامل، دعم فني محلي، وتكامل مع بوابات الدفع المصرية والسعودية. 
                نحن نفهم احتياجات السوق المحلي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">جاهز لنقل عملك للمستوى التالي؟</h2>
            <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto relative z-10">
              انضم لأكثر من 5000 مبدع وشركة يستخدمون مونتيرلي يومياً.
            </p>
            <Link href="/dashboard" className="inline-flex bg-white text-indigo-900 px-8 py-4 rounded-xl font-bold text-lg items-center gap-2 hover:bg-indigo-50 transition-colors relative z-10">
              ابدأ تجربتك المجانية
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950 text-center text-slate-500 text-sm">
        <p>© 2026 Monteerly Studio. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
"""
write_file("src/app/[locale]/page.tsx", landing_page_code)

# ========================================================
# 3. تحديث الشريط الجانبي (Sidebar) ليشير إلى الرابط الصحيح
# ========================================================
sidebar_code = """'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ShoppingBag, Clapperboard, GraduationCap, MessageSquare, Users, Building2, Settings, Home } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'لوحة التحكم', path: '/dashboard', icon: LayoutGrid },
  { name: 'الرئيسية (الزوار)', path: '/', icon: Home }, // رابط للعودة للصفحة الرئيسية
  { name: 'سوق العمل', path: '/marketplace', icon: ShoppingBag },
  { name: 'الاستوديو', path: '/studio', icon: Clapperboard },
  { name: 'الأكاديمية', path: '/academy', icon: GraduationCap },
  { name: 'الرسائل', path: '/messages', icon: MessageSquare },
  { name: 'المجتمع', path: '/community', icon: Users },
  { name: 'الوكالة', path: '/agency', icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  // إخفاء الشريط الجانبي في الصفحة الرئيسية التسويقية
  if (pathname === '/' || pathname === '/en' || pathname === '/ar') return null;

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.includes(path)) return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-slate-900 border-l border-slate-800 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          مونتيرلي ستوديو
        </h1>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
              {active && <span className="mr-auto w-1.5 h-1.5 bg-white rounded-full" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">K</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">كريم المونتير</p>
            <p className="text-xs text-slate-500 truncate">محترف | Level 5</p>
          </div>
          <button className="text-slate-400 hover:text-white"><Settings className="w-4 h-4" /></button>
        </div>
      </div>
    </aside>
  );
}
"""
write_file("src/components/Sidebar.tsx", sidebar_code)

print("\n🚀 تم استعادة الصفحة الرئيسية الأصلية ونقل لوحة التحكم إلى /dashboard بنجاح.")
