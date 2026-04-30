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
    timestamp: Math.floor(timestamp), // تخزين الثواني كأرقام صحيحة
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
