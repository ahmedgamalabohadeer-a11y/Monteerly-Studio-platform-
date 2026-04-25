'use client';
import React from 'react';
import { Wallet, FileText, Landmark } from 'lucide-react';
import { WalletOverview } from '@/components/finance/WalletOverview';
import { BalanceCard } from '@/components/finance/BalanceCard';
import { TransactionHistory } from '@/components/finance/TransactionHistory';
import { TaxResidencyForm } from '@/components/finance/TaxResidencyForm';

export default function FinancePage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Landmark className="text-emerald-500" size={32} />
          الإدارة المالية والضرائب
        </h1>
        <p className="text-slate-400 mt-2 text-sm">مراقبة الأرباح، المحفظة الرقمية، والامتثال الضريبي.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WalletOverview />
          <TransactionHistory />
        </div>
        <div className="space-y-6">
          <BalanceCard />
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <FileText size={18} className="text-indigo-400" /> المعلومات الضريبية
            </h3>
            <TaxResidencyForm />
          </div>
        </div>
      </div>
    </div>
  );
}
