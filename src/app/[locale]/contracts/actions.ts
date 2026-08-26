'use server'

import { requireUser } from '@/lib/serverAuth';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

// 1. إنشاء عقد جديد (موجودة مسبقاً)
export async function addContract(formData: FormData) {
  const { supabase, user } = await requireUser();

  const title = formData.get('title') as string;
  const contract_type = formData.get('contract_type') as string;
  const status = formData.get('status') as string || 'draft';

  const { data, error } = await supabase.from('contracts').insert([{ title, contract_type, status }]).select().single();

  if (error) return { success: false };

  if (data) {
    await logAuditEvent({
      actorIdentifier: `user:${user.id}`,
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
  const { supabase, user } = await requireUser();

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
    actorIdentifier: `user:${user.id}`,
    action: 'created_contract_revision',
    module: 'contracts',
    entityId: revision.id,
    snapshot: { contract_id, nextVersion, changes_summary }
  });

  revalidatePath('/[locale]/contracts');
  return { success: true };
}

type GeneratedContractInput = {
  type: 'nda' | 'service';
  clientName: string;
  contractValue: string;
  deliveryDate: string;
  aiDraft: string;
};

export async function finalizeGeneratedContract(input: GeneratedContractInput) {
  const { supabase, user } = await requireUser();
  const clientName = input.clientName.trim();
  const contractValue = Number(input.contractValue);
  const aiDraft = input.aiDraft.trim();

  if (input.type !== 'nda' && input.type !== 'service') {
    throw new Error('نوع العقد غير صالح');
  }

  if (!clientName || clientName.length > 160) {
    throw new Error('اسم العميل غير صالح');
  }

  if (!Number.isFinite(contractValue) || contractValue <= 0 || contractValue > 1_000_000_000) {
    throw new Error('قيمة العقد غير صالحة');
  }

  if (!Number.isFinite(Date.parse(input.deliveryDate))) {
    throw new Error('تاريخ التسليم غير صالح');
  }

  if (!aiDraft || aiDraft.length > 50_000) {
    throw new Error('محتوى العقد غير صالح');
  }

  const { data: contract, error: contractError } = await supabase
    .from('legal_contracts')
    .insert({
      contract_type: input.type,
      client_name: clientName,
      contract_value: contractValue,
      delivery_date: input.deliveryDate,
      ai_content: aiDraft,
      status: 'signed',
    })
    .select('id')
    .single();

  if (contractError || !contract) {
    throw new Error('تعذر توثيق العقد');
  }

  const projectName =
    input.type === 'service' ? `إنتاج: ${clientName}` : `مشروع NDA: ${clientName}`;

  const { error: productionError } = await supabase.from('production_projects').insert({
    contract_id: contract.id,
    project_name: projectName,
    production_status: 'pending',
  });

  if (productionError) {
    throw new Error('تعذر إنشاء مشروع الإنتاج');
  }

  const { error: financialError } = await supabase.from('financial_ledgers').insert({
    contract_id: contract.id,
    client_name: clientName,
    total_amount: contractValue,
    remaining_amount: contractValue,
    due_date: input.deliveryDate,
    payment_status: 'pending',
  });

  if (financialError) {
    throw new Error('تعذر إنشاء السجل المالي');
  }

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'generated_contract_finalized',
    module: 'contracts',
    entityId: contract.id,
    snapshot: {
      contract_type: input.type,
      contract_value: contractValue,
      delivery_date: input.deliveryDate,
    },
  });

  revalidatePath('/[locale]/contracts');
  revalidatePath('/[locale]/production');
  return { success: true, contractId: contract.id };
}
