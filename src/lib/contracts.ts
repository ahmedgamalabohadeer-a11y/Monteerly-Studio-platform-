import { supabase } from './supabase';
import { logAuditEvent } from './audit';

export type ContractStatus = 'draft' | 'signed' | 'completed' | 'disputed';

/**
 * محرك العقود السيادي
 * توليد عقود قانونية مؤتمتة بناءً على نوع الخدمة وأطراف المعاملة
 */
export async function generateContract(orderId: string, clientId: string, freelancerId: string, amount: number) {
  // 1. جلب بيانات الأطراف من المصفوفة السيادية
  const { data: clientProfile } = await supabase.from('profiles').select('full_name').eq('id', clientId).single();
  const { data: freelancerProfile } = await supabase.from('profiles').select('full_name').eq('id', freelancerId).single();

  // 2. صياغة بنود العقد الآلية (Legal Template)
  const contractTerms = `
    عقد تقديم خدمات إنتاج مرئي رقمي
    طرف أول (عميل): ${clientProfile?.full_name || '...'}
    طرف ثاني (مبدع): ${freelancerProfile?.full_name || '...'}
    قيمة التعاقد: ${amount} $ (محجوزة في نظام الضمان Monteerly Escrow)
    
    البنود:
    - يلتزم الطرف الثاني بتسليم العمل وفق المعايير الفنية للمنصة.
    - لا تخرج الأموال من الضمان إلا بعد موافقة الطرف الأول أو قرار إداري سيادي.
    - يخضع هذا العقد لنظام حوكمة Monteerly Corporate OS.
  `;

  // 3. تخزين العقد في قاعدة البيانات
  const { data: contract, error } = await supabase.from('contracts').insert({
    order_id: orderId,
    client_id: clientId,
    freelancer_id: freelancerId,
    content: contractTerms,
    status: 'signed', // توقيع رقمي تلقائي عند الدفع
    metadata: { amount, generated_at: new Date().toISOString() }
  }).select().single();

  if (error) throw new Error('فشل توليد العقد القانوني');

  // 4. تسجيل العملية في سجل التدقيق
  await logAuditEvent({
    actorIdentifier: 'system:legal_engine',
    action: 'contract_generated',
    module: 'legal',
    entityId: contract.id,
    snapshot: { orderId, amount }
  });

  return contract;
}

import { holdFundsInEscrow } from './escrow';

export async function activateSovereignAgreement(orderId: string, clientId: string, freelancerId: string, amount: number) {
  // أ. توليد العقد القانوني وتوقيعه رقمياً
  const contract = await generateContract(orderId, clientId, freelancerId, amount);
  
  // ب. حجز الأموال في حساب الضمان فوراً
  const escrow = await holdFundsInEscrow(orderId, clientId, freelancerId, amount);
  
  return { contract, escrow };
}
