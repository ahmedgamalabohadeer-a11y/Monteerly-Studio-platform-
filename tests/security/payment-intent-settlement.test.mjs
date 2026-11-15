import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import test from 'node:test';

const container = process.env.MCOS_LOCAL_DISPOSABLE_DB_CONTAINER;
const expectedProject = process.env.MCOS_LOCAL_DISPOSABLE_PROJECT;
const expectedContainerId = process.env.MCOS_LOCAL_DISPOSABLE_CONTAINER_ID;
const expectedDbPort = process.env.MCOS_LOCAL_DISPOSABLE_DB_PORT;
const runSettlementTest =
  process.env.MCOS_RUN_LOCAL_DISPOSABLE_SETTLEMENT_TEST === '1';

function runPsql(sql, port = '5432') {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'docker',
      [
        'exec', '-i', container, 'psql', '-X', '-A', '-t',
        '-v', 'ON_ERROR_STOP=1', '-U', 'postgres', '-d', 'postgres',
        '-p', port,
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

test('payment settlement funds escrow and posts ledger once on replay', { timeout: 30_000 }, async (t) => {
  if (!runSettlementTest || !container) {
    t.skip('Explicit disposable-database opt-in and container are required');
    return;
  }

  assert.ok(expectedProject?.startsWith('mcos-local-disposable-'));
  assert.equal(container, `supabase_db_${expectedProject}`);
  assert.ok(expectedContainerId);
  assert.match(expectedDbPort ?? '', /^\d+$/);

  const identity = execFileSync('docker', [
    'inspect', '--format',
    '{{.Id}}|{{index .Config.Labels "com.docker.compose.project"}}|{{.Config.Image}}|{{.HostConfig.NetworkMode}}|{{json .NetworkSettings.Ports}}',
    container,
  ], { encoding: 'utf8' }).trim().split('|');
  assert.equal(identity[0], expectedContainerId);
  assert.equal(identity[1], expectedProject);
  assert.match(identity[2], /^public\.ecr\.aws\/supabase\/postgres:/);
  const portMap = JSON.parse(identity[4]);
  let psqlPort = '5432';
  if (identity[3] === 'host') {
    assert.ok(Object.values(portMap).every((bindings) => !bindings?.length));
    psqlPort = expectedDbPort;
    assert.deepEqual(
      (await runPsql('SHOW listen_addresses; SHOW port;', psqlPort)).split('\n'),
      ['127.0.0.1', expectedDbPort],
    );
  } else {
    assert.ok(portMap['5432/tcp']?.some((binding) =>
      binding.HostPort === expectedDbPort &&
      ['127.0.0.1', '::1'].includes(binding.HostIp)
    ));
  }

  const actorId = randomUUID();
  const paymentIntentId = randomUUID();
  const eventId = randomUUID();
  const orderId = randomUUID();

  await runPsql(`
    BEGIN;

    INSERT INTO auth.users (
      id, email, aud, role, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at
    ) VALUES (
      '${actorId}'::uuid,
      '${actorId}@example.invalid',
      'authenticated', 'authenticated', '{}'::jsonb, '{}'::jsonb, now(), now()
    );

    INSERT INTO public.payment_intents (
      id, owner_id, source_type, source_id, provider, amount_minor,
      platform_fee_minor, currency, calculation_version, quote_snapshot,
      idempotency_key, provider_order_id, provider_integration_id, status,
      expires_at
    ) VALUES (
      '${paymentIntentId}'::uuid, '${actorId}'::uuid, 'job',
      gen_random_uuid(), 'paymob', 12500, 500, 'EGP', 'settlement-test-v1',
      '{"amount_minor":12500}'::jsonb, '${paymentIntentId}',
      '${orderId}', 12345, 'pending_provider', now() + interval '1 hour'
    );

    INSERT INTO public.provider_events_inbox (
      provider, provider_event_id, signature_verified, payload_hash,
      normalized_event_type, payload
    ) VALUES (
      'paymob', '${eventId}', true, repeat('a', 64), 'TRANSACTION',
      jsonb_build_object('transaction', jsonb_build_object(
        'success', true,
        'is_capture', true,
        'id', '${eventId}',
        'order', jsonb_build_object('id', '${orderId}'),
        'integration_id', 12345,
        'currency', 'EGP',
        'amount_cents', 12500
      ))
    );

    INSERT INTO public.escrow_accounts (
      client_id, freelancer_id, amount_cents, platform_fee_cents,
      status, paymob_order_id, payment_intent_id
    ) VALUES (
      NULL, NULL, 12000, 500, 'created', '${orderId}', '${paymentIntentId}'::uuid
    );

    DO $test$
    DECLARE
      first_result text;
      replay_result text;
    BEGIN
      first_result := public.settle_paymob_payment_intent(
        '${paymentIntentId}'::uuid, '${eventId}'
      );
      IF first_result <> 'settled' THEN
        RAISE EXCEPTION 'Expected first settlement, got %', first_result;
      END IF;

      replay_result := public.settle_paymob_payment_intent(
        '${paymentIntentId}'::uuid, '${eventId}'
      );
      IF replay_result <> 'duplicate' THEN
        RAISE EXCEPTION 'Expected duplicate result on replay, got %', replay_result;
      END IF;

      IF (SELECT status FROM public.payment_intents
          WHERE id = '${paymentIntentId}'::uuid) <> 'succeeded' THEN
        RAISE EXCEPTION 'Payment intent was not settled';
      END IF;
      IF (SELECT status::text FROM public.escrow_accounts
          WHERE payment_intent_id = '${paymentIntentId}'::uuid) <> 'funded' THEN
        RAISE EXCEPTION 'Escrow was not funded';
      END IF;
      IF (SELECT processing_state FROM public.provider_events_inbox
          WHERE provider_event_id = '${eventId}') <> 'processed' THEN
        RAISE EXCEPTION 'Provider event was not marked processed';
      END IF;
      IF (SELECT count(*) FROM public.financial_ledgers
          WHERE payment_intent_id = '${paymentIntentId}'::uuid
            AND provider_event_id = '${eventId}') <> 3 THEN
        RAISE EXCEPTION 'Settlement did not create exactly three ledger entries';
      END IF;
      IF (SELECT coalesce(sum(debit_minor_units), 0)
          FROM public.financial_ledgers
          WHERE payment_intent_id = '${paymentIntentId}'::uuid
            AND provider_event_id = '${eventId}')
        <> (SELECT coalesce(sum(credit_minor_units), 0)
            FROM public.financial_ledgers
            WHERE payment_intent_id = '${paymentIntentId}'::uuid
              AND provider_event_id = '${eventId}') THEN
        RAISE EXCEPTION 'Settlement ledger entries are unbalanced';
      END IF;
    END;
    $test$;

    ROLLBACK;
  `, psqlPort);
});
