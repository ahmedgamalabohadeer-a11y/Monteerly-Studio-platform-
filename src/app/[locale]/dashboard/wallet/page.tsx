'use client'
import React from 'react';
import { Wallet } from 'lucide-react';

export default function WalletPage() {
  const walletData = {
    balance: "1,250.00$",
    escrowLocked: "450.00$",
    transactions: [
      { id: 1, title: "عقد مونتاج: أحمد جمال", amount: "-150$", date: "2026-06-08", status: "محجوز" },
      { id: 2, title: "إيداع مالي", amount: "+1,400$", date: "2026-06-01", status: "مكتمل" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8" dir="rtl">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <Wallet className="text-indigo-500" /> المحفظة المالية السيادية
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-indigo-900/20 border border-indigo-500/30 p-8 rounded-[2rem]">
          <p className="text-slate-400 mb-2">الرصيد المتاح</p>
          <h2 className="text-4xl font-black">{walletData.balance}</h2>
        </div>
        <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
          <p className="text-slate-400 mb-2">مبالغ محجوزة (Escrow)</p>
          <h2 className="text-4xl font-black text-amber-500">{walletData.escrowLocked}</h2>
        </div>
      </div>

      <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-[2rem]">
        <h2 className="text-xl font-bold mb-6">سجل العمليات</h2>
        {walletData.transactions.map((t) => (
          <div key={t.id} className="flex justify-between items-center py-4 border-b border-white/5">
            <div>
              <p className="font-bold">{t.title}</p>
              <p className="text-xs text-slate-500">{t.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-black ${t.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-200'}`}>
                {t.amount}
              </p>
              <p className="text-xs text-indigo-400">{t.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
