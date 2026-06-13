import { NextResponse } from 'next/server';
import { PaymobService } from '@/services/payments/paymob';
import { PayPalService } from '@/services/payments/paypal';

export async function POST(req: Request) {
  try {
    const { projectId, amount, paymentMethod } = await req.json();

    if (!projectId || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (paymentMethod === 'PAYPAL') {
      const { orderId, approveUrl } = await PayPalService.createOrder(amount, projectId);
      return NextResponse.json({ url: approveUrl, orderId });
    }

    const amountCents = Math.round(amount * 100);
    let integrationId;
    switch (paymentMethod) {
      case 'VISA_MASTER': integrationId = process.env.PAYMOB_INTEGRATION_ID_CARD; break;
      case 'FAWRY': integrationId = process.env.PAYMOB_INTEGRATION_ID_FAWRY; break;
      case 'MOBILE_WALLET': integrationId = process.env.PAYMOB_INTEGRATION_ID_WALLET; break;
      default: integrationId = process.env.PAYMOB_INTEGRATION_ID_CARD;
    }

    const authToken = await PaymobService.authenticate();
    const orderId = await PaymobService.createOrder(authToken, amountCents, projectId);
    const paymentToken = await PaymobService.getPaymentKey(authToken, orderId, amountCents, Number(integrationId));

    const paymobUrl = `https://egypt.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
    return NextResponse.json({ url: paymobUrl, orderId });

  } catch (error: unknown) {
    console.error('[Checkout API Error]:', error);
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Payment Initialization Failed', details }, { status: 500 });
  }
}
