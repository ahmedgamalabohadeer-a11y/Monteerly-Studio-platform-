BEGIN;

ALTER TABLE public.escrow_accounts
  ADD COLUMN payment_intent_id uuid
    REFERENCES public.payment_intents(id) ON DELETE RESTRICT;
CREATE UNIQUE INDEX escrow_accounts_payment_intent_unique
  ON public.escrow_accounts (payment_intent_id)
  WHERE payment_intent_id IS NOT NULL;

CREATE FUNCTION public.settle_paymob_payment_intent(
  p_payment_intent_id uuid,
  p_provider_event_id text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  event_row public.provider_events_inbox%ROWTYPE;
  intent_row public.payment_intents%ROWTYPE;
  escrow_row public.escrow_accounts%ROWTYPE;
  transaction_payload jsonb;
  net_minor bigint;
  journal uuid := gen_random_uuid();
BEGIN
  IF p_payment_intent_id IS NULL OR p_provider_event_id IS NULL
    OR length(btrim(p_provider_event_id)) = 0 THEN
    RAISE EXCEPTION 'Payment intent and provider event are required'
      USING ERRCODE = '22023';
  END IF;

  SELECT * INTO event_row
  FROM public.provider_events_inbox
  WHERE provider = 'paymob' AND provider_event_id = p_provider_event_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Verified Paymob event not found' USING ERRCODE = 'P0002';
  END IF;
  IF event_row.processing_state = 'processed'
    AND event_row.payment_intent_id = p_payment_intent_id THEN
    RETURN 'duplicate';
  END IF;
  IF event_row.processing_state <> 'received'
    OR event_row.signature_verified IS NOT TRUE
    OR event_row.normalized_event_type <> 'TRANSACTION' THEN
    RAISE EXCEPTION 'Paymob event is not eligible for settlement'
      USING ERRCODE = '23514';
  END IF;

  transaction_payload := event_row.payload -> 'transaction';
  IF jsonb_typeof(transaction_payload) <> 'object'
    OR lower(coalesce(transaction_payload ->> 'success', '')) <> 'true'
    OR lower(coalesce(transaction_payload ->> 'is_capture', '')) <> 'true'
    OR transaction_payload ->> 'id' <> p_provider_event_id THEN
    RAISE EXCEPTION 'Paymob event is not a successful capture'
      USING ERRCODE = '23514';
  END IF;

  SELECT * INTO intent_row
  FROM public.payment_intents
  WHERE id = p_payment_intent_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Payment intent not found' USING ERRCODE = 'P0002';
  END IF;
  IF intent_row.status = 'succeeded'
    AND intent_row.provider_transaction_id = p_provider_event_id THEN
    RETURN 'duplicate';
  END IF;
  IF intent_row.provider <> 'paymob' OR intent_row.status <> 'pending_provider'
    OR intent_row.expires_at <= now()
    OR intent_row.provider_order_id IS NULL
    OR transaction_payload #>> '{order,id}' <> intent_row.provider_order_id
    OR transaction_payload ->> 'integration_id' <> intent_row.provider_integration_id::text
    OR transaction_payload ->> 'currency' <> intent_row.currency
    OR transaction_payload ->> 'amount_cents' !~ '^[0-9]+$'
    OR (transaction_payload ->> 'amount_cents')::bigint <> intent_row.amount_minor THEN
    RAISE EXCEPTION 'Paymob capture does not match the payment intent'
      USING ERRCODE = '23514';
  END IF;

  SELECT * INTO escrow_row
  FROM public.escrow_accounts
  WHERE payment_intent_id = p_payment_intent_id
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Escrow for payment intent not found' USING ERRCODE = 'P0002';
  END IF;
  net_minor := intent_row.amount_minor - intent_row.platform_fee_minor;
  IF escrow_row.status::text <> 'created'
    OR escrow_row.amount_cents <> net_minor
    OR escrow_row.platform_fee_cents <> intent_row.platform_fee_minor
    OR escrow_row.paymob_order_id <> intent_row.provider_order_id THEN
    RAISE EXCEPTION 'Escrow does not match the payment intent'
      USING ERRCODE = '23514';
  END IF;

  UPDATE public.payment_intents
  SET status = 'succeeded', provider_transaction_id = p_provider_event_id,
      settled_at = now(), updated_at = now()
  WHERE id = p_payment_intent_id;

  UPDATE public.escrow_accounts
  SET status = 'funded', funded_at = now()
  WHERE id = escrow_row.id;

  INSERT INTO public.financial_ledgers (
    journal_id, payment_intent_id, provider_event_id, account_code,
    debit_minor_units, credit_minor_units, idempotency_key,
    currency, status, payment_status, metadata
  ) VALUES (
    journal, p_payment_intent_id, p_provider_event_id, 'paymob_clearing',
    intent_row.amount_minor, 0,
    p_payment_intent_id::text || ':' || p_provider_event_id || ':paymob-clearing',
    intent_row.currency, 'posted', 'paid', '{}'::jsonb
  ), (
    journal, p_payment_intent_id, p_provider_event_id, 'escrow_liability',
    0, net_minor,
    p_payment_intent_id::text || ':' || p_provider_event_id || ':escrow-liability',
    intent_row.currency, 'posted', 'paid', '{}'::jsonb
  );

  IF intent_row.platform_fee_minor > 0 THEN
    INSERT INTO public.financial_ledgers (
      journal_id, payment_intent_id, provider_event_id, account_code,
      debit_minor_units, credit_minor_units, idempotency_key,
      currency, status, payment_status, metadata
    ) VALUES (
      journal, p_payment_intent_id, p_provider_event_id, 'platform_fee_revenue',
      0, intent_row.platform_fee_minor,
      p_payment_intent_id::text || ':' || p_provider_event_id || ':platform-fee',
      intent_row.currency, 'posted', 'paid', '{}'::jsonb
    );
  END IF;

  UPDATE public.provider_events_inbox
  SET payment_intent_id = p_payment_intent_id,
      processing_state = 'processed', processed_at = now()
  WHERE id = event_row.id;

  RETURN 'settled';
END;
$$;

REVOKE ALL ON FUNCTION public.settle_paymob_payment_intent(uuid, text)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.settle_paymob_payment_intent(uuid, text)
  TO service_role;

COMMIT;
