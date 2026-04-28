/**
 * Monteerly Guardian AI - Financial Logic
 * مخصص لتدقيق العمليات المالية واكتشاف المخاطر
 */

export type AuditResult = {
  isSuspicious: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  reason?: string;
};

export function auditTransaction(amount: number, type: string, category: string): AuditResult {
  // 1. قاعدة المبالغ الضخمة (مثال: أكبر من 10,000 وحدة نقدية)
  if (amount > 10000) {
    return {
      isSuspicious: true,
      riskLevel: 'high',
      reason: 'مبلغ يتجاوز حد الصلاحية التلقائي، يتطلب مراجعة المدير التنفيذي.'
    };
  }

  // 2. قاعدة غسيل الأموال أو الأخطاء (مبالغ صفرية أو سالبة)
  if (amount <= 0) {
    return {
      isSuspicious: true,
      riskLevel: 'high',
      reason: 'قيمة غير منطقية، محاولة إدخال بيانات مالية تالفة.'
    };
  }

  // 3. قاعدة التوافق (مثال: مصروفات شخصية من حساب الشركة)
  const highRiskCategories = ['شخصي', 'نثريات غير محددة', 'تسوية'];
  if (type === 'expense' && highRiskCategories.includes(category)) {
    return {
      isSuspicious: true,
      riskLevel: 'medium',
      reason: 'تصنيف عالي المخاطر، يرجى إرفاق المستندات المؤيدة.'
    };
  }

  return { isSuspicious: false, riskLevel: 'low' };
}
