'use client'
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Briefcase, Loader2, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MCOS_ASSETS } from '@/lib/ui/assets';
import { OAuthProviders } from '@/components/auth/OAuthProviders';

export default function AuthGateway() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', role: 'client' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg({ text: '', type: '' });
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) throw error;
        setMsg({ text: 'تم الدخول بنجاح. جاري التوجيه...', type: 'success' });
        window.location.href = '/ar/dashboard';
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email, password: formData.password,
          options: { data: { full_name: formData.fullName, role: formData.role } }
        });
        if (error) throw error;
        setMsg({ text: 'تم تأسيس الهوية! راجع بريدك.', type: 'success' });
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error: any) { setMsg({ text: error.message || 'خطأ.', type: 'error' }); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans" dir="rtl">
      {/* الجانب الأيمن: الفورم الوظيفي */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <ShieldCheck className="w-12 h-12 text-indigo-500 mb-4" />
            <h1 className="text-4xl font-black text-white">{isLogin ? 'بوابة العبور' : 'تأسيس هوية جديدة'}</h1>
            <p className="text-slate-400 mt-2">MCOS Zero-Trust Auth Environment</p>
          </div>

          {msg.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input required type="text" placeholder="الاسم الكامل (قانونياً)" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none" />
                </div>
                <div className="relative">
                  <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none appearance-none">
                    <option value="client">عميل / صانع محتوى</option>
                    <option value="editor">مونتير / مبدع</option>
                    <option value="agency">شركة إنتاج</option>
                  </select>
                </div>
              </>
            )}
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none" />
            </div>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="password" placeholder="كلمة المرور المشفرة" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none" />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-black mt-4 flex justify-center items-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? <><LogIn className="w-5 h-5" /> دخول مشفر</> : <><ShieldCheck className="w-5 h-5" /> توثيق الهوية</>}
            </button>
          </form>
            <OAuthProviders />

          <button onClick={() => { setIsLogin(!isLogin); setMsg({text:'', type:''}); }} className="w-full mt-6 text-slate-400 hover:text-white text-sm font-bold transition-colors">
            {isLogin ? 'لا تملك هوية سيادية؟ أسس حسابك الآن' : 'لديك هوية بالفعل؟ سجل دخولك'}
          </button>
        </div>
      </div>

      {/* الجانب الأيسر: الصورة السينمائية من الدستور المرجعي */}
      <div className="hidden lg:flex w-1/2 relative items-end p-12">
        <div className="absolute inset-0 bg-slate-900">
          <img src={MCOS_ASSETS.hero.abstractShapes} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="MCOS Studio" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-black text-white mb-4">انضم لنخبة الصناعة</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Monteerly OS ليس مجرد موقع توظيف، بل هو الإمبراطورية الرقمية التي تدير فيها أعمالك، تحمي أموالك، وتضاعف إنتاجك بالذكاء الاصطناعي.
          </p>
        </div>
      </div>
    </div>
  );
}
