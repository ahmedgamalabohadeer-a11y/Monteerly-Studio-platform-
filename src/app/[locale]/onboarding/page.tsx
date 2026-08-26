'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileText,
  Loader2,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

import { saveOnboardingProfile } from './actions';
type UserRole = 'freelancer' | 'client' | 'agency';

type StatusMessage = {
  text: string;
  type: 'success' | 'error' | 'info';
};

const roleConfig: Record<
  UserRole,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    professionalLabel: string;
    professionalPlaceholder: string;
    yearsLabel: string;
    bioLabel: string;
    bioPlaceholder: string;
    requiresTaxId: boolean;
  }
> = {
  freelancer: {
    label: 'مبدع / مستقل',
    description:
      'أنشئ ملفك الإبداعي أولًا. البيانات الضريبية لن تكون مطلوبة إلا عند السحب أو تنفيذ متطلبات مالية.',
    icon: <UserRound className="h-5 w-5" />,
    professionalLabel: 'التخصص الإبداعي',
    professionalPlaceholder: 'مثال: مونتير فيديو، مصمم موشن، صانع محتوى',
    yearsLabel: 'سنوات الخبرة',
    bioLabel: 'نبذة مهنية',
    bioPlaceholder: 'اكتب نبذة عن تخصصك، مهاراتك، ونوع الأعمال التي تنفذها.',
    requiresTaxId: false,
  },
  client: {
    label: 'عميل',
    description:
      'أنشئ ملفك لتتمكن من نشر الطلبات والتعاقد مع المبدعين. الرقم الضريبي اختياري ويمكن إضافته لاحقًا للفواتير.',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    professionalLabel: 'نوع النشاط أو المجال',
    professionalPlaceholder: 'مثال: تجارة إلكترونية، تسويق، إنتاج إعلامي',
    yearsLabel: 'سنوات العمل في المجال',
    bioLabel: 'نبذة عن احتياجاتك',
    bioPlaceholder: 'اكتب نوع المشاريع أو الخدمات التي تريد تنفيذها عبر المنصة.',
    requiresTaxId: false,
  },
  agency: {
    label: 'وكالة إنتاج',
    description:
      'أكمل ملف الوكالة لإدارة الفريق والمشاريع. البيانات الضريبية تُضاف لاحقًا عند تفعيل الفوترة المؤسسية.',
    icon: <Building2 className="h-5 w-5" />,
    professionalLabel: 'نوع خدمات الوكالة',
    professionalPlaceholder: 'مثال: إنتاج فيديو، إعلانات، إدارة محتوى',
    yearsLabel: 'سنوات خبرة الوكالة',
    bioLabel: 'نبذة عن الوكالة',
    bioPlaceholder: 'اكتب خدمات الوكالة، حجم الفريق، ونوع الإنتاج الذي تديره.',
    requiresTaxId: false,
  },
};

function normalizeRole(value: unknown): UserRole {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return 'freelancer';
}

