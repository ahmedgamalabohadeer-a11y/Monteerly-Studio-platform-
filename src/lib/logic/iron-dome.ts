/**
 * THE IRON DOME SECURITY LOGIC (SIMULATION)
 * هذا الملف يحتوي على الخوارزميات التي ستعمل على السيرفر (Cloud Functions)
 * لحماية المنصة من التهريب والتواصل الخارجي.
 */

// 1. Communication Firewall Regex
// تكتشف الأرقام المصرية، الإيميلات، وكلمات "زووم/واتساب"
const PATTERNS = {
  PHONE_EGYPT: /(010|011|012|015|\+20)\d{8}/g,
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  FORBIDDEN_KEYWORDS: /(zoom|whatsapp|telegram|insta|dm me|call me|فون|رقمي|واتس)/yi
};

export function scanMessageContent(text: string): { safe: boolean; sanitizedText: string; warning?: string } {
  let sanitizedText = text;
  let hasViolation = false;

  // Check Phone
  if (PATTERNS.PHONE_EGYPT.test(text)) {
    sanitizedText = sanitizedText.replace(PATTERNS.PHONE_EGYPT, '[REDACTED PHONE]');
    hasViolation = true;
  }

  // Check Email
  if (PATTERNS.EMAIL.test(text)) {
    sanitizedText = sanitizedText.replace(PATTERNS.EMAIL, '[REDACTED EMAIL]');
    hasViolation = true;
  }

  // Check Keywords
  if (PATTERNS.FORBIDDEN_KEYWORDS.test(text)) {
    hasViolation = true; // We flag it, but maybe don't redact keywords to keep context, just warn.
  }

  if (hasViolation) {
    return {
      safe: false,
      sanitizedText,
      warning: "⚠️ تنبيه أمني: محاولة مشاركة معلومات اتصال خارجية قد تؤدي لتعليق حسابك."
    };
  }

  return { safe: true, sanitizedText };
}

// 2. Dynamic Watermark Generator Logic
export function generateWatermarkConfig(userId: string, ip: string) {
  // هذا الكود يستخدم لتوجيه FFmpeg في الخلفية
  return {
    text: `PREVIEW - ${userId} - ${ip}`,
    opacity: 0.3,
    fontSize: 24,
    animation: "random_movement", // X,Y changes every 3 seconds
    overlayLayer: true
  };
}

// 3. Escrow Release Logic
export function calculatePayout(projectAmount: number) {
  const PLATFORM_FEE_PERCENTAGE = 0.15; // 15%
  const fee = projectAmount * PLATFORM_FEE_PERCENTAGE;
  const netAmount = projectAmount - fee;

  return {
    total: projectAmount,
    fee: fee,
    net: netAmount,
    currency: "USD"
  };
}
