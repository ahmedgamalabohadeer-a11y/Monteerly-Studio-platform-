'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { DollarSign, TrendingUp, CreditCard, Activity } from 'lucide-react';

export default function FinancePage() {
  const [ledgers, setLedgers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedgers = async () => {
      const { data, error } = await supabase
        .from('financial_ledgers')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setLedgers(data);
      }
      setLoading(false);
    };

    fetchLedgers();

    // تحديث لحظي للبيانات المالية
    const channel = supabase.channel('finance-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'financial_ledgers' }, fetchLedgers)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // حساب الإجماليات
  const totalExpected = ledgers.reduce((acc, curr) => acc + Number(curr.total_amount), 0);
  const totalPaid = ledgers.reduce((acc, curr) => acc + Number(curr.paid_amount), 0);
  const totalRemaining = ledgers.reduce((acc, curr) => acc + Number(curr.remaining_amount), 0);

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-bold font-cairo flex items-center gap-4">
            <DollarSign className="text-emerald-500 w-10 h-10" /> 
            الوكيل المالي (CFO Agent)
          </h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <Activity size={16} className="text-green-500" />
            تتبع التدفقات النقدية والمستحقات يتم لحظياً
          </p>
        </header>

        {/* بطاقات المؤشرات المالية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="text-slate-400 mb-2 font-cairo text-sm">إجمالي العقود الموقعة</div>
            <div className="text-3xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-blue-500" /> ${totalExpected.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="text-slate-400 mb-2 font-cairo text-sm">المدفوعات المحصلة</div>
            <div className="text-3xl font-bold text-emerald-500 flex items-center gap-2">
              <CreditCard /> ${totalPaid.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="text-slate-400 mb-2 font-cairo text-sm">المبالغ المستحقة (المتبقية)</div>
            <div className="text-3xl font-bold text-amber-500 flex items-center gap-2">
              <DollarSign /> ${totalRemaining.toLocaleString()}
            </div>
          </div>
        </div>

        {/* جدول السجلات المالية */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-950 text-slate-400 font-cairo text-sm">
              <tr>
                <th className="p-4 border-b border-slate-800">اسم العميل</th>
                <th className="p-4 border-b border-slate-800">قيمة العقد</th>
                <th className="p-4 border-b border-slate-800">المدفوع</th>
                <th className="p-4 border-b border-slate-800">المتبقي</th>
                <th className="p-4 border-b border-slate-800">الحالة</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">جاري تحميل البيانات المالية...</td></tr>
              ) : ledgers.map(l => (
                <tr key={l.id} className="hover:bg-slate-800/50 transition-colors border-b border-slate-800/50">
                  <td className="p-4 font-bold text-white">{l.client_name}</td>
                  <td className="p-4 text-blue-400">${Number(l.total_amount).toLocaleString()}</td>
                  <td className="p-4 text-emerald-400">${Number(l.paid_amount).toLocaleString()}</td>
                  <td className="p-4 text-amber-400">${Number(l.remaining_amount).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      l.payment_status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {l.payment_status === 'pending' ? 'مستحق' : 'مكتمل'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
