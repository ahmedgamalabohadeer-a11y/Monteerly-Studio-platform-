const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function initGemini() {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.error("❌ خطأ: لم يتم العثور على المفتاح");
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // استخدام أحدث نموذج متاح في قائمتك (Gemini 3.1 Flash)
        const model = genAI.getGenerativeModel({ 
            model: "gemini-3.1-flash-lite-preview" 
        });

        const prompt = "أنا أحمد جمال، مطور منصة Monteerly Studio. حلل حالة المشروع 'قيد المراجعة' باستخدام قدرات Gemini 3.1 الجديدة.";

        console.log("⏳ جاري الاتصال بـ Gemini 3.1 Next-Gen...");
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        console.log("\n--- ✅ تم الاتصال بنجاح (جيل 3.1) ---");
        console.log(response.text());
        
    } catch (error) {
        console.error("❌ خطأ تقني:");
        console.error(error.message);
    }
}

initGemini();
