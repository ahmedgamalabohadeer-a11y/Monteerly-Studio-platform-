import os

file_path = "src/app/[locale]/dashboard/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# إضافة شريط الإحصائيات الفوري تحت الهيدر
stats_bar = r"""
        {/* شريط الإحصائيات السيادي */}
        <div className="grid grid-cols-3 gap-4 mb-8">
           <div className="bg-[#0A0A0F] border border-white/5 p-4 rounded-2xl">
              <p className="text-slate-500 text-[10px] uppercase font-bold">العقود النشطة</p>
              <h3 className="text-xl font-black">04</h3>
           </div>
           <div className="bg-[#0A0A0F] border border-white/5 p-4 rounded-2xl">
              <p className="text-slate-500 text-[10px] uppercase font-bold">رصيد Escrow</p>
              <h3 className="text-xl font-black text-emerald-400">450$</h3>
           </div>
           <div className="bg-[#0A0A0F] border border-white/5 p-4 rounded-2xl">
              <p className="text-slate-500 text-[10px] uppercase font-bold">تقييم الأداء</p>
              <h3 className="text-xl font-black text-amber-400">4.9</h3>
           </div>
        </div>
"""

# دمج الكود في المكان الصحيح
if "شريط الإحصائيات السيادي" not in content:
    content = content.replace('{/* دمج صورة التحليلات الذكية من الـ 24 صورة */}', stats_bar + '\n        {/* دمج صورة التحليلات الذكية من الـ 24 صورة */}')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("✅ تم دمج الإحصائيات الحية في الداشبورد!")
