'use client'

import React, { useEffect, useState } from 'react';
import { getWalletBalances, requestWithdrawal } from '@/app/[locale]/wallet/actions';
import { Wallet, ShieldCheck, ArrowDownToLine, Activity, AlertCircle, Loader2 } from 'lucide-react';

export default function FreelancerWallet({ ar }: { ar: any }) {
  const [balances, setBalances] = useState({ escrowed: 0, liquidity: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getWalletBalances().then(data => {
      setBalances(data);
      setIsLoading(false);
    }).catch(console.error);
  }, []);

  const handleWithdraw = async () => {
    if (balances.liquidity <= 0) return;
    setIsWithdrawing(true);
    try {
      const res = await requestWithdrawal(balances.liquidity);
      setMessage(ar.finance?.invoice || res.message);
      // محاكاة سحب الرصيد مؤقتاً في الواجهة
      setBalances(prev => ({ ...prev, liquidity: 0 }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 font-sans" dir="rtl">
      <header className="flex items-center gap-4 mb-10">
        <div className="bg-indigo-50 p-4 rounded-2xl">
          <Wallet className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">المركز المالي السيادي</h2>
          <p className="text-sm font-bold text-slate-400">تتم معالجة البيانات عبر تشفير AES-256</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* بطاقة السيولة المتاحة */}
        <div className="bg-slate-950 p-8 rounded-[2rem] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> {ar.finance?.liquidity || 'السيولة المتاحة'}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tabular-nums tracking-tight">${balances.liquidity.toFixed(2)}</span>
              <span className="text-emerald-400 font-bold text-sm">USD</span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all"></div>
        </div>

        {/* بطاقة حساب الضمان */}
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 relative">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" /> {ar.finance?.escrow || 'في حساب الضمان'}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tabular-nums tracking-tight text-slate-900">${balances.escrowed.toFixed(2)}</span>
            <span className="text-slate-400 font-bold text-sm">USD</span>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-4 leading-relaxed">
            هذه الأصول محمية قانونياً بموجب ميثاق MCOS ولن تُحرر إلا بعد استلام العميل للمسودة النهائية.
          </p>
        </div>
      </div>

      {/* منطقة الإجراءات */}
      <div className="flex flex-col items-center border-t border-slate-100 pt-8">
        <button 
          onClick={handleWithdraw}
          disabled={balances.liquidity <= 0 || isWithdrawing}
          className="w-full md:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
        >
          {isWithdrawing ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> {ar.system?.gpu_alloc || 'جاري استدعاء الأصول...'}</>
          ) : (
            <><ArrowDownToLine className="w-5 h-5" /> {ar.finance?.invoice || 'إصدار مطالبة مالية رسمية'}</>
          )}
        </button>

        {message && (
          <div className="mt-6 flex items-center gap-2 text-emerald-700 bg-emerald-50 px-6 py-3 rounded-full font-bold text-sm animate-in fade-in slide-in-from-bottom-2">
            <ShieldCheck className="w-5 h-5" /> {message}
          </div>
        )}
      </div>
    </div>
  );
}
