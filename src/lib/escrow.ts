import { supabase } from './supabase';
import { logAuditEvent } from './audit';

type EscrowPayload = {
  orderId: string;
  clientId: string;
  freelancerId: string;
  amount: number;
};

// دالة حجز الأموال في الضمان
export async function holdFundsInEscrow(payload: EscrowPayload) {
  // 1. إنشاء سجل الضمان
  const { data, error } = await supabase.from('escrow_accounts').insert({
    order_id: payload.orderId,
    client_id: payload.clientId,
    freelancer_id: payload.freelancerId,
    amount: payload.amount,
    status: 'held',
  }).select().single();

  if (error) throw new Error('فشل في احتجاز الأموال');

  // 2. تسجيل العملية في الصندوق الأسود
  await logAuditEvent({
    actorIdentifier: `client:${payload.clientId}`,
    action: 'escrow_funds_held',
    module: 'finance',
    entityId: data.id,
    snapshot: { amount: payload.amount, order_id: payload.orderId }
  });

  return data;
}
