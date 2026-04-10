import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { sendEmailVerification } from "./auth/email-verification";
import { processPaymobPayment } from "./payment/paymob-processor";

// Initialize Firebase Admin
admin.initializeApp();

// Export Cloud Functions
export { sendEmailVerification, processPaymobPayment };

// Health Check Function
export const healthCheck = functions.https.onRequest((req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});
