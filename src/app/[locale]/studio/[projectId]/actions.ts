'use server';

import { requireUser } from '@/lib/serverAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

type WorkspaceAccountType = 'client' | 'freelancer' | 'agency';

function normalizeAccountType(value: unknown): WorkspaceAccountType {
  if (value === 'client' || value === 'agency' || value === 'freelancer') {
    return value;
  }

  return 'freelancer';
}

export async function getStudioProject(projectId: string) {
  const { supabase, user } = await requireUser();

  if (!projectId || projectId.length > 128) {
    throw new Error('معرف المشروع غير صالح.');
  }

  const [{ data: profile, error: profileError }, { data: project, error: projectError }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('account_type')
        .eq('id', user.id)
        .maybeSingle(),
      supabaseAdmin
        .from('jobs')
        .select('id, title, budget, status, client_id, freelancer_id, snapshot')
        .eq('id', projectId)
        .maybeSingle(),
    ]);

  if (profileError) {
    throw new Error('تعذر تحميل نوع الحساب.');
  }

  if (projectError || !project) {
    throw new Error('المشروع المطلوب غير موجود.');
  }

  const accessRole: 'client' | 'freelancer' | null =
    project.client_id === user.id
      ? 'client'
      : project.freelancer_id === user.id
        ? 'freelancer'
        : null;

  if (!accessRole) {
    throw new Error('لا تملك عضوية في هذا المشروع.');
  }

  return {
    project,
    accountType: normalizeAccountType(profile?.account_type),
    accessRole,
  };
}
