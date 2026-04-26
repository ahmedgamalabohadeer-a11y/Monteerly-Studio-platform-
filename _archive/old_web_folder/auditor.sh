#!/bin/bash
# Monteerly Professional Auditor v4.0 - 2026
# مبدأ العمل: ترميم وإضافة (Zero-Deletion Policy)

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}--- [بدء منظومة التدقيق الاحترافية الشاملة] ---${NC}"

# 1. التدقيق البرمجي السريع (دون استهلاك الرام)
echo -e "\n${YELLOW}[1/3] فحص الأخطاء البرمجية في المكونات المدمجة...${NC}"
# سنفحص فقط الملفات التي تم تعديلها أو دمجها مؤخراً
find src/app src/components -name "*.tsx" -mmin -60 | xargs npx tsc --noEmit --pretty 2>&1 | tee audit_result.log

# 2. مراجعة الهوية البصرية (تلقائياً عبر الكود)
echo -e "\n${YELLOW}[2/3] فحص الهوية البصرية (Visual Identity Audit)...${NC}"
node -e "
const fs = require('fs');
const files = ['src/app/[locale]/legal/page.tsx', 'src/app/[locale]/academy/page.tsx'];
const brandElements = ['font-cairo', 'brand-success', 'Shield', 'SignaturePad'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        console.log('\n📄 فحص الملف: ' + file);
        brandElements.forEach(el => {
            const status = content.includes(el) ? '✅' : '❌';
            console.log(status + ' العنصر: ' + el);
        });
    }
});
"

# 3. التأكد من سلامة الأصول (Integrity Check)
echo -e "\n${YELLOW}[3/3] جرد الميزات السيادية (No-Deletion Check)...${NC}"
ASSETS=("legal/ContractWizard.tsx" "legal/SignaturePad.tsx" "ui/Button.tsx")
for asset in "${ASSETS[@]}"; do
    if [ -f "src/components/$asset" ]; then
        echo -e "✅ ميزة [${asset%/*}] : ${GREEN}موجودة ومؤمنة.${NC}"
    else
        echo -e "❌ ميزة [${asset%/*}] : ${RED}غير موجودة في المسار المستهدف!${NC}"
    fi
done

echo -e "\n${BLUE}--- [انتهى التدقيق الاحترافي] ---${NC}"
