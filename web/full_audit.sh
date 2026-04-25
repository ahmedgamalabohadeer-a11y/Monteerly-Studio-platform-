#!/bin/bash
PROJECT_DIR="$HOME/Monteerly-Studio-platform-/web"
LOG_FILE="project_health_report.log"

echo "--- [بدء الفحص الشامل لـ Monteerly Studio] ---" | tee $LOG_FILE
date >> $LOG_FILE
cd $PROJECT_DIR

# 1. فحص أخطاء التيب-سكريبت (TypeScript Type Checking)
echo -e "\n[1/4] فحص أخطاء الأنواع (Static Typing)..." | tee -a $LOG_FILE
npx tsc --noEmit >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then echo "✅ لا توجد أخطاء في الأنواع." | tee -a $LOG_FILE; else echo "❌ تم اكتشاف أخطاء في Types (راجع اللوج)." | tee -a $LOG_FILE; fi

# 2. فحص جودة الكود (Linting)
echo -e "\n[2/4] فحص معايير الكود (ESLint)..." | tee -a $LOG_FILE
npm run lint >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then echo "✅ الكود يتبع المعايير القياسية." | tee -a $LOG_FILE; else echo "⚠️ توجد تنبيهات في تنسيق الكود." | tee -a $LOG_FILE; fi

# 3. فحص الثغرات الأمنية في الحزم (Security Audit)
echo -e "\n[3/4] فحص الثغرات الأمنية (npm audit)..." | tee -a $LOG_FILE
npm audit >> $LOG_FILE 2>&1
echo "✅ تم تسجيل تقرير الأمان." | tee -a $LOG_FILE

# 4. محاكاة بناء المشروع (Production Build Test)
echo -e "\n[4/4] محاكاة بناء النسخة النهائية (Build Test)..." | tee -a $LOG_FILE
# نستخدم --no-lint لتسريع الفحص هنا لأننا فحصناه سابقاً
npx next build --no-lint >> $LOG_FILE 2>&1
if [ $? -eq 0 ]; then echo "✅ المشروع قابل للبناء والتدشين." | tee -a $LOG_FILE; else echo "❌ فشل بناء النسخة النهائية (خطأ فادح)." | tee -a $LOG_FILE; fi

echo -e "\n--- [انتهى الفحص. التقرير متاح في: $LOG_FILE] ---"
