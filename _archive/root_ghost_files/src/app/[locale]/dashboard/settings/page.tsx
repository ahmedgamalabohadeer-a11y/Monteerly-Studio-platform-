'use client';
import React from 'react';
import { Settings, ShieldCheck, Lock, Bell, User } from 'lucide-react';
import { ChangePassword } from '@/components/settings/ChangePassword';

export default function SettingsPage() {
  return (
    <div className="space-y-8 p-6 pb-24 bg-slate-950 min-h-screen" dir="rtl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Settings className="text-slate-400" size={32} />
          إعدادات النظام والحساب
        </h1>
        <p className="text-slate-400 mt-2 text-sm">إدارة الأمان، التنبيهات، وتفضيلات الهوية الشخصية.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* شريط جانبي داخلي للإعدادات */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600/10 border border-indigo-500/20 text-white rounded-xl font-bold">
            <ShieldCheck size={20} className="text-indigo-400" /> الأمان وكلمة المرور
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors font-bold">
            <User size={20} /> الملف الشخصي
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-900 rounded-xl transition-colors font-bold">
            <Bell size={20} /> التنبيهات
          </button>
        </div>

        {/* محتوى الإعدادات */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <Lock className="text-indigo-400" />
              <h2 className="text-xl font-bold text-white">حماية الحساب</h2>
            </div>
            {/* دمج مكون تغيير كلمة المرور المستخرج من الأرشيف */}
            <ChangePassword />
          </section>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 opacity-50">
            <h2 className="text-xl font-bold text-white mb-2">التحقق الثنائي (2FA)</h2>
            <p className="text-sm text-slate-400 mb-6">قريباً: إضافة طبقة أمان إضافية لحسابك عبر الهاتف.</p>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-600 w-1/3" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
