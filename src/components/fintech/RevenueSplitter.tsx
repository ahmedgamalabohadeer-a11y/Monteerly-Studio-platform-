'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { RevenueEngine, SubscriptionTier, RevenueBreakdown } from '@/lib/finance/RevenueEngine';

export default function RevenueSplitter({ amount, tier }: { amount: number, tier: SubscriptionTier }) {
  const breakdown = React.useMemo(() => (amount > 0 ? RevenueEngine.calculateSplit(amount, tier) : null), [amount, tier]);

  if (!breakdown) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] font-sans" dir="rtl">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="bg-emerald-500/10 p-3 rounded-full">
          <PieChart className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">التقسيم الآلي للعوائد</h3>
          <p className="text-slate-400 text-xs">يتم الحساب تلقائياً بناءً على باقة ({tier.toUpperCase()})</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* إجمالي المبلغ */}
        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-slate-300 font-bold flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-slate-500" /> إجمالي العقد
          </span>
          <span className="text-xl font-black text-white">${breakdown.originalAmount}</span>
        </div>

        {/* رسوم المنصة */}
        <div className="flex justify-between items-center p-2 px-4">
          <span className="text-rose-400 flex items-center gap-2 text-sm">
            <Percent className="w-4 h-4" /> رسوم MCOS ({breakdown.platformFeePercentage}%)
          </span>
          <span className="text-rose-400 font-bold">-${breakdown.platformFeeAmount}</span>
        </div>

        {/* الضرائب */}
        <div className="flex justify-between items-center p-2 px-4">
          <span className="text-amber-400 flex items-center gap-2 text-sm">
            <Percent className="w-4 h-4" /> ضريبة القيمة المضافة (14%)
          </span>
          <span className="text-amber-400 font-bold">-${breakdown.vatTaxAmount}</span>
        </div>

        {/* الصافي للتحويل */}
        <div className="flex justify-between items-center bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 mt-4">
          <span className="text-emerald-400 font-black flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> الصافي المحتجز في الضمان
          </span>
          <span className="text-2xl font-black text-emerald-400">${breakdown.freelancerNet}</span>
        </div>
      </div>
    </div>
  );
}
