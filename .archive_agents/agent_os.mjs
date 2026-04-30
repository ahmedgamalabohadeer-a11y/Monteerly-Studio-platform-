import fs from 'fs';
import { execSync } from 'child_process';

const API_KEY = process.env.GEMINI_API_KEY?.replace(/[\r\n\s"']+/g, '');

if (!API_KEY) {
    console.error("❌ خطأ: المفتاح مفقود.");
    process.exit(1);
}

const prompt = `
أنت مهندس واجهات React محترف. قم بكتابة كود ملف page.tsx لمحاكي دفع Paymob.
المتطلبات:
1. استخدم 'use client'.
2. اقرأ token و amount من searchParams.
3. استخدم كلاسات Tailwind (bg-slate-950, text-slate-100, bg-slate-900).
4. ضع زراً "تأكيد الدفع (Escrow Trigger)" يرسل POST وهمي إلى /api/payments/paymob/webhook.
5. اعرض حالة الدفع.
هام جداً: أرجع الكود البرمجي فقط بدون علامات الماركداون.
`;

async function runAGICore() {
    try {
        console.log("🔍 [AGI Core] فحص النماذج المتاحة لمفتاحك (Self-Discovery)...");
        
        // 1. الاستكشاف الذاتي للنماذج المتاحة
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const listRes = await fetch(listUrl);
        const listData = await listRes.json();
        
        if (!listRes.ok) throw new Error("فشل في جلب القائمة: " + JSON.stringify(listData));

        // 2. فلترة النماذج لاختيار الأنسب تلقائياً
        const availableModels = listData.models.filter(m => 
            m.supportedGenerationMethods.includes('generateContent') && 
            m.name.includes('gemini')
        );

        if (availableModels.length === 0) throw new Error("لا توجد نماذج متاحة للبرمجة.");

        // النظام يختار النموذج الأحدث والمتاح لديه
        const selectedModel = availableModels.find(m => m.name.includes('1.5-flash')) || availableModels[0];
        const modelName = selectedModel.name;

        console.log(`🧠 [AGI Core] المعالجة الذاتية نجحت! تم اختيار النموذج: ${modelName}`);

        // 3. توليد الكود عبر النموذج الذي تم اكتشافه
        const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`;
        const genRes = await fetch(generateUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.1 }
            })
        });

        const genData = await genRes.json();
        if (!genRes.ok) throw new Error("فشل توليد الكود: " + JSON.stringify(genData));

        let code = genData.candidates[0].content.parts[0].text;
        
        // 4. التنظيف الذاتي
        code = code.replace(/^```(tsx|typescript|javascript|html)?\n/i, '').replace(/```$/i, '').trim();

        // 5. البناء والحفظ
        const dir = 'src/app/checkout/simulator';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(`${dir}/page.tsx`, code);
        console.log("✅ [AGI Core] تم بناء صفحة المحاكي بنجاح.");

        // 6. الأتمتة (Git)
        execSync('git add src/app/checkout/simulator/page.tsx');
        execSync('git commit -m "Auto-generated: Paymob Simulator UI via AGI Core" || true');
        console.log("🚀 [AGI Core] المهمة اكتملت بنجاح مطلق!");

    } catch (error) {
        console.error("❌ [AGI Core] خطأ حرج:", error.message);
    }
}

runAGICore();
