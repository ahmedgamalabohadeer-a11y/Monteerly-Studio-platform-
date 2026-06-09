'use client'
import React from 'react';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#05050A] flex flex-col items-center justify-center text-slate-50 p-8 font-sans" dir="rtl">
        <div className="bg-[#0A0A0F] border border-rose-500/20 p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 text-rose-500/5">
                <Lock size={200} />
            </div>
            
            <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                <ShieldAlert size={48} className="text-rose-500" />
            </div>
            
            <h1 className="text-3xl font-black text-rose-500 mb-2">وصول مرفوض (403)</h1>
            <p className="text-slate-400 mb-8 font-bold">
                هذا النطاق يخضع للسيادة الإدارية العليا. صلاحيات حسابك الحالي لا تسمح لك باستعراض هذه البيانات.
            </p>
            
            <Link href="/ar/dashboard" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                <ArrowRight size={18} /> العودة إلى مركز القيادة
            </Link>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono">
                يتم تسجيل محاولات الوصول غير المصرح بها أمنياً.
            </div>
        </div>
    </div>
  );
}
