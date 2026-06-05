import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

interface EmailVerificationRequest {
  email: string;
  actionCode: string;
}

interface EmailVerificationResponse {
  success: boolean;
  link?: string;
  error?: string;
}

export const sendEmailVerification = functions.https.onCall(
  async (
    data: EmailVerificationRequest,
    context: functions.https.CallableContext
  ): Promise<EmailVerificationResponse> => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    const { email, actionCode } = data;

    if (!email) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email is required"
      );
    }

    try {
      const appUrl = process.env.APP_URL || "http://localhost:3000";
      const verificationLink = `${appUrl}/auth/verify?code=${actionCode}&email=${email}`;

      // توليد رابط التحقق من Firebase
      const result = await admin.auth().generateEmailVerificationLink(email);
      console.log(`✅ Email verification link generated for: ${email}`, result);

      return {
        success: true,
        link: verificationLink,
      };
    } catch (error) {
      console.error("Error generating verification link:", error);

      throw new functions.https.HttpsError(
        "internal",
        "Failed to generate verification link"
      );
    }
  }
);
