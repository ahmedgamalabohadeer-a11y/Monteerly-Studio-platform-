'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function addEmployee(formData: FormData) {
  const full_name = formData.get('full_name') as string;
  const position = formData.get('position') as string;
  const salary = parseFloat(formData.get('salary') as string);

  // 1. الإدخال الرئيسي في جدول الموظفين
  const { data, error } = await supabase
    .from('employees')
    .insert([{ full_name, position, salary }])
    .select()
    .single();

  if (error) {
    console.error('❌ عطل في الإضافة:', error.message);
    return { success: false };
  }

  // 2. تسجيل العملية فوراً في الصندوق الأسود (Audit Logs)
  if (data) {
    await logAuditEvent({
      actorIdentifier: 'server_action:hr/addEmployee',
      action: 'created_employee',
      module: 'hr',
      entityId: data.id,
      snapshot: { full_name: data.full_name, position: data.position, salary: data.salary }
    });
  }

  revalidatePath('/[locale]/hr');
  return { success: true };
}
