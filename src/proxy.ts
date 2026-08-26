import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. التوجيه التلقائي للرابط الرئيسي
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar/dashboard', request.url));
  }

  // 2. نظام الصلاحيات (RBAC) — استخدام Supabase auth الحقيقي
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // تجاهل في middleware
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // إذا لم يكن هناك session
  if (!session?.user) {
    // السماح بالمسارات العامة
    const publicPaths = ['/ar/auth', '/ar/pricing', '/ar/blog'];
    if (!publicPaths.some(p => pathname.startsWith(p))) {
      return NextResponse.redirect(new URL('/ar/auth', request.url));
    }
    return NextResponse.next();
  }

  // 3. التحقق من system_role من جدول user_system_roles
  const { data: roleData } = await supabase
    .from('user_system_roles')
    .select('system_role')
    .eq('user_id', session.user.id)
    .single();

  const systemRole = roleData?.system_role ?? 'user';

  // تحديد المسارات السيادية (التي تتطلب إدارة عليا)
  const isExecutiveRoute = pathname.includes('/finance') || pathname.includes('/disputes');

  // إذا كان المسار سيادياً والمستخدم ليس من الإدارة العليا
  if (isExecutiveRoute && systemRole !== 'executive') {
    // إعادة التوجيه الفوري لصفحة الوصول المرفوض
    return NextResponse.redirect(new URL('/ar/unauthorized', request.url));
  }

  return NextResponse.next();
}

// تطبيق الموجه على جميع المسارات باستثناء مسارات النظام الداخلية وملفات الصور
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
