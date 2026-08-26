'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logAuditEvent } from '@/lib/audit';

export async function finalizeFreelancerOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return { success: false, message: 'خطأ: يجب تسجيل الدخول أولاً' };

  const fullName = formData.get('full_name') as string;
  const specialization = formData.get('specialization') as string;
  const bio = formData.get('bio') as string;
  const portfolio = formData.get('portfolio_url') as string;

  const { error } = await supabase.from('profiles').update({
    full_name: fullName,
    account_type: 'freelancer',
    bio: bio,
    metadata: { 
      portfolio_url: portfolio, 
      specialization,
      onboarding_version: 'v3.1',
      setup_completed_at: new Date().toISOString() 
    }
  }).eq('id', userData.user.id);

  if (error) return { success: false, message: `فشل التحديث: ${error.message}` };

  // تسجيل الحدث في سجل التدقيق السيادي
  await logAuditEvent({
    actorIdentifier: `freelancer:${userData.user.id}`,
    action: 'onboarding_completed',
    module: 'identity',
    snapshot: { accountType: 'freelancer', specialization, fullName }
  });

  revalidatePath('/[locale]/freelancer');
  redirect('/ar/workspace'); // التوجه مباشرة لغرفة العمليات
}
