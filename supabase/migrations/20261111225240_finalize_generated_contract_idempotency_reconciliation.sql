-- Replace both finalizer signatures with one required-key RPC.
-- The earlier migrations remain immutable; this migration repairs their result.
-- The known disposable Docker API was unavailable for ledger verification, so
-- the potentially applied 2026-10-14 file is preserved and corrected forward.
BEGIN;

DROP FUNCTION IF EXISTS public.finalize_generated_contract(
  uuid, text, text, numeric, date, text
);
DROP FUNCTION IF EXISTS public.finalize_generated_contract(
  uuid, text, text, numeric, date, text, uuid
);

CREATE FUNCTION public.finalize_generated_contract(
  p_actor_id uuid,
  p_contract_type text,
  p_client_name text,
  p_contract_value numeric,
  p_delivery_date date,
  p_ai_content text,
  p_idempotency_key uuid
)
RETURNS TABLE(success boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  existing_legal_id uuid;
  existing_contract_id uuid;
  existing_project_id uuid;
  existing_actor_id uuid;
  existing_type text;
  existing_client_name text;
  existing_value numeric;
  existing_delivery_date date;
  existing_content text;
  created_project_id uuid;
  created_contract_id uuid;
  created_legal_id uuid;
  created_production_project_id uuid;
BEGIN
  -- The server action authenticates with requireUser() before calling this
  -- service-role-only RPC. Validate the actor before looking up any old result.
  IF p_actor_id IS NULL OR NOT EXISTS (
    SELECT 1
    FROM auth.users AS auth_user
    JOIN public.profiles AS profile ON profile.id = auth_user.id
    WHERE auth_user.id = p_actor_id
  ) THEN
    RAISE EXCEPTION USING
      ERRCODE = '42501',
      MESSAGE = 'Contract finalization request is not authorized';
  END IF;

  IF p_idempotency_key IS NULL
    OR p_contract_type IS NULL
    OR p_contract_type NOT IN ('nda', 'service')
    OR p_client_name IS NULL
    OR length(btrim(p_client_name)) NOT BETWEEN 1 AND 160
    OR p_contract_value IS NULL
    OR p_contract_value <= 0
    OR p_contract_value > 1000000000
    OR scale(p_contract_value) > 2
    OR p_delivery_date IS NULL
    OR p_ai_content IS NULL
    OR length(btrim(p_ai_content)) NOT BETWEEN 1 AND 50000
  THEN
    RAISE EXCEPTION USING
      ERRCODE = '22023',
      MESSAGE = 'Contract finalization request is invalid';
  END IF;

  -- Serialize concurrent retries. The unique key remains authoritative;
  -- hash collisions only serialize otherwise unrelated requests.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_idempotency_key::text, 0)
  );

  IF EXISTS (
    SELECT 1
    FROM public.legal_contracts AS legal
    LEFT JOIN public.contracts AS canonical_contract
      ON canonical_contract.id = legal.contract_id
    WHERE legal.idempotency_key = p_idempotency_key
      AND canonical_contract.client_id IS DISTINCT FROM p_actor_id
  ) THEN
    RAISE EXCEPTION USING
      ERRCODE = '22023',
      MESSAGE = 'Contract finalization request conflicts with an existing request';
  END IF;

  SELECT
    legal.id,
    legal.contract_id,
    legal.project_id,
    canonical_contract.client_id,
    legal.contract_type,
    legal.client_name,
    legal.contract_value,
    legal.delivery_date,
    legal.ai_content
  INTO
    existing_legal_id,
    existing_contract_id,
    existing_project_id,
    existing_actor_id,
    existing_type,
    existing_client_name,
    existing_value,
    existing_delivery_date,
    existing_content
  FROM public.legal_contracts AS legal
  LEFT JOIN public.contracts AS canonical_contract
    ON canonical_contract.id = legal.contract_id
  WHERE legal.idempotency_key = p_idempotency_key
    AND canonical_contract.client_id = p_actor_id;

  IF existing_legal_id IS NOT NULL THEN
    IF existing_actor_id IS DISTINCT FROM p_actor_id
      OR existing_type IS DISTINCT FROM p_contract_type
      OR existing_client_name IS DISTINCT FROM btrim(p_client_name)
      OR existing_value IS DISTINCT FROM p_contract_value
      OR existing_delivery_date IS DISTINCT FROM p_delivery_date
      OR existing_content IS DISTINCT FROM btrim(p_ai_content)
      OR existing_contract_id IS NULL
      OR existing_project_id IS NULL
      OR NOT EXISTS (
        SELECT 1
        FROM public.contracts AS canonical_contract
        JOIN public.production_projects AS production
          ON production.implementation_contract_id = existing_legal_id
        WHERE canonical_contract.id = existing_contract_id
          AND canonical_contract.client_id = p_actor_id
          AND canonical_contract.project_id = existing_project_id
          AND production.contract_id = existing_contract_id
          AND production.project_id = existing_project_id
      )
      OR NOT EXISTS (
        SELECT 1
        FROM public.financial_ledgers AS ledger
        WHERE ledger.implementation_contract_id = existing_legal_id
          AND ledger.contract_id = existing_contract_id
          AND ledger.project_id = existing_project_id
      )
    THEN
      RAISE EXCEPTION USING
        ERRCODE = '22023',
        MESSAGE = 'Contract finalization request conflicts with an existing request';
    END IF;

    RETURN QUERY SELECT true;
    RETURN;
  END IF;

  INSERT INTO public.projects (
    client_id, title, project_name, status, metadata
  ) VALUES (
    p_actor_id,
    CASE WHEN p_contract_type = 'service' THEN 'عقد خدمات' ELSE 'اتفاقية عدم إفصاح' END,
    CASE WHEN p_contract_type = 'service'
      THEN 'مشروع: ' || btrim(p_client_name)
      ELSE 'NDA: ' || btrim(p_client_name)
    END,
    'draft',
    '{}'::jsonb
  ) RETURNING id INTO created_project_id;

  INSERT INTO public.contracts (
    project_id, client_id, title, contract_type, status
  ) VALUES (
    created_project_id,
    p_actor_id,
    CASE WHEN p_contract_type = 'service' THEN 'عقد خدمات' ELSE 'اتفاقية عدم إفصاح' END,
    p_contract_type,
    'draft'
  ) RETURNING id INTO created_contract_id;

  INSERT INTO public.legal_contracts (
    contract_id, project_id, contract_type, contract_value, currency,
    client_name, delivery_date, ai_content, status, metadata, idempotency_key
  ) VALUES (
    created_contract_id,
    created_project_id,
    p_contract_type,
    p_contract_value,
    'USD',
    btrim(p_client_name),
    p_delivery_date,
    btrim(p_ai_content),
    'draft',
    '{}'::jsonb,
    p_idempotency_key
  ) RETURNING id INTO created_legal_id;

  INSERT INTO public.production_projects (
    client_id, project_id, title, project_name, status, production_status,
    metadata, implementation_contract_id, contract_id
  ) VALUES (
    p_actor_id,
    created_project_id,
    NULL,
    CASE WHEN p_contract_type = 'service'
      THEN 'إنتاج: ' || btrim(p_client_name)
      ELSE 'مشروع NDA: ' || btrim(p_client_name)
    END,
    'draft',
    'pending',
    '{}'::jsonb,
    created_legal_id,
    created_contract_id
  ) RETURNING id INTO created_production_project_id;

  INSERT INTO public.financial_ledgers (
    transaction_id, implementation_project_id, project_id, user_id,
    implementation_contract_id, contract_id, amount, total_amount,
    remaining_amount, client_name, currency, status, payment_status,
    due_date, metadata
  ) VALUES (
    NULL,
    created_production_project_id,
    created_project_id,
    p_actor_id,
    created_legal_id,
    created_contract_id,
    p_contract_value,
    p_contract_value,
    p_contract_value,
    btrim(p_client_name),
    'USD',
    'pending',
    'pending',
    p_delivery_date,
    jsonb_build_object('origin', 'generated_contract', 'financial_effect', false)
  );

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_actor_id,
    'generated_contract_finalized',
    'legal_contract',
    created_legal_id,
    jsonb_build_object(
      'contract_type', p_contract_type,
      'contract_value', p_contract_value,
      'currency', 'USD',
      'production_project_id', created_production_project_id,
      'canonical_contract_id', created_contract_id,
      'canonical_project_id', created_project_id,
      'idempotency_key', p_idempotency_key
    )
  );

  RETURN QUERY SELECT true;
END;
$$;

REVOKE ALL ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text, uuid
) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text, uuid
) TO service_role;

COMMIT;
