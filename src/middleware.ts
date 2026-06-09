import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // إذا دخل المستخدم إلى الرابط الرئيسي بدون تحديد مسار
  if (request.nextUrl.pathname === '/') {
    // توجيهه فوراً إلى مركز القيادة باللغة العربية
    return NextResponse.redirect(new URL('/ar/dashboard', request.url));
  }
}

// تحديد المسارات التي يعمل عليها هذا الموجه
export const config = {
  matcher: ['/'],
};
