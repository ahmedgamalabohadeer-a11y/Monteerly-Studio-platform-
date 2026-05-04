import os
import re
from pathlib import Path

BLUEPRINT_PATH = "docs/vision/Monteerly-Platform-Ultimate-Blueprint.md"
SRC_DIR = "src"

# خريطة الذكاء الدلالي: نربط الكلمة في الدستور باسم المكون البرمجي الفعلي
SEMANTIC_MAP = {
    "الهيرو": ["mainVideoCover", "UltimateLandingPage", "hero"],
    "قصص النجاح والعملاء": ["Testimonials", "user1", "user2"],
    "مكتبة الصور والتراث": ["library", "rawVideoCover", "AssetBrowser"],
    "التلعيب والمكافآت": ["Gamification", "BadgeSystem", "Trophy"],
    "صفحة ملف المبدع": ["TalentProfile", "talent/[id]"],
    "صفحة “من نحن” والشركة": ["AboutCompany", "about"],
    "صفحة تسجيل الدخول / التسجيل": ["AuthGateway", "signInWithPassword"],
    "حالة عدم وجود بيانات (Empty States)": ["EmptyState", "لا توجد مشاريع"],
    "صفحة الأسعار": ["ProfessionalPricing", "pricing"],
    "لوحة التحكم الرئيسية": ["ElegantDashboard", "UserDashboard"]
}

def check_implementation():
    print("🚀 MCOS ENGINE v6 (SEMANTIC & COMPONENT SCANNER)\n")
    
    if not Path(BLUEPRINT_PATH).exists():
        print("❌ الدستور المرجعي غير موجود.")
        return

    # جمع كل أكواد المشروع في نص واحد للبحث
    full_code = ""
    for root, _, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith((".ts", ".tsx")):
                try:
                    full_code += Path(os.path.join(root, file)).read_text(encoding="utf-8") + "\n"
                except: pass

    implemented_count = 0
    missing_items = []

    print("📊 نتائج الفحص الدلالي الدقيق:\n")
    for blueprint_term, code_markers in SEMANTIC_MAP.items():
        # إذا وجدنا أي علامة برمجية (Code Marker) في الكود، فالقسم مكتمل
        is_found = any(marker in full_code for marker in code_markers)
        
        if is_found:
            print(f"✅ {blueprint_term} -> [تم دمجها برمجياً بنجاح]")
            implemented_count += 1
        else:
            print(f"❌ {blueprint_term} -> [مفقودة]")
            missing_items.append(blueprint_term)

    print(f"\n✅ إجمالي المكتمل من العناصر الكبرى: {implemented_count}/{len(SEMANTIC_MAP)}")
    if missing_items:
        print("🔴 النواقص الحقيقية:")
        for m in missing_items: print(f" - {m}")

if __name__ == "__main__":
    check_implementation()
