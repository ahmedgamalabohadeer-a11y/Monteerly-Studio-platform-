import 'server-only';

import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function resolveDispute(
  disputeId: string,
  decision: 'freelancer' | 'client'
) {
  const { data, error } = await supabaseAdmin
    .from('disputes')
    .update({
      status: 'resolved',
      resolution: decision,
      resolved_at: new Date().toISOString(),
    })
    .eq('id', disputeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
