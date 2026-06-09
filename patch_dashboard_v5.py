import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# استبدال قسم الهيرو بصورة خلفية متدرجة (Gradient) لضمان عدم الفشل أبداً
new_hero = r"""
        {/* Hero Section - Gradient Fixed */}
        <div className="relative h-48 rounded-[2rem] overflow-hidden mb-8 border border-white/5 shadow-2xl flex items-center p-8 bg-gradient-to-br from-indigo-950 via-slate-950 to-black">
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
           <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 flex items-center gap-2 text-white"><Activity className="text-indigo-400"/> نظرة سريعة على الأداء</h2>
              <p className="text-slate-300 text-sm">نظام التحليل التراكمي لـ Monteerly يظهر نمواً بنسبة 12% هذا الأسبوع.</p>
           </div>
        </div>
"""

# دمج التغييرات (إزالة قسم الهيرو القديم ووضع الجديد)
start_tag = "{/* Hero Section"
end_tag = "</div>"
# نحدد موقع البداية والنهاية للقسم القديم ونستبدله
import re
updated_content = re.sub(r'\{/\* Hero Section.*?\}.*?</div>', new_hero, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(updated_content)
print("✅ تم تثبيت الهيرو بصرياً باستخدام التدرج التقني!")
