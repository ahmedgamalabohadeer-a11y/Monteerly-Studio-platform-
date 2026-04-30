import { supabase } from './supabase';
import { logAuditEvent } from './audit';

export type EscrowStatus = 'held' | 'released' | 'refunded' | 'disputed';

// 1. حجز الأموال (الموجودة سابقاً)
export async function holdFundsInEscrow(orderId: string, clientId: string, freelancerId: string, amount: number) {
  const { data, error } = await supabase.from('escrow_accounts').insert({
    order_id: orderId, client_id: clientId, freelancer_id: freelancerId, amount, status: 'held'
  }).select().single();
  if (error) throw error;
  await logAuditEvent({ actorIdentifier: `client:${clientId}`, action: 'escrow_held', module: 'finance', entityId: data.id });
  return data;
}

// 2. تحديث الحالة (للدعم الفني والإدارة)
export async function updateEscrowStatus(escrowId: string, status: EscrowStatus, actorId: string) {
  const { data, error } = await supabase.from('escrow_accounts').update({ status }).eq('id', escrowId).select().single();
  if (error) throw error;
  await logAuditEvent({ actorIdentifier: `admin:${actorId}`, action: `escrow_${status}`, module: 'finance', entityId: escrowId });
  return data;
}
