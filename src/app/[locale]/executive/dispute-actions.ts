'use server';

import { revalidatePath } from 'next/cache';
import { updateEscrowStatus } from '@/lib/escrow';
import { notifyUser } from '@/lib/notifications';
import { supabase } from '@/lib/supabase';

type EscrowDecision = 'released' | 'refunded';

type ResolveDisputeResult =
  | { success: true; message: string }
  | { success: false; message: string };

type AdminProfile = {
  role: string | null;
};

type EscrowRecord = {
  id: string;
  client_id: string;
  freelancer_id: string;
};

async function requireAdmin() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('غير مصرح. يجب تسجيل الدخول.');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single<AdminProfile>();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (profile?.role !== 'admin') {
    throw new Error('غير مصرح. صلاحيات مدير فقط.');
  }

  return user;
}

function parseDecision(value: FormDataEntryValue | null): EscrowDecision {
  if (value === 'released' || value === 'refunded') {
    return value;
  }

  throw new Error('قرار النزاع غير صالح.');
}

function parseRequiredString(
  value: FormDataEntryValue | null,
  fieldLabel: string
): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`حقل ${fieldLabel} مطلوب.`);
  }

  return value.trim();
}

export async function resolveDispute(
  formData: FormData
): Promise<ResolveDisputeResult> {
  try {
    const admin = await requireAdmin();

    const escrowId = parseRequiredString(
      formData.get('escrow_id'),
      'escrow_id'
    );
    const decision = parseDecision(formData.get('decision'));
    const reason = parseRequiredString(formData.get('reason'), 'reason');

    const { data: escrow, error: escrowError } = await supabase
      .from('escrow_accounts')
      .select('id, client_id, freelancer_id')
      .eq('id', escrowId)
      .single<EscrowRecord>();

    if (escrowError) {
      throw new Error(escrowError.message);
    }

    if (!escrow) {
      throw new Error('حساب الضمان غير موجود');
    }

    await updateEscrowStatus(escrowId, decision, admin.id);

    const decisionText =
      decision === 'released'
        ? 'لصالح المونتير (الإفراج عن المبلغ)'
        : 'لصالح العميل (رد المبلغ)';

    const notificationMessage = `تم الفصل في النزاع: ${decisionText}. السبب: ${reason}`;

    await notifyUser(
      escrow.client_id,
      'قرار إداري في نزاع مالي',
      notificationMessage
    );

    await notifyUser(
      escrow.freelancer_id,
      'قرار إداري في نزاع مالي',
      notificationMessage
    );

    revalidatePath('/ar/executive');
    revalidatePath('/en/executive');

    return {
      success: true,
      message: 'تم تنفيذ القرار وإشعار الأطراف المعنية بنجاح.',
    };
  } catch (error: unknown) {
    console.error('Dispute Resolution Error:', error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'حدث خطأ أثناء حل النزاع',
    };
  }
}
