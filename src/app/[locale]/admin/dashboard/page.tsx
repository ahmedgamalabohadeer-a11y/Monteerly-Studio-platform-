'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Wallet, FileCheck, Users, UserCog, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ escrowTotal: 0, activeJobs: 0 });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. جلب الإحصائيات المالية
      const { data: escrow } = await supabase.from('escrow_accounts').select('amount').eq('status', 'held');
      const { count: jobs } = await supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'in_progress');
      const total = escrow?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
      setStats({ escrowTotal: total, activeJobs: jobs || 0 });

      // 2. جلب بيانات المستخدمين
      const { data: profilesData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(20);
      if (profilesData) setUsers(profilesData);
    };
    fetchData();
  }, []);

  // وظيفة تحرير الأموال (تم الاحتفاظ بها)
  const releaseFunds = async (jobId: string, amount: number, freelancerId: string) => {
    if (!confirm('هل أنت متأكد من تحرير الأموال للمبدع؟ هذا الإجراء لا يمكن التراجع عنه.')) return;
    try {
      await supabase.from('escrow_accounts').update({ status: 'released' }).eq('order_id', jobId);
      await supabase.from('transactions').insert({ job_id: jobId, user_id: freelancerId, amount: amount, type: 'escrow_release', status: 'completed' });
      await supabase.from('jobs').update({ status: 'completed' }).eq('id', jobId);
      alert('✅ تم تحرير الأموال بنجاح!');
      window.location.reload();
    } catch (error) {
      alert('❌ فشل تحرير الأموال');
    }
  };

  // وظيفة ترقية الصلاحيات
  const changeUserRole = async (userId: string, newRole: string) => {
    if (!confirm(`هل تريد تغيير صلاحية المستخدم إلى ${newRole}؟`)) return;
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    if (!error) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      alert('✅ تم تحديث الصلاحية بنجاح.');
    } else {
      alert('❌ حدث خطأ أثناء التحديث.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 font-sans" dir="rtl">
      <header className="mb-12">
        <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
          <Shield className="text-indigo-500" /> لوحة التحكم السيادية (MCOS)
        </h1>
        <p className="text-slate-400 text-sm">إدارة الشؤون المالية، القانونية، والموارد البشرية</p>
      </header>

      {/* الإحصائيات العلوية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <Wallet className="text-emerald-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">إجمالي الضمان النشط (Escrow)</h3>
          <p className="text-3xl font-black text-white">${stats.escrowTotal.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] shadow-xl">
          <FileCheck className="text-indigo-500 mb-4" />
          <h3 className="text-slate-400 text-sm mb-1">المشاريع المؤمنة قيد التنفيذ</h3>
          <p className="text-3xl font-black text-white">{stats.activeJobs}</p>
        </div>
      </div>

      {/* قسم إدارة المستخدمين */}
      <section className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users className="text-blue-400" /> إدارة الموارد البشرية (Users Directory)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="text-slate-400 border-b border-white/10">
              <tr>
                <th className="pb-4 font-normal">الاسم</th>
                <th className="pb-4 font-normal">البريد الإلكتروني</th>
                <th className="pb-4 font-normal">الدور الحالي</th>
                <th className="pb-4 font-normal">الإجراءات السيادية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 font-bold">{user.full_name || 'غير محدد'}</td>
                  <td className="py-4 text-slate-400">{user.email || '---'}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === 'freelancer' ? 'bg-purple-500/20 text-purple-400' :
                      user.role === 'admin' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {user.role === 'freelancer' ? 'مبدع (Freelancer)' : user.role === 'admin' ? 'مدير' : 'عميل (Client)'}
                    </span>
                  </td>
                  <td className="py-4 flex gap-2">
                    {user.role !== 'freelancer' && (
                      <button onClick={() => changeUserRole(user.id, 'freelancer')} className="flex items-center gap-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 px-3 py-1.5 rounded-lg transition-colors text-xs">
                        <UserCog size={14} /> ترقية كمبدع
                      </button>
                    )}
                    {user.role !== 'client' && (
                      <button onClick={() => changeUserRole(user.id, 'client')} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors text-xs">
                        تحويل لعميل
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={4} className="py-8 text-center text-slate-500">جاري تحميل البيانات أو لا يوجد مستخدمين...</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
