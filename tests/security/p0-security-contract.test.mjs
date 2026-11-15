import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const repositoryRoot = new URL('../../', import.meta.url);

async function source(relativePath) {
  return readFile(new URL(relativePath, repositoryRoot), 'utf8');
}

test('corrective migration restores least-privilege role and profile access', async () => {
  const migration = await source(
    'supabase/migrations/20260827130000_p0_security_containment.sql'
  );

  assert.match(
    migration,
    /ALTER TABLE public\.user_system_roles ENABLE ROW LEVEL SECURITY/
  );
  assert.match(
    migration,
    /REVOKE ALL PRIVILEGES ON TABLE public\.user_system_roles[\s\S]*FROM PUBLIC, anon, authenticated/
  );
  assert.match(
    migration,
    /CREATE POLICY "Users can view own system_role"[\s\S]*auth\.uid\(\)\) = user_id/
  );
  assert.doesNotMatch(
    migration,
    /GRANT\s+SELECT\s+ON(?:\s+TABLE)?\s+public\.user_system_roles\s+TO\s+anon/i
  );
  assert.match(
    migration,
    /CREATE OR REPLACE FUNCTION public\.handle_new_user\(\)[\s\S]*SET search_path = ''/
  );
  assert.match(
    migration,
    /INSERT INTO public\.user_system_roles \(user_id, system_role\)[\s\S]*FROM auth\.users AS auth_user[\s\S]*ON CONFLICT \(user_id\) DO NOTHING/
  );
  assert.match(
    migration,
    /CREATE TRIGGER on_auth_user_system_role_created[\s\S]*EXECUTE FUNCTION public\.handle_new_user_system_role\(\)/
  );
  assert.match(
    migration,
    /CREATE TRIGGER on_auth_user_created[\s\S]*EXECUTE FUNCTION public\.handle_new_user\(\)/
  );
  assert.doesNotMatch(
    migration,
    /raw_user_meta_data->>'role'/
  );
  assert.match(
    migration,
    /REVOKE ALL PRIVILEGES ON TABLE public\.profiles[\s\S]*FROM PUBLIC, anon, authenticated/
  );
  assert.match(
    migration,
    /CREATE POLICY "Users can update own profile"[\s\S]*WITH CHECK/
  );
});

test('SQL verification exercises runtime own-row and mutation denial', async () => {
  const verification = await source('supabase/tests/p0_security_contract.sql');

  assert.match(verification, /SET LOCAL ROLE anon/);
  assert.match(verification, /SET LOCAL ROLE authenticated/);
  assert.match(verification, /user A must see only its own default role/);
  assert.match(verification, /user A unexpectedly read user B role/);
  assert.match(verification, /user A unexpectedly updated its system role/);
  assert.match(verification, /forged metadata must not change the default system role/);
  assert.match(verification, /ROLLBACK;/);
});

test('post-containment migration removes historical anonymous role access', async () => {
  const migration = await source(
    'supabase/migrations/20261011140242_close_legacy_role_anon_access_and_kyc_cleanup_claims.sql'
  );

  assert.match(migration, /ALTER TABLE public\.user_system_roles ENABLE ROW LEVEL SECURITY/);
  assert.match(migration, /FROM PUBLIC, anon, authenticated/);
  assert.match(migration, /CREATE POLICY "Users can view own system_role"/);
  assert.match(migration, /FROM pg_policies[\s\S]*DROP POLICY/);
  assert.match(migration, /GRANT SELECT ON TABLE public\.user_system_roles TO authenticated/);
});

test('KYC cleanup claims serialize legal holds and require a leased claim', async () => {
  const migration = await source(
    'supabase/migrations/20261011140242_close_legacy_role_anon_access_and_kyc_cleanup_claims.sql'
  );

  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /KYC object is under legal hold/);
  assert.match(migration, /KYC cleanup is in progress; hold request was not accepted/);
  assert.match(migration, /complete_kyc_object_cleanup/);
  assert.match(migration, /claim_until > now\(\)/);
});

