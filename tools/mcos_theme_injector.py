import os
import re
from pathlib import Path

def inject_corporate_theme():
    print("🎨 [3/3] جاري فرض الهوية البصرية السيادية (الألوان والخطوط) على كامل المشروع...")
    
    tailwind_config = Path("tailwind.config.ts")
    if tailwind_config.exists():
        content = tailwind_config.read_text(encoding="utf-8")
        
        # حقن الألوان السيادية دون حذف الألوان القديمة
        if "colors: {" in content and "corporate:" not in content:
            corporate_colors = """colors: {
        corporate: {
          dark: '#020617', // Slate-950
          accent: '#4f46e5', // Indigo-600
          finance: '#10b981', // Emerald-500
          alert: '#f43f5e', // Rose-500
        },"""
            content = content.replace("colors: {", corporate_colors)
            tailwind_config.write_text(content, encoding="utf-8")
            print("   ✅ تم تحديث tailwind.config.ts بنجاح.")

    globals_css = Path("src/app/globals.css")
    if globals_css.exists():
        css_content = globals_css.read_text(encoding="utf-8")
        # التأكد من وجود الخطوط
        if "font-family: var(--font-cairo)" not in css_content:
            css_content = css_content.replace(
                "@apply bg-slate-950 text-slate-100;", 
                "@apply bg-slate-950 text-slate-100;\n    font-family: var(--font-cairo), 'Tajawal', sans-serif;"
            )
            globals_css.write_text(css_content, encoding="utf-8")
            print("   ✅ تم فرض خط Cairo عالمياً في globals.css.")

if __name__ == "__main__":
    inject_corporate_theme()
