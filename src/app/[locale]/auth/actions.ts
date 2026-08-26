'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logAuditEvent } from '@/lib/audit';
import { requireUser } from '@/lib/serverAuth';

export async function signUpUser(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('full_name') as string;
  // ⚠️ تم حذف role من FormData — كل مستخدم جديد يبدأ بـ system_role='user'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        // ⚠️ لا role هنا — سيتم تعيينه تلقائيًا عبر trigger
      },
    },
  });

  if (error) {
    console.error('Signup Error:', error.message);
    return { success: false, message: error.message };
  }

  if (data.user) {
    await logAuditEvent({
      actorIdentifier: 'server_action:auth/signUp',
      action: 'user_registered',
      module: 'auth',
      entityId: data.user.id,
      snapshot: { email }
    });
  }

  return { success: true, message: 'تم التسجيل بنجاح. يرجى تسجيل الدخول.' };
}

export async function signInUser(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: 'بيانات الدخول غير صحيحة.' };
  }

  await logAuditEvent({
    actorIdentifier: 'server_action:auth/signIn',
    action: 'user_logged_in',
    module: 'auth',
    entityId: data.user.id,
    snapshot: { email }
  });

  revalidatePath('/');
  redirect('/ar/executive'); // تحويل مؤقت لغرفة القيادة
}

export async function signOutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/ar/auth');
}

type AccountType = 'client' | 'freelancer' | 'agency';

export async function setOwnAccountType(accountType: AccountType) {
  const { supabase, user } = await requireUser();

  if (accountType !== 'client' && accountType !== 'freelancer' && accountType !== 'agency') {
    throw new Error('نوع الحساب غير صالح.');
  }

  const { error } = await supabase
    .from('profiles')
    .update({ account_type: accountType })
    .eq('id', user.id);

  if (error) {
    throw new Error('تعذر حفظ نوع الحساب.');
  }

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'account_type_selected',
    module: 'auth',
    entityId: user.id,
    snapshot: { account_type: accountType },
  });

  return { success: true };
}
