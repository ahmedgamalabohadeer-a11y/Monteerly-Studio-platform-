'use client';
import React from 'react';
import { BarChart3, TrendingUp, Users, PieChart, Activity } from 'lucide-react';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { CreatorAnalytics } from '@/components/analytics/CreatorAnalytics';
import { StudioAnalytics } from '@/components/bi/StudioAnalytics';
import { ContentHeatmap } from '@/components/analytics/ContentHeatmap';
import { CreatorStats } from '@/components/dashboard/CreatorStats';

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
        
        {/* Header - لغة الأرقام */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Activity size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Real-time Data Stream</span>
            </div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="text-emerald-500" size={32} />
              مركز البيانات والذكاء الإداري
            </h1>
            <p className="text-slate-400 mt-2 text-sm">تحليل مؤشرات الأداء (KPIs)، الإيرادات، وسلوك المستخدمين بدقة متناهية.</p>
          </div>
        </div>

        {/* الإحصائيات السريعة */}
        <CreatorStats />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* العمود الرئيسي: أداء المحتوى والنمو */}
          <div className="xl:col-span-2 space-y-8">
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
                 <TrendingUp className="text-emerald-400" /> تحليل النمو والانتشار
              </div>
              <CreatorAnalytics />
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
                 <PieChart className="text-indigo-400" /> خريطة تفاعل الجمهور (Heatmap)
              </div>
              <ContentHeatmap />
            </section>
          </div>

          {/* العمود الجانبي: ذكاء الأعمال المالي (BI) */}
          <aside className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 border-r-4 border-r-emerald-500">
              <div className="flex items-center gap-2 mb-6 text-white font-bold text-xl">
                 <BarChart3 className="text-emerald-400" /> ذكاء الأعمال (BI Studio)
              </div>
              <StudioAnalytics />
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6">
               <h4 className="text-indigo-400 font-bold mb-2">توصية النظام (AI Advice)</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                  بناءً على البيانات الحالية، هناك نمو بنسبة 15% في تفاعل "المستوردين" مع فيديوهات الأكاديمية. ننصح بزيادة إنتاج المحتوى التعليمي هذا الأسبوع.
               </p>
            </div>
          </aside>

        </div>
      </div>
    </AnalyticsProvider>
  );
}
