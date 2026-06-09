import os

page_path = "src/app/[locale]/page.tsx"
with open(page_path, "r", encoding="utf-8") as f:
    content = f.read()

# إضافة شريط الحالة السيادي في الأعلى
header_banner = """
      {/* شريط الحالة السيادي */}
      <div className="bg-indigo-950/30 border-b border-indigo-500/20 text-center py-1 text-[10px] md:text-xs font-bold text-indigo-300 tracking-widest uppercase">
         {isAr ? 'جميع الاتصالات مشفرة | Monteerly OS V5.0 ACTIVE' : 'SECURED END-TO-END | Monteerly OS V5.0 ACTIVE'}
      </div>
"""

# إضافة قسم الشهادات (Testimonials)
testimonials = """
      {/* قسم الشهادات */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center mb-16">
           <h2 className="text-3xl font-black">{isAr ? 'قالوا عن النظام' : 'Trusted by Creators'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* شهادة 1 */}
           <div className="p-6 rounded-2xl border bg-slate-900/50 border-white/5">
              <p className="text-sm italic mb-4">{isAr ? 'المنصة تمنح فرقنا سرعة أوضح وحوكمة أفضل.' : 'The platform gives our teams clear speed and better governance.'}</p>
              <div className="font-bold">سارة أحمد - مدير إبداعي</div>
           </div>
           {/* (يمكنك إضافة المزيد هنا بنفس النمط) */}
        </div>
      </section>
"""

# دمج التحديثات
if "شريط الحالة السيادي" not in content:
    content = content.replace('<nav className=', header_banner + '\n      <nav className=')
    content = content.replace('{/* Pricing */}', testimonials + '\n      {/* Pricing */}')

with open(page_path, "w", encoding="utf-8") as f:
    f.write(content)
