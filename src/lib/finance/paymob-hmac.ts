import { createHmac, timingSafeEqual } from 'node:crypto';

/** Paymob's transaction callback fields in the provider-defined canonical order. */
export const PAYMOB_TRANSACTION_HMAC_FIELDS = [
  'amount_cents',
  'created_at',
  'currency',
  'error_occured',
  'has_parent_transaction',
  'id',
  'integration_id',
  'is_3d_secure',
  'is_auth',
  'is_capture',
  'is_refunded',
  'is_standalone_payment',
  'is_voided',
  'order.id',
  'owner',
  'pending',
  'source_data.pan',
  'source_data.sub_type',
  'source_data.type',
  'success',
] as const;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toPaymobScalar(value: unknown): string | null {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return String(value);
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

/** Return the canonical concatenated message, or null for incomplete/malformed input. */
export function extractPaymobHmacMessage(payload: unknown): string | null {
  try {
    if (!isRecord(payload) || !isRecord(payload.order) || !isRecord(payload.source_data)) {
      return null;
    }

    const fields: string[] = [];
    for (const path of PAYMOB_TRANSACTION_HMAC_FIELDS) {
      const [root, child] = path.split('.');
      const source = child ? payload[root] : payload;
      if (!isRecord(source)) return null;

      const key = child ?? root;
      if (!Object.hasOwn(source, key)) return null;

      const value = toPaymobScalar(source[key]);
      if (value === null) return null;
      fields.push(value);
    }

    return fields.join('');
  } catch {
    return null;
  }
}

/** Verify a Paymob transaction callback. Invalid inputs always fail closed. */
export function verifyPaymobWebhookHmac(
  payload: unknown,
  receivedHmac: unknown,
  secret: unknown,
): boolean {
  try {
    if (
      typeof receivedHmac !== 'string' || !/^[\da-f]{128}$/i.test(receivedHmac) ||
      typeof secret !== 'string' || secret.trim().length === 0
    ) {
      return false;
    }

    const message = extractPaymobHmacMessage(payload);
    if (message === null) return false;

    const expected = createHmac('sha512', secret).update(message, 'utf8').digest();
    const supplied = Buffer.from(receivedHmac, 'hex');
    return expected.length === supplied.length && timingSafeEqual(expected, supplied);
  } catch {
    return false;
  }
}
