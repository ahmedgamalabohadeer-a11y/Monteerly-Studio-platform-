import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

const { verifyPaymobWebhookHmac } = await import('../paymob-hmac' + '.ts');

const secret = 'unit-test-secret';
const payload = {
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

function sign(value: typeof payload): string {
  const message = [
    value.amount_cents,
    value.created_at,
    value.currency,
    value.error_occured,
    value.has_parent_transaction,
    value.id,
    value.integration_id,
    value.is_3d_secure,
    value.is_auth,
    value.is_capture,
    value.is_refunded,
    value.is_standalone_payment,
    value.is_voided,
    value.order.id,
    value.owner,
    value.pending,
    value.source_data.pan,
    value.source_data.sub_type,
    value.source_data.type,
    value.success,
  ].map(String).join('');

  return createHmac('sha512', secret).update(message, 'utf8').digest('hex');
}

test('accepts a valid Paymob transaction HMAC', () => {
  assert.equal(verifyPaymobWebhookHmac(payload, sign(payload), secret), true);
});

test('rejects a modified payload', () => {
  const modified = { ...payload, amount_cents: payload.amount_cents + 1 };
  assert.equal(verifyPaymobWebhookHmac(modified, sign(payload), secret), false);
});

test('rejects an incorrect signature', () => {
  assert.equal(verifyPaymobWebhookHmac(payload, '0'.repeat(128), secret), false);
});

test('rejects empty or incomplete inputs without throwing', () => {
  assert.equal(verifyPaymobWebhookHmac({}, '', secret), false);
  assert.equal(verifyPaymobWebhookHmac(payload, sign(payload), ''), false);
  assert.equal(verifyPaymobWebhookHmac(payload, sign(payload), secret), true);
  assert.equal(
    verifyPaymobWebhookHmac({ ...payload, source_data: {} }, sign(payload), secret),
    false,
  );
});
