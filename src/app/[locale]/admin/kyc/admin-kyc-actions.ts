'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';
import { logAuditEvent } from '@/lib/audit';

export async function getPendingKYCRequests() {
  try {
    // محاولة أولى: جلب البيانات بالاعتماد على الأعمدة الجديدة
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, kyc_status, document_id, document_type, kyc_submitted_at')
      .eq('kyc_status', 'pending');

    if (error) {
      console.error("⚠️ فشل الاستعلام الدقيق، جاري الفحص العام. الخطأ:", error.message);
      
      // محاولة ثانية للفحص الاستكشافي: جلب كل شيء لمعرفة هيكل الجدول الفعلي
      const { data: testData, error: testError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .limit(1);
        
      if (testData && testData.length > 0) {
          console.log("🔍 الأعمدة الموجودة فعلياً في جدول profiles لديك هي:", Object.keys(testData[0]));
      } else if (testError) {
          console.error("❌ الجدول profiles غير موجود أو لا يمكن الوصول إليه:", testError.message);
      }
      
      return []; // إرجاع مصفوفة فارغة لمنع الانهيار
    }

    return data || [];
  } catch (err) {
    console.error("Critical Error in getPendingKYCRequests:", err);
    return [];
  }
}

export async function reviewKYCRequest(userId: string, decision: 'approved' | 'rejected', adminNotes: string) {
  try {
    const { error } = await supabaseAdmin.from('profiles').update({
      kyc_status: decision
    }).eq('id', userId);

    if (error) throw error;

    await logAuditEvent({
      actorIdentifier: 'system:admin',
      action: `kyc_${decision}`,
      module: 'security',
      entityId: userId,
      snapshot: { adminNotes }
    });

    revalidatePath('/[locale]/admin/kyc');
    return { success: true };
  } catch (error) {
    console.error("KYC Review Error:", error);
    return { success: false, error: 'حدث خطأ أثناء تنفيذ القرار' };
  }
}
