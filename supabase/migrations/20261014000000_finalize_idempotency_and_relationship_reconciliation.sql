-- Reconcile relationships, add idempotency, and update finalization status.
-- Targets the disposable local database.
BEGIN;

-- 1. Add idempotency key to legal_contracts.
ALTER TABLE public.legal_contracts
  ADD COLUMN idempotency_key uuid UNIQUE;

-- 2. Adjust financial_ledgers FKs to point to canonical entities as per latest owner contract.
-- We keep the old columns but add the canonical ones to avoid breaking existing data during transition.
-- The owner specifically requested project_id -> projects and contract_id -> contracts.
-- Currently financial_ledgers.project_id points to production_projects and contract_id points to legal_contracts.

ALTER TABLE public.financial_ledgers
  RENAME COLUMN project_id TO implementation_project_id;
ALTER TABLE public.financial_ledgers
  RENAME COLUMN contract_id TO implementation_contract_id;

ALTER TABLE public.financial_ledgers
  ADD COLUMN project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  ADD COLUMN contract_id uuid REFERENCES public.contracts(id) ON DELETE SET NULL;

CREATE INDEX financial_ledgers_canonical_project_id_idx ON public.financial_ledgers(project_id);
CREATE INDEX financial_ledgers_canonical_contract_id_idx ON public.financial_ledgers(contract_id);

-- 3. Adjust production_projects.contract_id to point to contracts(id).
-- Currently it points to legal_contracts(id).
ALTER TABLE public.production_projects
  RENAME COLUMN contract_id TO implementation_contract_id;

ALTER TABLE public.production_projects
  ADD COLUMN contract_id uuid REFERENCES public.contracts(id) ON DELETE SET NULL;

CREATE INDEX production_projects_canonical_contract_id_idx ON public.production_projects(contract_id);

-- 4. Add canonical link to production_projects.
ALTER TABLE public.production_projects
  ADD COLUMN project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL;

CREATE INDEX production_projects_project_id_idx ON public.production_projects(project_id);

-- 5. Update the finalization RPC to be idempotent and canonical.
CREATE OR REPLACE FUNCTION public.finalize_generated_contract(
  p_actor_id uuid,
  p_contract_type text,
  p_client_name text,
  p_contract_value numeric,
  p_delivery_date date,
  p_ai_content text,
  p_idempotency_key uuid DEFAULT NULL
)
RETURNS TABLE(legal_contract_id uuid, production_project_id uuid, canonical_contract_id uuid, canonical_project_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  created_legal_id uuid;
  created_project_id uuid;
  created_canonical_contract_id uuid;
  created_canonical_project_id uuid;
  existing_legal_id uuid;
  existing_project_id uuid;
BEGIN
  -- Idempotency check.
  IF p_idempotency_key IS NOT NULL THEN
    SELECT
      l.id, p.id, l.contract_id, p.project_id
    INTO
      existing_legal_id, existing_project_id, created_canonical_contract_id, created_canonical_project_id
    FROM public.legal_contracts l
    LEFT JOIN public.production_projects p ON p.implementation_contract_id = l.id
    WHERE l.idempotency_key = p_idempotency_key;

    IF existing_legal_id IS NOT NULL THEN
      RETURN QUERY SELECT existing_legal_id, existing_project_id, created_canonical_contract_id, created_canonical_project_id;
      RETURN;
    END IF;
  END IF;

  -- Validation.
  IF p_actor_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM auth.users AS auth_user WHERE auth_user.id = p_actor_id
  ) THEN
    RAISE EXCEPTION 'Authenticated actor is required';
  END IF;
  IF p_contract_type NOT IN ('nda', 'service') THEN
    RAISE EXCEPTION 'Invalid contract type';
  END IF;
  IF p_client_name IS NULL OR length(btrim(p_client_name)) NOT BETWEEN 1 AND 160 THEN
    RAISE EXCEPTION 'Invalid client name';
  END IF;
  IF p_contract_value IS NULL OR p_contract_value <= 0
    OR p_contract_value > 1000000000
    OR scale(p_contract_value) > 2 THEN
    RAISE EXCEPTION 'Invalid negotiated contract value';
  END IF;
  IF p_delivery_date IS NULL OR p_ai_content IS NULL
    OR length(btrim(p_ai_content)) NOT BETWEEN 1 AND 50000 THEN
    RAISE EXCEPTION 'Invalid contract content or delivery date';
  END IF;

  -- 1. Create Canonical Project.
  INSERT INTO public.projects (
    client_id, project_name, status
  ) VALUES (
    p_actor_id,
    CASE WHEN p_contract_type = 'service'
      THEN 'مشروع: ' || p_client_name
      ELSE 'NDA: ' || p_client_name
    END,
    'active'
  ) RETURNING id INTO created_canonical_project_id;

  -- 2. Create Canonical Contract.
  INSERT INTO public.contracts (
    project_id, client_id, title, contract_type, status
  ) VALUES (
    created_canonical_project_id, p_actor_id,
    CASE WHEN p_contract_type = 'service' THEN 'عقد خدمات' ELSE 'اتفاقية عدم إفصاح' END,
    p_contract_type, 'draft' -- Status starts as draft per latest decision.
  ) RETURNING id INTO created_canonical_contract_id;

  -- 3. Create Implementation (Legal) Contract.
  INSERT INTO public.legal_contracts (
    contract_id, project_id, contract_type, contract_value, currency,
    client_name, delivery_date, ai_content, status, metadata, idempotency_key
  ) VALUES (
    created_canonical_contract_id, created_canonical_project_id,
    p_contract_type, p_contract_value, 'USD', p_client_name,
    p_delivery_date, p_ai_content, 'draft', -- Status starts as draft.
    '{}'::jsonb, p_idempotency_key
  ) RETURNING id INTO created_legal_id;

  -- 4. Create Production Project.
  INSERT INTO public.production_projects (
    client_id, project_id, title, project_name, status, production_status,
    metadata, implementation_contract_id, contract_id
  ) VALUES (
    p_actor_id, created_canonical_project_id, NULL,
    CASE WHEN p_contract_type = 'service'
      THEN 'إنتاج: ' || p_client_name
      ELSE 'مشروع NDA: ' || p_client_name
    END,
    'draft', 'pending', '{}'::jsonb, created_legal_id, created_canonical_contract_id
  ) RETURNING id INTO created_project_id;

  -- 5. Create Financial Ledger with both Implementation and Canonical links.
  INSERT INTO public.financial_ledgers (
    transaction_id, implementation_project_id, project_id, user_id,
    implementation_contract_id, contract_id, amount,
    total_amount, remaining_amount, client_name, currency, status,
    payment_status, due_date, metadata
  ) VALUES (
    NULL, created_project_id, created_canonical_project_id, p_actor_id,
    created_legal_id, created_canonical_contract_id,
    p_contract_value, p_contract_value, p_contract_value,
    p_client_name, 'USD', 'pending', 'pending', p_delivery_date,
    jsonb_build_object('origin', 'generated_contract', 'financial_effect', false)
  );

  -- 6. Audit Log.
  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_actor_id, 'generated_contract_finalized', 'legal_contract',
    created_legal_id,
    jsonb_build_object(
      'contract_type', p_contract_type,
      'contract_value', p_contract_value,
      'currency', 'USD',
      'production_project_id', created_project_id,
      'canonical_contract_id', created_canonical_contract_id,
      'canonical_project_id', created_canonical_project_id,
      'idempotency_key', p_idempotency_key
    )
  );

  RETURN QUERY SELECT created_legal_id, created_project_id, created_canonical_contract_id, created_canonical_project_id;
END;
$$;

COMMIT;
