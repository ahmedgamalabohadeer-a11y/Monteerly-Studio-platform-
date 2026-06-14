import React from 'react';
import { ShieldAlert } from 'lucide-react';
import DisputeList from '@/components/disputes/DisputeList';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export default async function DisputesPage() {
  // جلب النزاعات الحقيقية من قاعدة البيانات
  const { data: disputes, error } = await supabaseAdmin
    .from('disputes')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  const activeDisputes = disputes || [];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-8 font-sans" dir="rtl">
        <header className="mb-10 border-b border-white/10 pb-6 flex items-center justify-between">
            <h1 className="text-3xl font-black flex items-center gap-3 text-rose-500">
                <ShieldAlert size={36} /> إدارة النزاعات السيادية
            </h1>
            <div className="bg-[#12121A] border border-white/10 px-6 py-2 rounded-xl text-sm font-bold text-slate-400">
                نزاعات معلقة: <span className="text-white text-lg">{activeDisputes.length}</span>
            </div>
        </header>

        <DisputeList initialDisputes={activeDisputes} />
    </div>
  );
}
