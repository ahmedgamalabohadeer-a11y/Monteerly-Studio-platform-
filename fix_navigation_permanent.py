import os

page_path = "src/app/[locale]/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# إزالة كود الـ useEffect الذي يسبب التوجيه القسري
fixed_content = content.replace(
    """  useEffect(() => {
    // فرض العربية بشكل مطلق إذا لم يكن الرابط يبدأ بها
    if (!pathname.startsWith('/ar')) {
      router.replace('/ar' + pathname.substring(3));
    }
  }, [pathname, router]);""", 
    ""
)

with open(page_path, "w", encoding="utf-8") as f:
    f.write(fixed_content)
