import os

# 1. تنظيف الصفحة الرئيسية (إزالة التوجيهات القسرية)
page_path = "src/app/[locale]/page.tsx"
if os.path.exists(page_path):
    with open(page_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # تنظيف أي useEffect قسري سابق
    # هذا النمط يزيل أي بلوك useEffect يتضمن توجيهات للمسار
    import re
    cleaned_content = re.sub(r'  useEffect\(\(\) => \{.*?\}, \[pathname, router\]\);', '', content, flags=re.DOTALL)
    
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(cleaned_content)
    print("✅ تم تنظيف الصفحة الرئيسية من التوجيهات القسرية.")

# 2. تحديث الـ Middleware (الإعداد النهائي)
middleware_path = "src/middleware.ts"
mw_content = """import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localeDetection: true
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
"""
with open(middleware_path, "w", encoding="utf-8") as f:
    f.write(mw_content)
print("✅ تم تحديث Middleware ليكون العربية هي اللغة الافتراضية.")

