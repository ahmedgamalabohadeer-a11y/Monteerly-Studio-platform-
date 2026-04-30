'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { holdFundsInEscrow } from '@/lib/escrow';

export async function createOrder(serviceId: string, freelancerId: string, price: number) {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) return { success: false, message: 'يجب تسجيل الدخول أولاً' };

  const clientId = userData.user.id;

  // 1. إنشاء الطلب
  const { data: order, error: orderError } = await supabase.from('orders').insert({
    client_id: clientId,
    service_id: serviceId,
    status: 'in_progress'
  }).select().single();

  if (orderError) return { success: false, message: 'حدث خطأ أثناء إنشاء الطلب' };

  // 2. تفعيل الضمان المالي (Escrow)
  try {
    await holdFundsInEscrow({
      orderId: order.id,
      clientId: clientId,
      freelancerId: freelancerId,
      amount: price
    });
  } catch (escrowError: any) {
    return { success: false, message: escrowError.message };
  }

  // 3. تسجيل التدقيق
  await logAuditEvent({
    actorIdentifier: `client:${clientId}`,
    action: 'created_market_order',
    module: 'market',
    entityId: order.id,
    snapshot: { serviceId, price }
  });

  revalidatePath('/[locale]/market');
  return { success: true, message: 'تم تأكيد الطلب وحجز المبلغ بنجاح!' };
}
