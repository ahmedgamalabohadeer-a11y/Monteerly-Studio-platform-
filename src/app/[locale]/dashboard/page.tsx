'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  BrainCircuit,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleAlert,
  FileText,
  Loader2,
  MonitorPlay,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Video,
  Wallet,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type UserRole = 'freelancer' | 'client' | 'agency';

type Profile = {
  id: string;
  full_name: string | null;
  role: UserRole | null;
  kyc_status: string | null;
};

type Project = {
  id: string;
  title?: string | null;
  status?: string | null;
  client_id?: string | null;
  freelancer_id?: string | null;
};

type Module = {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  visibleFor: UserRole[];
};

const roleLabels: Record<UserRole, string> = {
  freelancer: 'مبدع / مستقل',
  client: 'عميل',
  agency: 'وكالة إنتاج',
};

const roleDescriptions: Record<UserRole, string> = {
  freelancer: 'أدِر فرصك ومشاريعك وأرباحك من مساحة عمل واحدة.',
  client: 'أنشئ طلباتك، اختر المواهب، وتابع التسليمات والعقود المحمية.',
  agency: 'أدِر مشاريع الوكالة وفريقك وعقودك من مركز قيادة موحّد.',
};

function normalizeRole(value: unknown): UserRole {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return 'freelancer';
}

function getKycPresentation(status: string | null) {
  if (status === 'approved') {
    return {
      label: 'الهوية موثقة',
      className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    };
  }

  if (status === 'pending') {
    return {
      label: 'الهوية قيد المراجعة',
      className: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
      icon: <Activity className="h-4 w-4 text-amber-400" />,
    };
  }

  return {
    label: 'الهوية غير مكتملة',
    className: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
    icon: <ShieldAlert className="h-4 w-4 text-rose-400" />,
  };
}

