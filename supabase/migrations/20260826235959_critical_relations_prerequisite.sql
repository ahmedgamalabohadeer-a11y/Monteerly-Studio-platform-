-- Additive prerequisites required by the immutable 20260827000000 RLS migration.
-- Historical migrations are not edited. Replay only on a disposable local DB.
BEGIN;

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL DEFAULT auth.uid()
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text,
  project_name text NOT NULL DEFAULT 'Untitled project',
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  last_update timestamptz,
  production_status text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX projects_client_id_idx ON public.projects(client_id);

CREATE TABLE public.production_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL DEFAULT auth.uid()
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text,
  project_name text NOT NULL DEFAULT 'Untitled project',
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
  production_status text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  last_update timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX production_projects_client_id_idx
  ON public.production_projects(client_id);

CREATE TABLE public.financial_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  amount numeric(18,2) NOT NULL,
  currency text NOT NULL DEFAULT 'EGP'
    CHECK (currency ~ '^[A-Z]{3}$'),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'held', 'released', 'refunded', 'failed')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX financial_transactions_project_id_idx
  ON public.financial_transactions(project_id);
CREATE INDEX financial_transactions_user_id_idx
  ON public.financial_transactions(user_id);

CREATE TABLE public.security_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action text NOT NULL CHECK (length(btrim(action)) > 0),
  resource_type text NOT NULL CHECK (length(btrim(resource_type)) > 0),
  resource_id uuid,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX security_audit_logs_actor_created_idx
  ON public.security_audit_logs(actor_id, created_at DESC);
CREATE INDEX security_audit_logs_resource_idx
  ON public.security_audit_logs(resource_type, resource_id, created_at DESC);

COMMIT;
