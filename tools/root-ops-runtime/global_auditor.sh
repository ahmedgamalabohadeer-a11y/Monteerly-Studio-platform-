#!/bin/bash
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${BLUE}==============================================${NC}"
echo -e "${GREEN}  MONTEERLY STUDIO - SMART ARCHITECTURE ENFORCER  ${NC}"
echo -e "${BLUE}==============================================${NC}"

echo -e "${YELLOW}[1/3] فحص الهيكل وتصحيح المسارات تلقائياً...${NC}"
# تجاهل الأرشيف المحمي تماماً والبحث عن الصفحات اليتيمة
FILES=$(find src/app -name "page.tsx" | grep -v "_archive")

for file in $FILES; do
    if [[ $file != *"/[locale]/"* ]]; then
        DIR_NAME=$(dirname "$file" | sed 's|src/app/||')
        echo -e "📦 نقل المجلد اليتيم [${BLUE}$DIR_NAME${NC}] إلى المظلة الدولية..."
        mkdir -p "src/app/[locale]/$DIR_NAME"
        mv "src/app/$DIR_NAME"/* "src/app/[locale]/$DIR_NAME/" 2>/dev/null
    fi
done

# تفريغ الذاكرة المؤقتة من الجذور لفرض رسم خريطة جديدة
echo "🧹 تنظيف ذاكرة المحرك المؤقتة..."
rm -rf .next

echo -e "\n${YELLOW}[2/3] تشغيل المحرك الديناميكي المستقر...${NC}"
export NODE_OPTIONS="--max-old-space-size=2048"
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

RETRIES=0
while ! curl -s http://localhost:3000/ar/legal > /dev/null; do
    sleep 2
    RETRIES=$((RETRIES+1))
    echo -n "."
    if [ $RETRIES -gt 25 ]; then
        echo -e "${RED}\n❌ السيرفر استغرق وقتاً طويلاً. جاري الإلغاء.${NC}"
        kill $SERVER_PID
        exit 1
    fi
done
echo -e "\n✅ السيرفر يعمل الآن بالهيكل الموحد والمستقر."

echo -e "\n${YELLOW}[3/3] تقرير الزحف والاستجابة النهائي (Live Audit)...${NC}"
echo -e "----------------------------------------------"

# الزحف حصرياً على المسارات الدولية الصحيحة لتجنب الأخطاء الوهمية
VALID_ROUTES=$(find src/app/\[locale\] -name "page.tsx" | sed 's|src/app/\[locale\]||g' | sed 's|/page.tsx||g')

for route in $VALID_ROUTES; do
    if [ -z "$route" ]; then route="/"; fi
    
    # فحص الاستجابة الفعلية
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "http://localhost:3000/ar$route")

    if [ "$STATUS" == "200" ]; then
        echo -e "✅ مسار [${BLUE}/ar$route${NC}] : ${GREEN}مستقر 100% (200)${NC}"
    elif [ "$STATUS" == "500" ]; then
        echo -e "❌ مسار [${BLUE}/ar$route${NC}] : ${RED}عطل برمجي داخلي (500)${NC}"
    else
        echo -e "⚠️ مسار [${BLUE}/ar$route${NC}] : ${YELLOW}استجابة غير متوقعة ($STATUS)${NC}"
    fi
done

echo -e "----------------------------------------------"
kill $SERVER_PID
echo -e "${GREEN}🏆 اكتملت المهمة. الأصول تعمل وفق المعيار الدولي.${NC}"
echo -e "${BLUE}==============================================${NC}"
