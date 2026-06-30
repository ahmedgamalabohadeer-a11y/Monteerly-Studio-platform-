'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { holdFundsInEscrow } from '@/lib/escrow';
import { generateContract } from '@/lib/contracts';

export async function createOrder(serviceId: string, freelancerId: string, price: number) {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) return { success: false, message: 'يجب تسجيل الدخول أولاً' };

  const clientId = userData.user.id;

  const { data: order, error: orderError } = await supabase.from('orders').insert({
    client_id: clientId,
    service_id: serviceId,
    status: 'in_progress'
  }).select().single();

  if (orderError) return { success: false, message: 'حدث خطأ أثناء إنشاء الطلب' };

  try {
    await holdFundsInEscrow(order.id, clientId, freelancerId, price);
    await generateContract(order.id, clientId, freelancerId, price);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل إكمال الإجراءات المالية والقانونية';
    console.error('Operation Error:', message);
    return { success: false, message };
  }

  await logAuditEvent({
    actorIdentifier: `client:${clientId}`,
    action: 'order_with_contract_created',
    module: 'market',
    entityId: order.id
  });

  revalidatePath('/[locale]/market');
  revalidatePath('/[locale]/workspace');
  return { success: true, message: 'تم إنشاء الطلب، حجز المبلغ، وتوقيع العقد بنجاح!' };
}
