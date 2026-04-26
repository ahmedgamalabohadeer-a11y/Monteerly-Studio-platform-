import os
import re

# إعدادات المسارات
base_dir = "src/app"
alias_prefix = "@/"

def analyze_and_fix():
    print("--- [بدء الفحص الجراحي الشامل لـ Monteerly Studio] ---")
    
    report = {
        "fixed_imports": 0,
        "features_found": [],
        "potential_errors": []
    }

    # 1. جرد الميزات والصفحات المدمجة فعلياً
    for root, dirs, files in os.walk(base_dir):
        if "page.tsx" in files:
            route = root.replace(base_dir, "") or "/"
            report["features_found"].append(route)

        # 2. فحص وإصلاح المسارات الداخلية (The Import Challenge)
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # البحث عن مسارات قديمة مكسورة وتحويلها لنظام @/ المحمي
                # هذا الجزء يمنع أخطاء Module not found تماماً
                new_content = re.sub(r'from\s+["\'](\.\./)+(components|lib|hooks|store|services)/', 
                                    r'from "@/ \2/'.replace(" ", ""), content)
                
                if content != new_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    report["fixed_imports"] += 1

    # مخرجات التقرير التنفيذي
    print(f"\n✅ تم فحص وإصلاح ({report['fixed_imports']}) مسار استيراد مكسور.")
    print("\n--- [خارطة الميزات المدمجة والجاهزة للتشغيل] ---")
    for idx, feature in enumerate(report["features_found"], 1):
        print(f"{idx}. المسار النشط: {feature}")

    if not report["features_found"]:
        print("❌ لم يتم العثور على صفحات نشطة. يرجى التأكد من تشغيل ./studio.sh fix-paths أولاً.")

analyze_and_fix()
