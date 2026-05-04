'use client'
import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, DollarSign, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function WalletPage() {
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

  useEffect(() => {
    // الاستماع لنبضة الضمان المالي (Escrow Pulse)
    const channel = supabase.channel('finance-channel')
      .on('broadcast', { event: 'escrow_locked' }, (payload) => {
        setNotification({ 
          msg: `✅ تم تأمين مبلغ ${payload.payload.amount}$ في نظام الضمان بنجاح!`, 
          type: 'success' 
        }      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
        // إخفاء الإشعار بعد 5 ثوانٍ
        setTimeout(() => setNotification(null), 5000      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      })
      .subscribe(      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      
    return () => { supabase.removeChannel(channel      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    ); };
  }, []      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

  const [balance, setBalance] = useState({ available: 0, pending: 0, total_earned: 0 }      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
  const [isWithdrawing, setIsWithdrawing] = useState(false      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
  const [withdrawalMsg, setWithdrawalMsg] = useState(''      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

  // جلب البيانات المالية (محاكاة MVP - في الإنتاج يتم جلبها من Supabase RPC)
  useEffect(() => {
    // محاكاة جلب بيانات الرصيد للمونتير
    setTimeout(() => {
      setBalance({
        available: 1250.00,
        pending: 450.00,
        total_earned: 8900.00
      }      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
    }, 1000      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
  }, []      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

  const requestWithdrawal = async () => {
    if (balance.available <= 0) return;
    setIsWithdrawing(true      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
    
    try {
      // إرسال طلب السحب إلى قاعدة البيانات ليتم مراجعته من الإدارة
      const { data: user } = await supabase.auth.getUser(      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      const userId = user?.user?.id || 'demo_user';

      // [تكامل سيادي] الاتصال الفعلي بمحرك التقسيم والضمان
      const response = await fetch('/api/finance/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: balance.available, tier: 'freelancer' })
      }      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

      if (!response.ok) {
        const errData = await response.json(      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
        throw new Error(errData.error || 'تم رفض العملية من محرك الضمان السيادي'      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      }
      
      const splitResult = await response.json(      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      console.log('تم الاعتماد المالي بنجاح:', splitResult      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );


      const { error } = await supabase.from('audit_logs').insert({
        action: 'withdrawal_requested',
        actor_identifier: `freelancer:${userId}`,
        module: 'finance',
        snapshot: { requested_amount: balance.available, timestamp: new Date().toISOString() }
      }      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );

      if (error && error.code !== '42P01') { // تجاهل خطأ عدم وجود الجدول في وضع الـ Demo
        throw error;
      }

      setWithdrawalMsg('تم إرسال طلب السحب بنجاح. قيد المراجعة الإدارية.'      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      setBalance(prev => ({ ...prev, pending: prev.pending + prev.available, available: 0 })      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
    } catch (err) {
      console.error(err      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
      setWithdrawalMsg('فشل إرسال الطلب. يرجى المحاولة لاحقاً.'      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
    } finally {
      setIsWithdrawing(false      
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
    }
  };

  const transactions = [
    { id: "TRX-9821", type: "credit", amount: 450, desc: "تسليم مشروع إعلان تجاري", date: "2026-05-01", status: "completed" },
    { id: "TRX-9822", type: "debit", amount: -800, desc: "سحب بنكي (Paymob)", date: "2026-04-28", status: "completed" },
    { id: "TRX-9823", type: "pending", amount: 150, desc: "دفعة مقدمة (محتجزة في الضمان)", date: "2026-05-02", status: "escrow" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Wallet className="w-8 h-8 text-emerald-500" />
              المحفظة السيادية
            </h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> محمي بتقنية التشفير المالي (Zero-Trust)
            </p>
          </div>
        </header>

        {/* كروت الأرصدة (Balance Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-500/20 to-slate-900 border border-emerald-500/30 p-8 rounded-3xl relative overflow-hidden">
            <DollarSign className="absolute -left-4 -bottom-4 w-32 h-32 text-emerald-500/10 pointer-events-none" />
            <h3 className="text-emerald-400 font-bold mb-2">الرصيد المتاح للسحب</h3>
            <div className="text-5xl font-black text-white mb-6">${balance.available.toLocaleString()}</div>
            
            <button 
              onClick={requestWithdrawal}
              disabled={balance.available <= 0 || isWithdrawing}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-950 text-white py-3 rounded-xl font-black transition-all flex justify-center items-center gap-2"
            >
              {isWithdrawing ? <Loader2 className="w-5 h-5 animate-spin" /> : 'طلب تحرير الرصيد'}
            </button>
            {withdrawalMsg && <p className="text-xs text-center mt-3 text-emerald-300 font-bold">{withdrawalMsg}</p>}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="font-bold">رصيد قيد التنفيذ (الضمان)</h3>
            </div>
            <div className="text-4xl font-black text-white">${balance.pending.toLocaleString()}</div>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">هذا المبلغ محتجز بأمان في نظام العقود الذكية ولن يتم تحريره إلا بعد تسليم المشاريع المعلقة.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
            <h3 className="text-indigo-400 font-bold mb-2">إجمالي الأرباح التاريخية</h3>
            <div className="text-4xl font-black text-white">${balance.total_earned.toLocaleString()}</div>
            <p className="text-slate-500 text-sm mt-4">إجمالي ما حققته عبر منصة Monteerly منذ انضمامك.</p>
          </div>
        </div>

        {/* سجل المعاملات (Transaction History) */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-xl font-black text-white">سجل العمليات المالية</h2>
          </div>
          <div className="divide-y divide-slate-800">
            {transactions.map((trx, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-950/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${trx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-400' : trx.type === 'debit' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {trx.type === 'credit' ? <ArrowDownRight className="w-6 h-6" /> : trx.type === 'debit' ? <ArrowUpRight className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{trx.desc}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">{trx.id} • {trx.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className={`font-black text-lg ${trx.type === 'credit' ? 'text-emerald-400' : trx.type === 'debit' ? 'text-white' : 'text-amber-400'}`}>
                    {trx.type === 'credit' ? '+' : ''}{trx.amount}$
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">{trx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        
      {notification && (
        <div className={`fixed bottom-8 left-8 p-4 rounded-2xl shadow-2xl border animate-in fade-in slide-in-from-left-4 z-50 ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <p className="font-bold text-sm">{notification.msg}</p>
          </div>
        </div>
      )}

    );
}
