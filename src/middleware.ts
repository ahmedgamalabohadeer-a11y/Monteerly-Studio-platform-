import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['ar', 'en']
let defaultLocale = 'ar'

// محاولة استنتاج اللغة المفضلة للعميل
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // تخطي مسارات API والملفات الثابتة
  const pathname = request.nextUrl.pathname
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // التحقق من وجود رمز اللغة في المسار (مثال: /ar/dashboard)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // إعادة التوجيه إلى اللغة الافتراضية إذا كانت مفقودة
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // تمرير الطلب إذا كان المسار صحيحاً ومضاف إليه رمز اللغة
  return NextResponse.next()
}

export const config = {
  // تفعيل الـ Middleware على جميع المسارات عدا الاستثناءات
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
