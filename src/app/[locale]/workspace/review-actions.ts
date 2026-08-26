'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

type OrderAccess = {
  client_id: string;
  freelancer_id: string | null;
};

async function requireOrderAccess(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  orderId: string
) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('client_id, freelancer_id')
    .eq('id', orderId)
    .single<OrderAccess>();

  if (
    error ||
    !order ||
    (order.client_id !== userId && order.freelancer_id !== userId)
  ) {
    throw new Error('لا تملك صلاحية الوصول إلى هذا الطلب');
  }

  return order;
}

/**
 * إضافة تعليق زمني مرتبط بلحظة محددة في الفيديو
 */
export async function addTimecodedComment(orderId: string, timestamp: number, content: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك بالوصول');
  await requireOrderAccess(supabase, user.id, orderId);

  if (!Number.isFinite(timestamp) || timestamp < 0 || !content.trim() || content.length > 5000) {
    throw new Error('بيانات التعليق غير صالحة');
  }

  const { error } = await supabase.from('order_comments').insert({
    order_id: orderId,
    user_id: user.id,
    content: content.trim(),
    timestamp: Math.floor(timestamp),
    is_internal: false
  });

  if (error) throw error;

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'added_timecoded_comment',
    module: 'workspace',
    entityId: orderId,
    snapshot: { timestamp, contentLength: content.length }
  });

  revalidatePath('/[locale]/workspace');
  return { success: true };
}

/**
 * جلب جميع التعليقات الخاصة بالمشروع
 */
export async function getOrderComments(orderId: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك بالوصول');
  await requireOrderAccess(supabase, user.id, orderId);

  const { data, error } = await supabase
    .from('order_comments')
    .select('*')
    .eq('order_id', orderId)
    .order('timestamp', { ascending: true });

  if (error) return [];
  return data;
}

/**
 * اعتماد العمل وتحرير الضمان المالي
 */
export async function approveDelivery(orderId: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك بالوصول');
  const order = await requireOrderAccess(supabase, user.id, orderId);
  if (order.client_id !== user.id) throw new Error('العميل صاحب الطلب فقط يمكنه اعتماد التسليم');


  // 1. تحديث حالة الطلب
  await supabase
    .from('orders')
    .update({ status: 'completed' })
    .eq('id', orderId);
  
  // 2. تسجيل الحدث
  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'approved_delivery',
    module: 'workspace',
    entityId: orderId,
    snapshot: { status: 'completed' }
  });

  revalidatePath('/[locale]/workspace');
  return { success: true };
}

/**
 * رفض العمل وتحويله لمركز النزاعات
 */
export async function disputeDelivery(orderId: string, reason: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك بالوصول');
  await requireOrderAccess(supabase, user.id, orderId);
  const normalizedReason = reason.trim();
  if (!normalizedReason || normalizedReason.length > 2000) throw new Error('سبب النزاع غير صالح');


  // 1. إدراج النزاع في جدول النزاعات
  await supabase.from('disputes').insert({
    contract_id: orderId, // بافتراض أن orderId هو نفسه رقم العقد
    reason: normalizedReason,
    status: 'pending'
  });

  // 2. تحديث حالة الطلب
  await supabase.from('orders').update({ status: 'disputed' }).eq('id', orderId);

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'opened_dispute',
    module: 'workspace',
    entityId: orderId,
    snapshot: { reason: normalizedReason }
  });

  revalidatePath('/[locale]/workspace');
  return { success: true };
}
