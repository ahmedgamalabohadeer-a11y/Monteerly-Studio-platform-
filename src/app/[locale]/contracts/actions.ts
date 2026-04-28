'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addContract(formData: FormData) {
  const title = formData.get('title') as string;
  const contract_type = formData.get('contract_type') as string;
  const status = formData.get('status') as string || 'draft';

  const { error } = await supabase
    .from('contracts')
    .insert([{ title, contract_type, status }]);

  if (error) {
    console.error('❌ عطل قانوني:', error.message);
    return { success: false };
  }

  revalidatePath('/[locale]/contracts');
  return { success: true };
}
