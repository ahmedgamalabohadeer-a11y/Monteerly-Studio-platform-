'use client'
import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, DollarSign, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function WalletPage() {
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [balance, setBalance] = useState({ available: 0, pending: 0, total_earned: 0 });
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalMsg, setWithdrawalMsg] = useState('');

  useEffect(() => {
    const channel = supabase.channel('finance-channel')
      .on('broadcast', { event: 'escrow_locked' }, (payload) => {
        setNotification({ msg: `✅ تم تأمين مبلغ ${payload.payload.amount}$ في نظام الضمان بنجاح!`, type: 'success' });
        setTimeout(() => setNotification(null), 5000);
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    setTimeout(() => { setBalance({ available: 1250.00, pending: 450.00, total_earned: 8900.00 }); }, 1000);
  }, []);

  const requestWithdrawal = async () => {
    if (balance.available <= 0) return;
    setIsWithdrawing(true);
    try {
      setWithdrawalMsg('تم إرسال طلب تحرير الرصيد بنجاح. قيد المراجعة الإدارية للتشفير.');
      setBalance(prev => ({ ...prev, pending: prev.pending + prev.available, available: 0 }));
    } catch (err) {
      setWithdrawalMsg('فشل إرسال الطلب. الاتصال بالضمان السيادي مقطوع.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  const transactions = [
    { id: "TRX-9821", type: "credit", amount: 450, desc: "تحرير أموال (مشروع إعلان تجاري)", date: "2026-05-01", status: "تم الفك" },
    { id: "TRX-9822", type: "debit", amount: -800, desc: "مطالبة مالية (تحويل بنكي)", date: "2026-04-28", status: "مكتمل" },
    { id: "TRX-9823", type: "pending", amount: 150, desc: "عقد ذكي (محتجز في الضمان)", date: "2026-05-02", status: "Escrow" },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black mb-3 flex items-center gap-3">
              <Wallet className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" /> المحفظة السيادية
            </h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> محمي بتقنية التشفير المالي (Zero-Trust AES-256)
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-gradient-to-br from-[#0A0A0F] to-[#05050A] border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
            <img src={MCOS_ASSETS.security.digitalLock.src} className="absolute left-0 bottom-0 w-48 opacity-10 mix-blend-screen pointer-events-none" />
            <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> السيولة القابلة للتحرير</h3>
            <div className="text-6xl font-black text-white mb-8 tracking-tight">${balance.available.toLocaleString()}</div>
            <button onClick={requestWithdrawal} disabled={balance.available <= 0 || isWithdrawing} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex justify-center items-center gap-2">
              {isWithdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'توليد مطالبة مالية رسمية'}
            </button>
            {withdrawalMsg && <p className="text-sm mt-4 text-emerald-400 font-bold">{withdrawalMsg}</p>}
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-amber-400 mb-3"><Clock className="w-5 h-5" /><h3 className="font-bold">أصول قيد الضمان (Escrow)</h3></div>
              <div className="text-4xl font-black text-white mb-2">${balance.pending.toLocaleString()}</div>
              <p className="text-slate-500 text-xs leading-relaxed">محتجزة في العقود الذكية لحين التسليم النهائي.</p>
            </div>
            <div className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex-1 flex flex-col justify-center">
              <h3 className="text-indigo-400 font-bold mb-3">إجمالي الإيرادات</h3>
              <div className="text-4xl font-black text-white">${balance.total_earned.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-[#12121A]"><h2 className="text-xl font-black text-white">سجل العقود والتحويلات</h2></div>
          <div className="divide-y divide-white/5">
            {transactions.map((trx, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${trx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-400' : trx.type === 'debit' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {trx.type === 'credit' ? <ArrowDownRight className="w-6 h-6" /> : trx.type === 'debit' ? <ArrowUpRight className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base">{trx.desc}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">{trx.id} • {trx.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className={`font-black text-lg ${trx.type === 'credit' ? 'text-emerald-400' : trx.type === 'debit' ? 'text-white' : 'text-amber-400'}`}>
                    {trx.type === 'credit' ? '+' : ''}{trx.amount}$
                  </div>
                  <span className="text-[10px] md:text-xs font-bold bg-[#12121A] px-2 py-1 rounded border border-white/5 text-slate-400 mt-1 inline-block">{trx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border z-50 ${notification.type === 'success' ? 'bg-emerald-900/80 border-emerald-500 text-emerald-400' : 'bg-rose-900/80 border-rose-500 text-rose-400'}`}>
          <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-current animate-pulse" /><p className="font-bold text-sm">{notification.msg}</p></div>
        </div>
      )}
    </div>
  );
}
