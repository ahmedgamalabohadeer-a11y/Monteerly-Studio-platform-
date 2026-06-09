'use client'
import React from 'react';
import { UserCog, Crown, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DevAuthPage() {
  const router = useRouter();

  const setRole = (role: string) => {
    // حفظ الدور في الكوكيز لمحاكاة تسجيل الدخول الحقيقي
    document.cookie = `mcos_role=${role}; path=/; max-age=86400`;
    alert(`✅ تم تغيير الصلاحيات إلى: ${role}`);
    router.push('/ar/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 flex items-center justify-center font-sans">
        <div className="bg-[#0A0A0F] border border-indigo-500/20 p-10 rounded-3xl shadow-2xl max-w-md w-full">
            <h1 className="text-2xl font-black mb-6 flex items-center gap-3 text-indigo-400">
                <UserCog size={28} /> محول الصلاحيات السيادي
            </h1>
            <p className="text-slate-400 mb-8 text-sm">استخدم هذه الأداة لاختبار نظام (RBAC). اختر الهوية التي تريد تصفح النظام بها الآن:</p>
            
            <div className="space-y-4">
                <button onClick={() => setRole('EXECUTIVE')} className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-black px-6 py-4 rounded-xl font-bold flex items-center gap-3 transition-all">
                    <Crown size={20} /> تفعيل وضع الإدارة العليا (Executive)
                </button>
                
                <button onClick={() => setRole('EMPLOYEE')} className="w-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 px-6 py-4 rounded-xl font-bold flex items-center gap-3 transition-all">
                    <User size={20} /> تفعيل وضع موظف عادي (Employee)
                </button>
            </div>
        </div>
    </div>
  );
}
