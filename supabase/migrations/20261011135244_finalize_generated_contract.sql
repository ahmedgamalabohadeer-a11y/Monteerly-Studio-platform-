-- Atomic service-role boundary for generated contract finalization.
BEGIN;

CREATE OR REPLACE FUNCTION public.finalize_generated_contract(
  p_actor_id uuid,
  p_contract_type text,
  p_client_name text,
  p_contract_value numeric,
  p_delivery_date date,
  p_ai_content text
)
RETURNS TABLE(legal_contract_id uuid, production_project_id uuid)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  created_legal_id uuid;
  created_project_id uuid;
BEGIN
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

  INSERT INTO public.legal_contracts (
    contract_type, contract_value, currency, client_name,
    delivery_date, ai_content, status, metadata
  ) VALUES (
    p_contract_type, p_contract_value, 'USD', p_client_name,
    p_delivery_date, p_ai_content, 'signed', '{}'::jsonb
  ) RETURNING id INTO created_legal_id;

  INSERT INTO public.production_projects (
    client_id, title, project_name, status, production_status,
    metadata, contract_id
  ) VALUES (
    p_actor_id, NULL,
    CASE WHEN p_contract_type = 'service'
      THEN 'إنتاج: ' || p_client_name
      ELSE 'مشروع NDA: ' || p_client_name
    END,
    'draft', 'pending', '{}'::jsonb, created_legal_id
  ) RETURNING id INTO created_project_id;

  INSERT INTO public.financial_ledgers (
    transaction_id, project_id, user_id, contract_id, amount,
    total_amount, remaining_amount, client_name, currency, status,
    payment_status, due_date, metadata
  ) VALUES (
    NULL, created_project_id, p_actor_id, created_legal_id,
    p_contract_value, p_contract_value, p_contract_value,
    p_client_name, 'USD', 'pending', 'pending', p_delivery_date,
    jsonb_build_object('origin', 'generated_contract', 'financial_effect', false)
  );

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_actor_id, 'generated_contract_finalized', 'legal_contract',
    created_legal_id,
    jsonb_build_object(
      'contract_type', p_contract_type,
      'contract_value', p_contract_value,
      'currency', 'USD',
      'production_project_id', created_project_id
    )
  );

  RETURN QUERY SELECT created_legal_id, created_project_id;
END;
$$;

REVOKE ALL ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text
) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.finalize_generated_contract(
  uuid, text, text, numeric, date, text
) TO service_role;

COMMIT;
