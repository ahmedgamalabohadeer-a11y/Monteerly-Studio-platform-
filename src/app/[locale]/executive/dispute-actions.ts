'use server'

import { updateEscrowStatus } from '@/lib/escrow';
import { notifyUser } from '@/lib/notifications';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

// الحصول على المستخدم الحالي (يجب أن يكون Admin)
async function requireAdmin() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) throw new Error('غير مصرح. يجب تسجيل الدخول.');
    
    // التحقق من صلاحيات المدير (افتراض أن دورك هو 'admin' في profiles)
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') throw new Error('غير مصرح. صلاحيات مدير فقط.');
    
    return user;
}

// حل النزاع وإصدار قرار
export async function resolveDispute(formData: FormData) {
  try {
    const admin = await requireAdmin();
    const escrowId = formData.get('escrow_id') as string;
    const decision = formData.get('decision') as 'released' | 'refunded';
    const reason = formData.get('reason') as string;
    
    // جلب معلومات الحساب لتوجيه الإشعارات
    const { data: escrow } = await supabase.from('escrow_accounts').select('*').eq('id', escrowId).single();
    if (!escrow) throw new Error('حساب الضمان غير موجود');

    // تحديث حالة الضمان
    await updateEscrowStatus(escrowId, decision, admin.id);

    // إرسال إشعارات للأطراف المعنية
    const decisionText = decision === 'released' ? 'لصالح المونتير (الإفراج عن المبلغ)' : 'لصالح العميل (رد المبلغ)';
    await notifyUser(escrow.client_id, 'قرار إداري في نزاع مالي', `تم الفصل في النزاع: ${decisionText}. السبب: ${reason}`);
    await notifyUser(escrow.freelancer_id, 'قرار إداري في نزاع مالي', `تم الفصل في النزاع: ${decisionText}. السبب: ${reason}`);

    revalidatePath('/[locale]/executive');
    return { success: true, message: 'تم تنفيذ القرار وإشعار الأطراف المعنية بنجاح.' };
  } catch (error: any) {
    console.error('Dispute Resolution Error:', error);
    return { success: false, message: error.message || 'حدث خطأ أثناء حل النزاع' };
  }
}
