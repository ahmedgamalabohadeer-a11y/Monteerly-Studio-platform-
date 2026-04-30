'use server'

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logAuditEvent } from '@/lib/audit';

export async function finalizeFreelancerOnboarding(formData: FormData) {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) return { success: false, message: 'خطأ: يجب تسجيل الدخول أولاً' };

  const fullName = formData.get('full_name') as string;
  const role = formData.get('role') as string; // اختيار من الدائرة الأولى
  const bio = formData.get('bio') as string;
  const portfolio = formData.get('portfolio_url') as string;

  const { error } = await supabase.from('profiles').update({
    full_name: fullName,
    role: role,
    bio: bio,
    metadata: { 
      portfolio_url: portfolio, 
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
    snapshot: { role, fullName }
  });

  revalidatePath('/[locale]/freelancer');
  redirect('/ar/workspace'); // التوجه مباشرة لغرفة العمليات
}
