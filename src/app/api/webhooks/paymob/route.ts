import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // نستخدم Admin Client للعمليات المالية الخلفية
import { logAuditEvent } from '@/lib/audit';

// يتم جلب المفتاح من ملف البيئة، مع توفير قيمة افتراضية للبيئة التطويرية
const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET || 'YOUR_PAYMOB_HMAC_HERE';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const hmacHeader = req.headers.get('hmac');

    // 1. التحقق من وجود توقيع Paymob
    if (!hmacHeader) {
      console.error("مرفوض: لا يوجد توقيع HMAC");
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    // 2. التحقق الجنائي من مصدر البيانات (Security & Compliance)
    const calculatedHmac = crypto.createHmac('sha512', PAYMOB_HMAC_SECRET).update(bodyText).digest('hex');
    if (calculatedHmac !== hmacHeader) {
      console.error("مرفوض: توقيع HMAC غير متطابق (محاولة تلاعب مالي)");
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 403 });
    }

    // 3. تحليل بيانات الدفع بعد التأكد من سلامتها
    const data = JSON.parse(bodyText);
    const orderId = data.obj.order.merchant_order_id; // رقم المشروع أو الطلب في منصتك
    const amountPaidCents = data.obj.amount_cents;
    const isSuccess = data.obj.success;

    if (isSuccess) {
      // 4. أتمتة حساب الضمان (Escrow) والعمليات
      // - تحديث حالة المشروع
      await supabaseAdmin.from('jobs').update({ status: 'in_progress', escrow_secured: true }).eq('id', orderId);
      
      // - تسجيل المعاملة المالية في سجل المعاملات
      await supabaseAdmin.from('transactions').insert({
        reference_id: data.obj.id.toString(),
        job_id: orderId,
        amount: amountPaidCents / 100, // تحويل القروش إلى دولارات/جنيهات
        status: 'completed',
        type: 'escrow_deposit'
      });

      // - توثيق الحدث في سجل التدقيق (Audit Log) للحوكمة
      await logAuditEvent({
        actorIdentifier: 'system:paymob_webhook',
        action: 'escrow_funded',
        module: 'finance',
        entityId: orderId,
        snapshot: { transaction_id: data.obj.id, amount: amountPaidCents / 100 }
      });

      console.log(`✅ تم تأمين مبلغ ${amountPaidCents / 100} في حساب الضمان للمشروع ${orderId}`);
    } else {
      console.log(`❌ فشل عملية الدفع للمشروع ${orderId}`);
    }

    // 5. الرد على Paymob بنجاح الاستلام لتجنب إعادة الإرسال (Idempotency)
    return NextResponse.json({ success: true, received: true });

  } catch (error) {
    console.error("خطأ داخلي في Webhook الدفع:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
