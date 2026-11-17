import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import type { ServerQuoteAdapterContext } from '../server-quote-adapter.ts';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'server-only') {
      return { url: 'data:text/javascript,', shortCircuit: true };
    }
    if (
      specifier === '../serverAuth.ts' &&
      context.parentURL?.endsWith('/server-quote-adapter.ts')
    ) {
      return {
        url: 'data:text/javascript,export%20async%20function%20requireUser()%7Bthrow%20new%20Error()%7D',
        shortCircuit: true,
      };
    }
    return nextResolve(specifier, context);
  },
});

const { createServerQuoteAdapter, ServerQuoteAdapterError } = await import(
  '../server-quote-adapter.ts'
);
const { ServerQuoteError } = await import('../server-quote.ts');

const now = new Date('2026-11-17T00:00:00.000Z');
const jobId = 'c761cf02-8f40-4ac2-8b62-fc3476d47f9b';
const actorId = '9c171c3a-c9f6-4d44-a7a8-5f30eb114a24';

function makeAdapter(options: {
  budget?: string;
  status?: string;
  clientId?: string;
  hasSuccessfulPayment?: boolean;
  hasActiveAttempt?: boolean;
  clock?: () => Date;
} = {}) {
  const calls = {
    jobReads: [] as Array<{ actorId: string; jobId: string }>,
    paymentRpc: [] as Array<{ functionName: string; parameters: unknown }>,
    authentication: 0,
  };
  const context: ServerQuoteAdapterContext = {
    actorId,
    readOwnedJob: async (requestedActorId, requestedJobId) => {
      calls.jobReads.push({ actorId: requestedActorId, jobId: requestedJobId });
      return {
        data: {
          id: jobId,
          client_id: options.clientId ?? actorId,
          status: options.status ?? 'open',
          budget_text: options.budget ?? '125.50',
        },
        error: null,
      };
    },
    paymentStatusClient: {
      rpc: async (functionName, parameters) => {
        calls.paymentRpc.push({ functionName, parameters });
        return {
          data: {
            has_successful_payment: options.hasSuccessfulPayment ?? false,
            has_active_attempt: options.hasActiveAttempt ?? false,
          },
          error: null,
        };
      },
    },
  };
  const adapter = createServerQuoteAdapter({
    authenticate: async () => {
      calls.authentication += 1;
      return context;
    },
    now: options.clock ?? (() => now),
  });

  return { adapter, calls };
}

function request(overrides: Record<string, unknown> = {}) {
  return {
    jobId,
    expectedPriceVersion: 'job-budget-text-v1:125.50',
    ...overrides,
  };
}

async function assertQuoteError(
  promise: Promise<unknown>,
  code: string,
): Promise<void> {
  await assert.rejects(promise, (error: unknown) =>
    error instanceof ServerQuoteError && error.code === code,
  );
}

test('creates a quote from the authenticated owner job and payment-status RPC', async () => {
  const { adapter, calls } = makeAdapter();
  const quote = await adapter(request());

  assert.deepEqual(
    {
      sourceType: quote.sourceType,
      sourceId: quote.sourceId,
      amount_minor: quote.amount_minor,
      currency: quote.currency,
      policy_version: quote.policy_version,
      source_price_version: quote.source_price_version,
      expires_at: quote.expires_at,
    },
    {
      sourceType: 'job',
      sourceId: jobId,
      amount_minor: 12550,
      currency: 'EGP',
      policy_version: 'egp-minor-units-half-up-v1',
      source_price_version: 'job-budget-text-v1:125.50',
      expires_at: '2026-11-17T00:05:00.000Z',
    },
  );
  assert.deepEqual(calls.jobReads, [{ actorId, jobId }]);
  assert.deepEqual(calls.paymentRpc, [{
    functionName: 'get_payment_status_for_quote',
    parameters: { p_source_type: 'job', p_source_id: jobId },
  }]);
});

test('rejects client-supplied amounts before authentication or database access', async () => {
  const { adapter, calls } = makeAdapter();

  await assertQuoteError(
    adapter(request({ amount_minor: 1 })),
    'invalid_request',
  );
  assert.equal(calls.authentication, 0);
  assert.equal(calls.jobReads.length, 0);
});

test('rejects a quote that expires while its payment state is being read', async () => {
  let clockReads = 0;
  const { adapter } = makeAdapter({
    clock: () => {
      clockReads += 1;
      return clockReads === 1
        ? now
        : new Date(now.getTime() + 5 * 60 * 1000 + 1);
    },
  });

  await assertQuoteError(adapter(request()), 'quote_expired');
});

test('rejects a stale budget-derived price version', async () => {
  const { adapter } = makeAdapter({ budget: '126.00' });

  await assertQuoteError(adapter(request()), 'price_changed');
});

test('rejects a job not owned by the authenticated client', async () => {
  const { adapter, calls } = makeAdapter({
    clientId: '4d38c2d5-8731-4efb-9bfe-fdfacacc8912',
  });

  await assertQuoteError(adapter(request()), 'source_not_found');
  assert.deepEqual(calls.jobReads, [{ actorId, jobId }]);
  assert.equal(calls.paymentRpc.length, 0);
});

test('rejects jobs outside the approved open state', async () => {
  const { adapter } = makeAdapter({ status: 'in_progress' });

  await assertQuoteError(adapter(request()), 'source_unavailable');
});

test('rejects a job with a prior successful payment', async () => {
  const { adapter } = makeAdapter({ hasSuccessfulPayment: true });

  await assertQuoteError(adapter(request()), 'payment_already_succeeded');
});

test('rejects a job with an active payment attempt', async () => {
  const { adapter } = makeAdapter({ hasActiveAttempt: true });

  await assertQuoteError(adapter(request()), 'active_payment_attempt');
});

test('converts the exact database decimal text to EGP minor units', async () => {
  const { adapter } = makeAdapter({ budget: '1234.56' });
  const quote = await adapter(
    request({ expectedPriceVersion: 'job-budget-text-v1:1234.56' }),
  );

  assert.equal(quote.amount_minor, 123456);
});

test('uses half-up rounding for the trusted database decimal text', async () => {
  const { adapter } = makeAdapter({ budget: '0.005' });
  const quote = await adapter(
    request({ expectedPriceVersion: 'job-budget-text-v1:0.005' }),
  );

  assert.equal(quote.amount_minor, 1);
});

test('fails explicitly when the job read fails or returns malformed data', async () => {
  const readFailureContext: ServerQuoteAdapterContext = {
    actorId,
    readOwnedJob: async () => ({ data: null, error: new Error('read failed') }),
    paymentStatusClient: {
      rpc: async () => ({
        data: { has_successful_payment: false, has_active_attempt: false },
        error: null,
      }),
    },
  };
  const readFailureAdapter = createServerQuoteAdapter({
    authenticate: async () => readFailureContext,
    now: () => now,
  });
  await assert.rejects(
    readFailureAdapter(request()),
    (error: unknown) =>
      error instanceof ServerQuoteAdapterError && error.code === 'job_read_failed',
  );

  const malformed = makeAdapter({ budget: 'invalid' });
  await assert.rejects(
    malformed.adapter(
      request({ expectedPriceVersion: 'job-budget-text-v1:invalid' }),
    ),
    (error: unknown) =>
      error instanceof ServerQuoteError && error.code === 'invalid_source_price',
  );
});
