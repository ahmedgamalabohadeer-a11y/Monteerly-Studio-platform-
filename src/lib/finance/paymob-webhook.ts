import { createHash } from 'node:crypto';
import {
  PAYMOB_TRANSACTION_HMAC_FIELDS,
  verifyPaymobWebhookHmac,
} from './paymob-hmac.ts';

const MAX_BODY_BYTES = 1024 * 1024;

type JsonRecord = Record<string, unknown>;
type InboxEvent = {
  provider: 'paymob';
  provider_event_id: string;
  signature_verified: true;
  signature_version: string | null;
  payload_hash: string;
  normalized_event_type: string;
  payload: JsonRecord;
};

type InsertResult = 'inserted' | 'duplicate' | 'conflict' | 'error';

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function response(status: number, body: JsonRecord): Response {
  return Response.json(body, { status });
}

function minimizedPayload(transaction: JsonRecord): JsonRecord {
  const result: JsonRecord = {};

  for (const path of PAYMOB_TRANSACTION_HMAC_FIELDS) {
    const [root, child] = path.split('.');
    const source = child ? transaction[root] : transaction;
    if (!isRecord(source)) continue;

    const key = child ?? root;
    const target = child
      ? (isRecord(result[root]) ? result[root] as JsonRecord : (result[root] = {} as JsonRecord))
      : result;
    target[key] = child === 'pan' ? '[REDACTED]' : source[key];
  }

  return result;
}

export async function handlePaymobWebhookRequest(
  request: Request,
  secret: unknown,
  signatureVersion: string | null,
  insertInbox: (event: InboxEvent) => Promise<InsertResult>,
): Promise<Response> {
  if (typeof secret !== 'string' || secret.trim().length === 0) {
    return response(503, { error: 'Webhook is not configured' });
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return response(413, { error: 'Payload too large' });
  }

  let rawBody: string;
  let body: unknown;
  try {
    rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return response(413, { error: 'Payload too large' });
    }
    body = JSON.parse(rawBody);
  } catch {
    return response(400, { error: 'Invalid JSON payload' });
  }

  if (!isRecord(body)) return response(400, { error: 'Invalid payload' });
  const transaction = isRecord(body.obj) ? body.obj : body;
  const url = new URL(request.url);
  const queryHmac = url.searchParams.get('hmac');
  const bodyHmac = typeof body.hmac === 'string' ? body.hmac : null;
  if (queryHmac && bodyHmac && queryHmac !== bodyHmac) {
    return response(401, { error: 'Unauthorized' });
  }

  const hmac = queryHmac ?? bodyHmac;
  if (!verifyPaymobWebhookHmac(transaction, hmac, secret)) {
    return response(401, { error: 'Unauthorized' });
  }

  const eventId = transaction.id;
  if ((typeof eventId !== 'string' && typeof eventId !== 'number') || String(eventId).length === 0) {
    return response(400, { error: 'Invalid event id' });
  }

  const event: InboxEvent = {
    provider: 'paymob',
    provider_event_id: String(eventId),
    signature_verified: true,
    signature_version: signatureVersion,
    payload_hash: createHash('sha256').update(rawBody, 'utf8').digest('hex'),
    normalized_event_type: typeof body.type === 'string' ? body.type : 'TRANSACTION',
    payload: { transaction: minimizedPayload(transaction) },
  };

  try {
    const result = await insertInbox(event);
    if (result === 'inserted' || result === 'duplicate') {
      return response(200, { received: true });
    }
    if (result === 'conflict') return response(409, { error: 'Event id conflict' });
    return response(503, { error: 'Webhook could not be recorded' });
  } catch {
    return response(503, { error: 'Webhook could not be recorded' });
  }
}
