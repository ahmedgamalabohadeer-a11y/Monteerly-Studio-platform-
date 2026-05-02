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
      // 2. تفعيل عقد الضمان وتحويل الحالة (Escrow Trigger)
      await supabase.from('orders').update({ status: 'in_progress', payment_secured: true }).eq('id', orderId);
      await logAuditEvent({ actorIdentifier: 'PAYMOB', action: 'PAYMENT_SECURED', module: 'FINANCE', entityId: orderId, snapshot: { amount: data.obj.amount_cents / 100 }});
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