export default function OnboardingGateway() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [role, setRole] = useState<UserRole>('freelancer');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const [formData, setFormData] = useState({
    professionalFocus: '',
    experienceYears: '',
    bio: '',
    taxId: '',
  });

  const config = roleConfig[role];

  useEffect(() => {
    let mounted = true;

    async function loadUserProfile() {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.replace('/ar/auth');
        return;
      }

      const user = authData.user;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, account_type, kyc_status, tax_id, experience_years, bio')
        .eq('id', user.id)
        .maybeSingle();

      if (!mounted) return;

      if (profileError) {
        setMessage({
          type: 'error',
          text: `تعذر تحميل ملفك الحالي: ${profileError.message}`,
        });
      }

      setRole(normalizeRole(profile?.account_type));
      setFullName(
        profile?.full_name ||
          (typeof user.user_metadata?.full_name === 'string'
            ? user.user_metadata.full_name
            : ''),
      );

      setFormData({
        professionalFocus: '',
        experienceYears:
          profile?.experience_years !== null &&
          profile?.experience_years !== undefined
            ? String(profile.experience_years)
            : '',
        bio: profile?.bio || '',
        taxId: profile?.tax_id || '',
      });

      setInitializing(false);
    }

    loadUserProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  const updateForm = (key: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const years = Number.parseInt(formData.experienceYears, 10);

      if (!fullName.trim()) {
        throw new Error('يرجى إدخال الاسم أو اسم الوكالة.');
      }

      if (!formData.professionalFocus.trim()) {
        throw new Error('يرجى إدخال التخصص أو مجال النشاط.');
      }

      if (!Number.isFinite(years) || years < 0 || years > 80) {
        throw new Error('يرجى إدخال عدد صحيح صالح لسنوات الخبرة.');
      }

      if (formData.bio.trim().length < 20) {
        throw new Error('يرجى كتابة نبذة لا تقل عن 20 حرفًا.');
      }

      await saveOnboardingProfile({
        accountType: role,
        fullName,
        professionalFocus: formData.professionalFocus,
        experienceYears: formData.experienceYears,
        bio: formData.bio,
        taxId: formData.taxId,
      });

      setMessage({
        type: 'success',
        text: 'تم حفظ ملفك بنجاح. سيتم تحويلك إلى مركز القيادة.',
      });

      window.setTimeout(() => {
        router.push('/ar/dashboard');
      }, 700);
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
            : 'حدث خطأ غير متوقع أثناء حفظ البيانات.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div
        className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 text-slate-50"
        dir="rtl"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0A0F] px-6 py-5 text-sm font-bold">
          <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
          جارٍ تحميل ملفك…
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#05050A] flex items-center justify-center p-6 font-sans text-slate-50"
      dir="rtl"
    >
      <main className="w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-[#0A0A0F] p-6 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={() => router.push('/ar')}
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للرئيسية
        </button>

        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="h-9 w-9" />
          </div>

          <h1 className="text-3xl font-black text-white">
            التهيئة السيادية
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            أكمل بياناتك الأساسية لتفعيل حسابك بدون طلب معلومات مالية غير ضرورية.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-xl bg-indigo-500/15 p-2 text-indigo-300">
              {config.icon}
            </div>

            <div>
              <p className="text-xs font-bold text-indigo-300">
                دورك التشغيلي
              </p>
              <h2 className="mt-1 text-lg font-black text-white">
                {config.label}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {config.description}
              </p>
            </div>
          </div>
        </section>

        {message && (
          <div
            role="status"
            className={`mb-6 rounded-2xl border p-4 text-sm font-bold ${
              message.type === 'error'
                ? 'border-rose-500/20 bg-rose-500/10 text-rose-300'
                : message.type === 'success'
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="full-name"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              {role === 'agency' ? 'اسم الوكالة' : 'الاسم الكامل'}
            </label>

            <input
              id="full-name"
              required
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={
                role === 'agency'
                  ? 'مثال: وكالة منتيرلي للإنتاج'
                  : 'اكتب اسمك الكامل'
              }
              className="min-h-12 w-full rounded-xl border border-white/10 bg-[#12121A] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="professional-focus"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              {config.professionalLabel}
            </label>

            <input
              id="professional-focus"
              required
              type="text"
              value={formData.professionalFocus}
              onChange={(event) =>
                updateForm('professionalFocus', event.target.value)
              }
              placeholder={config.professionalPlaceholder}
              className="min-h-12 w-full rounded-xl border border-white/10 bg-[#12121A] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="experience-years"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                {config.yearsLabel}
              </label>

              <input
                id="experience-years"
                required
                type="number"
                min="0"
                max="80"
                value={formData.experienceYears}
                onChange={(event) =>
                  updateForm('experienceYears', event.target.value)
                }
                placeholder="مثال: 3"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-[#12121A] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="tax-id"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                الرقم الضريبي
                <span className="mr-2 text-xs font-normal text-slate-500">
                  اختياري
                </span>
              </label>

              <input
                id="tax-id"
                type="text"
                value={formData.taxId}
                onChange={(event) => updateForm('taxId', event.target.value)}
                placeholder="يمكن إضافته لاحقًا"
                className="min-h-12 w-full rounded-xl border border-white/10 bg-[#12121A] px-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              {config.bioLabel}
            </label>

            <textarea
              id="bio"
              required
              minLength={20}
              value={formData.bio}
              onChange={(event) => updateForm('bio', event.target.value)}
              placeholder={config.bioPlaceholder}
              className="min-h-36 w-full resize-y rounded-xl border border-white/10 bg-[#12121A] p-4 text-white outline-none transition-colors placeholder:text-slate-600 focus:border-indigo-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              الحد الأدنى: 20 حرفًا.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#12121A]/70 p-4 text-sm leading-6 text-slate-400">
            <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

            <p>
              يمكنك إنشاء ملفك بدون رقم ضريبي. سيتم طلبه فقط عند الحاجة إلى
              الفوترة أو السحب أو تفعيل متطلبات تجارية محددة.
            </p>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-black text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-[#12121A] disabled:text-slate-500"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                جارٍ حفظ البيانات…
              </>
            ) : (
              <>
                <FileText className="h-5 w-5" />
                حفظ البيانات والانتقال لمركز القيادة
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