export default function ElegantDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeContracts, setActiveContracts] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData.user) {
          router.replace('/ar/auth');
          return;
        }

        const user = authData.user;
        const metadataRole = normalizeRole(user.user_metadata?.role);

        const [profileResult, jobsResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('id, full_name, role, kyc_status')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('jobs')
            .select('id, title, status, client_id, freelancer_id')
            .or(`client_id.eq.${user.id},freelancer_id.eq.${user.id}`)
            .in('status', ['in_progress', 'pending']),
        ]);

        if (!active) return;

        if (profileResult.error) {
          throw new Error(`تعذر تحميل الملف الشخصي: ${profileResult.error.message}`);
        }

        if (jobsResult.error) {
          throw new Error(`تعذر تحميل المشاريع النشطة: ${jobsResult.error.message}`);
        }

        const databaseProfile = profileResult.data as Profile | null;

        /*
         * إذا كان صف profiles غير موجود بعد، نستخدم metadata مؤقتًا.
         * صفحة onboarding ستنشئ/تحدث الصف لاحقًا.
         */
        setProfile({
          id: user.id,
          full_name:
            databaseProfile?.full_name ||
            (typeof user.user_metadata?.full_name === 'string'
              ? user.user_metadata.full_name
              : user.email?.split('@')[0] || 'مستخدم منتيرلي'),
          role: normalizeRole(databaseProfile?.role || metadataRole),
          kyc_status: databaseProfile?.kyc_status || 'pending',
        });

        setActiveContracts((jobsResult.data || []) as Project[]);
      } catch (error: unknown) {
        if (!active) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'حدث خطأ غير متوقع أثناء تحميل مركز القيادة.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  const role = normalizeRole(profile?.role);
  const kyc = getKycPresentation(profile?.kyc_status || 'pending');

  const modules = useMemo<Module[]>(() => {
    const allModules: Module[] = [
      {
        id: 'marketplace',
        title: 'سوق العمل',
        description:
          role === 'client'
            ? 'ابحث عن المواهب وابدأ التعاقد المحمي.'
            : 'استكشف فرصًا ومواهب ومشاريع داخل السوق.',
        link: '/ar/marketplace',
        icon: <Briefcase className="h-7 w-7 text-emerald-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'studio',
        title: 'مساحة العمل',
        description:
          role === 'client'
            ? 'تابع التسليمات واطلب التعديلات من مكان واحد.'
            : 'أنشئ وراجع ونظّم ملفات الإنتاج والمشاريع.',
        link: '/ar/studio',
        icon: <MonitorPlay className="h-7 w-7 text-indigo-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'wallet',
        title: 'المحفظة',
        description:
          role === 'client'
            ? 'موّل العقود وتابع المدفوعات والفواتير.'
            : 'تابع أرباحك والمدفوعات وحالة السحب.',
        link: '/ar/wallet',
        icon: <Wallet className="h-7 w-7 text-rose-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'ai-studio',
        title: 'استوديو الذكاء الاصطناعي',
        description: 'أدوات ذكية للكتابة والتخطيط والإنتاج.',
        link: '/ar/ai-studio',
        icon: <BrainCircuit className="h-7 w-7 text-amber-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'library',
        title: 'المكتبة',
        description: 'أصول مرخّصة وفيديوهات ومراجع لمشاريعك.',
        link: '/ar/library',
        icon: <Video className="h-7 w-7 text-cyan-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'contracts',
        title: 'العقود السيادية',
        description:
          role === 'client'
            ? 'راجع تمويل العقود وحالة الموافقات.'
            : 'راجع الالتزامات والمراحل وحالة العقود.',
        link: '/ar/contracts',
        icon: <FileText className="h-7 w-7 text-violet-400" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'kyc',
        title: 'الهوية والامتثال',
        description: 'أكمل ملفك وتابع حالة التحقق المالي.',
        link: '/ar/onboarding',
        icon: <ShieldCheck className="h-7 w-7 text-slate-300" />,
        visibleFor: ['freelancer', 'client', 'agency'],
      },
      {
        id: 'agency',
        title: 'إدارة الوكالة',
        description: 'أدِر الفريق والمشاريع وسير العمل المؤسسي.',
        link: '/ar/agency',
        icon: <Building2 className="h-7 w-7 text-emerald-300" />,
        visibleFor: ['agency'],
      },
    ];

    return allModules.filter((module) => module.visibleFor.includes(role));
  }, [role]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans text-slate-50"
        dir="rtl"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0A0F] px-6 py-5 text-sm font-bold text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          جارٍ تحميل مركز القيادة…
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div
        className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans text-slate-50"
        dir="rtl"
      >
        <div className="w-full max-w-lg rounded-[2rem] border border-rose-500/20 bg-[#0A0A0F] p-8 text-center shadow-2xl">
          <CircleAlert className="mx-auto mb-4 h-12 w-12 text-rose-400" />
          <h1 className="text-2xl font-black text-white">تعذر تحميل مركز القيادة</h1>
          <p className="mt-3 text-sm leading-6 text-rose-200">{errorMessage}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-500"
            >
              إعادة المحاولة
            </button>
            <button
              type="button"
              onClick={() => router.push('/ar/onboarding')}
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-slate-200 transition-colors hover:bg-white/10"
            >
              مراجعة الملف
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#05050A] px-4 py-6 font-sans text-slate-50 md:px-6 md:py-8"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-5 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
              <UserRound className="h-3.5 w-3.5" />
              الدور التشغيلي: {roleLabels[role]}
            </div>

            <h1 className="text-3xl font-black text-white md:text-5xl">
              مركز القيادة
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              مرحبًا {profile?.full_name || 'بك'} — {roleDescriptions[role]}
            </p>
          </div>

          <div
            className={`inline-flex items-center gap-2 self-start rounded-xl border px-4 py-2 text-xs font-bold ${kyc.className}`}
          >
            {kyc.icon}
            {kyc.label}
          </div>
        </header>

        {profile?.kyc_status !== 'approved' && (
          <section className="flex flex-col gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
              <div>
                <h2 className="font-black text-amber-200">ملفك قيد التهيئة</h2>
                <p className="mt-1 text-sm leading-6 text-amber-100/80">
                  يمكنك استخدام المنصة، لكن قد تتطلب المدفوعات والسحب والعقود التجارية مراجعة إضافية قبل التفعيل.
                </p>
              </div>
            </div>

            <Link
              href="/ar/onboarding"
              className="shrink-0 rounded-xl bg-amber-500 px-5 py-3 text-center text-sm font-black text-black transition-colors hover:bg-amber-400"
            >
              مراجعة الملف
            </Link>
          </section>
        )}

        {activeContracts.length > 0 && (
          <section className="flex flex-col gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Activity className="mt-0.5 h-5 w-5 shrink-0 animate-pulse text-indigo-300" />
              <div>
                <h2 className="font-black text-indigo-100">
                  لديك {activeContracts.length} مشروع نشط
                </h2>
                <p className="mt-1 text-sm leading-6 text-indigo-100/70">
                  تابع حالة العقد، المراحل، والمحادثات من مساحة العمل.
                </p>
              </div>
            </div>

            <Link
              href={`/ar/workspace/${activeContracts[0].id}`}
              className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-black text-white transition-colors hover:bg-indigo-500"
            >
              فتح مساحة العمل
            </Link>
          </section>
        )}

        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-950 via-slate-950 to-[#05050A] p-6 shadow-2xl md:p-8">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 flex items-center gap-2 text-indigo-300">
              <Activity className="h-5 w-5" />
              <span className="text-sm font-black">نظرة سريعة</span>
            </div>

            <h2 className="text-2xl font-black text-white md:text-3xl">
              بيئة عمل موحّدة ومحمية
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              أنشئ مشاريعك، استخدم أدوات الذكاء الاصطناعي، وتابع العقود والمراحل من مركز واحد.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={role === 'client' ? '/ar/jobs/new' : '/ar/marketplace'}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-500"
              >
                {role === 'client' ? 'إنشاء طلب جديد' : 'استكشاف السوق'}
              </Link>

              <Link
                href="/ar/ai-studio"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-slate-200 transition-colors hover:bg-white/10"
              >
                فتح أدوات الذكاء الاصطناعي
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-black text-white">وحداتك التشغيلية</h2>
            <p className="mt-1 text-sm text-slate-400">
              الأدوات المعروضة تتكيف مع دورك التشغيلي الحالي.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={module.link}
                className="group rounded-3xl border border-white/5 bg-[#0A0A0F] p-6 transition-all hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="rounded-2xl border border-white/5 bg-[#05050A] p-3 transition-transform group-hover:scale-110">
                    {module.icon}
                  </div>
                  <span className="text-sm text-slate-600 transition-colors group-hover:text-slate-300">
                    ←
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {module.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
