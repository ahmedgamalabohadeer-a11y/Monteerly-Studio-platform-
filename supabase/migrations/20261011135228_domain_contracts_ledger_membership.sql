-- Additive domain contracts. Depends on the two timestamp-ordered prerequisite
-- migrations and the immutable containment migration.
BEGIN;

CREATE TABLE public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  client_id uuid DEFAULT auth.uid()
    REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id uuid,
  title text,
  contract_type text,
  current_version integer NOT NULL DEFAULT 1 CHECK (current_version >= 1),
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'sent', 'signed', 'cancelled')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX contracts_project_id_idx ON public.contracts(project_id);
CREATE INDEX contracts_client_id_idx ON public.contracts(client_id);

CREATE TABLE public.contract_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid NOT NULL
    REFERENCES public.contracts(id) ON DELETE CASCADE,
  version_number integer NOT NULL DEFAULT 1 CHECK (version_number >= 1),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(payload) = 'object'),
  content_url text,
  changes_summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contract_revisions_contract_version_unique
    UNIQUE (contract_id, version_number)
);

CREATE INDEX contract_revisions_contract_id_idx
  ON public.contract_revisions(contract_id, version_number DESC);

CREATE TABLE public.legal_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid REFERENCES public.contracts(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  client_name text,
  delivery_date date,
  contract_type text,
  contract_value numeric(18,2)
    CHECK (contract_value IS NULL OR (contract_value > 0 AND contract_value <= 1000000000)),
  currency text NOT NULL DEFAULT 'USD' CHECK (currency = 'USD'),
  ai_content text,
  status text NOT NULL DEFAULT 'draft',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX legal_contracts_contract_id_idx ON public.legal_contracts(contract_id);
CREATE INDEX legal_contracts_project_id_idx ON public.legal_contracts(project_id);

ALTER TABLE public.production_projects
  ADD COLUMN contract_id uuid;

ALTER TABLE public.production_projects
  ADD CONSTRAINT production_projects_contract_id_fkey
  FOREIGN KEY (contract_id)
  REFERENCES public.legal_contracts(id) ON DELETE SET NULL;

CREATE INDEX production_projects_contract_id_idx
  ON public.production_projects(contract_id);

CREATE TABLE public.production_project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL
    REFERENCES public.production_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'member', 'viewer')),
  capabilities jsonb NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(capabilities) = 'array'),
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'invited', 'removed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT production_project_members_project_user_unique
    UNIQUE (project_id, user_id)
);

CREATE INDEX production_project_members_user_status_idx
  ON public.production_project_members(user_id, status);

CREATE TABLE public.financial_ledgers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid
    REFERENCES public.financial_transactions(id) ON DELETE SET NULL,
  project_id uuid
    REFERENCES public.production_projects(id) ON DELETE SET NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  contract_id uuid
    REFERENCES public.legal_contracts(id) ON DELETE SET NULL,
  amount numeric(18,2) DEFAULT 0,
  total_amount numeric(18,2) DEFAULT 0,
  remaining_amount numeric(18,2) DEFAULT 0,
  client_name text,
  currency text NOT NULL DEFAULT 'USD' CHECK (currency = 'USD'),
  status text DEFAULT 'pending'
    CHECK (status IN ('pending', 'posted', 'reversed')),
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date date,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX financial_ledgers_transaction_id_idx
  ON public.financial_ledgers(transaction_id);
CREATE INDEX financial_ledgers_project_id_idx
  ON public.financial_ledgers(project_id);
CREATE INDEX financial_ledgers_user_id_idx
  ON public.financial_ledgers(user_id);
CREATE INDEX financial_ledgers_contract_id_idx
  ON public.financial_ledgers(contract_id);

COMMIT;
