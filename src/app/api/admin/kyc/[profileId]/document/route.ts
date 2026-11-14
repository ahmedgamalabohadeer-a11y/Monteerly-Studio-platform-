import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { requireSystemRole } from '@/lib/serverAuth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { user } = await requireSystemRole(['admin', 'kyc_operator']);
    const { profileId } = await params;
    if (!/^[0-9a-f-]{36}$/i.test(profileId)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('document_id, kyc_status')
      .eq('id', profileId)
      .maybeSingle();

    if (
      profileError ||
      !profile ||
      profile.kyc_status !== 'pending' ||
      typeof profile.document_id !== 'string' ||
      !profile.document_id.startsWith(`kyc-docs/${profileId}/`) ||
      profile.document_id.split('/').length !== 3
    ) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { data: document, error: downloadError } = await supabaseAdmin.storage
      .from('secure-vault')
      .download(profile.document_id);

    if (downloadError || !document) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const objectDigest = createHash('sha256')
      .update(profile.document_id)
      .digest('hex');
    const { error: auditError } = await supabaseAdmin
      .from('security_audit_logs')
      .insert({
        actor_id: user.id,
        action: 'kyc_document_reviewed',
        resource_type: 'kyc_document',
        resource_id: profileId,
        metadata: { object_key_digest: objectDigest },
      });

    if (auditError) {
      return NextResponse.json({ error: 'Review access could not be audited' }, { status: 503 });
    }

    const contentType = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ].includes(document.type)
      ? document.type
      : 'application/octet-stream';

    return new Response(document, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename="kyc-document"',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
}
