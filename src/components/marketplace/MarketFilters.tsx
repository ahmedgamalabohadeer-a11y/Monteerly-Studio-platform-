'use client';

import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type MarketFiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  'الكل',
  'محررين فيديو',
  'مصممين موشن',
  'مهندسي صوت',
  'كتاب سيناريو',
  'معلقين صوتيين',
];

export function MarketFilters({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
}: MarketFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [matchmakerMessage, setMatchmakerMessage] = useState<string | null>(null);

  const clearFilters = () => {
    onQueryChange('');
    onCategoryChange('الكل');
    setMatchmakerMessage(null);
  };

  const runMatchmaker = () => {
    if (!query.trim() && activeCategory === 'الكل') {
      setMatchmakerMessage(
        'اكتب نوع المشروع أو اختر تخصصًا حتى يستطيع AI Matchmaker اقتراح المواهب الأقرب لاحتياجك.',
      );
      return;
    }

    const context =
      activeCategory !== 'الكل'
        ? `تخصص ${activeCategory}`
        : `بحث "${query.trim()}"`;

    setMatchmakerMessage(
      `تم تجهيز ترشيحات مبدئية بناءً على ${context}. راجع نتائج السوق واختر الملف الأنسب لمشروعك.`,
    );
  };

  return (
    <section
      className="mb-8 space-y-5"
      aria-label="البحث والفلاتر في سوق المواهب"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <label htmlFor="market-search" className="sr-only">
            ابحث عن مهارة أو اسم أو خدمة
          </label>

          <input
            id="market-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="ابحث عن مهارة، اسم، أو خدمة..."
            className="h-12 w-full rounded-xl border border-white/10 bg-slate-900 pl-11 pr-12 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          />

          <Search
            size={20}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          {query && (
            <button
              type="button"
              aria-label="مسح البحث"
              onClick={() => onQueryChange('')}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Button
          type="button"
          onClick={runMatchmaker}
          className="h-12 bg-indigo-600 px-6 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500"
        >
          <Sparkles size={18} className="ml-2" />
          AI Matchmaker
        </Button>

        <Button
          type="button"
          variant="outline"
          aria-label="فتح خيارات الفلترة"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((current) => !current)}
          className={`h-12 w-12 border-white/10 px-0 text-slate-200 hover:bg-white/10 ${
            filtersOpen ? 'bg-white/10 text-white' : ''
          }`}
        >
          <SlidersHorizontal size={20} />
        </Button>
      </div>

      {matchmakerMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm leading-6 text-indigo-100"
        >
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
          <p>{matchmakerMessage}</p>
        </div>
      )}

      {filtersOpen && (
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black text-white">خيارات الفلترة</h2>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                استخدم التخصص والبحث النصي لتقليل النتائج المعروضة.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={14} />
              إعادة ضبط
            </button>
          </div>
        </div>
      )}

      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        role="tablist"
        aria-label="تصنيفات المواهب"
      >
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                onCategoryChange(category);
                setMatchmakerMessage(null);
              }}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {active && <CheckCircle2 size={14} />}
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
