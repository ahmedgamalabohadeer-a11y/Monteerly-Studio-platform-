#!/bin/bash
set -e
echo "🔐 جاري هندسة بوابة العبور السيادية (Identity & Access Management)..."

# إنشاء مجلدات المصادقة
mkdir -p src/app/\[locale\]/auth/login
mkdir -p src/app/\[locale\]/auth/register

# 1. بناء واجهة تسجيل الدخول (Login)
cat > src/app/\[locale\]/auth/login/page.tsx << 'LOGIN_UI'
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { KeyRound, Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: 'جاري التحقق من الهوية...', type: 'info' });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setMsg({ text: '❌ ' + error.message, type: 'error' });
    } else {
      setMsg({ text: '✅ تم التحقق بنجاح! جاري التوجيه...', type: 'success' });
      // سيتم التوجيه لاحقاً إلى لوحة التحكم
    }
    setLoading(false);
  };

  return (
    <div dir='rtl' className='min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-white'>
      <div className='max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500'></div>
        
        <div className='flex flex-col items-center mb-8'>
          <div className='p-4 bg-slate-800 rounded-full mb-4 border border-slate-700 shadow-inner'>
            <ShieldCheck size={40} className='text-emerald-400' />
          </div>
          <h1 className='text-3xl font-black tracking-tight'>بوابة الدخول</h1>
          <p className='text-slate-400 mt-2 text-sm'>أدخل بياناتك السيادية للوصول إلى مساحة العمل</p>
        </div>

        <form onSubmit={handleLogin} className='space-y-5'>
          <div className='relative'>
            <Mail className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={20} />
            <input 
              type='email' required placeholder='البريد الإلكتروني'
              className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-emerald-500 transition-colors'
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='relative'>
            <Lock className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={20} />
            <input 
              type='password' required placeholder='كلمة المرور'
              className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-4 pr-12 pl-4 focus:outline-none focus:border-emerald-500 transition-colors'
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type='submit' disabled={loading}
            className='w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50'
          >
            {loading ? <span className='animate-pulse'>جاري الاتصال...</span> : <><LogIn size={20} /> تسجيل الدخول</>}
          </button>
        </form>

        {msg.text && (
          <div className={`mt-6 p-4 rounded-xl text-sm font-bold text-center ${msg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
            {msg.text}
          </div>
        )}

        <div className='mt-8 text-center text-sm text-slate-500'>
          ليس لديك تصريح أمني؟ <a href='/ar/auth/register' className='text-emerald-400 hover:underline font-bold'>طلب التحاق بالمنصة</a>
        </div>
      </div>
    </div>
  );
}
LOGIN_UI

# 2. بناء واجهة إنشاء الحساب (Register)
cat > src/app/\[locale\]/auth/register/page.tsx << 'REGISTER_UI'
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('editor');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: 'جاري إنشاء الهوية الرقمية...', type: 'info' });

    // 1. إنشاء الحساب في Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email, password,
    });

    if (authError) {
      setMsg({ text: '❌ ' + authError.message, type: 'error' });
      setLoading(false);
      return;
    }

    // 2. تسجيل البيانات في جدول المستخدمين السيادي (users)
    if (authData.user) {
      const { error: dbError } = await supabase.from('users').insert([
        { id: authData.user.id, email, full_name: fullName, role }
      ]);

      if (dbError) {
        setMsg({ text: '⚠️ تم إنشاء الحساب لكن فشل تحديث الملف الشخصي.', type: 'error' });
      } else {
        setMsg({ text: '✅ تم تأسيس هويتك بنجاح! راجع بريدك للتأكيد.', type: 'success' });
      }
    }
    setLoading(false);
  };

  return (
    <div dir='rtl' className='min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-white'>
      <div className='max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500'></div>
        
        <div className='flex flex-col items-center mb-6'>
          <h1 className='text-2xl font-black tracking-tight'>إصدار هوية رقمية</h1>
          <p className='text-slate-400 mt-1 text-sm'>انضم إلى نخبة صناع المحتوى والمونتيرين</p>
        </div>

        <form onSubmit={handleRegister} className='space-y-4'>
          <div className='relative'>
            <User className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={18} />
            <input type='text' required placeholder='الاسم الرباعي' className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 transition-colors text-sm' value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className='relative'>
            <Mail className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={18} />
            <input type='email' required placeholder='البريد الإلكتروني' className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 transition-colors text-sm' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='relative'>
            <Lock className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={18} />
            <input type='password' required placeholder='كلمة المرور (عالية الأمان)' className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 transition-colors text-sm' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className='relative'>
            <Briefcase className='absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500' size={18} />
            <select className='w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-blue-500 transition-colors text-sm appearance-none' value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='editor'>مونتير (Editor)</option>
              <option value='creator'>صانع محتوى (Creator)</option>
              <option value='agency'>وكالة (Agency)</option>
            </select>
          </div>

          <button type='submit' disabled={loading} className='w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 mt-4'>
            {loading ? <span className='animate-pulse'>جاري المعالجة...</span> : <><UserPlus size={18} /> إصدار الهوية</>}
          </button>
        </form>

        {msg.text && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-bold text-center ${msg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
            {msg.text}
          </div>
        )}
      </div>
    </div>
  );
}
REGISTER_UI

echo "✅ اكتمل بناء نظام المصادقة (IAM) بنجاح!"
