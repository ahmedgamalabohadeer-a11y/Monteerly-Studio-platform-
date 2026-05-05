import { activateSovereignAgreement } from '@/lib/contracts';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

const PAYMOB_HMAC = process.env.PAYMOB_HMAC_SECRET || 'secret_mcos_key';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hmacHeader = req.headers.get('hmac');

    if (!hmacHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const calculatedHmac = crypto.createHmac('sha512', PAYMOB_HMAC).update(body).digest('hex');
    if (calculatedHmac !== hmacHeader) return NextResponse.json({ error: 'Invalid HMAC' }, { status: 403 });

    const data = JSON.parse(body);
    const orderId = data.obj.order.merchant_order_id;

    if (data.obj.success) {
      const { data: job } = await supabase.from('jobs').select('*').eq('id', orderId).single();
      if (job) {
        await activateSovereignAgreement(job.id, job.client_id, job.freelancer_id, job.budget);
        await supabase.from('jobs').update({ status: 'in_progress', escrow_secured: true }).eq('id', orderId);
        await supabase.from('transactions').insert({
          reference_id: orderId,
          user_id: job.client_id,
          job_id: orderId,
          amount: data.obj.amount_cents / 100,
          status: 'completed',
          type: 'escrow_hold'
        });
      }
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
