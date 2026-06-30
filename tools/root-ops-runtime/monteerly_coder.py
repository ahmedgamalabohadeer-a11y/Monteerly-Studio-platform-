import os
import json
import urllib.request

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("❌ خطأ: مفتاح GEMINI_API_KEY غير موجود في البيئة.")
    exit()

prompt = """
أنت مهندس واجهات React محترف. قم بكتابة كود ملف `page.tsx` لمحاكي دفع Paymob.
المتطلبات:
1. استخدم 'use client'.
2. اقرأ token و amount من searchParams.
3. استخدم كلاسات Tailwind داكنة (bg-slate-950, text-slate-100, p-6, rounded-xl).
4. ضع زراً كبيراً يسمى "تأكيد الدفع (Escrow Trigger)" يقوم بإرسال طلب POST وهمي إلى /api/payments/paymob/webhook ببيانات الدفع.
5. اعرض حالة الدفع (قيد الانتظار / ناجح).
هام جداً: قم بإرجاع الكود البرمجي فقط (بدون علامات الماركداون أو أي نصوص أخرى).
"""

print("🧠 جاري الاتصال بـ Gemini لبناء الصفحة...")

base_url = "https://" + "generativelanguage.googleapis.com"
endpoint = "/v1beta/models/gemini-1.5-pro-latest:generateContent?key="
url = base_url + endpoint + API_KEY

data = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"temperature": 0.2}
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req)
    result = json.loads(response.read().decode('utf-8'))
    code = result['candidates'][0]['content']['parts'][0]['text']
    
    if code.startswith("```"):
        code = "\n".join(code.split("\n")[1:-1])
        
    os.makedirs('src/app/checkout/simulator', exist_ok=True)
    with open('src/app/checkout/simulator/page.tsx', 'w', encoding='utf-8') as f:
        f.write(code)
        
    print("✅ تم بناء صفحة المحاكي بنجاح في: src/app/checkout/simulator/page.tsx")
except Exception as e:
    print(f"❌ حدث خطأ أثناء التوليد: {e}")
