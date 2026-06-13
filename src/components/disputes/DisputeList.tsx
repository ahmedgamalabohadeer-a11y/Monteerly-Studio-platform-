'use client'
import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function DisputeList({ initialDisputes }: { initialDisputes: any[] }) {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolution = async (disputeId: string, decision: 'freelancer' | 'client') => {
    if (!confirm('هل أنت متأكد من هذا القرار السيادي؟')) return;
    setLoadingId(disputeId);
    try {
      const res = await fetch('/api/disputes/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disputeId, decision, adminId: 'ADMIN_MASTER' })
      });
      const data = await res.json();
      if (data.success) {
        setDisputes(prev => prev.filter(d => d.id !== disputeId));
      } else {
        alert('❌ فشل التنفيذ: ' + data.error);
      }
    } finally {
      setLoadingId(null);
    }
  };

  if (disputes.length === 0) return (
    <div className="bg-[#0A0A0F] border border-emerald-500/20 p-10 rounded-3xl text-center shadow-xl">
      <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
      <h2 className="text-2xl font-black text-emerald-400">النظام مستقر</h2>
      <p className="text-slate-400 mt-2">لا توجد نزاعات معلقة.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {disputes.map(d => (
        <div key={d.id} className="bg-[#0A0A0F] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div className="flex-1">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-xs font-bold border border-rose-500/20">{d.id}</span>
                <h3 className="font-black text-xl">{d.contract}</h3>
             </div>
             <p className="text-amber-400 text-sm font-bold mt-2">السبب: {d.reason}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleResolution(d.id, 'freelancer')} disabled={loadingId === d.id} className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-500/20 hover:bg-emerald-500 hover:text-black">
              {loadingId === d.id ? <Loader2 className="animate-spin" size={16}/> : 'لصالح المبدع'}
            </button>
            <button onClick={() => handleResolution(d.id, 'client')} disabled={loadingId === d.id} className="bg-rose-500/10 text-rose-500 px-4 py-2 rounded-xl text-sm font-bold border border-rose-500/20 hover:bg-rose-500 hover:text-black">
              إعادة للعميل
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
