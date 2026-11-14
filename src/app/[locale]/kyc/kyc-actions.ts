'use server';

import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/serverAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type KycDocumentType = 'national_id' | 'passport';

export async function canSubmitKYCDocuments() {
  try {
    const { supabase, user } = await requireUser();
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('kyc_status')
      .eq('id', user.id)
      .maybeSingle();

    if (error || !profile) return false;
    return profile.kyc_status === 'none' || profile.kyc_status === 'rejected';
  } catch {
    return false;
  }
}

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
      normalizedPath.split('/').length !== 3 ||
      normalizedPath.includes('..') ||
      normalizedPath.length > 512 ||
      (documentType !== 'national_id' && documentType !== 'passport')
    ) {
      throw new Error('بيانات مستند التوثيق غير صالحة.');
    }

    const fileName = normalizedPath.split('/').at(-1);
    if (!fileName) throw new Error('بيانات مستند التوثيق غير صالحة.');

    const { data: uploadedFiles, error: storageError } = await supabaseAdmin.storage
      .from('secure-vault')
      .list(`kyc-docs/${user.id}`, { search: fileName, limit: 10 });

    const uploadedFile = uploadedFiles?.find((file) => file.name === fileName);
    const metadata = uploadedFile?.metadata as Record<string, unknown> | null;
    const contentType = metadata?.mimetype;
    const fileSize = metadata?.size;
    if (
      storageError ||
      !uploadedFile ||
      !['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(String(contentType)) ||
      (typeof fileSize === 'number' && fileSize > 10 * 1024 * 1024)
    ) {
      throw new Error('لم يتم العثور على مستند صالح في الخزنة الخاصة.');
    }

    const { error } = await supabase.rpc('submit_own_kyc', {
      p_document_path: normalizedPath,
      p_document_type: documentType,
    });

    if (error) {
      throw new Error('تعذر تسجيل طلب التوثيق.');
    }

    revalidatePath('/[locale]/kyc');
    return { success: true };
  } catch (error) {
    console.error('KYC Submission Error:', error);
    return { success: false, error: 'حدث خطأ أثناء تقديم مستندات التوثيق' };
  }
}
