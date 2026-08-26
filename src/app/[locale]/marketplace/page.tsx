'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  CircleAlert,
  Loader2,
  Plus,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MarketFilters } from '@/components/marketplace/MarketFilters';
import { TalentCard } from '@/components/marketplace/TalentCard';
import { FeaturedVideoCreators } from '@/components/marketplace/FeaturedVideoCreators';

type UserRole = 'freelancer' | 'client' | 'agency';

type Freelancer = {
  id: string;
  full_name: string | null;
  account_type: UserRole | null;
  kyc_status: string | null;
  bio: string | null;
  experience_years: number | null;
};

type CurrentProfile = {
  id: string;
  full_name: string | null;
  account_type: UserRole | null;
  kyc_status: string | null;
};

type RolePresentation = {
  label: string;
  description: string;
  icon: React.ReactNode;
  primaryAction: {
    label: string;
    href: string;
  };
};

const rolePresentations: Record<UserRole, RolePresentation> = {
  freelancer: {
    label: 'مبدع / مستقل',
    description:
      'استعرض المواهب، تابع اتجاهات السوق، وطوّر ملفك المهني لاستقبال فرص جديدة.',
    icon: <UserRound className="h-4 w-4" />,
    primaryAction: {
      label: 'إدارة ملفي المهني',
      href: '/ar/onboarding',
    },
  },
  client: {
    label: 'عميل',
    description:
      'ابحث عن المبدع المناسب، قارن الخيارات، ثم أنشئ طلبًا جديدًا لتبدأ التعاقد المحمي.',
    icon: <Briefcase className="h-4 w-4" />,
    primaryAction: {
      label: 'نشر طلب جديد',
      href: '/ar/jobs/new',
    },
  },
  agency: {
    label: 'وكالة إنتاج',
    description:
      'اكتشف الخبرات التي يحتاجها فريقك وأنشئ مشاريعك أو أدر سير عمل الوكالة من مكان واحد.',
    icon: <Building2 className="h-4 w-4" />,
    primaryAction: {
      label: 'إنشاء مشروع للوكالة',
      href: '/ar/jobs/new',
    },
  },
};

function normalizeRole(value: unknown): UserRole {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return 'freelancer';
}

function extractSkills(bio: string | null) {
  if (!bio) {
    return ['إنتاج محتوى', 'تعاون آمن', 'Monteerly OS'];
  }

  const words = bio
    .replace(/\n/g, ' ')
    .split(/[،,|/]/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 3)
    .slice(0, 3);

  return words.length > 0
    ? words
    : ['إنتاج محتوى', 'تعاون آمن', 'Monteerly OS'];
}

