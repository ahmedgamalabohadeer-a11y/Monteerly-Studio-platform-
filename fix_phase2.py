#!/usr/bin/env python3
import os
import re

def fix_button_component():
    target_path = "src/components/ui/Button.tsx"
    print(f"🔧 إصلاح مكون Button في {target_path}...")
    
    if not os.path.exists(target_path):
        print("❌ الملف غير موجود!")
        return

    with open(target_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. إصلاح خطأ Syntax في القيمة الافتراضية
    # الخطأ: variant = 'default' | 'primary'
    # الحل: variant = 'default'
    if "variant = 'default' | 'primary'" in content:
        content = content.replace("variant = 'default' | 'primary'", "variant = 'default'")
        print("   ✅ تم إصلاح خطأ Syntax في القيمة الافتراضية.")

    # 2. إضافة مفتاح 'default' إلى كائن variants
    # نبحث عن const variants = { ... }
    # ونضيف default: "...",
    if 'default:' not in content and 'const variants = {' in content:
        # نضيف الستايل الافتراضي (ننسخ ستايل primary)
        # نبحث عن primary: "..."
        match = re.search(r'(primary:\s*"[^"]*",)', content)
        if match:
            primary_style = match.group(1)
            # نضيف default قبله
            insertion = f'default: "bg-blue-600 text-white hover:bg-blue-700",\n    {primary_style}'
            content = content.replace(primary_style, insertion)
            print("   ✅ تمت إضافة الستايل 'default' إلى variants.")

    # 3. إضافة مفتاح 'xl' إلى كائن sizes
    if 'xl:' not in content and 'const sizes = {' in content:
        # نبحث عن lg: "..." ونضيف xl بعده
        match = re.search(r'(lg:\s*"[^"]*")', content)
        if match:
            lg_style = match.group(1)
            insertion = f'{lg_style},\n    xl: "h-14 px-8 text-lg"'
            content = content.replace(lg_style, insertion)
            print("   ✅ تمت إضافة الستايل 'xl' إلى sizes.")

    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_audio_mixer():
    target_path = "src/components/workspace/AudioMixer.tsx"
    print(f"🔧 إصلاح AudioMixer في {target_path}...")
    
    if not os.path.exists(target_path):
        print("❌ الملف غير موجود!")
        return

    with open(target_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    fixed = False
    for line in lines:
        if 'orient="vertical"' in line and '// @ts-ignore' not in line:
             # نتأكد أننا لم نضف التجاهل مسبقاً
             if new_lines and '// @ts-ignore' in new_lines[-1]:
                 pass
             else:
                 # نضيف التجاهل
                 indent = line[:len(line) - len(line.lstrip())]
                 new_lines.append(f"{indent}// @ts-ignore\n")
                 fixed = True
        new_lines.append(line)

    if fixed:
        with open(target_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("   ✅ تم تجاهل خاصية orient غير القياسية.")
    else:
        print("   ℹ️ لم يتم العثور على الخاصية أو تم إصلاحها.")

if __name__ == "__main__":
    print("🚀 تشغيل الإصلاحات النهائية للمكونات\n" + "="*40)
    fix_button_component()
    fix_audio_mixer()
    print("\n" + "="*40)
    print("🏁 انتهى. شغل 'npm run build' الآن!")
