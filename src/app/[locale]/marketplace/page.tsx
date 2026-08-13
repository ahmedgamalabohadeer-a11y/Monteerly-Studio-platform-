'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MarketFilters } from '@/components/marketplace/MarketFilters';
import { TalentCard } from '@/components/marketplace/TalentCard';
import { FeaturedVideoCreators } from '@/components/marketplace/FeaturedVideoCreators';
import Link from 'next/link';

type Freelancer = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  kyc_status: string | null;
};

export default function MarketplacePage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTalent() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, kyc_status')
        .eq('role', 'freelancer')
        .limit(12);

      if (error) {
        setLoadError('تعذر تحميل المبدعين حالياً. حاول مرة أخرى بعد قليل.');
        setLoading(false);
        return;
      }

      if (data) {
        setFreelancers(data as Freelancer[]);
      }

      setLoading(false);
    }

    fetchTalent();
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] p-8 font-sans text-slate-50" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-right">
          <div>
            <h1 className="mb-3 flex items-center gap-3 text-4xl font-black">
              <Briefcase className="text-indigo-500" />
              سوق النُخب الإبداعية
            </h1>
            <p className="text-slate-400">
              تصفح أفضل المواهب، راجع أعمالهم، وابدأ التعاقد السيادي المحمي عبر Escrow.
            </p>
          </div>
        </header>

        <MarketFilters />

        <FeaturedVideoCreators />

        <section className="mb-6 mt-10">
          <div className="mb-5 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-400" />
            <h2 className="text-xl font-black text-white">كل المواهب المتاحة</h2>
          </div>
          <p className="text-sm text-slate-400">
            نتائج مباشرة من قاعدة البيانات لعرض المستقلين المتاحين حاليًا داخل المنصة.
          </p>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-indigo-500">
            جاري تحميل النخب السيادية...
          </div>
        ) : loadError ? (
          <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 p-12 text-center text-rose-300">
            {loadError}
          </div>
        ) : freelancers.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-white/10 bg-[#0A0A0F] p-12 text-center text-slate-400">
            لم يتم العثور على مبدعين في قاعدة البيانات حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freelancers.map((freelancer) => (
              <Link href={`/ar/marketplace/profile/${freelancer.id}`} key={freelancer.id}>
                <TalentCard
                  name={freelancer.full_name || freelancer.email?.split('@')[0] || 'مبدع'}
                  role="مخرج ومونتير"
                  rating={5.0}
                  reviews={0}
                  rate="$25"
                  skills={['Premiere', 'After Effects', 'Color Grading']}
                  image="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=500&auto=format&fit=crop"
                  verified={freelancer.kyc_status === 'approved'}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
