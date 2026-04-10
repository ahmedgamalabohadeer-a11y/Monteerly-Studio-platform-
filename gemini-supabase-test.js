const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require("@supabase/supabase-js");
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function runIntegratedSystem() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

        const prompt = "أحمد جمال يسأل: كيف يمكن لـ Corporate OS تحسين الكفاءة الإدارية؟";

        console.log("⏳ 1. جاري استشارة Gemini 3.1...");
        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();
        
        console.log("✅ تم الحصول على الرد.");

        console.log("⏳ 2. جاري تسجيل البيانات في Monteerly-OS-DB...");
        
        const { data, error } = await supabase
            .from('ai_usage_logs')
            .insert([
                { 
                    prompt_text: prompt, 
                    response_text: aiResponse,
                    model_used: "gemini-3.1-flash-lite",
                    tool_used: "Termux CLI",
                    credits_consumed: 1 // <-- تم إضافة الرصيد المستهلك هنا لإرضاء قاعدة البيانات
                }
            ]);

        if (error) throw error;

        console.log("\n--- ✅ النظام يعمل بكفاءة ---");
        console.log("الرد:", aiResponse);
        console.log("الحالة: تم الحفظ في قاعدة البيانات بنجاح.");

    } catch (error) {
        console.error("❌ فشل النظام:", error.message);
    }
}

runIntegratedSystem();
