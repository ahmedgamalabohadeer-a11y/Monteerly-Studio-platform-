import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

function redirectWithCookies(url: URL, sourceResponse: NextResponse) {
  const redirectResponse = NextResponse.redirect(url);
  sourceResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. التوجيه التلقائي للرابط الرئيسي
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar/dashboard', request.url));
  }

  // 2. نظام الصلاحيات (RBAC) — استخدام Supabase auth الحقيقي
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const firstPathSegment = pathname.split('/').filter(Boolean)[0];
  const locale =
    firstPathSegment && /^[a-z]{2}$/i.test(firstPathSegment) ? firstPathSegment : 'ar';
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/i, '') || '/';
  const isPublicPath = /^\/(?:auth|pricing|blog)(?:\/|$)/i.test(pathWithoutLocale);

  // لا تعتمد قرارات الوصول على session محلية غير موثقة.
  if (userError || !user) {
    if (!isPublicPath) {
      return redirectWithCookies(
        new URL('/' + locale + '/auth', request.url),
        supabaseResponse
      );
    }
    return supabaseResponse;
  }

  // 3. التحقق من system_role من جدول user_system_roles
  const { data: roleData } = await supabase
    .from('user_system_roles')
    .select('system_role')
    .eq('user_id', user.id)
    .single();

  const systemRole = roleData?.system_role ?? 'user';

  const routePolicies = [
    { segment: '/admin', allowedRoles: ['admin', 'executive'] },
    { segment: '/executive', allowedRoles: ['executive'] },
    {
      segment: '/finance',
      allowedRoles: ['finance_operator', 'admin', 'executive'],
    },
    {
      segment: '/disputes',
      allowedRoles: ['moderator', 'admin', 'executive'],
    },
  ];
  const routePolicy = routePolicies.find(
    ({ segment }) =>
      pathWithoutLocale === segment || pathWithoutLocale.startsWith(segment + '/')
  );

  if (routePolicy && !routePolicy.allowedRoles.includes(systemRole)) {
    return redirectWithCookies(
      new URL('/' + locale + '/unauthorized', request.url),
      supabaseResponse
    );
  }

  return supabaseResponse;
}

// تطبيق الموجه على جميع المسارات باستثناء مسارات النظام الداخلية وملفات الصور
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
