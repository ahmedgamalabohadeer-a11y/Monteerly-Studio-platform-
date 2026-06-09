import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# إضافة موديول العقود إلى المصفوفة وتحديث الكود
updated_code = content.replace(
    "{ title: 'المكتبة', icon: <Video size={28} className=\"text-cyan-400\" />, link: '/ar/library' },",
    "{ title: 'المكتبة', icon: <Video size={28} className=\"text-cyan-400\" />, link: '/ar/library' },\n    { title: 'العقود النشطة', icon: <Briefcase size={28} className=\"text-indigo-400\" />, link: '/ar/dashboard/contracts' },"
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated_code)
print("✅ تم دمج موديول العقود في الداشبورد بنجاح!")
