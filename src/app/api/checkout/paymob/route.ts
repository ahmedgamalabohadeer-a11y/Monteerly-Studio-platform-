import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { projectId, amount } = await req.json();

    const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY || 'dummy_api_key';
    const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID || 'dummy_integration_id';
    const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID || 'dummy_iframe_id';

    const authRes = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    });
    const authData = await authRes.json();
    const token = authData.token;

    if (!token) throw new Error('فشل مصادقة Paymob');

    const orderRes = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: 'false',
        amount_cents: amount * 100,
        currency: 'EGP',
        merchant_order_id: `${projectId}_${Date.now()}`,
        items: []
      })
    });
    const orderData = await orderRes.json();
    const orderId = orderData.id;

    const paymentKeyRes = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: 'NA', email: 'client@monteerly.com', floor: 'NA', first_name: 'Client',
          street: 'NA', building: 'NA', phone_number: '+201000000000', shipping_method: 'NA',
          postal_code: 'NA', city: 'NA', country: 'EG', last_name: 'Monteerly', state: 'NA'
        },
        currency: 'EGP',
        integration_id: PAYMOB_INTEGRATION_ID
      })
    });
    const paymentKeyData = await paymentKeyRes.json();
    const paymentToken = paymentKeyData.token;

    const redirectUrl = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;

    return NextResponse.json({ redirectUrl }, { status: 200 });
  } catch (error: unknown) {
    console.error('Paymob Checkout Error:', error);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء رابط الدفع السيادي' }, { status: 500 });
  }
}
