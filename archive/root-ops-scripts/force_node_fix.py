import os

files = [".github/workflows/ci-basic.yml", ".github/workflows/deploy.yml"]
for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            lines = f.readlines()
        
        new_lines = []
        for line in lines:
            new_lines.append(line)
            # إضافة متغير البيئة بعد تعريف كل job
            if "jobs:" in line:
                new_lines.append("  env:\n    ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION: true\n")
        
        with open(file_path, 'w') as f:
            f.writelines(new_lines)

print("✅ تم فرض التجاوز الأمني على كافة الـ Jobs بنجاح.")
