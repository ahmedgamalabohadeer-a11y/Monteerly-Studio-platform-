import { supabase } from './supabase';

type AuditPayload = {
  actorType?: 'system' | 'user' | 'agent';
  actorIdentifier: string;
  action: string;
  module: 'hr' | 'finance' | 'contracts' | string;
  entityId?: string;
  snapshot?: Record<string, unknown>;
};

export async function logAuditEvent(payload: AuditPayload) {
  const { actorType = 'system', actorIdentifier, action, module, entityId, snapshot } = payload;

  const { error } = await supabase.from('audit_logs').insert({
    actor_type: actorType,
    actor_identifier: actorIdentifier,
    action,
    module,
    entity_id: entityId,
    payload_snapshot: snapshot ?? null,
  });

  if (error) {
    console.error('🚨 Audit Log Error:', error.message);
  }
}
