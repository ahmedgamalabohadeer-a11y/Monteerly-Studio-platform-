'use client';

import React, { useState } from 'react';
import { Clock, Play, Sparkles, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

type SearchResultItem = {
  id: number;
  title: string;
  time: string;
  confidence: string;
  thumb: string;
  tags: string[];
};

const mockResults: SearchResultItem[] = [
  {
    id: 1,
    title: 'Rush Hour Traffic',
    time: '00:04:12',
    confidence: '98%',
    thumb: '/images/features/speed.jpg',
    tags: ['Car', 'Traffic', 'City', 'Night'],
  },
  {
    id: 2,
    title: 'Family Picnic',
    time: '00:01:30',
    confidence: '92%',
    thumb: '/images/features/live.jpg',
    tags: ['Park', 'Food', 'Happy', 'Sun'],
  },
  {
    id: 3,
    title: 'Corporate Meeting',
    time: '00:12:05',
    confidence: '85%',
    thumb: '/images/features/workspace.jpg',
    tags: ['Office', 'Suit', 'Laptop'],
  },
];

export function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearching(true);

    window.setTimeout(() => {
      setResults(mockResults);
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-white">
            ابحث داخل الفيديو (Semantic Search)
          </h2>

          <form onSubmit={handleSearch} className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
              <Sparkles size={20} />
            </div>

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="وصف المشهد... (مثال: رجل يركض تحت المطر، سيارة حمراء مسرعة)"
              className="w-full rounded-full border border-white/20 bg-black/50 py-4 pl-12 pr-32 text-white shadow-xl outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <Button
              type="submit"
              disabled={searching}
              className="absolute bottom-2 right-2 top-2 rounded-full bg-indigo-600 px-6 font-bold text-white hover:bg-indigo-700"
            >
              {searching ? 'جاري التحليل...' : 'بحث ذكي'}
            </Button>
          </form>

          <div className="mt-4 flex justify-center gap-4 text-xs text-slate-400">
            <span>جرب البحث عن:</span>
            <button
              type="button"
              onClick={() => setQuery('غروب شمس في الصحراء')}
              className="underline hover:text-white"
            >
              غروب شمس
            </button>
            <button
              type="button"
              onClick={() => setQuery('اجتماع عمل رسمي')}
              className="underline hover:text-white"
            >
              اجتماع عمل
            </button>
            <button
              type="button"
              onClick={() => setQuery('احتفال عيد ميلاد')}
              className="underline hover:text-white"
            >
              عيد ميلاد
            </button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid animate-in slide-in-from-bottom-8 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <article
              key={result.id}
              className="group overflow-hidden rounded-xl border border-white/10 bg-slate-900 transition-all hover:border-indigo-500/50"
            >
              <div className="relative h-48 bg-black">
<Image
  src={result.thumb}
  alt={result.title}
  fill
  className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-xs text-white backdrop-blur">
                  <Clock size={12} /> {result.time}
                </div>

                <div className="absolute right-2 top-2 rounded border border-green-500/30 bg-green-500/20 px-2 py-1 text-[10px] font-bold text-green-400 backdrop-blur">
                  {result.confidence} Match
                </div>

                <button
                  type="button"
                  className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label={`تشغيل المقطع: ${result.title}`}
                >
                  <div className="flex h-12 w-12 transform items-center justify-center rounded-full bg-indigo-600 shadow-lg transition-transform hover:scale-110">
                    <Play size={20} fill="white" className="ml-1 text-white" />
                  </div>
                </button>
              </div>

              <div className="p-4">
                <h3 className="mb-2 font-bold text-white">{result.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded border border-white/5 bg-white/5 px-2 py-1 text-[10px] text-slate-300"
                    >
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
