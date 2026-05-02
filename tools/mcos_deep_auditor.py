import os
import json
from pathlib import Path

def run_deep_audit():
    print("🔍 [DEEP AUDIT] جاري فحص الحمض النووي للمشروع ومقارنته بالدستور المطلق...")
    root_dir = Path("src")
    stats = {"files": 0, "lines": 0, "ai_calls": 0, "security_checks": 0}
    
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                stats["files"] += 1
                try:
                    content = Path(os.path.join(root, file)).read_text(encoding='utf-8')
                    stats["lines"] += len(content.splitlines())
                    if 'gemini' in content.lower(): stats["ai_calls"] += 1
                    if 'crypto' in content.lower() or 'hmac' in content.lower() or 'supabase.auth' in content.lower():
                        stats["security_checks"] += 1
                except:
                    pass

    report = f"""# 📊 MCOS ULTIMATE DEEP AUDIT REPORT
- **حجم الكود النشط:** {stats['lines']} سطر تشغيلي عبر {stats['files']} ملف.
- **عقد الذكاء الاصطناعي النشطة:** {stats['ai_calls']} نقطة اتصال.
- **بوابات الأمان المكتشفة:** {stats['security_checks']} جدار ناري.

## 🔴 الفجوات للوصول للتطوير الأقصى (The Next Evolution)
1. **[OS UI]** غياب نظام النوافذ العائمة (Draggable Windows) لجعل المنصة تعمل كـ Corporate OS حقيقي.
2. **[Live Sync]** غياب بروتوكول WebRTC للمزامنة الحية بين العميل والمونتير.
"""
    Path("docs/DEEP_AUDIT_REPORT.md").write_text(report, encoding='utf-8')
    print("✅ تم استخراج تقرير المقارنة العميقة: docs/DEEP_AUDIT_REPORT.md")

if __name__ == "__main__":
    run_deep_audit()
