'use client';

import React, { useEffect, useState } from 'react';
import {
  changeAccountType,
  getAdminDashboardData,
  type AccountType,
  type AdminDashboardUser,
} from '../actions';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { Shield, Wallet, FileCheck, Users, UserCog } from 'lucide-react';

type DashboardStats = {
  escrowTotal: number;
  activeJobs: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ escrowTotal: 0, activeJobs: 0 });
  const [users, setUsers] = useState<AdminDashboardUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminDashboardData();
        setStats(data.stats);
        setUsers(data.users);
      } catch {
        alert('❌ تعذر تحميل بيانات لوحة الإدارة.');
      }
    };

    fetchData();
  }, []);

  const handleAccountTypeChange = async (userId: string, accountType: AccountType) => {
    if (!confirm(`هل تريد تغيير نوع الحساب إلى ${accountType}؟`)) return;

    try {
      await changeAccountType(userId, accountType);
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? { ...user, account_type: accountType } : user
        )
      );
      alert('✅ تم تحديث نوع الحساب بنجاح.');
    } catch {
      alert('❌ حدث خطأ أثناء التحديث.');
    }
  };

  return (
    <AuthGuard requireAdmin={true}>
      <main className="min-h-screen bg-slate-950 p-8 font-sans text-white" dir="rtl">
        <header className="mb-12">
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-black">
            <Shield className="text-indigo-500" /> لوحة التحكم السيادية (MCOS)
          </h1>
          <p className="text-sm text-slate-400">إدارة الشؤون المالية، القانونية، والموارد البشرية</p>
        </header>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-slate-900 p-6 shadow-xl">
            <Wallet className="mb-4 text-emerald-500" />
            <h3 className="mb-1 text-sm text-slate-400">إجمالي الضمان النشط (Escrow)</h3>
            <p className="text-3xl font-black text-white">${stats.escrowTotal.toLocaleString()}</p>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-slate-900 p-6 shadow-xl">
            <FileCheck className="mb-4 text-indigo-500" />
            <h3 className="mb-1 text-sm text-slate-400">المشاريع المؤمنة قيد التنفيذ</h3>
            <p className="text-3xl font-black text-white">{stats.activeJobs}</p>
          </div>
        </div>

        <section className="mb-8 rounded-[2.5rem] border border-white/5 bg-slate-900 p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <Users className="text-blue-400" /> إدارة الموارد البشرية (Users Directory)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="border-b border-white/10 text-slate-400">
                <tr>
                  <th className="pb-4 font-normal">الاسم</th>
                  <th className="pb-4 font-normal">البريد الإلكتروني</th>
                  <th className="pb-4 font-normal">نوع الحساب</th>
                  <th className="pb-4 font-normal">الإجراءات السيادية</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-4 font-bold">{user.full_name || 'غير محدد'}</td>
                    <td className="py-4 text-slate-400">{user.email || '---'}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          user.account_type === 'freelancer'
                            ? 'bg-purple-500/20 text-purple-400'
                            : user.account_type === 'agency'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {user.account_type === 'freelancer'
                          ? 'مبدع (Freelancer)'
                          : user.account_type === 'agency'
                            ? 'وكالة (Agency)'
                            : 'عميل (Client)'}
                      </span>
                    </td>
                    <td className="flex gap-2 py-4">
                      {user.account_type !== 'freelancer' && (
                        <button
                          onClick={() => handleAccountTypeChange(user.id, 'freelancer')}
                          className="flex items-center gap-1 rounded-lg bg-purple-600/20 px-3 py-1.5 text-xs text-purple-400 transition-colors hover:bg-purple-600/40"
                        >
                          <UserCog size={14} /> ترقية كمبدع
                        </button>
                      )}

                      {user.account_type !== 'client' && (
                        <button
                          onClick={() => handleAccountTypeChange(user.id, 'client')}
                          className="flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700"
                        >
                          تحويل لعميل
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      جاري تحميل البيانات أو لا يوجد مستخدمين...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AuthGuard>
  );
}
