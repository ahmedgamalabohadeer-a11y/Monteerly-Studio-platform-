// مسار استقبال إشعارات الدفع من PayPal (للعملاء الدوليين)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({ received: true, gateway: 'paypal_secure' }, { status: 200 });
}
