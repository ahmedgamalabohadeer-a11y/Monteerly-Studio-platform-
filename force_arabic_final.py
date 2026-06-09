import os

# 1. التحديث الصارم للـ Middleware
middleware_path = "src/middleware.ts"
if os.path.exists(middleware_path):
    with open(middleware_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # التأكد من إعدادات العربية الصارمة
    content = content.replace("defaultLocale: 'en'", "defaultLocale: 'ar'")
    content = content.replace("localeDetection: true", "localeDetection: false")
    # إذا لم تجد الإعدادات، سنقوم بحقنها في بداية ملف الـ config
    if "localeDetection" not in content:
        content = content.replace("locales: [", "localeDetection: false,\n  locales: [")
        
    with open(middleware_path, "w", encoding="utf-8") as f:
        f.write(content)

# 2. إضافة حماية برمجية داخل الصفحة الرئيسية للتأكد من المسار
page_path = "src/app/[locale]/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    page_content = f.read()

# إدراج فحص المسار في بداية الـ Component
if "const router = useRouter();" in page_content and "if (locale !== 'ar' && locale !== 'en')" not in page_content:
    new_hook = """  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // فرض العربية إذا لم يتم اختيار لغة
    if (!pathname.startsWith('/ar') && !pathname.startsWith('/en')) {
      router.replace('/ar');
    }
  }, [pathname, router]);"""
    page_content = page_content.replace("  const router = useRouter();\n  const pathname = usePathname();", new_hook)

    with open(page_path, "w", encoding="utf-8") as f:
        f.write(page_content)

print("✅ تم فرض اللغة العربية برمجياً في Middleware والصفحة الرئيسية!")
