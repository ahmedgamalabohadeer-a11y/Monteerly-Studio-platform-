import { supabase } from '@/lib/supabase';

export async function resolveDispute(disputeId: string, decision: 'freelancer' | 'client') {
  // تحديث حالة النزاع في قاعدة البيانات
  const { data, error } = await supabase
    .from('disputes')
    .update({ 
      status: 'resolved', 
      resolution: decision,
      resolved_at: new Date().toISOString() 
    })
    .eq('id', disputeId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
