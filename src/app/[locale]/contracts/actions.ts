'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

// 1. إنشاء عقد جديد (موجودة مسبقاً)
export async function addContract(formData: FormData) {
  const title = formData.get('title') as string;
  const contract_type = formData.get('contract_type') as string;
  const status = formData.get('status') as string || 'draft';

  const { data, error } = await supabase.from('contracts').insert([{ title, contract_type, status }]).select().single();

  if (error) return { success: false };

  if (data) {
    await logAuditEvent({
      actorIdentifier: 'server_action:contracts/addContract',
      action: 'created_contract',
      module: 'contracts',
      entityId: data.id,
      snapshot: { title: data.title, type: data.contract_type, status: data.status }
    });
  }
  revalidatePath('/[locale]/contracts');
  return { success: true };
}

// 2. إنشاء نسخة جديدة من عقد قائم (التحديث الجديد)
export async function addContractRevision(formData: FormData) {
  const contract_id = formData.get('contract_id') as string;
  const changes_summary = formData.get('changes_summary') as string;
  const content_url = formData.get('content_url') as string || '#';

  // جلب النسخة الحالية للعقد
  const { data: contract, error: fetchError } = await supabase
    .from('contracts')
    .select('current_version')
    .eq('id', contract_id)
    .single();

  if (fetchError || !contract) return { success: false, error: 'Contract not found' };

  const nextVersion = contract.current_version + 1;

  // تسجيل النسخة الجديدة
  const { data: revision, error: revError } = await supabase
    .from('contract_revisions')
    .insert([{ contract_id, version_number: nextVersion, content_url, changes_summary }])
    .select()
    .single();

  if (revError) return { success: false, error: revError.message };

  // تحديث رقم النسخة في العقد الرئيسي
  await supabase.from('contracts').update({ current_version: nextVersion }).eq('id', contract_id);

  // توثيق التعديل في السجل السيادي
  await logAuditEvent({
    actorIdentifier: 'server_action:contracts/addContractRevision',
    action: 'created_contract_revision',
    module: 'contracts',
    entityId: revision.id,
    snapshot: { contract_id, nextVersion, changes_summary }
  });

  revalidatePath('/[locale]/contracts');
  return { success: true };
}
