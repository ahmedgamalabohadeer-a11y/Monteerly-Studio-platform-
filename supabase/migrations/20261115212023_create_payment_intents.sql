BEGIN;

CREATE TABLE public.payment_intents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  source_type text NOT NULL CHECK (source_type IN ('service', 'job')),
  source_id uuid NOT NULL,
  provider text NOT NULL DEFAULT 'paymob' CHECK (provider = 'paymob'),
  amount_minor bigint NOT NULL CHECK (amount_minor > 0),
  platform_fee_minor bigint NOT NULL DEFAULT 0
    CHECK (platform_fee_minor >= 0 AND platform_fee_minor < amount_minor),
  currency text NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  calculation_version text NOT NULL,
  quote_snapshot jsonb NOT NULL CHECK (jsonb_typeof(quote_snapshot) = 'object'),
  idempotency_key text NOT NULL CHECK (length(btrim(idempotency_key)) > 0),
  provider_order_id text,
  provider_integration_id bigint NOT NULL CHECK (provider_integration_id > 0),
  provider_transaction_id text,
  status text NOT NULL DEFAULT 'created'
    CHECK (status IN ('created', 'pending_provider', 'succeeded', 'failed', 'cancelled', 'expired')),
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  settled_at timestamptz,
  CONSTRAINT payment_intents_idempotency_key_unique UNIQUE (idempotency_key),
  CONSTRAINT payment_intents_provider_transaction_unique
    UNIQUE (provider, provider_transaction_id)
);

CREATE UNIQUE INDEX payment_intents_provider_order_unique
  ON public.payment_intents (provider, provider_order_id)
  WHERE provider_order_id IS NOT NULL;
CREATE INDEX payment_intents_owner_created_idx
  ON public.payment_intents (owner_id, created_at DESC);

ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_intents FORCE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE public.payment_intents
  FROM PUBLIC, anon, authenticated, service_role;

COMMIT;
