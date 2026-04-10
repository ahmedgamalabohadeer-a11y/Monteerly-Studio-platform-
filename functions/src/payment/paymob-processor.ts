import * as functions from "firebase-functions";

interface PaymobPaymentRequest {
  amount: number;
  orderId: string;
  email: string;
  phone: string;
}

interface PaymobPaymentResponse {
  success: boolean;
  paymentKey?: string;
  iframeUrl?: string;
  error?: string;
}

class PaymobProcessor {
  private baseUrl = "https://accept.paymob.com/api";
  private apiKey = process.env.PAYMOB_SECRET_KEY;

  async authenticate(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/auth/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: this.apiKey }),
    });

    const data = await response.json();
    return data.token;
  }

  async createOrder(
    authToken: string,
    amount: number,
    orderId: string
  ): Promise<number> {
    const response = await fetch(`${this.baseUrl}/ecommerce/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        currency: "EGP",
        amount_cents: Math.round(amount * 100),
        merchant_order_id: orderId,
      }),
    });

    const data = await response.json();
    return data.id;
  }

  async createPaymentKey(
    authToken: string,
    orderId: number,
    amount: number,
    email: string,
    phone: string
  ): Promise<string> {
    const response = await fetch(
      `${this.baseUrl}/acceptance/payment_keys`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: authToken,
          order_id: orderId,
          currency: "EGP",
          amount_cents: Math.round(amount * 100),
          expiration: 3600,
          notification_url: `${process.env.APP_URL}/api/payment/webhook`,
          billing_data: {
            apartment: "NA",
            email,
            floor: "NA",
            first_name: "Customer",
            street: "NA",
            postal_code: "NA",
            city: "Cairo",
            country: "EG",
            last_name: "Order",
            phone_number: phone,
            state: "Cairo",
          },
        }),
      }
    );

    const data = await response.json();
    return data.token;
  }
}

const processor = new PaymobProcessor();

export const processPaymobPayment = functions.https.onCall(
  async (
    data: PaymobPaymentRequest,
    context: functions.https.CallableContext
  ): Promise<PaymobPaymentResponse> => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    const { amount, orderId, email, phone } = data;

    try {
      const authToken = await processor.authenticate();
      const order = await processor.createOrder(authToken, amount, orderId);
      const paymentKey = await processor.createPaymentKey(
        authToken,
        order,
        amount,
        email,
        phone
      );

      const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${
        process.env.PAYMOB_IFRAME_ID
      }?payment_token=${paymentKey}`;

      return {
        success: true,
        paymentKey,
        iframeUrl,
      };
    } catch (error) {
      console.error("Paymob processing error:", error);

      throw new functions.https.HttpsError(
        "internal",
        "Payment processing failed"
      );
    }
  }
);
