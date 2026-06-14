import React from 'react';
import Link from 'next/link';
import { Briefcase, Wallet, MonitorPlay, BrainCircuit, ShieldCheck, Video, Activity, ShieldAlert } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

// تحويل الصفحة لتصبح Server Component لجلب البيانات بأمان قبل العرض
export const dynamic = 'force-dynamic';

export default async function ElegantDashboard() {
  const { data: authData } = await supabase.auth.getUser();
  
  if (!authData?.user) {
    redirect('/ar/auth'); // حماية المسار
  }

  const userId = authData.user.id;

  // جلب البيانات الحقيقية من قاعدة البيانات بالتوازي (Parallel Fetching)
  const [profileRes, contractsRes] = await Promise.all([
    supabase.from('profiles').select('full_name, role, kyc_status').eq('id', userId).single(),
    supabase.from('jobs').select('*').or(`client_id.eq.${userId},freelancer_id.eq.${userId}`).in('status', ['in_progress', 'pending'])
  ]);

  const profile = profileRes.data;
  const activeContracts = contractsRes.data || [];

  const modules = [
    { title: 'سوق العمل', icon: <Briefcase size={28} className="text-emerald-400" />, link: '/ar/marketplace' },
    { title: 'مساحة العمل', icon: <MonitorPlay size={28} className="text-indigo-400" />, link: '/ar/studio' }, // تم تصحيح المسار ليتوافق مع مجلد studio
    { title: 'المحفظة', icon: <Wallet size={28} className="text-rose-400" />, link: '/ar/wallet' }, // تم تصحيح المسار
    { title: 'الذكاء الاصطناعي', icon: <BrainCircuit size={28} className="text-amber-400" />, link: '/ar/ai-studio' },
    { title: 'الامتثال الأمني (KYC)', icon: <ShieldCheck size={28} className={profile?.kyc_status === 'approved' ? 'text-emerald-400' : 'text-slate-400'} />, link: '/ar/kyc' },
    { title: 'المكتبة', icon: <Video size={28} className="text-cyan-400" />, link: '/ar/library' },
    { title: 'العقود السيادية', icon: <Briefcase size={28} className="text-indigo-400" />, link: '/ar/contracts' }, // تم تصحيح المسار
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">

        {/* نظام التنبيهات السيادي (ديناميكي) */}
        {profile?.kyc_status !== 'approved' && (
          <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-rose-500">
                 <ShieldAlert className="animate-pulse shrink-0" />
                 <span className="text-sm font-bold">تنبيه أمني: هويتك (KYC) غير موثقة. لن تتمكن من سحب الأرباح.</span>
              </div>
              <Link href="/ar/kyc" className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg text-sm font-black transition-colors text-center w-full sm:w-auto">
                 توثيق الهوية الآن
              </Link>
          </div>
        )}

        {activeContracts.length > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-500">
                 <Activity className="animate-pulse shrink-0" />
                 <span className="text-sm font-bold">لديك {activeContracts.length} مشروع نشط يحتاج لمتابعتك.</span>
              </div>
              <Link href={`/ar/studio/${activeContracts[0].id}`} className="bg-amber-500 text-black px-4 py-1 rounded-lg text-xs font-black">
                 الذهاب لمساحة العمل
              </Link>
          </div>
        )}

        <header className="mb-10">
            <h1 className="text-3xl font-black mb-2">مركز القيادة</h1>
            <p className="text-slate-400 text-sm">
              مرحباً {profile?.full_name || 'أيها المبدع'}! كافة أنظمتك السيادية تعمل بكفاءة.
            </p>
        </header>

        <div className="relative h-48 rounded-[2rem] overflow-hidden mb-8 border border-white/5 shadow-2xl flex items-center p-8 bg-gradient-to-br from-indigo-950 via-slate-950 to-black">
           <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white"><Activity className="text-indigo-400"/> نظرة سريعة على الأداء</h2>
              <p className="text-slate-300 text-sm">عقودك النشطة محمية بنظام Escrow المتقدم.</p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <Link key={i} href={mod.link}>
              <div className="bg-[#0A0A0F] border border-white/5 p-8 rounded-3xl hover:border-indigo-500/30 transition-all flex flex-col items-center justify-center text-center gap-4 shadow-lg group">
                 <div className="p-4 bg-[#05050A] rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">{mod.icon}</div>
                 <h3 className="text-sm font-black text-slate-200">{mod.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
