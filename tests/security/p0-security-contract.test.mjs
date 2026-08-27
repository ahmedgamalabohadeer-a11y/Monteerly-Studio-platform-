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
  assert.match(paymobWebhook, /status: 503/);
  assert.doesNotMatch(paymobWebhook, /req\.json|emails\/send/);
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
    const elevatedUse = contents.indexOf('supabaseAdmin');
    const authGuard = Math.max(
      contents.indexOf('requireSystemRole'),
      contents.indexOf('requireUser'),
      contents.indexOf('withAuthGuard')
    );

    assert.notEqual(elevatedUse, -1, `${file} must contain elevated access`);
    assert.notEqual(authGuard, -1, `${file} must contain a server guard`);
  }
});
