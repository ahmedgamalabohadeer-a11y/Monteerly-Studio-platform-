'use server'

import { supabase } from '@/lib/supabase';
import { logAuditEvent } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

/**
 * جلب جميع المطالبات المالية المعلقة والنزاعات
 */
export async function getExecutiveOverview() {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('تصريح أمني مفقود: وصول مقيد');

  // جلب سجلات التدقيق الخاصة بطلبات السحب (المطالبات المالية)
  const { data: withdrawalRequests } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('action', 'withdrawal_requested')
    .order('created_at', { ascending: false })
    .limit(10);

  // جلب العقود المتنازع عليها
  const { data: disputes } = await supabase
    .from('contracts')
    .select('id, order_id, client_id, freelancer_id, metadata')
    .eq('status', 'disputed');

  return { withdrawalRequests, disputes };
}

/**
 * اعتماد مطالبة مالية وتحرير السيولة
 */
export async function approveWithdrawal(logId: string, freelancerId: string, amount: number) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('تصريح أمني مفقود: وصول مقيد');

  // تحديث حالة السجل إلى معتمد (Approved)
  await supabase
    .from('audit_logs')
    .update({ action: 'withdrawal_approved', snapshot: { approved_by: user.user.id, amount } })
    .eq('id', logId);

  // تحديث محرك الضمان (خصم السيولة المتاحة)
  // ملاحظة: يتطلب هذا إجراء معاملة بنكية فعلية (Paymob/PayPal) في المرحلة القادمة
  
  await logAuditEvent({
    actorIdentifier: `admin:${user.user.id}`,
    action: 'liquidity_released',
    module: 'finance',
    entityId: freelancerId,
    snapshot: { amount_released: amount }
  });

  revalidatePath('/[locale]/admin');
  return { success: true };
}
