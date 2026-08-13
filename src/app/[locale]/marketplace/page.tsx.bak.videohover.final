'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MarketFilters } from '@/components/marketplace/MarketFilters';
import { TalentCard } from '@/components/marketplace/TalentCard';
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

  useEffect(() => {
    async function fetchTalent() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role, kyc_status')
        .eq('role', 'freelancer')
        .limit(12);

      if (!error && data) {
        setFreelancers(data as Freelancer[]);
      }
      setLoading(false);
    }
    fetchTalent();
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] p-8 font-sans text-slate-50" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h1 className="flex items-center gap-3 text-4xl font-black mb-3">
                 <Briefcase className="text-indigo-500" /> سوق النُخب الإبداعية
              </h1>
              <p className="text-slate-400">تصفح أفضل المواهب، راجع أعمالهم، وابدأ التعاقد السيادي المحمي عبر Escrow.</p>
           </div>
        </header>

        <MarketFilters />

        {loading ? (
          <div className="flex items-center justify-center py-20 text-indigo-500">جاري تحميل النخب السيادية...</div>
        ) : freelancers.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-white/10 bg-[#0A0A0F] p-12 text-center text-slate-400">
            لم يتم العثور على مبدعين في قاعدة البيانات حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {freelancers.map((freelancer) => (
              <Link href={`/ar/marketplace/profile/${freelancer.id}`} key={freelancer.id}>
                 <TalentCard 
                   name={freelancer.full_name || freelancer.email?.split('@')[0] || 'مبدع'}
                   role="مخرج ومونتير" // يمكن جلبها ديناميكياً لاحقاً
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
