'use server'

import { createClient } from '@/lib/supabase/server';
import { getR2UploadUrl } from '@/lib/storage';
import { logAuditEvent } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

type WorkspaceOrder = {
  client_id: string;
  freelancer_id: string | null;
};

async function requireWorkspaceOrder(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  orderId: string
) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('client_id, freelancer_id')
    .eq('id', orderId)
    .single<WorkspaceOrder>();

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
 * الحصول على تذكرة رفع (Presigned URL) لرفع الفيديو مباشرة لـ R2
 */
export async function getUploadTicket(orderId: string, fileName: string, fileType: string) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك');
  const order = await requireWorkspaceOrder(supabase, user.id, orderId);
  if (order.freelancer_id !== user.id) throw new Error('المستقل المكلّف فقط يمكنه رفع التسليم');

  const normalizedName = fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(-180);
  const allowedType = ['video/', 'audio/', 'image/'].some((prefix) => fileType.startsWith(prefix));
  if (!normalizedName || !allowedType) throw new Error('نوع الملف أو اسمه غير صالح');

  // إنشاء مسار خادمي لا يقبل مساراً يحدده العميل
  const path = `orders/${orderId}/${Date.now()}_${normalizedName}`;
  
  const ticket = await getR2UploadUrl(path, fileType);

  await logAuditEvent({
    actorIdentifier: `freelancer:${user.id}`,
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
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error('غير مصرح لك');
  const order = await requireWorkspaceOrder(supabase, user.id, orderId);
  if (order.freelancer_id !== user.id) throw new Error('المستقل المكلّف فقط يمكنه إنهاء التسليم');

  const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN?.replace(/\/$/, '');
  const expectedPrefix = publicDomain ? `${publicDomain}/orders/${orderId}/` : '';
  if (!expectedPrefix || !publicUrl.startsWith(expectedPrefix)) throw new Error('رابط التسليم غير موثوق');
  const normalizedNotes = notes.trim().slice(0, 5000);


  const { error } = await supabase.from('orders').update({
    status: 'review_pending',
    delivery_url: publicUrl,
    delivery_notes: normalizedNotes,
    delivered_at: new Date().toISOString()
  }).eq('id', orderId);

  if (error) throw error;

  revalidatePath('/[locale]/workspace');
  return { success: true };
}
