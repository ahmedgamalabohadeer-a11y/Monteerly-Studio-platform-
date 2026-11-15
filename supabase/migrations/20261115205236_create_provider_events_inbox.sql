BEGIN;

CREATE TABLE public.provider_events_inbox (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL CHECK (provider = 'paymob'),
  provider_event_id text NOT NULL CHECK (length(provider_event_id) > 0),
  received_at timestamptz NOT NULL DEFAULT now(),
  signature_verified boolean NOT NULL CHECK (signature_verified),
  signature_version text,
  payload_hash text NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  normalized_event_type text NOT NULL,
  payment_intent_id uuid,
  processing_state text NOT NULL DEFAULT 'received'
    CHECK (processing_state IN ('received', 'processing', 'processed', 'rejected', 'quarantined', 'failed')),
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  processed_at timestamptz,
  CONSTRAINT provider_events_inbox_provider_event_unique
    UNIQUE (provider, provider_event_id)
);

CREATE INDEX provider_events_inbox_processing_idx
  ON public.provider_events_inbox (processing_state, received_at);

ALTER TABLE public.provider_events_inbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_events_inbox FORCE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE public.provider_events_inbox
  FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT, INSERT ON TABLE public.provider_events_inbox TO service_role;
GRANT UPDATE (processing_state, processed_at)
  ON TABLE public.provider_events_inbox TO service_role;

CREATE POLICY provider_events_inbox_service_access
  ON public.provider_events_inbox
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

COMMIT;
