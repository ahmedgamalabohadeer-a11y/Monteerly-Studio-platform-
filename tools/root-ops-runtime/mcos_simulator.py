import hmac
import hashlib
import json
import requests
import time

# --- إعدادات المحاكاة السيادية ---
WEBHOOK_URL = "http://localhost:3000/api/payments/paymob/webhook"
HMAC_SECRET = "secret_mcos_key"
ORDER_ID = "JOB-SIM-2026-001"
AMOUNT_CENTS = 500000

def run_simulation():
    print("🚀 بدء محاكاة الرحلة السيادية لـ Monteerly Studio...")
    
    payload = {
        "obj": {
            "success": True,
            "amount_cents": AMOUNT_CENTS,
            "order": {
                "merchant_order_id": ORDER_ID
            }
        }
    }
    body = json.dumps(payload, separators=(',', ':'))
    
    signature = hmac.new(
        HMAC_SECRET.encode('utf-8'),
        body.encode('utf-8'),
        hashlib.sha512
    ).hexdigest()

    print(f"📦 تم تجهيز الحمولة وتشفيرها بالتوقيع: {signature[:10]}...")

    headers = {
        "Content-Type": "application/json",
        "hmac": signature
    }

    try:
        print(f"📡 إرسال الطلب إلى المسار السيادي: {WEBHOOK_URL}")
        response = requests.post(WEBHOOK_URL, data=body, headers=headers)
        
        if response.status_code == 200:
            print("✅ استجابة النظام: نجاح (200 OK)")
            print("🔍 النتائج المتوقعة في قاعدة البيانات:")
            print(f"   - [ ] العقد القانوني: تم توليده وتوقيعه لطلب {ORDER_ID}")
            print(f"   - [ ] الضمان المالي: تم حجز مبلغ {AMOUNT_CENTS/100}$ في Escrow")
        else:
            print(f"❌ فشل المحاكاة: كود الخطأ {response.status_code}")
            print(f"📝 الرد: {response.text}")

    except Exception as e:
        print(f"🚨 خطأ فني أثناء المحاكاة: {str(e)}")

if __name__ == "__main__":
    run_simulation()
