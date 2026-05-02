import os

# مسار الحفظ في ذاكرة هاتفك الداخلية (مجلد التنزيلات)
output_path = "/sdcard/Download/Monteerly_Full_Audit.txt"
project_dir = os.path.expanduser("~/Monteerly-Studio-platform-")

# استبعاد المجلدات الثقيلة والملفات الحساسة
exclude_dirs = {'node_modules', '.next', '.git', 'public'}
allowed_exts = {'.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.sh', '.py', '.css'}

try:
    with open(output_path, "w", encoding="utf-8") as out_file:
        out_file.write("========================================\n")
        out_file.write(" 📂 DIRECTORY STRUCTURE (شجرة المشروع)\n")
        out_file.write("========================================\n")
        
        # رسم شجرة المشروع
        for root, dirs, files in os.walk(project_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            level = root.replace(project_dir, '').count(os.sep)
            indent = ' ' * 4 * level
            out_file.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                if not f.startswith('.env'): # استبعاد الأسرار
                    out_file.write(f"{subindent}{f}\n")
        
        out_file.write("\n\n========================================\n")
        out_file.write(" 📄 FILE CONTENTS (محتوى الأكواد)\n")
        out_file.write("========================================\n")
        
        # استخراج محتوى الملفات
        for root, dirs, files in os.walk(project_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                ext = os.path.splitext(file)[1]
                if ext in allowed_exts and file != "package-lock.json" and not file.startswith('.env'):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, project_dir)
                    out_file.write(f"\n\n────────────────────────────────────────\n")
                    out_file.write(f" 📂 FILE: {rel_path}\n")
                    out_file.write(f"────────────────────────────────────────\n")
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            out_file.write(f.read())
                    except Exception as e:
                        out_file.write(f"[Error reading file: {e}]\n")

    print(f"\n✅ [AUDIT SUCCESS] تم استخراج المشروع بالكامل!")
    print(f"📁 تجد الملف الآن في هاتفك: التنزيلات (Downloads) -> Monteerly_Full_Audit.txt\n")

except PermissionError:
    print("\n🚨 [ERROR] لم يتم منح صلاحية التخزين. يرجى تأكيد نافذة الصلاحيات في هاتفك وإعادة المحاولة.\n")
except Exception as e:
    print(f"\n🚨 [ERROR] خطأ غير متوقع: {e}\n")
