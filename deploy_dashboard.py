import os

# دالة كتابة الملفات الآمنة
def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم إنشاء الصفحة الرئيسية: {path}")

# ==========================================
# محتوى الصفحة الرئيسية (Dashboard Home)
# ==========================================
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
      
      {/* 1. Header & Welcome */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">مساء الخير، كريم 👋</h1>
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

      {/* 2. Quick Stats Row */}
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
        
        {/* 3. Main Column (Active Work & Opportunities) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Working */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-500" />
                متابعة العمل
              </h2>
              <Link href="/studio" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                الذهاب للاستوديو <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-yellow-500" /> {/* Status Indicator */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-48 h-28 bg-black rounded-lg flex items-center justify-center relative">
                  <Play className="w-10 h-10 text-white/50" />
                  <div className="absolute bottom-2 right-2 bg-black/60 text-xs px-2 py-1 rounded text-white">01:15 / 03:00</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">إعلان تطبيق وصلة - النسخة 3</h3>
                      <p className="text-slate-400 text-sm mb-3">آخر تعديل: منذ ساعتين</p>
                    </div>
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1 rounded-full border border-yellow-500/20">
                      مراجعة العميل
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2">
                    <div className="bg-indigo-600 h-full rounded-full w-[85%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* New Opportunities */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-500" />
                فرص تناسبك
              </h2>
              <Link href="/marketplace" className="text-sm text-indigo-400 hover:text-indigo-300">عرض الكل</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((job) => (
                <div key={job} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:bg-slate-800 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-slate-800 p-2 rounded-lg"><Briefcase className="w-5 h-5 text-slate-400" /></div>
                    <span className="text-green-400 font-bold text-sm">5000 EGP</span>
                  </div>
                  <h4 className="font-bold mb-1">مونتاج فيديو وثائقي قصير</h4>
                  <p className="text-xs text-slate-500 mb-4">مطلوب مونتير محترف لقص وتلوين فيديو مدته 5 دقائق...</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-slate-950 px-2 py-1 rounded text-slate-400">Premiere Pro</span>
                    <span className="text-[10px] bg-slate-950 px-2 py-1 rounded text-slate-400">Coloring</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* 4. Side Column (Academy & Trends) */}
        <div className="space-y-8">
          
          {/* Academy Progress */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 border-b border-slate-800 pb-4">رحلة التعلم</h3>
            <div className="flex gap-4 items-center mb-4">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-600/30 border-t-indigo-600 flex items-center justify-center font-bold">
                65%
              </div>
              <div>
                <h4 className="font-bold text-sm">ماستر كلاس التلوين</h4>
                <p className="text-xs text-slate-400">الدرس القادم: التعامل مع LUTs</p>
              </div>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm transition-colors">
              استكمال الدرس
            </button>
          </div>

          {/* Market Trends */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
              تريندات السوق
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>طلب عالي: Reels Editing</span>
                <span className="text-green-400 font-bold">+24%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>متوسط سعر الدقيقة</span>
                <span className="text-white font-bold">450 EGP</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/page.tsx", dashboard_code)

print("\n🚀 تم بناء الصفحة الرئيسية (Dashboard Home) بنجاح!")
