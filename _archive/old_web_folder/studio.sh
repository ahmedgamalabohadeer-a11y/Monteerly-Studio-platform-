#!/bin/bash
# Monteerly Sovereign Dashboard v5.1 - Stable Release

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

clear
echo -e "${BLUE}==============================================${NC}"
echo -e "${GREEN}    MONTEERLY STUDIO - SOVEREIGN CONSOLE    ${NC}"
echo -e "${BLUE}==============================================${NC}"

# 1. التدقيق الهيكلي
echo -e "${YELLOW}[1/3] جاري فحص سلامة الأصول والمسارات...${NC}"
errors=0
check_file() {
    if [ ! -f "$1" ]; then echo -e "${RED}❌ مفقود: $1${NC}"; errors=$((errors+1)); fi
}
check_file "src/components/legal/SignaturePad.tsx"
check_file "src/app/[locale]/legal/page.tsx"
check_file "src/app/[locale]/layout.tsx"

if [ $errors -eq 0 ]; then echo -e "✅ كافة الأصول السيادية مؤمنة وموجودة."; fi

# 2. رادار الهوية البصرية (النسخة المستقرة)
echo -e "\n${YELLOW}[2/3] بدء رادار الهوية البصرية (تلقائي)...${NC}"
node -e "
const fs = require('fs');
try {
    const pageContent = fs.readFileSync('src/app/[locale]/legal/page.tsx', 'utf8');
    const layoutContent = fs.readFileSync('src/app/[locale]/layout.tsx', 'utf8');
    const combinedContent = pageContent + layoutContent;
    
    const checks = {
        'الخط العربي': 'font-cairo',
        'ألوان البراند': 'brand-success',
        'التوقيع الرقمي': 'SignaturePad',
        'نظام التنبيهات': 'ToastProvider'
    };
    
    console.log('--- تقرير جودة الواجهة ---');
    for (const [name, pattern] of Object.entries(checks)) {
        console.log((combinedContent.includes(pattern) ? '✅ ' : '❌ ') + name);
    }
} catch (e) {
    console.log('❌ تعذر الفحص: ' + e.message);
}
"

# 3. التشغيل الآلي
echo -e "\n${YELLOW}[3/3] تشغيل المحرك والمعاينة...${NC}"
(sleep 6 && termux-open-url http://localhost:3000/ar/legal) &
export NODE_OPTIONS="--max-old-space-size=2048"
npm run dev
