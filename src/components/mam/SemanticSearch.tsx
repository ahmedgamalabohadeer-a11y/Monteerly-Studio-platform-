'use client';
import React, { useState } from 'react';
import { Search, Play, Clock, Filter, Sparkles, Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SemanticSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    // Simulate AI Search
    setTimeout(() => {
       setResults([
          { id: 1, title: 'Rush Hour Traffic', time: '00:04:12', confidence: '98%', thumb: '/images/features/speed.jpg', tags: ['Car', 'Traffic', 'City', 'Night'] },
          { id: 2, title: 'Family Picnic', time: '00:01:30', confidence: '92%', thumb: '/images/features/live.jpg', tags: ['Park', 'Food', 'Happy', 'Sun'] },
          { id: 3, title: 'Corporate Meeting', time: '00:12:05', confidence: '85%', thumb: '/images/features/workspace.jpg', tags: ['Office', 'Suit', 'Laptop'] },
       ]);
       setSearching(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
       {/* Search Bar */}
       <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold text-white mb-6">ابحث داخل الفيديو (Semantic Search)</h2>
             <form onSubmit={handleSearch} className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                   <Sparkles size={20} />
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="وصف المشهد... (مثال: رجل يركض تحت المطر، سيارة حمراء مسرعة)"
                  className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-12 pr-32 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none shadow-xl transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={searching}
                  className="absolute right-2 top-2 bottom-2 rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                   {searching ? 'جاري التحليل...' : 'بحث ذكي'}
                </Button>
             </form>
             <div className="flex justify-center gap-4 mt-4 text-xs text-slate-400">
                <span>جرب البحث عن:</span>
                <button onClick={() => setQuery('غروب شمس في الصحراء')} className="hover:text-white underline">غروب شمس</button>
                <button onClick={() => setQuery('اجتماع عمل رسمي')} className="hover:text-white underline">اجتماع عمل</button>
                <button onClick={() => setQuery('احتفال عيد ميلاد')} className="hover:text-white underline">عيد ميلاد</button>
             </div>
          </div>
       </div>

       {/* Results Grid */}
       {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8">
             {results.map((res) => (
                <div key={res.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all">
                   <div className="relative h-48 bg-black">
                      <img src={res.thumb} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs font-mono px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                         <Clock size={12} /> {res.time}
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/30">
                         {res.confidence} Match
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                            <Play size={20} fill="white" className="text-white ml-1" />
                         </div>
                      </button>
                   </div>
                   
                   <div className="p-4">
                      <h3 className="font-bold text-white mb-2">{res.title}</h3>
                      <div className="flex flex-wrap gap-2">
                         {res.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] bg-white/5 text-slate-300 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                               <Tag size={10} /> {tag}
                            </span>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
}

################################################################################