'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function AuthGuard({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        window.location.href = '/auth'; // توجيه لصفحة تسجيل الدخول الموجودة لديك
        return;
      }

      if (requireAdmin) {
        // التحقق من صلاحيات الإدارة
        const { data: roleRecord } = await supabase
          .from('user_system_roles')
          .select('system_role')
          .eq('user_id', user.id)
          .maybeSingle();
        if (roleRecord?.system_role !== 'admin' && roleRecord?.system_role !== 'executive') {
          window.location.href = '/'; // طرد المستخدم العادي للرئيسية
          return;
        }
      }

      setAuthorized(true);
      setLoading(false);
    };

    checkAuth();
  }, [requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mb-4" />
        <p className="ml-4 font-bold text-indigo-400">جاري التحقق من الصلاحيات السيادية...</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
