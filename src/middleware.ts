import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar'
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // حماية المسارات الإدارية
  if (pathname.includes('/admin')) {
    const session = request.cookies.get('sb-access-token'); 
    if (!session) {
      console.warn(`[Security Alert] محاولة دخول غير مصرح بها لـ ${pathname}`);
      // إعادة التوجيه لصفحة الدخول مع الحفاظ على اللغة العربية
      const loginUrl = new URL('/ar/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
# سنقوم بحقن التحسين الأمني مع الحفاظ على كود اللغات الأصلي
cat << 'EOF' > src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar'
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🛡️ حماية منطقة الإدارة المركزية
  if (pathname.includes('/admin')) {
    const sessionToken = request.cookies.get('sb-access-token');

    if (!sessionToken) {
      console.warn(`[Unauthorized Access Attempt] IP: ${request.ip} -> Path: ${pathname}`);
      const loginUrl = new URL('/ar/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
EOF
