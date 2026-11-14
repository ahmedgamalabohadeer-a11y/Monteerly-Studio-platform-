'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useAuth } from '@/context/AuthContext';
import { isSystemRole, type SystemRole } from '@/lib/auth/systemRoles';

type AccountType = 'client' | 'freelancer' | 'agency';

function isAccountType(value: unknown): value is AccountType {
  return value === 'client' || value === 'freelancer' || value === 'agency';
}

interface RoleContextType {
  systemRole: SystemRole | null;
  accountType: AccountType | null;
  loading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [systemRole, setSystemRole] = useState<SystemRole | null>(null);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(true);

  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  ));

  useEffect(() => {
    let active = true;

    const fetchRole = async () => {
      if (authLoading) {
        return;
      }

      if (!user) {
        setSystemRole(null);
        setAccountType(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const [{ data: roleData }, { data: profileData }] = await Promise.all([
        supabase
          .from('user_system_roles')
          .select('system_role')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('profiles')
          .select('account_type')
          .eq('id', user.id)
          .maybeSingle(),
      ]);

      if (active) {
        setSystemRole(isSystemRole(roleData?.system_role) ? roleData.system_role : 'user');
        setAccountType(isAccountType(profileData?.account_type) ? profileData.account_type : null);
        setLoading(false);
      }
    };

    fetchRole();

    return () => {
      active = false;
    };
  }, [authLoading, supabase, user]);

  return (
    <RoleContext.Provider value={{ systemRole, accountType, loading }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