test('KYC submission RPC binds actor, exact object path, state, and stored object', async () => {
  const [migration, verification] = await Promise.all([
    source('supabase/migrations/20261011205330_kyc_submission_path_object_validation.sql'),
    source('supabase/tests/p1_schema_security_contract.sql'),
  ]);

  assert.match(migration, /caller_id uuid := auth\.uid\(\)/);
  assert.match(migration, /secure-vault/);
  assert.match(migration, /\^kyc-docs\//);
  assert.match(migration, /p_document_type NOT IN \('national_id', 'passport'\)/);
  assert.match(migration, /FOR UPDATE/);
  assert.match(migration, /current_status NOT IN \('none', 'rejected'\)/);
  assert.match(migration, /FROM storage\.objects[\s\S]*bucket_id = 'secure-vault'[\s\S]*name = p_document_path/);
  assert.match(migration, /REVOKE ALL ON FUNCTION mcos_private\.submit_own_kyc/);
  assert.match(migration, /GRANT EXECUTE ON FUNCTION mcos_private\.submit_own_kyc\(text, text\)[\s\S]*TO authenticated/);
  assert.match(verification, /KYC RPC path validation returned an unexpected outcome/);
  assert.match(verification, /KYC RPC document type validation returned an unexpected outcome/);
  assert.match(verification, /KYC RPC did not reject a missing Storage object/);
  assert.match(verification, /KYC RPC did not reject duplicate pending submission/);
  assert.match(verification, /KYC RPC did not reject resubmission after approval/);
  assert.match(verification, /Rejected KYC profile could not submit a new audited attempt/);
  assert.match(verification, /Unauthorized KYC reviewer role was not rejected/);
  assert.match(verification, /Orphan cleanup selected an object linked to a valid KYC submission/);
});

test('KYC review download remains a role-gated, private server endpoint', async () => {
  const [route, migration, verification] = await Promise.all([
    source('src/app/api/admin/kyc/[profileId]/document/route.ts'),
    source('supabase/migrations/20261011135240_kyc_storage_lifecycle.sql'),
    source('supabase/tests/p1_schema_security_contract.sql'),
  ]);

  assert.match(route, /requireSystemRole\(\['admin', 'kyc_operator'\]\)/);
  assert.match(route, /supabaseAdmin\.storage[\s\S]*\.download\(profile\.document_id\)/);
  assert.match(route, /kyc_document_reviewed/);
  assert.doesNotMatch(route, /createSignedUrl|signedUrl|service_role/);
  assert.match(migration, /secure_vault_authenticated_read_boundary/);
  assert.match(migration, /secure_vault_anon_read_boundary/);
  assert.match(verification, /anon unexpectedly read KYC Storage metadata/);
  assert.match(verification, /Authenticated user read another KYC Storage object/);
  assert.match(verification, /KYC metadata is directly readable by client roles/);
});

test('Realtime assertions distinguish database RLS scope from event delivery', async () => {
  const [migration, verification] = await Promise.all([
    source('supabase/migrations/20261011135235_authorization_and_rls.sql'),
    source('supabase/tests/p1_schema_security_contract.sql'),
  ]);

  assert.match(migration, /can_access_production_project/);
  assert.match(migration, /member_record\.status = 'active'/);
  assert.match(verification, /Active project member could not read the project/);
  assert.match(verification, /Non-member unexpectedly read a production project/);
  assert.match(verification, /Project tables unexpectedly appear in a Realtime publication/);
  assert.match(verification, /End-to-end Realtime delivery remains unverified/);
});

test('Marketplace reads the safe projection and keeps rating separate from KYC', async () => {
  const [page, card] = await Promise.all([
    source('src/app/[locale]/marketplace/page.tsx'),
    source('src/components/marketplace/TalentCard.tsx'),
  ]);

  assert.match(page, /from\('published_freelancer_profiles'\)/);
  assert.doesNotMatch(page, /from\('profiles'\)[\s\S]*\.eq\('account_type', 'freelancer'\)/);
  assert.match(page, /rating=\{freelancer\.rating\}/);
  assert.match(page, /experienceYears=\{freelancer\.experience_years\}/);
  assert.doesNotMatch(page, /rating=\{[^}]*kyc_status/);
  assert.doesNotMatch(page, /(?:profileResult|talentResult)\.error\.message/);
  assert.match(card, /No reviews yet/);
  assert.match(card, /experienceYears/);
});

test('generated contract finalization uses one restricted idempotent RPC and draft links', async () => {
  const [action, component, signaturePad, migration, verification, concurrencyTest] = await Promise.all([
    source('src/app/[locale]/contracts/actions.ts'),
    source('src/components/legal/ContractWizard.tsx'),
    source('src/components/legal/SignaturePad.tsx'),
    source('supabase/migrations/20261111225240_finalize_generated_contract_idempotency_reconciliation.sql'),
    source('supabase/tests/p1_schema_security_contract.sql'),
    source('tests/security/generated-contract-concurrency.test.mjs'),
  ]);
  const finalizerAction = action.slice(
    action.indexOf('export async function finalizeGeneratedContract')
  );

  assert.match(action, /export async function issueGeneratedContractIdempotencyKey/);
  assert.match(action, /import \{ randomUUID \} from 'node:crypto'/);
  assert.match(finalizerAction, /supabaseAdmin\.rpc\('finalize_generated_contract'/);
  assert.match(finalizerAction, /p_idempotency_key: input\.idempotencyKey/);
  assert.match(finalizerAction, /return \{ success: true \}/);
  assert.match(finalizerAction, /تعذر إتمام طلب العقد\. يرجى المحاولة مرة أخرى/);
  assert.doesNotMatch(finalizerAction, /legal_contract_id|production_project_id|contractId|error\.message/);
  assert.match(component, /idempotencyKeyRef\.current/);
  assert.match(component, /finalizationInFlightRef/);
  assert.match(component, /issueGeneratedContractIdempotencyKey\(\)/);
  assert.match(component, /sessionStorage\.setItem\(pendingRequestKeyStorage, idempotencyKey\)/);
  assert.match(component, /مراجعة وحفظ المسودة/);
  assert.match(signaturePad, /حفظ المسودة/);
  assert.doesNotMatch(signaturePad, /اعتماد التوقيع وحفظ العقد/);
  assert.doesNotMatch(component, /err\.message|legal_contract_id|contractId/);
  assert.doesNotMatch(action, /from\('financial_ledgers'\)\.insert/);
  assert.equal(
    [...migration.matchAll(/CREATE FUNCTION public\.finalize_generated_contract\(/g)].length,
    1
  );
  assert.match(migration, /DROP FUNCTION IF EXISTS public\.finalize_generated_contract\([\s\S]*?date, text\n\);/);
  assert.match(migration, /DROP FUNCTION IF EXISTS public\.finalize_generated_contract\([\s\S]*?date, text, uuid\n\);/);
  assert.match(migration, /p_idempotency_key uuid\s*\)/);
  assert.doesNotMatch(migration, /p_idempotency_key uuid DEFAULT/);
  assert.ok(
    migration.indexOf('FROM auth.users AS auth_user') <
      migration.indexOf('FROM public.legal_contracts AS legal')
  );
  assert.match(migration, /pg_advisory_xact_lock/);
  assert.match(migration, /canonical_contract\.client_id IS DISTINCT FROM p_actor_id/);
  assert.match(migration, /INSERT INTO public\.projects[\s\S]*?\n    'draft',/);
  assert.match(migration, /INSERT INTO public\.contracts[\s\S]*?\n    'draft'\n  \) RETURNING id INTO created_contract_id/);
  assert.match(migration, /INSERT INTO public\.legal_contracts[\s\S]*?\n    'draft',/);
  assert.match(migration, /INSERT INTO public\.production_projects[\s\S]*?\n    'draft',/);
  assert.doesNotMatch(migration, /'signed'/);
  assert.match(migration, /production\.contract_id = existing_contract_id/);
  assert.match(migration, /production\.project_id = existing_project_id/);
  assert.match(migration, /INSERT INTO public\.financial_ledgers[\s\S]*?NULL[\s\S]*?'USD'[\s\S]*?'pending'/);
  assert.doesNotMatch(migration, /INSERT INTO public\.financial_transactions/);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.finalize_generated_contract/);
  assert.match(migration, /FROM PUBLIC, anon, authenticated, service_role/);
  assert.match(migration, /GRANT EXECUTE ON FUNCTION public\.finalize_generated_contract[\s\S]*?TO service_role/);
  assert.match(migration, /LANGUAGE plpgsql[\s\S]*SECURITY DEFINER/);
  assert.match(verification, /Identical idempotency retry created duplicate legal records/);
  assert.match(verification, /Idempotency key unexpectedly accepted a different payload/);
  assert.match(verification, /Another actor unexpectedly reused an existing key/);
  assert.match(verification, /Mid-finalization failure left partial contract records/);
  assert.match(verification, /Generated contract canonical links or draft states are incorrect/);
  assert.match(verification, /Contract finalization created an automatic financial transaction/);
  assert.match(concurrencyTest, /Promise\.all\(\[runPsql\(finalizeCall\), runPsql\(finalizeCall\)\]\)/);
  assert.match(concurrencyTest, /MCOS_LOCAL_DISPOSABLE_CONTAINER_ID/);
  assert.match(concurrencyTest, /MCOS_LOCAL_DISPOSABLE_DB_PORT/);
  assert.match(concurrencyTest, /MCOS_RUN_LOCAL_DISPOSABLE_CONCURRENCY_TEST === '1'/);
  assert.match(concurrencyTest, /t\.skip\('Explicit disposable-database opt-in and container are required'\)/);
});

