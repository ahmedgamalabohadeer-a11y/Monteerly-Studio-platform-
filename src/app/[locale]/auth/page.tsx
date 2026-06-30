'use client'
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Loader2, Globe, ArrowRight, Bug } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthGateway() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [debugInfo, setDebugInfo] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', role: 'freelancer', acceptTerms: false });

  const roles = [
    { id: 'freelancer', label: 'مبدع / مستقل (Freelancer)' },
    { id: 'client', label: 'عميل (Client)' },
    { id: 'agency', label: 'وكالة إنتاج (Agency)' },
  ];

  const handleGoogleAuth = async () => {
    setLoading(true);
    setMsg({ text: '', type: '' });
    setDebugInfo('');

    try {
      if (!supabase?.auth) {
        throw new Error('Supabase client غير مهيأ بشكل صحيح.');
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/ar/onboarding` }
      });

      if (error) throw error;
    } catch (e: unknown) {
      const err = e as { message?: string; status?: number; code?: string };
      setMsg({ text: err?.message || 'فشل تسجيل الدخول عبر Google', type: 'error' });
      setDebugInfo(JSON.stringify({
        source: 'google-oauth',
        message: err?.message || null,
        status: err?.status || null,
        code: err?.code || null,
        origin: typeof window !== 'undefined' ? window.location.origin : null
      }, null, 2));
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });
    setDebugInfo('');

    try {
      if (!supabase?.auth) {
        throw new Error('Supabase client غير مهيأ بشكل صحيح.');
      }

      if (!formData.email || !formData.password) {
        throw new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;

        setDebugInfo(JSON.stringify({
          source: 'email-login',
          success: true,
          userId: data?.user?.id || null,
          email: data?.user?.email || null,
          session: !!data?.session
        }, null, 2));

        setLoading(false);
        router.push('/ar/dashboard');
      } else {
        if (!formData.acceptTerms) {
          throw new Error('يجب الموافقة على الشروط السيادية.');
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { role: formData.role } }
        });

        if (error) throw error;

        setMsg({
          text: data?.session
            ? 'تم إنشاء الحساب وتسجيل الدخول بنجاح.'
            : 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الحساب.',
          type: 'success'
        });

        setDebugInfo(JSON.stringify({
          source: 'email-signup',
          success: true,
          userId: data?.user?.id || null,
          email: data?.user?.email || null,
          session: !!data?.session,
          role: formData.role
        }, null, 2));

        setLoading(false);
        router.push('/ar/onboarding');
      }
    } catch (e: unknown) {
      const err = e as { message?: string; status?: number; code?: string; name?: string };
      setMsg({ text: err?.message || 'حدث خطأ غير متوقع', type: 'error' });
      setDebugInfo(JSON.stringify({
        source: isLogin ? 'email-login' : 'email-signup',
        success: false,
        message: err?.message || null,
        status: err?.status || null,
        code: err?.code || null,
        name: err?.name || null,
        email: formData.email || null,
        hasPassword: !!formData.password,
        origin: typeof window !== 'undefined' ? window.location.origin : null
      }, null, 2));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex font-sans text-slate-50" dir="rtl">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 z-10 relative">
        <button onClick={() => router.push('/ar')} className="absolute top-8 right-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowRight className="w-4 h-4" /> العودة
        </button>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <ShieldCheck className="w-12 h-12 text-indigo-500 mb-4" />
            <h1 className="text-4xl font-black text-white mb-2">{isLogin ? 'بوابة العبور' : 'تأسيس الهوية السيادية'}</h1>
            <p className="text-slate-400 text-sm">Monteerly OS - حيث تلتقي النخب الإبداعية بالقوة التقنية.</p>
          </div>

          {msg.text && (
            <div className={`p-4 rounded-xl mb-6 border text-sm font-bold flex items-center gap-2 animate-in fade-in ${
              msg.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              <Lock className="w-4 h-4" /> {msg.text}
            </div>
          )}

          {debugInfo && (
            <div className="p-4 rounded-xl mb-6 bg-slate-900 border border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold">
                <Bug className="w-4 h-4" />
                Debug Info
              </div>
              <pre className="whitespace-pre-wrap break-words overflow-x-auto">{debugInfo}</pre>
            </div>
          )}

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-bold mb-6 flex justify-center items-center gap-2 hover:bg-slate-200 disabled:opacity-60 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Globe size={18} />}
            المتابعة عبر جوجل (Google)
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#05050A] px-4 text-xs text-slate-500 font-bold absolute">أو عبر البريد المشفر</span>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">الدور التشغيلي (Role)</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer"
                >
                  {roles.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                required
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#12121A] border border-white/10 p-4 pr-12 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>

            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                required
                type="password"
                placeholder="كلمة المرور المشفرة"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#12121A] border border-white/10 p-4 pr-12 rounded-xl text-white outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
              />
            </div>

            {!isLogin && (
              <label className="flex items-center gap-3 text-sm text-slate-400 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-[#12121A] accent-indigo-500"
                />
                <span>أوافق على بروتوكولات الحماية (Escrow) وسياسة الخصوصية.</span>
              </label>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-[#12121A] disabled:text-slate-500 text-white py-4 rounded-xl font-black flex justify-center items-center gap-2 transition-all mt-4"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (isLogin ? 'تأمين الاتصال والدخول' : 'تأسيس الهوية السيادية')}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? 'لست جزءاً من النخبة بعد؟' : 'تمتلك هوية مسبقاً؟'}
            <button onClick={() => { setIsLogin(!isLogin); setMsg({ text: '', type: '' }); setDebugInfo(''); }} className="text-indigo-400 font-bold mr-2 hover:text-indigo-300">
              {isLogin ? 'أسس هويتك الآن' : 'ادخل للمنصة'}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-[#0A0A0F] border-r border-white/5 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-purple-900/20 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] opacity-[0.05] bg-cover bg-center mix-blend-overlay"></div>

        <div className="relative z-10 max-w-lg p-12">
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            احمِ إبداعك،<br /> <span className="text-indigo-400">وثّق حقوقك.</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl"><ShieldCheck /></div>
              <div>
                <h4 className="font-bold text-white mb-1">عقود ذكية (Escrow)</h4>
                <p className="text-sm text-slate-400">نضمن حقوق المبدع والعميل عبر حجز مالي مسبق.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl"><Lock /></div>
              <div>
                <h4 className="font-bold text-white mb-1">مساحات عمل مشفرة</h4>
                <p className="text-sm text-slate-400">تواصل وتعديلات لحظية في بيئة آمنة تماماً.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
