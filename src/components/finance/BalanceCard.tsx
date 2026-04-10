'use client';
import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Lock } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';

export const BalanceCard = () => {
  const { availableBalance, escrowBalance, currency } = useWalletStore();

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Main Balance Card - Deep Ocean Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary to-brand-dark p-6 shadow-2xl border border-white/10 group">
        <div className="relative z-10 text-white">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-md">
              <Wallet size={24} className="text-brand-secondary" />
            </div>
            <span className="font-mono text-xs bg-brand-success/20 text-brand-success px-2 py-1 rounded">نشط</span>
          </div>
          <p className="text-gray-300 text-sm mb-1 font-tajawal">الرصيد المتاح للسحب</p>
          <h2 className="text-4xl font-bold font-mono tracking-tight mb-4">
            {currency} {availableBalance.toLocaleString()}
          </h2>
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-brand-dark font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm">
              <ArrowDownLeft size={16} /> إيداع
            </button>
            <button className="flex-1 bg-brand-surface/50 text-white border border-white/20 font-bold py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
              <ArrowUpRight size={16} /> سحب
            </button>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-3xl group-hover:bg-brand-secondary/30 transition-all duration-700"></div>
      </div>

      {/* Escrow Balance Card - Locked Funds */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 flex flex-col justify-center group hover:border-brand-secondary/30 transition-colors">
        <div className="flex items-center gap-3 mb-2">
           <Lock size={18} className="text-yellow-500" />
           <p className="text-gray-400 text-sm font-tajawal">رصيد معلق (ضمان)</p>
        </div>
        <h2 className="text-3xl font-bold font-mono text-gray-300 mb-2">
          {currency} {escrowBalance.toLocaleString()}
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed font-tajawal">
          هذه الأموال محجوزة في مشاريع قيد التنفيذ ولا يمكن سحبها حتى يتم تسليم المشاريع وقبولها من قبل العميل. هذا يضمن حق الطرفين.
        </p>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