test('ledger-wide currency default and selected FK actions match latest owner fields', async () => {
  const [migration, verification] = await Promise.all([
    source('supabase/migrations/20261011210252_financial_ledger_owner_currency_and_fk_actions.sql'),
    source('supabase/tests/p1_schema_security_contract.sql'),
  ]);

  assert.match(migration, /ALTER COLUMN currency SET DEFAULT 'EGP'/);
  assert.match(migration, /DROP CONSTRAINT IF EXISTS financial_ledgers_currency_check/);
  assert.match(migration, /financial_ledgers_transaction_id_fkey[\s\S]*ON DELETE CASCADE/);
  assert.match(migration, /financial_ledgers_user_id_fkey[\s\S]*REFERENCES public\.profiles\(id\);/);
  assert.match(verification, /Global financial ledger currency contract is not EGP-default/);
  assert.match(verification, /Financial ledger FK delete actions do not match latest owner contract/);
});

test('P0 safety reconciliation closes historical access and data-loss paths', async () => {
  const migration = await source(
    'supabase/migrations/20261115030000_p0_remote_apply_safety_reconciliation.sql'
  );

  assert.match(migration, /ALTER TABLE storage\.objects ENABLE ROW LEVEL SECURITY/);
  assert.match(migration, /FROM PUBLIC, anon, authenticated/);
  assert.match(migration, /GRANT SELECT, INSERT ON TABLE storage\.objects TO authenticated/);
  assert.match(migration, /GRANT SELECT ON TABLE storage\.objects TO service_role/);
  assert.match(migration, /UPDATE storage\.buckets[\s\S]*SET public = false/);
  assert.match(migration, /headline = NULL/);
  assert.match(migration, /skills = '\[\]'::jsonb/);
  assert.match(migration, /ON DELETE RESTRICT/);
  assert.match(migration, /REVOKE ALL ON FUNCTION public\.finalize_generated_contract/);
  assert.match(migration, /TO service_role/);
  assert.match(migration, /CREATE OR REPLACE FUNCTION public\.set_own_account_type/);
  assert.match(migration, /GRANT EXECUTE ON FUNCTION public\.set_own_account_type\(text\) TO authenticated/);
});

