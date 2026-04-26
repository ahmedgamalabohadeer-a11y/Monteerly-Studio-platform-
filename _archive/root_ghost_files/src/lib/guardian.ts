/**
 * نظام Guardian المحدث
 * يعتمد الآن على التحقق من السيرفر (Server-Side Validation)
 * لضمان أمان حقيقي بدلاً من الاعتماد على regex محلي فقط.
 */

export interface GuardianResult {
  isValid: boolean;
  error?: string;
}

export const Guardian = {
  // فحص النص عبر الـ API
  async validateText(text: string): Promise<GuardianResult> {
    try {
      const response = await fetch('/api/guardian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!data.safe) {
        return { isValid: false, error: data.message || 'محتوى غير مسموح به' };
      }

      return { isValid: true };
    } catch (error) {
      console.error('Guardian Check Failed:', error);
      // في حالة فشل الاتصال، نمنع النشر احتياطياً أو نسمح به حسب السياسة
      return { isValid: false, error: 'فشل الاتصال بنظام الحماية' };
    }
  },

  // (اختياري) فحص سريع محلي لتوفير وقت السيرفر للأشياء الواضحة جداً
  preCheck(text: string): boolean {
    const BASIC_FILTER = /<script|javascript:/i; // منع XSS بدائي
    return !BASIC_FILTER.test(text);
  }
};

################################################################################