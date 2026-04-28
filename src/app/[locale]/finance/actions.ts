'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { auditTransaction } from '@/lib/guardian';

export async function addTransaction(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  const transaction_type = formData.get('type') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;

  // 🛡️ استدعاء الحارس الذكي للتدقيق قبل الحفظ
  const audit = auditTransaction(amount, transaction_type, category);

  if (audit.isSuspicious && audit.riskLevel === 'high') {
    console.error(`🚨 Guardian Blocked: ${audit.reason}`);
    return { success: false, message: audit.reason };
  }

  const { error } = await supabase
    .from('finance_transactions')
    .insert([{ 
      amount, 
      transaction_type, 
      category, 
      description,
      risk_level: audit.riskLevel // تخزين مستوى المخاطرة للتقارير
    }]);

  if (error) {
    console.error('❌ عطل مالي:', error.message);
    return { success: false };
  }

  revalidatePath('/[locale]/finance');
  return { success: true, warning: audit.isSuspicious ? audit.reason : null };
}
