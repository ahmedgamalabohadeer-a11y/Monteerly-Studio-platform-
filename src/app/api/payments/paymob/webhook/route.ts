import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // استقبال الرد من Paymob (أو المحاكاة)
    const data = await request.json();
    
    // ====================================================================
    // محاكاة التدقيق المحاسبي وتحديث قواعد البيانات
    // ====================================================================
    console.log("[WEBHOOK RECEIVED] Paymob Transaction Update:", data);

    // في بيئة الإنتاج الحقيقية، هنا نقوم بـ:
    // 1. التحقق من التوقيع الرقمي (HMAC) لضمان أن الطلب قادم من Paymob فعلاً.
    // 2. تحديث جدول transactions -> status = 'succeeded'
    // 3. تحديث جدول projects -> escrow_status = 'funded'

    const isSuccess = data.success === true;

    if (isSuccess) {
      console.log(`[ESCROW UPDATE] Transaction ${data.transaction_id} is SUCCESSFUL. Funds locked in Escrow.`);
      // TODO: Supabase DB Update Logic
    } else {
      console.log(`[ESCROW UPDATE] Transaction ${data.transaction_id} FAILED.`);
      // TODO: Supabase DB Update Logic
    }

    // يجب إرجاع 200 OK فوراً للبوابة لكي لا تقوم بإعادة إرسال الطلب
    return NextResponse.json({ received: true, status: "processed" }, { status: 200 });

  } catch (error) {
    console.error("[WEBHOOK ERROR]", error);
    return NextResponse.json({ success: false, error: "فشل معالجة الإشعار المالي" }, { status: 500 });
  }
}
