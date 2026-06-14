'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

/**
 * إضافة تعليق زمني مرتبط بلحظة محددة في الفيديو
 */
export async function addTimecodedComment(orderId: string, timestamp: number, content: string) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error('غير مصرح لك بالوصول');

  const { error } = await supabase.from('order_comments').insert({
    order_id: orderId,
    user_id: auth.user.id,
    content: content,
    timestamp: Math.floor(timestamp),
    is_internal: false
  });

  if (error) throw error;

  await logAuditEvent({
    actorIdentifier: `user:${auth.user.id}`,
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
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error('غير مصرح لك بالوصول');

  // 1. تحديث حالة الطلب
  await supabase.from('orders').update({ status: 'completed' }).eq('id', orderId);
  
  // 2. تسجيل الحدث
  await logAuditEvent({
    actorIdentifier: `user:${auth.user.id}`,
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
  const { data: auth } = await supabase.auth.getUser();
  if (!auth?.user) throw new Error('غير مصرح لك بالوصول');

  // 1. إدراج النزاع في جدول النزاعات
  await supabase.from('disputes').insert({
    contract_id: orderId, // بافتراض أن orderId هو نفسه رقم العقد
    reason: reason,
    status: 'pending'
  });

  // 2. تحديث حالة الطلب
  await supabase.from('orders').update({ status: 'disputed' }).eq('id', orderId);

  await logAuditEvent({
    actorIdentifier: `user:${auth.user.id}`,
    action: 'opened_dispute',
    module: 'workspace',
    entityId: orderId,
    snapshot: { reason }
  });

  revalidatePath('/[locale]/workspace');
  return { success: true };
}
