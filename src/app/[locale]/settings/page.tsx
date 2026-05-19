'use client'
import React from 'react';
import { User, Lock, ShieldCheck, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#05050A] text-slate-50 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-white/5 pb-6">
          <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-indigo-500" /> إعدادات الهوية السيادية
          </h1>
          <p className="text-slate-400">إدارة التفضيلات، الأمان، والتحكم الكامل في حسابك.</p>
        </header>

        <div className="bg-[#0A0A0F] border border-white/5 rounded-[2rem] p-8 mb-8 shadow-xl">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 border-b border-white/5 pb-4"><ShieldCheck className="w-5 h-5 text-emerald-400" /> الأمان والتشفير</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">مفتاح فك التشفير الحالي (كلمة المرور)</label>
              <input type="password" value="********" readOnly className="w-full bg-[#12121A] border border-white/10 rounded-xl p-3 text-slate-500 outline-none" />
            </div>
            <button className="text-indigo-400 text-sm font-bold hover:text-indigo-300">تحديث المفتاح السيادي</button>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.2)] flex items-center gap-2 w-full justify-center">
          <Save className="w-5 h-5" /> حفظ إعدادات الهوية
        </button>
      </div>
    </div>
  );
}
