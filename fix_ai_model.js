const fs = require('fs');
const path = require('path');

async function fixModel() {
    console.log("🔍 [1/3] جاري قراءة مفتاح GEMINI_API_KEY...");
    const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.+)/);
    const apiKey = match ? match[1].trim() : null;

    if (!apiKey) {
        console.log("❌ لم يتم العثور على المفتاح في الملف.");
        return;
    }

    console.log("🌐 [2/3] جاري الاتصال بخوادم Google لمعرفة المحركات المصرحة لمفتاحك...");
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();

        if (data.error) {
            console.log(`❌ رفضت Google الطلب. السبب: ${data.error.message}`);
            return;
        }

        // تصفية المحركات لاستخراج عائلة Gemini التي تدعم توليد النصوص
        const models = data.models.filter(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'));
        
        console.log("\n✅ المحركات المتاحة رسمياً لمفتاحك هي:");
        models.forEach(m => console.log(`   - ${m.name}`));

        if (models.length > 0) {
            // اختيار أول محرك متاح (وهو الأفضل والأكثر توافقاً مع المفتاح)
            const bestModel = models[0].name.replace('models/', '');
            console.log(`\n🛠️ [3/3] سيتم برمجة الخادم تلقائياً لاستخدام: ${bestModel}`);

            const routePath = path.join(__dirname, 'src/app/api/ai/legal/route.ts');
            let routeContent = fs.readFileSync(routePath, 'utf8');
            
            // استبدال ذكي لاسم المحرك في الرابط مهما كان اسمه القديم
            routeContent = routeContent.replace(/models\/[a-zA-Z0-9.-]+:generateContent/, `models/${bestModel}:generateContent`);
            
            fs.writeFileSync(routePath, routeContent);
            console.log("✅ تمت عملية البرمجة بنجاح. الخادم الآن متوافق 100% مع مفتاحك!");
        } else {
            console.log("❌ مفتاحك لا يحتوي على أي صلاحيات لاستخدام نماذج Gemini.");
        }
    } catch (err) {
        console.log("❌ فشل الاتصال:", err.message);
    }
}

fixModel();
