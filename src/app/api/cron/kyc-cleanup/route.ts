import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  const expectedSecret = process.env.KYC_CLEANUP_CRON_SECRET;
  const authorization = request.headers.get('authorization') || '';
  const suppliedSecret = authorization.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : '';

  if (!expectedSecret) {
    return NextResponse.json({ error: 'Cleanup job is not configured' }, { status: 503 });
  }

  const expected = Buffer.from(expectedSecret);
  const supplied = Buffer.from(suppliedSecret);
  if (
    expected.length === 0 ||
    expected.length !== supplied.length ||
    !timingSafeEqual(expected, supplied)
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: candidates, error: candidateError } = await supabaseAdmin.rpc(
    'kyc_cleanup_candidates',
  );
  if (candidateError) {
    return NextResponse.json({ error: 'Cleanup candidates unavailable' }, { status: 503 });
  }

  let deleted = 0;
  let skipped = 0;
  for (const candidate of candidates || []) {
    const objectPath = candidate.object_path;
    const { data: claimId, error: claimError } = await supabaseAdmin.rpc(
      'claim_kyc_object_cleanup',
      { p_object_path: objectPath },
    );
    if (claimError || !claimId) {
      skipped += 1;
      continue;
    }

    const { error: storageError } = await supabaseAdmin.storage
      .from('secure-vault')
      .remove([objectPath]);
    if (storageError) {
      skipped += 1;
      continue;
    }

    const { error: completionError } = await supabaseAdmin.rpc(
      'complete_kyc_object_cleanup',
      { p_object_path: objectPath, p_claim_id: claimId },
    );
    if (completionError) {
      skipped += 1;
      continue;
    }
    deleted += 1;
  }

  return NextResponse.json({ deleted, skipped });
}
