'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addEmployee(formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const position = formData.get('position') as string;
  const salary = parseFloat(formData.get('salary') as string);

  const { error } = await supabase
    .from('employees')
    .insert([{ full_name, position, salary, status: 'active' }]);

  if (error) {
    console.error('❌ خطأ في الحفظ:', error.message);
    return { success: false, error: error.message };
  }

  // إعادة تحميل البيانات في الصفحة فوراً
  revalidatePath('/[locale]/hr');
  return { success: true };
}
