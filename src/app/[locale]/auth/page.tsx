'use client'
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, Loader2, LogIn, Briefcase, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MCOS_ASSETS } from '@/lib/ui/assets';

export default function AuthGateway() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({ email: '', password: '', role: 'Creator', acceptTerms: false });

  const roles = [
    { id: 'Creator', label: 'صانع محتوى فرد (Creator)' },
    { id: 'Editor', label: 'مونتير / محرر (Editor)' },
    { id: 'Studio_Owner', label: 'استوديو مونتاج (Studio)' },
    { id: 'Photographer', label: 'مصور مساهم (Photographer)' },
    { id: 'Consultant', label: 'مستشار (Consultant)' },
    { id: 'Agency_Owner', label: 'وكالة إعلانية (Agency)' },
  ];

  const handleGoogleAuth = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/ar/onboarding` }
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (error) throw error;
        router.push('/ar/dashboard');
      } else {
        if (!formData.acceptTerms) throw new Error('يجب الموافقة على الشروط.');
        const { error } = await supabase.auth.signUp({
          email: formData.email, password: formData.password,
          options: { data: { role: formData.role } }
        });
        if (error) throw error;
        router.push('/ar/onboarding');
      }
    } catch (e: unknown) { setMsg({ text: e.message, type: 'error' }); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex font-sans" dir="rtl">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-black text-white mb-8">{isLogin ? 'بوابة العبور' : 'إنشاء حساب سيادي'}</h1>
          {msg.text && <div className="p-4 rounded-xl mb-4 bg-rose-500/10 text-rose-500 border border-rose-500/20">{msg.text}</div>}
          
          <button onClick={handleGoogleAuth} className="w-full bg-white text-black py-4 rounded-xl font-bold mb-4 flex justify-center items-center gap-2">
            <Globe size={20} /> المتابعة عبر Google
          </button>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white">
                {roles.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
            )}
            <input required type="email" placeholder="البريد الإلكتروني" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white" />
            <input required type="password" placeholder="كلمة المرور" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#12121A] border border-white/10 p-4 rounded-xl text-white" />
            
            {!isLogin && (
              <label className="flex items-center gap-2 text-slate-400">
                <input type="checkbox" required onChange={e => setFormData({...formData, acceptTerms: e.target.checked})} />
                أوافق على الشروط.
              </label>
            )}
            
            <button disabled={loading} type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'دخول' : 'تسجيل')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
