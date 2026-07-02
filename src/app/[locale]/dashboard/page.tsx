import Link from 'next/link';
import {
  Activity,
  BrainCircuit,
  Briefcase,
  MonitorPlay,
  ShieldAlert,
  ShieldCheck,
  Video,
  Wallet,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function ElegantDashboard() {
  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    redirect('/ar/auth');
  }

  const userId = authData.user.id;

  const [profileRes, contractsRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, role, kyc_status')
      .eq('id', userId)
      .single(),
    supabase
      .from('jobs')
      .select('*')
      .or(`client_id.eq.${userId},freelancer_id.eq.${userId}`)
      .in('status', ['in_progress', 'pending']),
  ]);

  const profile = profileRes.data;
  const activeContracts = contractsRes.data || [];

  const modules = [
    {
      title: 'سوق العمل',
      icon: <Briefcase size={28} className="text-emerald-400" />,
      link: '/ar/marketplace',
    },
    {
      title: 'مساحة العمل',
      icon: <MonitorPlay size={28} className="text-indigo-400" />,
      link: '/ar/studio',
    },
    {
      title: 'المحفظة',
      icon: <Wallet size={28} className="text-rose-400" />,
      link: '/ar/wallet',
    },
    {
      title: 'الذكاء الاصطناعي',
      icon: <BrainCircuit size={28} className="text-amber-400" />,
      link: '/ar/ai-studio',
    },
    {
      title: 'الامتثال الأمني (KYC)',
      icon: (
        <ShieldCheck
          size={28}
          className={
            profile?.kyc_status === 'approved'
              ? 'text-emerald-400'
              : 'text-slate-400'
          }
        />
      ),
      link: '/ar/kyc',
    },
    {
      title: 'المكتبة',
      icon: <Video size={28} className="text-cyan-400" />,
      link: '/ar/library',
    },
    {
      title: 'العقود السيادية',
      icon: <Briefcase size={28} className="text-indigo-400" />,
      link: '/ar/contracts',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-8">
      {profile?.kyc_status !== 'approved' && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 sm:flex-row">
          <div className="flex items-center gap-3 text-rose-400">
            <ShieldAlert className="shrink-0 animate-pulse" />
            <span className="text-sm font-bold">
              تنبيه أمني: هويتك (KYC) غير موثقة. لن تتمكن من سحب الأرباح.
            </span>
          </div>

          <Link
            href="/ar/kyc"
            className="w-full rounded-lg bg-rose-500 px-6 py-2 text-center text-sm font-black text-white transition-colors hover:bg-rose-600 sm:w-auto"
          >
            توثيق الهوية الآن
          </Link>
        </div>
      )}

      {activeContracts.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 sm:flex-row">
          <div className="flex items-center gap-3 text-amber-400">
            <Activity className="shrink-0 animate-pulse" />
            <span className="text-sm font-bold">
              لديك {activeContracts.length} مشروع نشط يحتاج لمتابعتك.
            </span>
          </div>

          <Link
            href={`/ar/workspace/${activeContracts[0].id}`}
            className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-black text-black"
          >
            الذهاب لمساحة العمل
          </Link>
        </div>
      )}

      <header className="space-y-2">
        <h1 className="text-3xl font-black text-slate-50">مركز القيادة</h1>
        <p className="text-sm text-slate-400">
          مرحباً {profile?.full_name || 'أيها المبدع'}! كافة أنظمتك السيادية تعمل
          بكفاءة.
        </p>
      </header>

      <div className="flex min-h-48 items-center overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-indigo-950 via-slate-950 to-black p-8 shadow-2xl">
        <div className="relative z-10">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-black text-white">
            <Activity className="text-indigo-400" />
            نظرة سريعة على الأداء
          </h2>
          <p className="text-sm text-slate-300">
            عقودك النشطة محمية بنظام Escrow المتقدم.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {modules.map((mod) => (
          <Link key={mod.title} href={mod.link} className="block">
            <div className="group flex h-full flex-col items-center justify-center gap-4 rounded-3xl border border-white/5 bg-[#0A0A0F] p-8 text-center shadow-lg transition-all hover:border-indigo-500/30">
              <div className="rounded-2xl border border-white/5 bg-[#05050A] p-4 transition-transform group-hover:scale-110">
                {mod.icon}
              </div>
              <h3 className="text-sm font-black text-slate-200">{mod.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
