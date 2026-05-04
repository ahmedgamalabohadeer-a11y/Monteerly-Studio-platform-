import os
from pathlib import Path
import re

def audit_blueprint_vs_reality():
    print("=================================================================")
    print(" 📖 MCOS BLUEPRINT DEEP SCANNER (الفحص الجراحي للدستور المرجعي)")
    print("=================================================================\n")
    
    blueprint_path = Path("docs/vision/Monteerly-Platform-Ultimate-Blueprint.md")
    src_dir = Path("src")
    
    if not blueprint_path.exists():
        print("❌ لم يتم العثور على ملف الدستور المرجعي.")
        return

    blueprint_content = blueprint_path.read_text(encoding='utf-8')
    
    # 1. استخراج العناوين والأقسام من الدستور
    sections = re.findall(r'###? (.*)', blueprint_content)
    
    # 2. فحص الأكواد لمعرفة ما إذا كانت هذه الأقسام قد تمت برمجتها
    missing_features = []
    implemented_features = []
    
    for section in sections:
        # تبسيط النص للبحث
        clean_section = re.sub(r'[^a-zA-Zأ-ي0-9]', '', section).lower()
        if len(clean_section) < 3: continue
        
        found = False
        for root, _, files in os.walk(src_dir):
            for file in files:
                if file.endswith(('.tsx', '.ts')):
                    file_content = Path(os.path.join(root, file)).read_text(encoding='utf-8').lower()
                    file_content_clean = re.sub(r'[^a-zA-Zأ-ي0-9]', '', file_content)
                    if clean_section in file_content_clean:
                        found = True
                        break
            if found: break
            
        if found:
            implemented_features.append(section)
        else:
            # فلترة العناوين التوضيحية
            if not any(word in clean_section for word in ['مقدمة', 'نظرة', 'فهرس', 'تحديث']):
                missing_features.append(section)

    print(f"✅ تم دمج وتوثيق ({len(implemented_features)}) مكون وقسم من الدستور بنجاح في الأكواد.")
    print(f"⚠️ هناك ({len(missing_features)}) نقطة/قسم في الدستور لم تترجم إلى كود صريح حتى الآن.")
    
    print("\n🔴 النواقص الحرفية (أشياء ذُكرت في الدستور ولم نبرمج لها صفحة/كود):")
    for missing in missing_features[:10]: # عرض أهم 10 نواقص
        print(f" - {missing.strip()}")
        
    print("\n💡 التوصية: قم بنسخ النواقص التي تظهر هنا، لكي نقوم ببرمجتها فوراً في الجولة القادمة لضمان التطابق 100%.")

if __name__ == "__main__":
    audit_blueprint_vs_reality()
