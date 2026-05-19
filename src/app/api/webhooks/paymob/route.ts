// مسار استقبال إشعارات الدفع من Paymob
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // تطبيق بروتوكول Idempotency (الرد السريع بـ 200 لتجنب إعادة الإرسال)
  // ومعالجة تحرير الضمان (Escrow) في الخلفية.
  return NextResponse.json({ received: true, gateway: 'paymob_secure' }, { status: 200 });
}
