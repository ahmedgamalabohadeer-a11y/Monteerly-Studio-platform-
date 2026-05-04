'use client'
import React from 'react';
import { Trophy, Star, ShieldCheck, Zap } from 'lucide-react';

export default function BadgeSystem() {
  return (
    <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> برنامج النخبة (MCOS Elite)
          </h3>
          <p className="text-sm text-slate-400 mt-1">تخفيض للعمولات بناءً على إنجازاتك</p>
        </div>
        <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-black border border-amber-500/20">
          المستوى الحالي: 2
        </span>
      </div>

      <div className="space-y-4">
        {/* شريط التقدم */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
            <span>850 نقطة</span>
            <span>1000 نقطة (للوصول لـ Top Rated)</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-l from-amber-500 to-rose-500 w-[85%]"></div>
          </div>
        </div>

        {/* الأوسمة المفتوحة */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          <div className="bg-slate-950 p-3 rounded-xl text-center border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-[10px] font-bold text-slate-300">موثق (KYC)</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl text-center border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-[10px] font-bold text-amber-400">عمولة 10%</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl text-center border border-slate-800 opacity-50 grayscale">
            <Zap className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
            <p className="text-[10px] font-bold text-slate-500">سحب فوري</p>
          </div>
        </div>
      </div>
    </div>
  );
}
