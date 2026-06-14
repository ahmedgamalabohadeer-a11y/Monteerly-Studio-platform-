import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { projectId, amount } = await req.json();

    // المفاتيح البيئية الخاصة بـ Paymob (يتم إضافتها لاحقاً في .env.local)
    const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY || 'dummy_api_key';
    const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID || 'dummy_integration_id';
    const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID || 'dummy_iframe_id';

    // 1. التوثيق المبدئي (Authentication Request)
    const authRes = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    });
    const authData = await authRes.json();
    const token = authData.token;

    if (!token) throw new Error("فشل مصادقة Paymob");

    // 2. تسجيل الطلب (Order Registration API)
    const orderRes = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: "false",
        amount_cents: amount * 100, // Paymob يتعامل بالقروش
        currency: "EGP",
        merchant_order_id: `${projectId}_${Date.now()}`, // ربط المعاملة برقم المشروع
        items: [] // يمكن إضافة تفاصيل المشروع هنا
      })
    });
    const orderData = await orderRes.json();
    const orderId = orderData.id;

    // 3. استخراج مفتاح الدفع (Payment Key Request)
    const paymentKeyRes = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600, // المفتاح صالح لمدة ساعة
        order_id: orderId,
        billing_data: {
          apartment: "NA", email: "client@monteerly.com", floor: "NA", first_name: "Client",
          street: "NA", building: "NA", phone_number: "+201000000000", shipping_method: "NA",
          postal_code: "NA", city: "NA", country: "EG", last_name: "Monteerly", state: "NA"
        },
        currency: "EGP",
        integration_id: PAYMOB_INTEGRATION_ID
      })
    });
    const paymentKeyData = await paymentKeyRes.json();
    const paymentToken = paymentKeyData.token;

    // 4. بناء رابط التوجيه الآمن (Secure Redirect URL)
    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;

    return NextResponse.json({ redirectUrl }, { status: 200 });

  } catch (error: any) {
    console.error("Paymob Checkout Error:", error);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء رابط الدفع السيادي' }, { status: 500 });
  }
}
