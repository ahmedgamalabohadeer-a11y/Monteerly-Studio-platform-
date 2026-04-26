import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount_cents, order_id, billing_data } = body;

    console.log(`[Paymob Mock] Initiating payment for Order: ${order_id} | Amount: ${amount_cents / 100} EGP`);

    // محاكاة استجابة Paymob المعقدة
    const mockToken = "mock_paymob_token_" + Math.random().toString(36).substring(2, 15);
    
    // في العالم الحقيقي، هذا الرابط يكون iframe الخاص بـ Paymob
    // حالياً سنقوم بتوجيه المستخدم لصفحة "محاكاة ناجحة" داخل منصتنا
    const mockPaymentUrl = `/checkout/simulator?token=${mockToken}&order=${order_id}&amount=${amount_cents}`;

    return NextResponse.json({ 
      success: true, 
      payment_url: mockPaymentUrl, 
      token: mockToken,
      transaction_id: `mock_txn_${Date.now()}`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Mock Payment Init Failed' }, { status: 500 });
  }
}
