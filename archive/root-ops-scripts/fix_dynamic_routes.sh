cat << 'EOF' > upgrade_dashboard_full.py
import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ تم تحديث لوحة التحكم بنجاح: {path}")

# ==============================================================================
# كود لوحة التحكم الشاملة (Super Dashboard)
# ==============================================================================
dashboard_code = """'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, DollarSign, Briefcase, Play, 
  ArrowLeft, Clock, Star, TrendingUp, Bell,
  Shield, Users, Zap, Search, MoreVertical,
  CheckCircle2, AlertCircle, Layers
} from 'lucide-react';

// --- بيانات تجريبية (محاكاة قاعدة البيانات) ---
const STATS = [
  { label: "إجمالي الرصيد", val: "42,450 EGP", sub: "+12% هذا الشهر", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { label: "مشاريع نشطة", val: "5 مشاريع", sub: "2 في المراجعة", icon: Layers, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: "ساعات الإنتاج", val: "142 ساعة", sub: "الأسبوع الحالي", icon: Clock, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { label: "حالة الحارس", val: "آمن", sub: "تم تأمين 3 دفعات", icon: Shield, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
];

const ACTIVE_PROJECTS = [
  { 
    id: 1, 
    title: "إعلان تطبيق وصلة - رمضان 2026", 
    client: "Wasla App", 
    status: "Review", 
    progress: 90, 
    deadline: "2 يوم",
    type: "Montage"
  },
  { 
    id: 2, 
    title: "وثائقي الحرف اليدوية - الحلقة 3", 
    client: "Culture TV", 
    status: "In Progress", 
    progress: 45, 
    deadline: "5 أيام",
    type: "Coloring"
  },
  { 
    id: 3, 
    title: "تغطية مؤتمر TechLeap", 
    client: "Tech KSA", 
    status: "Pending Assets", 
    progress: 10, 
    deadline: "أسبوع",
    type: "VFX"
  },
];

const TEAM_ACTIVITY = [
  { user: "سارة حسن", action: "رفعت ملفات جديدة", project: "مشروع بيبسي", time: "منذ 10د" },
  { user: "أحمد علي", action: "أكمل تلوين المشهد 3", project: "وثائقي النيل", time: "منذ 45د" },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6 lg:p-10 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 1. Header (مركز القيادة) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/5 pb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-400 tracking-wider">SYSTEM STATUS: ONLINE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            لوحة القيادة <span className="text-slate-600">/</span> كريم 👋
          </h1>
          <p className="text-slate-400">ملخص نشاطك الإبداعي، المالي، وإدارة الفريق.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* شريط البحث السريع */}
          <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 w-64 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
            <Search className="w-4 h-4 text-slate-500 ml-3" />
            <input type="text" placeholder="بحث في النظام..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-600" />
            <span className="text-xs text-slate-600 font-mono bg-slate-800 px-1.5 rounded">⌘K</span>
          </div>

          <button className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 transition-colors relative group">
            <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-[#020817]"></span>
          </button>
          
          <Link href="/studio" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 hover:scale-[1.02] active:scale-95">
            <Zap className="w-4 h-4 fill-current" />
            مشروع جديد
          </Link>
        </div>
      </header>

      {/* 2. Stats Grid (نظرة عامة على الأداء) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {STATS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-slate-900/50 backdrop-blur-sm border ${stat.border} p-6 rounded-3xl relative overflow-hidden group hover:bg-slate-900 transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              {i === 3 && <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />}
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-1 tracking-tight">{stat.val}</h3>
              <p className="text-slate-400 text-xs font-medium mb-1">{stat.label}</p>
              <p className={`text-xs ${stat.color} font-mono bg-white/5 inline-block px-2 py-0.5 rounded`}>{stat.sub}</p>
            </div>
            {/* Decoration */}
            <div className={`absolute -bottom-4 -left-4 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 3. Main Column (Projects & Workspace) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Active Workspace Card (بطاقة العمل الحالية) */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-500" />
                متابعة العمل فوراً
              </h2>
              <Link href="/studio" className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline">
                الذهاب للاستوديو <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-slate-900 to-[#0f172a] border border-slate-800 rounded-3xl p-6 relative overflow-hidden group cursor-pointer hover:border-indigo-500/50 transition-all shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-1.5 h-full bg-yellow-500" /> {/* Status Indicator Line */}
              <div className="flex flex-col md:flex-row gap-6 items-center">
                
                {/* Thumbnail Preview */}
                <div className="w-full md:w-56 h-32 bg-black rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur text-[10px] px-2 py-1 rounded text-white border border-white/10 font-mono">01:15 / 03:00</div>
                </div>

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">Montage</span>
                        <h3 className="text-xl font-bold">إعلان تطبيق وصلة - النسخة 3</h3>
                      </div>
                      <p className="text-slate-400 text-sm flex items-center gap-2">
                        <Clock className="w-3 h-3" /> آخر تعديل: منذ ساعتين
                      </p>
                    </div>
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1.5 rounded-lg border border-yellow-500/20 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> مراجعة العميل
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1.5 text-slate-400">
                      <span>التقدم الإجمالي</span>
                      <span className="text-white font-mono">85%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "85%" }} 
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-500 h-full rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Project Table (جدول المشاريع) */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              أحدث المشاريع
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                  <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-4 font-medium">اسم المشروع</th>
                      <th className="p-4 font-medium">العميل</th>
                      <th className="p-4 font-medium">النوع</th>
                      <th className="p-4 font-medium">الموعد النهائي</th>
                      <th className="p-4 font-medium">الحالة</th>
                      <th className="p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {ACTIVE_PROJECTS.map((proj) => (
                      <tr key={proj.id} className="hover:bg-slate-800/50 transition-colors group">
                        <td className="p-4 font-bold text-white group-hover:text-indigo-400 transition-colors">{proj.title}</td>
                        <td className="p-4 text-slate-400">{proj.client}</td>
                        <td className="p-4">
                          <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs border border-slate-700">{proj.type}</span>
                        </td>
                        <td className="p-4 text-slate-400 font-mono">{proj.deadline}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold border ${
                            proj.status === 'Review' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            proj.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {proj.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="p-1.5 hover:bg-slate-700 rounded text-slate-500 hover:text-white transition">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-slate-800 text-center">
                <Link href="/studio" className="text-xs text-slate-500 hover:text-white transition">عرض كل المشاريع ({STATS[1].val})</Link>
              </div>
            </div>
          </section>
        </div>

        {/* 4. Side Widgets (الأدوات الجانبية) */}
        <div className="space-y-8">
          
          {/* Academy / Gamification Widget (التلعيب) */}
          <div className="bg-gradient-to-b from-[#1e1b4b] to-slate-900 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  المستوى الحالي
                </h3>
                <span className="text-2xl font-black text-white italic">LVL.05</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 bg-slate-900/50 h-3 rounded-full overflow-hidden border border-white/10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full w-[65%]" />
                </div>
                <span className="text-xs font-mono text-yellow-400">1250/2000 XP</span>
              </div>
              
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 mb-4 backdrop-blur-sm">
                <h4 className="font-bold text-sm mb-1 text-indigo-300">الهدف القادم: ماستر كلاس التلوين</h4>
                <p className="text-xs text-slate-400">أكمل الدرس للحصول على +500 نقطة</p>
              </div>

              <Link href="/academy" className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4" /> استكمال التعلم
              </Link>
            </div>
          </div>

          {/* Agency / Team Widget (نشاط الوكالة) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                نشاط الفريق
              </h3>
              <Link href="/agency" className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition">إدارة</Link>
            </div>
            <div className="space-y-5">
              {TEAM_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex gap-3 relative pl-4">
                  <div className="absolute right-[5px] top-2 bottom-0 w-[1px] bg-slate-800 last:hidden" />
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 relative z-10 ring-4 ring-slate-900" />
                  <div>
                    <p className="text-sm text-slate-300">
                      <span className="font-bold text-white">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.project} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Widget (تريندات السوق) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              فرص السوق
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span>مطلوب: Reels Editor</span>
                <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded text-xs">+5 جديد</span>
              </div>
              <div className="flex items-center justify-between text-sm bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span>مطلوب: Colorist</span>
                <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded text-xs">+2 جديد</span>
              </div>
            </div>
            <Link href="/marketplace" className="block text-center text-xs text-slate-500 hover:text-white mt-4 transition">عرض كل الفرص</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
"""
write_file("src/app/[locale]/dashboard/page.tsx", dashboard_code)
EOF

python3 upgrade_dashboard_full.py
