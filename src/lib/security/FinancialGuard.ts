import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';

/**
 * 🛡️ FinancialGuard (القبة الحديدية المالية)
 * يمنع التلاعب بالأسعار من المتصفح ويتأكد من تطابق المبالغ مع قواعد البيانات.
 */
export class FinancialGuard {
  
  // التحقق من صحة مبلغ الدفع قبل إرساله للبوابة (Paymob/Stripe)
  static async validateTransaction(orderId: string, clientRequestedAmount: number) {
    // 1. جلب السعر الفعلي من قاعدة البيانات المعزولة
    const { data: order, error } = await supabase
      .from('orders')
      .select('agreed_price, status, client_id')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      await this.flagHackAttempt('DB_FETCH_ERROR_OR_NOT_FOUND', orderId);
      throw new Error('SEC_ERR_01: لا يمكن الوصول لبيانات المعاملة.');
    }

    // 2. مطابقة المبلغ (يمنع المتصفح من إرسال مبلغ أقل للـ API)
    if (order.agreed_price !== clientRequestedAmount) {
      await this.flagHackAttempt('PRICE_SPOOFING_ATTEMPT', orderId, {
        db_price: order.agreed_price,
        client_price: clientRequestedAmount
      });
      throw new Error('SEC_ERR_02: محاولة تلاعب بالأسعار محظورة.');
    }

    // 3. منع الدفع المزدوج
    if (order.status !== 'pending_payment') {
      throw new Error('SEC_ERR_03: حالة الطلب لا تسمح بدفع جديد.');
    }

    return true; // المعاملة نظيفة
  }

  // تسجيل محاولات الاختراق لإغلاق حساب العميل فوراً
  private static async flagHackAttempt(reason: string, entityId: string, metadata: unknown = {}) {
    console.error(`🚨 FINANCIAL SECURITY ALERT: ${reason} on ${entityId}`);
    await logAuditEvent({
      actorIdentifier: 'SYSTEM_GUARD',
      action: 'FINANCIAL_HACK_BLOCKED',
      module: 'FINANCE_SECURITY',
      entityId: entityId,
      snapshot: { reason, ...metadata, timestamp: new Date().toISOString() }
    });
  }
}
