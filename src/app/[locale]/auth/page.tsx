'use client'
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Briefcase, Loader2, LogIn, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MCOS_ASSETS } from '@/lib/ui/assets';
import { MCOS_ROLES } from '@/lib/constants/roles';
import { OAuthProviders } from '@/components/auth/OAuthProviders';

export default function AuthGateway() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', realm: 'foundation', role: 'video_editor' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg({ text: '', type: '' });
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) throw error;
        setMsg({ text: 'تم فك التشفير بنجاح. جاري استدعاء الأصول السحابية...', type: 'success' });
        window.location.replace('/ar/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email, password: formData.password,
          options: { data: { full_name: formData.fullName, realm: formData.realm, role: formData.role } }
        });
        if (error) throw error;
        setMsg({ text: 'تم تأسيس الهوية السيادية! راجع بريدك لتفعيل التشفير.', type: 'success' });
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error: any) { setMsg({ text: error.message || 'تم رفض الوصول. بيانات غير صالحة.', type: 'error' }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex font-sans" dir="rtl">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-md py-10">
          <div className="mb-10 text-center lg:text-right">
            <img src={MCOS_ASSETS.branding.icon.src} alt="MCOS" className="w-14 h-14 mb-6 mx-auto lg:mx-0 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{isLogin ? 'بوابة العبور' : 'تأسيس هوية سيادية'}</h1>
            <p className="text-slate-400 text-sm md:text-base flex items-center justify-center lg:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> بيئة مصادقة معدومة الثقة (Zero-Trust)
            </p>
          </div>

          {msg.text && (
            <div className={`p-4 rounded-2xl mb-6 text-sm font-bold border ${msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
              {msg.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input required type="text" placeholder="الاسم الكامل (قانونياً لغايات الضمان)" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-[#12121A] border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-colors" />
                </div>
                
                {/* نظام اختيار الطبقة (Realm) */}
                <div className="relative">
                  <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  <select value={formData.realm} onChange={e => {
                    const newRealm = e.target.value as keyof typeof MCOS_ROLES;
                    setFormData({...formData, realm: newRealm, role: MCOS_ROLES[newRealm].roles[0].id});
                  }} className="w-full bg-indigo-900/10 border border-indigo-500/30 rounded-2xl py-4 pr-12 pl-10 text-indigo-100 font-bold focus:border-indigo-500 outline-none appearance-none cursor-pointer">
                    {Object.values(MCOS_ROLES).map(realm => (
                      <option key={realm.id} value={realm.id} className="bg-slate-900 text-white">{realm.label}</option>
                    ))}
                  </select>
                </div>

                {/* نظام اختيار الدور الدقيق بناءً على الطبقة */}
                <div className="relative">
                  <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#12121A] border border-white/10 rounded-2xl py-4 pr-12 pl-10 text-white focus:border-emerald-500 outline-none appearance-none cursor-pointer">
                    {MCOS_ROLES[formData.realm as keyof typeof MCOS_ROLES].roles.map(r => (
                      <option key={r.id} value={r.id} className="bg-slate-900">{r.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="email" placeholder="البريد الإلكتروني الموثق" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#12121A] border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input required type="password" placeholder="مفتاح فك التشفير (كلمة المرور)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#12121A] border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-colors" />
            </div>
            <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black mt-6 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex justify-center items-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? <><LogIn className="w-5 h-5" /> فك التشفير والدخول</> : <><ShieldCheck className="w-5 h-5" /> تأسيس الهوية السيادية</>}
            </button>
          </form>
          
          <div className="mt-8 border-t border-white/10 pt-6">
            <OAuthProviders />
          </div>

          <button onClick={() => { setIsLogin(!isLogin); setMsg({text:'', type:''}); }} className="w-full mt-6 text-slate-400 hover:text-white text-sm font-bold transition-colors">
            {isLogin ? 'لا تملك هوية سيادية؟ أسس إمبراطوريتك الآن' : 'لديك هوية موثقة بالفعل؟ قم بفك التشفير'}
          </button>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[#0A0A0F]">
          <img src={MCOS_ASSETS.workspace.dualScreen.src} className="w-full h-full object-cover opacity-20" alt="Workspace" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-lg bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">انضم لنخبة الصناعة</h2>
          <p className="text-slate-300 leading-relaxed font-medium">
            Monteerly OS ليس مجرد موقع توظيف، بل هو الإمبراطورية الرقمية التي تدير فيها أعمالك، تحمي أموالك بنظام العقود الذكية، وتضاعف إنتاجك بالمساعد الإخراجي.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
             <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold">43 تخصص سيادي</span>
             <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">حماية Escrow</span>
          </div>
        </div>
      </div>
    </div>
  );
}
