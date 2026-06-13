'use client';

import React, { useEffect, useState } from 'react';
import { getExecutiveOverview, approveWithdrawal } from './actions';
import { ShieldAlert, CheckCircle, Activity, Lock, Search } from 'lucide-react';

type WithdrawalRequest = {
  id: string;
  actor_identifier: string;
  created_at: string;
  snapshot?: {
    requested_amount?: number;
  } | null;
};

type DisputeItem = {
  id: string;
};

type ExecutiveOverviewData = {
  withdrawalRequests: WithdrawalRequest[];
  disputes: DisputeItem[];
};

export default function ExecutiveDashboard() {
  const [data, setData] = useState<ExecutiveOverviewData>({
    withdrawalRequests: [],
    disputes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getExecutiveOverview()
      .then((res) => {
        setData({
          withdrawalRequests: Array.isArray(res?.withdrawalRequests) ? (res.withdrawalRequests as WithdrawalRequest[]) : [],
          disputes: Array.isArray(res?.disputes) ? (res.disputes as DisputeItem[]) : [],
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleApprove = async (logId: string, freelancerStr: string, amount: number) => {
    const fId = freelancerStr.split(':')[1];
    await approveWithdrawal(logId, fId, amount);

    setData((prev) => ({
      ...prev,
      withdrawalRequests: prev.withdrawalRequests.filter((req) => req.id !== logId),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Activity className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-50" dir="rtl">
      <header className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="mb-2 bg-gradient-to-l from-indigo-400 to-emerald-400 bg-clip-text text-4xl font-black text-transparent">
            مركز القيادة السيادي
          </h1>
          <p className="flex items-center gap-2 font-bold text-slate-400">
            <Lock className="h-4 w-4" /> مراقبة التدفقات النقدية والنزاعات (Executive Overview)
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">System Online</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/5 bg-slate-900 p-8">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-black">
            <Activity className="h-6 w-6 text-indigo-400" />
            المطالبات المالية المعلقة (السيولة)
          </h2>

          <div className="space-y-4">
            {data.withdrawalRequests.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">لا توجد مطالبات مالية معلقة.</p>
            ) : (
              data.withdrawalRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950 p-6"
                >
                  <div>
                    <p className="mb-1 font-mono text-xs text-slate-500">{req.actor_identifier}</p>
                    <p className="text-lg font-black text-white">${req.snapshot?.requested_amount ?? 0} USD</p>
                    <p className="mt-1 text-[10px] text-slate-600">
                      {new Date(req.created_at).toLocaleString('ar-EG')}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApprove(req.id, req.actor_identifier, req.snapshot?.requested_amount ?? 0)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-6 py-3 text-xs font-black text-emerald-400 transition-all hover:bg-emerald-500 hover:text-slate-950"
                  >
                    <CheckCircle className="h-4 w-4" /> اعتماد الصرف
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-slate-900 p-8">
          <h2 className="mb-6 flex items-center gap-3 text-xl font-black text-rose-400">
            <ShieldAlert className="h-6 w-6" />
            النزاعات المعلقة (محرك الضمان)
          </h2>

          <div className="space-y-4">
            {data.disputes.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">الوضع التشغيلي مستقر. لا توجد نزاعات.</p>
            ) : (
              data.disputes.map((dispute) => (
                <div key={dispute.id} className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-xs text-rose-400/70">معرف العقد: {dispute.id.split('-')[0]}</p>
                      <p className="text-sm font-bold text-white">نزاع على التسليم النهائي</p>
                    </div>

                    <span className="rounded-full bg-rose-500 px-3 py-1 text-[10px] font-black text-white">
                      ACTION REQUIRED
                    </span>
                  </div>

                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 py-3 text-xs font-bold text-slate-300 transition-colors hover:bg-rose-500/20 hover:text-rose-300">
                    <Search className="h-4 w-4" /> فتح ملف التحقيق والتدقيق
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
