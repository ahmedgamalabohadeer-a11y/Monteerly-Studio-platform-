'use server'

import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';

export async function getWalletBalances() {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('تصريح أمني مفقود');

  // جلب كافة الأموال المرتبطة بهذا المبدع من محرك الضمان
  const { data: escrowData, error } = await supabase
    .from('escrow_accounts')
    .select('amount, status')
    .eq('freelancer_id', user.user.id);

  if (error) throw error;

  let escrowed = 0; // في حساب الضمان (held)
  let liquidity = 0; // السيولة المتاحة (released)

  escrowData?.forEach(record => {
    if (record.status === 'held' || record.status === 'disputed') {
      escrowed += record.amount;
    } else if (record.status === 'released') {
      liquidity += record.amount;
    }
  });

  return { escrowed, liquidity };
}

export async function requestWithdrawal(amount: number) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('تصريح أمني مفقود');

  // في نظام MCOS، يتم تحويل طلب السحب إلى "تذكرة مالية" للمدير التنفيذي
  await logAuditEvent({
    actorIdentifier: `freelancer:${user.user.id}`,
    action: 'withdrawal_requested',
    module: 'finance',
    snapshot: { requested_amount: amount, timestamp: new Date().toISOString() }
  });

  return { success: true, message: "تم إصدار مطالبة مالية رسمية. جاري المعالجة." };
}