export default function MarketplacePage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [currentProfile, setCurrentProfile] = useState<CurrentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('الكل');

  useEffect(() => {
    let active = true;

    async function loadMarketplace() {
      setLoading(true);
      setLoadError(null);

      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData.user) {
          throw new Error('يرجى تسجيل الدخول للوصول إلى سوق النخب الإبداعية.');
        }

        const user = authData.user;

        /*
         * لا نقرأ email من profiles لأن schema الحالي لا يحتوي عمود email.
         */
        const [profileResult, talentResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('id, full_name, account_type, kyc_status')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('profiles')
            .select('id, full_name, account_type, kyc_status, bio, experience_years')
            .eq('account_type', 'freelancer')
            .limit(24),
        ]);

        if (!active) return;

        if (profileResult.error) {
          throw new Error(`تعذر تحميل دور الحساب: ${profileResult.error.message}`);
        }

        if (talentResult.error) {
          throw new Error(`تعذر تحميل المواهب: ${talentResult.error.message}`);
        }

        const profile = profileResult.data as CurrentProfile | null;

        setCurrentProfile({
          id: user.id,
          full_name:
            profile?.full_name ||
            (typeof user.user_metadata?.full_name === 'string'
              ? user.user_metadata.full_name
              : user.email?.split('@')[0] || 'مستخدم منتيرلي'),
          account_type: normalizeRole(profile?.account_type),
          kyc_status: profile?.kyc_status || 'pending',
        });

        setFreelancers((talentResult.data || []) as Freelancer[]);
      } catch (error: unknown) {
        if (!active) return;

        setLoadError(
          error instanceof Error
            ? error.message
            : 'تعذر تحميل سوق النخب الإبداعية حاليًا.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMarketplace();

    return () => {
      active = false;
    };
  }, []);

  const currentRole = normalizeRole(currentProfile?.account_type);
  const rolePresentation = rolePresentations[currentRole];

  const filteredFreelancers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return freelancers.filter((freelancer) => {
      const searchableText = [
        freelancer.full_name || '',
        freelancer.bio || '',
        freelancer.account_type || '',
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      /*
       * التصنيف حاليًا UI filtering based on biography keywords.
       * يمكن لاحقًا استبداله بعمود تخصص حقيقي داخل profiles أو talent_skills.
       */
      const matchesCategory =
        category === 'الكل' ||
        searchableText.includes(category.replace('محررين ', '').replace('مصممين ', ''));

      return matchesQuery && matchesCategory;
    });
  }, [category, freelancers, query]);

  if (loading) {
    return (
      <main
        className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans text-slate-50"
        dir="rtl"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0A0F] px-6 py-5 text-sm font-bold text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          جارٍ تحميل سوق النخب الإبداعية…
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main
        className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans text-slate-50"
        dir="rtl"
      >
        <div className="w-full max-w-lg rounded-[2rem] border border-rose-500/20 bg-[#0A0A0F] p-8 text-center shadow-2xl">
          <CircleAlert className="mx-auto mb-4 h-12 w-12 text-rose-400" />
          <h1 className="text-2xl font-black text-white">
            تعذر تحميل السوق
          </h1>
          <p className="mt-3 text-sm leading-7 text-rose-200">{loadError}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-500"
            >
              إعادة المحاولة
            </button>

            <Link
              href="/ar/dashboard"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-slate-200 transition-colors hover:bg-white/10"
            >
              العودة لمركز القيادة
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#05050A] px-4 py-6 font-sans text-slate-50 md:px-8 md:py-10"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300">
              {rolePresentation.icon}
              نوع الحساب: {rolePresentation.label}
            </div>

            <h1 className="flex items-center gap-3 text-3xl font-black text-white md:text-5xl">
              <Briefcase className="h-8 w-8 text-indigo-500 md:h-10 md:w-10" />
              سوق النخب الإبداعية
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
              {rolePresentation.description}
            </p>
          </div>

          <Link
            href={rolePresentation.primaryAction.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-500"
          >
            {currentRole === 'client' || currentRole === 'agency' ? (
              <Plus className="h-4 w-4" />
            ) : (
              <UserRound className="h-4 w-4" />
            )}
            {rolePresentation.primaryAction.label}
          </Link>
        </header>

        {currentProfile?.kyc_status !== 'approved' && (
          <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <p className="text-sm leading-6 text-amber-100/85">
                حسابك قيد المراجعة. يمكنك استكشاف السوق وإنشاء الطلبات، بينما قد تتطلب المدفوعات والسحب مراجعة إضافية قبل التفعيل.
              </p>
            </div>

            <Link
              href="/ar/onboarding"
              className="shrink-0 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-sm font-bold text-amber-200 transition-colors hover:bg-amber-500/20"
            >
              مراجعة الملف
            </Link>
          </section>
        )}

        <MarketFilters
          query={query}
          onQueryChange={setQuery}
          activeCategory={category}
          onCategoryChange={setCategory}
        />

        <FeaturedVideoCreators currentRole={currentRole} />

        <section className="mb-6 mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <h2 className="text-2xl font-black text-white">
                كل المواهب المتاحة
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              نتائج مباشرة من قاعدة البيانات للمبدعين المسجلين داخل المنصة.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-400">
            <SearchCheck className="h-4 w-4 text-indigo-300" />
            {filteredFreelancers.length} نتيجة
          </div>
        </section>

        {filteredFreelancers.length === 0 ? (
          <section className="rounded-[2rem] border-2 border-dashed border-white/10 bg-[#0A0A0F] p-12 text-center">
            <SearchCheck className="mx-auto mb-4 h-10 w-10 text-slate-500" />
            <h3 className="text-xl font-black text-white">
              لا توجد مواهب مطابقة للبحث الحالي
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              جرّب تغيير كلمات البحث أو اختيار تصنيف مختلف لاستكشاف مزيد من المواهب.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('الكل');
              }}
              className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-slate-200 transition-colors hover:bg-white/10"
            >
              إعادة ضبط البحث
            </button>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFreelancers.map((freelancer) => (
              <TalentCard
                key={freelancer.id}
                id={freelancer.id}
                name={freelancer.full_name || 'مبدع منتيرلي'}
                roleLabel="مبدع / مستقل"
                rating={freelancer.kyc_status === 'approved' ? 5 : 4.7}
                reviews={freelancer.experience_years || 0}
                rate="يُحدد عند التواصل"
                skills={extractSkills(freelancer.bio)}
                verified={freelancer.kyc_status === 'approved'}
                currentRole={currentRole}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
