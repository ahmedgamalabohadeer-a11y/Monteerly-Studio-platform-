import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import type {
  QuotePaymentState,
  QuoteSourceReference,
  ServerQuoteStore,
  TrustedQuoteSource,
} from '../server-quote.ts';

// Next resolves this marker during its build; the local Node unit test treats it as a no-op.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'server-only') {
      return { url: 'data:text/javascript,', shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});

const { createServerQuote, ServerQuoteError } = await import('../server-quote.ts');

const now = new Date('2026-11-17T00:00:00.000Z');
const request = {
  sourceType: 'service',
  sourceId: 'service-1',
  expectedPriceVersion: 'price-v1',
};

function source(overrides: Partial<TrustedQuoteSource> = {}): TrustedQuoteSource {
  return {
    sourceType: 'service',
    sourceId: 'service-1',
    quoteable: true,
    priceEgp: '125.50',
    currency: 'EGP',
    priceVersion: 'price-v1',
    validUntil: '2026-11-18T00:00:00.000Z',
    ...overrides,
  };
}

function store(overrides: {
  source?: TrustedQuoteSource | null;
  paymentState?: QuotePaymentState;
} = {}) {
  const calls = { source: 0, paymentState: 0, actorId: '', reference: null as QuoteSourceReference | null };
  const repository: ServerQuoteStore = {
    readAuthorizedSource: async (actorId, reference) => {
      calls.source += 1;
      calls.actorId = actorId;
      calls.reference = reference;
      return overrides.source === undefined ? source() : overrides.source;
    },
    readPaymentState: async () => {
      calls.paymentState += 1;
      return overrides.paymentState ?? {
        hasSuccessfulPayment: false,
        hasActiveAttempt: false,
      };
    },
  };

  return { repository, calls };
}

async function assertQuoteError(
  promise: Promise<unknown>,
  code: string,
): Promise<void> {
  await assert.rejects(promise, (error: unknown) =>
    error instanceof ServerQuoteError && error.code === code,
  );
}

test('creates an authoritative quote from the authorized source snapshot', async () => {
  const { repository, calls } = store();
  const quote = await createServerQuote(request, 'actor-1', repository, now);

  assert.equal(quote.amount_minor, 12550);
  assert.equal(quote.currency, 'EGP');
  assert.equal(quote.policy_version, 'egp-minor-units-half-up-v1');
  assert.equal(quote.source_price_version, 'price-v1');
  assert.equal(quote.expires_at, '2026-11-17T00:05:00.000Z');
  assert.equal(calls.actorId, 'actor-1');
  assert.deepEqual(calls.reference, { sourceType: 'service', sourceId: 'service-1' });
});

test('rejects client-supplied amounts', async () => {
  const { repository, calls } = store();

  await assertQuoteError(
    createServerQuote({ ...request, amount: '1.00' }, 'actor-1', repository, now),
    'invalid_request',
  );
  assert.equal(calls.source, 0);
});

test('rejects an expired source quote', async () => {
  const { repository } = store({
    source: source({ validUntil: '2026-11-17T00:00:00.000Z' }),
  });

  await assertQuoteError(
    createServerQuote(request, 'actor-1', repository, now),
    'quote_expired',
  );
});

test('rejects a quote when the source price version changed', async () => {
  const { repository } = store({ source: source({ priceVersion: 'price-v2' }) });

  await assertQuoteError(
    createServerQuote(request, 'actor-1', repository, now),
    'price_changed',
  );
});

test('rejects a source that is no longer quoteable', async () => {
  const { repository } = store({ source: source({ quoteable: false }) });

  await assertQuoteError(
    createServerQuote(request, 'actor-1', repository, now),
    'source_unavailable',
  );
});

test('rejects a source with an existing successful payment', async () => {
  const { repository } = store({
    paymentState: { hasSuccessfulPayment: true, hasActiveAttempt: false },
  });

  await assertQuoteError(
    createServerQuote(request, 'actor-1', repository, now),
    'payment_already_succeeded',
  );
});

test('rejects a conflicting active payment attempt', async () => {
  const { repository } = store({
    paymentState: { hasSuccessfulPayment: false, hasActiveAttempt: true },
  });

  await assertQuoteError(
    createServerQuote(request, 'actor-1', repository, now),
    'active_payment_attempt',
  );
});

test('converts the trusted EGP source amount to minor units exactly', async () => {
  const { repository } = store({ source: source({ priceEgp: '1,234.56' }) });
  const quote = await createServerQuote(request, 'actor-1', repository, now);

  assert.equal(quote.amount_minor, 123456);
});

test('uses half-up rounding for the trusted EGP source amount', async () => {
  const { repository } = store({ source: source({ priceEgp: '0.005' }) });
  const quote = await createServerQuote(request, 'actor-1', repository, now);

  assert.equal(quote.amount_minor, 1);
});
