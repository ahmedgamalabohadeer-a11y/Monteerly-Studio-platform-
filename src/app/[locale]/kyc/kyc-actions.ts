'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function submitKYCDocuments(documentId: string, documentType: string) {
  try {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) throw new Error('غير مصرح لك بالوصول');

    // افتراض وجود جدول profiles يحتوي على kyc_status
    const { error } = await supabase.from('profiles').update({
      kyc_status: 'pending',
      kyc_submitted_at: new Date().toISOString(),
      document_id: documentId,
      document_type: documentType
    }).eq('id', auth.user.id);

    if (error) {
       // محاولة إنشاء السجل إذا لم يكن موجوداً
       await supabase.from('profiles').insert({
          id: auth.user.id,
          kyc_status: 'pending',
          document_id: documentId,
          document_type: documentType
       });
    }

    // تسجيل التدقيق الجنائي للعملية
    await logAuditEvent({
      actorIdentifier: `user:${auth.user.id}`,
      action: 'kyc_submitted',
      module: 'security',
      entityId: auth.user.id,
      snapshot: { documentType }
    });

    revalidatePath('/[locale]/kyc');
    return { success: true };
  } catch (error) {
    console.error("KYC Submission Error:", error);
    return { success: false, error: 'حدث خطأ أثناء تقديم مستندات التوثيق' };
  }
}
