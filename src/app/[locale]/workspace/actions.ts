'use server'

import { supabase } from '@/lib/supabase';
import { getR2UploadUrl } from '@/lib/storage';
import { logAuditEvent } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

/**
 * الحصول على تذكرة رفع (Presigned URL) لرفع الفيديو مباشرة لـ R2
 */
export async function getUploadTicket(orderId: string, fileName: string, fileType: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('غير مصرح لك');

  // إنشاء مسار فريد للملف: orders/ID/timestamp_filename
  const path = `orders/${orderId}/${Date.now()}_${fileName}`;
  
  const ticket = await getR2UploadUrl(path, fileType);

  await logAuditEvent({
    actorIdentifier: `freelancer:${user.user.id}`,
    action: 'requested_upload_ticket',
    module: 'storage',
    entityId: orderId
  });

  return { uploadUrl: ticket.uploadUrl, publicUrl: ticket.publicUrl, path };
}

/**
 * تحديث الطلب برابط التسليم النهائي بعد نجاح الرفع
 */
export async function finalizeDelivery(orderId: string, publicUrl: string, notes: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('غير مصرح لك');

  const { error } = await supabase.from('orders').update({
    status: 'review_pending',
    delivery_url: publicUrl,
    delivery_notes: notes,
    delivered_at: new Date().toISOString()
  }).eq('id', orderId);

  if (error) throw error;

  revalidatePath('/[locale]/workspace');
  return { success: true };
}
