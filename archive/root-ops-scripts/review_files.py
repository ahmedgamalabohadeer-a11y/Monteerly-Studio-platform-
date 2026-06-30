import os

files_to_review = [
    "src/types/monteerly.d.ts",
    "src/app/[locale]/marketplace/page.tsx",
    "src/app/[locale]/academy/page.tsx",
    "src/app/[locale]/studio/page.tsx",
    "src/app/[locale]/studio/[projectId]/page.tsx",
    "src/app/[locale]/messages/page.tsx",
    "src/app/[locale]/community/page.tsx",
    "src/app/[locale]/agency/page.tsx",
    "src/app/[locale]/agency/team/page.tsx"
]

print("\n🚀 --- بدء مراجعة ملفات المشروع ---\n")

for file_path in files_to_review:
    print("=" * 80)
    print(f"📂 FILE: {file_path}")
    print("=" * 80)
    
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                print(f.read())
        except Exception as e:
            print(f"❌ خطأ في قراءة الملف: {e}")
    else:
        print("❌ الملف غير موجود!")
    
    print("\n\n")

print("✅ تمت عملية العرض.")
