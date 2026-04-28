'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function addContract(formData: FormData) {
  const title = formData.get('title') as string;
  const contract_type = formData.get('contract_type') as string;
  const status = formData.get('status') as string || 'draft';

  const { data, error } = await supabase
    .from('contracts')
    .insert([{ title, contract_type, status }])
    .select()
    .single();

  if (error) return { success: false };

  // تسجيل العقد الجديد
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
