import Image from 'next/image';
import { MONTEERLY_ASSETS } from '@/constants/assets';
import { finalizeFreelancerOnboarding } from './actions';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function FreelancerSetupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 font-sans" dir="rtl">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[3.5rem] border border-slate-100 bg-slate-950 shadow-2xl md:flex-row">
        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white md:w-2/5">
          <div className="relative z-10">
            <Image
              src={MONTEERLY_ASSETS.LOGO.FULL}
              alt="Monteerly Logo"
              width={160}
              height={48}
              className="mb-12 w-40 h-auto"
              priority
            />
            <h2 className="mb-6 text-4xl font-black leading-tight">
              مرحباً بك في <br />
              نخبة المبدعين
            </h2>
            <p className="text-lg leading-relaxed text-slate-400">
              أنت الآن بصدد تفعيل استوديو العمل الخاص بك. هذه الخطوة تمنحك السيادة الكاملة على مشاريعك
              وعقودك المالية.
            </p>
          </div>

          <div className="relative z-10 mt-12 rounded-3xl border border-white/10 bg-slate-950/5 p-6 backdrop-blur-sm">
            <Image
              src={MONTEERLY_ASSETS.FEATURES.WORKSPACE}
              alt="Workspace Preview"
              width={1200}
              height={750}
              className="mb-4 h-auto rounded-2xl shadow-2xl"
            />
            <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
              غرفة العمليات التعاونية
            </p>
          </div>

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>

        <div className="p-16 md:w-3/5">
          <header className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black text-indigo-700">
              <Sparkles className="h-4 w-4" /> تفعيل الهوية الرقمية (F-009)
            </div>
            <h1 className="text-3xl font-black text-slate-50">أكمل إعداد ملفك الشخصي</h1>
          </header>

          <form
            action={async (formData) => {
              'use server';
              await finalizeFreelancerOnboarding(formData);
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-50">الاسم المهني (الذي سيظهر في العقود)</label>
                <input
                  name="full_name"
                  required
                  type="text"
                  placeholder="أحمد جمال..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition-all focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-slate-50">التخصص الأساسي (الدائرة الأولى)</label>
                <select
                  name="role"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none transition-all focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                >
                  <option value="editor">المونتير (Video Editor)</option>
                  <option value="videographer">المصور (Videographer)</option>
                  <option value="motion_designer">مصمم الجرافيك (Motion Designer)</option>
                  <option value="colorist">مصحح الألوان (Colorist)</option>
                  <option value="sound_engineer">مهندس الصوت (Sound Engineer)</option>
                  <option value="director">المخرج (Director)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-50">نبذة تعريفية (Bio)</label>
              <textarea
                name="bio"
                rows={3}
                placeholder="ما الذي يميز استوديو العمل الخاص بك؟"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition-all focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-slate-50">رابط معرض الأعمال (Portfolio)</label>
              <input
                name="portfolio_url"
                type="url"
                placeholder="https://vimeo.com/your-work"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left outline-none transition-all focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                dir="ltr"
              />
            </div>

            <div className="flex items-start gap-4 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6">
              <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-600" />
              <p className="text-xs font-bold leading-relaxed text-emerald-800">
                بإتمام هذا الإعداد، أنت تقر بامتثالك للقوانين السيادية لمنصة Monteerly. سيتم توليد
                &quot;هوية برمجية&quot; محمية بـ RLS وتفعيل حقك في استلام أموال الضمان (Escrow).
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-[2rem] bg-slate-900 py-5 text-lg font-black text-white shadow-2xl shadow-slate-900/20 transition-all hover:bg-black active:scale-95"
            >
              تفعيل الاستوديو والبدء في العمل
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
