import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// إعداد اللغات
const locales = ['ar', 'en'];
const defaultLocale = 'ar';

// استنتاج اللغة من الـ headers
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) استثناء المسارات غير المطلوبة
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2) التحقق من وجود locale في المسار
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}`
  );

  // 3) إعادة توجيه تلقائية حسب اللغة
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    const newUrl = new URL(
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
      request.url
    );

    return NextResponse.redirect(newUrl);
  }

  // 4) تمرير الطلب إذا كان سليم
  return NextResponse.next();
}

// إعداد matcher موحد (دمج الاثنين بدون تعارض)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
