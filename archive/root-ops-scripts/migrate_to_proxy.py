import os

# 1. إيقاف الـ middleware نهائياً
if os.path.exists("src/middleware.ts"):
    os.rename("src/middleware.ts", "src/middleware.ts.bak")
    print("✅ تم إيقاف middleware.ts القديم.")

# 2. إنشاء/تحديث الـ proxy.ts بالمواصفات الحديثة
proxy_content = """import { createProxy } from 'next/server';

export default createProxy({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: false // فرض العربية كقائد افتراضي
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
"""
with open("src/proxy.ts", "w", encoding="utf-8") as f:
    f.write(proxy_content)
print("✅ تم إنشاء proxy.ts الجديد والموحد.")
