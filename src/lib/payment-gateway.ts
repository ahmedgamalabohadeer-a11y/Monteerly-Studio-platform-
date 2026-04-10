// 💳 PAYMENT GATEWAY (Phase 1)
// Paymob Primary + Stripe Fallback
// File: src/lib/payment-gateway.ts

export interface PaymentInitRequest {
  amount: number;
  currency: 'EGP' | 'USD';
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  escrowAccountId: string;
}

export interface PaymentResponse {
  success: boolean;
  sessionId?: string;
  redirectUrl?: string;
  error?: string;
}

// ============ PAYMOB INTEGRATION ============
export async function initPaymobPayment(req: PaymentInitRequest): Promise<PaymentResponse> {
  try {
    const paymobApiKey = process.env.PAYMOB_API_KEY;
    
    if (!paymobApiKey) {
      console.warn('[Payment] Paymob API key missing, using fallback');
      return initStripePayment(req);
    }

    // Step 1: Get Auth Token
    const authTokenRes = await fetch('https://accept.paymobsolutions.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: paymobApiKey })
    });

    const authData = await authTokenRes.json();
    if (!authData.token) throw new Error('Failed to get Paymob token');

    // Step 2: Create Order
    const orderRes = await fetch('https://accept.paymobsolutions.com/api/ecommerce/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`
      },
      body: JSON.stringify({
        amount_cents: Math.round(req.amount * 100),
        currency: req.currency,
        items: [{
          name: `Monteerly Project Payment - Escrow #${req.escrowAccountId}`,
          amount_cents: Math.round(req.amount * 100),
          quantity: 1
        }],
        shipping_data: {
          apartment: 'NA',
          email: req.email,
          floor: 'NA',
          first_name: req.firstName,
          last_name: req.lastName,
          phone_number: req.phone,
          postal_code: 'NA',
          city: 'NA',
          country: 'EG',
          state: 'NA',
          street: 'NA'
        }
      })
    });

    const orderData = await orderRes.json();
    if (!orderData.id) throw new Error('Failed to create Paymob order');

    // Step 3: Get Payment URL
    const integrationId = process.env.PAYMOB_INTEGRATION_CARD;
    const paymentUrl = `https://accept.paymobsolutions.com/api/acceptance/payment_keys`;
    
    const paymentRes = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.token}`
      },
      body: JSON.stringify({
        auth_token: authData.token,
        amount_cents: Math.round(req.amount * 100),
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          apartment: 'NA',
          email: req.email,
          floor: 'NA',
          first_name: req.firstName,
          last_name: req.lastName,
          phone_number: req.phone,
          postal_code: 'NA',
          city: 'NA',
          country: 'EG',
          state: 'NA',
          street: 'NA'
        },
        currency: req.currency,
        integration_id: integrationId,
        lock_order_when_paid: false
      })
    });

    const paymentData = await paymentRes.json();
    if (!paymentData.token) throw new Error('Failed to get payment token');

    return {
      success: true,
      sessionId: paymentData.token,
      redirectUrl: `https://accept.paymobsolutions.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentData.token}`
    };

  } catch (error: any) {
    console.error('[Payment] Paymob error:', error);
    return initStripePayment(req);
  }
}

// ============ STRIPE FALLBACK ============
export async function initStripePayment(req: PaymentInitRequest): Promise<PaymentResponse> {
  try {
    // Fallback to Stripe
    const response = await fetch('/api/v1/payments/checkout/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: req.amount,
        currency: req.currency,
        email: req.email,
        escrowAccountId: req.escrowAccountId
      })
    });

    const data = await response.json();
    return {
      success: true,
      sessionId: data.session_id,
      redirectUrl: data.checkout_url
    };
  } catch (error: any) {
    console.error('[Payment] Stripe fallback error:', error);
    return {
      success: false,
      error: 'Payment gateway unavailable'
    };
  }
}

export default { initPaymobPayment, initStripePayment };
