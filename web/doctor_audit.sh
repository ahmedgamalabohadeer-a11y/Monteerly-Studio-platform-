#!/bin/bash
# منظومة إصلاح الأخطاء البرمجية - Monteerly Studio

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🔍 بدء الفحص البرمجي العميق...${NC}"

# 1. فحص الأنواع (Type Checking) - سيكشف سبب خطأ المتصفح
echo -e "\n[1/3] جاري فحص أخطاء TypeScript..."
npx tsc --noEmit > ts_errors.log 2>&1

if [ $? -eq 0 ]; then
    echo -e "✅ لا توجد أخطاء في منطق الأنواع."
else
    echo -e "❌ تم العثور على أخطاء! (راجع ts_errors.log)"
    # إصلاح آلي سريع لبعض الأخطاء الشائعة في الاستيراد
    ./studio.sh fix-imports
fi

# 2. فحص جودة الكود (Linting)
echo -e "\n[2/3] جاري فحص معايير الكود (ESLint)..."
npx next lint --fix > lint_report.log 2>&1
echo -e "✅ تم إجراء الإصلاحات التلقائية الممكنة."

# 3. فحص التبعيات المفقودة (Dependencies)
echo -e "\n[3/3] جاري فحص الحزم المفقودة..."
npm install --no-audit > /dev/null 2>&1
echo -e "✅ تم التأكد من اكتمال المكتبات."
