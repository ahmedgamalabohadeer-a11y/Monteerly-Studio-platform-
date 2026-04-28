'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { auditTransaction } from '@/lib/guardian';
import { logAuditEvent } from '@/lib/audit';

export async function addTransaction(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  const transaction_type = formData.get('type') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;

  const audit = auditTransaction(amount, transaction_type, category);

  // تسجيل إذا قام الحارس بحظر العملية
  if (audit.isSuspicious && audit.riskLevel === 'high') {
    await logAuditEvent({
      actorIdentifier: 'server_action:finance/addTransaction',
      action: 'blocked_transaction',
      module: 'finance',
      snapshot: { amount, transaction_type, reason: audit.reason }
    });
    return { success: false, message: audit.reason };
  }

  const { data, error } = await supabase
    .from('finance_transactions')
    .insert([{ amount, transaction_type, category, description, risk_level: audit.riskLevel }])
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
