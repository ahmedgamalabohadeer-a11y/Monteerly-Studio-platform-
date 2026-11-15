import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseAdmin';
import { handlePaymobWebhookRequest } from '../../../../lib/finance/paymob-webhook';

export async function POST(request: Request) {
  const secret = process.env.PAYMOB_HMAC_SECRET;
  const signatureVersion = process.env.PAYMOB_HMAC_SECRET_VERSION ?? null;

  const response = await handlePaymobWebhookRequest(
    request,
    secret,
    signatureVersion,
    async (event) => {
      const { error } = await supabaseAdmin
        .from('provider_events_inbox')
        .insert(event);

      if (!error) return 'inserted';
      if (error.code !== '23505') return 'error';

      const { data: existing, error: lookupError } = await supabaseAdmin
        .from('provider_events_inbox')
        .select('payload_hash')
        .eq('provider', event.provider)
        .eq('provider_event_id', event.provider_event_id)
        .maybeSingle();

      if (lookupError || !existing) return 'error';
      return existing.payload_hash === event.payload_hash ? 'duplicate' : 'conflict';
    },
  );

  return NextResponse.json(await response.json(), { status: response.status });
}
