import React from 'react';
import { ShieldAlert } from 'lucide-react';
import KYCReviewTable from '@/components/admin/KYCReviewTable';
import { getPendingKYCRequests } from './admin-kyc-actions';

export const dynamic = 'force-dynamic';

export default async function KYCAdminPage() {
  const requests = await getPendingKYCRequests();

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8 font-sans" dir="rtl">
      <header className="mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black flex items-center gap-3 text-indigo-400">
          <ShieldAlert size={36} /> مركز التحقق الأمني (KYC Audit)
        </h1>
        <div className="bg-[#12121A] border border-white/10 px-6 py-2 rounded-xl text-sm font-bold text-slate-400">
          طلبات معلقة: <span className="text-white text-lg">{requests.length}</span>
        </div>
      </header>

      <KYCReviewTable requests={requests} />
    </div>
  );
}
