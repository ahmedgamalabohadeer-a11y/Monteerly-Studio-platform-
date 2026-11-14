import 'server-only';

import type { User } from '@supabase/supabase-js';
import { isSystemRole, type SystemRole } from '@/lib/auth/systemRoles';
import { createClient } from '@/lib/supabase/server';

export type { SystemRole } from '@/lib/auth/systemRoles';

export type AuthenticatedServerContext = {
  supabase: Awaited<ReturnType<typeof createClient>>;
  user: User;
};

export async function requireUser(): Promise<AuthenticatedServerContext> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('غير مصرح. يجب تسجيل الدخول.');
  }

  return { supabase, user };
}

export async function requireSystemRole(
  allowedRoles: readonly SystemRole[]
): Promise<AuthenticatedServerContext & { systemRole: SystemRole }> {
  const context = await requireUser();
  const { data: roleRecord, error } = await context.supabase
    .from('user_system_roles')
    .select('system_role')
    .eq('user_id', context.user.id)
    .maybeSingle();

  if (
    error ||
    !isSystemRole(roleRecord?.system_role) ||
    !allowedRoles.includes(roleRecord.system_role)
  ) {
    throw new Error('غير مصرح. صلاحيات النظام غير كافية.');
  }

  return { ...context, systemRole: roleRecord.system_role };
}
