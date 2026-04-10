'use client';
import React, { useState } from 'react';
import { Calculator, ArrowLeft, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [videosPerMonth, setVideosPerMonth] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);

  // معادلة افتراضية: توفير 30% من الوقت
  const hoursSavedPerVideo = 4; 
  const totalHoursSaved = videosPerMonth * hoursSavedPerVideo;
  const moneySaved = totalHoursSaved * hourlyRate;
  const yearlySavings = moneySaved * 12;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
       <div className="flex flex-col md:flex-row gap-12">
          {/* Inputs */}
          <div className="flex-1 space-y-6">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500/20 text-green-400 rounded-xl"><Calculator size={24} /></div>
                <div>
                   <h3 className="text-xl font-bold text-white">حاسبة التوفير</h3>
                   <p className="text-slate-400 text-xs">اكتشف كم ستوفر مع Monteerly Studio.</p>
                </div>
             </div>

             <div>
                <label className="block text-sm text-slate-300 mb-2">عدد أعضاء الفريق ({teamSize})</label>
                <input type="range" min="1" max="50" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
             </div>
             
             <div>
                <label className="block text-sm text-slate-300 mb-2">فيديو شهرياً ({videosPerMonth})</label>
                <input type="range" min="1" max="100" value={videosPerMonth} onChange={(e) => setVideosPerMonth(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
             </div>

             <div>
                <label className="block text-sm text-slate-300 mb-2">متوسط سعر الساعة ($)</label>
                <div className="relative">
                   <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 pl-10 text-white focus:border-indigo-500 outline-none" />
                   <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                </div>
             </div>
          </div>

          {/* Results */}
          <div className="flex-1 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-8 text-center flex flex-col justify-center relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-indigo-200 text-sm font-bold mb-6 uppercase tracking-wider">توفيرك السنوي المتوقع</h4>
                <div className="text-5xl md:text-6xl font-black text-white mb-2">
                   ${yearlySavings.toLocaleString()}
                </div>
                <p className="text-white/60 text-sm mb-8">
                   + توفير {totalHoursSaved} ساعة عمل شهرياً
                </p>
                <Button className="bg-white text-indigo-900 font-bold hover:bg-indigo-50 w-full">
                   ابدأ التجربة المجانية الآن
                </Button>
             </div>
             {/* BG Decoration */}
             <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/monteerly/monteerly_04_hero_header_marketing_banner.png')] opacity-10 mix-blend-overlay bg-cover" />
          </div>
       </div>
    </div>
  );
}
