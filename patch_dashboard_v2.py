import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. إصلاح صورة الأداء (استبدال صورة البدلة بصورة تحليلات)
content = content.replace('img src={MCOS_ASSETS.techAndAi.analytics.src}', 'img src={MCOS_ASSETS.workspace.dualScreen.src}')

# 2. ضمان ظهور الأيقونات داخل الموديولات
# التأكد من أن الهيكل يحيط بالأيقونات (Icon Wrapper)
updated_content = content.replace(
    '<div className="bg-[#12121A] p-3 md:p-4 rounded-2xl shadow-xl border border-white/5 mb-4 md:mb-6">{mod.icon}</div>',
    '<div className="bg-[#12121A] p-4 rounded-2xl shadow-xl border border-white/5 mb-6">{mod.icon}</div>'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated_content)
print("✅ تم ضبط الأصول البصرية وإصلاح تداخل الصورة!")
