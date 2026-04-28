'use client';

import { useState } from 'react';
import { ShieldCheck, Video, User } from 'lucide-react';
import { signUpUser, signInUser } from './actions';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    const action = isLogin ? signInUser : signUpUser;
    const result = await action(formData);
    if (result && !result.success) {
      setMessage(result.message || 'حدث خطأ غير متوقع');
    } else if (result && result.success) {
      setMessage(result.message || 'عملية ناجحة');
      if (!isLogin) setIsLogin(true); // التحويل لشاشة الدخول بعد التسجيل
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans" dir="rtl">
      <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Video className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Monteerly Studio</h1>
          <p className="text-sm text-slate-500 mt-2">
            {isLogin ? 'سجل دخولك لمساحة العمل الخاصة بك' : 'انضم إلى منصة المونتاج الأولى'}
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-50 text-blue-700 text-sm font-bold rounded-xl text-center border border-blue-100">
            {message}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">الاسم الكامل</label>
                <input name="full_name" required type="text" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">نوع الحساب</label>
                <select name="role" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-sm">
                  <option value="client">صانع محتوى (عميل)</option>
                  <option value="editor">مونتير (مستقل)</option>
                  <option value="videographer">مصور (مستقل)</option>
                  <option value="studio">شركة إنتاج</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">البريد الإلكتروني</label>
            <input name="email" required type="email" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-left" dir="ltr" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">كلمة المرور</label>
            <input name="password" required type="password" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-slate-900 transition-all text-left" dir="ltr" />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all active:scale-95 flex justify-center items-center gap-2 mt-4">
            <ShieldCheck className="w-5 h-5" />
            {isLogin ? 'تسجيل الدخول الدخول السيادي' : 'إنشاء حساب جديد'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={() => { setIsLogin(!isLogin); setMessage(''); }} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            {isLogin ? 'ليس لديك حساب؟ سجل كصانع محتوى أو مونتير' : 'لديك حساب بالفعل؟ سجل دخولك'}
          </button>
        </div>

      </div>
    </div>
  );
}
