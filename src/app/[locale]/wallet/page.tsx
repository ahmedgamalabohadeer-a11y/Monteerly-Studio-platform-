'use client'
import React, { useState } from 'react';
import { Wallet, Clock, ShieldCheck, Loader2, AlertTriangle, Lock } from 'lucide-react';

export default function WalletPage() {
  const [balance, setBalance] = useState({
    available: 1250.0,
    clearing: 300.0,
    pending_escrow: 450.0,
    total_earned: 8900.0
  });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalMsg, setWithdrawalMsg] = useState('');

  const requestWithdrawal = async () => {
    if (balance.available <= 0) return;
    setIsWithdrawing(true);
    try {
      setWithdrawalMsg('تم استلام الطلب. جاري المراجعة الإدارية (تطبق رسوم السحب 2%).');
      setBalance((prev) => ({ ...prev, available: 0 }));
    } catch {
      setWithdrawalMsg('تم رفض العملية (Fraud Prevention).');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const clearingItems = [
    { id: 'PROJ-882', amount: 300, hoursLeft: 14, desc: 'تصفية مشروع (مونتاج إعلان)' }
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3">
              <Wallet className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" /> المحفظة السيادية
            </h1>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-4 h-4" /> (Zero-Trust AES-256)</span>
              <span className="flex items-center gap-1 text-indigo-400"><Lock className="w-4 h-4" /> بوابات (Paymob / PayPal)</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> السيولة القابلة للسحب الفوري</h3>
            <div className="text-6xl font-black text-white mb-8 tracking-tight">${balance.available.toLocaleString()}</div>
            <button onClick={requestWithdrawal} disabled={balance.available <= 0 || isWithdrawing} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-2">
              {isWithdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'طلب سحب عبر (Paymob / PayPal)'}
            </button>
            {withdrawalMsg && <p className="text-sm mt-4 text-emerald-400 font-bold">{withdrawalMsg}</p>}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-rose-400 mb-3"><Lock className="w-5 h-5" /><h3 className="font-bold">محتجز في الضمان (Escrow)</h3></div>
              <div className="text-3xl font-black text-white mb-2">${balance.pending_escrow.toLocaleString()}</div>
              <p className="text-slate-500 text-xs leading-relaxed">أموال قيد العمل، لا يمكن سحبها إلا باعتماد العميل.</p>
            </div>
            <div className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
              <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> قيد التخليص (48h Guard)</h3>
              <div className="text-3xl font-black text-white">${balance.clearing.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {balance.clearing > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-[2rem] p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-400">أموال قيد التخليص الأمني (Clearing)</h4>
                <p className="text-xs text-amber-200/80">لحماية المنصة من التراجع المالي (Chargeback)، يتم احتجاز الأموال المحررة لمدة 48 ساعة قبل إتاحتها للسحب.</p>
              </div>
            </div>
            <div className="bg-[#05050A] px-4 py-2 rounded-xl border border-amber-500/30 text-center">
              <span className="block text-[10px] text-amber-500/80 font-bold mb-1">الوقت المتبقي للتحرير</span>
              <span className="font-mono font-black text-white">{clearingItems[0].hoursLeft} ساعة</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
