import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.obj) return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });

    const orderId = body.obj.order.id.toString();
    const success = body.obj.success;

    if (success) {
      await prisma.financial_transactions.updateMany({
        where: { gateway_transaction_id: orderId, gateway_type: 'PAYMOB' },
        data: { status: 'COMPLETED' }
      });
      console.log(`[Webhook] ⍅ Paymob Order ${orderId} COMPLETED.`);
    } else {
      await prisma.financial_transactions.updateMany({
        where: { gateway_transaction_id: orderId, gateway_type: 'PAYMOB' },
        data: { status: 'FAILED' }
      });
      console.log(`[Webhook] ❏ Paymob Order ${orderId} FAILED.`);
    }

    return NextResponse.json({ message: 'Callback received' }, { status: 200 });
  } catch (error) {
    console.error('[Paymob Webaook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}