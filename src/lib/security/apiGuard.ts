import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function withAuthGuard(
  req: Request,
  handler: (req: Request, user: unknown) => Promise<NextResponse>,
  requiredRole?: string[]
) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'وصول مرفوض: التوقيع الأمني مفقود.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return NextResponse.json({ error: 'وصول مرفوض: التوقيع الأمني غير صالح أو منتهي.' }, { status: 401 });
    }

    if (requiredRole && requiredRole.length > 0) {
      const userRole = user.user_metadata?.role || 'client';
      if (!requiredRole.includes(userRole)) {
        return NextResponse.json({ error: 'حظر امتثال: لا تملك الصلاحيات.' }, { status: 403 });
      }
    }

    return await handler(req, user);
  } catch (error) {
    console.error('API Guard Error:', error);
    return NextResponse.json({ error: 'خطأ داخلي في طبقة الأمان.' }, { status: 500 });
  }
}
