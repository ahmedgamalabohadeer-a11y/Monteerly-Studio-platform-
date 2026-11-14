-- Post-containment authorization. Privileged role checks are confined to the
-- private schema and all client policies use verified auth.uid() ownership.
BEGIN;

CREATE SCHEMA IF NOT EXISTS mcos_private;
REVOKE ALL ON SCHEMA mcos_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA mcos_private TO authenticated;

CREATE OR REPLACE FUNCTION mcos_private.has_system_role(p_roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1
    FROM public.user_system_roles AS role_record
    WHERE role_record.user_id = (SELECT auth.uid())
      AND role_record.system_role = ANY(p_roles)
  );
$$;

CREATE OR REPLACE FUNCTION mcos_private.can_manage_project_members(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM public.production_projects AS project_record
      WHERE project_record.id = p_project_id
        AND project_record.client_id = (SELECT auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM public.production_project_members AS member_record
      WHERE member_record.project_id = p_project_id
        AND member_record.user_id = (SELECT auth.uid())
        AND member_record.status = 'active'
        AND (
          member_record.role = 'owner'
          OR member_record.capabilities @> '["manage_members"]'::jsonb
        )
    )
  );
$$;

CREATE OR REPLACE FUNCTION mcos_private.can_access_production_project(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (
      SELECT 1 FROM public.production_projects AS project_record
      WHERE project_record.id = p_project_id
        AND project_record.client_id = (SELECT auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM public.production_project_members AS member_record
      WHERE member_record.project_id = p_project_id
        AND member_record.user_id = (SELECT auth.uid())
        AND member_record.status = 'active'
    )
  );
$$;

CREATE OR REPLACE FUNCTION mcos_private.can_access_contract(p_contract_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1
    FROM public.contracts AS contract_record
    LEFT JOIN public.projects AS project_record
      ON project_record.id = contract_record.project_id
    WHERE contract_record.id = p_contract_id
      AND (
        contract_record.client_id = (SELECT auth.uid())
        OR project_record.client_id = (SELECT auth.uid())
        OR EXISTS (
          SELECT 1
          FROM public.legal_contracts AS legal_record
          JOIN public.production_projects AS production_record
            ON production_record.contract_id = legal_record.id
          WHERE legal_record.contract_id = contract_record.id
            AND mcos_private.can_access_production_project(production_record.id)
        )
      )
  );
$$;

CREATE OR REPLACE FUNCTION mcos_private.can_manage_contract(p_contract_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1
    FROM public.contracts AS contract_record
    LEFT JOIN public.projects AS project_record
      ON project_record.id = contract_record.project_id
    WHERE contract_record.id = p_contract_id
      AND (
        contract_record.client_id = (SELECT auth.uid())
        OR project_record.client_id = (SELECT auth.uid())
        OR EXISTS (
          SELECT 1
          FROM public.legal_contracts AS legal_record
          JOIN public.production_projects AS production_record
            ON production_record.contract_id = legal_record.id
          WHERE legal_record.contract_id = contract_record.id
            AND (
              production_record.client_id = (SELECT auth.uid())
              OR EXISTS (
                SELECT 1
                FROM public.production_project_members AS member_record
                WHERE member_record.project_id = production_record.id
                  AND member_record.user_id = (SELECT auth.uid())
                  AND member_record.status = 'active'
                  AND (
                    member_record.role = 'owner'
                    OR member_record.capabilities @> '["manage_contracts"]'::jsonb
                  )
              )
            )
        )
      )
  );
$$;

CREATE OR REPLACE FUNCTION mcos_private.can_access_legal_contract(p_legal_contract_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.legal_contracts AS legal_record
    WHERE legal_record.id = p_legal_contract_id
      AND (
        (legal_record.contract_id IS NOT NULL
          AND mcos_private.can_access_contract(legal_record.contract_id))
        OR (legal_record.project_id IS NOT NULL
          AND EXISTS (
            SELECT 1 FROM public.projects AS project_record
            WHERE project_record.id = legal_record.project_id
              AND project_record.client_id = (SELECT auth.uid())
          ))
        OR EXISTS (
          SELECT 1 FROM public.production_projects AS production_record
          WHERE production_record.contract_id = legal_record.id
            AND mcos_private.can_access_production_project(production_record.id)
        )
      )
  );
$$;

REVOKE ALL ON FUNCTION mcos_private.has_system_role(text[])
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.can_manage_project_members(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.can_access_production_project(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.can_access_contract(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.can_manage_contract(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
REVOKE ALL ON FUNCTION mcos_private.can_access_legal_contract(uuid)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION mcos_private.has_system_role(text[])
  TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.can_manage_project_members(uuid)
  TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.can_access_production_project(uuid)
  TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.can_access_contract(uuid)
  TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.can_manage_contract(uuid)
  TO authenticated;
GRANT EXECUTE ON FUNCTION mcos_private.can_access_legal_contract(uuid)
  TO authenticated;

CREATE OR REPLACE FUNCTION public.manage_production_project_member(
  p_actor_id uuid,
  p_operation text,
  p_project_id uuid,
  p_user_id uuid,
  p_role text DEFAULT NULL,
  p_capabilities jsonb DEFAULT '[]'::jsonb,
  p_status text DEFAULT 'active'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  actor_is_client boolean;
  actor_is_manager boolean;
  actor_is_project_owner boolean;
  target_role text;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM public.production_projects AS project_record
    WHERE project_record.id = p_project_id
      AND project_record.client_id = p_actor_id
  ) INTO actor_is_client;

  SELECT coalesce(bool_or(
    member_record.status = 'active'
    AND (
      member_record.role = 'owner'
      OR member_record.capabilities @> '["manage_members"]'::jsonb
    )
  ), false), coalesce(bool_or(
    member_record.status = 'active'
    AND member_record.role = 'owner'
  ), false)
  INTO actor_is_manager, actor_is_project_owner
  FROM public.production_project_members AS member_record
  WHERE member_record.project_id = p_project_id
    AND member_record.user_id = p_actor_id;

  IF p_actor_id IS NULL OR p_user_id IS NULL
    OR NOT (actor_is_client OR actor_is_manager) THEN
    RAISE EXCEPTION 'Project membership capability required';
  END IF;

  IF p_operation = 'delete' THEN
    IF NOT actor_is_client AND p_actor_id = p_user_id THEN
      RAISE EXCEPTION 'A delegated member cannot remove itself';
    END IF;

    SELECT role INTO target_role
    FROM public.production_project_members
    WHERE project_id = p_project_id AND user_id = p_user_id;
    IF target_role = 'owner' AND NOT actor_is_client
      AND NOT actor_is_project_owner THEN
      RAISE EXCEPTION 'Project owner membership requires project-client authority';
    END IF;

    DELETE FROM public.production_project_members
    WHERE project_id = p_project_id AND user_id = p_user_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Project membership not found';
    END IF;

    INSERT INTO public.security_audit_logs (
      actor_id, action, resource_type, metadata
    ) VALUES (
      p_actor_id, 'project_member_deleted', 'production_project_member',
      jsonb_build_object('project_id', p_project_id, 'user_id', p_user_id)
    );
    RETURN;
  END IF;

  IF p_operation <> 'upsert'
    OR p_role IS NULL
    OR p_role NOT IN ('owner', 'member', 'viewer')
    OR p_status IS NULL
    OR p_status NOT IN ('active', 'invited', 'removed')
    OR p_capabilities IS NULL
    OR jsonb_typeof(p_capabilities) <> 'array' THEN
    RAISE EXCEPTION 'Invalid project membership input';
  END IF;
  IF p_role = 'owner' AND NOT actor_is_client THEN
    RAISE EXCEPTION 'Only project client can assign owner role';
  END IF;
  IF NOT actor_is_client AND p_actor_id = p_user_id THEN
    RAISE EXCEPTION 'A delegated member cannot change its own membership';
  END IF;

  SELECT role INTO target_role
  FROM public.production_project_members
  WHERE project_id = p_project_id AND user_id = p_user_id;
  IF target_role = 'owner' AND NOT actor_is_client
    AND NOT actor_is_project_owner THEN
    RAISE EXCEPTION 'Project owner membership requires project-client authority';
  END IF;

  INSERT INTO public.production_project_members (
    project_id, user_id, role, capabilities, status
  ) VALUES (
    p_project_id, p_user_id, p_role, p_capabilities, p_status
  )
  ON CONFLICT (project_id, user_id) DO UPDATE
    SET role = EXCLUDED.role,
        capabilities = EXCLUDED.capabilities,
        status = EXCLUDED.status,
        updated_at = now();

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, metadata
  ) VALUES (
    p_actor_id, 'project_member_upserted', 'production_project_member',
    jsonb_build_object(
      'project_id', p_project_id,
      'user_id', p_user_id,
      'role', p_role,
      'status', p_status
    )
  );
END;
$$;

REVOKE ALL ON FUNCTION public.manage_production_project_member(
  uuid, text, uuid, uuid, text, jsonb, text
) FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.manage_production_project_member(
  uuid, text, uuid, uuid, text, jsonb, text
) TO service_role;

-- Profiles: self row, safe column writes only, no client access to compliance data.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY profiles_authenticated_self_select
  ON public.profiles FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);
CREATE POLICY profiles_authenticated_self_update
  ON public.profiles FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id);
REVOKE ALL ON TABLE public.profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO service_role;
REVOKE UPDATE (account_type, tax_id, metadata, email, role, document_id,
  document_type, kyc_status, kyc_submitted_at)
  ON TABLE public.profiles FROM authenticated;
GRANT UPDATE (full_name, avatar_url, bio, experience_years)
  ON TABLE public.profiles TO authenticated;

-- Projects: owner-only CRUD; project creation binds the caller through auth.uid().
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view projects they own" ON public.projects;
CREATE POLICY projects_owner_select
  ON public.projects FOR SELECT TO authenticated
  USING (client_id = (SELECT auth.uid()));
CREATE POLICY projects_owner_insert
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (client_id = (SELECT auth.uid()));
CREATE POLICY projects_owner_update
  ON public.projects FOR UPDATE TO authenticated
  USING (client_id = (SELECT auth.uid()))
  WITH CHECK (client_id = (SELECT auth.uid()));
CREATE POLICY projects_owner_delete
  ON public.projects FOR DELETE TO authenticated
  USING (client_id = (SELECT auth.uid()));
REVOKE ALL ON TABLE public.projects FROM PUBLIC, anon, authenticated;
GRANT SELECT, DELETE ON TABLE public.projects TO authenticated;
GRANT INSERT (title, project_name, status, metadata)
  ON TABLE public.projects TO authenticated;
GRANT UPDATE (title, project_name, status, metadata, last_update, production_status)
  ON TABLE public.projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.projects TO service_role;

-- Production projects: member-aware SELECT, owner-only UPDATE/DELETE.
ALTER TABLE public.production_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view production projects" ON public.production_projects;
CREATE POLICY production_projects_member_select
  ON public.production_projects FOR SELECT TO authenticated
  USING (
    client_id = (SELECT auth.uid())
    OR mcos_private.can_access_production_project(id)
  );
CREATE POLICY production_projects_client_update
  ON public.production_projects FOR UPDATE TO authenticated
  USING (client_id = (SELECT auth.uid()))
  WITH CHECK (client_id = (SELECT auth.uid()));
CREATE POLICY production_projects_client_delete
  ON public.production_projects FOR DELETE TO authenticated
  USING (client_id = (SELECT auth.uid()));
REVOKE ALL ON TABLE public.production_projects FROM PUBLIC, anon, authenticated;
GRANT SELECT, DELETE ON TABLE public.production_projects TO authenticated;
GRANT UPDATE (title, project_name, status, production_status, metadata, last_update, updated_at)
  ON TABLE public.production_projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.production_projects TO service_role;

-- Membership: a project owner or active owner/manage_members member administers rows.
ALTER TABLE public.production_project_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY production_members_self_or_project_owner_select
  ON public.production_project_members FOR SELECT TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.production_projects AS project_record
      WHERE project_record.id = project_id
        AND project_record.client_id = (SELECT auth.uid())
    )
  );
