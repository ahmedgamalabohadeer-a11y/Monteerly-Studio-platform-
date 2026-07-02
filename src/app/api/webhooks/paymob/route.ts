import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. التحقق من حالة الدفع (Paymob Webhook Response)
    // عند نجاح الدفع، الحالة تكون "true" في obj.success
    const isSuccess = body.obj?.success === true;
    const orderId = body.obj?.order?.toString();
    const email = body.obj?.billing_data?.email;
    const amount = body.obj?.amount_cents / 100;

    if (isSuccess && email) {
      // 2. إرسال إشعار تأكيد إيداع الضمان عبر نظام الإيميلات الذي بنيناه
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: email,
          clientName: 'عميلنا العزيز',
          projectId: orderId,
          amount,
        }),
      });
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
