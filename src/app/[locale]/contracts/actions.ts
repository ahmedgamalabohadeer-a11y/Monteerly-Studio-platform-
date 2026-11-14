'use server'

import { randomUUID } from 'node:crypto';
import { requireUser } from '@/lib/serverAuth';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

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
  idempotencyKey: string;
};

export async function issueGeneratedContractIdempotencyKey() {
  try {
    await requireUser();
    return randomUUID();
  } catch {
    throw new Error('تعذر بدء طلب العقد. يرجى المحاولة مرة أخرى.');
  }
}

export async function finalizeGeneratedContract(input: GeneratedContractInput) {
  try {
    const { user } = await requireUser();
    const clientName = input.clientName.trim();
    const contractValue = Number(input.contractValue);
    const aiDraft = input.aiDraft.trim();

    if (input.type !== 'nda' && input.type !== 'service') {
      throw new Error('invalid');
    }

    if (!clientName || clientName.length > 160) {
      throw new Error('invalid');
    }

    if (
      !/^(?:0|[1-9]\d{0,9})(?:\.\d{1,2})?$/.test(input.contractValue) ||
      !Number.isFinite(contractValue) ||
      contractValue <= 0 ||
      contractValue > 1_000_000_000
    ) {
      throw new Error('invalid');
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(input.deliveryDate) ||
      !Number.isFinite(Date.parse(`${input.deliveryDate}T00:00:00.000Z`)) ||
      new Date(`${input.deliveryDate}T00:00:00.000Z`).toISOString().slice(0, 10) !== input.deliveryDate
    ) {
      throw new Error('invalid');
    }

    if (!aiDraft || aiDraft.length > 50_000) {
      throw new Error('invalid');
    }

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.idempotencyKey)) {
      throw new Error('invalid');
    }

    const { data, error } = await supabaseAdmin.rpc('finalize_generated_contract', {
      p_actor_id: user.id,
      p_contract_type: input.type,
      p_client_name: clientName,
      p_contract_value: contractValue,
      p_delivery_date: input.deliveryDate,
      p_ai_content: aiDraft,
      p_idempotency_key: input.idempotencyKey,
    });

    if (error || !data || data.length !== 1 || data[0]?.success !== true) {
      throw new Error('failed');
    }

    revalidatePath('/[locale]/contracts');
    revalidatePath('/[locale]/production');
    return { success: true };
  } catch {
    throw new Error('تعذر إتمام طلب العقد. يرجى المحاولة مرة أخرى.');
  }
}
