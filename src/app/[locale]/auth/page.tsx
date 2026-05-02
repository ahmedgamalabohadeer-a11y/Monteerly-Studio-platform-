'use client'
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Briefcase, Loader2, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthGateway() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  // فرم البيانات
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'client' // افتراضي
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
      if (isLogin) {
        // تسجيل الدخول
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        setMsg({ text: 'تم تسجيل الدخول بنجاح. جاري توجيهك...', type: 'success' });
        window.location.href = '/ar/dashboard';
      } else {
        // إنشاء حساب جديد (يتم إرسال الداتا للـ Trigger في قاعدة البيانات)
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              role: formData.role
            }
          }
        });
        if (error) throw error;
        setMsg({ text: 'تم إنشاء الهوية السيادية بنجاح! راجع بريدك الإلكتروني إذا لزم الأمر.', type: 'success' });
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error: any) {
      setMsg({ text: error.message || 'حدث خطأ أثناء المصادقة.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-4 font-sans relative overflow-hidden" dir="rtl">
      {/* تأثيرات الخلفية */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-4">
            <ShieldCheck className="w-10 h-10 text-indigo-500" />
          </div>
          <h1 className="text-3xl font-black text-white">{isLogin ? 'بوابة العبور' : 'تأسيس هوية جديدة'}</h1>
          <p className="text-slate-400 text-sm mt-2">MCOS Zero-Trust Auth Environment</p>
        </div>

        {msg.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-bold ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input required type="text" placeholder="الاسم الكامل (قانونياً)" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div className="relative">
                <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer">
                  <option value="client">عميل / صانع محتوى</option>
                  <option value="editor">مونتير / مبدع</option>
                  <option value="photographer">مصور سينمائي</option>
                  <option value="agency">شركة / وكالة إنتاج</option>
                </select>
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input required type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-all" />
          </div>

          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input required type="password" placeholder="كلمة المرور المشفرة" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pr-12 pl-4 text-white focus:border-indigo-500 outline-none transition-all" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-black transition-all flex justify-center items-center gap-2 mt-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? <><LogIn className="w-5 h-5" /> دخول مشفر</> : <><ShieldCheck className="w-5 h-5" /> توثيق الهوية</>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setMsg({text:'', type:''}); }} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">
            {isLogin ? 'لا تملك هوية سيادية؟ أسس حسابك الآن' : 'لديك هوية بالفعل؟ سجل دخولك'}
          </button>
        </div>
      </div>
    </div>
  );
}
