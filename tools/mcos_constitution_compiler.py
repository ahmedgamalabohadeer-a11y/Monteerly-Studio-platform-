import os
import re
import json
from pathlib import Path

VISION_DIR = Path("docs/vision")
OUTPUT_FILE = Path("docs/MCOS_MASTER_SYSTEM_MAP.md")
JSON_OUTPUT = Path("tools/system_state.json")

def compile_constitution():
    print("🔍 [1/3] جاري فلترة الدستور المرجعي وإعادة هيكلته كـ (سيستم)...")
    
    system_map = {
        "modules": {},
        "missing_features": [],
        "completed_features": [],
        "security_protocols": ["Zero-Trust Client", "Server-Side Validation Only", "HMAC Webhooks"]
    }

    if not VISION_DIR.exists():
        print("⚠️ مجلد الرؤية غير موجود، سيتم إنشاؤه.")
        VISION_DIR.mkdir(parents=True, exist_ok=True)

    # هيكلة الأولويات والتطوير الشامل
    master_markdown = """# 🏛️ MCOS MASTER SYSTEM MAP v5.0 (الدستور المرجعي المهيكل)
*تم التوليد آلياً عبر محرك الأتمتة السيادي. يمنع الحذف أو التعديل العشوائي.*

## 🛡️ 1. العقيدة الأمنية (الخط الأحمر)
- **منع الاختراق المالي:** يتم سحب الأسعار حصراً من `PostgreSQL/Supabase` عبر Server Actions.
- **تشفير الأصول:** يتم الرفع مباشرة إلى `Cloudflare R2` بـ Presigned URLs.
- **نظام الضمان (Escrow):** لا يتم تحرير الأموال إلا بقرار إداري أو موافقة مشفرة من العميل.

## 📊 2. حالة المشروع (ما تم تنفيذه ✅ vs ما لم يتم ❌)
"""

    # فحص الكود الفعلي (Auditing the actual code)
    app_dir = Path("src/app/[locale]")
    components_dir = Path("src/components")

    core_pages = {
        "Dashboard (لوحة القيادة)": app_dir / "dashboard/page.tsx",
        "Marketplace (سوق العمل)": app_dir / "marketplace/page.tsx",
        "Studio (الاستوديو)": app_dir / "studio/page.tsx",
        "Academy (الأكاديمية)": app_dir / "academy/page.tsx",
        "Wallet (المحفظة)": app_dir / "wallet/page.tsx",
        "Executive Admin (مركز القيادة)": app_dir / "admin/page.tsx"
    }

    master_markdown += "### 2.1 الصفحات والمسارات الأساسية\n"
    for name, path in core_pages.items():
        if path.exists():
            master_markdown += f"- ✅ **{name}**: موجود ومدمج.\n"
            system_map["completed_features"].append(name)
        else:
            master_markdown += f"- ❌ **{name}**: مفقود - [أولوية قصوى للتنفيذ].\n"
            system_map["missing_features"].append({"type": "page", "name": name, "path": str(path)})

    master_markdown += "\n## 🎨 3. الهوية البصرية السيادية (UI/UX)\n"
    master_markdown += "- **الألوان:** Slate-950 (الخلفية)، Indigo-600 (الهوية)، Emerald-500 (المالية).\n"
    master_markdown += "- **الخطوط:** Cairo (عربي)، Geist (إنجليزي وأكواد).\n"

    OUTPUT_FILE.write_text(master_markdown, encoding="utf-8")
    JSON_OUTPUT.write_text(json.dumps(system_map, indent=2, ensure_ascii=False), encoding="utf-8")
    
    print(f"✅ تم توليد الدستور المهيكل في: {OUTPUT_FILE}")

if __name__ == "__main__":
    compile_constitution()
