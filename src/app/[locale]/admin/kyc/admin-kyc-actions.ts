'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';
import { requireSystemRole } from '@/lib/serverAuth';

export async function getPendingKYCRequests() {
  try {
    await requireSystemRole(['admin', 'kyc_operator']);
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, document_type, kyc_submitted_at')
      .eq('kyc_status', 'pending');

    if (error) {
      console.error('تعذر تحميل طلبات KYC المعلقة:', error.message);
      throw new Error('تعذر تحميل طلبات KYC المعلقة.');
    }

    return data || [];
  } catch (err) {
    console.error("Critical Error in getPendingKYCRequests:", err);
    return [];
  }
}

export async function reviewKYCRequest(userId: string, decision: 'approved' | 'rejected', adminNotes: string) {
  try {
    const { user } = await requireSystemRole(['admin', 'kyc_operator']);
    if (!/^[0-9a-f-]{36}$/i.test(userId)) {
      throw new Error('Invalid KYC profile identifier');
    }

    const { error } = await supabaseAdmin.rpc('review_kyc_request', {
      p_profile_id: userId,
      p_decision: decision,
      p_actor_id: user.id,
      p_review_note: adminNotes.trim().slice(0, 1000),
    });
    if (error) throw error;

    revalidatePath('/[locale]/admin/kyc');
    return { success: true };
  } catch (error) {
    console.error("KYC Review Error:", error);
    return { success: false, error: 'حدث خطأ أثناء تنفيذ القرار' };
  }
}
