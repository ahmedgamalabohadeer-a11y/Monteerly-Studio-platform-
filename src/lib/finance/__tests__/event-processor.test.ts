import assert from 'node:assert/strict';
import test from 'node:test';
import {
  processPaymobInboxEvent,
  type EventProcessorStore,
} from '../event-processor.ts';

const paymentIntentId = 'c761cf02-8f40-4ac2-8b62-fc3476d47f9b';

function createEvent(overrides: Record<string, unknown> = {}) {
  return {
    id: 'inbox-row-1',
    provider: 'paymob',
    provider_event_id: 'event-1',
    signature_verified: true,
    normalized_event_type: 'TRANSACTION',
    payment_intent_id: null,
    processing_state: 'received',
    payload: {
      transaction: {
        success: true,
        is_capture: true,
        id: 'event-1',
        order: { id: 'order-1' },
      },
    },
    ...overrides,
  };
}

function createStore(event = createEvent()) {
  const calls = { link: 0, settle: 0, update: 0 };
  const store: EventProcessorStore = {
    readEvent: async () => ({ data: event, error: null }),
    linkEventToIntent: async () => {
      calls.link += 1;
      return { data: paymentIntentId, error: null };
    },
    settleIntent: async () => {
      calls.settle += 1;
      return { data: 'settled', error: null };
    },
    updateEventState: async () => {
      calls.update += 1;
      return { error: null };
    },
  };

  return { store, calls };
}

test('links and settles a verified successful capture', async () => {
  const { store, calls } = createStore();

  assert.equal(await processPaymobInboxEvent(store, 'event-1'), 'settled');
  assert.deepEqual(calls, { link: 1, settle: 1, update: 0 });
});

test('rejects events that do not verify as a successful capture', async () => {
  const { store, calls } = createStore({
    ...createEvent(),
    payload: {
      transaction: {
        success: false,
        is_capture: true,
        id: 'event-1',
        order: { id: 'order-1' },
      },
    },
  });

  assert.equal(await processPaymobInboxEvent(store, 'event-1'), 'rejected');
  assert.deepEqual(calls, { link: 0, settle: 0, update: 1 });
});

test('does not settle an already processed event again', async () => {
  const { store, calls } = createStore(createEvent({
    payment_intent_id: paymentIntentId,
    processing_state: 'processed',
  }));

  assert.equal(await processPaymobInboxEvent(store, 'event-1'), 'duplicate');
  assert.deepEqual(calls, { link: 0, settle: 0, update: 0 });
});

test('retries transient settlement errors', async () => {
  const { store, calls } = createStore();
  store.settleIntent = async () => {
    calls.settle += 1;
    return calls.settle === 1
      ? { data: null, error: { code: '40001' } }
      : { data: 'settled', error: null };
  };

  assert.equal(
    await processPaymobInboxEvent(store, 'event-1', { wait: async () => undefined }),
    'settled',
  );
  assert.equal(calls.settle, 2);
});
