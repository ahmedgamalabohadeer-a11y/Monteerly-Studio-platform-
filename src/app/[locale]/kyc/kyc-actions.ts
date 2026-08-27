'use server';

import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { requireUser } from '@/lib/serverAuth';

type KycDocumentType = 'national_id' | 'passport';

export async function submitKYCDocuments(
  documentPath: string,
  documentType: KycDocumentType
) {
  try {
    const { supabase, user } = await requireUser();
    const normalizedPath = documentPath.trim();
    const expectedPrefix = `kyc-docs/${user.id}/`;

    if (
      !normalizedPath.startsWith(expectedPrefix) ||
      normalizedPath.length > 512 ||
      (documentType !== 'national_id' && documentType !== 'passport')
    ) {
      throw new Error('بيانات مستند التوثيق غير صالحة.');
    }

    const { error } = await supabase.rpc('submit_own_kyc', {
      p_document_path: normalizedPath,
      p_document_type: documentType,
    });

    if (error) {
      throw new Error('تعذر تسجيل طلب التوثيق.');
    }

    await logAuditEvent({
      actorIdentifier: `user:${user.id}`,
      action: 'kyc_submitted',
      module: 'security',
      entityId: user.id,
      snapshot: { documentType },
    });

    revalidatePath('/[locale]/kyc');
    return { success: true };
  } catch (error) {
    console.error('KYC Submission Error:', error);
    return { success: false, error: 'حدث خطأ أثناء تقديم مستندات التوثيق' };
  }
}
