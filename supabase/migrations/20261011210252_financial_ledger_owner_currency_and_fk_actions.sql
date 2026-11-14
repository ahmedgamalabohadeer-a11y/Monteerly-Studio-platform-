-- Align ledger-wide defaults and explicit FK delete behavior with the latest
-- owner field contract. Existing ledger values are not rewritten.
BEGIN;

ALTER TABLE public.financial_ledgers
  ALTER COLUMN currency SET DEFAULT 'EGP';

ALTER TABLE public.financial_ledgers
  DROP CONSTRAINT IF EXISTS financial_ledgers_currency_check;

ALTER TABLE public.financial_ledgers
  DROP CONSTRAINT IF EXISTS financial_ledgers_transaction_id_fkey,
  ADD CONSTRAINT financial_ledgers_transaction_id_fkey
    FOREIGN KEY (transaction_id)
    REFERENCES public.financial_transactions(id) ON DELETE CASCADE;

ALTER TABLE public.financial_ledgers
  DROP CONSTRAINT IF EXISTS financial_ledgers_user_id_fkey,
  ADD CONSTRAINT financial_ledgers_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.profiles(id);

COMMIT;
