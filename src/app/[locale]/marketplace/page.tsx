'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Freelancer = {
  id: string;
  email: string | null;
  role: string | null;
};

export default function MarketplacePage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTalent() {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('users')
        .select('id, email, role')
        .eq('role', 'freelancer')
        .limit(10);

      if (error) {
        setError('تعذر تحميل بيانات المبدعين من قاعدة البيانات.');
        setFreelancers([]);
        setLoading(false);
        return;
      }

      setFreelancers((data ?? []) as Freelancer[]);
      setLoading(false);
    }

    fetchTalent();
  }, []);

  const filteredFreelancers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return freelancers;
    }

    return freelancers.filter((freelancer) =>
      [freelancer.email ?? '', freelancer.role ?? '']
        .some((value) => value.toLowerCase().includes(normalized))
    );
  }, [freelancers, query]);

  return (
    <div className="min-h-screen bg-[#05050A] p-8 font-sans text-slate-50" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 flex items-center gap-3 text-4xl font-black">
          <Briefcase className="text-indigo-500" />
          سوق النُخب الإبداعية (مربوط بـ Supabase)
        </h1>

        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0A0A0F] p-4">
          <Search className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في قاعدة بيانات النخب..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        {loading ? (
          <p>جاري تحميل النخب من قاعدة البيانات...</p>
        ) : error ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-300">
            {error}
          </div>
        ) : filteredFreelancers.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0A0A0F] p-6 text-slate-400">
            لا توجد نتائج مطابقة حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="rounded-[2rem] border border-white/5 bg-[#0A0A0F] p-6">
                <h3 className="text-lg font-black">{freelancer.email || 'بريد غير متوفر'}</h3>
                <p className="text-sm text-indigo-400">{freelancer.role || 'Role غير متوفر'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
