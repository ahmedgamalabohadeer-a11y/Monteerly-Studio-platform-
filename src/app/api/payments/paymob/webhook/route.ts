import { activateSovereignAgreement } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';

const PAYMOB_HMAC = process.env.PAYMOB_HMAC_SECRET || 'secret_mcos_key';

export async function POST(req: Request) {
  try {
    const body = await req.text(); // القراءة كنص للتحقق من التوقيع (HMAC)
    const hmacHeader = req.headers.get('hmac');

    if (!hmacHeader) {
      await logAuditEvent({ actorIdentifier: 'PAYMOB', action: 'WEBHOOK_FAILED', module: 'FINANCE', entityId: 'NONE', snapshot: { reason: 'Missing HMAC' }});
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. التحقق الجنائي من التوقيع المالي (Zero-Trust Validation)
    const calculatedHmac = crypto.createHmac('sha512', PAYMOB_HMAC).update(body).digest('hex');
    
    if (calculatedHmac !== hmacHeader) {
      console.error("🚨 HACK ATTEMPT: Invalid HMAC Signature!");
      return NextResponse.json({ error: 'Signature mismatch' }, { status: 403 });
    }

    const data = JSON.parse(body);
    const orderId = data.obj.order.merchant_order_id; // استخراج رقم الطلب
    const isSuccess = data.obj.success;

    if (isSuccess) {
      // [تكامل سيادي] توليد العقد وحجز الضمان آلياً فور نجاح الدفع
      const { data: job } = await supabase.from('jobs').select('*').eq('id', orderId).single();
      if (job) {
        await activateSovereignAgreement(job.id, job.client_id, job.freelancer_id, job.budget);
      }

      // 2. تفعيل عقد الضمان وتحويل الحالة (Escrow Trigger)
      await supabase.from('jobs').update({ status: 'in_progress', escrow_secured: true }).eq('id', orderId);
      await logAuditEvent({ actorIdentifier: 'PAYMOB', action: 'PAYMENT_SECURED', module: 'FINANCE', entityId: orderId, snapshot: { amount: data.obj.amount_cents / 100 }});

      // [تكامل سيادي] 1. تسجيل المبلغ في محرك الضمان كـ (محتجز)
      if (job) {
        await supabase.from('transactions').insert({
          reference_id: orderId.toString(),
          user_id: job.client_id, // الهوية الحقيقية للعميل
          job_id: orderId,
          amount: data.obj.amount_cents / 100,
          status: 'completed',
          type: 'escrow_hold'
        });
      }

      // [تكامل سيادي] 2. إطلاق نبضة التحديث اللحظي لجميع الواجهات المالية
      supabase.channel('finance-channel').send({
        type: 'broadcast',
        event: 'escrow_locked',
        payload: { orderId: orderId, amount: data.obj.amount_cents / 100 }
      });

    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
