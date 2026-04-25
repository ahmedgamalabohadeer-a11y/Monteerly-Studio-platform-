'use client';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SimulatorContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'UNKNOWN_TOKEN';
  const amount = parseInt(searchParams.get('amount') || '0', 10);
  const [status, setStatus] = useState('قيد الانتظار');

  const triggerEscrow = async () => {
    setStatus('⏳ جاري معالجة الدفع عبر المحرك المالي...');
    try {
      const res = await fetch('/api/payments/paymob/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          obj: {
            success: true,
            order: { merchant_order_id: `ORD_MOCK_${Date.now()}` },
            amount_cents: amount * 100
          }
        })
      });
      if (res.ok) {
        setStatus('✅ ناجح - تم تحويل الأموال لـ (القبة الحديدية - Escrow)');
      } else {
        setStatus('❌ فشل في الاستجابة من محرك الضمان');
      }
    } catch (e) {
      setStatus('❌ خطأ في الاتصال بالسيرفر');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">محاكي دفع Paymob</h1>
          <p className="text-slate-400 text-sm">Monteerly Escrow Engine V5.0</p>
        </div>
        
        <div className="space-y-3 text-sm tabular-nums bg-slate-950 p-5 rounded-lg border border-slate-800">
          <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-500">Token:</span> <span className="truncate ml-4">{token}</span></div>
          <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-500">المبلغ:</span> <span>{amount} EGP</span></div>
          <div className="flex justify-between"><span className="text-slate-500">الحالة:</span> <span className="text-indigo-400 font-bold">{status}</span></div>
        </div>

        <button onClick={triggerEscrow} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95">
          تأكيد الدفع (Escrow Trigger)
        </button>
      </div>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">جاري تحميل المحاكي...</div>}>
      <SimulatorContent />
    </Suspense>
  );
}
