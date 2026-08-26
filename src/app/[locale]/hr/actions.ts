'use server'

import { requireSystemRole } from '@/lib/serverAuth';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function addEmployee(formData: FormData) {
  const { supabase, user } = await requireSystemRole(['admin', 'executive']);

  const full_name = formData.get('full_name') as string;
  const position = formData.get('position') as string;
  const salary = parseFloat(formData.get('salary') as string);
  if (!full_name?.trim() || !position?.trim() || !Number.isFinite(salary) || salary < 0) {
    return { success: false, message: 'بيانات الموظف غير صالحة' };
  }


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
      actorIdentifier: `admin:${user.id}`,
      action: 'created_employee',
      module: 'hr',
      entityId: data.id,
      snapshot: { full_name: data.full_name, position: data.position, salary: data.salary }
    });
  }

  revalidatePath('/[locale]/hr');
  return { success: true };
}
