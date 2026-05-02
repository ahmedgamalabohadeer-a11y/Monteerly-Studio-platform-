/**
 * 💰 MCOS Sovereign Revenue Engine v1.0
 * محرك حساب العوائد، الضرائب، وعمولات المنصة بدقة عالية لمنع أي تسرب مالي.
 */

export type SubscriptionTier = 'rookie' | 'pro' | 'studio';

export interface RevenueBreakdown {
  originalAmount: number;
  platformFeePercentage: number;
  platformFeeAmount: number;
  vatTaxAmount: number; // 14% ضريبة على عمولة المنصة
  freelancerNet: number;
  escrowAmount: number;
}

export class RevenueEngine {
  // تحديد نسبة العمولة بناءً على الباقة (من الدستور المرجعي)
  private static getCommissionRate(tier: SubscriptionTier): number {
    switch (tier) {
      case 'rookie': return 0.15; // 15%
      case 'pro': return 0.10;    // 10%
      case 'studio': return 0.05; // 5%
      default: return 0.15;
    }
  }

  /**
   * حساب التوزيع المالي الدقيق للصفقة
   * @param amount إجمالي قيمة العقد المدفوعة من العميل
   * @param tier باقة المونتير الحالية
   */
  static calculateSplit(amount: number, tier: SubscriptionTier = 'rookie'): RevenueBreakdown {
    const commissionRate = this.getCommissionRate(tier);
    
    // 1. حساب عمولة المنصة
    const platformFeeAmount = amount * commissionRate;
    
    // 2. حساب ضريبة القيمة المضافة (14% على رسوم المنصة فقط، وليس على إجمالي المبلغ)
    const vatTaxAmount = platformFeeAmount * 0.14;
    
    // 3. حساب الصافي للمونتير
    const freelancerNet = amount - platformFeeAmount - vatTaxAmount;

    return {
      originalAmount: Number(amount.toFixed(2)),
      platformFeePercentage: commissionRate * 100,
      platformFeeAmount: Number(platformFeeAmount.toFixed(2)),
      vatTaxAmount: Number(vatTaxAmount.toFixed(2)),
      freelancerNet: Number(freelancerNet.toFixed(2)),
      escrowAmount: Number(amount.toFixed(2)) // المبلغ الكامل الذي سيتم احتجازه في الضمان
    };
  }
}
