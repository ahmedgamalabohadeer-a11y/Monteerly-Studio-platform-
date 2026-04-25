'use client';
import React from 'react';
import { ShoppingBag, Search, Filter, Sparkles, Map as MapIcon } from 'lucide-react';
import { ExpertCard } from '@/components/market/ExpertCard';
import { TalentMap } from '@/components/market/TalentMap';
import { AiMatcher } from '@/components/market/AiMatcher';
import { DesktopFilters } from '@/components/market/DesktopFilters';

export default function MarketplacePage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      
      {/* Header مع محرك بحث احترافي */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingBag className="text-purple-500" size={32} />
            سوق المبدعين والخبراء
          </h1>
          <p className="text-slate-400 mt-2 text-sm">وظف أفضل المحترفين لمشاريع المونتاج والتجارة الدولية.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="ابحث عن خبير، مهنة، أو مهارة..." 
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pr-10 pl-4 text-white outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* قسم المطابقة بالذكاء الاصطناعي (AI Matcher) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-8">
        <div className="absolute top-0 left-0 p-4 opacity-10">
          <Sparkles size={120} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4 text-indigo-400">
             <Sparkles size={20} />
             <span className="font-bold text-sm uppercase tracking-wider">الترشيح الذكي</span>
          </div>
          <AiMatcher />
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* الفلاتر الجانبية */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-6">
             <div className="flex items-center gap-2 text-white font-bold mb-4">
                <Filter size={18} /> تصفية النتائج
             </div>
             <DesktopFilters />
          </div>
        </aside>

        {/* عرض المواهب والخريطة */}
        <div className="xl:col-span-3 space-y-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapIcon className="text-blue-400" />
              <h2 className="text-xl font-bold text-white">توزيع الكفاءات العالمي</h2>
            </div>
            <div className="h-64 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
               <TalentMap />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* عرض عينات من الخبراء (سيتم ربطها لاحقاً بـ API) */}
            <ExpertCard 
              name="أحمد كمال" 
              role="خبير مونتاج سينمائي" 
              rating={4.9} 
              hourlyRate="$45" 
              tags={['Final Cut', 'AI Upscaling', 'Color Grading']}
            />
            <ExpertCard 
              name="سارة علي" 
              role="محلل بيانات تجارة دولية" 
              rating={5.0} 
              hourlyRate="$60" 
              tags={['Logistics', 'Supply Chain', 'Market Analysis']}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
