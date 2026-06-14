'use client'
import React, { useState } from 'react';
import { Gavel, CheckCircle, Undo2, Loader2, FileText } from 'lucide-react';
import { resolveDispute } from '@/app/[locale]/disputes/dispute-actions';

export default function DisputeList({ initialDisputes }: { initialDisputes: any[] }) {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolution = async (id: string, contractId: string, type: 'release_to_freelancer' | 'refund_to_client') => {
    const isConfirm = confirm(type === 'release_to_freelancer' ? 'تحذير: سيتم تحرير الأموال للمبدع وإغلاق النزاع. هل أنت متأكد؟' : 'تحذير: سيتم إلغاء العقد وإرجاع الأموال للعميل. هل أنت متأكد؟');
    if (!isConfirm) return;

    setLoadingId(id);
    const res = await resolveDispute(id, contractId, type, `تم الحل بواسطة الإدارة: ${type}`);
    if (res.success) {
      setDisputes(disputes.filter(d => d.id !== id));
      alert('تم تنفيذ القرار السيادي وتحديث السجلات المالية بنجاح.');
    } else {
      alert('فشل التنفيذ. تأكد من الصلاحيات.');
    }
    setLoadingId(null);
  };

  if (disputes.length === 0) {
    return (
      <div className="bg-[#0A0A0F] border border-emerald-500/20 p-12 rounded-[2rem] text-center">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-emerald-400">لا توجد نزاعات نشطة</h2>
        <p className="text-slate-500 mt-2">جميع العقود والمشاريع تسير بشكل سليم ومستقر.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {disputes.map((dispute) => (
        <div key={dispute.id} className="bg-[#0A0A0F] border border-rose-500/30 p-6 md:p-8 rounded-[2rem] shadow-[0_0_30px_rgba(225,29,72,0.05)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-rose-500/50">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-xs font-black border border-rose-500/20">
                قضية رقم: {dispute.id.substring(0,8)}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1"><FileText className="w-4 h-4"/> عقد: {dispute.contract_id?.substring(0,8) || 'غير محدد'}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">سبب النزاع: {dispute.reason}</h3>
            <p className="text-sm text-slate-400">الحالة: <span className="text-amber-400 font-bold">{dispute.status}</span></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto border-t md:border-t-0 md:border-r border-white/10 pt-4 md:pt-0 md:pr-6">
            <button 
              onClick={() => handleResolution(dispute.id, dispute.contract_id, 'release_to_freelancer')}
              disabled={loadingId === dispute.id}
              className="flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500/30 px-6 py-3 rounded-xl font-bold transition-all"
            >
              {loadingId === dispute.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Gavel className="w-5 h-5" />}
              الحكم للمبدع (تحرير الأموال)
            </button>
            <button 
              onClick={() => handleResolution(dispute.id, dispute.contract_id, 'refund_to_client')}
              disabled={loadingId === dispute.id}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 hover:border-rose-500 px-6 py-3 rounded-xl font-bold transition-all"
            >
              {loadingId === dispute.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Undo2 className="w-5 h-5" />}
              الحكم للعميل (إلغاء ورد الأموال)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
