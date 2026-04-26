const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function deepAudit(url) {
    console.log(`\n🔍 [رادار الهوية]: فحص الرابط -> ${url}`);
    try {
        const { data } = await axios.get(url);
        const dom = new JSDOM(data);
        
        // 1. فحص الهوية البصرية (Identity Audit)
        const hasCairo = data.includes('Cairo') || data.includes('font-cairo');
        const hasBrandColors = ['brand-success', 'brand-primary'].some(c => data.includes(c));
        
        console.log(hasCairo ? "✅ الخط العربي (Cairo): موجود" : "❌ الخط العربي: مفقود!");
        console.log(hasBrandColors ? "✅ ألوان الهوية: مطبقة" : "⚠️ تحذير: ألوان البراند غير مكتشفة");

        // 2. فحص الأصول القانونية والمالية (Business Logic Check)
        if (url.includes('legal')) {
            const hasSignature = data.includes('SignaturePad') || data.includes('canvas');
            console.log(hasSignature ? "✅ نظام التوقيع الرقمي: نشط" : "❌ نظام التوقيع: غير مكتشف!");
        }
        
        if (url.includes('dashboard')) {
            const hasCharts = data.includes('Chart') || data.includes('svg');
            console.log(hasCharts ? "✅ لوحة التحكم: الرسوم البيانية محملة" : "⚠️ تنبيه: لم يتم اكتشاف رسوم بيانية نشطة");
        }
    } catch (e) {
        console.log(`❌ الصفحة لا تستجيب (تأكد من تشغيل ./studio.sh dev أولاً)`);
    }
}

const routes = [
    'http://localhost:3000/ar/legal', 
    'http://localhost:3000/ar/dashboard-english'
];

async function start() {
    for (const r of routes) { await deepAudit(r); }
}
start();
