'use client'
import React, { useState } from 'react';
import { CheckCircle, XCircle, FileImage, Loader2, ShieldCheck } from 'lucide-react';
import { reviewKYCRequest } from '@/app/[locale]/admin/kyc/admin-kyc-actions';

type KYCRequest = {
  id: string;
  document_id: string;
  kyc_submitted_at: string;
};

export default function KYCReviewTable({ requests }: { requests: KYCRequest[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDecision = async (userId: string, decision: 'approved' | 'rejected') => {
    const isConfirm = confirm(`هل أنت متأكد من ${decision === 'approved' ? 'اعتماد' : 'رفض'} هذا الحساب؟`);
    if (!isConfirm) return;

    setLoadingId(userId);
    const notes = prompt('اكتب ملاحظة إدارية (اختياري، لحفظها في سجل التدقيق):', `تم المراجعة يدوياً: ${decision}`);

    const res = await reviewKYCRequest(userId, decision, notes || '');
    if (res.success) {
      alert('تم تنفيذ القرار وتحديث حالة المستخدم بنجاح.');
      window.location.reload();
    } else {
      alert('فشل تنفيذ القرار.');
    }
    setLoadingId(null);
  };

  if (requests.length === 0) {
    return (
      <div className="bg-[#0A0A0F] border border-emerald-500/20 p-12 rounded-[2rem] text-center">
        <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-emerald-400">لا توجد طلبات توثيق معلقة</h2>
        <p className="text-slate-500 mt-2">جميع الحسابات النشطة تمت مراجعتها سيادياً.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-[#0A0A0F] border border-white/5 rounded-3xl shadow-2xl">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-[#12121A] text-slate-400 text-sm border-b border-white/10">
            <th className="p-6 font-bold">معرف المستخدم (ID)</th>
            <th className="p-6 font-bold">رقم الوثيقة</th>
            <th className="p-6 font-bold">تاريخ التقديم</th>
            <th className="p-6 font-bold text-center">القرار السيادي</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {requests.map((req) => (
            <tr key={req.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-6 font-mono text-indigo-400 font-bold">{req.id.substring(0, 12)}...</td>
              <td className="p-6 text-slate-300 flex items-center gap-2">
                <FileImage className="w-4 h-4 text-amber-500" /> {req.document_id}
              </td>
              <td className="p-6 text-slate-500 font-mono text-xs">
                {new Date(req.kyc_submitted_at).toLocaleDateString('ar-EG')}
              </td>
              <td className="p-6">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleDecision(req.id, 'approved')}
                    disabled={loadingId === req.id}
                    className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white px-4 py-2 rounded-lg font-bold transition-all border border-emerald-500/20"
                  >
                    {loadingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />} اعتماد
                  </button>
                  <button
                    onClick={() => handleDecision(req.id, 'rejected')}
                    disabled={loadingId === req.id}
                    className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white px-4 py-2 rounded-lg font-bold transition-all border border-rose-500/20"
                  >
                    {loadingId === req.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />} رفض
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
