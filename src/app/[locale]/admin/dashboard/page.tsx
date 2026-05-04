'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Wallet, FileCheck, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ escrowTotal: 0, activeJobs: 0, pendingContracts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: escrow } = await supabase.from('escrow_accounts').select('amount');
      const { count: jobs } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'in_progress');
      
      const total = escrow?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
      setStats({ escrowTotal: total, activeJobs: jobs || 0, pendingContracts: 0 });
    };
    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 font-sans" dir="rtl">
      <header className="mb-12">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
          <Shield className="text-indigo-500" /> لوحة التحكم السيادية (MCOS)
        </h1>
        <p className="text-slate-400 text-sm">مراقبة السيولة المالية والامتثال القانوني للمنصة</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <Wallet className="text-emerald-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">إجمالي الضمان (Escrow)</h3>
          <p className="text-3xl font-black text-white">${stats.escrowTotal.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <FileCheck className="text-indigo-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">المشاريع المؤمنة نشطة</h3>
          <p className="text-3xl font-black text-white">{stats.activeJobs}</p>
        </div>

        <div className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <AlertCircle className="text-amber-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">نزاعات معلقة</h3>
          <p className="text-3xl font-black text-white">0</p>
        </div>
      </div>

      <section className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8">
        <h2 className="text-xl font-bold mb-6">سجل العمليات المالية اللحظي</h2>
        <div className="text-center py-12 text-slate-500 text-sm">
          يتم جلب البيانات من سجل التدقيق الجنائي (Audit Logs)...
        </div>
      </section>
    </main>
  );
}
