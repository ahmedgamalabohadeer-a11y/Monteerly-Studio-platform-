import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# إضافة مكون التنبيهات الذكي قبل الهيدر
notification_code = r"""
        {/* نظام التنبيهات السيادي */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3 text-amber-500">
               <Activity className="animate-pulse" />
               <span className="text-sm font-bold">تنبيه سيادي: لديك عقد "تصوير تراثي" ينتهي موعد تسليمه اليوم!</span>
            </div>
            <Link href="/ar/dashboard/contracts" className="bg-amber-500 text-black px-4 py-1 rounded-lg text-xs font-black">
               معالجة العقد
            </Link>
        </div>
"""

# دمج التنبيهات في أعلى الداشبورد
if "نظام التنبيهات السيادي" not in content:
    content = content.replace('<header className="mb-10">', notification_code + '\n        <header className="mb-10">')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم دمج نظام التنبيهات الذكي في مركز القيادة!")