REVOKE ALL ON TABLE public.production_project_members FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.production_project_members TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.production_project_members TO service_role;

-- Contracts/revisions: party/project ownership gates reads and revisions.
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY contracts_party_select
  ON public.contracts FOR SELECT TO authenticated
  USING (mcos_private.can_access_contract(id));
CREATE POLICY contracts_client_insert
  ON public.contracts FOR INSERT TO authenticated
  WITH CHECK (
    client_id = (SELECT auth.uid())
    AND status = 'draft'
    AND current_version = 1
  );
CREATE POLICY contracts_party_version_update
  ON public.contracts FOR UPDATE TO authenticated
  USING (mcos_private.can_manage_contract(id))
  WITH CHECK (mcos_private.can_manage_contract(id));
REVOKE ALL ON TABLE public.contracts FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.contracts TO authenticated;
GRANT INSERT (title, contract_type, status)
  ON TABLE public.contracts TO authenticated;
GRANT UPDATE (current_version) ON TABLE public.contracts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.contracts TO service_role;

ALTER TABLE public.contract_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY contract_revisions_party_select
  ON public.contract_revisions FOR SELECT TO authenticated
  USING (mcos_private.can_access_contract(contract_id));
CREATE POLICY contract_revisions_party_insert
  ON public.contract_revisions FOR INSERT TO authenticated
  WITH CHECK (mcos_private.can_manage_contract(contract_id));
