#!/bin/bash
echo "🛡️ [Monteerly Shield] جاري فحص استقرار النظام قبل النشر..."

# 1. فحص الأخطاء القواعدية (Syntax Check)
echo "🔍 فحص ملفات TypeScript و JavaScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ خطأ: تم اكتشاف أخطاء في أنواع البيانات أو الصياغة!"
    exit 1
fi

# 2. فحص ملف الميدل وير الحساس
echo "🔍 فحص ملف الحماية (Middleware)..."
if grep -q "###" src/middleware.ts; then
    echo "❌ خطأ: تم اكتشاف رموز غير صالحة في Middleware!"
    exit 1
fi

# 3. محاكاة البناء (Production Build Simulation)
echo "🚀 جاري محاكاة بناء نسخة الإنتاج (Webpack Mode)..."
npx next build --webpack
if [ $? -ne 0 ]; then
    echo "❌ خطأ: فشلت عملية البناء المحلية!"
    exit 1
fi

# 4. الرفع النهائي في حال النجاح
echo "✅ تم اجتياز جميع الفحوصات بنجاح!"
git add .
git commit -m "Production: Zero-error deployment verified by Shield"
git push origin main
echo "🚀 تم الرفع إلى GitHub.. سيقبل Vercel هذا التحديث الآن بكل فخر."
