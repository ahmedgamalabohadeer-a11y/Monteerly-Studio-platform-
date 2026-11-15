BEGIN;

ALTER TABLE public.financial_ledgers
  ADD COLUMN journal_id uuid,
  ADD COLUMN payment_intent_id uuid
    REFERENCES public.payment_intents(id) ON DELETE RESTRICT,
  ADD COLUMN provider_event_id text,
  ADD COLUMN account_code text,
  ADD COLUMN debit_minor_units bigint NOT NULL DEFAULT 0,
  ADD COLUMN credit_minor_units bigint NOT NULL DEFAULT 0,
  ADD COLUMN idempotency_key text,
  ADD CONSTRAINT financial_ledgers_journal_entry_shape_check CHECK (
    (journal_id IS NULL AND payment_intent_id IS NULL AND provider_event_id IS NULL
      AND account_code IS NULL AND idempotency_key IS NULL
      AND debit_minor_units = 0 AND credit_minor_units = 0)
    OR
    (journal_id IS NOT NULL AND payment_intent_id IS NOT NULL
      AND provider_event_id IS NOT NULL AND length(provider_event_id) > 0
      AND account_code IS NOT NULL AND length(account_code) > 0
      AND idempotency_key IS NOT NULL AND length(idempotency_key) > 0
      AND debit_minor_units >= 0 AND credit_minor_units >= 0
      AND ((debit_minor_units > 0 AND credit_minor_units = 0)
        OR (credit_minor_units > 0 AND debit_minor_units = 0)))
  );

CREATE UNIQUE INDEX financial_ledgers_idempotency_key_unique
  ON public.financial_ledgers (idempotency_key)
  WHERE idempotency_key IS NOT NULL;
CREATE UNIQUE INDEX financial_ledgers_journal_account_unique
  ON public.financial_ledgers (payment_intent_id, provider_event_id, account_code)
  WHERE journal_id IS NOT NULL;
CREATE INDEX financial_ledgers_journal_id_idx
  ON public.financial_ledgers (journal_id)
  WHERE journal_id IS NOT NULL;

CREATE FUNCTION public.validate_financial_ledger_journal()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  entry_count bigint;
  debit_total numeric;
  credit_total numeric;
  currency_count bigint;
  intent_count bigint;
  event_count bigint;
BEGIN
  SELECT count(*), coalesce(sum(entry.debit_minor_units), 0),
         coalesce(sum(entry.credit_minor_units), 0),
         count(DISTINCT entry.currency), count(DISTINCT entry.payment_intent_id),
         count(DISTINCT entry.provider_event_id)
  INTO entry_count, debit_total, credit_total, currency_count, intent_count, event_count
  FROM public.financial_ledgers AS entry
  WHERE entry.journal_id = NEW.journal_id;

  IF entry_count < 2 OR debit_total <= 0 OR debit_total <> credit_total
    OR currency_count <> 1 OR intent_count <> 1 OR event_count <> 1 THEN
    RAISE EXCEPTION 'Financial journal % is incomplete or unbalanced', NEW.journal_id
      USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_financial_ledger_journal()
  FROM PUBLIC, anon, authenticated, service_role;

CREATE CONSTRAINT TRIGGER financial_ledgers_journal_balanced
  AFTER INSERT ON public.financial_ledgers
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW
  WHEN (NEW.journal_id IS NOT NULL)
  EXECUTE FUNCTION public.validate_financial_ledger_journal();

CREATE FUNCTION public.protect_financial_ledger_entries()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Financial ledger rows are append-only'
      USING ERRCODE = '55000';
  END IF;

  IF OLD.journal_id IS NOT NULL OR OLD.status = 'posted'
    OR NEW.journal_id IS NOT NULL
    OR NEW.amount IS DISTINCT FROM OLD.amount
    OR NEW.total_amount IS DISTINCT FROM OLD.total_amount
    OR NEW.remaining_amount IS DISTINCT FROM OLD.remaining_amount
    OR NEW.currency IS DISTINCT FROM OLD.currency
    OR NEW.payment_intent_id IS DISTINCT FROM OLD.payment_intent_id
    OR NEW.provider_event_id IS DISTINCT FROM OLD.provider_event_id
    OR NEW.account_code IS DISTINCT FROM OLD.account_code
    OR NEW.debit_minor_units IS DISTINCT FROM OLD.debit_minor_units
    OR NEW.credit_minor_units IS DISTINCT FROM OLD.credit_minor_units
    OR NEW.idempotency_key IS DISTINCT FROM OLD.idempotency_key THEN
    RAISE EXCEPTION 'Posted or financial ledger data is immutable'
      USING ERRCODE = '55000';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_financial_ledger_entries()
  FROM PUBLIC, anon, authenticated, service_role;
CREATE TRIGGER financial_ledgers_append_only
  BEFORE UPDATE OR DELETE ON public.financial_ledgers
  FOR EACH ROW EXECUTE FUNCTION public.protect_financial_ledger_entries();

REVOKE INSERT, UPDATE, DELETE ON TABLE public.financial_ledgers
  FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT ON TABLE public.financial_ledgers TO authenticated, service_role;

COMMIT;
