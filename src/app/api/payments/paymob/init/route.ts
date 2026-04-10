import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, amount, paymentMethod } = body;

    // التحقق المبدئي من البيانات
    if (!projectId || !amount) {
      return NextResponse.json({ success: false, error: "بيانات المشروع أو المبلغ مفقودة" }, { status: 400 });
    }

    // ====================================================================
    // محاكاة وضع الاختبار (Test Mode) لـ Paymob
    // ====================================================================
    console.log(`[FINANCE LOG] Initiating Test Payment - Project: ${projectId}, Amount: ${amount} EGP, Method: ${paymentMethod}`);

    // محاكاة الخطوات: 1. Auth -> 2. Order -> 3. Payment Key
    const mockTransactionId = `TEST_PAYMOB_${Math.floor(Math.random() * 1000000)}`;
    const mockCheckoutUrl = `https://accept.paymob.com/api/acceptance/iframes/123456?payment_token=test_token_${mockTransactionId}`;

    // إرجاع الرابط الوهمي للواجهة الأمامية
    return NextResponse.json({
      success: true,
      transaction_id: mockTransactionId,
      checkout_url: mockCheckoutUrl,
      message: "تم إنشاء جلسة الدفع الوهمية بنجاح (Test Mode)"
    });

  } catch (error) {
    console.error("[PAYMENT ERROR]", error);
    return NextResponse.json({ success: false, error: "فشل تهيئة نظام الدفع" }, { status: 500 });
  }
}
