'use server'

import { supabase } from '@/lib/supabase';
import { updateEscrowStatus } from '@/lib/escrow';
import { notifyUser } from '@/lib/notifications';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

// 1. المونتير يسلم العمل
export async function submitWork(orderId: string, clientId: string, fileUrl: string, notes: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('يجب تسجيل الدخول');

  const { error } = await supabase.from('orders').update({
    status: 'review_pending',
    delivery_url: fileUrl,
    delivery_notes: notes
  }).eq('id', orderId);

  if (error) return { success: false, message: 'حدث خطأ أثناء تسليم العمل' };

  await notifyUser(clientId, 'تم تسليم مشروعك!', 'قام المونتير برفع مسودة الفيديو. يرجى المراجعة والاعتماد.');
  
  await logAuditEvent({
    actorIdentifier: `freelancer:${user.user.id}`, action: 'work_submitted', module: 'workspace', entityId: orderId
  });

  revalidatePath('/[locale]/workspace');
  return { success: true, message: 'تم إرسال العمل للعميل بنجاح' };
}

// 2. العميل يعتمد العمل ويصرف الأموال
export async function approveWork(escrowId: string, orderId: string, freelancerId: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('يجب تسجيل الدخول');

  // تحديث حالة الطلب
  await supabase.from('orders').update({ status: 'completed' }).eq('id', orderId);
  
  // تحرير أموال الضمان للمونتير
  await updateEscrowStatus(escrowId, 'released', user.user.id);
  
  await notifyUser(freelancerId, 'تم اعتماد العمل!', 'وافق العميل على مشروعك وتم تحرير أموال الضمان لمحفظتك.');

  revalidatePath('/[locale]/workspace');
  return { success: true, message: 'تم اعتماد العمل وصرف الأموال للمونتير' };
}

// 3. فتح نزاع
export async function raiseDispute(escrowId: string, orderId: string, targetUserId: string, reason: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) throw new Error('يجب تسجيل الدخول');

  await supabase.from('orders').update({ status: 'disputed' }).eq('id', orderId);
  await updateEscrowStatus(escrowId, 'disputed', user.user.id);

  await notifyUser(targetUserId, 'تم فتح نزاع', `تم تجميد المشروع وفتح نزاع مالي. السبب: ${reason}`);
  
  revalidatePath('/[locale]/workspace');
  return { success: true, message: 'تم فتح النزاع وتحويله للإدارة' };
}
