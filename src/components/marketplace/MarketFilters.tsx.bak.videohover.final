'use client';
import React from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MarketFilters() {
  const categories = ['الكل', 'محررين فيديو', 'مصممين موشن', 'مهندسي صوت', 'كتاب سيناريو', 'معلقين صوتيين'];

  return (
    <div className="space-y-6 mb-8">
       {/* Search Bar & AI Match */}
       <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
             <input 
               type="text" 
               placeholder="ابحث عن مهارة، اسم، أو خدمة..." 
               className="w-full h-12 pl-4 pr-12 bg-slate-900 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-all"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={20} />
             </div>
          </div>
          <Button className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 px-6">
             <Sparkles size={18} className="ml-2" /> AI Matchmaker
          </Button>
          <Button variant="outline" className="h-12 w-12 px-0 border-white/10">
             <SlidersHorizontal size={20} />
          </Button>
       </div>

       {/* Categories Pills */}
       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
             <button 
               key={cat} 
               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-white text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
             >
                {cat}
             </button>
          ))}
       </div>
    </div>
  );
}

