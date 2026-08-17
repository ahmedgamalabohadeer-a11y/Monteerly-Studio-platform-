'use client';

import React, { useState } from 'react';
import {
  CircleAlert,
  DollarSign,
  FileText,
  Loader2,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type FormMessage = {
  type: 'error' | 'success';
  text: string;
};

type FormData = {
  title: string;
  budget: string;
  description: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return 'حدث خطأ غير متوقع.';
}

export function CreateJobForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    budget: '',
    description: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        throw new Error('يرجى تسجيل الدخول أولًا.');
      }

      const user = authData.user;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error(`تعذر التحقق من دور الحساب: ${profileError.message}`);
      }

      const role = profile?.role || user.user_metadata?.role;

      if (role !== 'client' && role !== 'agency') {
        throw new Error('إنشاء المشاريع متاح للعملاء والوكالات فقط.');
      }

      const title = formData.title.trim();
      const description = formData.description.trim();
      const budget = Number.parseFloat(formData.budget);

      if (title.length < 5) {
        throw new Error('عنوان المشروع يجب أن يحتوي على 5 أحرف على الأقل.');
      }

      if (description.length < 20) {
        throw new Error('وصف المشروع يجب أن يحتوي على 20 حرفًا على الأقل.');
      }

      if (!Number.isFinite(budget) || budget <= 0) {
        throw new Error('أدخل ميزانية صحيحة أكبر من صفر.');
      }

      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .insert({
          title,
          budget,
          client_id: user.id,
          status: 'open',
          snapshot: {
            description,
            created_by_role: role,
            escrow_status: 'not_funded',
          },
        })
        .select('id')
        .single();

      if (jobError) {
        throw new Error(`تعذر إنشاء المشروع: ${jobError.message}`);
      }

      if (!job?.id) {
        throw new Error('تم إنشاء المشروع بدون معرف صالح.');
      }

      setMessage({
        type: 'success',
        text: 'تم إنشاء المشروع بنجاح. يمكنك الآن مراجعة مساحة العمل.',
      });

      window.setTimeout(() => {
        router.push(`/ar/studio/${job.id}`);
      }, 700);
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-[2.5rem] border border-white/5 bg-slate-900/50 p-6 shadow-2xl md:p-8"
    >
      {message && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-2xl border p-4 text-sm font-bold ${
            message.type === 'success'
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
              : 'border-rose-500/20 bg-rose-500/10 text-rose-300'
          }`}
        >
          {message.type === 'success' ? (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="project-title"
          className="mb-2 mr-2 block text-sm font-bold text-slate-400"
        >
          عنوان المشروع
        </label>

        <div className="relative">
          <FileText className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <input
            id="project-title"
            required
            minLength={5}
            type="text"
            value={formData.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="مثال: مونتاج فيديو يوتيوب سينمائي"
            className="min-h-13 w-full rounded-2xl border border-white/10 bg-slate-950 py-4 pl-4 pr-12 text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="project-description"
          className="mb-2 mr-2 block text-sm font-bold text-slate-400"
        >
          وصف المشروع والمتطلبات
        </label>

        <textarea
          id="project-description"
          required
          minLength={20}
          value={formData.description}
          onChange={(event) => updateField('description', event.target.value)}
          placeholder="اكتب المطلوب، مدة الفيديو، المنصات المستهدفة، الملفات المتاحة، والموعد المتوقع للتسليم."
          className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-slate-950 p-4 text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500"
        />

        <p className="mt-2 text-xs text-slate-500">
          اكتب 20 حرفًا على الأقل حتى يستطيع المبدعون فهم نطاق المشروع.
        </p>
      </div>

      <div>
        <label
          htmlFor="project-budget"
          className="mb-2 mr-2 block text-sm font-bold text-slate-400"
        >
          الميزانية التقديرية بالدولار
        </label>

        <div className="relative">
          <DollarSign className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-500" />

          <input
            id="project-budget"
            required
            min="1"
            step="0.01"
            type="number"
            value={formData.budget}
            onChange={(event) => updateField('budget', event.target.value)}
            placeholder="500"
            className="min-h-13 w-full rounded-2xl border border-white/10 bg-slate-950 py-4 pl-4 pr-12 text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4 text-sm leading-6 text-slate-400">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        <p>
          إنشاء المشروع لا يسحب الأموال تلقائيًا. سيتم تفعيل التمويل في خطوة مستقلة
          بعد مراجعة المشروع واختيار المبدع المناسب.
        </p>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-5 font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
      >
        {loading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            جارٍ إنشاء المشروع…
          </>
        ) : (
          <>
            <Rocket className="h-6 w-6" />
            تأسيس المشروع والانتقال لمساحة العمل
          </>
        )}
      </button>
    </form>
  );
}
