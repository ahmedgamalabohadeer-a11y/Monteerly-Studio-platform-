import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (body.event_type === 'CHECKOUT.ORDER.APPROVED' || body.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = body.resource.id; 
      
      await prisma.financial_transactions.updateMany({
        where: { gateway_transaction_id: orderId, gateway_type: 'PAYPAL' },
        data: { status: 'COMPLETED' }
      });
      console.log(`[Webhook] ⍅ PayPal Order ${orderId} COMPLETED.`);
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('[PayPal Webaook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}