import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';
import { isSystemRole, type SystemRole } from '@/lib/auth/systemRoles';
import { createClient } from '@/lib/supabase/server';

export type { SystemRole } from '@/lib/auth/systemRoles';

export async function withAuthGuard(
  req: Request,
  handler: (req: Request, user: User) => Promise<NextResponse>,
  requiredRoles?: readonly SystemRole[]
) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'وصول مرفوض: الجلسة غير صالحة أو منتهية.' },
        { status: 401 }
      );
    }

    if (requiredRoles?.length) {
      const { data: roleRecord, error: roleError } = await supabase
        .from('user_system_roles')
        .select('system_role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (
        roleError ||
        !isSystemRole(roleRecord?.system_role) ||
        !requiredRoles.includes(roleRecord.system_role)
      ) {
        return NextResponse.json(
          { error: 'حظر امتثال: لا تملك الصلاحيات.' },
          { status: 403 }
        );
      }
    }

    return await handler(req, user);
  } catch (error) {
    console.error('API Guard Error:', error);
    return NextResponse.json(
      { error: 'خطأ داخلي في طبقة الأمان.' },
      { status: 500 }
    );
  }
}
