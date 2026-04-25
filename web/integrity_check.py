import json
import os

def run_audit():
    print("\n--- [تقرير تدقيق الجودة: Monteerly Studio] ---")
    
    # التحقق من الملفات المرتبطة
    files_to_check = {
        "package.json": "العمود الفقري للإعدادات",
        "next.config.ts": "محرك التشغيل",
        ".env.local": "مفاتيح الأمان",
        "src/lib/firebase.ts": "ربط البيانات"
    }
    
    for file, desc in files_to_check.items():
        exists = "✅" if os.path.exists(file) else "❌"
        print(f"{exists} {file} ({desc})")

    # التحقق من الإصدارات داخل package.json
    if os.path.exists('package.json'):
        with open('package.json', 'r') as f:
            data = json.load(f)
            deps = data.get('dependencies', {})
            next_v = deps.get('next')
            react_v = deps.get('react')
            print(f"\nإصدار Next.js المستهدف: {next_v}")
            print(f"إصدار React المستهدف: {react_v}")
            
            if next_v != "16.2.1":
                print("🚨 تنبيه إداري: إصدار Next.js غير متوافق مع رؤية 2026!")

run_audit()
