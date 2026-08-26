import 'server-only';

import { createClient } from '@/lib/supabase/server';

type AuditPayload = {
  actorIdentifier: string;
  action: string;
  module: 'hr' | 'finance' | 'contracts' | string;
  entityId?: string;
  snapshot?: Record<string, unknown>;
};

export async function logAuditEvent(payload: AuditPayload) {
  const supabase = await createClient();
  const { actorIdentifier, action, module, entityId, snapshot } = payload;

  const { error } = await supabase.from('audit_logs').insert({
    actor_identifier: actorIdentifier,
    action,
    module,
    snapshot: {
      ...(snapshot ?? {}),
      ...(entityId ? { entityId } : {}),
    },
  });

  if (error) {
    console.error('🚨 Audit Log Error:', error.message);
  }
}
