'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function resolveDispute(disputeId: string, contractId: string, resolutionType: 'release_to_freelancer' | 'refund_to_client', notes: string) {
  try {
    // 1. تحديث حالة النزاع
    await supabaseAdmin.from('disputes').update({ 
      status: 'resolved',
      resolution_notes: notes 
    }).eq('id', disputeId);

    // 2. اتخاذ القرار المالي وتحديث العقد/المشروع
    if (resolutionType === 'release_to_freelancer') {
      await supabaseAdmin.from('jobs').update({ status: 'completed' }).eq('id', contractId);
      await supabaseAdmin.from('transactions').insert({
        reference_id: disputeId,
        job_id: contractId,
        amount: 0, // يتم تحديثها لاحقاً بمنطق الأرباح
        status: 'completed',
        type: 'escrow_released_admin'
      });
    } else {
      await supabaseAdmin.from('jobs').update({ status: 'canceled' }).eq('id', contractId);
      await supabaseAdmin.from('transactions').insert({
        reference_id: disputeId,
        job_id: contractId,
        amount: 0, 
        status: 'completed',
        type: 'escrow_refunded_admin'
      });
    }

    // 3. التوثيق في سجل التدقيق المالي الجنائي (Audit Log)
    await logAuditEvent({
      actorIdentifier: 'system:admin_arbiter',
      action: 'dispute_resolved',
      module: 'legal',
      entityId: disputeId,
      snapshot: { resolutionType, contractId, notes }
    });

    revalidatePath('/[locale]/disputes');
    return { success: true };
  } catch (error) {
    console.error("Dispute Resolution Error:", error);
    return { success: false, error: 'حدث خطأ أثناء تنفيذ القرار السيادي' };
  }
}
