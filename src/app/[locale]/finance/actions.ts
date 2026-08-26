'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { auditTransaction } from '@/lib/guardian';
import { logAuditEvent } from '@/lib/audit';

export async function addTransaction(formData: FormData) {
  const supabase = await createClient();

  // التحقق من session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return { success: false, message: 'غير مصرح - يجب تسجيل الدخول' };
  }

  // ⚠️ amount من الخادم — لا نأخذه من FormData مباشرة
  // في التطبيق الحقيقي: نحسب amount من بيانات موثقة (order, contract, etc.)
  const amountFromServer = 0; // TODO: استبدل بحساب حقيقي من الخادم
  
  const transaction_type = formData.get('type') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;

  const audit = auditTransaction(amountFromServer, transaction_type, category);

  // تسجيل إذا قام الحارس بحظر العملية
  if (audit.isSuspicious && audit.riskLevel === 'high') {
    await logAuditEvent({
      actorIdentifier: 'server_action:finance/addTransaction',
      action: 'blocked_transaction',
      module: 'finance',
      snapshot: { amount: amountFromServer, transaction_type, reason: audit.reason }
    });
    return { success: false, message: audit.reason };
  }

  const { data, error } = await supabase
    .from('finance_transactions')
    .insert([{ 
      user_id: session.user.id, // ⚠️ نستخدم user_id من session
      amount: amountFromServer, // ⚠️ amount من الخادم
      transaction_type, 
      category, 
      description,
      risk_level: audit.riskLevel 
    }])
    .select()
    .single();

  if (error) return { success: false };

  // تسجيل العملية المالية الناجحة
  if (data) {
    await logAuditEvent({
      actorIdentifier: 'server_action:finance/addTransaction',
      action: 'created_transaction',
      module: 'finance',
      entityId: data.id,
      snapshot: { amount: data.amount, type: data.transaction_type, risk: data.risk_level }
    });
  }

  revalidatePath('/[locale]/finance');
  return { success: true, warning: audit.isSuspicious ? audit.reason : null };
}
