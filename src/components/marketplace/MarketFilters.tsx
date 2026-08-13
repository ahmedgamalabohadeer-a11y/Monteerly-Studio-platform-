'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MarketFilters() {
  const categories = ['الكل', 'محررين فيديو', 'مصممين موشن', 'مهندسي صوت', 'كتاب سيناريو', 'معلقين صوتيين'];
  const [activeCategory, setActiveCategory] = useState('الكل');

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث عن مهارة، اسم، أو خدمة..."
            className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-4 pr-12 text-white transition-all focus:border-indigo-500 focus:outline-none"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
        </div>

        <Button className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-purple-700">
          <Sparkles size={18} className="ml-2" /> AI Matchmaker
        </Button>

        <Button variant="outline" className="h-12 w-12 border-white/10 px-0">
          <SlidersHorizontal size={20} />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-white text-black'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
