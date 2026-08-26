'use server'

import { createClient } from '@/lib/supabase/server';
import { logAuditEvent } from '@/lib/audit';

type WalletBalance = {
  escrowed: number;
  liquidity: number;
};

async function readWalletBalances(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
): Promise<WalletBalance> {
  const { data: escrowData, error } = await supabase
    .from('escrow_accounts')
    .select('amount, status')
    .eq('freelancer_id', userId);

  if (error) throw error;

  return (escrowData ?? []).reduce<WalletBalance>(
    (balances, record) => {
      const amount = Number(record.amount);
      if (!Number.isFinite(amount) || amount <= 0) return balances;

      if (record.status === 'held' || record.status === 'disputed') {
        balances.escrowed += amount;
      } else if (record.status === 'released') {
        balances.liquidity += amount;
      }

      return balances;
    },
    { escrowed: 0, liquidity: 0 }
  );
}

export async function getWalletBalances() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('تصريح أمني مفقود');

  return readWalletBalances(supabase, user.id);
}

export async function requestWithdrawal() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('تصريح أمني مفقود');

  const { liquidity } = await readWalletBalances(supabase, user.id);
  if (liquidity <= 0) {
    throw new Error('لا توجد سيولة متاحة للسحب');
  }

  await logAuditEvent({
    actorIdentifier: `freelancer:${user.id}`,
    action: 'withdrawal_requested',
    module: 'finance',
    snapshot: {
      requested_amount: liquidity,
      timestamp: new Date().toISOString(),
    },
  });

  return {
    success: true,
    message: 'تم إصدار مطالبة مالية رسمية. جاري المعالجة.',
  };
}
