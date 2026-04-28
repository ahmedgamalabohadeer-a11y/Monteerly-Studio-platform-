'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addTransaction(formData: FormData) {
  const amount = parseFloat(formData.get('amount') as string);
  const transaction_type = formData.get('type') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase
    .from('finance_transactions')
    .insert([{ amount, transaction_type, category, description }]);

  if (error) {
    console.error('❌ عطل مالي:', error.message);
    return { success: false };
  }

  revalidatePath('/[locale]/finance');
  return { success: true };
}
