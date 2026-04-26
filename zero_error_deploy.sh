#!/bin/bash
echo "🛡️ [Monteerly Shield - Webpack Edition] جاري البدء بالفحص النهائي..."

# 1. فحص الأنواع (لضمان سلامة الكود)
echo "🔍 فحص استقرار الكود (TypeScript)..."
./node_modules/.bin/tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ خطأ: اكتشاف تعارض في أنواع البيانات."
    exit 1
fi

# 2. محاكاة البناء باستخدام Webpack (متوافق مع Android)
echo "🚀 جاري بناء نسخة الإنتاج باستخدام Webpack..."
NODE_ENV=production ./node_modules/.bin/next build --webpack
if [ $? -ne 0 ]; then
    echo "❌ خطأ: فشلت عملية البناء المحلية!"
    exit 1
fi

# 3. الرفع التلقائي والنهائي
echo "✅ تم اجتياز الفحص الشامل بنجاح!"
git add .
git commit -m "Production: Verified build with Webpack on ARM64 and secured types"
git push origin main
echo "🚀 تم الرفع بنجاح. اذهب إلى Vercel الآن وشاهد السحر."
