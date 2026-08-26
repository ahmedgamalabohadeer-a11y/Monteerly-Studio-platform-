'use server';

import { logAuditEvent } from '@/lib/audit';
import { requireUser } from '@/lib/serverAuth';

type OnboardingAccountType = 'client' | 'freelancer' | 'agency';

type OnboardingInput = {
  accountType: OnboardingAccountType;
  fullName: string;
  professionalFocus: string;
  experienceYears: string;
  bio: string;
  taxId: string;
};

export async function saveOnboardingProfile(input: OnboardingInput) {
  const { supabase, user } = await requireUser();
  const fullName = input.fullName.trim();
  const professionalFocus = input.professionalFocus.trim();
  const years = Number.parseInt(input.experienceYears, 10);
  const bio = input.bio.trim();
  const taxId = input.taxId.trim();

  if (
    input.accountType !== 'client' &&
    input.accountType !== 'freelancer' &&
    input.accountType !== 'agency'
  ) {
    throw new Error('نوع الحساب غير صالح.');
  }

  if (!fullName || fullName.length > 160) {
    throw new Error('الاسم أو اسم الوكالة غير صالح.');
  }

  if (!professionalFocus || professionalFocus.length > 240) {
    throw new Error('التخصص أو مجال النشاط غير صالح.');
  }

  if (!Number.isFinite(years) || years < 0 || years > 80) {
    throw new Error('سنوات الخبرة غير صالحة.');
  }

  if (bio.length < 20 || bio.length > 10_000) {
    throw new Error('النبذة يجب أن تحتوي على 20 إلى 10,000 حرف.');
  }

  if (taxId.length > 120) {
    throw new Error('الرقم الضريبي أطول من الحد المسموح.');
  }

  const { data: profile, error: saveError } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      account_type: input.accountType,
      experience_years: years,
      bio: `${professionalFocus}\n\n${bio}`,
      kyc_status: 'pending',
      ...(taxId ? { tax_id: taxId } : {}),
    })
    .eq('id', user.id)
    .select('id')
    .single();

  if (saveError || !profile) {
    throw new Error('تعذر حفظ بيانات الملف.');
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      onboarding_completed: true,
    },
  });

  if (metadataError) {
    throw new Error('تم حفظ الملف، لكن تعذر تحديث حالة التهيئة.');
  }

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'onboarding_completed',
    module: 'auth',
    entityId: user.id,
    snapshot: {
      account_type: input.accountType,
      kyc_status: 'pending',
    },
  });

  return { success: true };
}
