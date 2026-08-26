'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface RoleContextType {
  systemRole: string | null;
  accountType: string | null;
  loading: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [systemRole, setSystemRole] = useState<string | null>(null);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  ));

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user) {
        // جلب system_role من جدول user_system_roles
        const { data: roleData } = await supabase
          .from('user_system_roles')
          .select('system_role')
          .eq('user_id', user.id)
          .single();

        // جلب account_type من جدول profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('account_type')
          .eq('id', user.id)
          .single();

        setSystemRole(roleData?.system_role ?? 'user');
        setAccountType(profileData?.account_type ?? null);
      } else {
        setSystemRole(null);
        setAccountType(null);
      }
      
      setLoading(false);
    };

    fetchRole();
  }, [supabase]);

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
