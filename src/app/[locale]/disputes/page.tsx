import { ShieldAlert } from 'lucide-react';
import DisputeList from '@/components/disputes/DisputeList';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

export default async function DisputesPage() {
  const { data: disputes } = await supabaseAdmin
    .from('disputes')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  const activeDisputes = disputes || [];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-8">
      <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="flex items-center gap-3 text-3xl font-black text-rose-500">
            <ShieldAlert size={36} />
            إدارة النزاعات السيادية
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-400">
            متابعة النزاعات المفتوحة ومراجعة الحالات المعلقة ضمن واجهة تنفيذية
            هادئة تركز على القرار والإجراء، لا على الزخرفة.
          </p>
        </div>

        <div className="w-fit rounded-xl border border-white/10 bg-[#12121A] px-5 py-3 text-sm font-bold text-slate-400">
          نزاعات معلقة:{' '}
          <span className="text-lg text-white">{activeDisputes.length}</span>
        </div>
      </header>

      <DisputeList initialDisputes={activeDisputes} />
    </section>
  );
}
