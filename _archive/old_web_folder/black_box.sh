#!/bin/bash
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${BLUE}==============================================${NC}"
echo -e "${RED}    MONTEERLY STUDIO - BLACK BOX DIAGNOSTIC   ${NC}"
echo -e "${BLUE}==============================================${NC}"

# إيقاف أي عمليات عالقة
pkill -f "next" 2>/dev/null
rm -f next_debug.log

echo -e "${YELLOW}[1/3] تشغيل المحرك في وضع المراقبة (Debug Mode)...${NC}"
export NODE_OPTIONS="--max-old-space-size=2048"
npm run dev > next_debug.log 2>&1 &
SERVER_PID=$!

# انتظار السيرفر حتى يقلع
sleep 7

echo -e "${YELLOW}[2/3] توجيه ضربة اختبار لصفحة الأكاديمية (استفزاز الخطأ 500)...${NC}"
curl -s http://localhost:3000/ar/academy > /dev/null

# إعطاء السيرفر 3 ثوانٍ لكتابة الخطأ في السجل
sleep 3
kill $SERVER_PID

echo -e "\n${YELLOW}[3/3] استخراج التقرير الفعلي لسبب الانهيار:${NC}"
echo -e "----------------------------------------------"
# سحب الأسطر التي تحتوي على الخطأ الفعلي
grep -A 12 -i "error" next_debug.log | tail -n 15
echo -e "----------------------------------------------"
echo -e "${BLUE}==============================================${NC}"
