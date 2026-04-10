'use client';
import React from 'react';
import { Sun, CheckCircle, Calendar, Coffee } from 'lucide-react';

export function MorningBrief() {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-200 dark:border-orange-800 p-6 rounded-2xl mb-8 flex items-start gap-6">
       <div className="p-4 bg-white dark:bg-orange-900/50 rounded-full text-orange-500 shadow-sm">
          <Sun size={32} />
       </div>
       <div className="flex-1">
          <h2 className="text-2xl font-black font-heading text-orange-900 dark:text-orange-100 mb-2">صباح الخير، أحمد! ☀️</h2>
          <p className="text-orange-800/80 dark:text-orange-200/80 mb-4 leading-relaxed">
             لديك يوم نشيط اليوم. لقد قام الذكاء الاصطناعي بتحليل جدولك:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 p-2 rounded-lg text-sm">
                <CheckCircle size={16} className="text-emerald-500" />
                <span>3 مشاريع للتسليم</span>
             </div>
             <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 p-2 rounded-lg text-sm">
                <Calendar size={16} className="text-blue-500" />
                <span>اجتماع الساعة 2:00 PM</span>
             </div>
             <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 p-2 rounded-lg text-sm">
                <Coffee size={16} className="text-amber-700" />
                <span>وقت فراغ بعد الـ 5 PM</span>
             </div>
          </div>
       </div>
    </div>
  );
}
