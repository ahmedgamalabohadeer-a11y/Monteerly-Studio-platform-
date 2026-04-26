'use client';
import React from 'react';
import { TrendingUp, Users, PieChart, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PitchCard() {
  const pitch = {
    title: 'وثائقي: أسرار الصحراء',
    author: 'أحمد كمال',
    goal: 50000,
    raised: 35000,
    equity: 15,
    investors: 12,
    daysLeft: 14,
    image: '/images/features/live.jpg' // Placeholder
  };
  
  const progress = (pitch.raised / pitch.goal) * 100;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-indigo-500/50 transition-all">
       {/* Thumbnail & Video Preview */}
       <div className="h-48 relative bg-black">
          <img src={pitch.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 flex items-center justify-center">
             <button className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20">
                <PlayCircle size={24} className="text-white" />
             </button>
          </div>
          <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">
             Seed Round
          </div>
       </div>

       <div className="p-6">
          <div className="flex justify-between items-start mb-2">
             <h3 className="text-lg font-bold text-white">{pitch.title}</h3>
             <span className="text-xs text-slate-400">بواسطة {pitch.author}</span>
          </div>
          
          <p className="text-sm text-slate-400 mb-6 line-clamp-2">
             سلسلة وثائقية من 5 حلقات تستكشف الحياة البرية في الربع الخالي بتقنيات تصوير 8K. نبحث عن تمويل لمرحلة ما بعد الإنتاج.
          </p>

          {/* Funding Stats */}
          <div className="space-y-2 mb-6">
             <div className="flex justify-between text-sm">
                <span className="font-bold text-white">${pitch.raised.toLocaleString()}</span>
                <span className="text-slate-500">من أصل ${pitch.goal.toLocaleString()}</span>
             </div>
             <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
             </div>
             <div className="flex justify-between text-[10px] text-slate-500">
                <span>{pitch.investors} مستثمر</span>
                <span>باقي {pitch.daysLeft} يوم</span>
             </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
             <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20">
                <PieChart size={14} />
                <span className="text-xs font-bold">{pitch.equity}% حصة أرباح</span>
             </div>
             <Button size="sm" className="bg-white text-black font-bold hover:bg-slate-200">
                استثمر الآن
             </Button>
          </div>
       </div>
    </div>
  );
}

