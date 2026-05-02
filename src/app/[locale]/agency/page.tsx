'use client'
import React from 'react';
import { Building2, Users, FolderKanban, Activity } from 'lucide-react';

export default function AgencyDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-6 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-indigo-500" /> مركز قيادة الوكالات (Agency OS)
            </h1>
            <p className="text-slate-400">إدارة فريقك، المشاريع المجمعة، والحسابات المالية (White-label).</p>
          </div>
          <span className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-xs font-black border border-indigo-500/20">
            باقة Studio
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <Users className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="text-slate-400 text-sm font-bold">حجم الفريق الإبداعي</h3>
            <p className="text-3xl font-black mt-1">12 <span className="text-sm font-medium text-slate-500">موظف/مستقل</span></p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <FolderKanban className="w-6 h-6 text-indigo-400 mb-4" />
            <h3 className="text-slate-400 text-sm font-bold">المشاريع النشطة</h3>
            <p className="text-3xl font-black mt-1">8 <span className="text-sm font-medium text-slate-500">مشاريع بالتوازي</span></p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <Activity className="w-6 h-6 text-rose-400 mb-4" />
            <h3 className="text-slate-400 text-sm font-bold">استهلاك رندر R2</h3>
            <p className="text-3xl font-black mt-1">450 <span className="text-sm font-medium text-slate-500">GB هذا الشهر</span></p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-center h-64 flex flex-col items-center justify-center">
          <p className="text-slate-400 font-bold mb-4">هذه الواجهة تتصل بـ Enterprise ERP الداخلي</p>
          <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl font-black transition-all">
            دعوة عضو فريق جديد
          </button>
        </div>
      </div>
    </div>
  );
}
