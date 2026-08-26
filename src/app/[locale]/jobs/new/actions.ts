'use server';

import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';
import { requireUser } from '@/lib/serverAuth';

type CreateJobInput = {
  title: string;
  description: string;
  budget: string;
};

type JobAccountType = 'client' | 'agency';

function isJobAccountType(value: unknown): value is JobAccountType {
  return value === 'client' || value === 'agency';
}

export async function createJob(input: CreateJobInput) {
  const { supabase, user } = await requireUser();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('account_type')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile || !isJobAccountType(profile.account_type)) {
    throw new Error('إنشاء المشاريع متاح للعملاء والوكالات فقط.');
  }

  const title = input.title.trim();
  const description = input.description.trim();
  const budget = Number(input.budget);

  if (title.length < 5 || title.length > 160) {
    throw new Error('عنوان المشروع يجب أن يحتوي على 5 إلى 160 حرفًا.');
  }

  if (description.length < 20 || description.length > 10_000) {
    throw new Error('وصف المشروع يجب أن يحتوي على 20 إلى 10,000 حرف.');
  }

  if (!Number.isFinite(budget) || budget <= 0 || budget > 1_000_000_000) {
    throw new Error('أدخل ميزانية صحيحة ضمن النطاق المسموح.');
  }

  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .insert({
      title,
      budget,
      client_id: user.id,
      status: 'open',
      snapshot: {
        description,
        created_by_account_type: profile.account_type,
        escrow_status: 'not_funded',
      },
    })
    .select('id')
    .single();

  if (jobError || !job?.id) {
    throw new Error('تعذر إنشاء المشروع.');
  }

  await logAuditEvent({
    actorIdentifier: `user:${user.id}`,
    action: 'job_created',
    module: 'jobs',
    entityId: job.id,
    snapshot: {
      budget,
      account_type: profile.account_type,
      status: 'open',
    },
  });

  revalidatePath('/[locale]/jobs');
  revalidatePath('/[locale]/dashboard');
  return { success: true, jobId: job.id };
}
