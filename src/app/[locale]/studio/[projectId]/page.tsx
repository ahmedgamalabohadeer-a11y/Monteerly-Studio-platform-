'use client';

import React, { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Cpu,
  FileText,
  Loader2,
  LockKeyhole,
  MonitorPlay,
  Send,
  ShieldCheck,
  Users,
  Video,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ReviewPlayer from '@/components/workspace/ReviewPlayer';

type UserRole = 'freelancer' | 'client' | 'agency';

type JobSnapshot = {
  description?: string;
  videoUrl?: string;
  created_by_role?: string;
  escrow_status?: string;
};

type Project = {
  id: string;
  title: string | null;
  budget: number | null;
  status: string | null;
  client_id: string | null;
  freelancer_id: string | null;
  snapshot: JobSnapshot | null;
};

type ProjectVersion = {
  id: number;
  label: string;
  url: string;
  status: string;
};

function normalizeRole(value: unknown): UserRole {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return 'freelancer';
}

function getRoleLabel(role: UserRole) {
  if (role === 'client') return 'عميل';
  if (role === 'agency') return 'وكالة إنتاج';
  return 'مبدع / مستقل';
}

function getStatusLabel(status: string | null) {
  if (status === 'completed') return 'مكتمل';
  if (status === 'in_progress') return 'قيد التنفيذ';
  if (status === 'pending') return 'بانتظار الإجراء';
  if (status === 'open') return 'بانتظار اختيار المنفذ';
  return 'مسودة مشروع';
}

function getStatusStyle(status: string | null) {
  if (status === 'completed') {
    return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
  }

  if (status === 'in_progress') {
    return 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300';
  }

  if (status === 'pending') {
    return 'border-amber-500/20 bg-amber-500/10 text-amber-200';
  }

  return 'border-slate-500/20 bg-slate-500/10 text-slate-300';
}

function getSafeVideoUrl(snapshot: JobSnapshot | null) {
  if (snapshot?.videoUrl && snapshot.videoUrl.startsWith('http')) {
    return snapshot.videoUrl;
  }

  return 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4';
}

export default function DynamicStudioPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const router = useRouter();
  const { projectId } = use(params);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [role, setRole] = useState<UserRole>('freelancer');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeVersion, setActiveVersion] = useState(1);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStudio() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData.user) {
          router.replace('/ar/auth');
          return;
        }

        const user = authData.user;

        const [profileResult, projectResult] = await Promise.all([
          supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('jobs')
            .select('id, title, budget, status, client_id, freelancer_id, snapshot')
            .eq('id', projectId)
            .maybeSingle(),
        ]);

        if (!active) return;

        if (profileResult.error) {
          throw new Error(`تعذر تحميل دور المستخدم: ${profileResult.error.message}`);
        }

        if (projectResult.error) {
          throw new Error(`تعذر تحميل المشروع: ${projectResult.error.message}`);
        }

        const fetchedProject = projectResult.data as Project | null;

        if (!fetchedProject) {
          throw new Error('المشروع المطلوب غير موجود أو تم حذفه.');
        }

        const resolvedRole = normalizeRole(
          profileResult.data?.role || user.user_metadata?.role,
        );

        /*
         * العميل هو صاحب المشروع.
         * المستقل هو المنفذ عند تعيين freelancer_id.
         * الوكالة يسمح لها بالوصول مؤقتًا في النسخة الحالية؛
         * لاحقًا يجب ربطها بجدول agency_members أو project_members.
         */
        const isClient = fetchedProject.client_id === user.id;
        const isFreelancer = fetchedProject.freelancer_id === user.id;
        const isAgency = resolvedRole === 'agency';

        if (!isClient && !isFreelancer && !isAgency) {
          router.replace('/ar/unauthorized');
          return;
        }

        setRole(resolvedRole);
        setProject(fetchedProject);
      } catch (error: unknown) {
        if (!active) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'حدث خطأ غير متوقع أثناء تحميل مساحة العمل.',
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadStudio();

    return () => {
      active = false;
    };
  }, [projectId, router]);

  const versions = useMemo<ProjectVersion[]>(() => {
    const mainVideoUrl = getSafeVideoUrl(project?.snapshot || null);

    return [
      {
        id: 1,
        label: 'النسخة الأولية',
        url: mainVideoUrl,
        status: 'جاهزة للمراجعة',
      },
      {
        id: 2,
        label: 'نسخة المراجعة',
        url: mainVideoUrl,
        status: 'بانتظار الإنتاج',
      },
    ];
  }, [project?.snapshot]);

  const selectedVersion =
    versions.find((version) => version.id === activeVersion) || versions[0];

  const canRequestReview =
    role === 'freelancer' || role === 'agency';

  const canApproveDelivery = role === 'client';

  const handleWorkspaceAction = (action: 'review' | 'approve' | 'assign') => {
    if (action === 'review') {
      setActionMessage(
        'تم تسجيل طلب المراجعة. ستظهر هذه الخطوة في سجل المشروع عند ربط نظام الإشعارات.',
      );
      return;
    }

    if (action === 'approve') {
      setActionMessage(
        'تم تسجيل طلب اعتماد التسليم. لن يتم تحرير الدفعة قبل اكتمال تدفق Escrow الفعلي.',
      );
      return;
    }

    setActionMessage(
      'إدارة فريق الوكالة ستكون متاحة عند ربط أعضاء الوكالة بالمشروع.',
    );
  };

  if (loading) {
    return (
      <main
        className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-50"
        dir="rtl"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900 px-6 py-5 text-sm font-bold text-slate-300">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          جارٍ فتح مساحة العمل…
        </div>
      </main>
    );
  }

  if (errorMessage || !project) {
    return (
      <main
        className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-50"
        dir="rtl"
      >
        <div className="w-full max-w-lg rounded-[2rem] border border-rose-500/20 bg-slate-900 p-8 text-center shadow-2xl">
          <CircleAlert className="mx-auto mb-4 h-12 w-12 text-rose-400" />
          <h1 className="text-2xl font-black text-white">
            تعذر فتح مساحة العمل
          </h1>
          <p className="mt-3 text-sm leading-7 text-rose-200">
            {errorMessage || 'لا يمكن الوصول إلى المشروع المطلوب.'}
          </p>
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
    <div
      className="min-h-screen bg-slate-950 font-sans text-slate-50 md:flex"
      dir="rtl"
    >
      <aside className="border-b border-slate-800 bg-slate-900 p-5 md:min-h-screen md:w-80 md:border-b-0 md:border-l md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/ar/dashboard"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
            مركز القيادة
          </Link>

          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-bold text-indigo-300">
            {getRoleLabel(role)}
          </span>
        </div>

        <div className="mb-6 border-b border-white/5 pb-5">
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <Cpu className="h-6 w-6 text-indigo-400" />
            أدوات المشروع
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            الأدوات المتاحة تتكيف مع دورك داخل هذا المشروع.
          </p>
        </div>

        <div className="space-y-3">
          {(role === 'freelancer' || role === 'agency') && (
            <>
              <button
                type="button"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-right transition-colors hover:border-indigo-500"
              >
                <span className="mb-1 block font-bold text-indigo-400">
                  Color Grading
                </span>
                <span className="text-xs text-slate-500">
                  تصحيح ألوان سينمائي تلقائي
                </span>
              </button>

              <button
                type="button"
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-right transition-colors hover:border-emerald-500"
              >
                <span className="mb-1 block font-bold text-emerald-400">
                  Audio Master
                </span>
                <span className="text-xs text-slate-500">
                  تنقية الصوت وعزل الضوضاء
                </span>
              </button>
            </>
          )}

          {role === 'client' && (
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-indigo-300">
                <MonitorPlay className="h-5 w-5" />
                <h3 className="font-black">مساحة المراجعة</h3>
              </div>
              <p className="text-xs leading-5 text-slate-400">
                راجع النسخ، أرسل ملاحظاتك، واعتمد التسليم عند الجاهزية.
              </p>
            </div>
          )}

          {role === 'agency' && (
            <button
              type="button"
              onClick={() => handleWorkspaceAction('assign')}
              className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-right transition-colors hover:bg-white/10"
            >
              <Users className="h-5 w-5 text-emerald-300" />
              <span>
                <span className="block text-sm font-black text-white">
                  إدارة فريق المشروع
                </span>
                <span className="text-xs text-slate-500">
                  تعيين أعضاء الوكالة لاحقًا
                </span>
              </span>
            </button>
          )}

          <div className="rounded-2xl border border-white/5 bg-[#0A0A0F] p-4">
            <div className="flex items-center gap-2 text-slate-300">
              <LockKeyhole className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-black">حالة الضمان</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {project.snapshot?.escrow_status === 'funded'
                ? 'تم تمويل العقد وحفظ الدفعة في الضمان.'
                : 'لم يتم تمويل الضمان بعد. ستُفعّل الدفعة من بوابة الدفع بعد الاتفاق.'}
            </p>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-4 md:p-8">
        <header className="mb-6 rounded-3xl border border-white/5 bg-slate-900/50 p-5 md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyle(
                    project.status,
                  )}`}
                >
                  {getStatusLabel(project.status)}
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Escrow: {project.snapshot?.escrow_status || 'not_funded'}
                </span>
              </div>

              <h1 className="text-2xl font-black text-white md:text-3xl">
                {project.title || 'مشروع بلا عنوان'}
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {project.snapshot?.description ||
                  'لم تتم إضافة تفاصيل وصف المشروع بعد.'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-right">
              <p className="text-xs text-slate-500">الميزانية التقديرية</p>
              <p className="mt-1 text-lg font-black text-emerald-400">
                {project.budget ? `$${project.budget}` : 'قيد التحديد'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/5 pt-5 md:flex-row md:items-center md:justify-between">
            <div className="flex overflow-x-auto rounded-full border border-white/10 bg-slate-950 p-1">
              {versions.map((version) => (
                <button
                  key={version.id}
                  type="button"
                  onClick={() => setActiveVersion(version.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    activeVersion === version.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {version.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {canRequestReview && (
                <button
                  type="button"
                  onClick={() => handleWorkspaceAction('review')}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 text-sm font-black text-emerald-300 transition-colors hover:bg-emerald-500/20"
                >
                  <Send className="h-4 w-4" />
                  طلب مراجعة العميل
                </button>
              )}

              {canApproveDelivery && (
                <button
                  type="button"
                  onClick={() => handleWorkspaceAction('approve')}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-black text-white transition-colors hover:bg-emerald-500"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  اعتماد التسليم
                </button>
              )}
            </div>
          </div>
        </header>

        {actionMessage && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm leading-6 text-indigo-100"
          >
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
            <span>{actionMessage}</span>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-white/5 bg-black shadow-2xl">
          <ReviewPlayer
            url={selectedVersion.url}
            activeVersion={activeVersion}
            orderId={project.id}
            ar={{
              system: { loading: 'جارٍ تحميل مساحة المراجعة…' },
              legal: { vault: 'أصول المشروع مشفرة ومحفوظة' },
            }}
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
            <Video className="mb-3 h-5 w-5 text-indigo-300" />
            <h2 className="font-black text-white">النسخة المعروضة</h2>
            <p className="mt-2 text-sm text-slate-400">
              {selectedVersion.label} — {selectedVersion.status}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
            <Clock3 className="mb-3 h-5 w-5 text-amber-300" />
            <h2 className="font-black text-white">مرحلة المشروع</h2>
            <p className="mt-2 text-sm text-slate-400">
              {getStatusLabel(project.status)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-5">
            <ShieldCheck className="mb-3 h-5 w-5 text-emerald-300" />
            <h2 className="font-black text-white">حماية الأصول</h2>
            <p className="mt-2 text-sm text-slate-400">
              الملفات والمراجعات تعمل ضمن مساحة مشروع محمية.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