test('account-type self-service uses the validated RPC while direct profile writes stay restricted', async () => {
  const [authActions, onboardingActions] = await Promise.all([
    source('src/app/[locale]/auth/actions.ts'),
    source('src/app/[locale]/onboarding/actions.ts'),
  ]);
  const freelancerSetup = await source('src/app/[locale]/freelancer/setup/actions.ts');

  assert.match(authActions, /rpc\('set_own_account_type'/);
  assert.match(onboardingActions, /rpc\('set_own_account_type'/);
  assert.match(freelancerSetup, /rpc\('set_own_account_type'/);
  assert.doesNotMatch(
    onboardingActions,
    /\.update\(\{[\s\S]{0,250}account_type:\s*input\.accountType/
  );
  assert.doesNotMatch(
    freelancerSetup,
    /\.update\(\{[\s\S]{0,250}account_type:\s*'freelancer'/
  );
});

test('KYC self-service cannot write compliance decisions directly', async () => {
  const [action, onboarding] = await Promise.all([
    source('src/app/[locale]/kyc/kyc-actions.ts'),
    source('src/app/[locale]/onboarding/actions.ts'),
  ]);

  assert.match(action, /\.rpc\('submit_own_kyc'/);
  assert.doesNotMatch(action, /\.from\('profiles'\)\.(?:update|insert)/);
  assert.doesNotMatch(onboarding, /kyc_status\s*:/);
});

test('privileged and cost-bearing API boundaries fail closed', async () => {
  const [
    checkout,
    paymobWebhook,
    relay,
    storage,
    gemini,
    voice,
    emailSend,
    emailDelivery,
    brainRuntime,
  ] = await Promise.all([
    source('src/app/api/checkout/paymob/route.ts'),
    source('src/app/api/webhooks/paymob/route.ts'),
    source('src/app/api/agent/relay/route.ts'),
    source('src/app/api/storage/r2/route.ts'),
    source('src/app/api/ai/gemini/route.ts'),
    source('src/app/api/ai/voice/route.ts'),
    source('src/app/api/emails/send/route.ts'),
    source('src/app/api/emails/delivery/route.ts'),
    source('src/app/api/brain-runtime/route.ts'),
  ]);

  assert.match(checkout, /withAuthGuard/);
  assert.match(checkout, /status: 503/);
  assert.doesNotMatch(checkout, /accept\.paymob\.com/);
  assert.match(paymobWebhook, /handlePaymobWebhookRequest/);
  assert.match(paymobWebhook, /provider_events_inbox/);
  assert.match(paymobWebhook, /status: response\.status/);
  assert.doesNotMatch(relay, /mcos_super_secret_agent_key/);
  assert.match(relay, /if \(!secret\)/);
  assert.match(storage, /\.from\('orders'\)/);
  assert.match(storage, /order\.client_id !== user\.id/);
  assert.doesNotMatch(storage, /dummy/);

  for (const guardedSource of [
    gemini,
    voice,
    emailSend,
    emailDelivery,
    brainRuntime,
  ]) {
    assert.match(guardedSource, /withAuthGuard/);
  }
});

test('service-role callers authorize before elevated access', async () => {
  const files = [
    'src/app/[locale]/admin/actions.ts',
    'src/app/[locale]/admin/kyc/admin-kyc-actions.ts',
    'src/app/[locale]/disputes/dispute-actions.ts',
    'src/app/[locale]/studio/[projectId]/actions.ts',
    'src/app/api/finance/split/route.ts',
  ];

  for (const file of files) {
    const contents = await source(file);
    const functions = [...contents.matchAll(/export async function\s+\w+/g)];

    for (const [index, match] of functions.entries()) {
      const start = match.index;
      const end = functions[index + 1]?.index ?? contents.length;
      const functionBody = contents.slice(start, end);
      const elevatedUse = functionBody.search(/supabaseAdmin\s*\.from\(/);

      if (elevatedUse === -1) {
        continue;
      }

      const authGuard = functionBody.search(
        /(?:await requireSystemRole\(|await requireUser\(|return withAuthGuard\()/
      );

      assert.notEqual(authGuard, -1, `${file} must guard every elevated function`);
      assert.ok(
        authGuard < elevatedUse,
        `${file} must authorize before every elevated query`
      );
    }
  }
});

test('system roles have one validated authority path in server and client code', async () => {
  const [roles, serverAuth, apiGuard, proxy, roleContext, authActions, providers] =
    await Promise.all([
      source('src/lib/auth/systemRoles.ts'),
      source('src/lib/serverAuth.ts'),
      source('src/lib/security/apiGuard.ts'),
      source('src/proxy.ts'),
      source('src/lib/context/RoleContext.tsx'),
      source('src/app/[locale]/auth/actions.ts'),
      source('src/app/[locale]/providers.tsx'),
    ]);

  assert.match(roles, /export function isSystemRole/);
  assert.match(serverAuth, /isSystemRole\(roleRecord\?\.system_role\)/);
  assert.match(apiGuard, /isSystemRole\(roleRecord\?\.system_role\)/);
  assert.doesNotMatch(apiGuard, /as SystemRole/);
  assert.match(proxy, /isSystemRole\(roleData\?\.system_role\)/);
  assert.match(roleContext, /useAuth\(\)/);
  assert.match(roleContext, /isSystemRole\(roleData\?\.system_role\)/);
  assert.match(providers, /<AuthProvider>[\s\S]*<RoleProvider>/);
  assert.match(authActions, /redirect\('\/ar\/dashboard'\)/);
  assert.doesNotMatch(authActions, /redirect\('\/ar\/executive'\)/);
});
