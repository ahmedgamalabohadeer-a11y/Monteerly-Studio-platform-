'use client';
import React from 'react';

export function LiveStatsTicker() {
  return (
    <div className="w-full bg-indigo-900/30 border-y border-indigo-500/20 backdrop-blur-sm overflow-hidden py-3">
       <div className="flex animate-marquee whitespace-nowrap gap-16 text-sm font-medium text-indigo-200">
          <span className="flex items-center gap-2">🟢 <span className="text-white font-bold">1,240</span> مشروع نشط الآن</span>
          <span className="flex items-center gap-2">💸 <span className="text-white font-bold">$45,000</span> مدفوعات اليوم</span>
          <span className="flex items-center gap-2">🌍 <span className="text-white font-bold">15</span> دولة عربية</span>
          <span className="flex items-center gap-2">⚡ <span className="text-white font-bold">0.2s</span> متوسط زمن الاستجابة</span>
          <span className="flex items-center gap-2">🛡️ <span className="text-white font-bold">100%</span> نسبة الأمان</span>
          
          {/* Repeat for seamless loop illusion */}
          <span className="flex items-center gap-2">🟢 <span className="text-white font-bold">1,240</span> مشروع نشط الآن</span>
          <span className="flex items-center gap-2">💸 <span className="text-white font-bold">$45,000</span> مدفوعات اليوم</span>
          <span className="flex items-center gap-2">🌍 <span className="text-white font-bold">15</span> دولة عربية</span>
       </div>
    </div>
  );
}

