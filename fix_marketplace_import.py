import os

file_path = "src/app/[locale]/marketplace/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# إضافة الاستيراد إذا لم يكن موجوداً
if 'import Link from "next/link";' not in content and "import Link from 'next/link';" not in content:
    updated_content = content.replace(
        "import React, { useState } from 'react';",
        "import React, { useState } from 'react';\nimport Link from 'next/link';"
    )
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("✅ تم إصلاح خطأ الاستيراد (Link imported successfully).")
else:
    print("⚠️ الاستيراد موجود بالفعل، تأكد من سلامة الملف.")
