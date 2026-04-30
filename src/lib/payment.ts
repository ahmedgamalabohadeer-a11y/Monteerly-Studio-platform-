export type PaymentGateway = 'paymob' | 'paypal';
export async function createPaymentSession(gateway: PaymentGateway, amount: number, orderId: string) {
  if (gateway === 'paymob') {
    // منطق الربط مع Paymob (Visa, Wallet, Fawry)
    return { success: true, url: 'https://paymob.com/api/checkout/...' };
  } else {
    // منطق الربط مع PayPal للعملاء الدوليين
    return { success: true, url: 'https://paypal.com/checkout/...' };
  }
}
