"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPaymobPayment = void 0;
const functions = __importStar(require("firebase-functions"));
class PaymobProcessor {
    constructor() {
        this.baseUrl = "https://accept.paymob.com/api";
        this.apiKey = process.env.PAYMOB_SECRET_KEY;
    }
    async authenticate() {
        const response = await fetch(`${this.baseUrl}/auth/tokens`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api_key: this.apiKey }),
        });
        const data = await response.json();
        return data.token;
    }
    async createOrder(authToken, amount, orderId) {
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
    async createPaymentKey(authToken, orderId, amount, email, phone) {
        const response = await fetch(`${this.baseUrl}/acceptance/payment_keys`, {
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
        });
        const data = await response.json();
        return data.token;
    }
}
const processor = new PaymobProcessor();
exports.processPaymobPayment = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
    }
    const { amount, orderId, email, phone } = data;
    try {
        const authToken = await processor.authenticate();
        const order = await processor.createOrder(authToken, amount, orderId);
        const paymentKey = await processor.createPaymentKey(authToken, order, amount, email, phone);
        const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
        return {
            success: true,
            paymentKey,
            iframeUrl,
        };
    }
    catch (error) {
        console.error("Paymob processing error:", error);
        throw new functions.https.HttpsError("internal", "Payment processing failed");
    }
});
//# sourceMappingURL=paymob-processor.js.map