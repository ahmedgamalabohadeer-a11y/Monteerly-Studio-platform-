import os

page_path = "src/app/[locale]/page.tsx"

with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# إزالة أي منطق توجيه قديم وإضافة التوجيه القسري
new_hook = """  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // فرض العربية بشكل مطلق إذا لم يكن الرابط يبدأ بها
    if (!pathname.startsWith('/ar')) {
      router.replace('/ar' + pathname.substring(3));
    }
  }, [pathname, router]);"""

# البحث عن مكان حقن الكود
if "const router = useRouter();" in content:
    updated_content = content.replace("  const router = useRouter();\n  const pathname = usePathname();", new_hook)
    
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(updated_content)

print("✅ تم حقن ميكانيكية الإجبار على المسار /ar في الصفحة الرئيسية!")
