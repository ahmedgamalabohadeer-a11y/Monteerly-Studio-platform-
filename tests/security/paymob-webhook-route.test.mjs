import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

const { handlePaymobWebhookRequest } = await import('../../src/lib/finance/paymob-webhook.ts');
const secret = 'paymob-route-unit-test-secret';
const transaction = {
  amount_cents: 12500,
  created_at: '2026-11-15T12:00:00Z',
  currency: 'EGP',
  error_occured: false,
  has_parent_transaction: false,
  id: 987654,
  integration_id: 12345,
  is_3d_secure: true,
  is_auth: false,
  is_capture: false,
  is_refunded: false,
  is_standalone_payment: true,
  is_voided: false,
  order: { id: 456789 },
  owner: 67890,
  pending: false,
  source_data: { pan: '1234', sub_type: 'MasterCard', type: 'card' },
  success: true,
};

function sign(payload) {
  const message = [
    payload.amount_cents, payload.created_at, payload.currency, payload.error_occured,
    payload.has_parent_transaction, payload.id, payload.integration_id,
    payload.is_3d_secure, payload.is_auth, payload.is_capture, payload.is_refunded,
    payload.is_standalone_payment, payload.is_voided, payload.order.id, payload.owner,
    payload.pending, payload.source_data.pan, payload.source_data.sub_type,
    payload.source_data.type, payload.success,
  ].map(String).join('');
  return createHmac('sha512', secret).update(message, 'utf8').digest('hex');
}

function request(payload, hmac) {
  return new Request(`https://example.test/api/webhooks/paymob?hmac=${hmac}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

test('rejects missing or invalid signatures without writing to inbox', async () => {
  let writes = 0;
  const handler = (req) => handlePaymobWebhookRequest(req, secret, 'test-v1', async () => {
    writes += 1;
    return 'inserted';
  });

  const unsigned = await handler(request({ obj: transaction }, ''));
  const invalid = await handler(request({ obj: transaction }, '0'.repeat(128)));

  assert.equal(unsigned.status, 401);
  assert.equal(invalid.status, 401);
  assert.equal(writes, 0);
});

test('accepts a valid signature only after inserting a redacted event into inbox', async () => {
  let savedEvent;
  const response = await handlePaymobWebhookRequest(
    request({ type: 'TRANSACTION', obj: transaction }, sign(transaction)),
    secret,
    'test-v1',
    async (event) => {
      savedEvent = event;
      return 'inserted';
    },
  );

  assert.equal(response.status, 200);
  assert.equal(savedEvent.provider, 'paymob');
  assert.equal(savedEvent.provider_event_id, '987654');
  assert.equal(savedEvent.signature_verified, true);
  assert.equal(savedEvent.payload.transaction.source_data.pan, '[REDACTED]');
});

test('does not acknowledge a valid event when inbox persistence fails', async () => {
  const response = await handlePaymobWebhookRequest(
    request({ obj: transaction }, sign(transaction)),
    secret,
    'test-v1',
    async () => 'error',
  );
  assert.equal(response.status, 503);
});
