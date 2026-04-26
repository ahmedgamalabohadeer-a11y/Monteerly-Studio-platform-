#!/bin/bash
# Monteerly Grand Orchestrator v3.5 - 2026
# المصمم للأستاذ أحمد جمال - الإدارة المالية والقانونية

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

clear
echo -e "${BLUE}==========================================${NC}"
echo -e "${GREEN}    MONTEERLY STUDIO - INTEGRATED AUDIT    ${NC}"
echo -e "${BLUE}==========================================${NC}"

# 1. التدقيق الهيكلي السريع
echo -e "${YELLOW}[1/4] جاري جرد الأصول البرمجية...${NC}"
TOTAL_FILES=$(find src -type f | wc -l)
if [ "$TOTAL_FILES" -lt 500 ]; then
    echo -e "${RED}❌ خلل في حجم المشروع! وجدنا $TOTAL_FILES ملف فقط.${NC}"
else
    echo -e "✅ تم التحقق من ${GREEN}$TOTAL_FILES${NC} ملف (الحالة: متكامل)."
fi

# 2. تشغيل المحرك في الخلفية (Background Engine)
echo -e "\n${YELLOW}[2/4] جاري تشغيل خادم Next.js...${NC}"
export NODE_OPTIONS="--max-old-space-size=2048"
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!

# 3. مراقبة الجاهزية (Health Watchdog)
echo -e "${YELLOW}[3/4] في انتظار استجابة الخادم (Health Check)...${NC}"
RETRIES=0
MAX_RETRIES=30
while ! curl -s http://localhost:3000/ar/legal > /dev/null; do
    sleep 2
    RETRIES=$((RETRIES+1))
    echo -n "."
    if [ $RETRIES -gt $MAX_RETRIES ]; then
        echo -e "${RED}\n❌ فشل تشغيل السيرفر خلال الوقت المحدد.${NC}"
        kill $SERVER_PID
        exit 1
    fi
done
echo -e "\n✅ الخادم جاهز للعمل."

# 4. التوجيه البصري التكاملي (Automated Visual Review)
echo -e "\n${YELLOW}[4/4] جاري فتح الموديولات السيادية للمراجعة...${NC}"
ROUTES=(
    "ar/legal:مركز العقود والتوقيع"
    "ar/academy:أكاديمية المهارات"
    "ar/dashboard-english:لوحة التحكم الدولية"
)

for item in "${ROUTES[@]}"; do
    route=${item%%:*}
    desc=${item#*:}
    echo -e "🔗 فتح ${BLUE}$desc${NC}..."
    termux-open-url "http://localhost:3000/$route"
    sleep 3
done

echo -e "\n${GREEN}==========================================${NC}"
echo -e "✅ اكتملت المهمة بنجاح. السيرفر يعمل بـ PID: $SERVER_PID"
echo -e "لإيقاف السيرفر لاحقاً، استخدم: kill $SERVER_PID"
echo -e "${GREEN}==========================================${NC}"
