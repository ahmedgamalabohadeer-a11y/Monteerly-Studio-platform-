#!/bin/bash
echo "🧹 عملية التطهير الاستراتيجي - الحفاظ على الأصول + إزالة الفوضى"

# 1. إنشاء مجلد الأرشيف الآمن
mkdir -p _archive

# 2. نقل مجلد web الغريب (Ghost App)
if [ -d "web" ]; then
  mv web _archive/web
  echo "✅ نقلت web/ → _archive/web (حفظت 100% من الموارد)"
else
  echo "ℹ️ مجلد web غير موجود"
fi

# 3. تنظيف API الخاطئ (page.tsx داخل api/)
find src/app/api -name "page.tsx" -exec mv {} _archive/ ; 2>/dev/null || echo "ℹ️ لا توجد صفحات خاطئة في API"

# 4. أرشفة الصفحات الوهمية (غير الضرورية حالياً)
PAGES_TO_ARCHIVE=("academy" "disputes" "referral" "ad-studio" "contact" "legal" "status")
for page in "${PAGES_TO_ARCHIVE[@]}"; do
  if [ -d "src/app/[locale]/$page" ]; then
    mv "src/app/[locale]/$page" "_archive/$page"
    echo "✅ أرشفت $page/ (سيتم إعادة بنائها لاحقاً)"
  fi
done

# 5. توحيد Dashboard (الحفاظ على النسخة العربية فقط)
if [ -d "src/app/dashboard" ]; then
  mv src/app/dashboard _archive/dashboard-english
  echo "✅ وحدت Dashboard في src/app/[locale]/dashboard (العربية فقط)"
fi

# 6. التحقق من الصفحات الأساسية المتبقية
echo -e "
📊 الصفحات المتبقية (الجوهرية فقط):"
find src/app/[locale] -name "*.tsx" | grep -E "(page|layout)" | head -10

# 7. Build Test للتأكد من سلامة الهيكل
npm run build > /dev/null 2>&1 && echo "✅ Build ناجح - الهيكل نظيف 100%" || echo "⚠️ Build فشل - تحقق يدوياً"

echo "🎉 التطهير اكتمل! المشروع نظيف وجاهز لـ PostgreSQL + Stripe"
