'use client';
import React, { useState } from 'react';
import { Search, BookOpen, MessageCircle, Zap, ArrowRight } from 'lucide-react';

export function HelpCenterSearch() {
  const [query, setQuery] = useState('');

  const articles = [
    { title: 'كيف أبدأ مشروعي الأول؟', category: 'البداية', views: 1200 },
    { title: 'إعدادات التصدير المثالية لليوتيوب', category: 'التقنية', views: 3400 },
    { title: 'حل مشكلة عدم تزامن الصوت', category: 'استكشاف الأخطاء', views: 890 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
       <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">كيف يمكننا مساعدتك اليوم؟</h1>
          <div className="relative max-w-2xl mx-auto">
             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               type="text" 
               placeholder="ابحث عن مشكلة، ميزة، أو سؤال..." 
               className="w-full bg-slate-900 border border-white/20 rounded-full py-4 pr-12 pl-6 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-xl"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
             />
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl hover:border-indigo-500/50 transition-all cursor-pointer group">
             <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <BookOpen size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">الدليل الشامل</h3>
             <p className="text-slate-400 text-sm">شرح مفصل لكل زر وميزة في المنصة.</p>
          </div>
          
          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl hover:border-green-500/50 transition-all cursor-pointer group">
             <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <Zap size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">دروس سريعة</h3>
             <p className="text-slate-400 text-sm">فيديوهات قصيرة (Tutorials) لتعلم المونتاج.</p>
          </div>

          <div className="bg-slate-900 border border-white/10 p-6 rounded-xl hover:border-pink-500/50 transition-all cursor-pointer group">
             <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                <MessageCircle size={24} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">مجتمع الدعم</h3>
             <p className="text-slate-400 text-sm">اسأل الخبراء والمستخدمين الآخرين.</p>
          </div>
       </div>

       <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">الأكثر بحثاً</h3>
          <div className="space-y-3">
             {articles.map((art, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg cursor-pointer group">
                   <div className="flex items-center gap-3">
                      <span className="text-indigo-400 group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
                      <span className="text-slate-300 group-hover:text-white">{art.title}</span>
                   </div>
                   <span className="text-xs bg-white/5 px-2 py-1 rounded text-slate-500">{art.category}</span>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
