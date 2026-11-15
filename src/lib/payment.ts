export type PaymentGateway = 'paymob' | 'paypal';

export async function createPaymentSession(gateway: PaymentGateway, amount: number, orderId: string) {
  if (!orderId.trim()) {
    throw new Error('Order ID is required to create a payment session.');
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Payment amount must be a positive number.');
  }

  if (gateway === 'paymob') {
    // منطق الربط مع Paymob (Visa, Wallet, Fawry)
    return { success: true, url: 'https://paymob.com/api/checkout/...' };
  }

  // منطق الربط مع PayPal للعملاء الدوليين
  return { success: true, url: 'https://paypal.com/checkout/...' };
}
