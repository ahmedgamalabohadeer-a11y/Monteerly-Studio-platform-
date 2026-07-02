'use server';

import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type DisputeResolutionType = 'release_to_freelancer' | 'refund_to_client';

type ResolveDisputeResult =
  | { success: true }
  | { success: false; error: string };

export async function resolveDispute(
  disputeId: string,
  contractId: string,
  resolutionType: DisputeResolutionType,
  notes: string
): Promise<ResolveDisputeResult> {
  try {
    const { error: disputeUpdateError } = await supabaseAdmin
      .from('disputes')
      .update({
        status: 'resolved',
        resolution_notes: notes,
      })
      .eq('id', disputeId);

    if (disputeUpdateError) {
      throw new Error(disputeUpdateError.message);
    }

    if (resolutionType === 'release_to_freelancer') {
      const { error: jobUpdateError } = await supabaseAdmin
        .from('jobs')
        .update({ status: 'completed' })
        .eq('id', contractId);

      if (jobUpdateError) {
        throw new Error(jobUpdateError.message);
      }

      const { error: transactionInsertError } = await supabaseAdmin
        .from('transactions')
        .insert({
          reference_id: disputeId,
          job_id: contractId,
          amount: 0,
          status: 'completed',
          type: 'escrow_released_admin',
        });

      if (transactionInsertError) {
        throw new Error(transactionInsertError.message);
      }
    } else {
      const { error: jobUpdateError } = await supabaseAdmin
        .from('jobs')
        .update({ status: 'canceled' })
        .eq('id', contractId);

      if (jobUpdateError) {
        throw new Error(jobUpdateError.message);
      }

      const { error: transactionInsertError } = await supabaseAdmin
        .from('transactions')
        .insert({
          reference_id: disputeId,
          job_id: contractId,
          amount: 0,
          status: 'completed',
          type: 'escrow_refunded_admin',
        });

      if (transactionInsertError) {
        throw new Error(transactionInsertError.message);
      }
    }

    await logAuditEvent({
      actorIdentifier: 'system:admin_arbiter',
      action: 'dispute_resolved',
      module: 'legal',
      entityId: disputeId,
      snapshot: {
        resolutionType,
        contractId,
        notes,
      },
    });

    revalidatePath('/ar/disputes');
    revalidatePath('/en/disputes');

    return { success: true };
  } catch (error: unknown) {
    console.error('Dispute Resolution Error:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'حدث خطأ أثناء تنفيذ القرار السيادي',
    };
  }
}
