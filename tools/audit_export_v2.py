import os

# مسار الحفظ في ذاكرة هاتفك (مجلد التنزيلات)
output_path = "/sdcard/Download/Monteerly_Master_Audit.txt"
project_dir = os.path.expanduser("~/Monteerly-Studio-platform-")

exclude_dirs = {'node_modules', '.next', '.git', 'public'}
# التركيز على الأكواد وملفات الدستور (Markdown/Text)
allowed_exts = {'.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.txt', '.py', '.css'}

try:
    # استخدام errors='replace' لتخطي أي حرف غير مدعوم ومنع انهيار السكربت
    with open(output_path, "w", encoding="utf-8", errors="replace") as out_file:
        out_file.write("========================================\n")
        out_file.write(" 📂 DIRECTORY STRUCTURE (الهيكل المعماري)\n")
        out_file.write("========================================\n")
        
        for root, dirs, files in os.walk(project_dir):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            level = root.replace(project_dir, '').count(os.sep)
            indent = ' ' * 4 * level
            out_file.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = ' ' * 4 * (level + 1)
            for f in files:
                if not f.startswith('.env'):
                    out_file.write(f"{subindent}{f}\n")
        
        out_file.write("\n\n========================================\n")
        out_file.write(" 📄 MASTER CONSTITUTION & CODE CONTENTS (الدستور والأكواد)\n")
        out_file.write("========================================\n")
        
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
                        # القراءة مع التجاهل الآمن للأخطاء
                        with open(file_path, "r", encoding="utf-8", errors="replace") as f:
                            out_file.write(f.read())
                    except Exception as e:
                        out_file.write(f"[Error reading file: {e}]\n")

    print(f"\n✅ [AUDIT SUCCESS] تم تخطي خطأ الترميز واستخراج 'الدستور' والمشروع بنجاح!")
    print(f"📁 اذهب إلى مدير الملفات في هاتفك -> التنزيلات (Downloads) -> ستجد ملف: Monteerly_Master_Audit.txt\n")

except PermissionError:
    print("\n🚨 [ERROR] لم يتم منح صلاحية التخزين.\n")
except Exception as e:
    print(f"\n🚨 [ERROR] خطأ غير متوقع: {e}\n")
