import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

const container = process.env.MCOS_LOCAL_DISPOSABLE_DB_CONTAINER;
const expectedProject = process.env.MCOS_LOCAL_DISPOSABLE_PROJECT;
const expectedContainerId = process.env.MCOS_LOCAL_DISPOSABLE_CONTAINER_ID;
const expectedDbPort = process.env.MCOS_LOCAL_DISPOSABLE_DB_PORT;
const runDisposableConcurrencyTest =
  process.env.MCOS_RUN_LOCAL_DISPOSABLE_CONCURRENCY_TEST === '1';

function runPsql(sql) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'docker',
      [
        'exec', '-i', container, 'psql', '-X', '-A', '-t',
        '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres',
      ],
      { stdio: ['pipe', 'pipe', 'pipe'] }
    );
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8').on('data', (chunk) => { stdout += chunk; });
    child.stderr.setEncoding('utf8').on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(`local psql failed (${code}): ${stderr.trim()}`));
    });
    child.stdin.end(sql);
  });
}

test('concurrent retries with one request key create one generated-contract set', { timeout: 30_000 }, async (t) => {
  if (!runDisposableConcurrencyTest || !container) {
    t.skip('Explicit disposable-database opt-in and container are required');
    return;
  }

  assert.ok(expectedProject?.startsWith('mcos-local-disposable-'));
  assert.equal(container, `supabase_db_${expectedProject}`);
  assert.ok(expectedContainerId);
  assert.ok(expectedDbPort);

  const identity = execFileSync('docker', [
    'inspect', '--format',
    '{{.Id}}|{{index .Config.Labels "com.docker.compose.project"}}|{{json .NetworkSettings.Ports}}',
    container,
  ], { encoding: 'utf8' }).trim().split('|');
  assert.equal(identity[0], expectedContainerId);
  assert.equal(identity[1], expectedProject);
  const portMap = JSON.parse(identity[2]);
  assert.ok(portMap['5432/tcp']?.some((binding) =>
    binding.HostPort === expectedDbPort &&
    ['127.0.0.1', '::1'].includes(binding.HostIp)
  ));

  const actorId = randomUUID();
  const requestKey = randomUUID();
  const triggerSuffix = randomUUID().replaceAll('-', '');
  const triggerFunction = `mcos_test_idempotency_delay_${triggerSuffix}`;
  const triggerName = `mcos_test_idempotency_delay_${triggerSuffix}`;
  const fixtureName = `Concurrent request ${triggerSuffix}`;
  let fixtureSetupAttempted = false;

  const createFixture = `
    INSERT INTO auth.users (
      id, email, aud, role, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) VALUES (
      '${actorId}'::uuid,
      '${actorId}@example.invalid',
      'authenticated', 'authenticated', '{}'::jsonb, '{}'::jsonb, now(), now()
    );

    CREATE FUNCTION public.${triggerFunction}()
    RETURNS trigger
    LANGUAGE plpgsql
    SET search_path = ''
    AS $body$
    BEGIN
      IF NEW.idempotency_key = TG_ARGV[0]::uuid THEN
        PERFORM pg_catalog.pg_sleep(1);
      END IF;
      RETURN NEW;
    END;
    $body$;
    REVOKE ALL ON FUNCTION public.${triggerFunction}()
      FROM PUBLIC, anon, authenticated, service_role;
    CREATE TRIGGER ${triggerName}
      BEFORE INSERT ON public.legal_contracts
      FOR EACH ROW
      EXECUTE FUNCTION public.${triggerFunction}('${requestKey}');
  `;

  const finalizeCall = `
    SELECT success
    FROM public.finalize_generated_contract(
      '${actorId}'::uuid,
      'service',
      '${fixtureName}',
      1200.50,
      CURRENT_DATE + 30,
      'Concurrent local test draft',
      '${requestKey}'::uuid
    );
  `;

  try {
    fixtureSetupAttempted = true;
    await runPsql(createFixture);
    const results = await Promise.all([runPsql(finalizeCall), runPsql(finalizeCall)]);
    assert.deepEqual(results, ['t', 't']);

    const contractSetIsSingular = await runPsql(`
      SELECT (
        (SELECT count(*) FROM public.legal_contracts
          WHERE idempotency_key = '${requestKey}'::uuid) = 1
        AND (SELECT count(*) FROM public.projects
          WHERE client_id = '${actorId}'::uuid
            AND project_name = 'مشروع: ${fixtureName}' AND status = 'draft') = 1
        AND (SELECT count(*) FROM public.contracts AS canonical_contract
          JOIN public.legal_contracts AS legal
            ON legal.contract_id = canonical_contract.id
          WHERE legal.idempotency_key = '${requestKey}'::uuid
            AND canonical_contract.status = 'draft') = 1
        AND (SELECT count(*) FROM public.production_projects AS production
          JOIN public.legal_contracts AS legal
            ON legal.id = production.implementation_contract_id
          WHERE legal.idempotency_key = '${requestKey}'::uuid
            AND production.status = 'draft') = 1
        AND (SELECT count(*) FROM public.financial_ledgers AS ledger
          JOIN public.legal_contracts AS legal
            ON legal.id = ledger.implementation_contract_id
          WHERE legal.idempotency_key = '${requestKey}'::uuid
            AND ledger.status = 'pending'
            AND ledger.currency = 'USD'
            AND ledger.transaction_id IS NULL) = 1
      )::text;
    `);
    assert.equal(contractSetIsSingular, 'true');
  } finally {
    if (fixtureSetupAttempted) {
      await runPsql(`
        DROP TRIGGER IF EXISTS ${triggerName} ON public.legal_contracts;
        DROP FUNCTION IF EXISTS public.${triggerFunction}();
        DELETE FROM public.financial_ledgers
        WHERE implementation_contract_id IN (
          SELECT id FROM public.legal_contracts
          WHERE idempotency_key = '${requestKey}'::uuid
        );
        DELETE FROM public.production_projects
        WHERE implementation_contract_id IN (
          SELECT id FROM public.legal_contracts
          WHERE idempotency_key = '${requestKey}'::uuid
        );
        DELETE FROM public.security_audit_logs
        WHERE actor_id = '${actorId}'::uuid
          AND metadata->>'idempotency_key' = '${requestKey}';
        DELETE FROM public.legal_contracts
        WHERE idempotency_key = '${requestKey}'::uuid;
        DELETE FROM public.contracts
        WHERE client_id = '${actorId}'::uuid;
        DELETE FROM public.projects
        WHERE client_id = '${actorId}'::uuid;
        DELETE FROM auth.users WHERE id = '${actorId}'::uuid;
      `);
    }
  }
});
