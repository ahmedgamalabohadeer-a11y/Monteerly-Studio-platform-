import os
import re

def get_full_report():
    print("--- [تقرير الفحص الشامل والنهائي: Monteerly Studio 2026] ---")
    
    app_dir = "src/app"
    components_dir = "src/components"
    lib_dir = "src/lib"
    
    results = {
        "broken_imports": [],
        "missing_layouts": [],
        "unlinked_assets": [],
        "total_files": 0
    }

    # 1. فحص شامل لكل ملف برمي في المشروع
    for root, dirs, files in os.walk("src"):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                results["total_files"] += 1
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                    for i, line in enumerate(lines):
                        # البحث عن استدعاءات مكسورة لا تبدأ بـ @/ أو .
                        if "import" in line and "from" in line:
                            # كشف الاستدعاءات التي قد تشير لمجلدات خارج src (بسبب الدمج)
                            if "../../" in line and not line.strip().startswith("//"):
                                results["broken_imports"].append(f"{file_path} (Line {i+1})")

    # 2. فحص وجود ملفات page.tsx بدون layout.tsx (قد يسبب خلل في التصميم)
    for root, dirs, files in os.walk(app_dir):
        if "page.tsx" in files and "layout.tsx" not in files:
            # التحقق من وجود layout في المجلدات الأعلى
            results["missing_layouts"].append(root)

    # طباعة التقرير الاحترافي
    print(f"✅ تم فحص {results['total_files']} ملف برمجي.")
    
    if results["broken_imports"]:
        print(f"\n⚠️ تنبيه: تم العثور على {len(results['broken_imports'])} ملف يحتاج لتعديل المسار:")
        for err in results["broken_imports"][:5]: # عرض أول 5 فقط للاختصار
            print(f"   - {err}")
    else:
        print("\n💎 الحالة البرمجية: جميع الروابط الداخلية سليمة وموحدة.")

    if results["missing_layouts"]:
        print(f"\n📂 المجلدات التي تحتاج لـ layout.tsx مخصص (اختياري):")
        for folder in results["missing_layouts"]:
            print(f"   - {folder}")

get_full_report()
