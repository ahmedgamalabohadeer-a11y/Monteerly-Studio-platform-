type JsonRecord = Record<string, unknown>;

type InboxEvent = {
  id: string;
  provider: string;
  provider_event_id: string;
  signature_verified: boolean;
  normalized_event_type: string;
  payment_intent_id: string | null;
  processing_state: string;
  payload: unknown;
};

type QueryResult = {
  data: unknown;
  error: unknown | null;
};

export type EventProcessorStore = {
  readEvent: (providerEventId: string) => Promise<QueryResult>;
  linkEventToIntent: (providerEventId: string) => Promise<QueryResult>;
  settleIntent: (paymentIntentId: string, providerEventId: string) => Promise<QueryResult>;
  updateEventState: (
    eventId: string,
    state: 'rejected' | 'quarantined',
  ) => Promise<{ error: unknown | null }>;
};

export type EventProcessorResult =
  | 'settled'
  | 'duplicate'
  | 'rejected'
  | 'quarantined'
  | 'retryable';

type RetryOptions = {
  maxAttempts?: number;
  wait?: (milliseconds: number) => Promise<void>;
};

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseInboxEvent(value: unknown): InboxEvent | null {
  if (!isRecord(value)) return null;
  if (
    typeof value.id !== 'string' ||
    typeof value.provider !== 'string' ||
    typeof value.provider_event_id !== 'string' ||
    typeof value.signature_verified !== 'boolean' ||
    typeof value.normalized_event_type !== 'string' ||
    (typeof value.payment_intent_id !== 'string' && value.payment_intent_id !== null) ||
    typeof value.processing_state !== 'string' ||
    !Object.hasOwn(value, 'payload')
  ) {
    return null;
  }

  return {
    id: value.id,
    provider: value.provider,
    provider_event_id: value.provider_event_id,
    signature_verified: value.signature_verified,
    normalized_event_type: value.normalized_event_type,
    payment_intent_id: value.payment_intent_id,
    processing_state: value.processing_state,
    payload: value.payload,
  };
}

function isTrue(value: unknown): boolean {
  return value === true || (typeof value === 'string' && value.toLowerCase() === 'true');
}

function isSuccessfulCapture(event: InboxEvent): boolean {
  if (
    event.provider !== 'paymob' ||
    !event.signature_verified ||
    event.normalized_event_type !== 'TRANSACTION' ||
    event.provider_event_id.length === 0 ||
    !isRecord(event.payload) ||
    !isRecord(event.payload.transaction)
  ) {
    return false;
  }

  const transaction = event.payload.transaction;
  const transactionId = transaction.id;
  const order = transaction.order;
  const orderId = isRecord(order) ? order.id : null;

  return (
    isTrue(transaction.success) &&
    isTrue(transaction.is_capture) &&
    (typeof transactionId === 'string' || typeof transactionId === 'number') &&
    String(transactionId) === event.provider_event_id &&
    (typeof orderId === 'string' || typeof orderId === 'number') &&
    String(orderId).length > 0
  );
}

function errorCode(error: unknown): string | null {
  if (!isRecord(error) || typeof error.code !== 'string') return null;
  return error.code;
}

function permanentOutcome(error: unknown): 'rejected' | 'quarantined' | null {
  const code = errorCode(error);
  if (code === 'P0002') return 'quarantined';
  if (code === '22023' || code === '23514') return 'rejected';
  return null;
}

async function setEventState(
  store: EventProcessorStore,
  eventId: string,
  state: 'rejected' | 'quarantined',
): Promise<EventProcessorResult> {
  const result = await store.updateEventState(eventId, state);
  return result.error ? 'retryable' : state;
}

async function processOnce(
  store: EventProcessorStore,
  providerEventId: string,
): Promise<EventProcessorResult> {
  const readResult = await store.readEvent(providerEventId);
  if (readResult.error) return 'retryable';

  const event = parseInboxEvent(readResult.data);
  if (!event || event.provider_event_id !== providerEventId) return 'retryable';
  if (event.processing_state === 'processed') return 'duplicate';
  if (event.processing_state === 'rejected') return 'rejected';
  if (event.processing_state === 'quarantined') return 'quarantined';
  if (event.processing_state !== 'received') return 'retryable';

  if (!isSuccessfulCapture(event)) {
    return setEventState(store, event.id, 'rejected');
  }

  const linkedIntent = await store.linkEventToIntent(event.provider_event_id);
  if (linkedIntent.error) {
    const outcome = permanentOutcome(linkedIntent.error);
    if (outcome) return setEventState(store, event.id, outcome);
    return 'retryable';
  }
  if (typeof linkedIntent.data !== 'string' || linkedIntent.data.length === 0) {
    return 'retryable';
  }

  const settlement = await store.settleIntent(linkedIntent.data, event.provider_event_id);
  if (settlement.error) {
    const outcome = permanentOutcome(settlement.error);
    if (outcome) return setEventState(store, event.id, outcome);
    return 'retryable';
  }

  if (settlement.data === 'settled' || settlement.data === 'duplicate') {
    return settlement.data;
  }
  return 'retryable';
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function processPaymobInboxEvent(
  store: EventProcessorStore,
  providerEventId: string,
  options: RetryOptions = {},
): Promise<EventProcessorResult> {
  const configuredAttempts = options.maxAttempts;
  const maxAttempts =
    typeof configuredAttempts === 'number' &&
    Number.isInteger(configuredAttempts) &&
    configuredAttempts > 0
      ? configuredAttempts
      : 3;
  const wait = options.wait ?? delay;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let result: EventProcessorResult;
    try {
      result = await processOnce(store, providerEventId);
    } catch {
      result = 'retryable';
    }

    if (result !== 'retryable' || attempt === maxAttempts) return result;
    await wait(100 * 2 ** (attempt - 1));
  }

  return 'retryable';
}
