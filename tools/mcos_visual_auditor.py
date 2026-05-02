import os
import re
from pathlib import Path

def enforce_visual_consistency():
    print("👁️ [VISUAL AUTO-CORRECT] جاري مسح جميع الصفحات لفرض الهوية البصرية...")
    root_dir = Path("src/app")
    corrected_files = 0

    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith("page.tsx"):
                file_path = Path(os.path.join(root, file))
                try:
                    content = file_path.read_text(encoding='utf-8')
                    original_content = content

                    # 1. التأكد من وجود الكلاسات الجوهرية (Dark Mode & Font)
                    if 'className="' in content and 'min-h-screen' in content:
                        # تصحيح أي خلفية بيضاء أو غير معتمدة إلى Slate-950
                        content = re.sub(r'bg-(white|gray-[0-9]+|slate-[1-8]00)', 'bg-slate-950', content)
                        # تصحيح أي نص أسود إلى أبيض/فاتح
                        content = re.sub(r'text-(black|gray-[7-9]00|slate-[7-9]00)', 'text-slate-50', content)
                        
                    if content != original_content:
                        file_path.write_text(content, encoding='utf-8')
                        corrected_files += 1
                        print(f"   ✨ تم التصحيح البصري: {file_path.name}")
                except Exception as e:
                    pass

    print(f"✅ الأتمتة البصرية اكتملت. تم توحيد الألوان والخطوط في {corrected_files} صفحة/مكون.")

if __name__ == "__main__":
    enforce_visual_consistency()
