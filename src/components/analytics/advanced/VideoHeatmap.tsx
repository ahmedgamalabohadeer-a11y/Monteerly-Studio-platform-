'use client';
import React from 'react';

export function VideoHeatmap() {
  const dataPoints = [100, 98, 95, 90, 85, 60, 55, 50, 48, 45, 40, 35, 30, 80, 75, 70, 60, 50, 40, 20];

  return (
    <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white">تحليل تفاعل الجمهور</h3>
        <div className="text-xs text-slate-400">الفيديو: إعلان رمضان (v3)</div>
      </div>

      <div className="relative h-64 w-full bg-black/40 rounded-lg border border-white/5 overflow-hidden flex items-end px-2">
        <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
          <div className="border-t border-slate-500 w-full" />
          <div className="border-t border-slate-500 w-full" />
          <div className="border-t border-slate-500 w-full" />
        </div>

        <div className="flex items-end justify-between w-full h-full gap-1 pt-8 pb-0">
          {dataPoints.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end group relative">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {val}% Retention
              </div>

              <div
                className={`w-full rounded-t-sm transition-all hover:bg-indigo-400 ${
                  i === 5 ? 'bg-red-500 animate-pulse' : 'bg-indigo-600/60'
                }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-[28%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-1 shadow-lg">
            هبوط حاد (-25%)
          </div>
          <div className="w-px h-16 bg-red-500 border-l border-dashed border-red-300"></div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>نقطة الهروب (Drop-off Point)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded" />
          <span>متوسط المشاهدة</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h4 className="font-bold text-yellow-400 text-sm mb-1">تحليل الذكاء الاصطناعي</h4>
        <p className="text-xs text-slate-300">
          يبدو أن المشاهدين يغادرون عند الدقيقة 00:35. السبب المحتمل: &quot;مقدمة طويلة جداً&quot;. ننصح بقص 10 ثوانٍ من هذا الجزء.
        </p>
      </div>
    </div>
  );
}
