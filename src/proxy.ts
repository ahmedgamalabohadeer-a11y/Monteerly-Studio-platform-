import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // الحفاظ على الوظيفة الحالية: السماح بمرور جميع الطلبات بأمان
  return NextResponse.next();
}

export const config = {
  // الحفاظ على إعدادات المسارات الأصلية دون تغيير
  matcher: ['/((?!_next|.*\\..*).*)'],
};
