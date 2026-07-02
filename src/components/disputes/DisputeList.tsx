'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  FileText,
  Gavel,
  Loader2,
  Undo2,
} from 'lucide-react';
import { resolveDispute } from '@/app/[locale]/disputes/dispute-actions';

type DisputeStatus = string;

type DisputeResolutionType = 'release_to_freelancer' | 'refund_to_client';

type DisputeItem = {
  id: string;
  contract_id: string | null;
  reason: string;
  status: DisputeStatus;
};

type DisputeListProps = {
  initialDisputes: DisputeItem[];
};

export default function DisputeList({
  initialDisputes,
}: DisputeListProps) {
  const [disputes, setDisputes] = useState<DisputeItem[]>(initialDisputes);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolution = async (
    id: string,
    contractId: string | null,
    type: DisputeResolutionType
  ) => {
    const isConfirm = confirm(
      type === 'release_to_freelancer'
        ? 'تحذير: سيتم تحرير الأموال للمبدع وإغلاق النزاع. هل أنت متأكد؟'
        : 'تحذير: سيتم إلغاء العقد وإرجاع الأموال للعميل. هل أنت متأكد؟'
    );

    if (!isConfirm || !contractId) return;

    setLoadingId(id);

    const res = await resolveDispute(
      id,
      contractId,
      type,
      `تم الحل بواسطة الإدارة: ${type}`
    );

    if (res.success) {
      setDisputes((currentDisputes) =>
        currentDisputes.filter((dispute) => dispute.id !== id)
      );
      alert('تم تنفيذ القرار السيادي وتحديث السجلات المالية بنجاح.');
    } else {
      alert(res.error ?? 'فشل التنفيذ. تأكد من الصلاحيات.');
    }

    setLoadingId(null);
  };

  if (disputes.length === 0) {
    return (
      <div className="rounded-[2rem] border border-emerald-500/20 bg-[#0A0A0F] p-12 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-emerald-500 opacity-50" />
        <h2 className="text-xl font-bold text-emerald-400">
          لا توجد نزاعات نشطة
        </h2>
        <p className="mt-2 text-slate-500">
          جميع العقود والمشاريع تسير بشكل سليم ومستقر.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {disputes.map((dispute) => (
        <article
          key={dispute.id}
          className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-rose-500/30 bg-[#0A0A0F] p-6 shadow-[0_0_30px_rgba(225,29,72,0.05)] transition-all hover:border-rose-500/50 md:flex-row md:items-center md:p-8"
        >
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-black text-rose-400">
                قضية رقم: {dispute.id.substring(0, 8)}
              </span>

              <span className="flex items-center gap-1 text-sm text-slate-400">
                <FileText className="h-4 w-4" />
                عقد: {dispute.contract_id?.substring(0, 8) || 'غير محدد'}
              </span>
            </div>

            <h3 className="mb-2 text-xl font-bold text-white">
              سبب النزاع: {dispute.reason}
            </h3>

            <p className="text-sm text-slate-400">
              الحالة:{' '}
              <span className="font-bold text-amber-400">{dispute.status}</span>
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 border-t border-white/10 pt-4 md:w-auto md:border-t-0 md:border-r md:pt-0 md:pr-6">
            <button
              type="button"
              onClick={() =>
                handleResolution(
                  dispute.id,
                  dispute.contract_id,
                  'release_to_freelancer'
                )
              }
              disabled={loadingId === dispute.id || !dispute.contract_id}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-600/10 px-6 py-3 font-bold text-emerald-500 transition-all hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingId === dispute.id ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Gavel className="h-5 w-5" />
              )}
              الحكم للمبدع (تحرير الأموال)
            </button>

            <button
              type="button"
              onClick={() =>
                handleResolution(
                  dispute.id,
                  dispute.contract_id,
                  'refund_to_client'
                )
              }
              disabled={loadingId === dispute.id || !dispute.contract_id}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-bold text-slate-300 transition-all hover:border-rose-500 hover:bg-rose-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingId === dispute.id ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Undo2 className="h-5 w-5" />
              )}
              الحكم للعميل (إلغاء ورد الأموال)
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
