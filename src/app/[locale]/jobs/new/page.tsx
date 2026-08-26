'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleAlert,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CreateJobForm } from '@/components/forms/CreateJobForm';

type UserRole = 'freelancer' | 'client' | 'agency';

function normalizeRole(value: unknown): UserRole | null {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return null;
}

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace('/ar/auth');
        return;
      }

      const user = authData.user;
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('id', user.id)
        .maybeSingle();

      if (!active) return;

      if (profileError) {
        setMessage(`تعذر التحقق من دور الحساب: ${profileError.message}`);
        setLoading(false);
        return;
      }

      const resolvedRole = normalizeRole(profile?.account_type);

      setRole(resolvedRole);

      if (resolvedRole === 'client' || resolvedRole === 'agency') {
        setAllowed(true);
      } else {
        setAllowed(false);
      }

      setLoading(false);
    }

    verifyAccess();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6"
        dir="rtl"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 px-6 py-5 text-sm font-bold text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          جارٍ التحقق من صلاحيات الحساب…
        </div>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main
        className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans"
        dir="rtl"
      >
        <div className="w-full max-w-lg rounded-[2rem] border border-amber-500/20 bg-slate-900 p-8 text-center shadow-2xl">
          <CircleAlert className="mx-auto mb-4 h-12 w-12 text-amber-400" />

          <h1 className="text-2xl font-black text-white">
            إنشاء المشاريع متاح للعملاء والوكالات فقط
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            نوع حسابك الحالي هو{' '}
            <span className="font-bold text-indigo-300">
              {role === 'freelancer' ? 'مبدع / مستقل' : 'غير محدد'}
            </span>
            . يمكنك استكشاف السوق أو إدارة ملفك الإبداعي بدل إنشاء طلب جديد.
          </p>

          {message && (
            <p className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300">
              {message}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ar/marketplace"
              className="flex-1 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-indigo-500"
            >
              استكشاف السوق
            </Link>

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
      className="min-h-screen bg-slate-950 p-6 font-sans text-white md:p-8"
      dir="rtl"
    >
      <div className="mx-auto max-w-3xl pt-6 md:pt-12">
        <Link
          href="/ar/dashboard"
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
          العودة إلى مركز القيادة
        </Link>

        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            إنشاء مشروع محمي عبر Monteerly Escrow
          </div>

          <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-black">
            <BriefcaseBusiness className="h-8 w-8 text-indigo-400" />
            ابدأ مشروعك الاحترافي
          </h1>

          <p className="leading-7 text-slate-400">
            أنشئ طلبك الآن، ثم راجع المرشحين وفعّل التمويل المحمي بعد اختيار المنفذ.
          </p>
        </header>

        <CreateJobForm />
      </div>
    </main>
  );
}
