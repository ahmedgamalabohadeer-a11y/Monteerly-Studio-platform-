import { supabase } from './supabase';
import { logAuditEvent } from './audit';
import { holdFundsInEscrow } from './escrow';

export async function generateContract(orderId: string, clientId: string, freelancerId: string, amount: number) {
  const { data: client } = await supabase.from('profiles').select('full_name').eq('id', clientId).single();
  const { data: freelancer } = await supabase.from('profiles').select('full_name').eq('id', freelancerId).single();

  const terms = `عقد إنتاج مرئي: طرف أول ${client?.full_name}، طرف ثاني ${freelancer?.full_name}. القيمة: ${amount}$. الميزانية محجوزة في نظام الضمان.`;

  const { data: contract, error } = await supabase.from('contracts').insert({
    order_id: orderId, 
    client_id: clientId, 
    freelancer_id: freelancerId, 
    content: terms, 
    status: 'signed'
  }).select().single();

  if (error) throw error;
  return contract;
}

export async function activateSovereignAgreement(orderId: string, clientId: string, freelancerId: string, amount: number) {
  const contract = await generateContract(orderId, clientId, freelancerId, amount);
  const escrow = await holdFundsInEscrow(orderId, clientId, freelancerId, amount);
  return { contract, escrow };
}
