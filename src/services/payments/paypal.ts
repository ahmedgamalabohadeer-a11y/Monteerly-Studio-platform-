import { prisma } from '@/lib/prisma';

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

export const PayPalService = {
  async authenticate() {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
  },

  async createOrder(amountUSD: number, projectId: string) {
    const accessToken = await this.authenticate();
    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: { currency_code: 'USD', value: amountUSD.toFixed(2) }
        }]
      })
    });

    const orderData = await response.json();

    await prisma.financial_transactions.create({
      data: {
        gateway_transaction_id: orderData.id,
        gateway_type: 'PAYPAL',
        amount_gross: amountUSD,
        amount_net: amountUSD * 0.98,
        platform_fee: amountUSD * 0.02,
        status: 'PENDING',
        projects: { connect: { id: projectId } }
      }
    });

    const approveUrl = orderData.links.find((link: any) => link.rel === 'approve')?.href;
    return { orderId: orderData.id, approveUrl };
  }
};
