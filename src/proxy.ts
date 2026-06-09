import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. التوجيه التلقائي للرابط الرئيسي
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar/dashboard', request.url));
  }

  // 2. نظام الصلاحيات (RBAC - Role Based Access Control)
  // نقرأ صلاحية المستخدم من الكوكيز (الافتراضي: EMPLOYEE إذا لم يتم تحديد دور)
  const userRole = request.cookies.get('mcos_role')?.value || 'EMPLOYEE';

  // تحديد المسارات السيادية (التي تتطلب إدارة عليا)
  const isExecutiveRoute = pathname.includes('/finance') || pathname.includes('/disputes');

  // إذا كان المسار سيادياً والمستخدم ليس من الإدارة العليا
  if (isExecutiveRoute && userRole !== 'EXECUTIVE') {
    // إعادة التوجيه الفوري لصفحة الوصول المرفوض
    return NextResponse.redirect(new URL('/ar/unauthorized', request.url));
  }

  return NextResponse.next();
}

// تطبيق الموجه على جميع المسارات باستثناء مسارات النظام الداخلية وملفات الصور
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
