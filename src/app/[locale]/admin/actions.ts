'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireSystemRole } from '@/lib/serverAuth';
import { logAuditEvent } from '@/lib/audit';

import { revalidatePath } from 'next/cache';
export type AccountType = 'client' | 'freelancer' | 'agency';

export type AdminDashboardUser = {
  id: string;
  full_name: string | null;
  email: string | null;
  account_type: AccountType | null;
};

const ACCOUNT_TYPES: readonly AccountType[] = ['client', 'freelancer', 'agency'];

function normalizeAccountType(value: unknown): AccountType | null {
  return typeof value === 'string' && ACCOUNT_TYPES.includes(value as AccountType)
    ? (value as AccountType)
    : null;
}

export async function getAdminDashboardData() {
  await requireSystemRole(['admin', 'executive']);

  const [escrowResult, jobsResult, profilesResult] = await Promise.all([
    supabaseAdmin.from('escrow_accounts').select('amount').eq('status', 'held'),
    supabaseAdmin
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'in_progress'),
    supabaseAdmin
      .from('profiles')
      .select('id, full_name, email, account_type')
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  if (escrowResult.error || jobsResult.error || profilesResult.error) {
    throw new Error('تعذر تحميل بيانات لوحة الإدارة');
  }

  const escrowTotal = (escrowResult.data ?? []).reduce(
    (total, row) => total + Number(row.amount ?? 0),
    0
  );

  const users: AdminDashboardUser[] = (profilesResult.data ?? []).map((profile) => ({
    id: profile.id,
    full_name: profile.full_name,
    email: profile.email,
    account_type: normalizeAccountType(profile.account_type),
  }));

  return {
    stats: { escrowTotal, activeJobs: jobsResult.count ?? 0 },
    users,
  };
}

export async function changeAccountType(userId: string, accountType: AccountType) {
  const { user } = await requireSystemRole(['admin', 'executive']);

  if (!userId || !ACCOUNT_TYPES.includes(accountType)) {
    throw new Error('بيانات نوع الحساب غير صالحة');
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ account_type: accountType })
    .eq('id', userId);

  if (error) {
    throw new Error('تعذر تحديث نوع الحساب');
  }

  await logAuditEvent({
    actorIdentifier: `admin:${user.id}`,
    action: 'account_type_changed',
    module: 'admin',
    entityId: userId,
    snapshot: { account_type: accountType },
  });

  revalidatePath('/[locale]/admin/dashboard');
  return { success: true };
}

/**
 * جلب جميع المطالبات المالية المعلقة والنزاعات
 */
export async function getExecutiveOverview() {
  const { supabase } = await requireSystemRole(['admin', 'executive']);

  // جلب سجلات التدقيق الخاصة بطلبات السحب (المطالبات المالية)
  const { data: withdrawalRequests } = await supabase
    .from('audit_logs')
    .select('*')
    .eq('action', 'withdrawal_requested')
    .order('created_at', { ascending: false })
    .limit(10);

  // جلب العقود المتنازع عليها
  const { data: disputes } = await supabase
    .from('contracts')
    .select('id, order_id, client_id, freelancer_id, metadata')
    .eq('status', 'disputed');

  return { withdrawalRequests, disputes };
}

/**
 * اعتماد مطالبة مالية وتحرير السيولة
 */
export async function approveWithdrawal(logId: string) {
  const { supabase, user } = await requireSystemRole(['admin', 'executive']);

  const { data: request, error: requestError } = await supabase
    .from('audit_logs')
    .select('actor_identifier, snapshot')
    .eq('id', logId)
    .eq('action', 'withdrawal_requested')
    .single();

  const requestSnapshot = request?.snapshot as
    | { requested_amount?: unknown }
    | null
    | undefined;
  const amount = Number(requestSnapshot?.requested_amount);
  const actorIdentifier = request?.actor_identifier;
  const freelancerId = actorIdentifier?.startsWith('freelancer:')
    ? actorIdentifier.slice('freelancer:'.length)
    : '';

  if (requestError || !freelancerId || !Number.isFinite(amount) || amount <= 0) {
    throw new Error('مطالبة السحب غير موجودة أو بياناتها غير صالحة');
  }

  // تحديث حالة السجل إلى معتمد (Approved)
  await supabase
    .from('audit_logs')
    .update({ action: 'withdrawal_approved', snapshot: { approved_by: user.id, amount } })
    .eq('id', logId);

  // تحديث محرك الضمان (خصم السيولة المتاحة)
  // ملاحظة: يتطلب هذا إجراء معاملة بنكية فعلية (Paymob/PayPal) في المرحلة القادمة
  
  await logAuditEvent({
    actorIdentifier: `admin:${user.id}`,
    action: 'liquidity_released',
    module: 'finance',
    entityId: freelancerId,
    snapshot: { amount_released: amount }
  });

  revalidatePath('/[locale]/admin');
  return { success: true };
}
