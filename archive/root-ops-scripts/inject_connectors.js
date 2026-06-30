const fs = require('fs');
const path = require('path');

// الهدف: واجهة الدردشة الحالية
const targetFile = 'src/components/chat/SecureChat.tsx';

if (fs.existsSync(targetFile)) {
    let content = fs.readFileSync(targetFile, 'utf8');
    
    // التحقق من عدم وجود الدمج مسبقاً لتجنب التكرار
    if (!content.includes('ChatEscrowEngine')) {
        const importStatement = "import { ChatEscrowEngine } from '@/lib/integration/ChatEscrowEngine';\n";
        
        // إضافة الاستيراد في بداية الملف
        content = importStatement + content;
        
        fs.writeFileSync(targetFile, content);
        console.log(`[نجاح] تم حقن محرك الدمج بنجاح في: ${targetFile} دون حذف أي سطر.`);
    } else {
        console.log(`[تخطي] المحرك مدمج بالفعل في: ${targetFile}`);
    }
} else {
    console.log(`[تنبيه] لم يتم العثور على الملف المستهدف: ${targetFile}`);
}