REVOKE ALL ON TABLE public.contract_revisions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.contract_revisions TO authenticated;
GRANT INSERT (contract_id, version_number, content_url, changes_summary)
  ON TABLE public.contract_revisions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.contract_revisions TO service_role;

ALTER TABLE public.legal_contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY legal_contracts_party_select
  ON public.legal_contracts FOR SELECT TO authenticated
  USING (mcos_private.can_access_legal_contract(id));
REVOKE ALL ON TABLE public.legal_contracts FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.legal_contracts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.legal_contracts TO service_role;

-- Financial rows remain server-written. Ledger reads are limited to owner or
-- finance capability; audit reads are service-role-only and must pass an API.
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view transactions for their projects"
  ON public.financial_transactions;
CREATE POLICY financial_transactions_owner_select
  ON public.financial_transactions FOR SELECT TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR EXISTS (
      SELECT 1 FROM public.projects AS project_record
      WHERE project_record.id = project_id
        AND project_record.client_id = (SELECT auth.uid())
    )
  );
REVOKE ALL ON TABLE public.financial_transactions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.financial_transactions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.financial_transactions TO service_role;

ALTER TABLE public.financial_ledgers ENABLE ROW LEVEL SECURITY;
CREATE POLICY financial_ledgers_owner_select
  ON public.financial_ledgers FOR SELECT TO authenticated
  USING (
    user_id = (SELECT auth.uid())
    OR (SELECT mcos_private.has_system_role(ARRAY['admin', 'finance_operator']))
  );
