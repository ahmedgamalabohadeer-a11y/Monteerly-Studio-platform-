import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // تجاهل ملفات النظام والـ API والصور
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // للملفات مثل robots.txt, favicon.ico
  ) {
    return NextResponse.next();
  }

  // التحقق مما إذا كان المسار يحتوي بالفعل على لغة
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // إعادة التوجيه للغة الافتراضية إذا لم تكن موجودة
  if (pathnameIsMissingLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // تطبيق الميدل وير على كل المسارات ما عدا الاستثناءات
  matcher: ['/((?!_next|.*\\..*).*)'],
};

 //################################################################################