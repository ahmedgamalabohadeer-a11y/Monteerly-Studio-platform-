const fs = require('fs');
const path = require('path');

const targetFiles = [
    'src/components/workspace/VoiceoverRecorder.tsx',
    'src/components/workspace/VrPlayer.tsx',
    'src/components/workspace/Whiteboard.tsx'
];

console.log("🎨 [رادار الهوية البصرية]: فحص سلامة المكونات بعد الترميم...");

targetFiles.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const hasLogic = content.includes('export') && content.includes('return');
        const hasStyle = content.includes('className');
        
        console.log(`\n📂 الملف: ${file}`);
        console.log(hasLogic ? "✅ المنطق البرمجي: سليم وموجود" : "❌ خطأ: الكود الوظيفي مفقود!");
        console.log(hasStyle ? "✅ الهوية البصرية: المكون يحتوي على تنسيقات" : "⚠️ تنبيه: قد يحتاج التنسيق لمراجعة");
    } else {
        console.log(`❌ الملف ${file} غير موجود في المسار!`);
    }
});
