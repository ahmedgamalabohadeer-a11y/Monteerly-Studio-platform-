'use client';

import React, { useState } from 'react';
import { Calculator, ArrowRight, Clock } from 'lucide-react';
import { useGeoLocation } from '@/lib/hooks/useGeoLocation';
import { Button } from '@/components/ui/Button';

export function SmartROI() {
  const { currency } = useGeoLocation();
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(50);

  // معادلة التوفير: (ساعات المراسلات الضائعة * سعر الساعة) + (تكلفة الاشتراكات المتفرقة)
  const monthlySavings = Math.floor(hours * 0.4 * rate);
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
            <Calculator size={14} /> حاسبة التوفير الذكية
          </div>
          <h3 className="text-3xl font-bold text-white">لا تدفع، استثمر.</h3>
          <p className="text-slate-400 leading-relaxed">
            Monteerly ليست تكلفة إضافية. هي أداة توفر عليك 40% من وقت المراسلات
            الضائع وتغنيك عن 5 اشتراكات مختلفة.
          </p>

          <div className="space-y-4 pt-4">
            <div>
              <label className="flex justify-between text-sm text-slate-300 mb-2">
                <span>ساعات العمل شهرياً</span>
                <span className="font-bold text-white">{hours} ساعة</span>
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
            <div>
              <label className="flex justify-between text-sm text-slate-300 mb-2">
                <span>متوسط تكلفة الساعة ({currency})</span>
                <span className="font-bold text-white">
                  {rate} {currency}
                </span>
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-xl p-8 border border-white/10 flex flex-col justify-center items-center text-center">
          <div className="text-slate-400 text-sm mb-2 font-medium">
            توفيرك السنوي المتوقع
          </div>
          <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
            {yearlySavings.toLocaleString()}{' '}
            <span className="text-2xl text-indigo-400">{currency}</span>
          </div>
          <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full mb-8">
            <Clock size={14} /> +{Math.floor(hours * 0.4 * 12)} ساعة توفير وقت
          </div>
          <Button className="w-full bg-white text-indigo-950 font-bold hover:bg-slate-200 shadow-xl">
            ابدأ التوفير الآن <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