REVOKE ALL ON TABLE public.financial_ledgers FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.financial_ledgers TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE public.financial_ledgers TO service_role;

CREATE OR REPLACE FUNCTION public.approve_financial_ledger(
  p_ledger_id uuid,
  p_actor_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  changed_rows integer;
BEGIN
  IF p_ledger_id IS NULL OR p_actor_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.user_system_roles AS role_record
    WHERE role_record.user_id = p_actor_id
      AND role_record.system_role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Admin approval is required to post a ledger';
  END IF;

  UPDATE public.financial_ledgers
  SET status = 'posted', updated_at = now()
  WHERE id = p_ledger_id AND status = 'pending';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN
    RAISE EXCEPTION 'Pending ledger not found';
  END IF;

  INSERT INTO public.security_audit_logs (
    actor_id, action, resource_type, resource_id, metadata
  ) VALUES (
    p_actor_id, 'financial_ledger_posted', 'financial_ledger', p_ledger_id,
    jsonb_build_object('approval_required', true)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.approve_financial_ledger(uuid, uuid)
  FROM PUBLIC, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.approve_financial_ledger(uuid, uuid)
  TO service_role;

CREATE OR REPLACE FUNCTION mcos_private.audit_contract_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.security_audit_logs (
      actor_id, action, resource_type, resource_id, metadata
    ) VALUES (
      auth.uid(), 'contract_status_changed', TG_TABLE_NAME, NEW.id,
      jsonb_build_object('from', OLD.status, 'to', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION mcos_private.audit_contract_status_change()
  FROM PUBLIC, anon, authenticated, service_role;

CREATE TRIGGER contracts_status_audit
  AFTER UPDATE OF status ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION mcos_private.audit_contract_status_change();
CREATE TRIGGER legal_contracts_status_audit
  AFTER UPDATE OF status ON public.legal_contracts
  FOR EACH ROW EXECUTE FUNCTION mcos_private.audit_contract_status_change();

ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.security_audit_logs;
REVOKE ALL ON TABLE public.security_audit_logs
  FROM PUBLIC, anon, authenticated, service_role;
GRANT SELECT, INSERT ON TABLE public.security_audit_logs TO service_role;
CREATE POLICY security_audit_service_select
  ON public.security_audit_logs FOR SELECT TO service_role USING (true);
CREATE POLICY security_audit_service_insert
  ON public.security_audit_logs FOR INSERT TO service_role WITH CHECK (true);

COMMIT;
